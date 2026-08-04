class clazz.wp_fj extends clazz.weapon_phix
{
   var seths;
   var fjn;
   var ln = 0;
   var fj = 0;
   function wp_fj()
   {
      super();
      this.seths = function()
      {
         this.fjn = 0;
         var _loc2_ = 1;
         while(_loc2_ <= this.maxcn)
         {
            if(this._parent._parent[this._parent._name + this._name + "_" + _loc2_] != undefined)
            {
               this.fjn = this.fjn + 1;
            }
            _loc2_ = _loc2_ + 1;
         }
         if(this.ln > 0 && this.cn + this.fjn < this.maxcn)
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
         if(this._parent._SP < 7500)
         {
            this._zt = "nosp";
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
         this.srlv = 500;
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
         var _loc4_ = 0;
         var _loc3_ = 1;
         while(_loc3_ <= this.maxcn)
         {
            if(this._parent._parent[this._parent._name + this._name + "_" + _loc3_] == undefined)
            {
               _loc4_ = _loc3_;
               break;
            }
            _loc3_ = _loc3_ + 1;
         }
         if(_loc4_ > 0)
         {
            var _loc5_ = new Object();
            _loc5_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
            this._parent._parent.attachMovie("dd_fj",this._parent._name + this._name + "_" + _loc4_,this._parent._parent.getNextHighestDepth(),{_sX:_loc5_.x,_sY:_loc5_.y,_sZ:_loc5_.z,_sW:this._parent._sW,_sH:this._parent._sH});
            this._parent._parent[this._parent._name + this._name + "_" + _loc4_].mst = this._parent._name;
            this._parent._parent[this._parent._name + this._name + "_" + _loc4_].tgt = this._parent.tgt;
            this._parent._parent[this._parent._name + this._name + "_" + _loc4_].dam = this.damlv;
            this._parent._parent[this._parent._name + this._name + "_" + _loc4_].maxforce = this.maxforce;
            this._parent._parent[this._parent._name + this._name + "_" + _loc4_].speed = this.ddspeedlv;
            this._parent._parent[this._parent._name + this._name + "_" + _loc4_].rg = this.rg;
            this._parent._parent[this._parent._name + this._name + "_" + _loc4_].fsiz = this.fsiz;
            this._parent._parent[this._parent._name + this._name + "_" + _loc4_].wpname = this._name;
            this._parent._parent[this._parent._name + this._name + "_" + _loc4_].linelist = this.mod;
            this.zdi = this.nxzdi();
            this.cn -= 1;
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
   }
   function showit()
   {
      if(this._parent._parent[this._parent._name + "_wp"] != undefined)
      {
         this._parent._parent[this._parent._name + "_wp"].removeMovieClip();
      }
   }
}
