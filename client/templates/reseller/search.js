Template.resellerSearch.events({
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