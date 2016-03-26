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
    return $cookies['user_profile_id'];
  };

  $rootScope.$on('$routeChangeStart', function(evt, next, current){
    if(next.$$route && next.$$route.authenticate && ! isAuth()){
      $location.path('/signin');
    }
  });
});
