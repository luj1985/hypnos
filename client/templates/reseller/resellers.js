var LOCATION_KEY = 'location',
    READY_FLAG = 'ready',
    MESSAGE_KEY = 'locationError';

Template.resellers.rendered = function () {
  Animation.attach(this, '.resellers');
};

Template.locationAccessor.helpers({
  location : function() { return Session.get(LOCATION_KEY); }, 
  message  : function() { return Session.get(MESSAGE_KEY); },
  ready    : function() { return Session.get(READY_FLAG); }
});

Deps.autorun(function() {
  var coords = Session.get(LOCATION_KEY);
  if (coords) {
    PagedResellers.set('filters',  { location : { $near : coords } });
  }
});