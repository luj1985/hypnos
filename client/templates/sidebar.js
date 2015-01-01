Template.sidebar.events({
  'click a.item': function(e) {
    // not need to call preventDefault
    Session.set('show-sidebar', false);
  }
});