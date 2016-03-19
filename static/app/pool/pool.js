angular.module('genome.pool', [])
.controller('PoolController', function($scope, Relatives, $rootScope) {
  $scope.relatives = [];
  $rootScope.rels = [];


  $scope.getRelatives = function (){
    Relatives.getRelatives()
    .then(function(relatives) {
      console.log('The Relatives Object: ', relatives)
      $scope.relatives = relatives.data.relativeList;
      $rootScope.rels = relatives.data.relativeList;
    }, function(err) {
      console.error('Error retrieving relatives: ', err)
    })
  }
});