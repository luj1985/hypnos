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