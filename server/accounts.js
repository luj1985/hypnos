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
      $set : { profile : profile}
    });
  }
});

Meteor.methods({
  createUserFromWeibo: function(uid, token) {
    HTTP.get('https://api.weibo.com/2/eps/user/info.json', {
      params: { uid: uid, access_token: token }
    }, function(user) {
      console.log(user);
    });
  }
})