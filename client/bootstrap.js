Meteor.startup(function() {
  document.addEventListener('deviceready', function() {
    $(document).on('click', 'a,button,input[type="button"]', function() {
      plugins.deviceFeedback.acoustic();
    });
  }, false);
});