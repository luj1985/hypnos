Meteor.startup(function() {
  Modernizr.addTest('ios', function () {
    return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
  });

  // prevent full page scroll
  // document.body.addEventListener('touchmove', function(e) {  
  //   e.preventDefault();  
  // }, false); 

  accountService = {
    message : function(message) {
      console.log(message);
    }
  };
});