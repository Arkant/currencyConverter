(function() {
  window.app.controller('CurController', ['$scope', 'service', function($scope, service) {
    $scope.list = service.getCurrencies();
    /* default values */
    $scope.giveCur = 0;
    $scope.commision = 0;
    $scope.inCurr = 'EUR';
    $scope.outCurr = 'RUR';
    $scope.selection = 'Buy';

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