Meteor.startup(function() {
  var CSV = Meteor.npmRequire('comma-separated-values');
  if (Resellers.find().count() === 0) {
    var resellers = new CSV(Assets.getText("resellers.csv"), {
      header: true, cast: false, line: "\n"
    }).parse();
    _.each(resellers, function(reseller) {
      var products = reseller.products.split(/[ \/，]/),
          carlines = reseller.carlines.split(/[ \/，]/);
      reseller.products = _.compact(products);
      reseller.carlines = _.compact(carlines);
      Resellers.insert(reseller);
    });
  }
});