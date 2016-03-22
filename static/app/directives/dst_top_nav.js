angular.module('genome.directive', [])

.directive('dstTopNav', function() {

  return {
    controller: function($scope, $cookies) {
      $scope.user_first_name = $cookies.user_first_name;
    },
    templateUrl: '../static/app/directives/dst_top_nav.html'
  };

});