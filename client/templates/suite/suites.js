Template.suites.helpers({
  items: function () {
    var filters = Session.get('suites-filter');
    return Suites.find(filters);
  }
});

Deps.autorun(function() {
  var page = Session.get('suite-page') || 1,
      filters = Session.get('suites-filter') || {};
  Meteor.subscribe('suites', filters, page);
});