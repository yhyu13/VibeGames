class clazz.wp_beams extends clazz.weapon_phix
{
   function wp_beams()
   {
      super();
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
         var _loc4_ = new Object();
         _loc4_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
         var _loc3_ = 0;
         while(_loc3_ < 10)
         {
            this._parent._parent.attachMovie("dd_beam",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc4_.x,_sY:_loc4_.y,_sZ:_loc4_.z,_sW:this._parent.shotw + (random(10) - 5) * 0.002 * 3.141592653589793,_sH:this._parent.shoth + (random(10) - 5) * 0.002 * 3.141592653589793,_slo:random(20) + 10,_siz:this.fsiz});
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxlong = 2 * this.ddspeedlv + random(200);
            this.zdi = this.nxzdi();
            _loc3_ = _loc3_ + 1;
         }
         this._parent._EN -= this.en;
         this.t = this.ct;
         this._parent.atton = 5;
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
