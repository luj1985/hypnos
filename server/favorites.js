Meteor.publish('favorites', function() {
  if (this.userId) {
    return Favorites.find({userId : this.userId});
  } else {
    this.ready();
  }
});

Meteor.methods({
  toggleFavorite : function(pid) {
    var doc = { userId : this.userId, pid : pid };
    var favorite = Favorites.findOne(doc);
    if (favorite) {
      Favorites.remove(doc);
    } else {
      Favorites.insert(doc);
    }
  }
});