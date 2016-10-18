angular.module( 'yenda', [
  'templates-app',
  'ui.router',
  'ui.bootstrap',
  'yanda.common.http-service',
  'yanda.common.modal-service'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
})

.controller('AppCtrl', function AppCtrl($scope, httpService, modalService) {
  $scope.articles = [];
  $scope.newArticle = {};
  $scope.isEdit = false;

  $scope.getAll = function() {
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
      $scope.articles.unshift(data);
      $scope.newArticle = {};
    }).error(function(data, status, headers, config) {
      console.log(data);
    });
  };

  $scope.editArticle = function(article) {
    $scope.isEdit = true;
    $scope.newArticle = article;
  };

  $scope.saveArticleChanges = function() {
    if ($scope.isEdit === false) {
      return;
    }

    httpService.update('news', $scope.newArticle)
    .success(function(data, status, headers, config) {
      $scope.newArticle = {};
      $scope.getAll();
    }).error(function(data, status, headers, config) {
      console.log(data);
    });
  };

  $scope.cancelEditArticle = function() {
    $scope.isEdit = false;
    $scope.newArticle = {};
    console.log('cancel edit');
  };

  $scope.removeArticle = function(id) {
    modalService.confirmDialog("Delete Element", "Are you sure you want to delete?", function() {
      httpService.deleteElement('news/' + id)
      .success(function(data, status, headers, config) {
        $scope.getAll();
      }).error(function(data, status, headers, config) {
        console.log(data);
      });
    });
  };
});