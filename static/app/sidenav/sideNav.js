angular.module('genome.sideNav', [])

.directive('dstSideNav', function () {
  return {
    controller: function ($scope, $rootScope, $location, SelfFactory) {
      $scope.expand = false;
      $scope.target;
      $scope.view;
      view = {
        '/' : 'pool',
        '/pool': 'pool',
        'self': 'self'
      }

      var whichView = function() {
        $scope.view = view[$location.$$path]
      };
      console.log('scope.view', $location);
      whichView();

      $scope.toggleNavList = function (ev) {
        if (!(ev.type === 'mouseleave' && $scope.lastEventType === 'click')) {
            $scope.expand = !$scope.expand;
           }
         $scope.lastEventType = ev.type;
      };
      $scope.filterRegions = function () {
        $rootScope.filterRegions();
      };
    },
    templateUrl: '../static/app/sidenav/sideNav.html'
  };
});