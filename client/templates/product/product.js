Template.productDetail.events({
  'click .favorite' : function(e) {
    Meteor.call('toggleFavorite', this._id);
  }
});
