Template.productDetail.events({
  'click .favorite' : function(e) {
    Meteor.call('toggleFavorite', this._id);
  }
});

Template.productDetail.helpers({
  favorite: function () {
    var found = Favorites.findOne({pid : this._id});
    return found ? 'favorite' : '';
  }
});
