'use strict';

const shared = angular.module('core.shared', []);

import validationTestDirective from './directives/validation-test/validation-test.directive';

import constants from './services/constants';
import storeFactory from './services/store.factory';
import resolverProvider from './services/resolver.provider';
import currencyService from './services/converter.provider';
import currencyFilter from './filters/converterFilter/currency.filter';

validationTestDirective(shared);

constants(shared);
storeFactory(shared);
resolverProvider(shared);
currencyService(shared);
currencyFilter(shared);
export default shared;

// function converterPagePrealoading ($q, $ocLazyLoad) {
//   "ngInject";

//   const deferred = $q.defer();
//   require.ensure([], require => {
//       const asyncModule = require('../../pages/converter/converter.module');
//       $ocLazyLoad.load({
//           name: asyncModule.default.name,
//       });
//       deferred.resolve(asyncModule.default.controller);
//   });
//   return deferred.promise;
// }