var mod = angular.module('yanda.common.auth-service', [
]);

mod.factory('authService', ['$http', '$location', '$window', authService]);

function authService($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: user
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.yanda');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.yanda');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
}
