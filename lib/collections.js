Products = new Meteor.Collection('products');
Resellers = new Meteor.Collection('resellers');
Favorites = new Meteor.Collection('favorites');

PagedProducts = new Meteor.Pagination(Products, {
  availableSettings: {
    filters: true
  },
  perPage : 20,
  dataMargin : 0,
  infiniteTrigger : .9,
  infinite: true,
  divWrapper : 'ui segment divided stackable two column grid',
  itemTemplate : 'product',
  templateName : 'products',
  sort : {
    'sid' : -1
  }
});

PagedResellers = new Meteor.Pagination(Resellers, {
  availableSettings: {
    filters: true
  },
  perPage : 30,
  dataMargin : 0,
  infiniteTrigger : .8,
  infinite: true,
  divWrapper : 'ui divided selection list',
  itemTemplate : 'reseller',
  templateName : 'resellers',
  sort : {
    'name' : -1
  }
});