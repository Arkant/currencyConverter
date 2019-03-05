'use strict';

import converterTemplate from '!!file-loader?name=templates/[name].[ext]!./pages/converter/converter.html';

function routeConfig($urlRouterProvider, $stateProvider) {
  'ngInject';
    
    $stateProvider
      .state('converter', {
        url: '/converter',
        templateUrl: converterTemplate,
        controller: 'converterController'
    });

  $urlRouterProvider.otherwise('/');

}

export default angular
  .module('index.routes', [])
    .config(routeConfig);

