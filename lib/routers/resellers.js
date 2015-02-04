ResellerSubs = new SubsManager({
  cacheLimit: 10,
  expireIn: 5
});

function genFilters(query) {
  var conditions = _.pick(query, ['province', 'city']);
  var filters = {};
  // use regex start with ?
  conditions = _.each(conditions, function(v, k) {
    filters[k] = v;
  });
  return filters;
}

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

  this.route("resellers", { 
    path: "/resellers",
    onBeforeAction: function() {
      var filters = genFilters(this.params.query);
      Session.set('reseller-filter', filters);
      this.next();
    },
    data: function() {
      var filters = genFilters(this.params.query);
      return Resellers.find(filters);
    }
  });
});
