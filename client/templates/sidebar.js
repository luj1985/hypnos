Template.sidebar.events({
  'click a.item': function(e) {
    // not need to call preventDefault
    Session.set('show-sidebar', false);
  }
});


Template.userLink.events({
  'click .item.exit': function () {
    Meteor.logout();
  }
});