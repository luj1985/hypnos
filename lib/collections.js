Products = new Meteor.Collection('products');
PagedProducts = new Meteor.Pagination(Products, {
  availableSettings: {
    filters: true
  },
  perPage: 10,
  fastRender: true,
  paginationMargin: 1,
  infinite: true
});

Dealers = new Meteor.Collection('dealers');

