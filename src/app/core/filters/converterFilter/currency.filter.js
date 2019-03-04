(function() {
  window.app.filter('currencyFilter', function() {
    return function(array, expression) {
      return array.filter(function(item) {
        return !expression || !window.angular.equals(item, expression);
      });
    };
  });
}());