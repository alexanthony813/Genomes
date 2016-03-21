angular.module('genome.sideNav', [])

.directive('dstSideNav', function () {
	return {
		controller: function ($scope, $rootScope, $location, SelfFactory) {
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
				SelfFactory.getSnps($rootScope.user_profile_id);
				$location.path('/self');
			}
		},
		templateUrl: '../static/app/sidenav/sideNav.html'
	}
});