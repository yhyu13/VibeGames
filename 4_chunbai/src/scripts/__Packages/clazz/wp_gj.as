class clazz.wp_gj extends clazz.weapon_phix
{
   var seths;
   var wpi;
   function wp_gj()
   {
      super();
      this.seths = function()
      {
         if(this._parent._type == "TMA")
         {
            this._zt = "hide";
         }
         else
         {
            this._zt = "nor";
         }
         if(this.t > 0 && this._parent.skill_2 > 0 && this._parent._SP >= 7500)
         {
            this.t = this.t - 1;
         }
      };
   }
   function doit()
   {
      if(this._parent._parent[this._parent._name + this._name + "_ob"] != undefined)
      {
         if(this._parent._EN >= this.en && this._zt == "noen")
         {
            this._zt = "nor";
         }
         if(this._parent._EN < this.en && this._zt == "nor")
         {
            this._zt = "noen";
         }
         if(this.t <= 0 && this._zt == "nor" && !this._parent.stopow)
         {
            if(this._parent.firectrlmode == "AUTO" && this._parent.htime != null || this._parent.GDon)
            {
               this._parent._parent[this._parent._name + this._name + "_ob"].tgt = this._parent.tgt;
               if(this._parent.GDon)
               {
                  this._parent._parent[this._parent._name + this._name + "_ob"].t = 0;
               }
               else
               {
                  this._parent._parent[this._parent._name + this._name + "_ob"].doit();
               }
               this._parent.GDon = true;
               this._parent.weaponhold = true;
               this._parent.atton = 5;
               this._parent._EN -= 1 + Math.round(this._parent.maxpow);
            }
         }
      }
   }
   function showit()
   {
      if(this._parent._type == "TMA")
      {
         this.wpmodon = false;
      }
      else
      {
         this.wpmodon = true;
      }
      var _loc3_ = new Object();
      _loc3_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
      this._parent._parent.attachMovie("ob_beamswd",this._parent._name + this._name + "_ob",this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth,_siz:this.fsiz,_slo:10 * this.fsiz,_alpha:0});
      this._parent._parent[this._parent._name + this._name + "_ob"].mst = this._parent._name;
      this._parent._parent[this._parent._name + this._name + "_ob"].tgt = this._parent.tgt;
      this._parent._parent[this._parent._name + this._name + "_ob"].dam = this.damlv;
      this._parent._parent[this._parent._name + this._name + "_ob"].maxforce = this.maxforce;
      this._parent._parent[this._parent._name + this._name + "_ob"].wpname = this._name;
      this._parent._parent[this._parent._name + this._name + "_ob"].fx = this.fx;
      this._parent._parent[this._parent._name + this._name + "_ob"].fy = this.fy;
      this._parent._parent[this._parent._name + this._name + "_ob"].fz = this.fz;
      this._parent._parent[this._parent._name + this._name + "_ob"].fw = this.fw;
      this._parent._parent[this._parent._name + this._name + "_ob"].fh = this.fh;
      this._parent._parent[this._parent._name + this._name + "_ob"].fr = this.fr;
      this._parent._parent[this._parent._name + this._name + "_ob"].wpi = this.wpi;
      if(this.fn == -2)
      {
         this._parent._parent[this._parent._name + this._name + "_ob"].wptx = "tx_dbs";
      }
      else if(this.fn == 2)
      {
         this._parent._parent[this._parent._name + this._name + "_ob"].wptx = "tx_bs2";
      }
      else
      {
         this._parent._parent[this._parent._name + this._name + "_ob"].wptx = "tx_bs1";
      }
   }
}
