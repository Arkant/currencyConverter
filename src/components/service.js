/* eslint-disable no-console */
/* global angular */
(function() {
  window.app.service('service', ['$http', function($http) {
    this.currencies = [];

    this.getCurrencies = () => {
      $http({
        method: 'GET',
        url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      }).then(({ data }) => {
        angular.copy(data, this.currencies);
      }, err => { console.log(err); });
      return this.currencies;
    };
  }]);
}());