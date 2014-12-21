Meteor.startup(function () {

  var CSV = Meteor.npmRequire('comma-separated-values');
  if (Resellers.find().count() === 0) {
    var resellers = [{
      name : "某某经销商",
      location : "上海XXX"
    }];
  }
  if (Products.find().count() === 0) {
    var images = new CSV(Assets.getText("images.csv"), { 
      header:true,  cast: false, line: "\n"
    }).parse();

    var products = new CSV(Assets.getText("products.csv"), {
      header: true, cast: false, line: "\n"
    }).parse();

    var groups = _.groupBy(images, 'sid');

    _.each(products, function(product) {
      var images = groups[product.sid];
      if (images) {
        product.images = _.map(images, function(image) { 
          return _.omit(image, 'sid');
        });
      }
      // record cleanup
      product.oid = (product.oid || '').replace(/ /g, '');
      product.sid = (product.sid || '').replace(/ /g, '');
      Products.insert(product);
    });
  }
});