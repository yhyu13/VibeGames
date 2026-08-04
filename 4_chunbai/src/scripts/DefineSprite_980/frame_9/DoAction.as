var t = 0;
stop();
onEnterFrame = function()
{
   if(this.t <= mblength(this.temp))
   {
      this.e3 = mbsubstring(this.temp,1,this.t);
   }
   else
   {
      onEnterFrame = null;
      this.play();
   }
   this.t = this.t + 1;
};
