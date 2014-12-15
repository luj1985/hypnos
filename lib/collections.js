Products = new Meteor.Collection('products');
PagedProducts = new Meteor.Pagination(Products, {
  availableSettings: {
    filters: true
  },
  perPage: 20,
  fastRender: true,
  paginationMargin: 2,
  infinite: true,
  sort : {
    num : 1
  }
});

Dealers = new Meteor.Collection('dealers');

