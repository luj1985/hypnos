Meteor.publish('favorites', function() {
  if (this.userId) {
    return Favorites.find({user : this.userId});
  } else {
    this.ready();
  }
})