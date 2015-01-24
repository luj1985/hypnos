var scrollHandler;

Template.layout.rendered = function () {

  var template = this,
      fromEdge = false;

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

  function infiniteSrollHandler(e) {
    var context = $(this),
        height = context.innerHeight(),
        scrollTop = context.scrollTop();
        scrollHeight = context[0].scrollHeight;
    if ((height + scrollTop) > (scrollHeight - height)) {
      $.event.trigger('nextpage', template);
    }
  }

  scrollHandler = _.debounce(infiniteSrollHandler, 300);
  this.$('main').on('scroll', scrollHandler);
};


Template.layout.destroyed = function () {
  this.$('main').off('scroll', scrollHandler);
};


Template.layout.helpers({
  open: function () {
    return Session.equals('show-sidebar', true) ? 'open' : '';
  },
  // Because Android 4.3 webview doesn't work well on css sibling selector
  // use additional class as workaround
  freeze: function() {
    return Session.equals('show-sidebar', true) ? 'freeze' : '';
  },
  more: function() {
    return Session.equals('show-more', true) ? 'more active' : 'more';
  }
});

Template.layout.events({
  'click .dimmer': function(e) {
    e.preventDefault();
    Session.set('show-sidebar', false);
    Session.set('show-more', false);
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
    history.back();
  }
});