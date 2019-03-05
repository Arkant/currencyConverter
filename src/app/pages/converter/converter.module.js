'use strict';

import './converter.scss';
import converterController from './converter.controller.js';

const converterModule = angular.module('currency-exchanger', []);

converterModule.controller('converterController', converterController);

converterModule.config(function(currencyServiceProvider) {
  'ngInject';
  currencyServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11');
});


export default converterModule;