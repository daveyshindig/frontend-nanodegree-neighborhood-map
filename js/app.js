/*
 * This is the main JS file. It contains the model, view, and view-controller.
 *
 * @author David Wilkie
 * @since 19 May 2015
 * @copyright Copyright 2015 David Wilkie
 */
 "use strict";

/* ======= Model ======= */

var model = {
	"locations": [
		{
			"name": "Yoga Honolulu",
			"address": "1120 12th Ave, Honolulu, HI 96816 USA",
			"description": "The best yoga studio.",
			"website": "http://www.yogahnl.com"
		},
		{
			"name": "Koko Head Cafe",
			"address": "1145C 12th Ave, Honolulu, HI 96816 USA",
			"description": "The best brunch.",
			"website": "http://www.kokoheadcafe.com"			
		},
		{
			"name": "Hale Vietnam",
			"address": "1140 12th Ave, Honolulu, HI 96816 USA",
			"description": "The best pho.",
			"website": "https://www.facebook.com/pages/Hale-Vietnam-Restaurant/113853611976753"			
		},
		{
			"name": "The Curb Kaimuki",
			"address": "3538 Waialae Ave, Honolulu, HI 96816 USA",
			"description": "The best espresso.",
			"website": "https://www.thecurbco.com"			
		}
	],
	"markers": []
};


/* ======= View Controller ======= */

var viewController = {
	init: function() {
		ko.applyBindings(appViewModel(model.locations));
		mapView.init();
	},

	getMap: function() {
		return model.map;
	}
};


/* ======= View ======= */

var mapView = {
	init: function() {
		// Vanilla JS way to listen for resizing of the window 
		// and adjust map bounds
		window.addEventListener('resize', function(e) {
			// Make sure the map bounds get updated on page resize
			map.fitBounds(mapBounds);
		});
		this.render();
	},

	render: function() {
	}
};

var searchView = {
	init: function() {

	},

	render: function() {

	}
};

var listView = {
	init: function() {

	},

	render: function() {

	}
};

$(function() {
	viewController.init();
});