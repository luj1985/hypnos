var em = new EventEmitter();

function toggleFavorite(product) {
  Meteor.call('toggleFavorite', product._id);
}

Template.product.rendered = function () {
  em.on('toggle-favorite', toggleFavorite);
};

Template.product.destroyed = function () {
  em.off('toggle-favorite', toggleFavorite);
};

Template.product.events({
  'click a.find.more': function (e) {
    e.preventDefault();
    var param = _.pick(this, 'type', 'cc', 'engine');
    Router.go('products', {}, {query: param});
  }
});

Template.productTools.helpers({
  active: function () {
    var found = Favorites.findOne({pid : this._id});
    return found ? 'active' : '';
  }
});

Template.productTools.events({
  'click .favorite.item': function (e) {
    e.preventDefault();
    em.emit('toggle-favorite', this);
  },
  'click .more.item': function(e) {
    e.preventDefault();
    Session.set('show-more', true);
  }
});
