Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    Session.set('need-redirect', true);
    this.render('login');
  } else {
    Session.set('need-redirect', undefined);
    this.next();
  }
}, { only: ['profile', 'resellers', 'orders', 'favorites']});

Router.map(function() {
  this.route("login",         { path: "/login" });
  this.route("register",      { path: "/register" });
  this.route("profile",       { path: "/profile" });
});