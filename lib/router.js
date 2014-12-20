Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('home', { path : '/' });
  this.route('showProducts', { path : '/products' });
  this.route('dealers', { path : '/dealers' });
});
