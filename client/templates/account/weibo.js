function success(data) {
  console.log('uid: ' + data.uid);
  console.log('token: ' + data.token);
  HTTP.get('https://api.weibo.com/2/eps/user/info.json', {
    params: { uid: data.uid, access_token: data.token }
  }, function(user) {
    console.log(user);
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