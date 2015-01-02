var em = new EventEmitter();

Template.profileTools.events({
  'click .done.item': function () {
    em.emit('save-profile');
  }
});

Template.profile.rendered = function () {
  var template = this;
  em.on('save-profile', function() {
    // TODO: validate input fields here
    var profile = {};
    profile.name = template.$('input[name="name"]').val();
    profile.tel = template.$('input[name="phone"]').val();
    profile.address = template.$('input[name="address"]').val();

    Meteor.call('updateProfile', profile, function (error, result) {
      console.log(arguments);
    });
  });
};

Template.profile.helpers({
  user: function () {
    return Meteor.user();
  }
});
