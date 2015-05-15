/*
 * This file contains all of the code running in the background that makes 
 * app.js possible. We call these helper functions because they 
 * support my code in this project.
 *
 * @author David Wilkie
 * @since 11 May 2015
 * @copyright Copyright (c) 2015 David Wilkie
 */

/**
 * Called when page is loaded.
 */
function initializeMap() {
	var locations;		
	// Google was returning incorrect placenmaes so we're saving this at the class level,
	// also because passing these vars thru the callback function would be a nightmare.
	var loc;
	var mapOptions = {
		disableDefaultUI: true
	};
	// This next line makes `map` a new Google Map JavaScript Object and attaches
	// it to <div id="map">, which is appended to the index file.
	map = new google.maps.Map(document.querySelector('#map'), mapOptions);

	/**
	 * createMapMarker(placeData) reads Google Places search results to create map pins.
 	 * placeData is the object returned from search results containing information
 	 * about a single location.
 	 */
	function createMapMarker(placeData) {
		// The next lines save location data from the search result object to local variables
		var lat = placeData.geometry.location.A;  // latitude from the place service
		var lon = placeData.geometry.location.F;  // longitude from the place service
		var address = placeData.formatted_address;   // addy of the place from the place service
		var place_id = placeData.place_id;        // used for more data about the place
		var types = placeData.types;	      // types of the place ---"---
		var bounds = window.mapBounds;            // current boundaries of the map window
		// marker is an object with additional data about the pin for a single location
		var marker = new google.maps.Marker({
			map: map,
			position: placeData.geometry.location,
			title: loc.name
		});
		// infoWindows are the little helper windows that open when you click
		// or hover over a pin on a map. They usually contain more information
		// about a location.
		var infoWindow = new google.maps.InfoWindow({
			content: getContentHtml()
		});

		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.open(map, marker);
		});
		// this is where the pin actually gets added to the map.
		// bounds.extend() takes in a map location object
		bounds.extend(new google.maps.LatLng(lat, lon));
		// fit the map to the new marker
		map.fitBounds(bounds);
		// center the map
		map.setCenter(bounds.getCenter());
	};

	/*
	 * callback(results, status) makes sure the search returned results for a location.
	 * If so, it creates a new map marker for that location.
	 */
	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			createMapMarker(results[0]);
		};
	};

	/*
	 * Generates the contents of the infoWindow for the given location through
	 * calls to various APIs.
	 *
	 * @param {string} The location to be searched for in the API calls.
	 */
	function getContentHtml() {
		var content = '<div class="infoWindowContent">' + 
		'<h3 class="firstHeading">' + loc.name + '</h3>' + 
		'<h4>' + loc.address + '<br>' + loc.website + '<br></h4>' +
		'<h5>' + loc.description + '</h5>' + 
		'</div>';	

		return content;
	};

	/*
	 * pinPoster(locations) takes in the array of locations created by locationFinder()
	 * and fires off Google place searches for each location
	 */
	function pinPoster(locations) {
		// creates a Google place search service object. PlacesService does the work of
		// actually searching for location data.
		var service = new google.maps.places.PlacesService(map);
		// Iterates through the array of locations, creates a search object for each location
		locations.forEach(function(place) {
			loc = place;
			console.log(loc.name + " " + loc.address);
			// the search request object
			var request = { query: place.address };
			// Actually searches the Google Maps API for location data and runs the callback 
			// function with the search results after each search.
			service.textSearch(request, callback);
		});
	};

	// Sets the boundaries of the map based on pin locations
	window.mapBounds = new google.maps.LatLngBounds();
	// locations is an array of structs found in the app.js file.
	locations = model.places;
	// pinPoster(locations) creates pins on the map for each location in
	// the locations array
	pinPoster(locations);
};
