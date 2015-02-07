var em = new EventEmitter();

Template.profileTools.events({
  'click .done.item': function (e) {
    e.preventDefault();
    em.emit('save-profile');
  },
  'click .logout.item': function(e) {
    e.preventDefault();
    Meteor.logout();
    Router.go('products');
  }
});

Template.profile.rendered = function () {
  var template = this;
  em.on('save-profile', function() {
    // TODO: should validate input fields here
    var profile = {};
    profile.name = template.$('input[name="user.profile.name"]').val();
    profile.mobile = template.$('input[name="user.profile.mobile"]').val();
    profile.company=template.$('input[name="user.profile.company"]').val();
    profile.address = template.$('input[name="user.profile.address"]').val();
    profile.contact = template.$('input[name="user.profile.contact"]').val();
    profile.type = template.$('input[name="type"]:checked').val();

    Meteor.call('updateProfile', profile, function (error, result) {
      console.log(arguments);
    });
  });
};

Template.profile.destroyed = function () {
  em.off('save-profile');
};

Template.profile.helpers({
  user: function () {
    return Meteor.user();
  },
  checked: function (value) {
    var user = Meteor.user() || {},
        profile = user.profile || {};
    return (profile.type === value) ? "checked" : '';
  }
});

