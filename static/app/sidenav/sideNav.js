angular.module('genome.sideNav', [])

.directive('dstSideNav', function () {
	return {
		controller: function ($scope, $rootScope, $location) {
			$scope.expand = false;
			$scope.target;

			$scope.toggleNavList = function (ev) {
				if (!(ev.type === 'mouseleave' && $scope.lastEventType === 'click')) {
            $scope.expand = !$scope.expand;
           }
         $scope.lastEventType = ev.type;
			}

			$scope.getRelatives = function () {
				$location.path('/pool');
			}

			$scope.getSelf = function () {
				$location.path('/self');
				$rootScope.getSnps();
			}
		},
		templateUrl: '../static/app/sidenav/sideNav.html'
	}
});