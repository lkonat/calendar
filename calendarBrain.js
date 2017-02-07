function Set() {
  this.items = {}; // note that this is an object instead of an array
}
  Set.prototype.add = function(elt,value) {
    // add new item to the set
    if (!this.has(elt)) {
      this.items[elt] = value;
      return true;
    }
    // if(this.has(elt) && (this.items[elt].date ==== value.date && this.items[elt].sTime ==== value.sTime && this.items[elt].eTime ==== value.eTime ) ){
    //   alert("already exists");
    //   return false;
    // }else {
    //   this.items[elt] = value;
    //   return true;
    // }
     return false;
  };

  Set.prototype.delete = function(elt) {
    // remove item from the set
    if (this.has(elt)) {
      delete this.items[elt];
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
