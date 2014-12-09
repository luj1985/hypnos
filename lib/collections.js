Products = new Meteor.Collection('products');
Dealers = new Meteor.Collection('dealers');

if (Meteor.isServer) {
  Meteor.methods({
    searchProducts: function(query, options) {
      options = options || {};
      if (options.limit) {
        options.limit = Math.min(50, Math.abs(options.limit));
      } else {
        options.limit = 50;
      }
      return Products.find({}, options).fetch();
    }
  });
} else {
  Template.products.search = function(query, callback) {
    Meteor.call("searchProducts", query, {}, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
      callback(res);
    });
  }
}