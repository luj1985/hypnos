Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'john',
      password: 'password',
      email: 'john@example.com',
      profile: {
        name: 'Joe Schmoe'
      }
    });
  }
});

Meteor.methods({
  updateProfile : function(profile) {
    return Meteor.users.update(Meteor.userId, {
      $set : { profile : profile }
    });
  },
  loginOrCreateAccountViaWeibo: function(data) {
    var uid = data.uid, token = data.token;
    try {
      var result = HTTP.get('https://api.weibo.com/2/users/show.json', {
        params: { uid: uid, access_token: token } 
      });

      var identity = result.data;
      var user = Accounts.updateOrCreateUserFromExternalService('weibosso', {
        id: uid + "",
        accessToken: token,
        screenName: identity.screen_name
      }, { profile: { name: identity.screen_name }});

      this.setUserId(user.userId);
      return user;
    } catch(e) {
      return false;
    }
  }
});