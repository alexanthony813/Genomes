angular.module('genome.tree', ['genome.treeService'])
.controller('TreeController', function(TreeService, $scope, d3Service, Relatives, $rootScope, $window, $location) {

  var whichView = function() {
    $rootScope.view = $location.$$path;
  };

  whichView();

  $scope.showTree = function(){
    $rootScope.curPage = '/tree';
    $location.path('/tree/');
  };

  $scope.showMap = function(){
    $rootScope.curPage = '/map';
    $location.path('/map/');
  };

  $scope.popModal = {
    name: '',
    similarity: '',
    image: '',
    relationship: '',
    age: 0
  };

  var showRelative = function(bubble) {
    $scope.popModal.name = bubble.first_name + ' ' + bubble.last_name;
    $scope.popModal.similarity = (bubble.similarity*100).toFixed(2) + "% of your DNA";
    $scope.popModal.relationship = bubble.relationship  || "Unknown";
    $scope.popModal.age = bubble.birth_year ? (new Date().getFullYear() - bubble.birth_year) : "Unknown";
    $scope.popModal.image = bubble.picture_url || '../../../static/assets/hipDNA.png';
    $scope.popModal.ancestry = bubble.ancestry || "Unknown";
    $scope.popModal.birthplace = bubble.birthplace  || "Unknown";
  };

  $rootScope.IntroOptions = {
      steps:[{
          intro: "Welcome to your Family Tree! Every bubble represents one of your relatives. Click the bubbles for more info!"
        },
        {
          element: document.querySelector('#path2'),
          intro: "See a map of your relatives' birth country by clicking on this button.",
          position: 'right'
        }
      ],
      showStepNumbers: false,
      exitOnOverlayClick: true,
      exitOnEsc:true,
      nextLabel: '<strong><span style="color:green">Next</span></strong>',
      prevLabel: '<span style="color:red">Previous</span>',
      skipLabel: 'Exit',
      doneLabel: 'Thanks'
  };

////////////TREE STARTS HERE///////////////
  var boardHeight = $window.innerHeight;
  var boardWidth = $window.innerWidth;
  var relativeTree = {
                       'relationship': 'me',
                       'similarity' : 1,
                       'children': [
                        {
                         'relationship': 'maternal_side',
                         'similarity': 0.3,
                         'children': []
                        },
                        {
                          'relationship' : 'paternal_side',
                          'similarity': 0.3,
                          'children' : []
                        }
                        ]
                      };

  var root = relativeTree;

  var width = boardWidth;
  var height = boardHeight;

  var padding = 5;

  var radius = 6;

  //Add d3 force effect to layout
  var force = d3.layout.force()
    .linkDistance(70)
    .charge(-120)
    .gravity(0.0)
    // .size([width, height])
    .on('tick', tick)
    .start();

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  //Grab the tree as a canvas for our bubbles
  var svg = d3.select('.tree').append('svg')
    .attr('id', 'treeSVG')
    .attr('width', boardWidth - margin.left - margin.right)
    .attr('height', boardHeight - margin.top - margin.bottom);
  var link = svg.selectAll('.link');
  var node = svg.selectAll('.node');

 //Grab relatives from the database, then initialize bubbles
  $scope.getRelatives = function() {
    Relatives.getRelatives()
    //Can refactor to return the promise values within the relatives factory if so desired
    .then(function(relatives) {
      //Refactor? potentially redundant addition of relatives to $scope and $rootScope.
      $scope.relatives = relatives.data.relativeList;
      //Add relatives to rootScope to allow access within other controllers
      $rootScope.rels = relatives.data.relativeList;
      createTree($scope.relatives);
      update();
      $scope.loaded = true;
    }, function(err) {
      console.error('Error retrieving relatives: ', err);
    });
  };
  //Initialize the page with a call to getRelatives
  $scope.getRelatives();


  var family = {};
  function createTree(relatives){
    relatives.forEach(function(relative){
      relative.children = [];
      relative.name = relative.relationship;
    });
    family.paternalCloseRelatives = relatives.filter(function(relative){
      return !relative.relationship.match('Cousin') && !relative.relationship.match('Distant') && relative.paternal_side
    });
    family.maternalCloseRelatives = relatives.filter(function(relative){
      return !relative.relationship.match('Cousin') && !relative.relationship.match('Distant') && relative.maternal_side
    });
    family.paternalFirstCousins = relatives.filter(function(relative){
      return relative.relationship.match('1st Cousin') && relative.paternal_side
    });
    family.maternalFirstCousins = relatives.filter(function(relative){
      return relative.relationship.match('1st Cousin') && relative.maternal_side
    });
    family.paternalOtherCousins = relatives.filter(function(relative){
      return relative.relationship.match('2nd Cousin') && relative.relationship.match('3rd Cousin') && relative.paternal_side
    });
    family.maternalOtherCousins = relatives.filter(function(relative){
      return relative.relationship.match('2nd Cousin') && relative.relationship.match('3rd Cousin') && relative.maternal_side;
    });
    family.paternalDistantRelatives = relatives.filter(function(relative){
      return checkIfDistant(relative) && relative.paternal_side;
    });
    family.maternalDistantRelatives = relatives.filter(function(relative){
      return checkIfDistant(relative) && relative.maternal_side;
    });


    for(var prop in family){
      if(family[prop].length > 0){
        var which_side = (prop.search('maternal') === 0 ) ? 'maternal' : 'paternal';
        insertRelatives(family[prop], which_side)
      }
    }
    function checkIfDistant(relative){
      return family.paternalCloseRelatives.indexOf(relative) < 0 && family.maternalCloseRelatives.indexOf(relative) < 0 && family.paternalFirstCousins.indexOf(relative) < 0 &&
      family.maternalFirstCousins.indexOf(relative) < 0 && family.paternalOtherCousins.indexOf(relative) < 0 && family.maternalOtherCousins.indexOf(relative) < 0
    }
  }


  function insertRelatives(relatives, side){
    //use recursion to find whichever level to go to
    var maternalBranch = relativeTree['children'][0];
    var paternalBranch = relativeTree['children'][1];

    if(side === 'maternal'){
      //start recursion here
      recursiveAdd(maternalBranch, relatives);
    } else {
      //start recursion here
      recursiveAdd(paternalBranch, relatives);
    }

    function recursiveAdd(parentNode, newNodes){
      if(parentNode.children.length === 0){
        //potential issue with slicing
        var first = (newNodes.length > 1) ? newNodes.slice(0, 2) : newNodes.slice(0, 1);
        first.forEach(function(node){
          parentNode.children.push(node);
        });
      } else {
        var firstRandomIndex = Math.floor(Math.random() * parentNode.children.length);
        var secondRandomIndex = Math.floor(Math.random() * parentNode.children.length);
        var half_length = Math.ceil(newNodes.length / 2);
        var leftSide = newNodes.slice(0,half_length);
        var rightSide = newNodes.slice(half_length,  newNodes.length);
        recursiveAdd(parentNode.children[firstRandomIndex], leftSide);
        recursiveAdd(parentNode.children[secondRandomIndex], rightSide);
      }

    }
  }

  function update(){
      var nodes = TreeService.flatten(relativeTree);
      nodes.forEach(function(node){
        if(node.x === undefined){
          node.x = width / 10;
          node.radius = 30;
        }
        if(node.y === undefined){
          node.y = height;
        }
        if(node.relationship === 'me'){
          node.radius = 40;
          node.x = width / 3;
          node.y = 100;
          node.fixed = true;
        } else if(node.relationship === 'paternal_side'){
          node.x = width / 3 + 200;
          node.y = 300;
          node.radius = 50;
        } else if(node.relationship === 'maternal_side'){
          node.x = width / 3 - 200;
          node.y = 300;
          node.radius = 50;
        }
      });

      var tree = d3.layout.tree();
      var links = tree.links(nodes);

      // Restart the force layout.
      force
          .nodes(nodes)
          .links(links)
          .linkStrength(1)
          .linkDistance(90)
          .start();

      link = link.data(links, function(d) { return d.target.id; });

      link.exit().remove();

      link.enter().insert('line', '.node')
          .attr('class', 'link');

      // Update nodes.
      node = node.data(nodes, function(d) { return d.id; });

      node.exit().remove();

      var nodeEnter = node.enter().append('g')
          .attr('padding', 50)
          .attr('class', '.node')

      nodeEnter.append('circle')
          .attr('fill', function(d){
            if(d.maternal_side || d.relationship === 'maternal_side'){
              return '#F9690E';
            } else if(d.paternal_side || d.relationship === 'paternal_side'){
              return '#BF55EC';
            } else {
              return '#5C97BF'
            }
          })
          .attr('r', function(bubble) {
           return bubble.radius + 10;
          })
          .on('mouseover', function(bubble){
            var circle = d3.select(this);
            circle
              .attr('r', function(bubble){return bubble.radius * 2})
          })
          .on('mouseout', function(bubble){
            var circle = d3.select(this);
            circle.attr('r', function(bubble){return bubble.radius});
          })
          .attr("data-target", function(bubble){
            if(bubble.relationship === 'me'
              || bubble.relationship === 'paternal_side'
              || bubble.relationship === 'maternal_side'){
              return null;
            } else {
              return "#myModal";
            }
          })
          .attr("data-toggle", function(bubble){
            if(bubble.relationship === 'me'
              || bubble.relationship === 'paternal_side'
              || bubble.relationship === 'maternal_side'){
              return null;
            } else {
              return "modal";
            }
          })
          .on('click', function(bubble){
            if(bubble.relationship === 'me') {
              return;
            } else {
              $scope.$apply(showRelative(bubble));
            }
          })
          .call(force.drag)


      nodeEnter.append('text')
          .attr('dy', '.35em')
          .attr('dx', '-2em')
          .attr('class', 'treeBubbleText')
          .text(function(d) { return d.relationship; });
  }

  function tick(e) {
    var k = 6 * e.alpha;

       // Push sources up and targets down to form a weak tree.
       link
           .each(function(d) { d.source.y -= k, d.target.y += k; })
           .attr("x1", function(d) { return d.source.x; })
           .attr("y1", function(d) { return d.source.y; })
           .attr("x2", function(d) { return d.target.x; })
           .attr("y2", function(d) { return d.target.y; });

    node.attr('transform', function(d) {
      var nodeX = Math.max(radius, Math.min(width - radius, d.x));
      var nodeY = Math.max(radius, Math.min(width - radius, d.y));
      return 'translate(' + nodeX + ',' + nodeY + ')';
    });
  }
});
