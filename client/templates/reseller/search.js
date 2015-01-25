Template.resellerSearch.rendered = function () {
  this.$('.location').citySelect({
    nodata:"none",
    required:false
  });
};

Template.resellerSearch.events({
  'click input[type="submit"]': function (e, template) {
    e.preventDefault();
    console.log('search resellers');
  }
});