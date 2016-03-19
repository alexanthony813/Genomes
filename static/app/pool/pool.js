angular.module('genome.pool', [])
.controller('PoolController', function($scope, Relatives, $rootScope) {
  $scope.relatives = [];
  $rootScope.rels = [];


  $scope.getRelatives = function (){
    Relatives.getRelatives()
    //Can refactor to return the promise values within the relatives factory if so desired
    .then(function(relatives) {
      //Refactor? potentially redundant addition of relatives to $scope and $rootScope.
      $scope.relatives = relatives.data.relativeList;
      //Add relatives to rootScope to allow access within other controllers
      $rootScope.rels = relatives.data.relativeList;
    }, function(err) {
      console.error('Error retrieving relatives: ', err)
    })
  }
});