onClipEvent(load){
   this.t = 28;
   this.gotoAndStop(7);
   this.onEnterFrame = function()
   {
      if(this.t % 4 == 0)
      {
         this.gotoAndStop(this.t / 4);
      }
      if(this.t == 25)
      {
         this.onEnterFrame = null;
      }
      else if(this.t == 28)
      {
         this.t = 1;
      }
      else
      {
         this.t = this.t + 1;
      }
   };
}
