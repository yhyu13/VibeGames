class clazz.wp_zds extends clazz.weapon_phix
{
   var seths;
   var ln = 0;
   function wp_zds()
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
         if(this._parent.ntact == 0)
         {
            this._parent.ntact = -5;
         }
         var _loc5_ = new Object();
         _loc5_._sX = this._parent._sX;
         _loc5_._sY = this._parent._sY;
         _loc5_._sZ = this._parent._sZ;
         _loc5_._sW = this._parent.shotw;
         _loc5_._sH = this._parent.shoth;
         _loc5_._sR = this._parent._sR;
         var _loc4_ = new Object();
         var _loc3_ = 1;
         while(_loc3_ <= this.fn)
         {
            if(this.cn > 0)
            {
               _loc4_ = _global.moveobj(_loc5_,(_loc3_ - (this.fn - 1) / 2) * this.fx,this.fy,this.fz);
               this._parent._parent.attachMovie("dd_zd",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc4_.x,_sY:_loc4_.y,_sZ:_loc4_.z,_sW:this._parent.shotw + (random(10) - 5) * 0.002 * 3.141592653589793,_sH:this._parent.shoth + (random(10) - 5) * 0.002 * 3.141592653589793,_slo:this.fsiz * 3,_siz:this.fsiz,_sizz:0.3});
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].rx = random(201) - 100;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].ry = random(201) - 100;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].rz = random(201) - 100;
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fsiz = this.fsiz;
               if(this._parent.htime != null)
               {
                  this._parent._parent[this._parent._name + this._name + "_" + this.zdi].htime = this._parent.htime + random(10) - 5;
                  if(this._parent._parent[this._parent._name + this._name + "_" + this.zdi].htime < 5)
                  {
                     this._parent._parent[this._parent._name + this._name + "_" + this.zdi].htime = 5;
                  }
               }
               else
               {
                  this._parent._parent[this._parent._name + this._name + "_" + this.zdi].htime = null;
               }
               this.zdi = this.nxzdi();
               this.cn -= 1;
            }
            _loc3_ = _loc3_ + 1;
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
      if(this._parent._parent[this._parent._name + "_wp"] != undefined)
      {
         this._parent._parent[this._parent._name + "_wp"].removeMovieClip();
      }
   }
}
