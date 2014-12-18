var filterUpdater = _.debounce(function(filters) {
  Session.set('product-filters', filters);
}, 200);

Template.searchProduct.events({
  'keyup .search' : function(e) {
    var search = $(e.target), 
        keyword = search.val(),
        filters = keyword ? { $or : [ 
          {sid: { $regex : keyword }}, 
          {oid: { $regex : keyword }} 
        ]} : {};
    filterUpdater(filters);
  }
});

Template.images.rendered = function () {
  var el = this.findAll('.swipebox');
  $(el).click(function(e) {
    e.preventDefault();
  });
};

Deps.autorun(function() {
  var filters = Session.get('product-filters') || {};
  PagedProducts.set('filters', filters);
});