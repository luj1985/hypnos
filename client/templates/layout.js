Template.layout.rendered = function () {
  
};

Template.layout.events({
  'click .launch': function () {
    $('.sidebar').sidebar('toggle');
  }
});