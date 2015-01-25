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

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}

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
  this.route("resellers",     { 
    path: "/resellers",
    data: function() {
      return Resellers.find({});
    }
  });
  this.route("orders",        { path: "/orders" });

  this.route("favorites", {
    path: "/favorites"
  });
  this.route("resellerSearch",{ path: "/resellers/search" });

  this.route("products",      { 
    path: "/products",
    data: function() {
      var filters = Session.get('products-filter');
      return Products.find(filters, {sort: {oid: -1}});
    },
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
    path: "/suite/:suiteId",
    data: function() {
      return Suites.find({suiteId: this.params.suiteId});
    },
    waitOn: function() {
      return Meteor.subscribe('suite', this.params.suiteId);
    }
  });

  this.route('brands', {
    path: "/brands",
    data: function() {
      return Brands.find();
    },
    waitOn: function() {
      return Meteor.subscribe('brands');
    }
  });

  this.route('brand', {
    path: "/brand/:_id",
    data: function() {
      return Brands.findOne(this.params._id);
    },
    waitOn: function() {
      return Meteor.subscribe('brand', this.params._id);
    }
  })

  this.route('download/:filename', function() {
    this.response.end('download file content\n');
  }, { where: 'server' });
});


