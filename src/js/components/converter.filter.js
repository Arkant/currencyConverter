/* global app angular*/
(function() {
  window.app.filter('currencyFilter', function() {
    return function(array, expression, comparator) {
      return array.filter(function(item) {
        return !expression || !window.angular.equals(item, expression);
      });
    };
  });
}());