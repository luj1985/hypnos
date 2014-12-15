Products = new Meteor.Collection('products');
PagedProducts = new Meteor.Pagination(Products, {
  perPage: 20,
  infinite: true,
  sort : {
    num : 1
  }
});

Dealers = new Meteor.Collection('dealers');

