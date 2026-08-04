class clazz.wp_fyGD extends clazz.weapon_phix
{
   var seths;
   var fynA;
   var fireauto;
   var fyn = 0;
   var fyAn = 0;
   var fyBn = 0;
   var ln = 0;
   var qn = 0;
   var xp = 0;
   var xpmax = 0;
   var xpon = false;
   function wp_fyGD()
   {
      super();
      this.seths = function()
      {
         this.fyn = 0;
         this.fynA = 0;
         this.fyBn = 0;
         var _loc2_ = 1;
         while(_loc2_ <= this.maxcn)
         {
            if(this._parent._parent[this._parent._name + this._name + "_" + _loc2_] != undefined)
            {
               this.fyn = this.fyn + 1;
               if(this._parent._parent[this._parent._name + this._name + "_" + _loc2_].actmode == "tuji")
               {
                  this.fynA = this.fynA + 1;
               }
               else
               {
                  this.fyBn = this.fyBn + 1;
               }
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
         if(this._parent._SP < 5000)
         {
            this._zt = "nosp";
         }
         if(this.xpon && this.xp >= 0)
         {
            if(this.xpmax <= 0)
            {
               this.xpmax = 30 * (this.cn + this.fyn);
            }
            this.xp = this.xp + 1;
            if(this.xp > this.xpmax)
            {
               this.callit();
               if(this._parent.ntact == 0)
               {
                  this._parent.ntact = -5;
               }
               this.xp = this.xpmax;
            }
         }
         else if(this.xp > 0)
         {
            if(this.xp == this.xpmax)
            {
               if(this._parent.lockon)
               {
                  this._parent.ntact = 10;
               }
               this.xpmax = -2 * this.xpmax;
               this.xp = this.xpmax;
            }
            else
            {
               this.xp = 0;
            }
         }
         else if(this.xp < 0)
         {
            this._parent.ntcd = 20;
            this.xp = this.xp + 1;
         }
         this.xpon = false;
         this.qn = 0;
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
      if(this._zt == "nor")
      {
         if(this.t <= 0 && this._parent.lockon)
         {
            this.qn = Math.floor(this._parent.lockont / 30) + 1;
            var _loc6_ = 0;
            while(true)
            {
               if(this.qn > 0)
               {
                  var _loc3_ = 0;
                  var _loc4_ = 1;
                  while(_loc4_ <= this.maxcn)
                  {
                     if(this._parent._parent[this._parent._name + this._name + "_" + _loc4_] == undefined)
                     {
                        _loc3_ = _loc4_;
                        break;
                     }
                     _loc4_ = _loc4_ + 1;
                  }
                  if(_loc3_ == 0 || this.cn == 0)
                  {
                     break;
                  }
                  var _loc5_ = new Object();
                  _loc5_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
                  this._parent._parent.attachMovie("dd_fyGD",this._parent._name + this._name + "_" + _loc3_,this._parent._parent.getNextHighestDepth(),{_sX:_loc5_.x,_sY:_loc5_.y,_sZ:_loc5_.z,_sW:this._parent.shotw + (random(25) + 36) * 3.141592653589793 / 48,_sH:this._parent.shoth + (random(25) - 12) * 3.141592653589793 / 48,_alpha:0});
                  this._parent._parent[this._parent._name + this._name + "_" + _loc3_].mst = this._parent._name;
                  this._parent._parent[this._parent._name + this._name + "_" + _loc3_].dam = this.damlv;
                  this._parent._parent[this._parent._name + this._name + "_" + _loc3_].maxforce = this.maxforce;
                  this._parent._parent[this._parent._name + this._name + "_" + _loc3_].speed = this.ddspeedlv;
                  this._parent._parent[this._parent._name + this._name + "_" + _loc3_].linelist = this.mod;
                  this._parent._parent[this._parent._name + this._name + "_" + _loc3_].wpname = this._name;
                  this._parent._parent[this._parent._name + this._name + "_" + _loc3_].tgt = this._parent.tgt;
                  this._parent._parent[this._parent._name + this._name + "_" + _loc3_].actmode = "tuji";
                  this._parent._parent[this._parent._name + this._name + "_" + _loc3_].fsound = this.fsound;
                  this._parent._parent[this._parent._name + this._name + "_" + _loc3_].t = -5 * _loc6_;
                  if(this.fy < 0)
                  {
                     this._parent._parent[this._parent._name + this._name + "_" + _loc3_].backmst = true;
                  }
                  else
                  {
                     this._parent._parent[this._parent._name + this._name + "_" + _loc3_].backmst = false;
                  }
                  this.zdi = this.nxzdi();
                  this.cn -= 1;
                  _loc6_ = _loc6_ + 1;
                  this.qn = this.qn - 1;
                  continue;
               }
               this._parent.atton = 5;
               this.t = this.ct;
               this.showit();
               this._parent.grx = 0;
               this._parent.grz = 0;
               this._parent.gry = 0;
               this._parent.rlv = 0;
               this._parent.firectrl = function()
               {
                  this.fireauto();
               };
            }
            if(this._parent.ntact == 0)
            {
               this._parent.ntact = 5;
               this._parent.atton = 5;
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
            this.showit();
            return false;
         }
      }
   }
   function callit(tgt)
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
         this._parent._parent.attachMovie("dd_fyGD",this._parent._name + this._name + "_" + _loc4_,this._parent._parent.getNextHighestDepth(),{_sX:_loc5_.x,_sY:_loc5_.y,_sZ:_loc5_.z,_sW:this._parent.shotw + (random(25) + 36) * 3.141592653589793 / 48,_sH:this._parent.shoth + (random(25) - 12) * 3.141592653589793 / 48,_alpha:0});
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].mst = this._parent._name;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].dam = this.damlv;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].maxforce = this.maxforce;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].speed = this.ddspeedlv;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].linelist = this.mod;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].wpname = this._name;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].actmode = "hold";
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].tgt = tgt;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].fsound = this.fsound;
         this._parent._parent[this._parent._name + this._name + "_" + _loc4_].t = 0;
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
         this.t = 5;
         this.showit();
      }
   }
   function showit()
   {
      var _loc3_ = 0;
      while(_loc3_ <= this._parent.linelist.length - 1)
      {
         var _loc2_ = 1;
         while(_loc2_ <= this.maxcn * this.maxcnn)
         {
            if(this._parent[this._parent.linelist[_loc3_].nam].flag == "fyGD" + _loc2_)
            {
               if(_loc2_ <= this.ln + this.cn)
               {
                  this._parent[this._parent.linelist[_loc3_].nam]._visible = true;
               }
               else
               {
                  this._parent[this._parent.linelist[_loc3_].nam]._visible = false;
               }
            }
            _loc2_ = _loc2_ + 1;
         }
         _loc3_ = _loc3_ + 1;
      }
   }
}
