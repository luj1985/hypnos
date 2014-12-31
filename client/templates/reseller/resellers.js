var LOCATION_KEY = 'location',
    READY_FLAG = 'ready',
    MESSAGE_KEY = 'locationError',
    Funcs = {};

// for Web/PC
Funcs.locationAccessor = function(address, location) {
  return "http://api.map.baidu.com/geocoder?address=" + encodeURIComponent(address) + "&output=html";
}

document.addEventListener('deviceready', function() {
  var platform = device.platform.toLowerCase();
  switch(platform) {
  case 'android' : 
    Funcs.locationAccessor = function(address, location) { 
      var l = location || {lat:0, lng:0};
      return "geo:" + l.lat + ',' + l.lng + "?q=" + encodeURIComponent(address);
    };
    break;
  case 'ios':
    Funcs.locationAccessor = function(address, gps) { 
      return "maps:q=" + encodeURIComponent(address); 
    }
    break;
  }
}, false);

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
    return Funcs.locationAccessor(this.address, this.location);
  }
});
Deps.autorun(function() {
  var coords = Session.get(LOCATION_KEY);
  if (coords) {
    PagedResellers.set('filters',  { location : { $near : coords } });
  }
});