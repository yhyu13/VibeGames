var mst;
onEnterFrame = function()
{
   if(!stopAll)
   {
      if(this._parent[mst] != undefined)
      {
         if(this._alpha < 10)
         {
            this.removeMovieClip();
         }
         else
         {
            this._alpha -= 25;
         }
      }
      else
      {
         this.removeMovieClip();
      }
   }
};
