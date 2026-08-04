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
