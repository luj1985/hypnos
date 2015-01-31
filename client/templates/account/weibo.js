function success(data) {
  Meteor.call('loginOrCreateAccountViaWeibo', data, function(error, userId) {
    console.log('client side login');
    console.log(JSON.stringify(arguments));
    if (error) {
      throwError(error);
    } else {
      Meteor.connection.setUserId(userId);
    }
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