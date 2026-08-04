if(tx_liz)
{
   var i = 0;
   while(i < 5)
   {
      this.attachMovie("liz","liz" + i,this.getNextHighestDepth(),{_sX:random(100),_sY:random(100),_sZ:random(100),_slo:0,_siz:0.1,_colo:8947848});
      i++;
   }
}
