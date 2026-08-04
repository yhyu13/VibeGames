class clazz.wp_fyXX extends clazz.weapon_phix
{
   var seths;
   var fireauto;
   var ln = 0;
   function wp_fyXX()
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
         if(this._parent._SP < 5000)
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
   function doit()
   {
      if(this.t <= 0 && this.cn > 0 && this._zt == "nor" && this._parent.lockon)
      {
         if(this.fsound != null)
         {
            _global.snd(this.fsound);
         }
         var _loc3_ = new Object();
         if(this.zdi % 2 == 0)
         {
            _loc3_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
         }
         else
         {
            _loc3_ = _global.moveobj(this._parent.objz,- this.fx,this.fy,this.fz);
         }
         this._parent._parent.attachMovie("dd_fyXX",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw + (random(25) - 12) * 3.141592653589793 / 48,_sH:this._parent.shoth + (random(25) - 12) * 3.141592653589793 / 48,_alpha:0});
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].linelist = this.mod;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fn = this.fn;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wpname = this._name;
         if(this.zdi % 2 == 0)
         {
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fx = this.fx;
         }
         else
         {
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fx = - this.fx;
         }
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fy = this.fy;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fz = this.fz;
         this.zdi = this.nxzdi();
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
