Template.productSearch.helpers({
  form: function () {
    return Session.get('product-search-form') || 'manufacturers';
  }
});

Template.doProductSearch.events({
  'click a.item.search': function(e) {
    e.preventDefault();
    var val = $('input[type="search"].product').val();
    // stop search when nothing entered
    if (!val) return;
    Router.go('products', {}, {query: $.param({ serial : val })});
  }
});

Template.types.events({
  'click a': function (e) {
    e.preventDefault();
    Router.go('products', {}, {query: $.param(this)});
  }
});