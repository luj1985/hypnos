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

Template.resellers.events({
  'click .location.item': function () {
    if (navigator.geolocation) {   
      Session.set('gps-error', null);
      Session.set('gps-ready', false);

      navigator.geolocation.getCurrentPosition(function(p) {
        Session.set(LOCATION_KEY, [p.coords.latitude, p.coords.longitude]);
        Session.set('gps-ready', true);
      }, function(e) {
        Session.set('gps-error', e.message);
      }, {
        enableHighAcuracy: true,
        timeout: 10000
      });
    } else {
      Session.set('gps-error', '不支持地理位置');
    }
  }
});

Deps.autorun(function() {
  var coords = Session.get(LOCATION_KEY);
  if (coords) {
    PagedResellers.set('filters',  { location : { $near : coords } });
  }
});