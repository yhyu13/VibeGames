var t;
if(t == null)
{
   t = 5;
}
var sz = this._siz * this._sizz;
if(t <= 5)
{
   if(t == 2)
   {
      this.removeMovieClip();
   }
   else
   {
      this._sizz = (9 - t) / (8 - t);
      this._siz = this.sz * (8 - t) / 3;
   }
   this._alpha -= 25;
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
      if(t <= 5)
      {
         if(t == 2)
         {
            this.removeMovieClip();
         }
         else
         {
            this._sizz = (9 - t) / (8 - t);
            this._siz = this.sz * (8 - t) / 3;
         }
         this._alpha -= 25;
      }
      else
      {
         this._siz = sz;
         this._sizz = 1;
      }
   }
};
