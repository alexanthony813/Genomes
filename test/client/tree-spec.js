
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
    $scope.getRelatives();

    $httpBackend.whenGET('/api/relatives/').respond(200, {"relativeList":[{"ancestry":"Northwestern Europe","birth_year":1977,"birthplace":"United States","email":null,"first_name":"Aodh","id":61,"last_name":"O'Donnell","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/sphWXl","relationship":"Brother","residence":"South Carolina","sex":"Male","similarity":0.25},{"ancestry":"Northwestern Europe","birth_year":1939,"birthplace":"United States","email":null,"first_name":"Wilder B.","id":62,"last_name":"O'Donnell","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/sphWXl","relationship":"Brother","residence":"Louisiana","sex":"Male","similarity":0.25},{"ancestry":"Northwestern Europe","birth_year":1944,"birthplace":"United States","email":null,"first_name":"Ruarc","id":63,"last_name":"O'Donnell","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/sphWXl","relationship":"1st Cousin","residence":"North Carolina","sex":"Male","similarity":0.12},{"ancestry":"Northwestern Europe","birth_year":1974,"birthplace":"United States","email":null,"first_name":"Maximus","id":64,"last_name":"Bundletreat","maternal_side":true,"paternal_side":false,"picture_url":"http://goo.gl/sphWXl","relationship":"1st Cousin","residence":"New Jersey","sex":"Male","similarity":0.125},{"ancestry":"Northwestern Europe","birth_year":1983,"birthplace":"United States","email":null,"first_name":"Wimberly","id":65,"last_name":"Carr-Fasheon","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/TdyBcc","relationship":"1st Cousin","residence":"California","sex":"Female","similarity":0.125},{"ancestry":"Northwestern Europe","birth_year":1983,"birthplace":"United States","email":null,"first_name":"Roberto","id":66,"last_name":"Carr-Fasheon","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/sphWXl","relationship":"1st Cousin","residence":"California","sex":"Male","similarity":0.125},{"ancestry":"Northwestern Europe","birth_year":1985,"birthplace":"Canada","email":null,"first_name":"Mary-Ann","id":67,"last_name":"Leroy","maternal_side":true,"paternal_side":false,"picture_url":"http://goo.gl/TdyBcc","relationship":"2nd Cousin","residence":"Canada","sex":"Female","similarity":0.06},{"ancestry":"Northwestern Europe","birth_year":1992,"birthplace":"Canada","email":null,"first_name":"Martavius","id":68,"last_name":"Leroy","maternal_side":true,"paternal_side":false,"picture_url":"http://goo.gl/sphWXl","relationship":"2nd Cousin","residence":"Canada","sex":"Male","similarity":0.06},{"ancestry":"Northwestern Europe","birth_year":1980,"birthplace":"United States","email":null,"first_name":"Alfred","id":69,"last_name":"Norris","maternal_side":true,"paternal_side":false,"picture_url":"http://goo.gl/sphWXl","relationship":"3rd Cousin","residence":"Washington","sex":"Male","similarity":0.045},{"ancestry":"Northwestern Europe","birth_year":1985,"birthplace":"United States","email":null,"first_name":"James","id":70,"last_name":"Norris","maternal_side":true,"paternal_side":false,"picture_url":"http://goo.gl/sphWXl","relationship":"3rd Cousin","residence":"Washington","sex":"Male","similarity":0.045},{"ancestry":"Northwestern Europe","birth_year":1980,"birthplace":"United States","email":null,"first_name":"Leonardo","id":71,"last_name":"Peachfuzz","maternal_side":true,"paternal_side":false,"picture_url":"http://goo.gl/sphWXl","relationship":"4th-6th Cousin","residence":"Georgia","sex":"Male","similarity":0.0128},{"ancestry":"Northwestern Europe","birth_year":1966,"birthplace":"United States","email":null,"first_name":"Quinci","id":72,"last_name":"Peachfuzz","maternal_side":true,"paternal_side":false,"picture_url":"http://goo.gl/TdyBcc","relationship":"4th-6th Cousin","residence":"Georgia","sex":"Female","similarity":0.0128},{"ancestry":"Northwestern Europe","birth_year":1955,"birthplace":"Europe","email":null,"first_name":"Juniper","id":73,"last_name":"Kinglsey","maternal_side":true,"paternal_side":false,"picture_url":"http://goo.gl/sphWXl","relationship":"4th Cousin","residence":"North Carolina","sex":"Male","similarity":0.0134},{"ancestry":"Northwestern Europe","birth_year":1978,"birthplace":"Canada","email":null,"first_name":"Casseopeia","id":74,"last_name":"Middlemist-Gilbralter","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/TdyBcc","relationship":"Distant Relative","residence":"North Carolina","sex":"Female","similarity":0.001},{"ancestry":"South African","birth_year":1969,"birthplace":"United States","email":null,"first_name":"Bartholomew","id":75,"last_name":"James","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/sphWXl","relationship":"Distant relative","residence":"California","sex":"Male","similarity":0.001},{"ancestry":"Russian","birth_year":1970,"birthplace":"Russia","email":null,"first_name":"Markov","id":76,"last_name":"Schpeal","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/sphWXl","relationship":"4th-6th Cousin","residence":"Russia","sex":"Male","similarity":0.0121},{"ancestry":"Northwestern Europe","birth_year":1995,"birthplace":"Europe","email":null,"first_name":"Kristen","id":77,"last_name":"Braile","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/TdyBcc","relationship":"4th Cousin","residence":"Europe","sex":"Female","similarity":0.0135},{"ancestry":"African-American","birth_year":1963,"birthplace":"United States","email":null,"first_name":"Michael","id":78,"last_name":"Ronaghan","maternal_side":true,"paternal_side":false,"picture_url":"http://goo.gl/sphWXl","relationship":"4th Cousin","residence":"New York","sex":"Male","similarity":0.0134},{"ancestry":"African-American","birth_year":1972,"birthplace":"United States","email":null,"first_name":"Chaz","id":79,"last_name":"Bryant","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/sphWXl","relationship":"4th Cousin","residence":"California","sex":"Male","similarity":0.0134},{"ancestry":"African-American","birth_year":1972,"birthplace":"United States","email":null,"first_name":"Wagyu","id":80,"last_name":"Bryant","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/sphWXl","relationship":"4th Cousin","residence":"California","sex":"Male","similarity":0.0134},{"ancestry":"Northwestern Europe","birth_year":1993,"birthplace":"United States","email":null,"first_name":"Selena","id":81,"last_name":"Groomez","maternal_side":true,"paternal_side":false,"picture_url":"http://goo.gl/TdyBcc","relationship":"3rd Cousin","residence":"Califonia","sex":"Female","similarity":0.0015},{"ancestry":"Northwestern Europe","birth_year":1950,"birthplace":"United States","email":null,"first_name":"Harold","id":82,"last_name":"Nikifor","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/sphWXl","relationship":"Distant relative","residence":"Texas","sex":"Male","similarity":0.001},{"ancestry":"Northwestern Europe","birth_year":1994,"birthplace":"Canada","email":null,"first_name":"Justina","id":83,"last_name":"Fever","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/TdyBcc","relationship":"3rd Cousin","residence":"California","sex":"Female","similarity":0.0015},{"ancestry":"African-American","birth_year":1950,"birthplace":"United States","email":null,"first_name":"Arash","id":84,"last_name":"Snowama","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/sphWXl","relationship":"Distant relative","residence":"Hawaii","sex":"Male","similarity":0.001},{"ancestry":"Northwestern Europe","birth_year":1978,"birthplace":"Canada","email":null,"first_name":"Andromeda","id":85,"last_name":"Middlemist-Gilbralter","maternal_side":false,"paternal_side":true,"picture_url":"http://goo.gl/TdyBcc","relationship":"Distant Relative","residence":"North Carolina","sex":"Female","similarity":0.002}]});
  });

});
