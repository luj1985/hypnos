
Template.product.events({
  'click .favorite' : function(e) {
    Meteor.call('toggleFavorite', this._id);
  }
});

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

Template.products.helpers({
  items: function () {
    return Products.find({}, {limit: 1000});
  }
});

Template.product.events({
  'click .product': function () {
    Router.go('productDetail', {_id: this._id});
  }
});

Deps.autorun(function() {
  var keyword = Session.get('product-keyword') || '';
  if(keyword) {
    var pattern = '^' + escapeRegExp(keyword);
    PagedProducts.set('filters', { $or : [ 
      {sid: { $regex : pattern, '$options' : 'i' }}, 
      {oid: { $regex : pattern, '$options' : 'i' }} 
    ]});
  } else {
    PagedProducts.set('filters', {});
  }
});