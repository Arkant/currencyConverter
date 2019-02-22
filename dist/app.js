/* eslint-disable no-undef */
/* eslint-disable no-console */
const app = angular.module('CurrencyExchanger', []);

app.service('service', ['$http', function($http) {
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


app.controller('CurController', ['$scope', 'service', function($scope, service) {
  $scope.list = service.getCurrencies();
  $scope.giveCur = 0;
  $scope.inCurr = 'EUR';
  $scope.outCurr = 'RUR';
  $scope.commision = 0;
  $scope.selection = 'Buy';

  $scope.countOnBuy = result => {
    let res = result;
    $scope.list.forEach(item => {
      if (item.ccy === $scope.inCurr) {
        res = $scope.giveCur * item.buy;
      }
    });
    $scope.list.forEach(item => {
      if (item.ccy === $scope.outCurr) {
        res /= item.buy;
      }
    });
    res = $scope.countPercent(res, $scope.commision);
    return res;
  };

  $scope.countOnSell = result => {
    let res = result;
    $scope.list.forEach(item => {
      if (item.ccy === $scope.inCurr) {
        res = $scope.giveCur * item.sale;
      }
    });
    $scope.list.forEach(item => {
      if (item.ccy === $scope.outCurr) {
        res /= item.sale;
      }
    });
    res = $scope.countPercent(res, $scope.commision);
    return res;
  };

  $scope.showPrice = function() {
    let result = 0;

    if ($scope.list !== undefined) {
      if ($scope.selection === 'Buy') {
        result = $scope.countOnBuy(result);
      } else {
        result = $scope.countOnSell(result);
      }
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
  $scope.changeValues = () => {
    [$scope.inCurr, $scope.outCurr] = [$scope.outCurr, $scope.inCurr];
  };
}]);

