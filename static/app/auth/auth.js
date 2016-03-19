angular.module('genome.auth', [])

.controller('AuthController', function($scope, $rootScope, $location, $timeout, AuthFactory) {
  $scope.user = {};

  $rootScope.signOut = function() {
    // Remove cookies
    AuthFactory.signOut();
    // Delay redirect to /signin in case of cookie delays
    $timeout(function() {
      $location.path('/signin')
    }, 2000);
  };

  

})
  
 
.factory('AuthFactory', function($http) {



  var signOut = function() {
    // Remove cookies
  };

})