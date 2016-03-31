var app = angular.module('genome', [
  'genome.treeService',
  'genome.tree',
  'genome.map',
  'genome.self',
  'genome.relatives',
  'ngRoute',
  'ngCookies',
  'genome.d3Service',
  'genome.sideNav',
  'genome.auth',
  'genome.directive',
  'genome.footer',
  'genome.about',
  'ngMaterial',
  'angular-intro'
])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/self'
    })
    .when('/signin', {
      templateUrl: '/',
      controller: 'AuthController'
    })
    .when('/signout', {
      templateUrl: '/templates/landing.html',
      authenticate: true
    })
    .when('/map', {
      templateUrl: '/static/app/map/map.html',
      controller: 'MapController',
      authenticate: true
    })
    .when('/self', {
      templateUrl: '/static/app/self/self.html',
      controller: 'SelfController',
      authenticate: true
    })
    .when('/about', {
      templateUrl: '/static/app/about/about.html',
      controller: 'AboutController',
      authenticate: true
    })
    .when('/tree', {
      templateUrl: '/static/app/tree/tree.html',
      controller: 'TreeController',
      authenticate: true
    })
    .otherwise({
      redirectTo : '/signin'
    });
})

.run(function($rootScope, $location, $cookies, AuthFactory){

  $rootScope.$on('$routeChangeStart', function(evt, next, current){
    if(next.$$route && next.$$route.authenticate && ! AuthFactory.isAuth()){
      $location.path('/signin');
    }
  });
});
