Template.showResellers.events({
  'click #useLocation' : function() {
    var message = $('#currentLocation')
      .removeClass('error')
      .transition('fade in');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(p) {
        var coords = [p.coords.latitude, p.coords.longitude].join(","); 
        message.text(coords);
      }, function(error) {
        message.addClass('error').text(error.message);
      });
    } else {
      message.addClass('error').text('无法获得地理位置');
    }
  }
});