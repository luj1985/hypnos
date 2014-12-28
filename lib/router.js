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
  this.route("home",      { path: "/" });
  this.route("admin",     { path: "/admin" });
  this.route("login",     { path: "/login" });
  this.route("products",  { path: "/products" });
  this.route("resellers", { path: "/resellers" });

  this.route("productDetail", { 
    path: "/products/:_id", 
    data: function() {
      // FIXME: Since the collection data in PagedProducts is not always loaded
      // that make page display blank
      // e.g. 
      // when navigate to the detail page, and browser refreshed.
      // the paged collection is empty, and can not find the document in this page
      return PagedProducts.Collection.findOne(this.params._id);
    },
    action: function () {
      this.render();
    }
  });
});


