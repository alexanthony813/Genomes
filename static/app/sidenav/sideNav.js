angular.module('genome.sideNav', [])

.directive('dstSideNav', function () {
	return {

		controller: function ($scope, Auth) {
			$scope.expand = false;
			$scope.target;

			$scope.toggleSideNav = function (ev) {
				if (!(ev.type === 'mouseleave' && $scope.lastEventType === 'click')) {
            $scope.expand = !$scope.expand;
           }
         $scope.lastEventType = ev.type;
				}
		 }
	}
});