Meteor.startup(function () {
  if (Dealers.find().count() === 0) {
    var dealers = [{
      name : "某某经销商",
      location : "上海XXX"
    }];
    _.each(dealers, function(d) {
      Dealers.insert(d);
    });
  }
  if (Products.find().count() === 0) {
    for (var i = 0; i < 10000; i++) {
      Products.insert({
        num: i
      });
    }
  }
});