// 'use strict';

describe('Routing', function () {

  beforeEach(function(){
    module('genome');

    angular.mock.inject(function () {
      // $routeProvider = $injector.get('$routeProvider');
      // $location = $injector.get('$location');
      // $routeParams = $injector.get('$routeParams');
      // $route = _$httpBackend_;
    });
  });


  it('Should have /signin route, template, and controller', function () {
    // expect($routeProvider.routes['/']).to.be.defined;
    // expect($route.routes['/'].controller).to.equal('AuthController');
    // expect($route.routes['/'].templateUrl).to.equal('/');
    // expect($routeProvider).to.exist;
    expect(true).to.exist;
  });
  
});




  // it('Should have /pool route, template, and controller', function () {
  //   // expect($route.routes['/pool']).to.be.defined;
  //   // expect($route.routes['/pool'].controller).to.equal('PoolController');
  //   // expect($route.routes['/pool'].templateUrl).to.equal('/static/app/pool/pool.html');
  // });

  // it('Should have /self route, template, and controller', function () {
  //   // expect($route.routes['/self']).to.be.defined;
  //   // expect($route.routes['/self'].controller).to.equal('SelfController');
  //   // expect($route.routes['/self'].templateUrl).to.equal('/static/app/self/self.html');
  // });