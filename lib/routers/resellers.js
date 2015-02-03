ResellerSubs = new SubsManager({
  cacheLimit: 10,
  expireIn: 5
});

Router.map(function() {
  this.route("resellersCity", {
    path: "/resellers/search/:province",
    data: function() {
      var province = this.params.province;
      var cities = CITIES[province];
      cities = _.isArray(cities) ? cities : _.keys(cities);
      cities = _.map(cities, function(city) {
        return { province: province, city: city, text: city }
      });
      cities.unshift({province: province, text: '全部'});
      return cities;
    }
  });

  this.route("resellerSearch", {
    data: function() {
      return _.keys(CITIES);
    },
    path: "/resellers/search" 
  });

  this.route("resellers",     { 
    path: "/resellers",
    data: function() {
      var query = this.params.query;
      var conditions = _.pick(query, ['province', 'city']);
      return Resellers.find(conditions);
    }
  });
});
