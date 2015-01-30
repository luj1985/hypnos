var em = new EventEmitter();

Template.profileTools.events({
  'click .done.item': function (e, template) {
    e.preventDefault();
    em.emit('save-profile');
  }
});

Template.profile.rendered = function () {
  var template = this;
  em.on('save-profile', function() {
    // TODO: validate input fields here
    var profile = {};
    profile.name = template.$('input[name="user.profile.name"]').val();
    profile.mobile = template.$('input[name="user.profile.mobile"]').val();
    profile.company=template.$('input[name="user.profile.company"]').val();
    profile.address = template.$('input[name="user.profile.address"]').val();
    profile.contact = template.$('input[name="user.profile.contact"]').val();

    console.log(profile);
    Meteor.call('updateProfile', profile, function (error, result) {
      console.log(arguments);
    });
  });
};

Template.profile.events({
  'click input[name="logout"]': function () {
    Meteor.logout();
    Router.go('home');
  }
});

Template.profile.destroyed = function () {
  em.off('save-profile');
};

Template.profile.helpers({
  user: function () {
    return Meteor.user();
  }
});

