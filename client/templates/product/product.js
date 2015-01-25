Template.productTools.helpers({
  active: function () {
    var found = Favorites.findOne({pid : this._id});
    return found ? 'active' : '';
  }
});

Template.moreProducts.helpers({
  more: function () {
    return Session.equals('show-more', true) ? 'more active' : 'more';
  }
});

Template.moreProducts.events({
  'click a.more': function (e) {
    e.preventDefault();
    Session.set('show-more', false);
    var param = _.pick(this, ['type', 'cc', 'engine']);
    Router.go('products', {}, {query: param});
  },
  'click a.suite': function(e) {
    e.preventDefault();
    Session.set('show-more', false);
    var param = {componentId: this.sid};
    Router.go('suites', {}, {query: param});
  }
});

Template.productTools.events({
  'click .favorite.item': function (e) {
    e.preventDefault();
    Meteor.call('toggleFavorite', this._id);
  },
  'click .more.item': function(e) {
    e.preventDefault();
    Session.set('show-more', true);
  }
});
