function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

Template.products.helpers({
  items: function () {
    return Products.find({}, {sort: {oid: -1}});
  }
});

function loadNextPage() {
  var page = Session.get('product-page') || 1;
  Session.set('product-page', page + 1);
}

Template.products.rendered = function () {
  $(document).on('nextpage', loadNextPage);
};

Template.products.destroyed = function () {
  $(document).off('nextpage', loadNextPage);
};


Template.product.events({
  'click .product': function () {
    Router.go('productDetail', {_id: this._id});
  },
  'click .favorite' : function(e) {
    Meteor.call('toggleFavorite', this._id);
  }
});

Template.product.helpers({
  brand: function () {
    return (this.brand || "").toLowerCase();
  }
});

Deps.autorun(function() {
  var page = Session.get('product-page'),
      filters = Session.get('product-filter') || {};
  Meteor.subscribe('products', filters, page);
});