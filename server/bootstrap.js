Meteor.startup(function () {

  var CSV = Meteor.npmRequire('comma-separated-values');
  if (Dealers.find().count() === 0) {
    var dealers = [{
      name : "某某经销商",
      location : "上海XXX"
    }];
  }
  if (Products.find().count() === 0) {
    var images = new CSV(Assets.getText("images.csv"), { header:true }).parse();
    var groups = _.groupBy(images, 'sid');

    var products = new CSV(Assets.getText("products.csv"), {
      header: true,
      cast: false,
      line: "\n"
    }).parse();

    _.each(products, function(product) {
      var sid = product.sid;
      var images = groups[sid];
      if (images) {
        product.images = _.map(images, function(image) { return _.omit(image, 'sid'); });
      }
      Products.insert(product);
    });
  }
});