Template.field.helpers({
  hasError: function (name) {
    var errors = Session.get('errors') || {};
    return errors[name];
  },
  errors: function(name) {
    var errors = Session.get('errors') || {};
    return errors[name];
  },
  style: function(name) {
    var errors = Session.get('errors') || {};
    return errors[name] ? 'invalid' : '';
  }
});

function forgotPassword() {

}

function changePassword(oldPassword, newPassword) {
  Accounts.changePassword(oldPassword, newPassword, function(err) {
    if (err) {
      throwError(T9n.get('error.accounts.' + err.reason));
    }
  });
}

Template.register.destroyed = function () {
  Session.set('errors', undefined);
};

Template.login.destroyed = function () {
  Session.set('errors', undefined);
};

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
        throwError(T9n.get('error.accounts.' + err.reason));
      } else {
        Router.go('profile');
      }
    });
  }
});


Template.login.events({
  'submit form.login': function (e, template) {
    e.preventDefault();
    var username = template.$('input[name="usernameOrEmail"]').val(),
        password = template.$('input[name="password"]').val();

    var errors = {};
    if (!username) { errors.usernameOrEmail = ['请输入用户名']; }
    if (!password) { errors.password = ['请输入密码']; }
    Session.set('errors', errors);

    if (_.keys(errors).length) {
      return;
    }

    // name can be username or email
    Meteor.loginWithPassword(username, password, function(err) {
      if (err) {
        throwError(T9n.get('error.accounts.' + err.reason));
      } else {
        Tracker.afterFlush(function() {
          if (Session.get('need-redirect')) {
            Router.go('/profile');
          }
        });
      }
    });
  }
});

Template.weibo.events({
  'click a.weibo': function () {
    Meteor.loginWithWeiboSso();
  }
});