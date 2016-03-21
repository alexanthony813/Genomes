angular.module('genome.self', [])

.controller('SelfController', function ($scope, $rootScope, $location) {
  
  $scope.stuff = [1,2,3,4];
})

.factory('selfFactory', function ($http) {
	
});
