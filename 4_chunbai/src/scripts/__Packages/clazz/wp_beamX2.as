class clazz.wp_beamX2 extends clazz.weapon_phix
{
   function wp_beamX2()
   {
      super();
   }
   function doit()
   {
      if(this._parent.lockon)
      {
         this._parent.FDon = 10;
      }
      if(this._parent._EN >= this.en && this._zt == "noen")
      {
         this._zt = "nor";
      }
      if(this._parent._EN < this.en && this._zt == "nor")
      {
         this._zt = "noen";
      }
      if(this.t <= 0 && this._zt == "nor")
      {
         if(this.fsound != null)
         {
            _global.snd(this.fsound);
         }
         if(this._parent.covon)
         {
            if(this._parent._parent[this._parent.tgt].AI != undefined)
            {
               this._parent._parent[this._parent.tgt].AI.onshoot(this._parent._name);
            }
         }
         if(this._parent.ntact == 0)
         {
            this._parent.ntact = -5;
         }
         var _loc3_ = new Object();
         _loc3_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
         this._parent._parent.attachMovie("dd_beam",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth,_slo:random(20) + 10,_siz:this.fsiz});
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
         var _loc4_ = this.ct - 1;
         if(_loc4_ >= 6)
         {
            _loc4_ = 6;
         }
         else
         {
            _loc4_ = 0.5 * _loc4_;
            if(_loc4_ < 1)
            {
               _loc4_ = 1;
            }
         }
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxlong = _loc4_ * this.ddspeedlv;
         this.zdi = this.nxzdi();
         if(this.fn > 1)
         {
            _loc3_ = _global.moveobj(this._parent.objz,- this.fx,this.fy,this.fz);
            this._parent._parent.attachMovie("dd_beam",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth,_slo:random(20) + 10,_siz:this.fsiz});
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxlong = _loc4_ * this.ddspeedlv;
            this.zdi = this.nxzdi();
         }
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
