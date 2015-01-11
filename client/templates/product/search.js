Template.productSearch.events({
  'submit form.search' : function(e, template) {
    e.preventDefault();
    var sid = template.$('input[name="serial"]').val();
    var options = { sid : sid };
    var param = $.param(options);
    Router.go('products', {}, {query: param});
  }
});

Template.productSearch.helpers({
  form: function () {
    return Session.get('product-search-form') || 'blank';
  }
});

Template.blank.events({
  'click input[type="button"]': function (e) {
    e.preventDefault();
    Session.set('product-search-form', 'manufacturers');
  }
});

Template.manufacturers.helpers({
  options: function () {
    return _.chain(Manufacturers.find().fetch())
            .pluck('manufacturer')
            .uniq()
            .sort(function(s1, s2) { return s1.localeCompare(s2, 'zh'); })
            .map(function(v) { return {name: v}; })
            .value();
  }
});

Template.manufacturer.events({
  'click li': function () {
    var name = this.name;
    Session.set('manufacturer', name);
    Session.set('product-search-form', 'aliases');
  }
});

Template.aliases.helpers({
  options: function () {
    var manufacturer = Session.get('manufacturer');
    var ms = Manufacturers.find({manufacturer: manufacturer});
    return _.chain(ms.fetch())
            .pluck('alias')
            .uniq()
            .sort(function(s1, s2) { return s1.localeCompare(s2, 'zh'); })
            .map(function(v) { return {name: v}; })
            .value();
  }
});

Template.alias.events({
  'click li': function () {
    var name = this.name;
    Session.set('alias', name);
    Session.set('product-search-form', 'types');
  }
});

Template.types.helpers({
  options: function () {
    var manufacturer = Session.get('manufacturer');
    var alias = Session.get('alias');
    var ms = Manufacturers.findOne({manufacturer: manufacturer, alias: alias});
    return ms.types;
  }
});