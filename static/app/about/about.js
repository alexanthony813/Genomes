angular.module('genome.about', [])

.controller('AboutController', function ($scope, $rootScope, $location) {
   var whichView = function() {
    $rootScope.view = $location.$$path;
  }
  whichView();

	$scope.images = [{
			name: 'Gar Lee',
	    pic: '../../../static/assets/gar.png'
	  },
	  {
	  	name: 'Peter Lollo',
	    pic: '../../static/assets/peter.png'
	  },
	  {
	  	name: 'Alex Anthony',
	    pic: '../../static/assets/alex.jpg'
	  },
	  {
	  	name: 'Chris Bassano',
	    pic: '../../static/assets/chris.jpg'
	  }];

})