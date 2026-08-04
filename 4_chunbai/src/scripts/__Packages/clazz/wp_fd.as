class clazz.wp_fd extends clazz.weapon_phix
{
   var seths;
   var ln = 0;
   var fsn = 0;
   function wp_fd()
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
      if(this._parent.skill_4 > 0)
      {
         this.maxcnn *= 2;
         this.cnn = this.maxcnn;
      }
      this.ln = this.maxcn * this.maxcnn - this.cn;
   }
   function doit()
   {
      if(this.t <= 0)
      {
         this.fsn = 0;
      }
      if((this.t <= 0 || this.t == this.ct - 5 * this.fsn) && this.cn > 0 && this._parent.firectrlmode == "AUTO" && this._parent.htime != null && this._zt == "nor")
      {
         var _loc3_ = new Object();
         var _loc4_ = 0;
         if(this.fsn % 2 == 0)
         {
            _loc4_ = (0.5 * this.fsn - (this.fn - 1) / 2) * this.fx;
         }
         else
         {
            _loc4_ = (- (0.5 * this.fsn - 0.5 - (this.fn - 1) / 2)) * this.fx;
         }
         _loc3_ = _global.moveobj(this._parent.objz,_loc4_,this.fy,this.fz);
         this._parent._parent.attachMovie("dd_fd",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth,_alpha:0});
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].hitime = this._parent.htime;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].rg = this.rg;
         if(this._parent.lockon)
         {
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].rg += 1;
         }
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fsiz = this.fsiz;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fsound = this.fsound;
         var _loc5_ = Math.round(100 / this.ddspeedlv);
         if(_loc5_ > 0)
         {
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wjlv = _loc5_;
         }
         else
         {
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wjlv = 1;
         }
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].linelist = this.mod;
         this.zdi = this.nxzdi();
         if(this.fsn == 0)
         {
            this.t = this.ct;
         }
         this.fsn = this.fsn + 1;
         if(this.fsn == this.fn)
         {
            this.fsn = 0;
         }
         this.cn -= 1;
         this._parent.atton = 5;
         if(this.cn <= 0)
         {
            if(this.ln <= 0)
            {
               this._zt = "emp";
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
