/* eslint-disable no-console */
/* global angular, app */
(function() {
  app.constant('fees', [0, 1, 3, 5]);
  app.constant('actions', ['Buy', 'Sell']);
  app.constant('curNames', ['USD', 'EUR', 'RUB', 'BTC']);

  app.provider('currencyService', function() {
    let API = '';

    return {
      setAPI: apiURL => (API = apiURL),
      currencies: [],
      $get: ['$http', function($http) {
        return {
          getCurrencies: () => {
            $http({
              method: 'GET',
              url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
            }).then(({ data }) => {
              angular.copy(data, this.currencies);
            }, err => { console.log(err); });
            return this.currencies;
          },

          convert(result, selection, giveCur, outCurr, inCurr, list, chosenFee) {
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
          },

          countPercent(result, chosenFee) {
            if (chosenFee !== 0) {
              const res = result / 100 * chosenFee;

              return result - res;
            }
            return result;
          }
        };
      }]
    };
  });
}());