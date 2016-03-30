angular.module('genome.directive', [])

.directive('dstTopNav', function() {

  return {
    controller: function($scope, $cookies, $rootScope, $location, SelfFactory) {
      //Refactor all pool variables to tree variables
      $scope.user_first_name = $cookies.user_first_name;
      $scope.expand = false;

      $scope.onpoolpage = $location.$$path === '/tree' ? true : false;
      $scope.onselfpage = $location.$$path === '/self' ? true : false;

      $scope.getRelatives = function () {
        $rootScope.curPage = '/tree';
        $scope.onpoolpage = true;
        $scope.onselfpage = false;
        if($location.$$path === '/self'){
          $rootScope.transitionToPool();
        }
        $location.path('/tree')
      };

      $scope.getSelf = function () {
        $rootScope.curPage = '/self';
        $scope.onselfpage = true;
        $scope.onpoolpage = false;
        $rootScope.removeMap();
        $location.path('/self');
      };
    },
    templateUrl: '../static/app/directives/dst_top_nav.html'
  };

});