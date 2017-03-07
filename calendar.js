var calendar = (function(){
  var monthString= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var dayString =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var panelTarget;
  var currentsMonth;
  var currentsYear;
  var currentDay;
  var dayEventsObject={};
  var currentDayIndex;
  var currentMonthIndex;
  var currentYearIndex;
  var today = new Date();
  var todayDate = new Date();
  var thisMonth= todayDate.getMonth();
  var thisYear=todayDate.getFullYear();
  var today =todayDate.getDate();
  var yearViewListeners=[];
  var monthViewListeners=[];
  var viewListeners=[];
  var monthMonthListener=[];
  var dayEventListener=[];
  var alertListener=[];
  var x=0;
  var monthCurrentMonth=thisMonth;
  var monthCurrentYear=getYearCurrents("year");
  var panelCurrentMonth;
  var panelCurrentYear;
  var panelCurrentDay;
  var dayCurrentYear=todayDate.getFullYear();
  var dayCurrentMonth=todayDate.getMonth();
  var dayCurrentDay=todayDate.getDate();
  var panelListener=[];
  var dayDayListener=[];
  var calendarEmptListener=[];
  var monthEventListener=[];
  var currentPaneltarget;
  var panelCurrentID;
  var tempRepetionObj=[];

  function EvenAttributes(title,day,month,year,sTime,eTime,m,t,w,th,f,s,su,repetionY,repetionObj,reminder,active){
    this.startTime=sTime;
    this.endTime=eTime;
    this.repetitionY=repetionY;
    this.title =title;
    this.day=day;
    this.month=month;
    this.year=year;
    this.active=active;
    this.repM=m;
    this.repT=t;
    this.repW=w;
    this.repTh=th;
    this.repF=f;
    this.repS=s;
    this.repSu=su;
    this.reminder=reminder;
    this.repetitions=repetionObj
  }

  var myCalendar = new Set(); //just added some event
  function initialize(){
      notifyYearView(getYearCurrents("year"));
      notifyDay(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
      notifyMonthView(getYearCurrents("year"),thisMonth);
  }
function save(){

  myCalendar.save();
}
  //  myCalendar.add(new EvenAttributes("Practice Basketball",5,2,2017,"1:00am","4:00am", false,false, true,true));
  //  myCalendar.add(new EvenAttributes("Eat at chipolet",5,3,2017,"12:00pm","1:00pm", false, false,false,true));
  //  myCalendar.add(new EvenAttributes("Eat with Ms. Easte",5,1,2017,"8:00pm","9:00pm", true,false, false,true));
  //  myCalendar.add(new EvenAttributes("Meeting with Jake",27,1,2017,"12:00pm","2:00pm", true,false, false,true));
  //  myCalendar.add(new EvenAttributes("Valentine day",14,1,2017,false,false, true, false,false,true));
  //  myCalendar.add(new EvenAttributes("Going to sleep",16,1,2017,"12:00am","6:00am", false, false,false,true));
  //  myCalendar.add(new EvenAttributes("Meeting with Alexa",16,1,2017,"8:00am","10:00am", false, false,false,true));
  //  myCalendar.add(new EvenAttributes("Wedding Party",16,1,2017,"1:00pm","10:00pm", false, false,false,true));
  //  myCalendar.add(new EvenAttributes("Call Dad",16,1,2017,"6:00pm","10:00pm", false, false,false,true));
  //  myCalendar.add(new EvenAttributes("Call Mother",16,1,2017,"6:00am","8:00am", false, false,false,true));
  //  myCalendar.add(new EvenAttributes("Science Documentary on tv",16,1,2017,"11:00pm","12:00am", false, false,false,true));
  //  myCalendar.add(new EvenAttributes("Project due day",14,1,2017,false,false, true, false,false,true));
  //  myCalendar.add(new EvenAttributes("Movie with kaila",14,1,2017,"10:00pm","11:30pm", true, false,false,true));
  //  myCalendar.add(new EvenAttributes("Movie with Family",21,1,2017,"4:30pm","11:30pm", true, false,false,true));
  //  myCalendar.add(new EvenAttributes("fun with Family",21,1,2017,"3:30pm","11:30pm", true, false,false,true));
  //  myCalendar.add(new EvenAttributes("Mo's Birthday party",14,1,2017,false,false, true, false,false,true));
  //  myCalendar.add(new EvenAttributes("New Year",31,11,2017,false,false, true, false,false,true));
   function changeDayView(year, month, day){
     notifyDay(year,month,day);
   }
  function displayAMonth(mY,mM){
    monthCurrentYear=mY;
    monthCurrentMonth=mM;
    notifyMonthView(mY,mM);
  }
  function desactivateAnEvent(id){
    var r =myCalendar.disactivate(id);
     if(!r){
       alert("couldn't desactivate");
       return false;
     }
  }
   function editeEvent(eltId,creationDate,modificationDate,title,day,month,year,sTime,eTime,m,t,w,th,f,s,su,repetionY,repetionObj,reminder){
     //var success=myCalendar.edite(eltId,new EvenAttributes(title,day,month,year,sTime,eTime,repetionY,repetionMonthly,repetionDay,true));

     var success=myCalendar.edit(eltId,creationDate,modificationDate,new EvenAttributes(title,day,month,year,sTime,eTime,m,t,w,th,f,s,su,repetionY,repetionObj,reminder,true));
     if(success){
       notifyMonthView(monthCurrentYear,monthCurrentMonth);
       notifyDay(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
       notifyYearView(getYearCurrents("year"));
       return true;
     }else {
       return false;
     }
   }
   function getPanelTarget(){
     return panelCurrentID;
   }
   function getDayCurrents(which){
     if(which==="month"){
       return dayCurrentMonth;
     }else if (which ==="year") {
       return dayCurrentYear;
     }else if (which ==="day") {
       return dayCurrentDay;
     }
   }
   function getMonthCurrents(which){
     if(which==="month"){
       return monthCurrentMonth;
     }else if (which ==="year") {
       return monthCurrentYear;
     }
   }
   function getYearCurrents(which){
     var today =new Date();
     if(which ==="year"){
       return today.getFullYear();
     }else if (which==="month") {
       return today.getMonth();
     }else if (which ==="day") {
       return today.getDate();
     }
   }
  function getAnEvent(ev){
    return myCalendar.getAKey(ev);
  }
  function deleteEvent(){

    var id = panelCurrentID;
    var success=myCalendar.delete(id);
    if(success){
      //alert("deleted");
      console.log(myCalendar);
      notifyYearView(getYearCurrents("year"));
      if(monthCurrentMonth===panelCurrentMonth&& monthCurrentYear===panelCurrentYear){
        notifyMonthView(monthCurrentYear,monthCurrentMonth);

      }
      if(dayCurrentMonth===panelCurrentMonth && dayCurrentDay===panelCurrentDay && dayCurrentYear===panelCurrentYear){
        notifyDay(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
      }
      return true;
    }else {
      //alert("error couldn't delete");
      return false;
    }


  }
  function addDayEvent(id,theEvent){
    notifyDayEvents(id, theEvent);
  };
  function attachEvent(title,startTime,endTime,m,t,w,th,f,s,su,repetionY,repetionObj,reminder){
   //var success=myCalendar.add(new EvenAttributes(title,panelCurrentDay,panelCurrentMonth,panelCurrentYear,startTime,endTime, false, false,false,true));
  var success=myCalendar.add(new EvenAttributes (title,panelCurrentDay,panelCurrentMonth,panelCurrentYear,startTime,endTime,m,t,w,th,f,s,su,repetionY,repetionObj,reminder,true));
   if(success){
     notifyYearView(getYearCurrents("year"));
     if(monthCurrentMonth===panelCurrentMonth&& monthCurrentYear===panelCurrentYear){
       notifyMonthView(monthCurrentYear,monthCurrentMonth);

     }
     if(dayCurrentMonth===panelCurrentMonth && dayCurrentDay===panelCurrentDay && dayCurrentYear===panelCurrentYear){
       notifyDay(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
     }
     return true;
   }else {
     console.log("this calendar already Exists");
     return false;
   }

  }

function addMonthEvent(location,TheEvent){

  notifyMonthEventslistener(location,TheEvent);

}

function addPassedAlert(id,alertDate){
  //var key=id+""+alertDate;
  myCalendar.addExpiredAlerts(id,alertDate);
}
  function getEventsAvailableIn(y,m,d){

    var elts=[];
    y =parseInt(y);
    m =parseInt(m);
    d =parseInt(d);
    var keyArrays =myCalendar.getKeys();
    for(var i=0; i<keyArrays.length;i++){
      var isYearly=myCalendar.getAKey(keyArrays[i]).attributes.repetitionY; // if the particular event is yearly
      //var isDaily =myCalendar.getAKey(keyArrays[i]).attributes.repetitionDay; // if the particular event is yearly
      var month   =myCalendar.getAKey(keyArrays[i]).attributes.month; // month
      var day     =myCalendar.getAKey(keyArrays[i]).attributes.day; //day
      var year    =myCalendar.getAKey(keyArrays[i]).attributes.year; //year
      var title   =myCalendar.getAKey(keyArrays[i]).attributes.title; //title
      var sTime   =myCalendar.getAKey(keyArrays[i]).attributes.startTime; //title
      if((year===y || isYearly) && month=== m && (day===d) ){

        elts.push(myCalendar.getAKey(keyArrays[i]));
      }

    }

    return elts;
  }
  function interpretHourFormat(x){
    if(x==="hour"){return 60*60*1000;}
    else if (x==="minute") { return 60*1000;}
    else if (x==="day") { return 24*60*60*1000;}
    else if (x==="week") { return 7*24*60*60*1000;}
    else if (x==="month") { return 4*7*24*60*60*1000; }
    else if (x==="none") { return 1000; }
    else if (x==="second") { return 1000; }

  }
 function checkToAlert(){
   setInterval(function(){
     var today =new Date();
     var y = today.getFullYear();
     var tM = today.getMonth();
     var d = today.getDate();
     var todayWeekDay=today.getDay();
     var tHour = today.getHours();
     var tMin = today.getMinutes();
     var keyArrays =myCalendar.getKeys();
     for(var i=0; i<keyArrays.length;i++){
       var isYearly=myCalendar.getAKey(keyArrays[i]).attributes.repetitionY; // if the particular event is yearly
       var creationDate=myCalendar.getAKey(keyArrays[i]).creationDate;
       var modificationDate=myCalendar.getAKey(keyArrays[i]).modificationDate;
       var reminder=myCalendar.getAKey(keyArrays[i]).attributes.reminder;
       var reminderUnit=parseInt(reminder.slice(0,reminder.indexOf(".")));
       var reminderFormat=reminder.slice(reminder.indexOf(".")+1,reminder.length);
       var repWeekly=[myCalendar.getAKey(keyArrays[i]).attributes.repSu,myCalendar.getAKey(keyArrays[i]).attributes.repM,myCalendar.getAKey(keyArrays[i]).attributes.repT,myCalendar.getAKey(keyArrays[i]).attributes.repW,myCalendar.getAKey(keyArrays[i]).attributes.repTh,myCalendar.getAKey(keyArrays[i]).attributes.repF,myCalendar.getAKey(keyArrays[i]).attributes.repS];
       var eventObjDates=myCalendar.getAKey(keyArrays[i]).attributes.repetitions;
       var month   =myCalendar.getAKey(keyArrays[i]).attributes.month; // month
       var day     =myCalendar.getAKey(keyArrays[i]).attributes.day; //day
       var year    =myCalendar.getAKey(keyArrays[i]).attributes.year; //year
       var title   =myCalendar.getAKey(keyArrays[i]).attributes.title; //title
       var sTime   =myCalendar.getAKey(keyArrays[i]).attributes.startTime; //title
       var active =myCalendar.getAKey(keyArrays[i]).attributes.active; //active or not
       var thisEventId=myCalendar.getAKey(keyArrays[i]).id;
       // reminder calculations
       var sT=sTime;
       var h;
       var m;
       var f;
       if(sT){
         h = parseInt(sT.slice(0,sT.indexOf(":")));
         m=parseInt(sT.slice(sT.indexOf(":")+1,sT.indexOf(":")+3));
         f=sT[sT.length-2]+sT[sT.length-1];
         if(f==="pm" && h<12){
           h+=12;
         }else if (f==="pm" && h===12) {
           h=0;
        }
       }else {
         h=0;
        m=0;

       }

      var aKey=(tM+""+d+""+y);
      var isItToday= (active && (year===y || isYearly) && month=== tM && (day===d));
      var reminderTime=(r0<=reminderUnit);
      var thisKeyDate=(month+""+day+""+year);
      var eventObjDatesData=eventObjDates;
      for( var j =0; j<Object.keys(eventObjDatesData).length; j++){
         var eltMonth=  eventObjDatesData[Object.keys(eventObjDatesData)[j]].month;
         var eltYear=  eventObjDatesData[Object.keys(eventObjDatesData)[j]].year;
         var eltDay=  eventObjDatesData[Object.keys(eventObjDatesData)[j]].day;
         thisKeyDate=(eltMonth+""+eltDay+""+eltYear);
         var a =(new Date(eltYear,eltMonth,eltDay,h,m).getTime());
         var dif1=getDifferenceInDate(new Date(year,month,day),new Date(eltYear,eltMonth,eltDay),"millisecond");

         if(isYearly){
            a =(new Date(y,eltMonth,eltDay,h,m).getTime());//y is the current year;
            thisKeyDate=(eltMonth+""+eltDay+""+y);
            dif1=getDifferenceInDate(new Date(year,month,day),new Date(y,eltMonth,eltDay),"millisecond");

         }
         var b =(new Date(y,tM,d,tHour,tMin).getTime()); //today Date times
         //var r=Math.round(Math.abs((a - b)/(interpretHourFormat(reminderFormat))));
         var r0=Math.round(((a - b)/(interpretHourFormat(reminderFormat))));
         if(interpretHourFormat(reminderFormat)===1000){
            reminderUnit=0;
         }
         var reminderTime=(r0<=reminderUnit);

        if(!myCalendar.expiredHas(thisEventId,thisKeyDate) && (reminderTime )&& dif1>=0){

          if(reminderTime ){
            var ms=(reminderUnit+" "+reminderFormat+" away");
            if(Math.round(Math.abs((a - b)/(interpretHourFormat("minute"))))>0){
              ms=(title +"<br>"+"was "+reminderUnit+" "+reminderFormat+" away, "+Math.abs(reminderUnit-Math.round(Math.abs((a - b)/(interpretHourFormat("minute")))))+ " minutes ago");
              if(Math.round(Math.abs((a - b)/(interpretHourFormat("minute"))))>59){
                ms=(title +"<br>"+" was "+ reminderUnit+" "+reminderFormat+" away, "+Math.round(Math.abs((a - b)/(interpretHourFormat("hour"))))+ " hours ago");
              }
            }
            if(reminderUnit===0){
              ms= title +", right now!";
              if(Math.round(Math.abs((a - b)/(interpretHourFormat("minute"))))>0){
                ms=(title +"<br>"+Math.abs(reminderUnit-Math.round(Math.abs((a - b)/(interpretHourFormat("minute")))))+ " minutes ago");
                if(Math.round(Math.abs((a - b)/(interpretHourFormat("minute"))))>59){
                  ms=(title +"<br>"+Math.abs(reminderUnit-Math.round(Math.abs((a - b)/(interpretHourFormat("hour")))))+ " hour ago");
                }
                if(Math.round(Math.abs((a - b)/(interpretHourFormat("hour"))))>24){
                    ms=(title +"<br>"+Math.abs(reminderUnit-Math.round(Math.abs((a - b)/(interpretHourFormat("day")))))+ " days ago");
                }
              }

            }
            notifyAlert(myCalendar.getAKey(keyArrays[i]),ms,thisKeyDate);
          }

        }

      }
      //have to have a new key date here with the next ......date
    var predictionDay=theDayAfter(reminderUnit,reminderFormat);
    var thisNday =predictionDay.day;
    var thisNdate=predictionDay.date;
    var thisNmonth=predictionDay.month;
    var thisNyear=predictionDay.year;
    var dif=getDifferenceInDate(new Date(year,month,day),new Date(thisNyear,thisNmonth,thisNdate),"day");
    var thisKeyDate=(thisNmonth+""+thisNdate+""+thisNyear);
      if( !myCalendar.expiredHas(thisEventId,thisKeyDate) && repWeekly[thisNday] && dif>=0){ //if it repead weekly m t w th f s and sundays
        var ms =title+"<br>"+reminderUnit+" "+reminderFormat+" before"+dayString[theDayAfter(reminderUnit,reminderFormat).day];
        if(reminderFormat==="none"){
            var ms =title+"<br>"+" for every "+dayString[theDayAfter(reminderUnit,reminderFormat).day];
        }
        notifyAlert(myCalendar.getAKey(keyArrays[i]),ms,thisKeyDate);
      }
     }

   },1000);
 }
 checkToAlert();


 function theDayAfter(reminderUnit,reminderFormat){
   var today =new Date();
   var y = today.getFullYear();
   var tM = today.getMonth();
   var d = today.getDate();
   var todayWeekDay=today.getDay();
   var tHour = today.getHours();
   var tMin = today.getMinutes();
   if(reminderFormat==="none"){
   // if this is true,  repWeekly[todayWeekDay], then alert

    return {day:todayWeekDay,date:d,month:tM,year:y};
 }else if (reminderFormat==="minute") {
     var min = tMin+reminderUnit;
      var hr = tHour;
      var dy=d;
      var mth=tM;
      var thisY=y;
    //  console.log(hr,min);
      if(min>59 &&min<120){
        hr++;
        min=min-60;
      }
      if(hr>23){
        hr=0;
        min=0;
        dy++;
      }

    // console.log(thisY,mth,dy,hr,min);
    var thisDate=new Date(thisY,mth,dy,hr,min);
     var nextAfterReminder=thisDate.getDay();
     ///console.log(thisDate.getDate());
     return {day:nextAfterReminder,date:thisDate.getDate(),month:thisDate.getMonth(),year:thisDate.getFullYear()};
 }else if (reminderFormat==="hour") {
   var min = tMin;
    var hr = tHour+reminderUnit;
    var dy = d;
    var mth=tM;
    var thisY=y;
    if(hr>23){
      hr=hr-24;
      min=0;
      dy++;
    }
  //  console.log(thisY,mth,dy,hr,min);
  var thisDate=new Date(thisY,mth,dy,hr,min);
   var nextAfterReminder=thisDate.getDay();
   //console.log(thisDate.getDate());
   return {day:nextAfterReminder,date:thisDate.getDate(),month:thisDate.getMonth(),year:thisDate.getFullYear()};
 }
else if (reminderFormat==="day") {
 var min = tMin;
  var hr = tHour;
  var dy = d+reminderUnit;
  var mth=tM;
  var thisY=y;
  var lastDay = new Date(y, tM + 1, 0).getDate()
  if(dy>lastDay){
    mth++;
    dy= new Date(thisY, mth, dy-lastDay).getDate(); //first day of the  next month
  }
  //console.log(thisY,mth,dy,hr,min);
  var thisDate=new Date(thisY,mth,dy,hr,min);
   var nextAfterReminder=thisDate.getDay();
   //console.log(thisDate.getDate());
   return {day:nextAfterReminder,date:thisDate.getDate(),month:thisDate.getMonth(),year:thisDate.getFullYear()};
}
 else if (reminderFormat==="week") {
   var min = tMin;
    var hr = tHour;
    var mth =tM
    var thisY=y;
    //console.log(thisY,mth,d,hr,min);
    var dy =d+(7*reminderUnit);
    var lastDay = new Date(y, tM + 1, 0).getDate();
    if(dy> lastDay){
      mth++;
      dy=dy-lastDay;
    }
    if(mth >11){
      thisY++;
      mth=0;
      dy= new Date(thisY, mth, 1).getDate(); //first day of the month of the new year
    }
    //console.log(thisY,mth,dy,hr,min);
    var thisDate=new Date(thisY,mth,dy,hr,min);
     var nextAfterReminder=thisDate.getDay();

     return {day:nextAfterReminder,date:thisDate.getDate(),month:thisDate.getMonth(),year:thisDate.getFullYear()};
 }
}
  function addPanelCurrentTarget(which,value){
    if(which ==="panelCurrentID"){
      panelCurrentID=value;

    }

  }
  function emptyCalendar(whichOne){
    notifyCalendarEmp(whichOne);

  }
  function refreshDay(){
    notifyDay(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
  }
  function showToday(where){
    var today = new Date();

    if(where==="month"){

      monthCurrentMonth=today.getMonth();
      monthCurrentYear=today.getFullYear();
      notifyMonthView(today.getFullYear(),today.getMonth());
    }else if (where==="day") {

      dayCurrentDay=today.getDate();
      dayCurrentYear=today.getFullYear();
      dayCurrentMonth=today.getMonth();
      notifyDay(today.getFullYear(),today.getMonth(),today.getDate());
    }else if (where==="year") {
        notifyYearView(today.getFullYear());
    }

  }

  function updatePanel(e,where){

    if(where==="year"){
      var m =parseInt(e.currentTarget.offsetParent.className.slice(5,e.currentTarget.offsetParent.className.length));
      notifyPanel(e,"year",getYearCurrents("year"),m,e.currentTarget.attributes.value,false,false);
    }else if (where==="month") {

      notifyPanel(e,"month",monthCurrentYear,monthCurrentMonth,e.currentTarget.attributes.value,false,false);
    }else if (where==="daily") {
      notifyPanel(e,"day",dayCurrentYear,dayCurrentMonth,dayCurrentDay,e.target.id,false);
    }
    if(where === "extra"){
      notifyPanel(e,"extra",monthCurrentYear,monthCurrentMonth,panelCurrentDay,false,false);
    }

  }

  function dayChangeCurrentDay(increaseOrDecrease){
    if(increaseOrDecrease==="+"){
      var lastDay = new Date(dayCurrentYear, dayCurrentMonth + 1, 0).getDate()
     dayCurrentDay++;
     if(dayCurrentDay>lastDay){
        dayCurrentMonth++;
        var nextFirstDay= new Date(dayCurrentYear, dayCurrentMonth, 1).getDate();
        dayCurrentDay=nextFirstDay;
        if(dayCurrentMonth>11){
            dayCurrentYear++;
            dayCurrentMonth=0;
            dayCurrentDay=new Date(dayCurrentYear, dayCurrentMonth, 1).getDate();
        }
     }


    }else {
      //.............
      var firstDay = new Date(dayCurrentYear, dayCurrentMonth, 1).getDate();

     dayCurrentDay--;
     if(dayCurrentDay<firstDay){
       dayCurrentMonth--;
       var previouslastDay  = new Date(dayCurrentYear, dayCurrentMonth + 1, 0).getDate();
       dayCurrentDay=previouslastDay;
       if(dayCurrentMonth<0){
         dayCurrentYear--;
         dayCurrentMonth=11;
         currentDayIndex=new Date(dayCurrentYear, dayCurrentMonth + 1, 0).getDate();
       }
     }

     //..........
    }

    notifyDay(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
  }

  function monthChangeCurrentMonth(increaseOrDecrease){
    if(increaseOrDecrease==="+"){
      monthCurrentMonth++;
      if(monthCurrentMonth>11){
        monthCurrentYear++;
        monthCurrentMonth=0;
      }
    }else {
      monthCurrentMonth--;
      if(monthCurrentMonth<0){
        monthCurrentYear--;
        monthCurrentMonth=11;
      }
    }
    notifyMonthView(monthCurrentYear,monthCurrentMonth);
  }

  function changeCurrentViewTo(type){
    if(type==="year"){
      notifyViewChanger("year");
    }else if (type==="month") {
      notifyViewChanger("month");
    }else {
      notifyViewChanger("day");
    }

  }

  function addListener(type,view){
    if(type==="yearViewListeners"){
      yearViewListeners.push(view);
    //  monthViewListeners.push(view);
    }
    else if (type==="monthViewListeners") {
      monthViewListeners.push(view);
    }else if (type==="viewChanger") {
      viewListeners.push(view);
    }else if (type==="panelListener") {
      panelListener.push(view);
    }else if (type==="daychangeCurrentDay") {
      dayDayListener.push(view);
    }else if (type==="emptyCalendar") {
      calendarEmptListener.push(view);
    }else if (type==="monthEventListener") {
      monthEventListener.push(view);
    }else if (type==="dayEventListener") {
      dayEventListener.push(view);
    }else if (type==="alertListener") {
       alertListener.push(view);
    }

  }
  function notifyAlert(TheEvent,message,key){
    for(var i=0; i< alertListener.length; i++){
      var f = alertListener[i];
      f(TheEvent,message,key);
    }

  }
  function notifyDayEvents(id, theEvent){
    for(var i=0; i< dayEventListener.length; i++){
      var f = dayEventListener[i];
      f(id, theEvent);
    }

  }
  function notifyCalendarEmp(whichOne){
    for(var i=0; i<calendarEmptListener.length; i++){
      var f=calendarEmptListener[i];
      f(whichOne);
    }
  }
  function notifyYearView(year){

    for (var i = 0; i < yearViewListeners.length; i++) {
      var view = yearViewListeners[i];
      for(var j =0; j<12; j++){
        view(year,j,".table"+j);
        //console.log(yearViewListeners.length);

      }

    }
  }

  function notifyMonthView(year,month){
    for (var i = 0; i < monthViewListeners.length; i++) {
      var view = monthViewListeners[i];

        view(year,month,".tableMonth");


    }
  }
  function notifyViewChanger(type){
    for (var i = 0; i < viewListeners.length; i++) {
      var view = viewListeners[i];
        view(type);


    }
  }

  function notifyPanel(e,where,year,month,day,sTime,eTime){

    panelCurrentMonth =month;
    panelCurrentYear=year;
    panelCurrentDay=day;
    for(var i=0; i<panelListener.length; i++){
      var f =panelListener[i];
      f(e,where,year,month,day,sTime,eTime);
    }
    //console.log(panelCurrentYear,panelCurrentMonth,panelCurrentDay,time);
  }
  function notifyDay(year,month,day){
    dayCurrentYear=year;
    dayCurrentMonth=month;
    dayCurrentDay=day;
    for(var i=0;i<dayDayListener.length; i++){
      var f=dayDayListener[i];
      f(year,month,day);

    }
  }
  function notifyMonthEventslistener(location,TheEvent){

    for(var i=0;i<monthEventListener.length; i++){
      var f=monthEventListener[i];
      f(location,TheEvent);

    }
  }
function updateCalendar(){
  var today = new Date().getDate();
//  console.log("fff");
  setInterval(function(){
  //  console.log(today);
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    //console.log(hour+" : "+minutes);
    if(new Date().getDate()-today!==0){// that means day changed
      alert("this is another day");
      showToday("year");
      showToday("month");
      showToday("day");
      today =new Date().getDate();

    }
  },1000);
}
updateCalendar();
function getDifferenceInDate(a,b,what){
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var oneWeek = 7*oneDay;
  var oneMonth=oneWeek*4;
  var oneHour=60*60*1000;
  var oneMin=60*1000;
  var oneSecond=1000;
  var inWhat=oneDay;
  if(what==="hour"){
    inWhat=oneHour;
  }
  else if(what==="minutes" || what==="minute"){
    inWhat=oneMin;
  }
  else if(what==="second" || what==="seconds"){
    inWhat=oneSecond;
  }
  else if(what==="milliseconds" || what==="millisecond"){
    inWhat=1;
  }
  else if(what==="day" || what==="days"){
    inWhat=oneDay;
  }
  else if(what==="week" || what==="weeks"){
    inWhat=oneWeek;
  }
  else if(what==="month" || what==="months"){
    inWhat=oneMonth;
  }
  if(a==="today" || !a){
    a = new Date();
  }
  if(b==="today" || !b){
    b = new Date();
  }
var firstDate = a;//new Date(2017,2,19,11,30);
var secondDate = b;//new Date(2017,2,20,10,30);

var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(inWhat)));
// if(firstDate.getTime()>secondDate.getTime()){
//   alert("-");
// }
var dif=(secondDate.getTime()-firstDate.getTime())/(inWhat);
// console.log(diffDays);
// console.log(dif);
return dif;
}
  return {
  addListener:addListener,
  changeCurrentViewTo:changeCurrentViewTo,
  monthChangeCurrentMonth:monthChangeCurrentMonth,
  updatePanel:updatePanel,
  dayChangeCurrentDay:dayChangeCurrentDay,
  showToday:showToday,
  emptyCalendar:emptyCalendar,
  addPanelCurrentTarget:addPanelCurrentTarget,
  attachEvent:attachEvent,
  getEventsAvailableIn:getEventsAvailableIn,
  addMonthEvent:addMonthEvent,
  getAnEvent:getAnEvent,
  deleteEvent:deleteEvent,
  getYearCurrents:getYearCurrents,
  getMonthCurrents:getMonthCurrents,
  addDayEvent:addDayEvent,
  getPanelTarget:getPanelTarget,
  editeEvent:editeEvent,
  refreshDay:refreshDay,
  getDayCurrents:getDayCurrents,
  displayAMonth:displayAMonth,
  desactivateAnEvent:desactivateAnEvent,
  changeDayView:changeDayView,
  save:save,
  initialize:initialize,
  addPassedAlert:addPassedAlert
  };
})();
