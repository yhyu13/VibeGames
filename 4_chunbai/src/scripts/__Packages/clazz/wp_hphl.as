class clazz.wp_hphl extends clazz.weapon_phix
{
   var seths;
   var xp = 0;
   var xpmax = 0;
   var xpon = false;
   function wp_hphl()
   {
      super();
      this.seths = function()
      {
         if(this._parent._SP < 7500)
         {
            this._zt = "nosp";
         }
      };
   }
   function doit()
   {
      if(this._parent._EN >= this.en && this._zt == "noen")
      {
         this._zt = "nor";
      }
      if(this._parent._EN < this.en && this._zt == "nor")
      {
         this._zt = "noen";
      }
      if(this.t <= 0 && this._parent.firectrlmode == "AUTO" && this._parent.htime != null && this._zt == "nor")
      {
         if(this.fsound != null)
         {
            _global.snd(this.fsound);
         }
         var _loc3_ = new Object();
         _loc3_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
         this._parent._parent.attachMovie("dd_hphl",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth});
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wpname = this._name;
         this.zdi = this.nxzdi();
         this._parent.atton = 5;
         this._parent._EN -= this.en;
         this.t = this.ct;
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
