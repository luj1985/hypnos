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

Template.showProducts.rendered = function () {
  $('#productFilter').popup({
    popup : '#productFilterContent',
    position : 'bottom right',
    on    : 'click',
    transition : 'fade down'
  });
};

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
      {sid: { $regex : pattern, '$options' : 'i' }}, 
      {oid: { $regex : pattern, '$options' : 'i' }} 
    ]});
  } else {
    PagedProducts.set('filters', {});
  }
});