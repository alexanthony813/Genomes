angular.module('genome.auth', [])

.controller('AuthController', function($scope, $rootScope, $cookies, $location, $timeout, $window, AuthFactory) {
  $scope.user = {};

  $rootScope.signOut = function() {
    AuthFactory.signOut();
    
    $timeout(function() {
      $location.path('/signout');
    }, 400);
  };

  $scope.getUserProfileId = function () {
    $rootScope.user_profile_id = $cookies.user_profile_id;
  };

  $scope.getUserProfileId();
  
})
   
.factory('AuthFactory', function($http, $cookies) {

  var isAuth = function() {
    return !!$cookies.user_profile_id;
  };

  var signOut = function() {
    $cookies.user_profile_id = "";
  };

  return {
    signOut: signOut,
    isAuth: isAuth
  };
});