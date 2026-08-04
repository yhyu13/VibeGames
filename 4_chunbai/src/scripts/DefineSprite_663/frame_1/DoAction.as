onEnterFrame = function()
{
   if(Player.ID != null)
   {
      this.id = Player.ID;
      this.jx = _root.traceJX(Player.JX);
      if(Player.JX == 0)
      {
         jx_txt.textColor = 16777215;
      }
      if(Player.JX == 1)
      {
         jx_txt.textColor = 6710886;
      }
      if(Player.JX == 2)
      {
         jx_txt.textColor = 3407616;
      }
      if(Player.JX == 3)
      {
         jx_txt.textColor = 3381759;
      }
      if(Player.JX == 4)
      {
         jx_txt.textColor = 16776960;
      }
      if(Player.JX == 5)
      {
         jx_txt.textColor = 16750848;
      }
      if(Player.JX == 6)
      {
         jx_txt.textColor = 6684927;
      }
      if(Player.JX == 7)
      {
         jx_txt.textColor = 16724736;
      }
      var _loc3_ = undefined;
      if(Player.winBT <= 0)
      {
         _loc3_ = 0;
      }
      else
      {
         _loc3_ = Math.round(Player.winBT / (Player.winBT + Player.lostBT) * 100);
      }
      this.info = Player.winBT + "胜 " + Player.lostBT + "负  胜率:" + _loc3_ + "%";
   }
   else
   {
      this.id = "------";
      this.jx = "------";
      this.info = "------";
   }
};
