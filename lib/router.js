Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('favorites')
    ];
  }
});

Router.map(function() {
  this.route('home', { path : '/' });
  this.route('login', { path : '/login' });
  this.route('showProducts', { path : '/products' });
  this.route('productDetail', { 
    path: '/products/:_id', 
    data: function() {
      return PagedProducts.Collection.findOne(this.params._id);
    },
    action: function () {
      this.render();
    }
  });
  this.route('showResellers', { path : '/resellers' });
});
