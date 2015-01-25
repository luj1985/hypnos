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

Template.productSearchTool.events({
  'click a': function () {
    Session.set('product-search-form', null);
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
      filters = Session.get('products-filter') || {};
  Meteor.subscribe('products', filters, page);
});