class clazz.wp_szds extends clazz.weapon_phix
{
   var seths;
   var ln = 0;
   function wp_szds()
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
         _loc3_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
         this._parent._parent.attachMovie("bo_9",this._parent._name + this._name + "_bo" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,mst:this._parent._name});
         var _loc4_ = 0;
         while(_loc4_ < 10)
         {
            if(_loc4_ == 0)
            {
               this._parent._parent.attachMovie("dd_cds",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth,_slo:1,_siz:this.fsiz,_sizz:0.01});
            }
            else
            {
               this._parent._parent.attachMovie("dd_cds",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw + (random(10) - 5) * 0.01 * 3.141592653589793,_sH:this._parent.shoth + (random(10) - 5) * 0.01 * 3.141592653589793,_slo:1,_siz:this.fsiz,_sizz:0.01});
            }
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fsiz = this.fsiz;
            if(this._parent.htime != null)
            {
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].htime = this._parent.htime + random(10);
            }
            else
            {
               this._parent._parent[this._parent._name + this._name + "_" + this.zdi].htime = this.maxforce / this.ddspeedlv + random(10);
            }
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].bosnd = _loc4_;
            this.zdi = this.nxzdi();
            _loc4_ = _loc4_ + 1;
         }
         this._parent.atton = 5;
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
   function showit()
   {
      if(this._parent._parent[this._parent._name + "_wp"] != undefined)
      {
         this._parent._parent[this._parent._name + "_wp"].removeMovieClip();
      }
   }
}
