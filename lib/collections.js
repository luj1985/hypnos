Products = new Meteor.Collection("products");
Resellers = new Meteor.Collection("resellers");
Favorites = new Meteor.Collection("favorites");

PagedProducts = new Meteor.Pagination(Products, {
  availableSettings: {
    filters: true
  },
  perPage: 20,
  dataMargin: 0,
  infiniteTrigger: .95,
  infinite: true,
  divWrapper: "products container",
  itemTemplate: "product",
  templateName: "products",
  loadingTemplate: "loading",
  sort: {
    "oid": -1
  }
});


PagedResellers = new Meteor.Pagination(Resellers, {
  availableSettings: {
    filters: true
  },
  perPage: 20,
  dataMargin: 0,
  infiniteTrigger: .95,
  infinite: true,
  divWrapper: "resellers container",
  itemTemplate: "reseller",
  templateName: "resellers",
  loadingTemplate: "loading",
  auth: function(skip, sub) {
    return !!sub.userId;
  },
  sort: {
    "name": -1
  }
});