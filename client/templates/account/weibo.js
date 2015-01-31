function success(data) {
  Meteor.call('loginOrCreateAccountViaWeibo', data, function(userId) {
    // TODO: should have error handling
    console.log('client side login: ' + userId);
    // Meteor.connection.setUserId(userId);
  });
}

function failure(message) {
  console.log('client side login failed: ' + message);
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