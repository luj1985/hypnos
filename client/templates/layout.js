var SIDEBAR_STATUS_KEY = 'show-sidebar';
Template.layout.rendered = function () {
  // HACK: to make sure that html body can fullfil the screen
  this.$('main').css('min-height', window.innerHeight);

  var fromEdge = false;
  $(document).on('touchstart', function(e) {
     var xPos = e.originalEvent.touches[0].pageX;
     fromEdge = xPos < 3;
  });

  $(document).hammer().on('drag', function(e){
    // check that the drag event started at the edge and that the direction is to the right
    if(fromEdge && e.gesture.direction === 'right'){
      Session.set(SIDEBAR_STATUS_KEY, true);
    }
  });
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
  'click header .item.launch,.sidebar.open~main': function(e) {
    e.preventDefault();
    toggleSidebar();
  }
});