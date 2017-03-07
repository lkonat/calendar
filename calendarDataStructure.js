function Event(id,creationDate,modificationDate,att){
  this.id=id;
  this.creationDate=creationDate;
  this.modificationDate=modificationDate;
  this.attributes=att;
}

function Set() {

  this.items ={};

  if(localStorage.getItem("CalendarData")!==null){
    this.items =this.loadData().items;

  }

  this.lastId=0;

  if(localStorage.getItem("lastId")!==null){
    this.lastId=this.loadData().lastId;
  }
  this.deleted= {};
  if(localStorage.getItem("CalendarDataDeleted")!==null){

    this.deleted=this.loadData().deleted;
  }
  this.expired={};
  if(localStorage.getItem("expired")!==null){
    this.expired=this.loadData().expired;
  }
  console.log(this.items);
  console.log(this.deleted);
  console.log(this.lastId);
  console.log(this.expired);
}
Set.prototype.disactivate = function(id) {
  this.items[id].attributes.active=false;
  if(!this.items[id].attributes.active){
    return true;
  }else {
    return false;
  }
};
  Set.prototype.add = function(thisEvent) {

    var nextID;
    if(Object.keys(this.deleted).length>0){
      var firstE=Object.keys(this.deleted)[0];
      nextID=firstE;
      delete this.deleted[firstE];
      console.log(this.deleted);
    }else {
      nextID=this.lastId++;
    }

     if (!this.has(nextID)) {
       var today=new Date();
       var creationDate={year:today.getFullYear(),month:today.getMonth,day:today.getDate(),hour:today.getHours(), minute:today.getMinutes(),second:today.getSeconds()};
       var modificationDate={year:today.getFullYear(),month:today.getMonth,day:today.getDate(),hour:today.getHours(), minute:today.getMinutes(),second:today.getSeconds()};
       this.items[nextID] = new Event(nextID,creationDate,modificationDate,thisEvent);
       this.save();
       return true;
     }

      return false;


  };
  Set.prototype.edit= function(eltId,creationDate,modificationDate,theEvent){

    if (this.has(eltId)) {
      var creationDateIsConstantSo=this.items[eltId].creationDate;
      this.items[eltId] = new Event(eltId,creationDateIsConstantSo,modificationDate,theEvent);
      this.save();
      return true;
    }else {
      alert("this event does not exist");
      return false;
    }

  };

  Set.prototype.delete = function(elt) {
    // remove item from the set
    if (this.has(elt)) {
      delete this.items[elt];
      this.deleted[elt]=true;
      if(this.expired.hasOwnProperty(elt)){
        delete this.expired[elt];
      }
      this.save();
      console.log(this.expired);
      return true;
    }
    return false;
  };

  Set.prototype.has = function(elt) {
    // return true if the value exists in the set, false otherwise
    return this.items.hasOwnProperty(elt);
  };

  Set.prototype.clear = function() {
    // remove all the items from the set
    this.items = {};
    this.save();
  };

  Set.prototype.size = function() {
    return Object.keys(this.items).length;
  };

  Set.prototype.values = function() {

    var values = [];
    for (var key in this.items) {
      values.push(this.items[key]);
    }
    return values;
  };
  Set.prototype.getAKey = function(key) {
    return this.items[key];
  };
  Set.prototype.getKeys = function() {

    var values = [];
    for (var key in this.items) {
      values.push(key);
    }
    return values;
  };
  Set.prototype.save=function(){
    localStorage.setItem("CalendarData",  JSON.stringify(this.items));
    localStorage.setItem("CalendarDataDeleted",  JSON.stringify(this.deleted));
    localStorage.setItem("lastId",   this.lastId );
    localStorage.setItem("expired",   JSON.stringify(this.expired) );
  };
  Set.prototype.loadData=function(){

   var stringObjItems =localStorage.getItem("CalendarData");
   var items =JSON.parse(stringObjItems);
   var stringObjDeleted=localStorage.getItem("CalendarDataDeleted");
   var deleted=JSON.parse(stringObjDeleted);
   var stringObjExpired =localStorage.getItem("expired");
   var expired =JSON.parse(stringObjExpired);
   var lastId=localStorage.getItem("lastId");
   return {items:items,deleted:deleted,lastId:lastId,expired:expired};
  };
  Set.prototype.addExpiredAlerts = function(key,value) {
    // add new item to the set

    if (!this.expired.hasOwnProperty(key)) {
      this.expired[key] = [value];
      console.log(this.expired);
      return true;

    }else {
      this.expired[key].push(value);
      return true;
    }
     return false;
  };
  Set.prototype.expiredHas = function(key,value) {
    // add new item to the set

    if (this.expired.hasOwnProperty(key)) {
      if(this.expired[key].indexOf(value)!==-1){
        return true;
      }
    }
     return false;
  };
  //another data structure
  function SetRep() {
    this.items = {}; // note that this is an object instead of an array
  }
    SetRep.prototype.add = function(key,data) {
      // add new item to the set

      if (!this.has(key)) {
        this.items[key] = data;
        console.log("added");
        console.log(key);
        return true;

      }
      return false;
    };

    SetRep.prototype.delete = function(value) {
      // remove item from the set
      if (this.has(value)) {
        delete this.items[value];
        return true;
      }
      return false;
    };

    SetRep.prototype.has = function(value) {
      // return true if the value exists in the set, false otherwise
      return this.items.hasOwnProperty(value);
    };

    SetRep.prototype.clear = function() {
      // remove all the items from the set
      this.items = {};
  console.log("cleared");
  console.log(this.keys());
    };

    SetRep.prototype.size = function() {

      return Object.keys(this.items).length;
    };

    SetRep.prototype.values = function() {
      // returns an array of all items in the set
      var values = [];
      for (var key in this.items) {
        values.push(this.items[key]);
      }
      return values;
    };
    SetRep.prototype.keys = function() {
      // returns an array of all items in the set
      var values = [];
      for (var key in this.items) {
        values.push(key);
      }
      return values;
    };
    SetRep.prototype.getObjects = function() {

      return this.items;
    };
    SetRep.prototype.updateData = function(d) {
      for(var i=0; i<Object.keys(d).length; i++){ //adding an object into other object, this way worked only
        // console.log(Object.keys(d)[i]);
        // console.log(d[Object.keys(d)[i]]);
        this.add(Object.keys(d)[i],d[Object.keys(d)[i]]);
      }
    };
