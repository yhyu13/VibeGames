BgmS = new Sound(Bgm_box);
SoundS = new Sound(Sound_box);
VoiceS = new Sound(voice);
_root.BgmS.setVolume(_root.bgmVol);
_root.SoundS.setVolume(_root.sndVol);
_root.VoiceS.setVolume(_root.vocVol);
_global.bgm = function(n, t)
{
   if(t == null)
   {
      t = 0;
   }
   var _loc2_ = 1;
   while(_loc2_ <= 3)
   {
      _root.Bgm_box["music_" + _loc2_].stop("loop" + _loc2_);
      _loc2_ = _loc2_ + 1;
   }
   if(n != 0)
   {
      _root.Bgm_box["music_" + n].start(t,999);
   }
};
_global.snd = function(m)
{
   _root.Sound_box["music_" + m].start(0,1);
};
_global.sndloop = function(o)
{
   _root.Sound_box["music_" + o].start(0,999);
};
