function Event(id,att){
  this.id=id;
  this.attributes=att;
}

function Set() {
  this.items = {}; // note that this is an object instead of an array
  this.lastId=0;
  this.deleted= {};
}Set.prototype.disactivate = function(id) {
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
       this.items[nextID] = new Event(nextID,thisEvent);
       return true;
     }

      return false;


  };
  Set.prototype.edite= function(eltId,theEvent){
    if (this.has(eltId)) {
      this.items[eltId] = new Event(eltId,theEvent);
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
