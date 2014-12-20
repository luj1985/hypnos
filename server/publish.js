Meteor.publish('favorites', function() {
  if (this.userId) {
    return Favorites.find({user : this.userId});
  } else {
    this.ready();
  }
})

Meteor.publish('dealers', function() {
  if (this.userId) {
    return Dealers.find({});
  } else {
    this.ready();
  }
});