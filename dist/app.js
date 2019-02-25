/* global angular */
(function() {
  window.app = angular.module('CurrencyExchanger', []);
}());
(function() {
  window.app.controller('CurController', ['$scope', 'service', function($scope, service) {
    $scope.list = service.getCurrencies();
    /* default values */
    $scope.giveCur = 0;
    $scope.commision = 0;
    $scope.inCurr = 'EUR';
    $scope.outCurr = 'RUR';
    $scope.selection = 'Buy';
    // $scope.actions = [];

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
      res = $scope.countPercent(res, $scope.commision);
      return res;
    };

    $scope.showPrice = function() {
      let result = 0;

      if ($scope.list !== undefined) {
        result = $scope.convert(result);
      }
      return result;
    };
    $scope.countPercent = (result, commision) => {
      if (commision !== 0) {
        const res = result / 100 * commision;

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