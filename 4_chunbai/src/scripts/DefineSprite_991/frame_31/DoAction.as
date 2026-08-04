if(BGon)
{
   _root.Bgm_box.music_3.start(0.001 * this.sp);
   _root.Bgm_box.music_3.onSoundComplete = function()
   {
      bgm(3,0);
      _root.Bgm_box.music_3.onSoundComplete = null;
   };
}
