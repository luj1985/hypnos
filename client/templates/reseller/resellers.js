var LOCATION_KEY = 'location',
    READY_FLAG = 'ready',
    MESSAGE_KEY = 'locationError';

Template.locationAccessor.helpers({
  location : function() { return Session.get(LOCATION_KEY); }, 
  message  : function() { return Session.get(MESSAGE_KEY); },
  ready    : function() { return Session.get(READY_FLAG); }
});

Template.showResellers.events({
  'click #useLocation' : function() {
    var message = $('#currentLocation').transition('fade in');

    if (navigator.geolocation) {   
      Session.set(MESSAGE_KEY, null);
      Session.set(READY_FLAG, false);

      navigator.geolocation.getCurrentPosition(function(p) {
        Session.set(LOCATION_KEY, [p.coords.latitude, p.coords.longitude]);
        Session.set(READY_FLAG, true);
      }, function(e) {
        Session.set(MESSAGE_KEY, e.message);
      }, {
        enableHighAcuracy: true,
        timeout: 10000
      });
    } else {
      Session.set(MESSAGE_KEY, '不支持地理位置');
    }
  }
});

Deps.autorun(function() {
  var coords = Session.get(LOCATION_KEY);
  if (coords) {
    PagedResellers.set('filters',  { location : { $near : coords } });
  }
});