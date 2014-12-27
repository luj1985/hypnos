Template.layout.rendered = function () {
  var header = this.find('header.menu');
  $(header).waypoint(function(direction) {
  }, {
    offset : -20
  });

  $('.sidebar').sidebar('attach events', '.item.launch');
};

Template.layout.events({
  'click .sidebar > a.item' : function() {
    $('.sidebar').sidebar('toggle');
  }
});