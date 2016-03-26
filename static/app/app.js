var app = angular.module('genome', [
  'genome.pool',
  'genome.self',
  'genome.relatives',
  'ngRoute',
  'ngCookies',
  'genome.d3Service',
  'genome.sideNav',
  'genome.auth',
  'genome.directive',
  'ngMaterial'
])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/pool'
    })
    .when('/signin', {
      templateUrl: '/',
      controller: 'AuthController'
    })
    .when('/signout', {
      templateUrl: '/templates/landing.html',
      authenticate: true
    })
    .when('/pool', {
      templateUrl: '/static/app/pool/pool.html',
      controller: 'PoolController',
      authenticate: true
    })
    .when('/self', {
      templateUrl: '/static/app/self/self.html',
      controller: 'SelfController',
      authenticate: true
    })
    .otherwise({
      redirectTo : '/signin'
    });
})
.run(function($rootScope, $location, $cookies){
  var isAuth = function () {
    // console.log("isAuth is being called, cookies:", $cookies);
    // Currently have an issue where we're getting the $cookies with the JWT token, but this function is looking for the specific user_profile_id in the cookie
    // We need to figure out how to do front-end decoding of JWT,
    return $cookies['token'];
  };

  $rootScope.$on('$routeChangeStart', function(evt, next, current){
    if(next.$$route && next.$$route.authenticate && ! isAuth()){
      $location.path('/signin');
    }
  });
});
