angular.module( 'yenda', [
  'templates-app',
  'ui.router',
  'yanda.common.http-service'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
})

.controller('AppCtrl', function AppCtrl($scope, httpService) {
  console.log('App Ctrl is alive');
  $scope.articles = [];

  $scope.getAll = function() {
    console.log('fetching');
    httpService.getAll("news", false)
    .success(function(data, status, headers, config) {
      $scope.articles = data;
    }).error(function(data, status, headers, config) {
      console.log(data);
    });
  };
  $scope.getAll();

});