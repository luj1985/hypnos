
Router.map(function() {
  this.route("login",   { path: "/login" });
  this.route("register",{ path: "/register" });
  this.route("profile", { 
    data: function() {
      return Meteor.user();
    },
    path: "/profile" 
  });
});