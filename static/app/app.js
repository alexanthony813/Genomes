angular.module('genome', ['genome.pool', 'ngRoute'])
.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/static/app/pool/pool.html',
    controller: 'PoolController'
  })
});