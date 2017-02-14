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
  var x=0;
  var monthCurrentMonth=thisMonth;
  var monthCurrentYear=thisYear;
  var panelCurrentMonth;
  var panelCurrentYear;
  var panelCurrentDay;
  var panelCurrentStartingTime;
  var panelCurrentEndingTime;
  var dayCurrentYear=todayDate.getFullYear();
  var dayCurrentMonth=todayDate.getMonth();
  var dayCurrentDay=todayDate.getDate();
  var panelListener=[];
  var dayDayListener=[];
  var calendarEmptListener=[];
  var monthEventListener=[];
  var currentPaneltarget;
  var panelCurrentID;

  function EvenAttributes(title,day,month,year,sTime,eTime,repetionY,repetionMonthly,repetionDay){
    this.startTime=sTime;
    this.endTime=eTime;
    this.repetitionY=repetionY;
    this.repetitionDay=repetionDay;
    this.repetitionMonthly=repetionMonthly;
    this.title =title;
    this.day=day;
    this.month=month;
    this.year=year;
  }

  var myCalendar = new Set(); //just added some event

   myCalendar.add(new EvenAttributes("Practice Basketball",5,2,2017,"1:00am","4:00am", false,false, true));
   myCalendar.add(new EvenAttributes("Eat at chipolet",5,3,2017,"12:00pm","1:00pm", false, false,false));
   myCalendar.add(new EvenAttributes("Eat with Ms. Easte",5,1,2019,"8:00pm","9:00pm", true,false, false));
   myCalendar.add(new EvenAttributes("Eat with Ms. Kaila",5,1,2019,"12:00pm","2:00pm", true,false, false));
   myCalendar.add(new EvenAttributes("Valentine day",14,1,2017,false,false, true, false,false));
   myCalendar.add(new EvenAttributes("Going to sleep",16,1,2017,"12:00am","6:00am", false, false,false));
   myCalendar.add(new EvenAttributes("Meeting with Alexa",16,1,2017,"8:00am","10:00am", false, false,false));
   myCalendar.add(new EvenAttributes("Wedding Party",16,1,2017,"1:00pm","10:00pm", false, false,false));
   myCalendar.add(new EvenAttributes("Call Dad",16,1,2017,"6:00pm","10:00pm", false, false,false));
   myCalendar.add(new EvenAttributes("Call Mother",16,1,2017,"6:00am","8:00am", false, false,false));
   myCalendar.add(new EvenAttributes("Science Documentary on tv",16,1,2017,"11:00pm","12:00am", false, false,false));
   myCalendar.add(new EvenAttributes("Project due day",14,1,2017,false,false, true, false,false));
   myCalendar.add(new EvenAttributes("Movie with kaila",14,1,2017,"10:00pm","11:30pm", true, false,false));
   myCalendar.add(new EvenAttributes("Mo's Birthday",14,1,2017,false,false, true, false,false));
  // myCalendar.add("vale day 1 14 2017",new EvenAttributes("Vale day",14,1,2017,false,false, true, false,false));
   console.log(myCalendar);
   function getYearCurrentYear(){
     var today = new Date();
     return today.getFullYear();
   }
  function getAnEvent(ev){
    return myCalendar.getAKey(ev);
  }
  function deleteEvent(title){

    var id = panelCurrentID;

    console.log("identif= "+id);
    var success=myCalendar.delete(id);
    if(success){
      alert("deleted");
      console.log(myCalendar);
      notifyYearView(thisYear);
      if(monthCurrentMonth===panelCurrentMonth&& monthCurrentYear===panelCurrentYear){
        notifyMonthView(monthCurrentYear,monthCurrentMonth);

      }
      if(dayCurrentMonth===panelCurrentMonth && dayCurrentDay===panelCurrentDay && dayCurrentYear===panelCurrentYear){
        notifyDay(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
      }
    }else {
      alert("error couldm't delete");

    }


  }
  function addDayEvent(id,theEvent){
    notifyDayEvents(id, theEvent);
  };
  function attachEvent(title){
    //console.log(currentPaneltarget.target.innerHTML);
    // console.log(panelCurrentMonth,panelCurrentDay,panelCurrentYear,panelCurrentStartingTime,panelCurrentEndingTime);//this is the event information
    // console.log(monthCurrentMonth,monthCurrentYear);
    // console.log(dayCurrentMonth,dayCurrentDay,dayCurrentYear);

    // var titleId=title+panelCurrentMonth+panelCurrentDay+panelCurrentYear;
    // console.log(titleId);
   var success=myCalendar.add(new EvenAttributes(title,panelCurrentDay,panelCurrentMonth,panelCurrentYear,false,false, false, false,false));
    console.log(myCalendar);
   if(success){
     notifyYearView(thisYear);
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
      if((year===y || isYearly) && month=== m && (day===d || isDaily) ){//||(isYearly && month ===m && day===d)

        elts.push(myCalendar.getAKey(keyArrays[i]));
      }

    }

    return elts;
  }

  function addPanelCurrentTarget(which,value){
    if(which ==="panelCurrentID"){
      panelCurrentID=value;

    }
    //currentPaneltarget=e;
    //console.log(e.target.id);
  }
  function emptyCalendar(whichOne){
    notifyCalendarEmp(whichOne);

  }
  function showToday(where){
    var today = new Date();
    if(where==="month"){
      notifyMonthView(today.getFullYear(),today.getMonth());
      monthCurrentMonth=today.getMonth();
      monthCurrentYear=today.getFullYear();
    }else if (where==="day") {
      notifyDay(today.getFullYear(),today.getMonth(),today.getDate());
      dayCurrentDay=today.getDate();
      dayCurrentYear=today.getFullYear();
      dayCurrentMonth=today.getMonth();
    }

  }

  function updatePanel(e,where){

    if(where==="year"){
      var m =parseInt(e.currentTarget.offsetParent.className.slice(5,e.currentTarget.offsetParent.className.length));
      notifyPanel(e,"year",thisYear,m,e.currentTarget.attributes.value,false,false);
    }else if (where==="month") {

      notifyPanel(e,"month",monthCurrentYear,monthCurrentMonth,e.currentTarget.attributes.value,false,false);
    }else if (where==="daily") {
      notifyPanel(e,"day",dayCurrentYear,dayCurrentMonth,dayCurrentDay,e.target.id,false);
    }
    if(where === "extra"){
      notifyPanel(e,"extra",monthCurrentYear,monthCurrentMonth,panelCurrentDay,false,false);
    }

  }
  function specialUpdate(whichOne,value){
    if(whichOne ==="time1"){
      panelCurrentStartingTime=value;
      console.log(value);
    }else {
      panelCurrentEndingTime=value;
      console.log(value);
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
    notifyYearView(thisYear);

  }

  function initDayView(){
    notifyDay(dayCurrentYear,dayCurrentMonth,dayCurrentDay);
  }

  function initMonthView(){
    notifyMonthView(thisYear,thisMonth);
  }

  function addListener(type,view){
    if(type==="yearViewListeners"){
      yearViewListeners.push(view);
      monthViewListeners.push(view);

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
        view(year,j,".table"+j,"box");
        //console.log(yearViewListeners.length);

      }

    }
  }

  function notifyMonthView(year,month){
    for (var i = 0; i < monthViewListeners.length; i++) {
      var view = monthViewListeners[i];

        view(year,month,".tableMonth","box1");


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
    panelCurrentStartingTime=sTime;
    panelCurrentEndingTime=eTime;
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

//  setInterval(function(){
//
// console.log(panelCurrentYear,panelCurrentMonth,panelCurrentDay,panelCurrentID);
// console.log(myCalendar);
//
//  },1000);

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
  specialUpdate:specialUpdate,
  getEventsAvailableIn:getEventsAvailableIn,
  addMonthEvent:addMonthEvent,
  getAnEvent:getAnEvent,
  deleteEvent:deleteEvent,
  getYearCurrentYear:getYearCurrentYear,
  addDayEvent:addDayEvent
  };
})();
