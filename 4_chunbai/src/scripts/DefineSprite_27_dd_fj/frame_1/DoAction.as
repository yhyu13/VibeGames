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
var linelist;
this._visibleDst = 30;
var canlock = true;
var $NAME = "无人飞机";
var $TYPE = "UNKNOW";
var _pilot = "王牌飞行员";
var _SP = 5000;
