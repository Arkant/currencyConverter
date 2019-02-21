/* eslint-disable no-undef */
/* eslint-disable no-console */
const app = angular.module('CurrencyExchanger', []);

app.controller('CurController', function($scope, $http) {
  $scope.list = [];

  $http({
    method: 'GET',
    url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
  }).then(response => {
    response.data.forEach(element => {
      $scope.list.push(element);
    });
  }, err => {
    console.log(err);
  });
});