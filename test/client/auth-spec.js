// 'use strict';

// describe('AuthController', function () {
//   var $scope, $rootScope, $cookies, $location, $timeout, $window, AuthFactory, createAuthController;

//   // before each test, create genome module, then create an auth controller to test

//   beforeEach(module('genome'));

//   beforeEach(inject(function($injector) {
    
//     $rootScope = $injector.get('$rootScope');
//     $cookies = $injector.get('$cookies');
//     $location = $injector.get('$location');
//     $window = $injector.get('$window');
//     $timeout = $injector.get('$timeout');
//     AuthFactory = $injector.get('AuthFactory');
//     $scope = $rootScope.$new();

//     var $controller = $injector.get('$controller');

//     createAuthController = function () {
//       return $controller('AuthController', {
//         $scope: $scope,
//         $window: $window,
//         $location: $location,
//         AuthFactory: AuthFactory
//       });
//     };

//     createAuthController();
//   }));



// });