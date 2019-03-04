/* eslint-disable no-console */

export default function (app) {
  app.provider('currencyService', currencyService);

  function currencyService() {

    let API = '';
    this.setAPI = apiURL => API = apiURL;
    this.currencies = [];

     this.$get = ['$http', function($http) {
        return {
          getCurrencies: () => {
            $http({
              method: 'GET',
              url: API
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
  }
}