angular.module('genome.footer', [])

.directive('dstFooter', function() {

  return {
    controller: function($scope, $cookies, $rootScope, $location, SelfFactory) {
      $scope.toAboutPage = function () {
        $location.path('/about');
      };
    },
    templateUrl: '../static/app/directives/dst_footer.html'
  };

});