var t;
if(t == null)
{
   t = 4;
}
var sz = this._siz * this._sizz;
if(t < 4)
{
   if(t == 0)
   {
      this.removeMovieClip();
   }
   else
   {
      this._sizz = (t - 1) / t;
      this._siz = this.sz * t / 4;
   }
}
else
{
   this._siz = sz;
   this._sizz = 1;
}
onEnterFrame = function()
{
   if(!stopAll)
   {
      t--;
      if(t < 4)
      {
         if(t == 0)
         {
            this.removeMovieClip();
         }
         else
         {
            this._sizz = (t - 1) / t;
            this._siz = this.sz * t / 4;
         }
      }
      else
      {
         this._siz = sz;
         this._sizz = 1;
      }
   }
};
