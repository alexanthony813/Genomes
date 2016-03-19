angular.module('genome', ['ngRoute'])
.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: '../../templates/landing.html'
  })
});