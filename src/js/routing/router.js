/* global app */

app.config(function($stateProvider) {
  const converter = {
    name: 'converter',
    url: '/converter',
    component: 'converter'
  };
  const home = {
    name: 'home',
    url: '',
    template: ' <h3>This is my converter application made with love and AngularJS</h3> '
  };

  $stateProvider.state(converter);
  $stateProvider.state(home);
});