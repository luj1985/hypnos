var updateFilters = _.debounce(function(keyword) {
  Session.set('product-keyword', keyword);
}, 350);

Template.searchProduct.events({
  'keyup .search' : function(e) {
    updateFilters($(e.target).val());
  }
});

Template.searchProduct.helpers({
  keyword: function () {
    return Session.get('product-keyword') || '';
  }
});

Template.images.rendered = function () {
  var el = this.findAll('.swipebox');
  $(el).click(function(e) {
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