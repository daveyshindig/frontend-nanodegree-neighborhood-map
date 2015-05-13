
/* ======= Model ======= */

var model = {
	mapDiv: "<div id='map'></div>",
	map: null, // declares a global map variable.
	"places": [
		{
			"name": "Yoga Honolulu",
			"address": "1120 12th Ave, Honolulu, Hawaii, 96816",
			"description": "The best yoga studio.",
			"website": "http://www.yogahnl.com"
		},
		{
			"name": "Koko Head Cafe",
			"address": "1145C 12th Ave, Honolulu, HI 96816",
			"description": "The best brunch.",
			"website": "http://www.kokoheadcafe.com"			
		}
	]
};


/* ======= View Controller ======= */

var viewController = {
	init: function() {

	},

	getMap: function() {
		return model.map;
	},

	getMapDiv: function() {
		return model.mapDiv;
	}
};


/* ======= View ======= */

var mapView = {
	init: function() {

	},

	render: function() {
		$("#mapDiv").append(viewController.getMapDiv()),
		$("#map").append(viewController.getMap()),
	
	}
};