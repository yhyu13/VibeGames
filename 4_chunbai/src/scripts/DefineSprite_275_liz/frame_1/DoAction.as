function playit()
{
   if(!stopAll)
   {
      if(_root.cmrs[Cmr.tgt] != undefined)
      {
         if(_root.cmrs[Cmr.tgt].v._pt > 10)
         {
            if(this._sX - _root.cmrs[Cmr.tgt]._sX > 55)
            {
               this._sX = _root.cmrs[Cmr.tgt]._sX - 50;
               this._sY = _root.cmrs[Cmr.tgt]._sY + 50 * (random(200) - 100) / 100;
               this._sZ = _root.cmrs[Cmr.tgt]._sZ + 50 * (random(200) - 100) / 100;
            }
            else if(this._sX - _root.cmrs[Cmr.tgt]._sX < -55)
            {
               this._sX = _root.cmrs[Cmr.tgt]._sX + 50;
               this._sY = _root.cmrs[Cmr.tgt]._sY + 50 * (random(200) - 100) / 100;
               this._sZ = _root.cmrs[Cmr.tgt]._sZ + 50 * (random(200) - 100) / 100;
            }
            if(this._sZ - _root.cmrs[Cmr.tgt]._sZ > 55)
            {
               this._sZ = _root.cmrs[Cmr.tgt]._sZ - 50;
               this._sY = _root.cmrs[Cmr.tgt]._sY + 50 * (random(200) - 100) / 100;
               this._sX = _root.cmrs[Cmr.tgt]._sX + 50 * (random(200) - 100) / 100;
            }
            else if(this._sZ - _root.cmrs[Cmr.tgt]._sZ < -55)
            {
               this._sZ = _root.cmrs[Cmr.tgt]._sZ + 50;
               this._sY = _root.cmrs[Cmr.tgt]._sY + 50 * (random(200) - 100) / 100;
               this._sX = _root.cmrs[Cmr.tgt]._sX + 50 * (random(200) - 100) / 100;
            }
            if(this._sY - _root.cmrs[Cmr.tgt]._sY > 55)
            {
               this._sY = _root.cmrs[Cmr.tgt]._sY - 50;
               this._sZ = _root.cmrs[Cmr.tgt]._sZ + 50 * (random(200) - 100) / 100;
               this._sX = _root.cmrs[Cmr.tgt]._sX + 50 * (random(200) - 100) / 100;
            }
            else if(this._sY - _root.cmrs[Cmr.tgt]._sY < -55)
            {
               this._sY = _root.cmrs[Cmr.tgt]._sY + 50;
               this._sZ = _root.cmrs[Cmr.tgt]._sZ + 50 * (random(200) - 100) / 100;
               this._sX = _root.cmrs[Cmr.tgt]._sX + 50 * (random(200) - 100) / 100;
            }
            _sX2 = this._sX + 2 * _root.cmrs[Cmr.tgt].v._sX;
            _sY2 = this._sY + 2 * _root.cmrs[Cmr.tgt].v._sY;
            _sZ2 = this._sZ + 2 * _root.cmrs[Cmr.tgt].v._sZ;
         }
         else
         {
            _sX2 = this._sX;
            _sY2 = this._sY;
            _sZ2 = this._sZ;
         }
      }
   }
}
