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
      };
      $scope.filterRegions = function () {
        $rootScope.filterRegions();
      };

    },
    templateUrl: '../static/app/sidenav/sideNav.html'
  };
});


// $rootScope.IntroOptions1 = {
//       steps:[
//       {
//           element: document.querySelector('#test3'),
//           intro: "Welcome to the Family Pool page. Each bubble represents a relative and is sized based on percentage of shared DNA. Click on the bubbles for more information."
//       }
//       // {
//       //     element: document.querySelectorAll('#step2')[0],
//       //     intro: "<strong>You</strong> can also <em>include</em> HTML",
//       //     position: 'right'
//       // },
//       // {
//       //     element: '#step3',
//       //     intro: 'More features, more fun.',
//       //     position: 'left'
//       // },
//       // {
//       //     element: '#step4',
//       //     intro: "Another step.",
//       //     position: 'bottom'
//       // },
//       // {
//       //     element: '#step5',
//       //     intro: 'Get it, use it.'
//       // }
//       ],
//       showStepNumbers: false,
//       exitOnOverlayClick: true,
//       exitOnEsc:true,
//       nextLabel: '<strong>NEXT!</strong>',
//       prevLabel: '<span style="color:green">Previous</span>',
//       skipLabel: 'Exit',
//       doneLabel: 'Thanks'
//   };