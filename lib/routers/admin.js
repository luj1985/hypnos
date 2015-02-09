var subs = new SubsManager({
  cacheLimit: 10,
  expireIn: 5
});

AdminController = RouteController.extend({
  layoutTemplate: 'adminLayout',
  waitOn: function() {
    return [
      subs.subscribe('brands'), 
      subs.subscribe("manufactures")
    ];
  }
});

Router.route('admin', {
  path: '/admin',
  template: 'adminHome',
  controller: 'AdminController'
});

Router.route('adminProducts', {
  path: '/admin/products',
  template: 'adminProducts',
  controller: 'AdminController',
  waitOn: function() {
    return ProductSubs.subscribe('products', {});
  },
  data: function() {
    return Products.find({});
  }
});

Router.route('adminProduct', {
  path: '/admin/products/:_id',
  template: 'adminProduct',
  controller: 'AdminController',
  data: function() {
    return Products.findOne(this.params._id);
  }
});

Router.route('adminResellers', {
  path: '/admin/resellers',
  template: 'adminResellers',
  controller: 'AdminController'
});

Router.route('adminManufactures', {
  path: '/admin/manufactures',
  template: 'adminManufactures',
  controller: 'AdminController',
  data: function() {
    return Manufacturers.find({});
  }
})