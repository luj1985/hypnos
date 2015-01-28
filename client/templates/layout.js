var scrollHandler,
    SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';

Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}

Meteor.startup(function() {
  setTimeout(function () {
    dataReadyHold && dataReadyHold.release();
    Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
  }, 5000);
});

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
  connected: function() {
    if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
      return Meteor.status().connected;
    } else {
      return true;
    }
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

Template.messages.helpers({
  hasMessage: function() {
    return Errors.find().fetch().length > 0;
  },
  messages: function () {
    return Errors.find();
  }
});

Template.message.rendered = function () {
  var error = this.data;
  Meteor.setTimeout(function() {
    Errors.remove(error._id);
  }, 3000);
};