// 'use strict';

describe('Routing', function () {
  var $route;

  beforeEach(function(){
    module('genome');

    inject(function ($injector) {
      // $routeProvider = $injector.get('$routeProvider');
      // $location = $injector.get('$location');
      // $routeParams = $injector.get('$routeParams');
      $route = $injector.get('$route');
    });
  });


  it('Should have /signin route, template, and controller', function () {
    expect($route.routes['/']).to.be.defined;
    expect($route.routes['/'].controller).to.equal('AuthController');
    expect($route.routes['/'].templateUrl).to.equal('/');
    // expect($route).to.exist;
  });
  
});
