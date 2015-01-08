
Template.layout.rendered = function () {

  var fromEdge = false;
  $(document).on('touchstart', function(e) {
     var xPos = e.originalEvent.touches[0].pageX;
     fromEdge = xPos < 4;
  }).hammer().on('drag', function(e){
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
    return Session.equals('show-sidebar', true) ? 'open' : '';
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

Template.back.events({
  'click .item.back': function () {
    console.log('back');
  }
});