class clazz.wp_msbeam extends clazz.weapon_phix
{
   function wp_msbeam()
   {
      super();
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
                  this._parent._parent[this._parent.tgt].AI.ongp();
               }
            }
            this._parent.weaponhold = true;
            if(this._parent.ntact == 0)
            {
               this._parent.ntact = -5;
            }
            var _loc3_ = new Object();
            _loc3_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
            if(this.fsiz >= 10)
            {
               this._parent._parent.attachMovie("dd_mSsbeam",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth,_siz:this.fsiz});
            }
            else
            {
               this._parent._parent.attachMovie("dd_msbeam",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth,_siz:this.fsiz});
            }
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fx = this.fx;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fy = this.fy;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fz = this.fz;
            if(this._parent.htime != null)
            {
               if(this._parent.lockon)
               {
                  this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdx = this._parent._parent[this._parent.tgt].v._sX * this._parent.htime + this._parent._parent[this._parent.tgt]._sX;
                  this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdy = this._parent._parent[this._parent.tgt].v._sY * this._parent.htime + this._parent._parent[this._parent.tgt]._sY;
                  this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdz = this._parent._parent[this._parent.tgt].v._sZ * this._parent.htime + this._parent._parent[this._parent.tgt]._sZ;
               }
               else
               {
                  _loc3_ = new Object();
                  _loc3_ = _global.cTos(0,this._parent.dst,0,this._parent.shotw,this._parent.shoth,0);
                  this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdx = _loc3_.x + this._parent._sX;
                  this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdy = _loc3_.y + this._parent._sY;
                  this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdz = _loc3_.z + this._parent._sZ;
               }
            }
            else
            {
               _loc3_ = new Object();
               _loc3_ = _global.cTos(0,this.maxforce,0,this._parent.shotw,this._parent.shoth,0);
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdx = _loc3_.x + this._parent._sX;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdy = _loc3_.y + this._parent._sY;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdz = _loc3_.z + this._parent._sZ;
            }
            this.zdi = this.nxzdi();
            this._parent._EN -= this.en;
            this._parent.atton = 5;
            this.t = this.ct;
         }
      }
      else if(this.fsiz >= 10)
      {
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
