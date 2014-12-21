Meteor.publish('favorites', function() {
  if (this.userId) {
    return Favorites.find({userId : this.userId});
  } else {
    this.ready();
  }
});

Meteor.methods({
  toggleFavorite : function(pid) {
    var favorite = Favorites.findOne({
      userId : this.userId,
      pid : pid
    });
    if (favorite) {
      Favorites.remove(favorite);
    } else {
      Favorites.insert({ userId : this.userId, pid : pid });
    }
  }
});