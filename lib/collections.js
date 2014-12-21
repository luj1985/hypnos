Products = new Meteor.Collection('products');
PagedProducts = new Meteor.Pagination(Products, {
  availableSettings: {
    filters: true
  },
  perPage : 20,
  dataMargin : 0,
  infiniteTrigger : .9,
  infinite: true,
  divWrapper : 'ui segment divided stackable three column grid',
  itemTemplate : 'product',
  templateName : 'products',
  sort : {
    'sid' : -1
  }
});


Resellers = new Meteor.Collection('resellers');
PagedResellers = new Meteor.Pagination(Resellers, {
  availableSettings: {
    filters: true
  },
  perPage : 30,
  dataMargin : 0,
  infiniteTrigger : .9,
  infinite: true,
  divWrapper : 'ui divided selection list',
  itemTemplate : 'reseller',
  templateName : 'resellers',
  sort : {
    'sid' : -1
  }
});

Favorites = new Meteor.Collection('favorites');

