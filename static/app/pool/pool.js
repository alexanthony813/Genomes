angular.module('genome.pool', [])
.controller('PoolController', function($scope, d3Service, Relatives, $rootScope, $window, $location
  ) {

  $scope.relatives = [];
  $rootScope.rels = [];
  $scope.myData = [10,10,10,20];
  $scope.circles = [];
  var boardHeight = $window.innerHeight;
  var boardWidth = $window.innerWidth;

  var whichView = function() {
    $rootScope.view = $location.$$path;
  }
  whichView();

  $scope.showMap = false;
  $rootScope.filterRegions = function() {
    $scope.showMap = !$scope.showMap;
  };

  //ng data map
  $scope.mapObject = {
    scope: 'world',
    options: {
      width: 1110,
      legendHeight: 60 // optionally set the padding for the legend
    },
    geographyConfig: {
      highlighBorderColor: '#EAA9A8',
      highlighBorderWidth: 2
    },
    fills: {
      'HIGH': '#CC4731',
      'MEDIUM': '#306596',
      'LOW': '#667FAF',
      'defaultFill': '#DDDDDD'
    },
  };

  //end ng data map
  $scope.popModal = {
    name: '',
    similarity: '',
    image: '',
    relationship: '',
    age: 0
  };

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  var width = 1000 - margin.left - margin.right;
  var height = 1000 - margin.top - margin.bottom;

  var padding = 5;

  var radius = d3.scale.sqrt().range([0, 12]);

  var colorScheme = ['#1abc9c', '#2ecc71', '#f1c40f', '#27ae60', '#3498db', '#9b59b6', '#2980b9','#8e44ad','#e67e22','#d35400','#e74c3c', '#c0392b', '#bdc3c7', '#f39c12', '#95a5a6'];

  //pop up message displaying relative data when user clicks on a bubble
  var showRelative = function(bubble) {
    $scope.popModal.name = bubble.relative.first_name + ' ' + bubble.relative.last_name;
    $scope.popModal.similarity = (bubble.relative.similarity*100).toFixed(2) + "% of your DNA";
    $scope.popModal.relationship = bubble.relative.relationship  || "Unknown";
    $scope.popModal.age = bubble.relative.birth_year ? (new Date().getFullYear() - bubble.relative.birth_year) : "Unknown";
    $scope.popModal.image = bubble.relative.picture_url || '../../../static/assets/hipDNA.png';
    $scope.popModal.ancestry = bubble.relative.ancestry || "Unknown";
    $scope.popModal.birthplace = bubble.relative.birthplace  || "Unknown";
  };

  //Grab the pool as a canvas for our bubbles
  var svg = d3.select('.pool').append("svg")
    .attr("width", boardWidth + margin.left + margin.right)
    .attr("height", boardHeight + margin.top + margin.bottom)

  //Create bubbles
  var createBubbles = function(circleData) {
    nodes = $scope.circles;
    //Add d3 force effect to layout
    var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(0)
      .charge(0)
      .on("tick", tick)
      .start();
    
    //define data for the circles
    var elem = svg.selectAll('g')
    .data(nodes)

    //create and place the blocks containing the circle and the text
    var elemEnter = elem.enter().append('g') //.call(force.drag)
 

    //create the circle for each block
    var circle = elemEnter.append("circle")
      .on('mouseover', function(d){
        // Get this bubble's x/y values, then augment for the tooltip 
        // This will allow the tool tip to be centered in the middle of the bubble
        var xPosition = parseFloat(d3.select(this).attr("cx"));
        var yPosition = parseFloat(d3.select(this).attr("cy"));

        var similarity = d3.select(this)[0][0].__data__.relative.similarity * 100;
        // svg.append("text")
        //   .attr("id", "tooltip")
        //   .attr("x", xPosition)
        //   .attr("y", yPosition)
        //   .attr("text-anchor", "middle")
        //   .attr("font-family", "sans-serif")
        //   .attr("font-size", "13px")
        //   .attr("font-weight", "bold")
        //   .attr("fill", "black")
        //   .attr("pointer-events", "none")
        //   .text(similarity.toFixed(2) + "%");


        d3.select(this)
          .attr("opacity", ".7");

      })
      .on('mouseout', function(){
        d3.select('#tooltip').remove();
        d3.select(this)
          .attr("opacity", "1");
      })
      .on('click', function(bubble) {
        $scope.$apply(
          showRelative(bubble)
        );
      })
      .attr('z-index', '1')
      .attr("data-target", "#myModal")
      .attr("data-toggle", "modal")
      .attr("r", function (d) {
          return d.radius;
      })
      .style('fill', function(d) {
         return d.color;
       })

      // .call(force.drag);
    //END APPEND CIRCLE

    //append text to the circles after they are created
    setTimeout(function(){
    elemEnter.append('text')
      .attr('x', function(g){
        var circle = d3.select(this)[0][0].previousSibling
        return d3.select(circle).attr('cx')
      })
      .attr('y', function(g){
        var circle = d3.select(this)[0][0].previousSibling
        return d3.select(circle).attr('cy')
      })
      .attr('class', 'relativeText')
      .text(function(d){
        return 'x'
      })
      .call(force.drag)
    }, 1000)

    //Control bubble entry onto DOM and magnetic resistance to each other
    function tick(e) {
      circle.each(gravity(0.8 * e.alpha))
      .each(collide(0.5))
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });
    }

    // Move nodes toward cluster focus.
    function gravity(alpha) {
      return function (d) {
        d.y += (d.cy - d.y) * alpha;
        d.x += (d.cx - d.x) * alpha;
      };
    }

    // Resolve collisions between nodes.
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function (d) {
        var r = d.radius + radius.domain()[1] + padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }
  };


  //After grabbing relatives from the DB, create a bubbles array based on length of relatives array
  var initialize = function() {

    //set up range of values in similarity between all relatives
    var range = [];
    $scope.relatives.map(function (relative) {
      range.push(relative.similarity);
    }).sort(function (a, b) {
      return b - a; 
    });

    for (var i = 0; i < $scope.relatives.length || 0; i++) {

      var similarity = $scope.relatives[i].similarity;

      var similarRange = (range[0] - range[range.length-1]);

      if (similarRange > 0 && similarRange < 0.2) {
        if (similarity < 0.01){
          similarity = 0.03;
        } else if (similarity > 0.01 && similarity < 0.012) {
          similarity = 0.035;
        } else if (similarity >= 0.012 && similarity < 0.015) {
          similarity = 0.04;
        } else if (similarity >= 0.015 && similarity < 0.02) {
          similarity = 0.05;
        } else if (similarity >= 0.02 && similarity < 0.025) {
          similarity = 0.055;
        } else if (similarity >= 0.025 && similarity < 0.04) {
          similarity = 0.06;
        } else if (similarity >= 0.04 && similarity < 0.049) {
          similarity = 0.065;
        } else if (similarity >= 0.05) {
          similarity = 0.07;
        }
      }

      if (similarRange >= 0.2 && similarRange < 0.5) {
        if (similarity < 0.01){
          similarity = 0.02;
        } else if (similarity > 0.01 && similarity < 0.015) {
          similarity = 0.025;
        } else if (similarity > 0.015 && similarity < 0.02) {
          similarity = 0.03;
        } else if (similarity > 0.02 && similarity < 0.025) {
          similarity = 0.033;
        } else if (similarity >= 0.025 && similarity < 0.035) {
          similarity = 0.037;
        } else if (similarity >= 0.035 && similarity < 0.05) {
          similarity = 0.041;
        } else if (similarity >= 0.05 && similarity < 0.065) {
          similarity = 0.045;
        } else if (similarity >= 0.065 && similarity < 0.08) {
          similarity = 0.05;
        } else if (similarity >= 0.08 && similarity < 0.09) {
          similarity = 0.055;
        } else if (similarity > 0.1 && similarity < 0.15) {
          similarity = 0.06;
        } else if (similarity > 0.15 && similarity < 0.2) {
          similarity = 0.065;
        } else if (similarity >= 0.2) {
          similarity = 0.07;
        }
      }

      $scope.circles.push({
        cx: boardWidth/2,
        cy: boardHeight/2,
        color: colorScheme[Math.floor(Math.random() * colorScheme.length)],
        radius: similarity * 1000,
        relative: $scope.relatives[i]
      });
    }
    createBubbles($scope.circles);
  };


 //Grab relatives from the database, then initialize bubbles
  $scope.getRelatives = function() {
    Relatives.getRelatives()
    //Can refactor to return the promise values within the relatives factory if so desired
    .then(function(relatives) {
      //Refactor? potentially redundant addition of relatives to $scope and $rootScope.
      $scope.relatives = relatives.data.relativeList;
      //Add relatives to rootScope to allow access within other controllers
      $rootScope.rels = relatives.data.relativeList;
      initialize();
    }, function(err) {
      console.error('Error retrieving relatives: ', err);
    });
  };
  //Initialize the page with a call to getRelatives
  $scope.getRelatives();

  $scope.$watch(function(){
    console.log("HIIIIIIIIII")
    var text = d3.selectAll('g').selectAll('text')
                .attr('transform', 'translate(50,50)')    
    // .attr('transform', function(d){
    //   return ['translate(',d.x, ',', d.y')']
    // })
  })
});
