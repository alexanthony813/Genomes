angular.module('genome.directive', [])

.directive('dstTopNav', function() {

  return {
    controller: function($scope, $cookies, $rootScope, $location, SelfFactory) {
      $scope.user_first_name = $cookies.user_first_name;
      $scope.expand = false;
      $scope.target;

      $scope.toggleNavList = function (ev) {
        if (!(ev.type === 'mouseleave' && $scope.lastEventType === 'click')) {
            $scope.expand = !$scope.expand;
           }
         $scope.lastEventType = ev.type;
      };

      $scope.getRelatives = function () {
        $location.path('/pool');
      };

      $scope.getSelf = function () {
        // SelfFactory.getSnps($rootScope.user_profile_id).then(function (outcomes) {
        //   $rootScope.outcomes = outcomes;
        // });
        $location.path('/self');
      };
    },
    templateUrl: '../static/app/directives/dst_top_nav.html'
  };

});