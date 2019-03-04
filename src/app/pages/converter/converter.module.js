import './main.scss';

import CurController from './converter.controller.js';

const app = angular.module('CurrencyExchanger', []);

app.controller('CurController', CurController);


app.config(function (currencyServiceProvider) {
  'ngInject';
  currencyServiceProvider.setURL('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
});

export default app;