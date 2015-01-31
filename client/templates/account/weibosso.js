function loginCallback() {
  console.log('after sso user login');
  console.log(JSON.stringify(arguments))
}

function success(data) {
  var uid = data.uid, token = data.token;
  Accounts.callLoginMethod({
    methodName: 'weibosso',
    methodArguments: [uid, token],
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