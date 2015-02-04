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
    data: function() {
      return _.chain(Manufacturers.find().fetch())
        .pluck('manufacturer')
        .uniq()
        .sort(function(s1, s2) { return s1.localeCompare(s2, 'zh'); })
        .map(function(v) { return {name: v}; })
        .value();
    },
    path: "/products/search"
  });

  this.route("productManufacturer", {
    path: "/products/search/:manufacturer",
    template: "aliases",
    data: function() {
      var manufacturer = this.params.manufacturer;
      var ms = Manufacturers.find({manufacturer: manufacturer});
      var aliases = _.chain(ms.fetch())
              .pluck('alias')
              .uniq()
              .sort(function(s1, s2) { return s1.localeCompare(s2, 'zh'); })
              .map(function(v) { return {manufacturer: manufacturer, alias: v}; })
              .value();
      return aliases;
    }
  });

  this.route("productAlias", {
    path: "/products/search/:manufacturer/:alias",
    template: "types",
    data: function() {
      var manufacturer = this.params.manufacturer,
          alias = this.params.alias;
      var ms = Manufacturers.findOne({manufacturer: manufacturer, alias: alias}) || {};
      var types = ms.types;
      return types;
    }
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