class clazz.wp_msbeamXX extends clazz.weapon_phix
{
   var fsn = 0;
   function wp_msbeamXX()
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
      if(this.t <= 0)
      {
         this.fsn = 0;
      }
      if((this.t <= 0 || this.t == this.ct - 6 * this.fsn && this._parent._parent[this._parent.tgt]._type != "ff") && this._zt == "nor")
      {
         if(this.fsound != null)
         {
            _global.snd(this.fsound);
         }
         if(this._parent.covon)
         {
            if(this._parent._parent[this._parent.tgt].AI != undefined)
            {
               this._parent._parent[this._parent.tgt].AI.ongp(this._parent._name);
            }
         }
         if(this._parent.ntact == 0)
         {
            this._parent.ntact = -5;
         }
         var _loc4_ = new Object();
         var _loc10_ = 0;
         if(this.fsn % 2 == 0)
         {
            _loc10_ = (0.5 * this.fsn - (this.fn - 1) / 2) * this.fx;
         }
         else
         {
            _loc10_ = (- (0.5 * this.fsn - 0.5 - (this.fn - 1) / 2)) * this.fx;
         }
         _loc4_ = _global.moveobj(this._parent.objz,_loc10_,this.fy,this.fz);
         if(this._parent._parent[this._parent.tgt]._type == "ff")
         {
            var _loc8_ = this._parent._parent[this._parent.tgt]._sX - this._parent._sX;
            var _loc7_ = this._parent._parent[this._parent.tgt]._sY - this._parent._sY;
            var _loc9_ = this._parent._parent[this._parent.tgt]._sZ - this._parent._sZ;
            var _loc11_ = _global.dist_3d(0,0,0,_loc8_,_loc7_,_loc9_);
            var _loc5_ = (_loc11_ + 200) / this.ddspeedlv;
            _loc8_ += (this._parent._parent[this._parent.tgt].v._sX - this._parent.v._sX) * _loc5_ - _loc4_.x + this._parent._sX;
            _loc7_ += (this._parent._parent[this._parent.tgt].v._sY - this._parent.v._sY) * _loc5_ - _loc4_.y + this._parent._sY;
            _loc9_ += (this._parent._parent[this._parent.tgt].v._sZ - this._parent.v._sZ) * _loc5_ - _loc4_.z + this._parent._sZ;
            var _loc12_ = Math.atan2(_loc8_,_loc7_);
            var _loc13_ = Math.atan2(_loc9_,_global.distance(0,0,_loc8_,_loc7_));
         }
         else
         {
            _loc12_ = this._parent.shotw;
            _loc13_ = this._parent.shoth;
         }
         this._parent._parent.attachMovie("dd_msbeam",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc4_.x,_sY:_loc4_.y,_sZ:_loc4_.z,_sW:_loc12_,_sH:_loc13_,_slo:random(20) + 10,_siz:this.fsiz});
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fx = _loc10_;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fy = this.fy;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fz = this.fz;
         if(this._parent.htime != null)
         {
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdx = this._parent._parent[this._parent.tgt].v._sX * this._parent.htime + this._parent._parent[this._parent.tgt]._sX;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdy = this._parent._parent[this._parent.tgt].v._sY * this._parent.htime + this._parent._parent[this._parent.tgt]._sY;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdz = this._parent._parent[this._parent.tgt].v._sZ * this._parent.htime + this._parent._parent[this._parent.tgt]._sZ;
         }
         else
         {
            _loc4_ = new Object();
            _loc4_ = _global.cTos(0,this.maxforce,0,this._parent.shotw,this._parent.shoth,0);
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdx = _loc4_.x + this._parent._sX;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdy = _loc4_.y + this._parent._sY;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdz = _loc4_.z + this._parent._sZ;
         }
         this.zdi = this.nxzdi();
         this._parent._EN -= this.en;
         if(this.fsn == 0)
         {
            this.t = this.ct;
         }
         this.fsn = this.fsn + 1;
         if(this.fsn == this.fn)
         {
            this.fsn = 0;
         }
         this._parent.atton = 5;
         if(this._parent.onkf > 0 && this.fsn > 0)
         {
            for(var _loc21_ in _root.cmrs)
            {
               if(this.fsn == this.fn)
               {
                  this.fsn = 0;
                  break;
               }
               if(_root.cmrs[_loc21_]._type == "ff" && _root.cmrs[_loc21_].tgt == this._parent._name && _loc21_ != this._parent.tgt)
               {
                  _loc8_ = _root.cmrs[_loc21_]._sX - this._parent._sX;
                  _loc7_ = _root.cmrs[_loc21_]._sY - this._parent._sY;
                  _loc9_ = _root.cmrs[_loc21_]._sZ - this._parent._sZ;
                  _loc11_ = _global.dist_3d(0,0,0,_loc8_,_loc7_,_loc9_);
                  var _loc6_ = new Object();
                  _loc6_ = _global.sToc(_loc8_,_loc7_,_loc9_,this._parent._sW,this._parent._sH,this._parent._sR);
                  if(_loc11_ < this.dstlv && _loc6_.y > 0 && Math.abs(_loc6_.x) < _global.Cmr.wrees * _loc6_.y && Math.abs(_loc6_.z) < _global.Cmr.hrees * _loc6_.y)
                  {
                     _loc4_ = new Object();
                     _loc10_ = 0;
                     if(this.fsn % 2 == 0)
                     {
                        _loc10_ = (0.5 * this.fsn - (this.fn - 1) / 2) * this.fx;
                     }
                     else
                     {
                        _loc10_ = (- (0.5 * this.fsn - 0.5 - (this.fn - 1) / 2)) * this.fx;
                     }
                     _loc4_ = _global.moveobj(this._parent.objz,_loc10_,this.fy,this.fz);
                     _loc5_ = (_loc11_ + 200) / this.ddspeedlv;
                     _loc8_ += (_root.cmrs[_loc21_].v._sX - this._parent.v._sX) * _loc5_ - _loc4_.x + this._parent._sX;
                     _loc7_ += (_root.cmrs[_loc21_].v._sY - this._parent.v._sY) * _loc5_ - _loc4_.y + this._parent._sY;
                     _loc9_ += (_root.cmrs[_loc21_].v._sZ - this._parent.v._sZ) * _loc5_ - _loc4_.z + this._parent._sZ;
                     _loc12_ = Math.atan2(_loc8_,_loc7_);
                     _loc13_ = Math.atan2(_loc9_,_global.distance(0,0,_loc8_,_loc7_));
                     if(_root.cmrs[_loc21_].v.AI != undefined)
                     {
                        _root.cmrs[_loc21_].v.AI.onshoot(this._parent._name);
                     }
                     this._parent._parent.attachMovie("dd_msbeam",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc4_.x,_sY:_loc4_.y,_sZ:_loc4_.z,_sW:_loc12_,_sH:_loc13_,_slo:random(20) + 10,_siz:this.fsiz});
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = _loc21_;
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fx = _loc10_;
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fy = this.fy;
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fz = this.fz;
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdx = _root.cmrs[_loc21_].v._sX * _loc5_ + _root.cmrs[_loc21_]._sX;
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdy = _root.cmrs[_loc21_].v._sY * _loc5_ + _root.cmrs[_loc21_]._sY;
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mdz = _root.cmrs[_loc21_].v._sZ * _loc5_ + _root.cmrs[_loc21_]._sZ;
                     this.zdi = this.nxzdi();
                     this._parent._EN -= this.en;
                     this.fsn = this.fsn + 1;
                  }
               }
            }
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
