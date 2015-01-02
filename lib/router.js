Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  waitOn: function() {
    return [
      Meteor.subscribe("favorites")
    ];
  }
});

Router.map(function() {
  this.route("home",          { path: "/" });
  this.route("admin",         { path: "/admin" });
  this.route("login",         { path: "/login" });
  this.route("register",      { path: "/register" });
  this.route("profile",       { path: "/profile" });
  this.route("products",      { path: "/products" });
  this.route("resellers",     { path: "/resellers" });
  this.route("productSearch", { path: "/products/search" });
  this.route("resellerSearch",{ path: "/resellers/search" });

  this.route("productDetail", { 
    path: "/products/:_id", 
    data: function() {
      // FIXME: Since the collection data in PagedProducts is not always loaded
      // that make page display blank
      // e.g. 
      // when navigate to the detail page, and browser refreshed.
      // Session data was lost, and the paged collection is also empty,
      // can not find the document in the client side
      var product = Session.get('selected-product');
      if (!product) {
        product = PagedProducts.Collection.findOne(this.params._id);
      }
      return product;
    }
  });
});


