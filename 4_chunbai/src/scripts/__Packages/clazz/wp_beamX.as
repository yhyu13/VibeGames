class clazz.wp_beamX extends clazz.weapon_phix
{
   var Rtemp;
   function wp_beamX()
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
         var _loc3_ = new Object();
         _loc3_._sX = this._parent._sX;
         _loc3_._sY = this._parent._sY;
         _loc3_._sZ = this._parent._sZ;
         _loc3_._sW = this._parent.shotw;
         _loc3_._sH = this._parent.shoth;
         _loc3_._sR = this._parent._sR;
         var _loc7_ = new Object();
         var _loc9_ = new Object();
         if(this.fn > 6)
         {
            var _loc5_ = 0;
            while(_loc5_ < this.fn)
            {
               var _loc8_ = _loc5_ + 1;
               if(_loc8_ == this.fn)
               {
                  _loc8_ = 0;
               }
               var _loc10_ = new Object();
               if(this.zdi % (this.fn * 20) < this.fn * 10)
               {
                  _loc10_.rx = 0.9 * this.Rtemp[_loc5_].rx + 0.1 * this.Rtemp[_loc8_].rx;
                  _loc10_.rz = 0.9 * this.Rtemp[_loc5_].rz + 0.1 * this.Rtemp[_loc8_].rz;
               }
               else
               {
                  _loc10_.rx = 1.1 * this.Rtemp[_loc5_].rx - 0.1 * this.Rtemp[_loc8_].rx;
                  _loc10_.rz = 1.1 * this.Rtemp[_loc5_].rz - 0.1 * this.Rtemp[_loc8_].rz;
               }
               this.Rtemp[_loc5_] = _loc10_;
               _loc5_ = _loc5_ + 1;
            }
         }
         var _loc4_ = 0;
         while(_loc4_ < this.fn)
         {
            if(this.fn > 6)
            {
               _loc3_._sW = this._parent.objz._sW;
               _loc3_._sH = this._parent.objz._sH;
               _loc7_ = _global.moveobj(_loc3_,this.fx,(_loc4_ - (this.fn - 1) / 2) * this.fy,this.fz);
               _loc3_._sW = this._parent.shotw;
               _loc3_._sH = this._parent.shoth;
               if(_loc4_ == Math.floor(this.fn / 2))
               {
                  _loc9_ = _global.moveobj(_loc3_,0,this._parent.dst,0);
               }
               else
               {
                  _loc9_ = _global.moveobj(_loc3_,this.Rtemp[_loc4_].rx,this._parent.dst,this.Rtemp[_loc4_].rz);
               }
            }
            else
            {
               _loc7_ = _global.moveobj(_loc3_,(_loc4_ - (this.fn - 1) / 2) * this.fx,this.fy,this.fz);
               if(this._parent._parent[this._parent.tgt]._type == "ff" && this.fn % 2 == 0)
               {
                  _loc9_ = _global.moveobj(_loc3_,2 * (_loc4_ - this.fn / 2) * this.fx,this.fy + 100,this.fz);
               }
               else
               {
                  _loc9_ = _global.moveobj(_loc3_,2 * (_loc4_ - (this.fn - 1) / 2) * this.fx,this.fy + 100,this.fz);
               }
            }
            var _loc12_ = _loc9_.x - _loc7_.x;
            var _loc11_ = _loc9_.y - _loc7_.y;
            var _loc13_ = _loc9_.z - _loc7_.z;
            var _loc14_ = Math.atan2(_loc12_,_loc11_);
            var _loc15_ = Math.atan2(_loc13_,_global.distance(0,0,_loc12_,_loc11_));
            this._parent._parent.attachMovie("dd_beam",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc7_.x,_sY:_loc7_.y,_sZ:_loc7_.z,_sW:_loc14_,_sH:_loc15_,_slo:1,_siz:this.fsiz});
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
            var _loc6_ = this.ct - 1;
            if(_loc6_ >= 6)
            {
               _loc6_ = 6;
            }
            else
            {
               _loc6_ = 0.5 * _loc6_;
               if(_loc6_ < 1)
               {
                  _loc6_ = 1;
               }
            }
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxlong = _loc6_ * this.ddspeedlv;
            this.zdi = this.nxzdi();
            _loc4_ = _loc4_ + 1;
         }
         this._parent._EN -= this.en;
         this.t = this.ct;
         this._parent.atton = 5;
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
