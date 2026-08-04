class clazz.wp_zdXX extends clazz.weapon_phix
{
   var seths;
   var fsn = 0;
   var ln = 0;
   function wp_zdXX()
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
      if(this.t <= 0)
      {
         this.fsn = 0;
      }
      if((this.t <= 0 || this.t == this.ct - 5 * this.fsn) && this.cn > 0 && this._zt == "nor")
      {
         if(this.fsound != null)
         {
            _global.snd(this.fsound);
         }
         if(this._parent.ntact == 0)
         {
            this._parent.ntact = -5;
         }
         var _loc3_ = new Object();
         _loc3_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
         var _loc4_ = this._parent.htime;
         var _loc5_ = this._parent.shotw;
         var _loc6_ = this._parent.shoth;
         this._parent._parent.attachMovie("dd_zd",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:_loc5_,_sH:_loc6_,htime:_loc4_,_slo:this.fsiz * 3,_siz:this.fsiz,_sizz:0.3});
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].speed = this.ddspeedlv;
         this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fsiz = this.fsiz;
         if(this._parent.lockon)
         {
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].rx = 0;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].ry = 0;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].rz = 0;
         }
         else
         {
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].rx = random(101) - 50;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].ry = random(101) - 50;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].rz = random(101) - 50;
         }
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
         this._parent.atton = 5;
         this.cn -= 1;
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
