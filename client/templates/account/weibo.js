function success(data) {
  Meteor.call('createUserFromWeibo', data, function(err, result) {
    console.log(arguments);
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