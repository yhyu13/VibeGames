class clazz.wp_bsfy extends clazz.weapon_phix
{
   var seths;
   var fyn = 0;
   var ln = 0;
   var xp = 0;
   var xpmax = 0;
   var xpon = false;
   function wp_bsfy()
   {
      super();
      this.seths = function()
      {
         this.fyn = 0;
         var _loc2_ = 1;
         while(_loc2_ <= this.maxcn)
         {
            if(this._parent._parent[this._parent._name + this._name + "_" + _loc2_] != undefined)
            {
               this.fyn = this.fyn + 1;
            }
            _loc2_ = _loc2_ + 1;
         }
         if(this.ln > 0 && this.fyn + this.cn < this.maxcn)
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
         if(this.fyn + this.cn + this.ln <= 0)
         {
            this._zt = "emp";
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
   function doit(tgt)
   {
      if(this.t <= 0 && this._zt == "nor" && this.cn > 0)
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
         if(_loc4_ == 0)
         {
            return false;
         }
         var _loc5_ = new Object();
         _loc5_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
         this._parent._parent.attachMovie("dd_bsfy",this._parent._name + this._name + "_" + _loc4_,this._parent._parent.getNextHighestDepth(),{_sX:_loc5_.x,_sY:_loc5_.y,_sZ:_loc5_.z,_sW:this._parent.shotw + (random(25) + 36) * 3.141592653589793 / 48,_sH:this._parent.shoth + (random(25) - 12) * 3.141592653589793 / 48,_alpha:0});
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].mst = this._parent._name;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].dam = this.damlv;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].maxforce = this.maxforce;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].speed = this.ddspeedlv;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].linelist = this.mod;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].wpname = this._name;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].actmode = "hold";
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].tgt = this._parent.tgt;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].fsound = this.fsound;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].t = 0;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].fsiz = this.fsiz;
         if(this.fy < 0)
         {
            this._parent._parent[this._parent._name + this._name + "_" + _loc4_].backmst = true;
         }
         else
         {
            this._parent._parent[this._parent._name + this._name + "_" + _loc4_].backmst = false;
         }
         this.zdi = this.nxzdi();
         this.cn -= 1;
         this._parent.atton = 5;
         this.t = this.ct;
      }
   }
   function showit()
   {
   }
}
