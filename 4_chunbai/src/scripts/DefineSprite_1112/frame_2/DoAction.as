bgm(3);
Battle.battlestart();
this.onEnterFrame = function()
{
   if(this.sff > 0)
   {
      this.sff = this.sff - 1;
   }
};
stop();
