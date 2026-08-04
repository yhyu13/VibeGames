function nextpage()
{
   if(this.nowpage < this.maxpage)
   {
      this.nowpage = this.nowpage + 1;
   }
   txt_page = this.nowpage + "/" + this.maxpage;
}
function prevpage()
{
   if(this.nowpage > 1)
   {
      this.nowpage = this.nowpage - 1;
   }
   txt_page = this.nowpage + "/" + this.maxpage;
}
function selectms(i)
{
   if(i <= this.mslist.length - 1 && i >= 0)
   {
      this.nowms = i;
   }
   _global.Player.MS = this.mslist[this.nowms];
   TSon = false;
   viewMS = new Object();
   viewMS = _global[_global.Player.MS];
   shower.showit();
}
function selectnextms()
{
   this.nowms = this.nowms + 1;
   if(this.nowms >= this.mslist.length)
   {
      this.nowms = 0;
   }
   _global.Player.MS = this.mslist[this.nowms];
   TSon = false;
   viewMS = new Object();
   viewMS = _global[_global.Player.MS];
   shower.showit();
}
var mslist = new Array();
var nowms = 0;
var im = 0;
var i = 0;
while(i <= _root.msmdb.length - 1)
{
   if(_global[_root.msmdb[i]] != undefined)
   {
      this.mslist[im] = _root.msmdb[i];
      if(_global.Player.MS == this.mslist[im])
      {
         this.nowms = im;
      }
      this.im = this.im + 1;
   }
   i++;
}
var i = 0;
while(i <= _root.bossmdb.length - 1)
{
   if(_global[_root.bossmdb[i]] != undefined)
   {
      this.im = this.im + 1;
   }
   i++;
}
_global.Player.MS = this.mslist[this.nowms];
var viewMS = _global[_global.Player.MS];
var TSon = false;
var nowpage = Math.floor(this.nowms / 10) + 1;
var maxpage = Math.floor((this.im - 1) / 10) + 1;
txt_page = this.nowpage + "/" + this.maxpage;
