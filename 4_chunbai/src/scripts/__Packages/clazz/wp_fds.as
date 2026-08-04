class clazz.wp_fds extends clazz.weapon_phix
{
   var seths;
   var fireauto;
   var ln = 0;
   function wp_fds()
   {
      super();
      this.seths = function()
      {
         if(this.ln > 0 && this.cn <= 0)
         {
            if(this.lnt < this.lct)
            {
               this._zt = "loading";
               this.lnt = this.lnt + 1;
               if(this._parent.skill_7 > 0 && this._parent._SP > 7500)
               {
                  this.lnt = this.lnt + 1;
               }
            }
            else
            {
               this._zt = "nor";
               this.lnt = 0;
               if(this.ln < this.maxcn)
               {
                  this.cn = this.ln;
                  this.ln = 0;
               }
               else
               {
                  this.cn = this.maxcn;
                  this.ln -= this.maxcn;
               }
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
      if(this._parent.skill_4 > 0)
      {
         this.maxcnn *= 2;
         this.cnn = this.maxcnn;
      }
      this.ln = this.maxcn * this.maxcnn - this.cn;
   }
   function doit()
   {
      if(this.t <= 0 && this.cn > 0 && this._parent.lockon && this._zt == "nor")
      {
         var _loc7_ = 0.5;
         if(this.fy < 0)
         {
            _loc7_ = 1;
         }
         else if(this.fy > 0)
         {
            _loc7_ = 0.1;
         }
         if(this._parent.onkf > 0)
         {
            var _loc6_ = 1;
            for(var _loc19_ in _root.cmrs)
            {
               if(_root.cmrs[_loc19_]._type == "ff" && _root.cmrs[_loc19_].tgt == this._parent._name)
               {
                  if(_loc6_ <= this.fn && this.cn > 0)
                  {
                     var _loc10_ = _root.cmrs[_loc19_]._sX - this._parent._sX;
                     var _loc9_ = _root.cmrs[_loc19_]._sY - this._parent._sY;
                     var _loc8_ = _root.cmrs[_loc19_]._sZ - this._parent._sZ;
                     var _loc12_ = _global.dist_3d(0,0,0,_loc10_,_loc9_,_loc8_);
                     var _loc4_ = new Object();
                     _loc4_ = _global.sToc(_loc10_,_loc9_,_loc8_,this._parent._sW,this._parent._sH,this._parent._sR);
                     if(_loc12_ < this.dstlv && _loc4_.y > 0 && Math.abs(_loc4_.x) < _global.Cmr.wrees * _loc4_.y && Math.abs(_loc4_.z) < _global.Cmr.hrees * _loc4_.y)
                     {
                        _loc6_ = _loc6_ + 1;
                        var _loc5_ = new Object();
                        _loc5_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
                        this._parent._parent.attachMovie("dd_fd",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc5_.x,_sY:_loc5_.y,_sZ:_loc5_.z,_sW:this._parent.shotw + _loc7_ * (random(25) - 12) * 3.141592653589793 / 20,_sH:this._parent.shoth + _loc7_ * (random(25) - 12) * 3.141592653589793 / 20,_alpha:0});
                        this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
                        this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = _loc19_;
                        this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
                        this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
                        this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
                        this._parent._parent[this._parent._name + this._name + "_" + this.zdi].rg = this.rg;
                        this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fsiz = this.fsiz;
                        this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fsound = this.fsound;
                        this._parent._parent[this._parent._name + this._name + "_" + this.zdi].t = -3 * (_loc6_ - 1);
                        var _loc11_ = Math.round(100 / this.ddspeedlv);
                        if(_loc11_ > 0)
                        {
                           this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wjlv = _loc11_;
                        }
                        else
                        {
                           this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wjlv = 1;
                        }
                        this._parent._parent[this._parent._name + this._name + "_" + this.zdi].linelist = this.mod;
                        this.zdi = this.nxzdi();
                        this.cn -= 1;
                     }
                  }
               }
            }
         }
         else
         {
            _loc6_ = 1;
            while(_loc6_ <= this.fn && this.cn > 0)
            {
               _loc5_ = new Object();
               _loc5_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
               this._parent._parent.attachMovie("dd_fd",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc5_.x,_sY:_loc5_.y,_sZ:_loc5_.z,_sW:this._parent.shotw + _loc7_ * (random(25) - 12) * 3.141592653589793 / 20,_sH:this._parent.shoth + _loc7_ * (random(25) - 12) * 3.141592653589793 / 20,_alpha:0});
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].rg = this.rg;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fsiz = this.fsiz;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fsound = this.fsound;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].t = -3 * (_loc6_ - 1);
               _loc11_ = Math.round(100 / this.ddspeedlv);
               if(_loc11_ > 0)
               {
                  this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wjlv = _loc11_;
               }
               else
               {
                  this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wjlv = 1;
               }
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].linelist = this.mod;
               this.zdi = this.nxzdi();
               this.cn -= 1;
               if(this._parent._parent[this._parent.tgt]._type == "ff")
               {
                  break;
               }
               _loc6_ = _loc6_ + 1;
            }
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
         this._parent.grx = 0;
         this._parent.grz = 0;
         this._parent.gry = 0;
         this._parent.rlv = 0;
         this._parent.firectrl = function()
         {
            this.fireauto();
         };
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
