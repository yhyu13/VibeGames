class clazz.wp_tuji extends clazz.weapon_phix
{
   var seths;
   var xp = 0;
   var xpmax = 0;
   var xpon = false;
   var wptx = null;
   var txsz = 1;
   function wp_tuji()
   {
      super();
      this.seths = function()
      {
         if(this.xpon && this.xp >= 0)
         {
            this.xp = this.xp + 1;
            if(this.xp > this.xpmax)
            {
               this.xp = this.xpmax;
            }
         }
         else
         {
            this.xpmax = - this.ct;
            this.xp = - this.t;
         }
         this.xpon = false;
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
      if(this._parent._parent[this._parent._name + this._name + "_" + this.przdi()] == undefined)
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
         if(this.t <= 0 && this._parent.firectrlmode == "AUTO" && this._parent.htime != null && this._zt == "nor")
         {
            this._parent._parent.attachMovie("ob_tuji",this._parent._name + this._name + "_" + this.zdi,this._parent._parent.getNextHighestDepth(),{_sX:this._parent._sX,_sY:this._parent._sY,_sZ:this._parent._sZ});
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].mst = this._parent._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].tgt = this._parent.tgt;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].dam = this.damlv;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].maxforce = this.maxforce;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wpname = this._name;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fx = this.fx;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fy = this.fy;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fz = this.fz;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fn = this.fn;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].fsiz = this.fsiz;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].wptx = this.wptx;
            this._parent._parent[this._parent._name + this._name + "_" + this.zdi].txsz = this.txsz;
            this.zdi = this.nxzdi();
            this._parent.weaponhold = true;
            this._parent._EN -= this.en;
            this._parent.atton = 5;
            this._parent.SPcap += 5000;
            this._parent.spEX = 30;
         }
      }
   }
   function showit()
   {
      this.wptx = null;
      this.txsz = 1;
      var _loc2_ = 1;
      while(_loc2_ <= 8)
      {
         if(this._parent["weapon" + _loc2_].ftype == "axe")
         {
            if(this._parent["weapon" + _loc2_].fn == 2)
            {
               this.wptx = "tx_axe2";
            }
            else
            {
               this.wptx = "tx_axe";
            }
            this.txsz = this._parent["weapon" + _loc2_].fsiz;
            break;
         }
         if(this._parent["weapon" + _loc2_].ftype == "gj")
         {
            if(this._parent["weapon" + _loc2_].fn == -2)
            {
               this.wptx = "tx_dbs";
            }
            else if(this._parent["weapon" + _loc2_].fn == 2)
            {
               this.wptx = "tx_bs2";
            }
            else
            {
               this.wptx = "tx_bs1";
            }
            this.txsz = this._parent["weapon" + _loc2_].fsiz;
            break;
         }
         _loc2_ = _loc2_ + 1;
      }
      if(this._parent._parent[this._parent._name + "_wp"] != undefined)
      {
         this._parent._parent[this._parent._name + "_wp"].removeMovieClip();
      }
   }
}
