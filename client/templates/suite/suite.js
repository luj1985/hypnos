Template.suite.events({
  'click a': function (e) {
    e.preventDefault();
    Router.go('products', {}, {query: {sid: this.componentId}});
  }
});