Template.layout.events({
  'click .launch': function () {
    $('.menu.sidebar').sidebar('show');
  },
  'click .sidebar > a.item' : function() {
    $('.menu.sidebar').sidebar('hide');
  }
});