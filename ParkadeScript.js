
 var map;
 var infowindow;
 var service;
 var request;
 var markers = [] ;
      function initialize() {

      	var center  =  new google.maps.LatLng(40.730610,-73.935242);
        map = new google.maps.Map(document.getElementById('map'), {
          center: center,
          zoom: 15 ,
          styles : [
		  {
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#242f3e"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#746855"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#242f3e"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.locality",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#d59563"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#d59563"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#263c3f"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "geometry.fill",
		    "stylers": [
		      {
		        "color": "#ff49e4"
		      },
		      {
		        "weight": 1.5
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#6b9a76"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#38414e"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      {
		        "color": "#212a37"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9ca5b3"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#746855"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      {
		        "color": "#1f2835"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#f3d19c"
		      }
		    ]
		  },
		  {
		    "featureType": "transit",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#2f3948"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.station",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#d59563"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#17263c"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#515c6d"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#17263c"
		      }
		    ]
		  }
		]
        	});

            request = {
    		location: center,
   			 radius: '500',
    		 type: ['parking']
    		};

      infowindow = new google.maps.InfoWindow(); //creates info window for every parking lot
      service = new google.maps.places.PlacesService(map);
  	  service.nearbySearch(request, callback);

  	  //adding listener, which listens to users right click 
  	  // and then locate the parking lot in that location
  	  google.maps.event.addListener(map,'click',function(event){
  	  map.setCenter(event.latLng);
  	  clearResults(markers);

  	  var request = {
  	  	location: event.latLng,
  	  	radius:8047,
  	  	types: ['parking']
  	  };

  	  service.nearbySearch(request,callback);	
  	  })

  	  // adding a search box to my map 
  	  	var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers2 = [];
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers2.forEach(function(marker) {
            marker.setMap(null);
          });
          markers2 = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers2.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        }); // end of textbox and adding markers to the map according to the search 

  	}

  	  // creating a callback function (called by service object above)
  	   function callback(results, status) {
  		if (status == google.maps.places.PlacesServiceStatus.OK) {
    		for (var i = 0; i < results.length; i++) {
     			markers.push(createMarker(results[i]));
    			}
  			}
		}

		// create markers for the results obtain from  callback function
		function createMarker(place)
		{
			var placeLocation = place.geometry.location;
			var marker = new google.maps.Marker({
				map : map,
				position : place.geometry.location		
			});
		// adding listener that listens when you click on each marker and opens info window
		 google.maps.event.addListener(marker, 'click', function() {
         infowindow.setContent(place.name);
         infowindow.open(map, this);
        });

		 return marker;
		}

		//clears out the markers array after everu users search 
		function clearResults(markers){
			for (var m in markers){
				markers[m].setMap(null);
			}
			markers = [] ;
		}

      google.maps.event.addDomListener(window, 'load' , initialize);
  


