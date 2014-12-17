Meteor.startup(function () {

  var CSV = Meteor.npmRequire('comma-separated-values');
  if (Dealers.find().count() === 0) {
    var dealers = [{
      name : "某某经销商",
      location : "上海XXX"
    }];
  }
  if (Products.find().count() === 0) {
    var pcsv = Assets.getText("products.csv");
    var products = new CSV(pcsv, {
      header: true,
      cast: false,
      line: "\n"
    }).parse();

    _.each(products, function(product) {
      Products.insert(product);
    });

    var icsv = Assets.getText("images.csv");
    var images = new CSV(icsv, { header:true }).parse();

    _.each(images, function(d) {
      Products.update({sid: d.sid}, {
        images : {
          $push : {
            image : d.image,
            thumbnail : d.thumbnail
          }
        }
      }, true);
    });

    
  }


});