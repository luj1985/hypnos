Template.layout.rendered = function () {
  var header = this.find('header.menu');
  $(header).waypoint({
    handler: function(direction) {
      console.log(direction);
    }
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