Meteor.startup(function() {
  // TODO: add client side bootstrap code here
});


Template.layout.events({
  'click .launch' : function(e) {
    $('.left.sidebar').first().sidebar('toggle');
  }
})
