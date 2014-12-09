Meteor.startup(function () {
  if (Products.find().count() === 0) {
    var data = [{
      family : "INA",
      no : "", // 原厂号
      sno : "5300067090", // 舍弗勒号
      brand : "audi",
      type : "A6L (C5)",
      cc : "1.8",
      engine : "ANQ",
      comments : "正时系",
      start : "2000-01-01",
      end : "2005-12-01"
    }, {
      family : "INA",
      no : "38942-PWA-004",
      sno : "5310830100",
      brand : "honda",
      type : "飞度三厢",
      cc : "1.3",
      engine : "L13A3",
      comments : "附件系",
      start : "2003-09-01",
      end : "2006-04-01"
    }, {
      family : "FAG",
      no : "8K0598611",
      sno : "805963",
      brand : "audi",
      type : "A4L (B8)",
      cc : "2.0 TFSI",
      engine : "CDZ",
      comments : "轮毂轴承",
      start : "2007-12-01",
      end : "2008-09-01"
    }];

    _.each(data, function(d) {
      Products.insert(d);
    });
  }
});