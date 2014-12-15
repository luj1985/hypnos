Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('dealers')
    ];
  }
});

Router.map(function() {
  this.route('home', { path : '/' });
  this.route('showproducts', { path : '/products' });
  this.route('dealers', { path : '/dealers' });
});
