/* global angular */
(function() {
  window.app = angular.module('CurrencyExchanger', []);
}());
(function() {
  window.app.controller('CurController', ['$scope', 'service', 'fees', function($scope, service, fees) {
    $scope.list = service.getCurrencies();
    /* default values */
    $scope.giveCur = 0;
    $scope.fees = fees;
    $scope.inCurr = 'EUR';
    $scope.outCurr = 'RUR';
    $scope.selection = 'Buy';
    $scope.chosenFee;

    $scope.convert = result => {
      let res = result;

      if ($scope.selection === 'Buy') {
        $scope.list.forEach(item => {
          if (item.ccy === $scope.inCurr) {
            res = $scope.giveCur * item.buy;
          }

          if (item.ccy === $scope.outCurr) {
            res /= item.buy;
          }
        });
      } else {
        $scope.list.forEach(item => {
          if (item.ccy === $scope.inCurr) {
            res = $scope.giveCur * item.sale;
          }

          if (item.ccy === $scope.outCurr) {
            res /= item.sale;
          }
        });
      }
      res = $scope.countPercent(res, $scope.chosenFee);
      console.log(res);
      return res;
    };

    $scope.showPrice = function() {
      let result = 0;

      if ($scope.list !== undefined) {
        result = $scope.convert(result);
      }
      return result;
    };
    $scope.countPercent = (result, chosenFee) => {
      console.log(chosenFee, 'Chosen fees');
      console.log(result, 'Chosen result');

      if (chosenFee !== 0) {
        const res = result / 100 * chosenFee;

        return result - res;
      }
      return result;
    };
    $scope.swapValues = () => {
      [$scope.inCurr, $scope.outCurr] = [$scope.outCurr, $scope.inCurr];
    };
  }]);
}());
/* eslint-disable no-console */
/* global angular */
(function() {
  window.app.constant('fees', [0, 1, 3, 5]);

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