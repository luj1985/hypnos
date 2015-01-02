var updateFilters = _.debounce(function(keyword) {
  Session.set('product-keyword', keyword);
}, 350);

Template.productSearch.events({
  'keyup #productSearch' : function(e) {
    updateFilters($(e.target).val());
  }
});

Template.productSearch.helpers({
  keyword: function () {
    return Session.get('product-keyword') || '';
  }
});

Template.productSearch.rendered = function () {
  this.$("#cc").noUiSlider({
    start: [20, 80],
    connect: true,
    range: {
      'min': 0,
      'max': 100
    }
  });
};