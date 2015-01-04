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
  'submit form.login': function (e, template) {
    e.preventDefault();
    var name = template.$('input[name="username"]').val(),
        password = template.$('input[name="password"]').val();

    // name can be username or email
    Meteor.loginWithPassword(name, password, function(err) {
      if (err) {
        accountService.message(err);
      } else {
        Router.go('profile');
      }
    });
  }
});