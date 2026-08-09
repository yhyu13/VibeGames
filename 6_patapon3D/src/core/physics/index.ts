import type { Vec3 } from '../voxel/index.js';
export interface ArrowState { position: Vec3; previous: Vec3; velocity: Vec3 }
export interface Ellipsoid { center: Vec3; radii: Vec3 }
export interface Hit { point: Vec3; normal: Vec3; t: number }
export interface DebrisState { active: boolean; sleeping: boolean; position: Vec3; previous: Vec3; velocity: Vec3; age: number }
export const stepArrow = (s: ArrowState, dt: number): void => { s.previous = {...s.position}; s.velocity.y -= 9.8*dt; s.position.x += s.velocity.x*dt; s.position.y += s.velocity.y*dt; s.position.z += s.velocity.z*dt; };
export function intersectEllipsoid(a: Vec3, b: Vec3, e: Ellipsoid): Hit | null {
  const p={x:(a.x-e.center.x)/e.radii.x,y:(a.y-e.center.y)/e.radii.y,z:(a.z-e.center.z)/e.radii.z}; const d={x:(b.x-a.x)/e.radii.x,y:(b.y-a.y)/e.radii.y,z:(b.z-a.z)/e.radii.z};
  const aa=d.x*d.x+d.y*d.y+d.z*d.z, bb=2*(p.x*d.x+p.y*d.y+p.z*d.z), cc=p.x*p.x+p.y*p.y+p.z*p.z-1, disc=bb*bb-4*aa*cc; if(disc<0||aa===0)return null;
  const t=(-bb-Math.sqrt(disc))/(2*aa); if(t<0||t>1)return null; const point={x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t}; const n={x:(point.x-e.center.x)/(e.radii.x**2),y:(point.y-e.center.y)/(e.radii.y**2),z:(point.z-e.center.z)/(e.radii.z**2)}; const l=Math.hypot(n.x,n.y,n.z)||1; return {point,normal:{x:n.x/l,y:n.y/l,z:n.z/l},t};
}
export function stepDebris(pool: DebrisState[], dt: number, ground: number): void { for(const p of pool){if(!p.active||p.sleeping)continue;p.previous.x=p.position.x;p.previous.y=p.position.y;p.previous.z=p.position.z;p.age+=dt;p.velocity.y-=9.8*dt;p.position.x+=p.velocity.x*dt;p.position.y+=p.velocity.y*dt;p.position.z+=p.velocity.z*dt;if(p.position.y<ground){p.position.y=ground;p.velocity.y=Math.abs(p.velocity.y)*.34;p.velocity.x*=.7;p.velocity.z*=.7;}if(p.age>=3.99){p.active=false;p.sleeping=true;}else if(p.position.y===ground&&Math.hypot(p.velocity.x,p.velocity.y,p.velocity.z)<.18){p.sleeping=true;}} }
