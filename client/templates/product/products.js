var updateFilters = _.debounce(function(keyword) {
  Session.set('product-keyword', keyword);
}, 350);

Template.showProducts.events({
  'keyup #productSearch' : function(e) {
    updateFilters($(e.target).val());
  }
});

Template.showProducts.helpers({
  keyword: function () {
    return Session.get('product-keyword') || '';
  }
});

Template.product.events({
  'click .favorite' : function(e) {
    Meteor.call('toggleFavorite', this._id);
  }
});

Template.productImages.rendered = function () {
  this.$('.swipebox').click(function(e) {
    e.preventDefault();
  });
};

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

Deps.autorun(function() {
  var keyword = Session.get('product-keyword') || '';
  if(keyword) {
    var pattern = '^' + escapeRegExp(keyword);
    PagedProducts.set('filters', { $or : [ 
      {sid: { $regex : pattern }}, 
      {oid: { $regex : pattern }} 
    ]});
  } else {
    PagedProducts.set('filters', {});
  }
});