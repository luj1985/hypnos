var em = new EventEmitter();

function toggleFavorite(product) {
  Meteor.call('toggleFavorite', product._id);
}

Template.productDetail.rendered = function () {
  em.on('toggle-favorite', toggleFavorite);
};

Template.productDetail.destroyed = function () {
  em.off('toggle-favorite', toggleFavorite);
};

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
  }
});
