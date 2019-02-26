/* eslint-disable no-console */
/* global angular */
(function() {
  window.app.constant('fees', [0, 1, 3, 5]);
  window.app.constant('actions', ['Buy', 'Sell']);
  window.app.constant('curNames', ['USD', 'EUR', 'RUB', 'BTC']);

  window.app.service('currencyService', ['$http', function($http) {
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

    this.convert = (result, selection, giveCur, outCurr, inCurr, list, chosenFee) => {
      let res = result;

      if (selection === 'Buy') {
        list.forEach(item => {
          if (item.ccy === inCurr) {
            res = giveCur * item.buy;
          }
        });

        list.forEach(item => {
          if (item.ccy === outCurr) {
            res /= item.buy;
          }
        });
      } else {
        list.forEach(item => {
          if (item.ccy === inCurr) {
            res = giveCur * item.sale;
          }
        });
        list.forEach(item => {
          if (item.ccy === outCurr) {
            res /= item.sale;
          }
        });
      }
      res = this.countPercent(res, chosenFee);
      return res;
    };

    this.countPercent = (result, chosenFee) => {
      if (chosenFee !== 0) {
        const res = result / 100 * chosenFee;

        return result - res;
      }
      return result;
    };
  }]);
}());