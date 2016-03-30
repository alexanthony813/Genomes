angular.module('genome.sideNav', [])

.directive('dstSideNav', function () {
  return {
    controller: function ($scope, $rootScope, $location, SelfFactory) {
      $scope.expand = false;
      $scope.target;
    },
    templateUrl: '../static/app/sidenav/sideNav.html'
  };
});