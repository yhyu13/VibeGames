import { createHash } from 'node:crypto';
import { readFile, rm, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync, inflateSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = join(root, 'references', 'sprite-samples');
const outputDir = join(root, 'public', 'sprites', 'intro');
const approvalPath = join(sourceDir, 'approved-intro-assets.json');
const generatedManifestPath = join(root, 'src', 'engine', 'sprites', 'intro-manifest.ts');
const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
// 2026-08-10 v2 sheet 接入:以 v2 重绘稿实测登记(sourceRowMap 行号 = 逐格肤色/墨迹质心朝向探针
// 测得,见 docs/design/24-sprite-image-gen-prompts.md 验收门)。玩家 v2 共 7 行:0=S 1=SE 2=E 3=NE
// 4=N(背面,肤色≈0)5=NW 6=SW;W 行缺失 → 取 E 行水平镜像。巡逻兵 v2 共 6 行:0=SE 1=S 2=W
// 3=SW 4=N 替代 5=SW 变体;无纯 E/NE → 由 W/SW 行镜像合成。镜像集合改为按 asset 登记。
const sourceRowMap = {
  player: { N: 4, NE: 3, E: 2, SE: 1, S: 0, SW: 6, W: 2, NW: 5 },
  patrol: { N: 4, NE: 3, E: 2, SE: 0, S: 1, SW: 3, W: 2, NW: 3 },
};
const mirroredDirections = { player: new Set(['W']), patrol: new Set(['E', 'NE']) };
const actorActions = { player: ['idle','walk0','walk1','walk2','walk3','attack0','attack1','attack2'], patrol: ['idle','walk0','walk1','walk2','walk3','alert'] };
const crcTable = Array.from({ length: 256 }, (_, n) => { let c=n; for(let k=0;k<8;k++) c=(c&1)?0xedb88320^(c>>>1):c>>>1; return c>>>0; });
const sha = (data) => createHash('sha256').update(data).digest('hex');
const fail = (message) => { throw new Error(`intro sprites: ${message}`); };

function decodePng(buffer) {
  if (!buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) fail('invalid PNG signature');
  let pos=8, width, height, bitDepth, colorType, interlace, compressed=[];
  while(pos<buffer.length){ const length=buffer.readUInt32BE(pos); const type=buffer.toString('ascii',pos+4,pos+8); const data=buffer.subarray(pos+8,pos+8+length); pos+=12+length;
    if(type==='IHDR'){width=data.readUInt32BE(0);height=data.readUInt32BE(4);bitDepth=data[8];colorType=data[9];interlace=data[12];}
    else if(type==='IDAT') compressed.push(data); else if(type==='IEND') break;
  }
  if(bitDepth!==8 || ![2,6].includes(colorType) || interlace!==0) fail(`unsupported PNG format (${bitDepth}/${colorType}/${interlace})`);
  const channels=colorType===2?3:4, stride=width*channels, raw=inflateSync(Buffer.concat(compressed)), rgba=new Uint8Array(width*height*4), prev=new Uint8Array(stride); let offset=0;
  for(let y=0;y<height;y++){const filter=raw[offset++], row=new Uint8Array(stride); for(let x=0;x<stride;x++){const a=x>=channels?row[x-channels]:0,b=prev[x],c=x>=channels?prev[x-channels]:0,v=raw[offset++]; let p=0;
      if(filter===1)p=a; else if(filter===2)p=b; else if(filter===3)p=(a+b)>>1; else if(filter===4){const q=a+b-c,pa=Math.abs(q-a),pb=Math.abs(q-b),pc=Math.abs(q-c);p=pa<=pb&&pa<=pc?a:pb<=pc?b:c;} else if(filter!==0)fail(`unsupported filter ${filter}`); row[x]=(v+p)&255; }
    for(let x=0;x<width;x++){const s=x*channels,d=(y*width+x)*4;rgba[d]=row[s];rgba[d+1]=row[s+1];rgba[d+2]=row[s+2];rgba[d+3]=channels===4?row[s+3]:255;} prev.set(row);
  } return {width,height,data:rgba};
}
function chunk(type,data){const t=Buffer.from(type), body=Buffer.concat([t,data]), out=Buffer.alloc(data.length+12);out.writeUInt32BE(data.length,0);body.copy(out,4);let c=0xffffffff;for(const b of body)c=crcTable[(c^b)&255]^(c>>>8);out.writeUInt32BE((c^0xffffffff)>>>0,out.length-4);return out;}
function encodePng({width,height,data}){const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(width,0);ihdr.writeUInt32BE(height,4);ihdr[8]=8;ihdr[9]=6;const raw=Buffer.alloc(height*(width*4+1));for(let y=0;y<height;y++)Buffer.from(data.buffer,data.byteOffset+y*width*4,width*4).copy(raw,y*(width*4+1)+1);return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(raw,{level:9})),chunk('IEND',Buffer.alloc(0))]);}
function removeChecker(image){const {width:w,height:h,data}=image, candidate=new Uint8Array(w*h), seen=new Uint8Array(w*h), colors=new Map();for(let x=0;x<w;x++){for(const y of [0,h-1]){const i=(y*w+x)*4,key=`${data[i]>>3},${data[i+1]>>3},${data[i+2]>>3}`;colors.set(key,(colors.get(key)||0)+1);}}for(let y=1;y<h-1;y++)for(const x of [0,w-1]){const i=(y*w+x)*4,key=`${data[i]>>3},${data[i+1]>>3},${data[i+2]>>3}`;colors.set(key,(colors.get(key)||0)+1);}const dominant=[...colors].sort((a,b)=>b[1]-a[1]).slice(0,2).map(([k])=>k.split(',').map(Number).map(v=>v*8+4));
  for(let p=0;p<w*h;p++){const i=p*4,r=data[i]/255,g=data[i+1]/255,b=data[i+2]/255,lum=.2126*r+.7152*g+.0722*b,chroma=Math.max(r,g,b)-Math.min(r,g,b),near=dominant.some(c=>Math.hypot(r-c[0]/255,g-c[1]/255,b-c[2]/255)<=.08);candidate[p]=(lum>=.90&&chroma<=.035)||near?1:0;}
  const queue=[];for(let x=0;x<w;x++)queue.push(x,(h-1)*w+x);for(let y=1;y<h-1;y++)queue.push(y*w,y*w+w-1);for(let q=0;q<queue.length;q++){const p=queue[q];if(seen[p]||!candidate[p])continue;seen[p]=1;const x=p%w,y=(p/w)|0;if(x)queue.push(p-1);if(x+1<w)queue.push(p+1);if(y)queue.push(p-w);if(y+1<h)queue.push(p+w);}
  for(let p=0;p<w*h;p++){const i=p*4;if(seen[p])data[i]=data[i+1]=data[i+2]=data[i+3]=0;else data[i+3]=255;}return image;
}
function bands(asset){const l=asset.layout;if(l.xBands||l.yBands){const xs=l.xBands||[[0,1024]],ys=l.yBands||Array.from({length:l.rows},(_,row)=>[row*l.slotHeight,(row+1)*l.slotHeight]);return ys.flatMap(([y0,y1])=>xs.map(([x0,x1])=>[x0,y0,x1,y1]));}return Array.from({length:l.rows*l.columns},(_,i)=>{const x=i%l.columns,y=(i/l.columns)|0;return[x*l.slotWidth,y*l.slotHeight,(x+1)*l.slotWidth,(y+1)*l.slotHeight];});}
function extract(image, rect, cell, contain=true){let [x0,y0,x1,y1]=rect,minX=x1,minY=y1,maxX=x0-1,maxY=y0-1,count=0;for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){if(image.data[(y*image.width+x)*4+3]){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);count++;}}if(count<16)fail(`empty frame ${rect.join(',')}`);if(!contain){minX=x0;minY=y0;maxX=x1-1;maxY=y1-1;}const sw=maxX-minX+1,sh=maxY-minY+1,pad=contain?4:0,scale=Math.min((cell-pad*2)/sw,(cell-pad*2)/sh),dw=Math.max(1,Math.floor(sw*scale)),dh=Math.max(1,Math.floor(sh*scale)),ox=((cell-dw)/2)|0,oy=contain?cell-pad-dh:((cell-dh)/2)|0,out=new Uint8Array(cell*cell*4);for(let y=0;y<dh;y++)for(let x=0;x<dw;x++){const sx=minX+Math.min(sw-1,Math.floor(x*sw/dw)),sy=minY+Math.min(sh-1,Math.floor(y*sh/dh)),s=(sy*image.width+sx)*4,d=((oy+y)*cell+ox+x)*4;out[d]=image.data[s];out[d+1]=image.data[s+1];out[d+2]=image.data[s+2];out[d+3]=image.data[s+3];}return out;}
function mirrorCell(pixels,cell){const out=new Uint8Array(pixels.length);for(let y=0;y<cell;y++)for(let x=0;x<cell;x++){const s=(y*cell+x)*4,d=(y*cell+(cell-1-x))*4;out[d]=pixels[s];out[d+1]=pixels[s+1];out[d+2]=pixels[s+2];out[d+3]=pixels[s+3];}return out;}
function atlas(asset,image){const {columns,rows,cell}=asset.output, rects=bands(asset), output=new Uint8Array(columns*cell*rows*cell*4), frames=[], srcCols=asset.layout.xBands?asset.layout.xBands.length:columns, colMap=asset.layout.colMap??null;for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){const desired=directions[row], map=sourceRowMap[asset.id]??null;let sourceRow=map?map[desired]:row,fallback=null;const sourceCol=colMap?colMap[col]:col;let index=sourceRow*srcCols+sourceCol;if(index>=rects.length){sourceRow=0;index=Math.min(sourceCol,srcCols-1);fallback=`${desired}.${actorActions[asset.id]?.[col]??col}`;}let pixels=extract(image,rects[index],cell,!['tile','overlay'].includes(asset.role));if(map!==null&&mirroredDirections[asset.id]?.has(desired))pixels=mirrorCell(pixels,cell);for(let y=0;y<cell;y++){const target=((row*cell+y)*columns*cell+col*cell)*4;output.set(pixels.subarray(y*cell*4,(y+1)*cell*4),target);}frames.push({id:asset.role==='actor'?`${desired}.${actorActions[asset.id][col]}`:`${asset.id}.${row*columns+col}`,x:col*cell,y:row*cell,width:cell,height:cell,pivot:asset.role==='actor'?[32,54]:[cell>>1,cell>>1],...(fallback?{fallback}: {})});}return{width:columns*cell,height:rows*cell,data:output,frames};}
function tsManifest(entries){return `// Generated by scripts/process-intro-sprites.mjs. Do not edit.\nexport type IntroSpriteFrame = Readonly<{ id: string; x: number; y: number; width: number; height: number; pivot: readonly [number, number]; fallback?: string }>;\nexport type IntroSpriteAsset = Readonly<{ url: string; sha256: string; width: number; height: number; required: boolean; interpolation: 'nearest'; fps: number; frames: readonly IntroSpriteFrame[] }>;\nexport type IntroSpriteManifest = Readonly<Record<string, IntroSpriteAsset>>;\n\nexport const INTRO_SPRITE_MANIFEST = ${JSON.stringify(Object.fromEntries(entries),null,2)} as const satisfies IntroSpriteManifest;\n`}
async function main(){const check=process.argv.includes('--check');const approval=JSON.parse(await readFile(approvalPath,'utf8'));if(approval.version!==1||!Array.isArray(approval.assets))fail('invalid approval manifest');if(!check){await rm(outputDir,{recursive:true,force:true});await mkdir(outputDir,{recursive:true});}const entries=[];for(const asset of approval.assets){const source=await readFile(join(sourceDir,asset.source)).catch(()=>fail(`missing required source ${asset.source}`));if(sha(source)!==asset.sha256)fail(`approval hash drift: ${asset.source}`);const decoded=decodePng(source);if(decoded.width!==approval.sourceSize[0]||decoded.height!==approval.sourceSize[1])fail(`unexpected dimensions: ${asset.source}`);const packed=atlas(asset,removeChecker(decoded));const png=encodePng(packed);const outputPath=join(outputDir,asset.output.file);if(check){const current=await readFile(outputPath).catch(()=>fail(`generated output is missing: ${asset.output.file}`));if(!current.equals(png))fail(`generated output is stale: ${asset.output.file} (expected ${sha(png)}, got ${sha(current)})`);}else await writeFile(outputPath,png);entries.push([asset.id,{url:`/sprites/intro/${asset.output.file}`,sha256:sha(png),width:packed.width,height:packed.height,required:asset.required,interpolation:'nearest',fps:asset.role==='actor'?8:0,frames:packed.frames}]);}const generated=tsManifest(entries);if(check){const current=await readFile(generatedManifestPath,'utf8').catch(()=>fail('runtime manifest is missing'));if(current!==generated)fail(`runtime manifest is stale (expected ${sha(generated)}, got ${sha(current)})`);}else{await mkdir(dirname(generatedManifestPath),{recursive:true});await writeFile(generatedManifestPath,generated);}console.log(`${check?'Checked':'Processed'} ${entries.length} approved intro assets.`);}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
