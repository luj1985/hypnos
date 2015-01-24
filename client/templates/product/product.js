var em = new EventEmitter();

function toggleFavorite(product) {
  Meteor.call('toggleFavorite', product._id);
}

function searchProductByType(product, conds) {
  var param = _.pick(product, conds);
  Router.go('products', {}, {query: param});
}

Template.product.rendered = function () {
  em.on('toggle-favorite', toggleFavorite);
  em.on('product-type', searchProductByType);
};

Template.product.destroyed = function () {
  em.off('toggle-favorite', toggleFavorite);
  em.off('product-type', searchProductByType);
};

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
    em.emit('product-type', this, ['type', 'cc', 'engine']);
  },
  'click a.suite': function(e) {
    e.preventDefault();
    Session.set('show-more', false);
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
