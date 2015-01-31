Errors = new Mongo.Collection(null);

throwError = function(message) {
  if (_.isObject(message)) {
    message = JSON.stringify(message);
  }
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