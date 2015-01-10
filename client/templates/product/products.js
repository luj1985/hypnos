function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function infiniteSrollHandler(e) {
  var context = $(this),
      height = context.innerHeight(),
      scrollTop = context.scrollTop();
      scrollHeight = context[0].scrollHeight;
  if ((height + scrollTop) > (scrollHeight - height)) {
    console.log(scrollHeight, scrollTop, height);
    loadNextPage();
  }
}

var handler = _.debounce(infiniteSrollHandler, 300);

Template.products.rendered = function () {
  $('main').on('scroll', handler);  
};

Template.products.destroyed = function () {
  $('main').off('scroll', handler);
};

Template.products.helpers({
  items: function () {
    return Products.find({}, {sort: {oid: -1}});
  }
});

Template.product.events({
  'click .product': function () {
    Session.set('selected-product', this);
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

function loadNextPage() {
  var page = Session.get('product-page') || 1;
  console.log('loading next page: ' + (page + 1));
  Session.set('product-page', page + 1);
}

Deps.autorun(function() {
  var productPage = Session.get('product-page');
  Meteor.subscribe('products', {}, productPage);
});