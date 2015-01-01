
Template.layout.rendered = function () {
  // HACK: to make sure that html body can fullfil the screen
  this.$('main').css('min-height', window.innerHeight);

  var fromEdge = false;
  $(document).on('touchstart', function(e) {
     var xPos = e.originalEvent.touches[0].pageX;
     fromEdge = xPos < 4;
  }).hammer().on('swipe', function(e){
    var gesture = e.gesture;
    // check that the drag event started at the edge and that the direction is to the right
    if(fromEdge && gesture.direction === 'right'){
      Session.set('show-sidebar', true);
    }
    if (gesture.direction === 'left' && Session.get('show-sidebar')) {
      Session.set('show-sidebar', false);
    }
  });
};

Template.layout.helpers({
  open: function () {
    return Session.get('show-sidebar') ? 'open' : '';
  }
});

Template.layout.events({
  'click .sidebar.open~main': function(e) {
    e.preventDefault();
    Session.set('show-sidebar', false);
  }
});

Template.launcher.events({
  'click .item.launch': function(e) {
    e.preventDefault();
    Session.set('show-sidebar', true);
  }
});