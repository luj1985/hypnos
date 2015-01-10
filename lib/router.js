Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  notFoundTemplate: "notFound",
  progressDelay : 350,
  progressSpinner : false,
  progressTick : false,
  yieldRegions: {
    'launcher': {to : "navigator"}
  }
});

Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    this.render('login');
  } else {
    this.next();
  }
}, { only: ['profile', 'resellers', 'orders', 'favorites']});

Router.map(function() {
  this.route("home",          { path: "/" });
  this.route("admin",         { path: "/admin" });
  this.route("login",         { path: "/login" });
  this.route("register",      { path: "/register" });
  this.route("profile",       { path: "/profile" });
  this.route("products",      { path: "/products" });
  this.route("resellers",     { path: "/resellers" });
  this.route("orders",        { path: "/orders" });

  this.route("favorites", {
    path: "/favorites",
    waitOn: function() {
      return Meteor.subscribe("favorites");
    }
  });
  this.route("productSearch", { path: "/products/search" });
  this.route("resellerSearch",{ path: "/resellers/search" });

  this.route("product", { 
    path: "/products/:_id",
    waitOn: function () {
      return Meteor.subscribe('product', this.params._id);
    },
    data: function() {
      return Products.findOne(this.params._id);
    }
  });

  this.route('download/:filename', function() {
    this.response.end('download file content\n');
  }, { where: 'server' });
});


