class clazz.wp_sbeamB extends clazz.weapon_phix
{
   var seths;
   var xp = 0;
   var xpmax = 0;
   var xpon = false;
   function wp_sbeamB()
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
         if(this.t <= 0 && this._parent.lockon && this._zt == "nor")
         {
            this._parent.weaponhold = true;
            if(this._parent.ntact == 0)
            {
               this._parent.ntact = -5;
            }
            var _loc3_ = new Object();
            _loc3_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
            this._parent._parent.attachMovie("dd_sbeamB",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth,_siz:this.fsiz,_alpha:0});
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fx = this.fx;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fy = this.fy;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fz = this.fz;
            this.zdi = this.nxzdi();
            this._parent.atton = 5;
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
