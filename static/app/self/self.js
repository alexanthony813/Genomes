angular.module('genome.self', [])
.controller('SelfController', function ($scope, $rootScope, $cookies, $location, SelfFactory, d3Service) {
  
  $scope.outcomelist = $rootScope.outcomes;

    /* The 'FILLS' block will determine the availability of colors, balls and lines
     * and what quantity and other attributes the d3 plot should contain */
  var fills = ['#E74C3C', '#3498DB', '#2ECC71'],
    h = 800,
    w = 150,
    numX = 20,
    numY = 10,
    speed = 0.01,
    torsion = 0.2,
    x = d3.scale.linear().range([20, w - 20]),
    y = d3.scale.linear().range([h, 20]),
    z = d3.scale.linear().range([20, 5]);
      /** 
        * This block will append the built svg elements to the "body" of the HTML
      **/
  var svg = d3.select(".dnahelixcontainer")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
  /** Appends the inner SVG to a larger SVG container **/

  svg.append("DNAHelix")
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "white");
  var container = svg.append("g");
  var counter = 0;
  function generateData() {
    counter++;
    var data = d3.range(numX).map(function (d) {
        var t = d * torsion - speed * counter;
          return [{ x: Math.cos(t),
                    y: d,
                    z: Math.sin(t)
                  },
                  { x: Math.cos(t - Math.PI),
                    y: d,
                    z: Math.sin(t - Math.PI)
                  }];
        });
      var flat = _.flatten(data);
      x.domain(d3.extent(flat, function(d){ return d.x; }));
      y.domain(d3.extent(flat, function(d){ return d.y; }));
      z.domain(d3.extent(flat, function(d){ return d.z; }));
      return data;
  }
  function draw () {
    var cont = container.selectAll("g").data(generateData());
    cont.exit().remove();
    var enter = cont.enter()
      .append("g")
      .each(function (d, index) {
          d3.select(this)
            .selectAll("circle")
            .data(d)
            .enter()
            .append("circle")
            .attr("fill", "black")
            .on("click", function () {
                console.log('clicking on a ball!!!');
              });
          d3.select(this).append('line')
              .attr("stroke", function (d, i) {
                return fills[index%3];
              })
              .attr("stroke-width", 2);
          });

        cont.each(function (d, index) {
          var inverted = (d[0].y < d[1].x) ? 1 : -1;
          d3.select(this)
            .selectAll("circle")
            .data(d)
            .attr("cx", function (d) { return x(d.x); })
            .attr("cy", function (d) { return y(d.y); })
            .attr("r",  function (d) { return z(d.z); })
            .attr("fill-opacity", function (d) { return z(d.z) / 10;})
            .attr("fill", function (d, i) { return fills[index%3]; })
            .on("mouseover", function (d, i) {
              d3.select(this).transition()
              .attr('fill', function (d) {
                console.log('d: ', d, 'i: ', i);
              })
              .attr('fill-opacity', function (d) {
                return z(d.z) / 1;
              })
              .attr('stroke-opacity', 0.5);
            });
          d3.select(this)
              .select('line')
              .attr("x2", x(d[0].x) + inverted * z(d[0].z))
              .attr("x1", x(d[1].x) - inverted * z(d[1].z))
              .attr("y2", y(d[0].y))
              .attr("y1", y(d[0].y));
          });
      }
    setInterval(draw, 25);
})
.factory('SelfFactory', function ($http) {
/** 
  * Used to retrieve information about SNPs pertaining to currently logged in user
**/
  var getSnps = function (userId) {
    return $http({
      method: 'POST',
      url: '/api/getsnps',
      data: userId
    }).then(function (snps) {
      return snps.data.outcomes;
    }).catch(function (err) {
      console.error('An error occured retreiving your SNPs ', err);
    });
  };
  return {
    getSnps: getSnps
  };
});
