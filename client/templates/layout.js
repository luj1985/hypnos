var SIDEBAR_STATUS_KEY = 'show-sidebar';

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
  'click .item.launch' : function(e) {
    console.log('launch');
    toggleSidebar();
    e.preventDefault();
  },
  'click .sidebar.open + main' : function(e) {
    toggleSidebar();
    e.preventDefault();
  }
});