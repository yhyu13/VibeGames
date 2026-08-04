on(release){
   if(_root.msmdb[ng2 + 1] != undefined)
   {
      ng2++;
      btcs.ms_2.msdata = _root.msmdb[ng2];
      dg2 = _global[btcs.ms_2.msdata].$NAME;
   }
}
