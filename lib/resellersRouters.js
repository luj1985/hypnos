ResellerSubs = new SubsManager({
  cacheLimit: 10,
  expireIn: 5
});

Router.map(function() {

  this.route("resellerSearch",{ 
    onBeforeAction: function() {
      Session.set('reseller-search-form', undefined);
      Session.set('province', undefined);
      Session.set('city', undefined);
      this.next();
    },
    path: "/resellers/search" 
  });

  this.route("resellers",     { 
    path: "/resellers",
    data: function() {
      return Resellers.find({});
    }
  });
});
