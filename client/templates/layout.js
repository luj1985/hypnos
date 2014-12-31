var SIDEBAR_STATUS_KEY = 'show-sidebar';
Template.layout.rendered = function () {
  // HACK: to make sure that html body can fullfil the screen
  this.$('main').css('min-height', window.innerHeight);
};

Template.layout.helpers({
  open: function () {
    return Session.get(SIDEBAR_STATUS_KEY) ? 'open' : '';
  }
});

function toggleSidebar() {
  var status = Session.get(SIDEBAR_STATUS_KEY);
  Session.set(SIDEBAR_STATUS_KEY, !status);
}

Template.layout.events({
  'click .sidebar a.item' : toggleSidebar,
  'click header .item.launch,.sidebar.open~main,.sidebar.open~header': function(e) {
    e.preventDefault();
    toggleSidebar();
  }
});