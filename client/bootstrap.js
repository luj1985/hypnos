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

  // Creating custom :external selector
  $.expr[':'].external = function(obj){
    var href = obj.href;
    return href 
      && !href.match(/^(mailto|tel|geo|maps)\:/)
      && (obj.hostname != location.hostname);
  };

  $(document).on('click', 'a:external', function(e) {
    if (Meteor.isCordova) {
      e.preventDefault();
      window.open($(this).attr('href'), '_system');
    }
  });
});