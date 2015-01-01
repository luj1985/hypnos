Template.resellerSearch.events({
  'click input[type="submit"]': function (e, template) {
    e.preventDefault();
    console.log('search resellers');
  }
});