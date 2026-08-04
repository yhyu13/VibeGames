stop();
this.t = 0;
_parent[mst].weaponhold = false;
onEnterFrame = function()
{
   if(!stopAll)
   {
      if(this._parent[mst]._SP >= 10000)
      {
         if(t >= 150)
         {
            if(!mz)
            {
               mz = true;
               this._parent[mst].weaponCD = 30;
               this._parent[mst].SPcap += 5000;
            }
         }
         else
         {
            this._parent[mst].ntact = -5;
         }
      }
      if(t > 300 || this._parent[mst]._SP < 10000)
      {
         if(this._parent[mst].weaponCD < 60)
         {
            this._parent[mst].weaponCD = 60;
         }
         this._parent[mst][this.wpname].t = this._parent[mst][this.wpname].ct;
         this._parent[mst][this.wpname].lockmod = 3;
         this.removeMovieClip();
      }
      else
      {
         t++;
         if(_parent[mst] != undefined)
         {
            _parent[mst].ntcd = 0;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpmax = 30;
            this._parent[mst]["weapon" + this._parent[mst].weaponow].xpon = true;
            this._parent[mst].spEX = 30;
            if(mz)
            {
               this._parent[mst].ntact = 5;
               this._parent[mst].weaponCD = 30;
            }
            else
            {
               var _loc3_ = 1;
               while(_loc3_ <= 8)
               {
                  _parent[mst]["weapon" + _loc3_].callit();
                  _loc3_ = _loc3_ + 1;
               }
            }
         }
         else
         {
            this.removeMovieClip();
         }
      }
   }
};
