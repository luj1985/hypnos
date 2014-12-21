Template.showResellers.events({
  'click #useLocation' : function() {
    var message = $('#currentLocation').transition('fade in');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(p) {
        var coords = [p.coords.latitude, p.coords.longitude].join(","); 
        message.html(coords);
      }, function(error) {
        message.html(
          'code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
      });
    } else {
      message.html('无法获得地理位置');
    }
  }
});