angular.module( 'yenda', [
  'yenda.home',
  'ui.router'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
})

.controller('AppCtrl', function AppCtrl($scope) {
  console.log('App Ctrl is alive');
});