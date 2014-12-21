Template.layout.rendered = function () {
  var header = this.find('header.menu');
  $(header).waypoint(function(direction) {
    // if (direction == 'down') {
    //   $(this).addClass('fixed');
    // } else {
    //   $(this).removeClass('fixed');
    // }
  }, {
    offset : -20
  });
};

Template.layout.events({
  'click .launch': function () {
    $('.menu.sidebar').sidebar('show');
  },
  'click .sidebar > a.item' : function() {
    $('.menu.sidebar').sidebar('hide');
  }
});