angular.module( 'yenda', [
  'templates-app',
  'ui.router',
  'ui.bootstrap',
  'yanda.common.http-service',
  'yanda.common.modal-service',
  'yanda.common.auth-service'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');
  $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.yanda');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

.controller('AppCtrl', function AppCtrl($scope, $window, httpService, modalService, authService) {
  $scope.articles = [];
  $scope.newArticle = {};
  $scope.isEdit = false;
  $scope.validation = {
    article: {}
  };

  $scope.loginUser = {};
  $scope.currentUser = {};

  var validateArticle = function() {
    $scope.validation.article = {};
    var hasErrors = false;
    if (!$scope.newArticle.title) {
      $scope.validation.article.title = 'cant be blank';
      hasErrors = true;
    }
    if(!$scope.newArticle.content) {
      $scope.validation.article.content = 'cant be blank';
      hasErrors = true;
    }
    return !hasErrors;
  };

  $scope.getAll = function() {
    httpService.getAll("api/news", false)
    .success(function(data, status, headers, config) {
      $scope.articles = data;
    }).error(function(data, status, headers, config) {
      console.log(data);
    });
  };
  $scope.getAll();

  $scope.addArticle = function() {
    if (!validateArticle()) {
      return;
    }
    
    httpService.create('api/news', $scope.newArticle)
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
    if (!validateArticle()) {
      return;
    }

    if ($scope.isEdit === false) {
      return;
    }
    
    $scope.isEdit = false;

    httpService.update('api/news', $scope.newArticle)
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
      httpService.deleteElement('api/news/' + id)
      .success(function(data, status, headers, config) {
        $scope.getAll();
      }).error(function(data, status, headers, config) {
        console.log(data);
      });
    });
  };

  /////////////////// USER /////////////////////////////

  $scope.login = function() {
    if (!$scope.loginUser.username || !$scope.loginUser.password) {
      return;
    }

    authService.signin($scope.loginUser)
      .then(function (currentUser) {
        $scope.currentUser = currentUser.data.user;
        $scope.currentUser.token = currentUser.data.token;
        $window.localStorage.setItem('com.yanda', currentUser.data.token);
        $scope.loginUser = {};
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.logout = function() {
    $scope.currentUser = {};
    $window.localStorage.removeItem('com.yanda');
  };

});