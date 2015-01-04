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

Meteor.publish('suites', function(sid) {
  return Suites.find({componentId : sid });
});