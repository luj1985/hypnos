ProductSubs = new SubsManager({
  cacheLimit: 10,
  expireIn: 5
});

Router.map(function() {
  this.route("favorites",     { path: "/favorites" });
  this.route("products",      { 
    path: "/products",
    waitOn: function() {
      var conditions = this.params.query;
      Session.set('product-filter', conditions);
      return ProductSubs.subscribe('products', conditions);
    },
    data: function() {
      var filters = Hypnos.convertToQuery(this.params.query);
      return Products.find(filters, {sort: {oid: -1}});
    }
  });

  this.route("productSearch", {
    onBeforeAction: function() {
      Session.set('product-search-form', undefined);
      Session.set('manufacturer', undefined);
      Session.set('alias', undefined);
      this.next();
    },
    path: "/products/search"
  });

  this.route("product", { 
    path: "/product/:_id",
    waitOn: function () {
      return ProductSubs.subscribe('product', this.params._id);
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
    waitOn: function() {
      return subs.subscribe('suite', this.params.suiteId);
    },
    data: function() {
      return Suites.find({suiteId: this.params.suiteId});
    }
  });
});