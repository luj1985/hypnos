Products = new Meteor.Collection('products');
PagedProducts = new Meteor.Pagination(Products, {
  availableSettings: {
    filters: true
  },
  perPage : 20,
  dataMargin : 0,
  infiniteTrigger : .8,
  infinite: true,
  divWrapper : 'ui segment stackable three column grid',
  itemTemplate : 'product',
  templateName : 'products'
});

Dealers = new Meteor.Collection('dealers');

