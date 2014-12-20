Products = new Meteor.Collection('products');
PagedProducts = new Meteor.Pagination(Products, {
  availableSettings: {
    filters: true
  },
  perPage : 10,
  dataMargin : 0,
  infiniteTrigger : .8,
  fastRender : true,
  itemTemplate : 'product',
  infinite: true,
  divWrapper : 'ui segment',
  templateName : 'products'
});

Dealers = new Meteor.Collection('dealers');

