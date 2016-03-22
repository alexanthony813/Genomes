angular.module('genome.sideNav', [])

.directive('dstSideNav', function () {
	return {
		controller: function ($scope, $rootScope, $location, SelfFactory) {
			$scope.expand = false;
			$scope.target;

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