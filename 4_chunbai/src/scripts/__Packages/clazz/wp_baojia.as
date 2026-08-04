class clazz.wp_baojia extends clazz.weapon_phix
{
   var seths;
   var xp = 0;
   var xpmax = 0;
   var xpon = false;
   function wp_baojia()
   {
      super();
      this.seths = function()
      {
         if(this._parent._SP < 10000)
         {
            this._zt = "nosp";
         }
         else
         {
            this._zt = "nor";
         }
      };
   }
   function doit()
   {
      if(this._parent._EN >= this.en && this._zt == "noen")
      {
         this._zt = "nor";
      }
      if(this._parent._EN < this.en && this._zt == "nor")
      {
         this._zt = "noen";
      }
      if(this._parent._SP < 10000)
      {
         this._zt = "nosp";
         return false;
      }
      if(this.t <= 0 && this._zt == "nor")
      {
         this._parent._EN -= this.en;
         this._parent.doRelieve();
         this._parent._EN += this.en;
      }
   }
   function showit()
   {
      if(this._parent._parent[this._parent._name + "_wp"] != undefined)
      {
         this._parent._parent[this._parent._name + "_wp"].removeMovieClip();
      }
   }
}
