var LOCATION_KEY = 'location',
    READY_FLAG = 'ready',
    MESSAGE_KEY = 'locationError';

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
  }
});
Deps.autorun(function() {
  var coords = Session.get(LOCATION_KEY);
  if (coords) {
    PagedResellers.set('filters',  { location : { $near : coords } });
  }
});