function randomra()
{
   rx = random(200);
   if(rx < 100)
   {
      rx -= 200;
   }
   ry = random(200);
   if(ry < 100)
   {
      ry -= 200;
   }
   rz = random(200);
   if(rz < 100)
   {
      rz -= 200;
   }
}
function ts()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      t++;
      if(t % 2 == 0)
      {
         _parent.attachMovie("wjline2",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - this.v._sX,_sY2:this._sY - this.v._sY,_sZ2:this._sZ - this.v._sZ,_siz:6,_sizz:0.01});
      }
      if(t >= maxt)
      {
         onEnterFrame = function()
         {
            this.removeMovieClip();
         };
      }
      else if(t == axt + 10)
      {
         axt = t;
         randomra();
         onEnterFrame = function()
         {
            zd();
         };
      }
   }
}
function zd()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      t++;
      _parent[tgt].onkillff(this._name);
      if(t % 2 == 0)
      {
         _parent.attachMovie("wjline2",_name + "wj" + t,_parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sX2:this._sX - this.v._sX,_sY2:this._sY - this.v._sY,_sZ2:this._sZ - this.v._sZ,_siz:6,_sizz:0.01});
      }
      if(t >= maxt)
      {
         this.removeMovieClip();
      }
      else if(this._parent[this.tgt] != undefined && this._parent[this.mst]._zt == "nor")
      {
         var _loc5_ = _parent[tgt]._sX + rx - this._sX;
         var _loc4_ = _parent[tgt]._sY + ry - this._sY;
         var _loc7_ = _parent[tgt]._sZ + rz - this._sZ;
         var _loc8_ = dist_3d(0,0,0,_loc5_,_loc4_,_loc7_);
         dst = _loc8_;
         this._sW = Math.atan2(_loc5_,_loc4_);
         this._sH = Math.atan2(_loc7_,distance(0,0,_loc5_,_loc4_));
         var _loc6_ = speed / dst;
         if(this.bofg == 0)
         {
            v._sZ = _loc7_ * _loc6_ * 0.25 + v._sZ * 0.75;
            v._sY = _loc4_ * _loc6_ * 0.25 + v._sY * 0.75;
            v._sX = _loc5_ * _loc6_ * 0.25 + v._sX * 0.75;
         }
         if(_loc8_ < 200 || this._parent[tgt]._type == "ff" && t >= axt + 10)
         {
            this.axt = this.t;
            if(this.tgt == _root.jiemiam.mst)
            {
               _root.jiemiam.hkxsq[this._name].jiantou.play();
            }
            basex = v._sX;
            basey = v._sY;
            basez = v._sZ;
            v._sZ = 0;
            v._sX = 0;
            v._sY = 0;
            onEnterFrame = function()
            {
               shoot();
            };
         }
      }
   }
}
function shoot()
{
   if(!stopAll)
   {
      if(this.bofg > 0)
      {
         this.bofg = this.bofg - 1;
      }
      t++;
      _parent[tgt].onkillff(this._name);
      if(t == axt + 10)
      {
         if(this._parent[this.mst]._zt == "nor")
         {
            _root.jiemiam.hkxsq[this._name].jiantou.gotoAndStop(1);
            if(this._parent[this.tgt] != undefined)
            {
               var _loc12_ = _parent[tgt]._sX - this._sX;
               var _loc11_ = _parent[tgt]._sY - this._sY;
               var _loc13_ = _parent[tgt]._sZ - this._sZ;
               dst = dist_3d(0,0,0,_loc12_,_loc11_,_loc13_);
               var _loc10_ = dst / 30;
               _loc12_ += _parent[tgt].v._sX * _loc10_;
               _loc11_ += _parent[tgt].v._sY * _loc10_;
               _loc13_ += _parent[tgt].v._sZ * _loc10_;
               dst = dist_3d(0,0,0,_loc12_,_loc11_,_loc13_);
               _loc10_ = dst / 50;
               var _loc14_ = Math.atan2(_loc12_,_loc11_);
               var _loc15_ = Math.atan2(_loc13_,distance(0,0,_loc12_,_loc11_));
               this._sH = _loc15_;
               this._sW = _loc14_;
            }
            else
            {
               _loc10_ = 50;
            }
            snd("carnon");
            this._parent.attachMovie("dd_cds",_name + "_" + this.fn + "ddq" + t,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sW:_sW + (random(10) - 5) * 0.004 * 3.141592653589793,_sH:_sH + (random(10) - 5) * 0.004 * 3.141592653589793,htime:_loc10_,_siz:2,dam:this.dam,_slo:1,_sizz:0.01});
            this._parent[_name + "_" + this.fn + "ddq" + t].mst = this.mst;
            this._parent[_name + "_" + this.fn + "ddq" + t].tgt = this.tgt;
            this._parent[_name + "_" + this.fn + "ddq" + t].speed = 50;
            this._parent[_name + "_" + this.fn + "ddq" + t].maxforce = 2000;
            this._parent[_name + "_" + this.fn + "ddq" + t].bosnd = 1;
            var _loc4_ = 1;
            while(_loc4_ < 6)
            {
               this._parent.attachMovie("dd_cds",this._name + "_" + this.fn + "EX_" + _loc4_,this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,_sW:this._sW + (random(10) - 5) * 0.01 * 3.141592653589793,_sH:this._sH + (random(10) - 5) * 0.01 * 3.141592653589793,_slo:1,_siz:3,_sizz:0.01,dam:this.dam,htime:_loc10_ - 5 + random(10)});
               this._parent[this._name + "_" + this.fn + "EX_" + _loc4_].mst = this.mst;
               this._parent[this._name + "_" + this.fn + "EX_" + _loc4_].tgt = this.tgt;
               this._parent[this._name + "_" + this.fn + "EX_" + _loc4_].speed = 50;
               this._parent[this._name + "_" + this.fn + "EX_" + _loc4_].maxforce = 2000;
               this._parent[this._name + "_" + this.fn + "EX_" + _loc4_].fsiz = 1;
               this._parent[this._name + "_" + this.fn + "EX_" + _loc4_].bosnd = _loc4_ + 1;
               _loc4_ = _loc4_ + 1;
            }
            this.fn = this.fn - 1;
         }
      }
      if(t == axt + 15)
      {
         if(this.fn > 0)
         {
            axt = t - 9;
         }
      }
      if(t == axt + 20)
      {
         this.removeMovieClip();
      }
   }
}
stop();
var bofg = 0;
var _HP = 600;
var _type = "ff";
var hypt = 0;
var _size = "S";
var fclss = "booms";
var mst;
var tgt;
var _force = this._parent[mst]._force;
var tgt_force = this._parent[this.tgt]._force;
if(this.tgt_force == undefined)
{
   this.tgt_force = 0;
}
var dam;
var v = new Object();
var speed;
var maxforce;
var dst = maxforce;
var maxt = maxforce / speed;
var t = 0;
var axt = 0;
var bxt = 0;
var fx;
var fy;
var fz;
var basex = 0;
var basey = 0;
var basez = 0;
var rx = 0;
var ry = 0;
var rz = 0;
var fn;
var wpname;
var onlock = null;
_global.SimpList[this._name] = this;
_root.jiemiam.addff(this._name);
randomra();
v._sZ = speed * Math.sin(this._sH);
var ss = speed * Math.cos(this._sH);
v._sX = ss * Math.sin(this._sW);
v._sY = ss * Math.cos(this._sW);
this.mainact = function()
{
   this._sZ += this.v._sZ;
   this._sX += this.v._sX;
   this._sY += this.v._sY;
};
onEnterFrame = function()
{
   ts();
};
