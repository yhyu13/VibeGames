onEnterFrame = function()
{
   loaded = getBytesLoaded();
   total = getBytesTotal();
   loading.ifo.text = Math.round(100 * loaded / total) + "%";
   loading.ifob.text = loading.ifo.text;
   loading.bb._xscale = 100 * loaded / total;
   if(loaded / total == 1)
   {
      play();
      delete onEnterFrame;
   }
};
