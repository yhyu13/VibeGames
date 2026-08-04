var mst1;
var mst2;
onEnterFrame = function()
{
   if(!stopAll)
   {
      this.onEntF();
      if(_parent[mst1] == undefined || _parent[mst2] == undefined)
      {
         this.removeMovieClip();
      }
   }
};
