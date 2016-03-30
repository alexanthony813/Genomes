
describe('TreeController', function(){
  var $httpBackend, createController, $controller, $scope, $rootScope, $location, d3Service, Relatives;
  var myApp;

  beforeEach(function(){
    myApp = module('genome.tree', 'genome.relatives');

    module(function($provide) {
      $provide.service('d3Service', d3Service);
    });
  });


  afterEach(inject(function ($httpBackend) {
    $httpBackend.flush()
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');
    $scope = $rootScope.$new();
    Relatives = $injector.get('Relatives');
    // TreeService = $injector.get('TreeController')

    $controller = $injector.get('$controller');
    createController = function(){
      return $controller('TreeController', {
        $scope : $scope,
        $location : $location,
        d3Service : d3Service,
        Relatives : Relatives
      });
    };

    createController();
  }));

  it('Should do tests', function(){
    $httpBackend.whenGET('/api/relatives/').respond(200);
  });

});
