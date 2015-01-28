Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message});
};

Meteor.startup(function() {
  T9n.setLanguage("zh-cn");

  document.addEventListener('deviceready', function() {
    $(document).on('click', 'a,button,input[type="button"]', function() {
      plugins.deviceFeedback.acoustic();
    });
  }, false);

});