angular.module('genome.self', [])
.controller('SelfController', function ($scope, $cookies, $location, SelfFactory, d3Service, $rootScope) {

  $scope.outcomes = $scope.outcomes || [];
  $scope.current = {};

   var whichView = function() {
    $rootScope.view = $location.$$path;
  }
  whichView();

  $rootScope.removeHelix = function () {
    d3.select("svg").remove();
  }

    /* The 'FILLS' block will determine the availability of colors, balls and lines
     * and what quantity and other attributes the d3 plot should contain */
  var fills = ['#E74C3C', '#3498DB', '#2ECC71'],
    h = 800,
    w = 150,
    numX = 0,
    numY = 0,
    speed = 0.01,
    torsion = 0.3,
    x = d3.scale.linear().range([20, w - 20]),
    y = d3.scale.linear().range([h - 100, 20]),
    z = d3.scale.linear().range([18, 5]);
      /**
        * This block will append the built svg elements to the "body" of the HTML
      **/
  var svg = d3.select(".BodyContainer")
      .append("svg")
      .attr("id", "helix")
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
    // Creating a range of numX (set to outcomes length) and then map
    var data = d3.range(numX).map(function (d, i) {
        var t = d * torsion - speed * counter;
          return [{ x: Math.cos(t),
                    y: d,
                    z: Math.sin(t),
                    rsid: $scope.outcomes[d].rsid,
                    pair: $scope.outcomes[d].pair,
                    outcome: $scope.outcomes[d].outcome
                  },
                  { x: Math.cos(t - Math.PI),
                    y: d,
                    z: Math.sin(t - Math.PI),
                    rsid: $scope.outcomes[d].rsid,
                    pair: $scope.outcomes[d].pair,
                    outcome: $scope.outcomes[d].outcome
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
            .attr("rsid", function(d){ return d.rsid; })
            .attr("pair", function(d){ return d.pair; })
            .attr("outcome", function(d){ return d.outcome; })
            .on("mouseover", function (d, i) {
              // Using $scope.$apply to force angular to rerender once the scope has been updated with the current snp
              $scope.$apply($scope.current = { rsid: d.rsid, pair: d.pair, outcome: d.outcome });
            });
          d3.select(this)
              .select('line')
              .attr("x2", x(d[0].x) + inverted * z(d[0].z))
              .attr("x1", x(d[1].x) - inverted * z(d[1].z))
              .attr("y2", y(d[0].y))
              .attr("y1", y(d[0].y));
          });
      }

      SelfFactory.getSnps($cookies.user_profile_id).then(function (outcomes) {
        for (var key in outcomes) {
          $scope.outcomes.push(outcomes[key]);
        }
        $scope.current = {
          rsid: 'rs1337',
          pair: 'GG',
          outcome: 'A very interesting fact'
        },
        numX = $scope.outcomes.length;
        setInterval(draw, 25);
      });

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
