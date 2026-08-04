class clazz.wp_hd extends clazz.weapon_phix
{
   var seths;
   var xp = 0;
   var xpmax = 0;
   var xpon = false;
   var ln = 0;
   function wp_hd()
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
         if(this.xpon && this.xp >= 0)
         {
            this.xp = this.xp + 1;
            if(this.xp > this.xpmax)
            {
               this.xp = this.xpmax;
            }
         }
         else
         {
            this.xpmax = - this.ct;
            this.xp = - this.t;
         }
         this.xpon = false;
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
         if(this.xp == this.xpmax && this.xpmax > 0 && this._parent.lockon)
         {
            if(this.fsound != null)
            {
               _global.snd(this.fsound);
            }
            var _loc3_ = new Object();
            _loc3_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
            this._parent._parent.attachMovie("dd_hd",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth,htime:this._parent.htime});
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].linelist = this.mod;
            var _loc4_ = Math.round(100 / this.ddspeedlv);
            if(_loc4_ > 0)
            {
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wjlv = _loc4_;
            }
            else
            {
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wjlv = 1;
            }
            this.zdi = this.nxzdi();
            this.cn -= 1;
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
         else if(this.xp >= 0)
         {
            this._parent.v._sX *= 0.5;
            this._parent.v._sY *= 0.5;
            this._parent.v._sZ *= 0.5;
            if(this.xp == 0)
            {
               this.xpmax = 30;
               this._parent.doAMBAC();
            }
            this.xpon = true;
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
