function success(data) {
  var uid = data.uid, token = data.token;
  Meteor.call('createUserFromWeibo', uid, token);
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