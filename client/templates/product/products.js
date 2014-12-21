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

Template.product.helpers({
  favorite: function () {
    // TODO: this may cause performance downgrade
    var favorite = Favorites.findOne({pid : this._id});
    return favorite ? 'active' : '';
  }
});

Template.product.rendered = function () {
  var product = this.find('.product');
  Meteor.defer(function() {
    $(product).addClass('visible');
  });
};

Template.productImages.rendered = function () {
  var swipebox = this.findAll('.swipebox');
  $(swipebox).click(function(e) {
    e.preventDefault();
  });
};

Deps.autorun(function() {
  var keyword = Session.get('product-keyword');
  var filters = keyword ? { $or : [ 
    {sid: { $regex : keyword }}, 
    {oid: { $regex : keyword }} 
  ]} : {};
  PagedProducts.set('filters', filters);
});