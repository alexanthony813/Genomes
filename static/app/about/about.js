angular.module('genome.about', [])

.controller('AboutController', function ($scope, $rootScope, $location) {
   var whichView = function() {
    $rootScope.view = $location.$$path;
  }
  whichView();

	$scope.images = [{
			name: 'Gar Lee',
	    pic: '../../../static/assets/gar.png',
	    link: 'https://github.com/LeeGar'
	  },
	  {
	  	name: 'Peter Lollo',
	    pic: '../../static/assets/peterGit.jpeg',
	    link: 'https://github.com/peterlollo'
	  },
	  {
	  	name: 'Alex Anthony',
	    pic: '../../static/assets/alexGit.jpeg',
	    link: 'https://github.com/alexanthony813'
	  },
	  {
	  	name: 'Chris Bassano',
	    pic: '../../static/assets/chrisGit.jpeg',
	    link: 'https://github.com/christo4b'
	  }];

})