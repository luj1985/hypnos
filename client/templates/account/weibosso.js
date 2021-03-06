function loginCallback() {
  console.log('after sso user login');
  console.log(JSON.stringify(arguments))
}

function success(auth) {
  var request = {
    method : 'weibosso',
    uid: auth.uid,
    token: auth.token
  };
  
  Accounts.callLoginMethod({
    methodArguments: [request],
    userCallback: loginCallback
  });
}

function failure(message) {
  console.log('client side login failed: ' + message);
  throwError(message);
}

Meteor.loginWithWeiboSso = function() {
  if (Meteor.isCordova) {
    WeiboSso.authorize(success, failure);  
  } else {
    console.log('use web oauth to login');
  }
}