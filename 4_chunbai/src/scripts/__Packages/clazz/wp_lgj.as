class clazz.wp_lgj extends clazz.weapon_phix
{
   var wpi;
   function wp_lgj()
   {
      super();
   }
   function doit()
   {
      if(this._parent._parent[this._parent._name + this._name + "_" + 1] != undefined)
      {
         if(this._parent._EN >= this.en && this._zt == "noen")
         {
            this._zt = "nor";
         }
         if(this._parent._EN < this.en && this._zt == "nor")
         {
            this._zt = "noen";
         }
         if(this.t <= 0 && this._zt == "nor")
         {
            if(this._parent.firectrlmode == "AUTO" && this._parent.htime != null)
            {
               if(this._parent.dst < this.maxforce - 1100)
               {
                  this._parent._parent[this._parent._name + this._name + "_" + 1].tgt = this._parent.tgt;
                  this._parent._parent[this._parent._name + this._name + "_" + 1].doit();
                  if(this.fn == 2)
                  {
                     this._parent._parent[this._parent._name + this._name + "_" + 2].tgt = this._parent.tgt;
                  }
                  this._parent._EN -= this.en;
                  this._parent.atton = 5;
                  this.t = this.ct;
                  this._parent.GDon = false;
                  this._parent.vX = 0;
                  this._parent.vY = 0;
                  this._parent.vZ = 0;
               }
               else if(this._parent.dst < this.maxforce)
               {
                  this._parent.GDon = true;
               }
            }
         }
      }
   }
   function showit()
   {
      var _loc3_ = new Object();
      _loc3_ = _global.moveobj(this._parent.objz,this.fx,this.fy,this.fz);
      this._parent._parent.attachMovie("ob_lbeamswd",this._parent._name + this._name + "_" + 1,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth,_siz:this.fsiz,_alpha:0});
      this._parent._parent[this._parent._name + this._name + "_" + 1].mst = this._parent._name;
      this._parent._parent[this._parent._name + this._name + "_" + 1].dam = this.damlv;
      this._parent._parent[this._parent._name + this._name + "_" + 1].maxforce = this.maxforce - 1000;
      this._parent._parent[this._parent._name + this._name + "_" + 1].speed = this.ddspeedlv;
      this._parent._parent[this._parent._name + this._name + "_" + 1].fx = this.fx;
      this._parent._parent[this._parent._name + this._name + "_" + 1].fy = this.fy;
      this._parent._parent[this._parent._name + this._name + "_" + 1].fz = this.fz;
      this._parent._parent[this._parent._name + this._name + "_" + 1].fw = this.fw;
      this._parent._parent[this._parent._name + this._name + "_" + 1].fh = this.fh;
      this._parent._parent[this._parent._name + this._name + "_" + 1].fr = this.fr;
      this._parent._parent[this._parent._name + this._name + "_" + 1].wpi = this.wpi;
      this._parent._parent[this._parent._name + this._name + "_" + 1].wpname = this._name;
      if(this.fn == 2)
      {
         this._parent._parent[this._parent._name + this._name + "_" + 1].br = this._parent._name + this._name + "_" + 2;
         _loc3_ = new Object();
         _loc3_ = _global.moveobj(this._parent.objz,- this.fx,this.fy,this.fz);
         this._parent._parent.attachMovie("ob_lbeamswd",this._parent._name + this._name + "_" + 2,this._parent._parent.getNextHighestDepth(),{_sX:_loc3_.x,_sY:_loc3_.y,_sZ:_loc3_.z,_sW:this._parent.shotw,_sH:this._parent.shoth,_siz:this.fsiz,_alpha:0});
         this._parent._parent[this._parent._name + this._name + "_" + 2].mst = this._parent._name;
         this._parent._parent[this._parent._name + this._name + "_" + 2].dam = this.damlv;
         this._parent._parent[this._parent._name + this._name + "_" + 2].maxforce = this.maxforce - 1000;
         this._parent._parent[this._parent._name + this._name + "_" + 2].speed = this.ddspeedlv;
         this._parent._parent[this._parent._name + this._name + "_" + 2].fx = - this.fx;
         this._parent._parent[this._parent._name + this._name + "_" + 2].fy = this.fy;
         this._parent._parent[this._parent._name + this._name + "_" + 2].fz = this.fz;
         this._parent._parent[this._parent._name + this._name + "_" + 2].fw = - this.fw;
         this._parent._parent[this._parent._name + this._name + "_" + 2].fh = this.fh;
         this._parent._parent[this._parent._name + this._name + "_" + 2].fr = this.fr;
         this._parent._parent[this._parent._name + this._name + "_" + 2].wpi = this.wpi;
         this._parent._parent[this._parent._name + this._name + "_" + 2].wpname = this._name;
      }
   }
}
