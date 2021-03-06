/**
 * This file contains all of the code running in the background that makes
 * app.js possible. We call these helper functions because they
 * support my code in this project.
 *
 * @author David Wilkie
 * @since 25 May 2015
 * @license MIT License
 */

// N.b.: I've had some struggles with trying to 'use strict'. See the README for details.
// "use strict";

/**
 * This is the view-model, the core of our app. To be quite honest, I'm not sure if it touches the
 * DOM too much, ie. if some of the functionalities involved with rendering the app in the browser
 * should be factored out into a separate set of "view" functions. In any case, it Just Works, so
 * I'm going to leave it as such, until I'm told otherwise.
 *
 * @param {Array} locationData An array of objects with data about our places of interest.
 * @param {Array} mapStyles An array of styles for the Google Map we're making.
 */
function appViewModel(locationData, mapStyles) {
    var self = this;
    self.infoWindow = new google.maps.InfoWindow();
    self.query = ko.observable('');
    self.filteredArray = [];
    self.locationObjectArray = ko.observableArray();
    self.locations = locationData;
    self.flickrApiKey = "2a84a691ec088cb7c51abc607e984b63";

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
        this.flickrImgs = ko.observableArray();
        this.flickrThumbs = ko.observableArray();
        this.alreadySearched = false;
    };

    /**
     * Set our infoWindow to point to this LocationObject and fill it with the right data.
     */
    LocationObject.prototype.makeFocus = function() {
        window.map.setCenter(this.marker.position);
        self.infoWindow.setContent(getContentHtml(this));
        if (this.alreadySearched) {
            this.addImagesToInfoWindow();
        }
        else {
            $("#info-window-imgs").empty()
                                  .append('<img src="img/loading.gif" />');
            this.callFlickr();
        }
        // I'm not using a KO template here because setContent KO observables
        // don't seem to work when passed into the setContent function.
        self.infoWindow.open(window.map, this.marker);
    };

    /**
     * Make a call to the Flickr API to search for images for this object's infoWindow.
     */
    LocationObject.prototype.callFlickr = function() {
        // I still don't fully understand how changing scope works, but assigning this to that
        // fixes the trouble with calls to "this" from within the .get() function.
        var that = this;
        var url = "https://api.flickr.com/services/rest/";
        var params = {
            method: "flickr.photos.search",
            api_key: self.flickrApiKey,
            text: that.data.name + " Kaimuki"
        };
        that.alreadySearched = true;
        $.get(url, params, function(data) {
            var photos = $(data).find("photo");

            // We're just getting the first 5 photos from the search, at most.
            for (i = 0; i < photos.length && i < 5; i++) {
                var photo_id = $(photos[i]).attr('id');
                var secret_id = $(photos[i]).attr('secret');
                var farm_id = $(photos[i]).attr('farm');
                var server_id =$(photos[i]).attr('server');
                var thumbnail = "https://farm" + farm_id + ".staticflickr.com/" + server_id + "/" +
                                photo_id + "_" + secret_id + "_t.jpg";
                var photoUrl =  "https://farm" + farm_id + ".staticflickr.com/" + server_id + "/" +
                                photo_id + "_" + secret_id + ".jpg";

                that.flickrThumbs.push(thumbnail);
                that.flickrImgs.push(photoUrl);
            }
            that.addImagesToInfoWindow();

        }).fail(function() {
            alert("Error: Call to Flickr API failed");
        });
    };

    /**
     * Populates `infoWindow` with our divs.
     */
    LocationObject.prototype.addImagesToInfoWindow = function() {
        var that = this;
        var imgDiv = $("#info-window-imgs");
        imgDiv.empty();
        if (!that.flickrThumbs().length) {
            imgDiv.append("(sorry, no pics found)");
        }
        that.flickrThumbs().forEach(function(thumb, index) {
            $("<img src='" + thumb + "'>").click(function() {
                $("#image-overlay").html('<img src="' + that.flickrImgs()[index] + '">')
                                   .click(function() {
                                       $("#image-overlay").empty();
                                   });
            })
                .appendTo(imgDiv);
        });
    };

    /**
     * Returns an HTML string that fills the marker's infoWindow.
     *
     * @param {Object} lo The locationObject with all the data we need.
     * @return {String} The HTML for the infoWindow.
     */
    function getContentHtml(lo) {
        var ld = lo.data;
        var website = "";
        if (ld.website) {
            website = ' // <a href="' + ld.website + '">Website</a>';
        }

        var content = '<div class="info-window-content">' +
            '<h3 class="info-window-heading">' + ld.name + '</h3>' +
            '<h4>' + ld.address + website + '</h4>' +
            '<p>' + ld.description + '</p>' +
            '<div id="info-window-imgs">' +
            '<img src="img/loading.gif" /></div>' +
            '</div>';

        return content;
    }

    /**
     * Called when page is loaded, this initializes a Google Map, sets markers on it for each of
     * our locations, and centers the map.
     */
    function initializeMap() {
        var mapOptions = {
            disableDefaultUI: true,
            mapTypeId: 'terrain',
            styles: mapStyles
        };

        /**
         * This function reads Google Places search results to create map pins.
         *
         * @param {Object} locationData The location data from our model.
         * @author MCS, via the Udacity forums, was very helpful.
         */
        function createMapMarker(locationData) {
            // Major change: don't just use placeData to create a map marker, use an
            // object that contains even more information! The path of least resistance
            // for me to make this happen is to just add the placeData to the locations
            // (model.places) object when the result comes back, and pass
            // `createMapMarker` the whole location object.
            var placeData = locationData.placeData;
            var lat = placeData.geometry.location.lat();
            var lon = placeData.geometry.location.lng();
            var bounds = window.mapBounds;
            var marker = new google.maps.Marker({
                map: window.map,
                position: placeData.geometry.location,
                title: locationData.name,
                icon: 'img/' + locationData.icon
            });
            var locationObject = new LocationObject(locationData, marker);

            self.locationObjectArray.push(locationObject);
            google.maps.event.addListener(marker, 'click', function() {
                window.map.setCenter(this.position);
                self.infoWindow.setContent(getContentHtml(locationObject));
                if (locationObject.alreadySearched) {
                    locationObject.addImagesToInfoWindow();
                }
                else {
                    $("#info-window-imgs").empty()
                                          .append('<img src="img/loading.gif" />');
                    locationObject.callFlickr();
                }
                infoWindow.open(window.map, this);
            });

            bounds.extend(new google.maps.LatLng(lat, lon));
            window.map.fitBounds(bounds);
            window.map.setCenter(bounds.getCenter());
        }

        /* We're storing the response in the location object now, and passing the whole location
         * object to `createMapMarker`.
         *
         * @param {Object} locationData The location info from our model.
         */
        function closureTrick(locationData) {
            /*
             * callback(results, status) makes sure the search returned results for a location.
             * If so, it creates a new map marker for that location.
             *
             * @param {Object} results The query results returned by Google's API.
             * @param {Object} status The query status returned by Google's API
             */
            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    locationData.placeData = results[0];
                    createMapMarker(locationData);
                }
                else {
                    // I unsuccessfully tried many ways of getting the program to retry
                    // searching for the location when the search fails, but the fact that things
                    // happen in the callback were just too confusing. So, error message only.
                    console.log("Error: Google Places search returned " + status);
                }
            }
            return callback;
        }

        /**
         * Iterates over the array of locations created by `locationFinder()` and fires off Google
         * place searches for each location. I'm going to do things a bit differently and use the
         * Google Places API to search for places by name, and return the coords for the pins.
         */
        function pinPoster() {
            var service = new google.maps.places.PlacesService(window.map);
            var i = self.locations.length;
            var request;

            // We need to limit the number of API calls to 10 per 2 seconds
            var interval = setInterval(function() {
                request = {query: self.locations[i - 1].address};
                service.textSearch(request, closureTrick(self.locations[i - 1]));
                i--;
                if (!i) {
                    clearInterval(interval);
                }
            }, 240);
        }

        window.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
        window.mapBounds = new google.maps.LatLngBounds();
        $(window.map).click(function() {
            $("#image-overlay").empty();
        });

        pinPoster();
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
                var title = locationObject.marker.title.toLowerCase();
                return title.startsWith(self.query().toLowerCase());
            }));
            var newArray = ko.utils.compareArrays(self.locationObjectArray(),
                                                  self.filteredArray());
            ko.utils.arrayForEach(newArray, function(locationObject) {
                if (locationObject.status === 'deleted') {
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