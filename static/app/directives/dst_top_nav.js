angular.module('genome.directive', [])

.directive('dstTopNav', function() {

  return {
    controller: function($scope, $cookies, $rootScope, $location, SelfFactory) {
      $scope.user_first_name = $cookies.user_first_name;
      $scope.expand = false;

      $scope.ontreepage = $location.$$path === '/tree' ? true : false;
      $scope.onselfpage = $location.$$path === '/self' ? true : false;

      $scope.getRelatives = function () {
        $rootScope.curPage = '/tree';
        $scope.ontreepage = true;
        $scope.onselfpage = false;
        if($location.$$path === '/self'){
          $rootScope.transitionToPool();
        }
        $location.path('/tree')
      };

      $scope.getSelf = function () {
        $rootScope.curPage = '/self';
        $scope.onselfpage = true;
        $scope.ontreepage = false;
        if($rootScope.mapShowing){
          $rootScope.removeMap();
        }
        $location.path('/self');
      };
    },
    templateUrl: '../static/app/directives/dst_top_nav.html'
  };

});