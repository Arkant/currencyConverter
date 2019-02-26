(function() {
  window.app.controller('CurController', ['$scope', 'currencyService', 'fees', 'actions', 'curNames',
    function($scope, currencyService, fees, actions, curNames) {
      $scope.list = currencyService.getCurrencies();
      $scope.giveCur;
      $scope.fees = fees;
      $scope.chosenFee;
      $scope.inCurr = curNames[0];
      $scope.outCurr = curNames[1];
      $scope.selection = actions[0];

      $scope.showPrice = function() {
        let result = 0;

        if ($scope.list !== undefined) {
          result = currencyService.convert($scope.result, $scope.selection, $scope.giveCur,
            $scope.outCurr.ccy, $scope.inCurr.ccy, $scope.list, $scope.chosenFee);
        }
        return result;
      };

      $scope.swapValues = () => {
        [$scope.inCurr, $scope.outCurr] = [$scope.outCurr, $scope.inCurr];
      };
    }]);
}());