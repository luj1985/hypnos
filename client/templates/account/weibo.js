function success(data) {
  console.log('login success');
  console.log(data);
}

function failure(data) {
  console.log('login faile');
  console.log(data);
}

Template.weibo.events({
  'click a.weibo': function () {
    if (Meteor.isCordova) {
      weibo.login(success, failure);  
    } else {
      console.log('use web oauth to login');
    }
  }
});