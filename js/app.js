
/* ======= Model ======= */

var model = {
	map: null, // declares a global map variable.
	"places": [
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
		}
	]
};


/* ======= View Controller ======= */

var viewController = {
	init: function() {
		model.map = initializeMap();
		mapView.init();
	},

	getMap: function() {
		return model.map;
	},

};


/* ======= View ======= */

var mapView = {
	init: function() {
		this.render();
		// Vanilla JS way to listen for resizing of the window 
		// and adjust map bounds
		window.addEventListener('resize', function(e) {
			// Make sure the map bounds get updated on page resize
			map.fitBounds(mapBounds);
		});
	},

	render: function() {
		$("#map").append(viewController.getMap());
	}
};

$(function() {
	viewController.init();
});