Products = new Meteor.Collection('products');
PagedProducts = new Meteor.Pagination(Products, {
  availableSettings: {
    filters: true
  },
  itemTemplate : 'product',
  perPage: 10,
  paginationMargin: 1,
  infinite: true
});

Dealers = new Meteor.Collection('dealers');

