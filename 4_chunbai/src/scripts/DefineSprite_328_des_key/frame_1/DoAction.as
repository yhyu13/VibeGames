var ikey = "" + random(10) + random(10) + random(10) + random(10) + "-" + random(10) + random(10) + random(10) + random(10);
ikey = printHex(des("phixcat",ikey,1));
var isn = "";
var ukey = "";
var usn = "";
days = new Array("Sunday","Monday","Tuesday","Wednesday","thursday","Friday","Saturday","Sunday");
months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
timedate = new Date();
var timebox = "";
onEnterFrame = function()
{
   stopAllSounds();
   xx._x = this._xmouse;
   xx._y = this._ymouse;
   if(ukey != "" && ukey != null)
   {
      usn = printHex(des(des("phixcat",unHex(ukey),0),"phixcat",1));
   }
   else
   {
      usn = "";
   }
   hour = timedate.getHours();
   minutes = timedate.getMinutes();
   seconds = timedate.getSeconds();
   todaydate = timedate.getDate();
   day = timedate.getDay();
   dayname = days[day];
   month = timedate.getMonth() + 1;
   monthname = months;
   year = timedate.getFullYear();
   if(length(hour) == 1)
   {
      hour = "0" + hour;
   }
   if(length(minutes) == 1)
   {
      minutes = "0" + minutes;
   }
   if(length(seconds) == 1)
   {
      seconds = "0" + seconds;
   }
   if(length(todaydate) == 1)
   {
      todaydate = "0" + todaydate;
   }
   currenttime = hour + ":" + minutes + ":" + seconds;
   currentdate = todaydate + "/" + month + "/" + year;
   fulldate = dayname + " " + todaydate + " " + monthname + " " + year;
   timebox = currentdate + "——" + currenttime;
   delete timedate;
   timedate = new Date();
};
