function onhit(dam, msid)
{
   v._sZ *= 0.8;
   v._sX *= 0.8;
   v._sY *= 0.8;
   this.bofg = 5;
   if(this._parent[msid]._type == "ff")
   {
      if(this._HP <= dam)
      {
         dam = this._HP;
         this._parent.attachMovie("bo_4",this._name + "ffbo",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this._name});
         this.removeMovieClip();
      }
      else
      {
         this._HP -= dam;
      }
   }
   else
   {
      if(this._parent[msid].combon == 0)
      {
         this._parent[msid].hits = 1;
      }
      else
      {
         this._parent[msid].hits = this._parent[msid].hits + 1;
      }
      this._parent[msid].combon = 30;
      _global.Battle.BTdata[msid].dam += dam;
      if(dam > this._DF)
      {
         dam = Math.round(dam * (1 - this._DF * 0.001) + 0.5 * (dam - this._DF));
      }
      else
      {
         dam = Math.round(dam * (1 - this._DF * 0.001));
      }
      if(this._HP <= dam)
      {
         dam = this._HP;
         this._parent[msid].spadd += 250;
         _global.Battle.BTdata[msid].kill += 1;
         this._parent.attachMovie("bo_4",this._name + "ffbo",this._parent.getNextHighestDepth(),{_sX:this._sX,_sY:this._sY,_sZ:this._sZ,mst:this._name});
         this.removeMovieClip();
      }
      else
      {
         this._HP -= dam;
      }
   }
}
function linkdata(unitdata)
{
   if(unitdata != null && unitdata != undefined)
   {
      this._protype = unitdata._protype;
      this.$NAME = unitdata.$NAME;
      this.$TYPE = unitdata.$TYPE;
      this._size = unitdata._size;
      this.maxHP = unitdata.maxHP;
      this._HP = this.maxHP;
      this._DF = unitdata._DF;
      this.speed = unitdata.speedlv / 2;
      this.rg = 0.02 * unitdata.turnlv;
      this.linelist = unitdata.mod;
      this.BDmod = unitdata.BDmod;
      this.LGmod = unitdata.LGmod;
      this.LAmod = unitdata.LAmod;
      this.RAmod = unitdata.RAmod;
      this.WImod = unitdata.WImod;
      this.MAmod = unitdata.MAmod;
      this.SHDmod = unitdata.SHDmod;
      this.WPmod = _global[unitdata.wp2].wpmod;
      if(this._size == "L")
      {
         this._visibleDst = 60;
      }
      else if(this._size == "M")
      {
         this._visibleDst = 40;
      }
      else if(this._size == "S")
      {
         this._visibleDst = 30;
      }
   }
}
function modact(bd, lg, wi, la, ra, wp, shd)
{
   this.linelist = new Array();
   if(_global[this.BDmod + "_" + bd] != undefined)
   {
      this.linelist = this.linelist.concat(_global[this.BDmod + "_" + bd]);
   }
   if(_global[this.LGmod + "_" + lg] != undefined)
   {
      this.linelist = this.linelist.concat(_global[this.LGmod + "_" + lg]);
   }
   if(_global[this.LAmod + "_" + la] != undefined)
   {
      this.linelist = this.linelist.concat(_global[this.LAmod + "_" + la]);
   }
   if(_global[this.RAmod + "_" + ra] != undefined)
   {
      this.linelist = this.linelist.concat(_global[this.RAmod + "_" + ra]);
   }
   if(_global[this.WImod + "_" + wi] != undefined)
   {
      this.linelist = this.linelist.concat(_global[this.WImod + "_" + wi]);
   }
   if(_global[this.SHDmod + "_" + shd] != undefined)
   {
      this.linelist = this.linelist.concat(_global[this.SHDmod + "_" + shd]);
   }
   if(this.WPmod != null)
   {
      this.linelist = this.linelist.concat(this.WPmod);
   }
}
var linelist;
var BDmod;
var LGmod;
var LAmod;
var RAmod;
var WImod;
var MAmod;
var SHDmod;
var WPmod;
var canlock = true;
var $NAME;
var $TYPE;
var _pilot = "杂兵";
var _SP = 5000;
var _protype;
var maxHP;
var _HP;
var _DF;
var _type;
var hypt = 0;
var _size;
var speed;
linkdata(_global[this._protype]);
