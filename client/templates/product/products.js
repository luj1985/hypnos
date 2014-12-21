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
    var id = this._id;
    console.log('save ' + id + ' into favorite');
  }
});

Template.product.rendered = function () {
  var product = this.find('.product');
  Meteor.defer(function() {
    $(product).addClass('visible');
  });
};

Template.images.rendered = function () {
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