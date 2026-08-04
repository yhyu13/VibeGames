function swit()
{
   if(sn != null)
   {
      if(sn > 0 && sn <= 4)
      {
         if(_root.cmrs[this._parent.mst]["weapon" + (sn + 4)] != undefined)
         {
            this.gotoAndStop(3);
         }
         else
         {
            this.gotoAndStop(2);
         }
      }
      else if(sn > 4)
      {
         if(_root.cmrs[this._parent.mst]["weapon" + (sn - 4)] != undefined)
         {
            this.gotoAndStop(4);
         }
         else
         {
            this.gotoAndStop(2);
         }
      }
   }
}
var sn = 0;
stop();
