var  accountService = {
  message : function(err) {
    switch(err.errorType) {
    case "Meteor.Error":
      var reason = err.reason;
      var message = T9n.get('error.accounts.' + reason);
      console.log(err);
      console.log(message);
    }
  }
};

function forgotPassword() {

}

function changePassword(oldPassword, newPassword) {
  Accounts.changePassword(oldPassword, newPassword, function(err) {
    if (err) {
      accountService.message(err);
    }
  });
}

Template.register.events({
  'submit form.register': function (e, template) {
    e.preventDefault();
    var username = template.$('input[name="username"]').val(),
        email = template.$('input[name="email"]').val(),
        password = template.$('input[name="password"]').val();
    var user = {};
    user.username = username;
    user.email = email;
    user.password = password;

    Accounts.createUser(user, function (err) {
      if (err) {
        accountService.message(err);
      } else {
        Router.go('profile');
      }
    });
  }
});

Template.login.events({
  'submit form.login': function (e, template) {
    e.preventDefault();
    var name = template.$('input[name="username"]').val(),
        password = template.$('input[name="password"]').val();

    // name can be username or email
    Meteor.loginWithPassword(name, password, function(err) {
      if (err) {
        accountService.message(err);
      }
    });
  }
});