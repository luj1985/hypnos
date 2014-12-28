Products = new Meteor.Collection('products');
Resellers = new Meteor.Collection('resellers');
Favorites = new Meteor.Collection('favorites');

PagedProducts = new Meteor.Pagination(Products, {
  availableSettings: {
    filters: true
  },
  perPage: 20,
  dataMargin: 0,
  infiniteTrigger: .8,
  infinite: true,
  divWrapper: 'ui divided selection list products container',
  itemTemplate: 'product',
  templateName: 'products',
  sort: {
    'sid': -1
  }
});


PagedResellers = new Meteor.Pagination(Resellers, {
  availableSettings: {
    filters: true
  },
  perPage: 10,
  dataMargin: 0,
  infiniteTrigger: .8,
  infinite: true,
  divWrapper: 'ui divided selection list resellers container',
  itemTemplate: 'reseller',
  templateName: 'resellers',
  sort: {
    'name': -1
  }
});