var subs = new SubsManager();

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
    return [
      subs.subscribe('brands'),
      subs.subscribe("favorites"), 
      subs.subscribe("manufactures")
    ];
  }
});

Router.onBeforeAction(function() {
  Session.set('errors', null);
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
  this.route("orders",        { path: "/orders" });
  
  this.route("favorites",     { path: "/favorites" });
  this.route("products",      { 
    path: "/products",
    waitOn: function() {
      var conditions = this.params.query;
      Session.set('products-filter', conditions);
      Session.set('product-page', 1);
      return Meteor.subscribe('products', conditions, 1);
    },
    data: function() {
      var filters = Session.get('products-filter');
      return Products.find(filters, {sort: {oid: -1}});
    }
  });

  this.route("productSearch", {
    path: "/products/search"
  });

  this.route("product", { 
    path: "/product/:_id",
    waitOn: function () {
      return subs.subscribe('product', this.params._id);
    },
    data: function() {
      return Products.findOne(this.params._id);
    }
  });


  this.route("resellerSearch",{ path: "/resellers/search" });

  this.route("resellers",     { 
    path: "/resellers",
    data: function() {
      return Resellers.find({});
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
    waitOn: function() {
      return subs.subscribe('suite', this.params.suiteId);
    },
    data: function() {
      return Suites.find({suiteId: this.params.suiteId});
    }
  });

  this.route('brands', {
    path: "/brands",
    data: function() {
      return Brands.find();
    }
  });

  this.route('brand', {
    path: "/brand/:_id",
    data: function() {
      return Brands.findOne(this.params._id);
    }
  })

  this.route('download/:filename', function() {
    this.response.end('download file content\n');
  }, { where: 'server' });
});


