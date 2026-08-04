function showme()
{
   showon = true;
   this.gotoAndStop(2);
}
function doit()
{
   if(_root.cmrs[this._name]._cY > 5 && _root.cmrs[this._name]._sx < Cmr._cw && _root.cmrs[this._name]._sx > 0 && _root.cmrs[this._name]._sy < Cmr._ch && _root.cmrs[this._name]._sy > 0)
   {
      this._x = _root.cmrs[this._name]._sx - Cmr._cw * 0.5;
      this._y = _root.cmrs[this._name]._sy - Cmr._ch * 0.5;
      this.main._visible = true;
      this.jiantou._visible = false;
      this.jiantou2._visible = true;
      if(this.maxHP > 0)
      {
         this.main._hpbar._visible = true;
         this.main._hpbor._visible = true;
         this.main._hpbar._xscale = 100 * _root.cmrs[this._name]._HP / this.maxHP;
      }
      else
      {
         this.main._hpbar._visible = false;
         this.main._hpbor._visible = false;
      }
      if(this._name == _root.cmrs[_root.jiemiam.mst].tgt)
      {
         this.gotoAndStop(2);
         this.main.tgtlock._visible = true;
         if(this._name == _root.cmrs[_root.jiemiam.mst].tgt && _root.cmrs[_root.jiemiam.mst].GDon && _root.cmrs[_root.jiemiam.mst].scmrfg == 0)
         {
            this.main.tgtlock.gotoAndStop(2);
         }
         else
         {
            if(_root.cmrs[_root.jiemiam.mst].dston)
            {
               this.main.tgtlock.txt_dst.textColor = 16711680;
            }
            else
            {
               this.main.tgtlock.txt_dst.textColor = 16776960;
            }
            this.main.tgtlock.txt_dst.text = Math.round(_root.cmrs[_root.jiemiam.mst].dst);
            this.main.tgtlock.gotoAndStop(1);
         }
      }
      else
      {
         this.main.tgtlock._visible = false;
      }
   }
   else
   {
      var _loc3_ = Math.atan2(- _root.cmrs[this._name]._cZ,_root.cmrs[this._name]._cX);
      this._x = 150 * Math.cos(_loc3_);
      this._y = 150 * Math.sin(_loc3_);
      this.jiantou._rotation = _loc3_ * 180 / 3.141592653589793;
      this.main._visible = false;
      this.jiantou._visible = true;
      this.jiantou2._visible = false;
      if(this._name == _root.cmrs[_root.jiemiam.mst].tgt)
      {
         this.jiantou.tgtlock._visible = true;
      }
      else
      {
         this.jiantou.tgtlock._visible = false;
      }
   }
}
stop();
this.main._visible = false;
this.jiantou._visible = false;
this.jiantou2._visible = false;
var maxHP = _root.cmrs[this._name]._HP;
onEnterFrame = function()
{
   if(!stopAll)
   {
      if(_root.cmrs[this._name] == undefined)
      {
         this.removeMovieClip();
      }
      if(_root.cmrs[this._name]._force == _root.cmrs[_root.jiemiam.mst]._force)
      {
         this.gotoAndStop(1);
         showon = false;
      }
   }
};
var showon = false;
