Meteor.publish('favorites', function() {
  if (this.userId) {
    return Favorites.find({user : this.userId});
  } else {
    this.ready();
  }
})

Meteor.publish('resellers', function() {
  if (this.userId) {
    return Resellers.find({});
  } else {
    this.ready();
  }
});