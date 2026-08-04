var i = 1;
while(i <= 15)
{
   this.attachMovie("hxxx","hsx" + i,this.getNextHighestDepth(),{_rotation:3.6 * random(100),_xscale:150 + random(100)});
   i++;
}
snd("bo1");
