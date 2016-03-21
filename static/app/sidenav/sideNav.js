angular.module('genome.sideNav', [])

.directive('dstSideNav', function () {
	return {
		controller: function ($scope) {
			$scope.expand = false;
			$scope.target;

			$scope.toggleSideNav = function (ev) {
				if (!(ev.type === 'mouseleave' && $scope.lastEventType === 'click')) {
            $scope.expand = !$scope.expand;
           }
         $scope.lastEventType = ev.type;
			}
		},
		templateUrl: '../static/app/sidenav/sideNav.html'
	}
});