Meteor.startup(function() {
  Meteor.Router.filters({
    resetScroll: function(page) {
      if (!(page === Session.get('Router.lastPage'))) {
        Session.set('Router.lastPage', page);
        Meteor.startup(function() {
          window.scrollTo(0,0)
        });
      }
      return page;
    }
  });
  Meteor.Router.filter('resetScroll'); 
});