function itrace(txt, tm)
{
   if(tm == null)
   {
      tm = 90;
   }
   if(tn > 15)
   {
      iclear();
   }
   this.attachMovie("tracer","txter_" + this.tn,this.getNextHighestDepth(),{_x:0,_y:18 * tn,txt:txt,n:this.tn});
   this.tn = this.tn + 1;
   this.t = tm;
}
function iclear()
{
   var _loc2_ = 0;
   while(_loc2_ < this.tn)
   {
      this["txter_" + _loc2_].removeMovieClip();
      _loc2_ = _loc2_ + 1;
   }
   this.tn = 0;
   this.t = 0;
}
var tn = 0;
var t = 0;
onEnterFrame = function()
{
   if(this.t > 0)
   {
      this.t = this.t - 1;
   }
};
