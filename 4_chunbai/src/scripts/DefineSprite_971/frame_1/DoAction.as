var dg1 = _global[btcs.ms_1.msdata].$NAME;
var dg2 = _global[btcs.ms_2.msdata].$NAME;
var ng1;
var ng2;
var ng3 = random(_root.msmdb.length - 1);
var ng4 = random(_root.msmdb.length - 1);
var ng5 = random(_root.msmdb.length - 1);
var ng6 = random(_root.msmdb.length - 1);
var ng7 = random(_root.msmdb.length - 1);
var ng8 = random(_root.msmdb.length - 1);
var i = 0;
while(i < _root.msmdb.length)
{
   if(_root.msmdb[i] == btcs.ms_1.msdata)
   {
      ng1 = i;
      break;
   }
   i++;
}
var i = 0;
while(i < _root.msmdb.length)
{
   if(_root.msmdb[i] == btcs.ms_2.msdata)
   {
      ng2 = i;
      break;
   }
   i++;
}
