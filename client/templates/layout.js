Template.layout.rendered = function () {
  this.$('header.menu').waypoint(function(direction) {
  }, {
    offset : -20
  });

  this.$('.sidebar').sidebar('attach events', '.item.launch');
};

Template.layout.events({
  'click .sidebar > a.item' : function() {
    Meteor.setTimeout(function() {
      $('.sidebar:first').sidebar('toggle');
    }, 100);
  }
});