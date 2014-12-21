Template.showResellers.events({
  'click #useLocation' : function() {
    var message = $('#currentLocation')
      .removeClass('error')
      .html('<i class="ui inline mini active loader"></i>正在获取位置...')
      .transition('fade in');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(p) {
        var coords = [p.coords.latitude, p.coords.longitude].join(","); 
        message.text(coords);
      }, function(error) {
        message.addClass('error').text(error.message);
      });
    } else {
      message.addClass('error').text('不支持地理位置');
    }
  }
});