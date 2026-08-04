function vc(vo)
{
   if(_root.jiemiam._visible)
   {
      this.gotoAndPlay(vo);
      vc = null;
   }
}
stop();
this._visible = false;
