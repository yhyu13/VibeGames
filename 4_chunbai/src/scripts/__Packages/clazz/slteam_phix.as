class clazz.slteam_phix extends MovieClip
{
   var linelist;
   var _glow = 0;
   var glow_alpha = 50;
   function slteam_phix()
   {
      super();
      this.linelist = new Array();
   }
   function newsline(dat)
   {
      var _loc3_ = new clazz.sline_phix();
      for(var _loc4_ in dat)
      {
         _loc3_[_loc4_] = dat[_loc4_];
      }
      _loc3_._par = this;
      var _loc5_ = this.linelist.push(_loc3_) - 1;
      this.linelist[_loc5_]._N = _loc5_;
      return _loc5_;
   }
   function removesline(N)
   {
      this.linelist[N] = null;
   }
   function showcmr()
   {
      if(_global.Cmr.isShow >= 0)
      {
         this.clear();
      }
      var _loc3_ = 0;
      while(_loc3_ <= this.linelist.length - 1)
      {
         this.linelist[_loc3_].showcmr();
         _loc3_ = _loc3_ + 1;
      }
   }
   function onEntF()
   {
      var _loc3_ = false;
      var _loc2_ = 0;
      while(_loc2_ <= this.linelist.length - 1)
      {
         if(this.linelist[_loc2_] != null)
         {
            this.linelist[_loc2_].onEntF();
            _loc3_ = true;
         }
         _loc2_ = _loc2_ + 1;
      }
      if(!_loc3_ && this.linelist.length > 0)
      {
         this.removeMovieClip();
      }
   }
   function hitobj(obj, r)
   {
      var _loc2_ = 0;
      while(_loc2_ <= this.linelist.length - 1)
      {
         var _loc3_ = this.linelist[_loc2_].hitobj(obj,r);
         if(_loc3_ != null)
         {
            return _loc3_;
         }
         _loc2_ = _loc2_ + 1;
      }
      return null;
   }
}
