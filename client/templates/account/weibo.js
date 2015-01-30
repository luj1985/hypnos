function success(data) {
  Meteor.call('loginOrCreateAccountViaWeibo', data, function(err, userId) {
    console.log(JSON.stringify(arguments));
    console.log(Meteor.user());
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