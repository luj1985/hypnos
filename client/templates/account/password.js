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

    var errors = {};
    if (!username) { errors.username = ['请输入用户名']; }
    if (!email) { errors.email = ['请输入邮件地址']; }
    if (!password) { errors.password = ['请输入密码']; }
    Session.set('errors', errors);

    if (_.keys(errors).length) {
      return;
    }

    Accounts.createUser(user, function (err) {
      if (err) {
        accountService.message(err);
      } else {
        Router.go('profile');
      }
    });
  }
});

Template.login.helpers({
  errors: function() {
    return Session.get('errors');
  },
  fieldClass: function(name) {
    var errors = Session.get('errors') || {};
    return errors[name] ? 'invalid' : '';
  }
});

Template.login.events({
  'submit form.login': function (e, template) {
    e.preventDefault();
    var username = template.$('input[name="username"]').val(),
        password = template.$('input[name="password"]').val();

    var errors = {};
    if (!username) { errors.username = ['请输入用户名']; }
    if (!password) { errors.password = ['请输入密码']; }
    Session.set('errors', errors);

    if (_.keys(errors).length) {
      return;
    }

    // name can be username or email
    Meteor.loginWithPassword(username, password, function(err) {
      if (err) {
        accountService.message(err);
      }
    });
  }
});