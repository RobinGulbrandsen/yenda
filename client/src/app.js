angular.module( 'yenda', [
  'templates-app',
  'ui.router',
  'yenda.home'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
})

.controller('AppCtrl', function AppCtrl($scope) {
  console.log('App Ctrl is alive');
});