var subs = new SubsManager({
  cacheLimit: 10,
  expireIn: 5
});

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


Router.map(function() {
  this.route("home",          { path: "/" });
  this.route("admin",         { path: "/admin" });
  this.route("orders",        { path: "/orders" });

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
  });
});


