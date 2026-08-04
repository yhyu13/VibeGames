onClipEvent(enterFrame){
   this._xscale += 0.5 * (this._parent.viewMS.maxHP / 50 - this._xscale);
   if(this._xscale > 100)
   {
      this._xscale = 100;
   }
   this._parent.txt_hp = this._parent.viewMS.maxHP;
}
