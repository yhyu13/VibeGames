if(_root.cmrs[this._parent.mst]["weapon" + _root.cmrs[this._parent.mst].weaponow].fyBn != undefined)
{
   var ssxt = _root.cmrs[this._parent.mst]["weapon" + _root.cmrs[this._parent.mst].weaponow].cn + _root.cmrs[this._parent.mst]["weapon" + _root.cmrs[this._parent.mst].weaponow].fyBn;
   var ssxtt = Math.floor(_root.cmrs[this._parent.mst].lockont / 30) + 1;
   if(ssxtt > ssxt)
   {
      ssxtt = ssxt;
   }
   ssx.text = ssxtt;
   ssxx.text = ssxt;
   if(_root.cmrs[this._parent.mst]["weapon" + _root.cmrs[this._parent.mst].weaponow].t > 0)
   {
      ssx.textColor = 7673600;
   }
   else
   {
      ssx.textColor = 16724736;
   }
}
else
{
   ssx.text = "";
   ssxx.text = "";
}
