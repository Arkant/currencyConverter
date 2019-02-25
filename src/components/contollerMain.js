(function() {
  window.app.controller('CurController', ['$scope', 'service', function($scope, service) {
    $scope.list = service.getCurrencies();
    /* default values */
    $scope.giveCur = 0;
    $scope.commision = 0;
    $scope.inCurr = 'EUR';
    $scope.outCurr = 'RUR';
    $scope.selection = 'Buy';

    $scope.countOnBuy = result => {
      let res = result;
      $scope.list.forEach(item => {
        if (item.ccy === $scope.inCurr) {
          res = $scope.giveCur * item.buy;
        }

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
    $scope.swapValues = () => {
      [$scope.inCurr, $scope.outCurr] = [$scope.outCurr, $scope.inCurr];
    };
  }]);
}());