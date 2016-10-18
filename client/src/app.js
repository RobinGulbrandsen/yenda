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
  $scope.newArticle = {};

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

  $scope.addArticle = function() {
    if (!$scope.newArticle.title || !$scope.newArticle.content) {
      console.log('show error messages');
      return;
    }

    httpService.create('news', $scope.newArticle)
    .success(function(data, status, headers, config) {
      $scope.articles.push(data);
      $scope.newArticle = {};
    }).error(function(data, status, headers, config) {
      console.log(data);
    });
    console.log('create new');
    console.log('article', $scope.newArticle);
  };

});