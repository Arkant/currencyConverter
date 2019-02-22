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

  $scope.showBuy = function() {
    let result = 0;

    if ($scope.list !== undefined) {
      $scope.list.forEach(item => {
        if (item.ccy === $scope.inCurr) {
          result = $scope.giveCur * item.buy;
        }
      });
      $scope.list.forEach(item => {
        if (item.ccy === $scope.outCurr) {
          result /= item.buy;
        }
      });
      result = $scope.countPercent(result, $scope.commision);
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
