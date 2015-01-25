Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  notFoundTemplate: "notFound",
  progressDelay : 350,
  progressSpinner : false,
  progressTick : false,
  yieldRegions: {
    'launcher': {to : "navigator"}
  },
  waitOn: function() {
    return Meteor.subscribe("favorites");
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
  this.route("resellers",     { path: "/resellers" });
  this.route("orders",        { path: "/orders" });

  this.route("favorites", {
    path: "/favorites"
  });
  this.route("resellerSearch",{ path: "/resellers/search" });

  this.route("products",      { 
    path: "/products",
    waitOn: function() {
      var conditions = this.params.query;
      Session.set('products-filter', conditions);
      Session.set('product-page', 1);
      return Meteor.subscribe('products', conditions, 1);
    }
  });

  this.route("productSearch", {
    path: "/products/search",
    waitOn: function() {
      return Meteor.subscribe('manufactures');
    }
  });

  this.route("product", { 
    path: "/product/:_id",
    waitOn: function () {
      return Meteor.subscribe('product', this.params._id);
    },
    data: function() {
      return Products.findOne(this.params._id);
    }
  });

  this.route('suites', {
    path: "/suites",
    waitOn: function() {
      var conditions = this.params.query;
      Session.set('suites-filter', conditions);
      Session.set('suite-page', 1);
      return Meteor.subscribe('suites', conditions, 1);
    }
  });

  this.route('suite', {
    path: "/suite/:sid",
    waitOn: function() {
      return Meteor.subscribe('suite', this.params.sid);
    }
  });

  this.route('download/:filename', function() {
    this.response.end('download file content\n');
  }, { where: 'server' });
});


