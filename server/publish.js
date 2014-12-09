Meteor.publish('products', function() {
  return Products.find({});
});

Meteor.publish('dealers', function() {
  if (this.userId) {
    return Dealers.find({});
  } else {
    this.ready();
  }
});