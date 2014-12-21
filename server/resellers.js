var BAIDU_PLACE_API_AK="EFjt6oKsiZ1lejOMPCQnE0DA";

Meteor.startup(function() {
  Resellers._ensureIndex({ location : "2d" });

  if (Resellers.find().count() === 0) {
    var CSV = Meteor.npmRequire('comma-separated-values');
    var resellers = new CSV(Assets.getText("resellers.csv"), {
      header: true, cast: false, line: "\n"
    }).parse();

    _.each(resellers, function(reseller) {
      HTTP.get('http://api.map.baidu.com/place/v2/search', {
        params : {
          q : reseller.address,
          region : reseller.city,
          output : "json",
          ak : BAIDU_PLACE_API_AK
        }
      }, function(error, result) {
        if (error) return console.log(error);

        var suggestions = result.data.results || [];
        var suggestion = suggestions[0] || {};
        var location = suggestion.location;
        
        if (!location) {
          console.warn('cannot find address: ' + reseller.city + ',' + reseller.address)
        }

        var products = reseller.products.split(/[ \/，]/),
            carlines = reseller.carlines.split(/[ \/，]/);

        reseller.products = _.compact(products);
        reseller.carlines = _.compact(carlines);
        reseller.location = location;
        Resellers.insert(reseller);
      });
    });
  }
});