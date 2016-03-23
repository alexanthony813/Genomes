angular.module('genome.directive', [])

.directive('dstTopNav', function() {

  return {
    controller: function($scope, $cookies, $rootScope, $location, SelfFactory) {
      $scope.user_first_name = $cookies.user_first_name;
      $scope.expand = false;

      $scope.toggleNavList = function (ev) {
        if (!(ev.type === 'mouseleave' && $scope.lastEventType === 'click')) {
            $scope.expand = !$scope.expand;
           }
         $scope.lastEventType = ev.type;
      };

      $scope.onpoolpage = true;
      $scope.onselfpage = false;

      $scope.getRelatives = function () {
        $scope.onpoolpage = true;
        $scope.onselfpage = false;
        $location.path('/pool');
      };

      $scope.getSelf = function () {
        $scope.onselfpage = true;
        $scope.onpoolpage = false;
        $location.path('/self');
      };
    },
    templateUrl: '../static/app/directives/dst_top_nav.html'
  };

});