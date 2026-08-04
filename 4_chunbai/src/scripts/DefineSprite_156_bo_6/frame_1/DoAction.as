snd("bo0");
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
