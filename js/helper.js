/*
 * This file contains all of the code running in the background that makes 
 * app.js possible. We call these helper functions because they 
 * support my code in this project.
 *
 * @author David Wilkie
 * @since 17 May 2015
 * @copyright Copyright 2015 David Wilkie
 */


function appViewModel() {
	self = this;
	self.query = ko.observable('');
	self.filteredArray;
	self.placesObservableArray = ko.observableArray(model.places);
	self.locations = window.model.places; 
	self.markers = ko.observableArray(window.model.markers);

	/**
	 * Called when page is loaded.
	 */
	function initializeMap() {
		var mapOptions = {
			disableDefaultUI: true,
			mapTypeId: 'terrain'
		};
		
		window.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
		window.mapBounds = new google.maps.LatLngBounds();

		pinPoster(locations);

		/**
		 * createMapMarker(placeData) reads Google Places search results to create map pins.
	 	 * placeData is the object returned from search results containing information
	 	 * about a single location.
		 * 
		 * @param {Object} The location object.
	 	 */
		function createMapMarker(locationObject) {
		 	// Major change: don't just use placeData to create a map marker, use an
			// object that contains even more information! The path of least resistance
			// for me to make this happen is to just add the placeData to the locations
			// (model.places) object when the result comes back, and pass
			// `createMapMarker` the whole location object.
			var placeData = locationObject.placeData;
			var lat = placeData.geometry.location.lat();
			var lon = placeData.geometry.location.lng();
			var bounds = window.mapBounds;
			var marker = new google.maps.Marker({
				map: window.map,
				position: placeData.geometry.location,
				title: locationObject.name
			});

			var infoWindow = new google.maps.InfoWindow({
				content: getContentHtml()
			});
		
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.open(window.map, marker);
			});
		
			bounds.extend(new google.maps.LatLng(lat, lon));
			window.map.fitBounds(bounds);
			window.map.setCenter(bounds.getCenter());
			marker.name = locationObject.name;
			markers.push(marker);

			/* Returns an HTML string that fills the marker's infoWindow. */
			function getContentHtml() {
				var content = '<div class="infoWindowContent">' +
					'<h3 class="firstHeading">' + locationObject.name + '</h3>' +
					'<h4>' + locationObject.address + '<br>' + locationObject.website + '<br></h4>' +
					'<h5>' + locationObject.description + '</h5>' +
					'</div>';
		
				return content;
			}
		}
		
		/*
		 * Takes in the array of locations created by locationFinder() and fires off Google 
		 * place searches for each location.
		 *
		 * @param {Object} Locations from the model.
		 */
		function pinPoster(locations) {
			var service = new google.maps.places.PlacesService(window.map);
		
			locations.forEach(function(place) {    
				var request = {query: place.address};
				service.textSearch(request, closureTrick(place));
			});
		
			/* We're storing the response in the location object now, and
			 * passing the whole location object to `createMapMarker`.
			 */
			function closureTrick(passedLocationObject) {
				/*
				 * callback(results, status) makes sure the search returned results for a location.
				 * If so, it creates a new map marker for that location.
				 */
				function callback(results, status) {
					if (status === google.maps.places.PlacesServiceStatus.OK) {
						passedLocationObject.placeData = results[0];
						createMapMarker(passedLocationObject);
					}
				}
				return callback;
			}
		}
	}

	/* This is run immediately when DOM is ready. I adapted code for this from the following URL:
	 * https://github.com/smith1jason/Udacity_Project_5/blob/master/js/script.js
	 */
	function initializeQuery() {
		self.filteredArray = ko.computed(function() {
			$.grep(self.markers(), function(arrayItem) {
				return arrayItem.title.toLowerCase().startsWith(self.query().toLowerCase());
			});
        	console.log(self.filteredArray);
		});

		self.filteredArray.subscribe(function() {
			var newArray = ko.utils.compareArrays(self.markers(), self.filteredArray());
	        ko.utils.arrayForEach(newArray, function(marker) {
	            if (marker.status === 'deleted') {
	                marker.setMap(null);
	            }
	            else {
	                marker.setMap(map);
	            };
	        });
		});		
	}

	initializeMap();
	initializeQuery();
}

