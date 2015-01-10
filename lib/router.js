Router.configure({
  layoutTemplate: "main",
  loadingTemplate: "loading"
});

Router.map(function() {
  this.route("home",          { path: "/" });
  this.route("admin",         { path: "/admin" });
  this.route("login",         { path: "/login" });
  this.route("register",      { path: "/register" });
  this.route("profile",       { path: "/profile" });
  this.route("products",      { 
    path: "/products",
    waitOn: function() {
      return Meteor.subscribe("products");
    }
  });
  this.route("resellers",     { 
    path: "/resellers",
    waitOn: function() {
      return Meteor.subscribe("resellers")
    }
  });

  this.route("orders",        { path: "/orders" });

  this.route("favorites", {
    path: "/favorites",
    waitOn: function() {
      return Meteor.subscribe("favorites");
    } 
  });
  this.route("productSearch", { path: "/products/search" });
  this.route("resellerSearch",{ path: "/resellers/search" });

  this.route("productDetail", { 
    path: "/products/:_id",
    waitOn: function () {
      return Meteor.subscribe('product', this.params._id);
    },
    data: function() {
      return Products.findOne(this.params._id);
    }
  });
});


