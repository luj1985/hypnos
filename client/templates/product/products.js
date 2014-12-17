Template.searchProduct.events({
  'keyup .search' : function(e) {
    var search = $(e.target),
        keyword = search.val();

    if (keyword) {
      PagedProducts.set('filters', {
        $or : [
          {sid: { $regex : keyword }},
          {oid: { $regex : keyword }}
        ]
      });
    } else {
      PagedProducts.set('filters', {});
    }
  }
});