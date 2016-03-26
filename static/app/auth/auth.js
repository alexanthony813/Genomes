angular.module('genome.auth', ['ngCookies', 'ngRoute'])

.controller('AuthController', function($http, $scope, $rootScope, $cookies, $location, $rootElement, $timeout, $window, AuthFactory) {
  $scope.user = {};

  $rootScope.signOut = function() {
    AuthFactory.signOut();

  };

  // $scope.getUserProfileId = function () {
  //   $rootScope.user_profile_id = $cookies.user_profile_id;
  // };

  // $scope.getUserProfileId();

})

.factory('AuthFactory', function($http, $cookies, $location) {

  var signOut = function() {
    delete $cookies['token'];
    window.location.href = '/';
  };

  return {
    signOut: signOut,
    isAuth: isAuth
  };
});