function success(data) {
  Meteor.call('loginOrCreateAccountViaWeibo', data, function(userId) {
    // TODO: should have error handling
    Meteor.connection.setUserId(userId);
  });
}

function failure(message) {
  throwError(message);
}

Template.weibo.events({
  'click a.weibo': function () {
    if (Meteor.isCordova) {
      WeiboSso.authorize(success, failure);  
    } else {
      console.log('use web oauth to login');
    }
  }
});