Accounts.registerLoginHandler('weibosso', function(auth) {
  var uid = auth.uid, token = auth.token;
  if(!uid || !token) return undefined;
  if (auth.method !== 'weibosso') return undefined;

  var result = HTTP.get('https://api.weibo.com/2/users/show.json', {
    params: { uid: uid, access_token: token } 
  });

  var identity = result.data;
  var account = Accounts.updateOrCreateUserFromExternalService('weibosso', {
    // make sure uid is a string
    id: uid + "",
    accessToken: token
  }, { profile: { name: identity.screen_name }});

  var userId = account.userId;
  var stampedToken = Accounts._generateStampedLoginToken();
  var hashStampedToken = Accounts._hashStampedToken(stampedToken);
  
  Meteor.users.update(userId, 
    {$push: {'services.resume.loginTokens': hashStampedToken}}
  );
  return { userId: userId, token: stampedToken.token };
});