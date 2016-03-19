angular.module('genome', ['genome.pool', 'genome.self', 'genome.relatives', 'ngRoute', 'genome.d3Service'])
.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/static/app/pool/pool.html',
    controller: 'PoolController'
  })
  .when('/self/', {
    templateUrl : '/static/app/self/self.html',
    controller : 'SelfController'
  })
  .otherwise({
    redirectTo : '/'
  });
});
