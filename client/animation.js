var Animation = {};

Animation.attach = function(template, selector, children) {
  template.$(selector).each(function() {
    var dom = this;
    $(children, dom).addClass('slide in animate');

    // template dom is cached, and no 'insert' event fired.
    Meteor.defer(function() {
      $(children, dom).removeClass('animate');
    });

    dom._uihooks = {
      insertElement : function(node, next) {
        var $node = $(node).addClass('slide in animate');
        dom.insertBefore(node, next);
        Meteor.defer(function() {
          $node.removeClass('animate');
        });
      }
    };
  });
};

Template.products.rendered = function() {
  Animation.attach(this, '.products', '.product');
};

Template.resellers.rendered = function () {
  Animation.attach(this, '.resellers', '.reseller');
};
