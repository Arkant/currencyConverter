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
        });

        $scope.list.forEach(item => {
          if (item.ccy === $scope.outCurr) {
            res /= item.buy;
          }
        });
      } else {
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
      }
      res = $scope.countPercent(res, $scope.chosenFee);
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