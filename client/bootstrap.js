Meteor.startup(function() {
  accountService = {
    message : function(message) {
      console.log(message);
    }
  };
});