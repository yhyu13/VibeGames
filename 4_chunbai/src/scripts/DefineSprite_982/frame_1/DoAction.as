var j = 0;
while(j <= 30)
{
   this.attachMovie("star","star" + j,this.getNextHighestDepth(),{_sW:3.141592653589793 * (random(30) - 15) / 15,_sH:3.141592653589793 * (random(30) - 15) / 30,_sR:0});
   this["star" + j].showcmr();
   j++;
}
this.attachMovie("mainBJ_" + random(4),"mainBJ",this.getNextHighestDepth(),{_sW:-0.3141592653589793,_sH:0,_sR:0});
this.attachMovie("sun","sun",this.getNextHighestDepth(),{_sW:0,_sH:1.5707963267948966,_sR:0});
