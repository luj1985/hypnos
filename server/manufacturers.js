Meteor.publish('manufactures', function() {
  return Manufacturers.find();
});
