Template.showResellers.events({
  'click #useLocation' : function() {
    var message = $('#currentLocation')
      .removeClass('error')
      .html('<i class="ui inline mini active loader"></i>正在获取位置...')
      .transition('fade in');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(p) {
        var coords = [p.coords.latitude, p.coords.longitude];
        message.text('当前位置：' + coords.join(','));
        Session.set('current-coords', coords);
      }, function(error) {
        message.addClass('error').text(error.message);
      });
    } else {
      message.addClass('error').text('不支持地理位置');
    }
  }
});

Deps.autorun(function() {
  var coords = Session.get('current-coords');
  if (coords) {
    PagedResellers.set('filters',  { location : { $near : coords } });
  }
});