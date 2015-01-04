Meteor.startup(function() {
  var CSV = Meteor.npmRequire('comma-separated-values');
  
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
      var manufacturer = product.manufacturer;
      var names = manufacturer.split(/ +/);
      var m1 = names[0], 
          m2 = (names[1] || "").match(/\(([^\)]+)\)/) || [];

      var cc = product.cc;

      product.manufacturer = m1;
      product.alias = m2[1] || "";

      product.displayCC = cc;
      product.cc = parseFloat(cc, 10);

      product.oid = (product.oid || '').replace(/ /g, '').toUpperCase();
      product.sid = (product.sid || '').replace(/ /g, '').toUpperCase();
      Products.insert(product);
    });
  }
});