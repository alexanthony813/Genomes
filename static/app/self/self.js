angular.module('genome.self', [])

.controller('SelfController', function ($scope, $rootScope, $location, SelfFactory) {
 	//Build out retreival functions to send out request on initialization for SNPs
 	//$scope.snps will hold each snp as the key, and a string of detailed information regarding each snp
 	$scope.snps = {};

 	$scope.getSnps = function () {
 		SelfFactory.getSnps('USER ID HERE');
 	}
  
  $scope.getSnps();

})

.factory('SelfFactory', function ($http) {

/** 
	* Used to retrieve information about SNPs pertaining to currently logged in user
**/
	var getSnps = function (userId) {
		return $http({
			method: 'POST',
			url: '/api/snpsdata',
			data: userId
		}).then(function (snps) {
			//do something with the snps retrieved here
		}).catch(function (err) {
			console.error('An error occured retreiving your SNPs ', err);
		});
	};

	return {
		getSnps: getSnps
	}

});
