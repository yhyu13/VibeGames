class clazz.wp_fyEX extends clazz.weapon_phix
{
   var seths;
   var xp = 0;
   var xpmax = 0;
   var xpon = false;
   function wp_fyEX()
   {
      super();
      this.seths = function()
      {
         if(this.xpon && this.xp >= 0)
         {
            this.xp = this.xp + 1;
            if(this.xp > this.xpmax)
            {
               this.xp = this.xpmax;
            }
         }
         else
         {
            this.xpmax = - this.ct;
            this.xp = - this.t;
         }
         this.xpon = false;
         if(this._parent._SP < 10000)
         {
            this._zt = "nosp";
         }
         else
         {
            this._zt = "nor";
            var _loc3_ = 0;
            var _loc2_ = 1;
            while(_loc2_ <= 8)
            {
               if(this._parent["weapon" + _loc2_].ftype == "fy" || this._parent["weapon" + _loc2_].ftype == "fyGD")
               {
                  this._parent["weapon" + _loc2_].cn + this._parent["weapon" + _loc2_].callit();
                  _loc3_ += this._parent["weapon" + _loc2_].cn + this._parent["weapon" + _loc2_].fyBn;
               }
               _loc2_ = _loc2_ + 1;
            }
            if(_loc3_ < 3)
            {
               this._zt = "nofy";
            }
         }
      };
   }
   function doit()
   {
      if(this._parent._parent[this._parent._name + this._name + "_" + this.przdi()] == undefined)
      {
         if(this._parent._EN >= this.en && this._zt == "noen")
         {
            this._zt = "nor";
         }
         if(this._parent._EN < this.en && this._zt == "nor")
         {
            this._zt = "noen";
         }
         if(this._parent._SP < 10000)
         {
            this._zt = "nosp";
            return false;
         }
         if(this.t <= 0 && this._zt == "nor")
         {
            this._parent.weaponhold = true;
            this._parent._parent.attachMovie("ob_fyEX",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:this._parent._sX,_sY:this._parent._sY,_sZ:this._parent._sZ});
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wpname = this._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fn = this.fn;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fsiz = this.fsiz;
            this.zdi = this.nxzdi();
            this._parent._EN -= this.en;
            this._parent.atton = 5;
            this.lockmod = 2;
            var _loc2_ = 1;
            while(_loc2_ <= 8)
            {
               if(this._parent["weapon" + _loc2_].ftype == "fy" || this._parent["weapon" + _loc2_].ftype == "fyGD")
               {
                  this._parent["weapon" + _loc2_].t = 0;
               }
               _loc2_ = _loc2_ + 1;
            }
            this._parent.SPcap += 5000;
            this._parent.spEX = 30;
         }
      }
   }
   function showit()
   {
      if(this._parent._parent[this._parent._name + "_wp"] != undefined)
      {
         this._parent._parent[this._parent._name + "_wp"].removeMovieClip();
      }
   }
}
