Template.brandItem.helpers({
  brand: function () {
    return this.name.toLowerCase();
  }
});

Template.line.events({
  'click a': function (e, template) {
    e.preventDefault();
    template.$('a').toggleClass('active');
  }
});