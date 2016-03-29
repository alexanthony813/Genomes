angular.module('genome.directive', [])

.directive('dstTopNav', function() {

  return {
    controller: function($scope, $cookies, $rootScope, $location, SelfFactory) {
      $scope.user_first_name = $cookies.user_first_name;
      $scope.expand = false;

      $scope.onpoolpage = $location.$$path === '/pool' ? true : false;
      $scope.onselfpage = $location.$$path === '/self' ? true : false;

      $scope.getRelatives = function () {
        $rootScope.transitionToPool();
        $scope.onpoolpage = true;
        $scope.onselfpage = false;
      };

      $scope.getSelf = function () {
        $scope.onselfpage = true;
        $scope.onpoolpage = false;
        $rootScope.removeMap();
        $location.path('/self');
      };
    },
    templateUrl: '../static/app/directives/dst_top_nav.html'
  };

});