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
  createUserFromWeibo: function(data) {
    console.log('received access token');
    console.log(data);
    var uid = data.uid, token = data.token;
    HTTP.get('https://api.weibo.com/2/users/show.json', {
      params: { uid: uid, access_token: token }
    }, function() {
      console.log(arguments);
    });
  }
});