Meteor.startup(function() {
  var CSV = Meteor.npmRequire('comma-separated-values');
  if (Suites.find().count() === 0) {
    var suites = new CSV(Assets.getText("suites.csv"), {
      header: true, cast: false, line: "\n"
    }).parse();

    _.each(suites, function(suite) {
      Suites.insert(suite);
    });
  }
});

Meteor.publish('suites', function(filters, page, size) {
  page = page || 1;
  size = size || 20;
  filters = filters || {};
  return Suites.find(filters, {
    limit: page * size
  });
});

Meteor.publish('suite', function(suiteId) {
  return Suites.find({suiteId: suiteId});
})
