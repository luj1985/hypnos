Template.products.rendered = function () {
  $(document).on('nextpage', loadNextPage);
};

Template.products.destroyed = function () {
  $(document).off('nextpage', loadNextPage);
};

Template.products.helpers({
  items: function () {
    var filters = Session.get('products-filter');
    return Products.find(filters, {sort: {oid: -1}});
  }
});

Template.productItem.helpers({
  brand: function () {
    return (this.brand || "").toLowerCase();
  }
});

function loadNextPage() {
  var page = Session.get('product-page') || 1;
  Session.set('product-page', page + 1);
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

Deps.autorun(function() {
  var page = Session.get('product-page'),
      filters = Session.get('product-filter') || {};
  Meteor.subscribe('products', filters, page);
});