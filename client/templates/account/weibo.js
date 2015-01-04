function success(data) {
  var uid = data.uid,
      token = data.token;
  
}

function failure(data) {
  console.log('login faile');
  console.log(data);
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