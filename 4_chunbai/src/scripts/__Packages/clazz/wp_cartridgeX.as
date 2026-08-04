class clazz.wp_cartridgeX extends clazz.weapon_phix
{
   var seths;
   var Rtemp;
   var ln = 0;
   function wp_cartridgeX()
   {
      super();
      this.seths = function()
      {
         if(this.ln > 0 && this.cn < this.maxcn)
         {
            if(this.lnt >= this.lct)
            {
               this.ln = this.ln - 1;
               this.cn = this.cn + 1;
               this.lnt = 0;
               this._zt = "nor";
            }
            else
            {
               this.lnt = this.lnt + 1;
            }
         }
      };
   }
   function linkdata(weapondata)
   {
      for(var _loc3_ in weapondata)
      {
         this[_loc3_] = weapondata[_loc3_];
      }
      if(this.ddspeedlv <= 100)
      {
         this.srlv = 5;
      }
      else
      {
         this.srlv = 1;
      }
      this.zdi = 0;
      this.t = 0;
      this.cn = this.maxcn;
      this.ln = this.maxcn * this.maxcnn - this.cn;
   }
   function doit()
   {
      if(this.t <= 0 && this.cn > 0 && this._zt == "nor")
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
         _loc4_._sX = this._parent._sX;
         _loc4_._sY = this._parent._sY;
         _loc4_._sZ = this._parent._sZ;
         _loc4_._sW = this._parent.shotw;
         _loc4_._sH = this._parent.shoth;
         _loc4_._sR = this._parent._sR;
         var _loc7_ = new Object();
         var _loc9_ = new Object();
         var _loc3_ = 0;
         while(_loc3_ < this.fn)
         {
            var _loc6_ = _loc3_ + 1;
            if(_loc6_ == this.fn)
            {
               _loc6_ = 0;
            }
            var _loc8_ = new Object();
            if(this.zdi % (this.fn * 30) < this.fn * 15)
            {
               _loc8_.rx = 0.9 * this.Rtemp[_loc3_].rx + 0.1 * this.Rtemp[_loc6_].rx;
               _loc8_.rz = 0.9 * this.Rtemp[_loc3_].rz + 0.1 * this.Rtemp[_loc6_].rz;
            }
            else
            {
               _loc8_.rx = 1.1 * this.Rtemp[_loc3_].rx - 0.1 * this.Rtemp[_loc6_].rx;
               _loc8_.rz = 1.1 * this.Rtemp[_loc3_].rz - 0.1 * this.Rtemp[_loc6_].rz;
            }
            this.Rtemp[_loc3_] = _loc8_;
            _loc3_ = _loc3_ + 1;
         }
         var _loc5_ = 0;
         while(_loc5_ < this.fn)
         {
            _loc4_._sW = this._parent.objz._sW;
            _loc4_._sH = this._parent.objz._sH;
            _loc7_ = _global.moveobj(_loc4_,this.fx,(_loc5_ - (this.fn - 1) / 2) * this.fy,this.fz);
            _loc4_._sW = this._parent.shotw;
            _loc4_._sH = this._parent.shoth;
            if(_loc5_ == Math.floor(this.fn / 2))
            {
               _loc9_ = _global.moveobj(_loc4_,0,this._parent.dst,0);
            }
            else
            {
               _loc9_ = _global.moveobj(_loc4_,this.Rtemp[_loc5_].rx,this._parent.dst,this.Rtemp[_loc5_].rz);
            }
            var _loc11_ = _loc9_.x - _loc7_.x;
            var _loc10_ = _loc9_.y - _loc7_.y;
            var _loc12_ = _loc9_.z - _loc7_.z;
            var _loc13_ = Math.atan2(_loc11_,_loc10_);
            var _loc14_ = Math.atan2(_loc12_,_global.distance(0,0,_loc11_,_loc10_));
            this._parent._parent.attachMovie("dd_cartridge",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc7_.x,_sY:_loc7_.y,_sZ:_loc7_.z,_sW:_loc13_,_sH:_loc14_,_slo:this.ddspeedlv,_siz:0.01,_sizz:100 * this.fsiz});
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
            this.zdi = this.nxzdi();
            this.cn -= 1;
            _loc5_ = _loc5_ + 1;
         }
         this._parent.atton = 5;
         if(this.cn <= 0)
         {
            if(this.ln <= 0)
            {
               this._zt = "emp";
            }
         }
         this.t = this.ct;
      }
   }
   function showit()
   {
      if(this.fn > 6)
      {
         var _loc3_ = 0;
         while(_loc3_ < this.fn)
         {
            var _loc2_ = new Object();
            _loc2_.rx = (random(21) - 10) * 10;
            _loc2_.rz = (random(21) - 10) * 10;
            this.Rtemp[_loc3_] = _loc2_;
            _loc3_ = _loc3_ + 1;
         }
      }
      if(this._parent._parent[this._parent._name + "_wp"] != undefined)
      {
         this._parent._parent[this._parent._name + "_wp"].removeMovieClip();
      }
   }
}
