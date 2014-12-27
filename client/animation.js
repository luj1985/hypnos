Animation = {};
Animation.attach = function(template, selector) {
  template.$(selector).each(function() {
    var $container = $(this);
    this._uihooks = {
      insertElement : function(node) {
        var $node = $(node);
        $container.append($node);
        Meteor.defer(function() {
          $node.removeClass('animate');
        });
      }
    }
  });
}