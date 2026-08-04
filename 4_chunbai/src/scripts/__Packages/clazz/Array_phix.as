class clazz.Array_phix
{
   var unshift;
   var pop;
   var length;
   function Array_phix()
   {
   }
   static function init()
   {
      Array.prototype.putin = function(mm)
      {
         this.unshift(mm);
         return this.pop();
      };
      Array.prototype.nextfc = function(i, fc)
      {
         var _loc2_ = i;
         while(_loc2_ <= this.length - 1)
         {
            if(fc(this[_loc2_]))
            {
               return _loc2_;
            }
            _loc2_ = _loc2_ + 1;
         }
         _loc2_ = 0;
         while(_loc2_ < i)
         {
            if(fc(this[_loc2_]))
            {
               return _loc2_;
            }
            _loc2_ = _loc2_ + 1;
         }
         return undefined;
      };
   }
}
