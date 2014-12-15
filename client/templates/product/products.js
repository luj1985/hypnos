Template.showproducts.events({
  'click #myfilter': function () {
    PagedProducts.set({"filters" : {num : {$gt : 30}}});
  }
});