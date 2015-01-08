Meteor.startup(function() {
  Modernizr.addTest('ios', function () {
    return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
  });

  accountService = {
    message : function(message) {
      console.log(message);
    }
  };
});