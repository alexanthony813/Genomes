angular.module('genome.map', ['angular-intro'])
.controller('MapController', function($scope, d3Service, Relatives, $rootScope, $window, $location) {

  $scope.relatives = $rootScope.rels;

  var createMap = function () {
    var map = new Datamap({
        element: document.getElementById('mainCanvas'),
        scope: 'world',
        geographyConfig: {
            popupOnHover: false,
            highlightOnHover: false
        },
        fills: {
            defaultFill: '#34495e'
        }
    });
    //create bubbles for each relative in the relative list, after parsing with makeNewBubbleData
    map.bubbles(relativesList, {
      popupTemplate: function (geo, data) {
          return ['<div class="hoverinfo">' +  data.name,
          '<br/>Relationship: ' +  data.relationship,
          '<br/>Similarity: ' +  data.similarity,
          '<br/>Residence: ' +  data.residence + '',
          '</div>'].join('');
      }
    });
  };

  var makeNewBubbleData = function() {
    var geoInfo = {
      'United States': [36.5, -101.25, 'USA'],
      'Canada': [54.51, -100.1953, 'CAN'],
      'South America': [-11.2, -56.25, 'SAM'],
      'Europe': [48.4419, 19.07, 'EUR'],
      'India': [21.348, 78.31, 'IND'],
      'Russia': [61.17, 90.000, 'RUS'],
      'Asia': [36.15, 105.468, 'ASN'],
      'Australia': [-25.05, 134, 'AUS'],
      'Africa': [7.612, 18.6328, 'AFR']
    };

    var fills = {
        'USA': '#e74c3c',
        'RUS': '#2ecc71',
        'EUR': '#FFFC00',
        'CAN': '#3498db',
        'ASN': '#1abc9c',
        'SAM': '#FFF59D',
        'AUS': '#e67e22',
        'AFR': '#d35400'
    }

    for(var i = 0; i < $scope.relatives.length; i++) {
      for (var places in geoInfo) {
        if ($scope.relatives[i].birthplace === places) {
          relativesList.push({
            name: $scope.relatives[i].first_name + ' ' + $scope.relatives[i].last_name,
            country: $scope.relatives[i].birthplace,
            relationship: $scope.relatives[i].relationship,
            residence: $scope.relatives[i].residence,
            similarity: $scope.relatives[i].similarity,
            latitude: (geoInfo[places][0] + (Math.floor(Math.random() * 10)+1)),
            longitude: (geoInfo[places][1] + (Math.floor(Math.random() * 10)+1)),
            borderColor: fills[geoInfo[places][2]],
            borderWidth: 4,
            fills: fills[geoInfo[places][2]],
            radius: 7,
            fillOpacity: 1,
            popupOnHover: true
          })
        }
      }
    }
  };

});