Template.sidebar.events({
  'click a.item': function(e) {
    Session.set('show-sidebar', false);
  }
});
