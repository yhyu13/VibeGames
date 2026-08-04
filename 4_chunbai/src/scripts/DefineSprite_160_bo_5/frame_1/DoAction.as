var sndon;
if(sndon == null)
{
   sndon = 0;
}
if(sndon == 0)
{
   snd("bo1");
}
_rotation = random(180);
this.stop();
onEnterFrame = function()
{
   if(!stopAll)
   {
      this.play();
   }
   else
   {
      this.stop();
   }
};
