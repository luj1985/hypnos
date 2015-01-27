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

      var manufacturer = product.manufacturer || "";
      var names = manufacturer.match(/([^ \(]+) ?(?:\(([^\)]+)\))?/);

      var cc = product.cc;
      var engine = product.engine || '';
      engine = engine.replace(/[\/ ]/g, '');

      var sid = product.sid || '';
      sid = sid.replace(/[\/ ]/g, '').toUpperCase();
      var oid = product.oid || '';
      oid = oid.replace(/[\/ ]/g, '').toUpperCase();

      product.engine = engine;
      product.manufacturer = names[1] || "";
      product.alias = names[2] || "";

      product._cc = parseFloat(cc, 10);

      product.oid = oid;
      product.sid = sid;
      Products.insert(product);
    });

    // TODO: should update this collection every time when products was update/insert/delete
    var manufacturers = Products.aggregate([{
      $group: {
        _id: { manufacturer : "$manufacturer", alias : "$alias" },
        types : {
          $addToSet : {
            engine : "$engine",
            cc : "$cc",
            type : "$type"
          }
        }
      }
    }, {
      $project : { _id: 0, alias: "$_id.alias", manufacturer: "$_id.manufacturer", types: 1}
    }]);

    manufacturers.forEach(function(m) {
      Manufacturers.insert(m);
    });
  }
});


function escapeRegex(text) {
  return text.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}

// for business reason, there is not need to do a infinite scroll
// just take this as a workaround to shown as incremental load
var pageSize = 20;
Meteor.publish('products', function(conditions) {
  conditions = conditions || {};
  var page = conditions.page || 1,
      serial = conditions.serial || '';
  var filters = _.omit(conditions, 'page', 'serial');

  if (serial) {
    var pattern = '^' + escapeRegex(serial);
    filters = _.extend(filters, {
      $or : [
        { sid: { $regex: pattern, $options: 'i' } },
        { oid: { $regex: pattern, $options: 'i' } }
      ]
    });
  }

  return Products.find(filters, {
    limit: page * pageSize,
    sort: { oid : -1 }
  });
}); 

Meteor.publish('product', function(id) {
  return Products.find({_id: id});
})