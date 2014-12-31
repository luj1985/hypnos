var LOCATION_KEY = 'location',
    READY_FLAG = 'ready',
    MESSAGE_KEY = 'locationError';

var mapAccessor = (function(){
  if (Meteor.isCordova) {
    var platform = (device.platform || "").toLowerCase();
    switch(platform) {
      case 'android' : 
        return function(address, location) {
          return "geo:" + location.lat + ',' + location.lng; 
        }
      case 'ios' :
        return function(address, gps) { 
          return "maps:q=" + address; 
        }
    }
  } else {
    return function(address, location) {
      return "http://api.map.baidu.com/geocoder?address=" + encodeURIComponent(address) + "&output=html";
    }
  }
})();

Template.locationAccessor.helpers({
  location : function() { return Session.get(LOCATION_KEY); }, 
  message  : function() { return Session.get(MESSAGE_KEY); },
  ready    : function() { return Session.get(READY_FLAG); }
});

Template.reseller.helpers({
  gps: function () {
    var location = this.location;
    return location ? _.map([location.lat, location.lng], function(f) {
      return parseFloat(f).toFixed(4);
    }).join(', ') : '';
  },
  href: function() {
    return mapAccessor(this.address, this.location);
  }
});
Deps.autorun(function() {
  var coords = Session.get(LOCATION_KEY);
  if (coords) {
    PagedResellers.set('filters',  { location : { $near : coords } });
  }
});