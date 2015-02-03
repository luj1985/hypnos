ResellerSubs = new SubsManager({
  cacheLimit: 10,
  expireIn: 5
});

Router.map(function() {
  this.route("resellerSearch", {
    data: function() {
      return _.keys(CITIES);
    },
    path: "/resellers/search" 
  });

  this.route("resellersCity", {
    path: "/resellers/search/:province",
    template: "cities",
    data: function() {
      var province = this.params.province;
      var cities = CITIES[province];
      cities = _.isArray(cities) ? cities : _.keys(cities);
      return _.map(cities, function(city) {
        return { province: province, city: city }
      });
    }
  });

  this.route("resellers",     { 
    path: "/resellers",
    data: function() {
      return Resellers.find({});
    }
  });
});
