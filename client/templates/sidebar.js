Template.sidebar.events({
  'click a.item': function(e) {
    Session.set('show-sidebar', false);
  }
});

Template.userLink.events({
  'click .item.exit': function () {
    Meteor.logout();
  }
});