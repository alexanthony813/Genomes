angular.module('genome', ['genome.pool', 'genome.self', 'genome.relatives', 'ngRoute'])
.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/static/app/pool/pool.html',
    controller: 'PoolController'
  })
});