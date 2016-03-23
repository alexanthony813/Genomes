var app = angular.module('genome', [
  'datamaps',
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
      templateUrl: '/static/app/pool/pool.html',
      controller: 'PoolController',
      authenticate: true
    })
    .when('/signin', {
      templateUrl: '/',
      controller: 'AuthController',
    })
    .when('/signout', {
      templateUrl: '/static/app/auth/signout.html',
      controller: 'AuthController',
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








