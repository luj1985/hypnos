Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
    return [
      Meteor.subscribe('products'),
      Meteor.subscribe('dealers')
    ];
  }
});

Router.map(function() {
  this.route('home', { path : '/' });
  this.route('products', { path : '/products' });
  this.route('dealers', { path : '/dealers' });
});
