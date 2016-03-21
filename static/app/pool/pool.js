angular.module('genome.pool', [])
.controller('PoolController', function($scope, d3Service, Relatives, $rootScope, $window) {
  $scope.relatives = [];
  $rootScope.rels = [];
  $scope.myData = [10,10,10,20];
  $scope.circles = [];
  var boardHeight = $window.innerHeight;
  var boardWidth = $window.innerWidth;
  var bubbles = [1,2,3];

  //pop up message displaying relative data when user clicks on a bubble
  var showRelative = function(bubble) {
    alert('You share ' + bubble.relative.similarity + '% of your DNA with ' + bubble.relative.first_name + bubble.relative.last_name);
  }

  //Grab the pool as a canvas for our bubbles
  var svg = d3.select('.pool').append('svg')
              .attr('width', boardWidth)
              .attr('height', boardHeight);

  //Create bubbles
  var createBubbles = function(circleData) {
    bubbles = svg.selectAll('circle')
                 .data(circleData)
                 .enter()
                 .append('circle')
                 .on('mouseover', function(){
                  d3.select(this).transition().attr('r', function(d) {return d.r * 2;})
                 })
                 .on('mouseout', function(){
                  d3.select(this).transition().attr('r', function(d){return d.r})
                 })
                 .on('click', function(bubble) { showRelative(bubble);})
                 .attr('class', 'enter')
                 .attr('cx', function(d){return d.cx + Math.random() * 1000;})
                 .attr('cy', function(d) {return d.cy + Math.random() * 1000;})
                 .attr('r', function(d) {return d.r;})
                 .style('fill', function() {
                   return 'rgb(' + parseInt(Math.random() * 255) + ','
                     + parseInt(Math.random() * 255) + ','
                     + parseInt(Math.random() * 255) + ')';
                 })
                 .transition().duration(1500)
                 .attr('cx', function(d) {
                   return d.cx;
                 }).attr('cy', function(d) {
                   return d.cy;
                 }).attr('r', function(d) {
                   return d.r;
                 })
  };

  //After grabbing relatives from the DB, create a bubbles array based on length of relatives array
  var initialize = function(){
    for (var i = 0; i <= $scope.relatives.length || 0; i++) {
      $scope.circles.push({
        cx: Math.random() * boardWidth,
        cy: Math.random() * boardHeight,
        r: Math.random() * 100,
        relative: $scope.relatives[i]
      });
    }
    createBubbles($scope.circles);
  };

 //Grab relatives from the database, then initialize bubbles
  $scope.getRelatives = function (){
    Relatives.getRelatives()
    //Can refactor to return the promise values within the relatives factory if so desired
    .then(function(relatives) {
      //Refactor? potentially redundant addition of relatives to $scope and $rootScope.
      $scope.relatives = relatives.data.relativeList;
      //Add relatives to rootScope to allow access within other controllers
      $rootScope.rels = relatives.data.relativeList;
      initialize();
    }, function(err) {
      console.error('Error retrieving relatives: ', err)
    })
  }
});

