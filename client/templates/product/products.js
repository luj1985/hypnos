Template.products.rendered = function () {
  $(document).on('nextpage', loadNextPage);
};

Template.products.destroyed = function () {
  $(document).off('nextpage', loadNextPage);
};

Template.productItem.helpers({
  brand: function () {
    return (this.brand || "").toLowerCase();
  }
});

function loadNextPage() {
  var filters = Session.get('product-filter') || {};
  var page = filters.page || 1;
  filters.page = page + 1;
  Session.set('product-filter', filters);
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

Deps.autorun(function() {
  var conditions = Session.get('product-filter');
  ProductSubs.subscribe('products', conditions);
});