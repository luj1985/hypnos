function success(auth) {
  var uid = auth.uid, token = auth.token;
  HTTP.get('https://api.weibo.com/2/users/show.json', {
    params: { uid: uid, access_token: token }
  }, function(error, resp) {
    if (error) {
      throwError(error);
    } else {
      var data = resp.data;
      console.log(data);
    }
  });
  HTTP.get('https://api.weibo.com/2/account/profile/email.json', {
    params: { uid: uid, access_token: token }
  }, function(error, resp) {
    console.log(arguments);
  })
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