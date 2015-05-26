/**
 * This file contains all of the code running in the background that makes 
 * app.js possible. We call these helper functions because they 
 * support my code in this project.
 *
 * @author David Wilkie
 * @since 25 May 2015
 * @copyright Copyright 2015 David Wilkie
 * @license MIT License
 */
//"use strict";

function appViewModel(locationData) {
    var self = this;
    self.infoWindow = new google.maps.InfoWindow();
    self.query = ko.observable('');
    self.filteredArray = [];
    self.locationObjectArray = ko.observableArray();
    self.locations = locationData;
    self.locationObject = ko.observable();
    /** 
     * We use this to store both the data from the the model and the marker we create in a common
     * location, and later any data brought in from 3rd-party APIs.
     *
     * @param {Object} The item from our model.
     * @param {Object} The corresponding Google Map marker.
     */
    var LocationObject = function(locationData, marker) {
        this.data = locationData;
        this.marker = marker;
        this.isVisible = ko.observable(true);
    };

    /**
     * Set our infoWindow to point to this LocationObject and fill it with the right data.
     */
    LocationObject.prototype.makeFocus = function() {
        self.locationObject(this.data);
        map.setCenter(this.marker.position);
        // I'm not using a KO template here because setContent KO observables
        // don't seem to work when passed into the setContent function.
        infoWindow.open(window.map, this.marker);
    };

    /** Returns an HTML string that fills the marker's infoWindow. 
     *
     * @return {String} The HTML for the infoWindow.
     */
    function getContentHtml(lod) {
        var content = '<div class="infoWindowContent">' +
            '<h3 class="firstHeading">' + lod.name + '</h3>' +
            '<h4>' + lod.address + '<br><a href="' + lod.website + '">Website</a></h4>' +
            '<h5>' + lod.description + '</h5>' +
            '</div>';

        return content;
    }

    /**
     * Called when page is loaded, this initializes a Google Map, sets markers on it for each of
     * our locations, and centers the map.
     */
    function initializeMap() {
        // Removes points of interest from map, which distract from my places
        var noPoi = [{
            featureType: "poi",
            stylers: [
                { visibility: "off" }
            ]
        }];

        var mapOptions = {
            disableDefaultUI: true,
            mapTypeId: 'terrain',
            styles: noPoi
        };

        self.locations = self.locations.sort(function(left, right) {
            return (left.name < right.name ? -1 : 1) 
        });
        
        window.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
        window.mapBounds = new google.maps.LatLngBounds();

        pinPoster();

        /**
         * createMapMarker(placeData) reads Google Places search results to create map pins.
         * placeData is the object returned from search results containing information
         * about a single location.
         * 
         * @param {Object} The location object.
         * @author MCS, via the Udacity forums, was very helpful.
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
        
            google.maps.event.addListener(marker, 'click', function() {
                map.setCenter(this.position);
                infoWindow.setContent(getContentHtml(locationObject));
                infoWindow.open(window.map, this);
            });
        
            bounds.extend(new google.maps.LatLng(lat, lon));
            window.map.fitBounds(bounds);
            window.map.setCenter(bounds.getCenter());
            self.locationObjectArray.push(new LocationObject(locationObject, marker));
        }
        
        /**
         * Iterates over the array of locations created by locationFinder() and fires off Google 
         * place searches for each location.
         */
        function pinPoster() {
            var service = new google.maps.places.PlacesService(window.map);
            var i = self.locations.length;
            var request;

            // We need to limit the number of API calls to 10 per 2 seconds
            var interval = setInterval(function() { 
                request = {query: self.locations[i-1].address};
                service.textSearch(request, closureTrick(self.locations[i-1]));
                i--;
                if (!i) {
                    clearInterval(interval);
                };
            }, 250);
        }
        
        /* We're storing the response in the location object now, and passing the whole location 
         * object to `createMapMarker`.
         *
         * @param {Object} The locationObject from our model.
         */
        function closureTrick(passedLocationObject) {
            /*
             * callback(results, status) makes sure the search returned results for a location.
             * If so, it creates a new map marker for that location.
             *
             * @param {Object} results The query results returned by Google's API.
             * @param {Object} status The query status returned by Google's API
             */
            function callback(results, status) {
                console.log(status);
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    passedLocationObject.placeData = results[0];
                    createMapMarker(passedLocationObject);
                }
            }
            return callback;
        }
    }

    /** 
     * This is run immediately when DOM is ready. I adapted code for this from the following URL:
     * https://github.com/smith1jason/Udacity_Project_5/blob/master/js/script.js
     */
    function initializeQuery() {
        self.query.subscribe(function() { 
            self.infoWindow.close();
            self.filteredArray = ko.observableArray($.grep(self.locationObjectArray(), 
                                                    function(locationObject) {
                var title = locationObject.marker.title.toLowerCase() 
                return title.startsWith(self.query().toLowerCase());
            }));
            var newArray = ko.utils.compareArrays(self.locationObjectArray(), 
                                                  self.filteredArray());
            ko.utils.arrayForEach(newArray, function(locationObject) {
                if (locationObject.status === 'deleted') {
                    console.log(locationObject);
                    locationObject.value.marker.setVisible(false);
                    locationObject.value.isVisible(false);
                }
                else {
                    locationObject.value.marker.setVisible(true);
                    locationObject.value.isVisible(true);
                }
            });
        });
    }

    initializeMap();
    initializeQuery();
}

