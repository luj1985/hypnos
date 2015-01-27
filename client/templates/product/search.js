Template.productSearch.helpers({
  form: function () {
    return Session.get('product-search-form') || 'manufacturers';
  }
});

Template.doProductSearch.events({
  'click a.item.search': function(e) {
    e.preventDefault();
    var val = $('input[type="search"].product').val();
    // stop search when nothing entered
    if (!val) return;
    Router.go('products', {}, {query: $.param({ serial : val })});
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
  'click a': function (e) {
    e.preventDefault();
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
  'click a': function (e) {
    e.preventDefault();
    Session.set('alias', this.name);
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

Template.types.events({
  'click a': function (e) {
    e.preventDefault();
    Router.go('products', {}, {query: $.param(this)});
  }
});