function signup(username, email, password) {
  var user = {};
  user.username = username;
  user.email = email;
  user.password = password;

  Accounts.createUser(user, function (err) {
    accountService.message(err);
  });
}

function forgotPassword() {

}

function changePassword(oldPassword, newPassword) {
  Accounts.changePassword(oldPassword, newPassword, function(err) {
    accountService.message(err);
  });
}


Template.login.events({
  'click input[type="submit"]': function (e, template) {
    e.preventDefault();
    var name = template.$('input[name="username"]').val(),
        password = template.$('input[name="password"]').val();

    // name can be username or email
    Meteor.loginWithPassword(name, password, function(err) {
      if (err) {
        accountService.message(err);
      } else {
        Router.go('account');
      }
    });
  }
});

Template.account.helpers({
  user: function () {
    return Meteor.user();
  },
  email: function() {
    return Meteor.user().emails[0];
  }
});