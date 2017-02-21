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

  function EvenAttributes(title,day,month,year,sTime,eTime,repetionY,repetionMonthly,repetionDay,active){
    this.startTime=sTime;
    this.endTime=eTime;
    this.repetitionY=repetionY;
    this.repetitionDay=repetionDay;
    this.repetitionMonthly=repetionMonthly;
    this.title =title;
    this.day=day;
    this.month=month;
    this.year=year;
    this.active=active;
  }

  var myCalendar = new Set(); //just added some event

   myCalendar.add(new EvenAttributes("Practice Basketball",5,2,2017,"1:00am","4:00am", false,false, true,true));
   myCalendar.add(new EvenAttributes("Eat at chipolet",5,3,2017,"12:00pm","1:00pm", false, false,false,true));
   myCalendar.add(new EvenAttributes("Eat with Ms. Easte",5,1,2017,"8:00pm","9:00pm", true,false, false,true));
   myCalendar.add(new EvenAttributes("Meeting with Jake",27,1,2017,"12:00pm","2:00pm", true,false, false,true));
   myCalendar.add(new EvenAttributes("Valentine day",14,1,2017,false,false, true, false,false,true));
   myCalendar.add(new EvenAttributes("Going to sleep",16,1,2017,"12:00am","6:00am", false, false,false,true));
   myCalendar.add(new EvenAttributes("Meeting with Alexa",16,1,2017,"8:00am","10:00am", false, false,false,true));
   myCalendar.add(new EvenAttributes("Wedding Party",16,1,2017,"1:00pm","10:00pm", false, false,false,true));
   myCalendar.add(new EvenAttributes("Call Dad",16,1,2017,"6:00pm","10:00pm", false, false,false,true));
   myCalendar.add(new EvenAttributes("Call Mother",16,1,2017,"6:00am","8:00am", false, false,false,true));
   myCalendar.add(new EvenAttributes("Science Documentary on tv",16,1,2017,"11:00pm","12:00am", false, false,false,true));
   myCalendar.add(new EvenAttributes("Project due day",14,1,2017,false,false, true, false,false,true));
   myCalendar.add(new EvenAttributes("Movie with kaila",14,1,2017,"10:00pm","11:30pm", true, false,false,true));
   myCalendar.add(new EvenAttributes("Movie with Family",21,1,2017,"4:30pm","11:30pm", true, false,false,true));
   myCalendar.add(new EvenAttributes("fun with Family",21,1,2017,"3:30pm","11:30pm", true, false,false,true));
   myCalendar.add(new EvenAttributes("Mo's Birthday party",14,1,2017,false,false, true, false,false,true));
   myCalendar.add(new EvenAttributes("New Year",31,11,2017,false,false, true, false,false,true));
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
   function editeEvent(eltId,title,day,month,year,sTime,eTime,repetionY,repetionMonthly,repetionDay){
     var success=myCalendar.edite(eltId,new EvenAttributes(title,day,month,year,sTime,eTime,repetionY,repetionMonthly,repetionDay,true));
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
  function deleteEvent(title){

    var id = panelCurrentID;
    var success=myCalendar.delete(id);
    if(success){
      alert("deleted");
      console.log(myCalendar);
      notifyYearView(getYearCurrents("year"));
      if(monthCurrentMonth===panelCurrentMonth&& monthCurrentYear===panelCurrentYear){
        notifyMonthView(monthCurrentYear,monthCurrentMonth);

      }
      if(dayCurrentMonth===panelCurrentMonth && dayCurrentDay===panelCurrentDay && dayCurrentYear===panelCurrentYear){
        notifyDay(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
      }
    }else {
      alert("error couldn't delete");
      return false;
    }


  }
  function addDayEvent(id,theEvent){
    notifyDayEvents(id, theEvent);
  };
  function attachEvent(title,startTime,endTime){
   var success=myCalendar.add(new EvenAttributes(title,panelCurrentDay,panelCurrentMonth,panelCurrentYear,startTime,endTime, false, false,false,true));
    console.log(myCalendar);
   if(success){
     notifyYearView(getYearCurrents("year"));
     if(monthCurrentMonth===panelCurrentMonth&& monthCurrentYear===panelCurrentYear){
       notifyMonthView(monthCurrentYear,monthCurrentMonth);

     }
     if(dayCurrentMonth===panelCurrentMonth && dayCurrentDay===panelCurrentDay && dayCurrentYear===panelCurrentYear){
       notifyDay(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
     }
   }else {
     alert("this calendar already Exists");
   }

  }

function addMonthEvent(location,TheEvent){

  notifyMonthEventslistener(location,TheEvent);

}

  function getEventsAvailableIn(y,m,d){

    var elts=[];
    y =parseInt(y);
    m =parseInt(m);
    d =parseInt(d);
    var keyArrays =myCalendar.getKeys();
    for(var i=0; i<keyArrays.length;i++){
      var isYearly=myCalendar.getAKey(keyArrays[i]).attributes.repetitionY; // if the particular event is yearly
      var isDaily =myCalendar.getAKey(keyArrays[i]).attributes.repetitionDay; // if the particular event is yearly
      var month   =myCalendar.getAKey(keyArrays[i]).attributes.month; // month
      var day     =myCalendar.getAKey(keyArrays[i]).attributes.day; //day
      var year    =myCalendar.getAKey(keyArrays[i]).attributes.year; //year
      var title   =myCalendar.getAKey(keyArrays[i]).attributes.title; //title
      var sTime   =myCalendar.getAKey(keyArrays[i]).attributes.startTime; //title
      if((year===y || isYearly) && month=== m && (day===d || isDaily) ){

        elts.push(myCalendar.getAKey(keyArrays[i]));
      }

    }

    return elts;
  }
 function checkToAlert(){
   setInterval(function(){
     var today =new Date();
     var y = today.getFullYear();
     var tM = today.getMonth();
     var d = today.getDate();
     var tHour = today.getHours();
     var tMin = today.getMinutes();
     var keyArrays =myCalendar.getKeys();
     for(var i=0; i<keyArrays.length;i++){
       var isYearly=myCalendar.getAKey(keyArrays[i]).attributes.repetitionY; // if the particular event is yearly
       var isDaily =myCalendar.getAKey(keyArrays[i]).attributes.repetitionDay; // if the particular event is yearly
       var month   =myCalendar.getAKey(keyArrays[i]).attributes.month; // month
       var day     =myCalendar.getAKey(keyArrays[i]).attributes.day; //day
       var year    =myCalendar.getAKey(keyArrays[i]).attributes.year; //year
       var title   =myCalendar.getAKey(keyArrays[i]).attributes.title; //title
       var sTime   =myCalendar.getAKey(keyArrays[i]).attributes.startTime; //title
       var active =myCalendar.getAKey(keyArrays[i]).attributes.active; //active or not
       if(active && (year===y || isYearly) && month=== tM && (day===d || isDaily) ){
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
         var a =(new Date(year,month,day,h,m).getTime());
         var b =(new Date(y,tM,d,tHour,tMin).getTime());
         var r=Math.round(Math.abs((a - b)/(60*1000)));
         //console.log(r);
         if(r<30){
           console.log(title+" event is in 30 min");
           notifyAlert(myCalendar.getAKey(keyArrays[i]));
         }
       }

     }
   },2000);
 }
 checkToAlert();
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
    console.log(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
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


  function initYearView(){
    notifyYearView(getYearCurrents("year"));

  }

  function initDayView(){
    notifyDay(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
  }

  function initMonthView(){
    notifyMonthView(getYearCurrents("year"),thisMonth);
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
  function notifyAlert(TheEvent){
    for(var i=0; i< alertListener.length; i++){
      var f = alertListener[i];
      f(TheEvent);
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
  return {
  initYearView: initYearView,
  initDayView: initDayView,
  addListener:addListener,
  initMonthView:initMonthView,
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
  desactivateAnEvent:desactivateAnEvent
  };
})();
