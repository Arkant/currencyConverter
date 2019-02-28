/* global app, angular */
(function() {
  const app = angular.module('CurrencyExchanger', []);
  app.config(['currencyServiceProvider', function(currencyServiceProvider) {
    currencyServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11');
  }]);

  app.run(function($window, $rootScope) {
    $rootScope.netActive = navigator.onLine;
    $window.addEventListener('offline', function() {
      $rootScope.$apply(function() {
        $rootScope.netActive = false;
      });
    });
    $window.addEventListener('online', function() {
      $rootScope.$apply(function() {
        $rootScope.netActive = true;
      });
    });
  });
  window.app = app;
}());