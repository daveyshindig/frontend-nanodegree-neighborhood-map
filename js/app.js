/**
 * This is the main JS file. It contains the model, view, and view-controller.
 *
 * @author David Wilkie
 * @since 19 May 2015
 * @copyright Copyright 2015 David Wilkie
 */

/* ======= Model ======= */

var model = {
	"locations": [
		{
			"name": "Yoga Honolulu",
			"address": "1120 12th Ave, Honolulu, HI 96816 USA",
			"description": "The best yoga studio.",
			"website": "http://www.yogahnl.com",
			"icon": "yoga.png"
		},
		{
			"name": "Koko Head Cafe",
			"address": "1145C 12th Ave, Honolulu, HI 96816 USA",
			"description": "The best brunch tbh. Their skillets are bomb.",
			"website": "http://www.kokoheadcafe.com"			,
			"icon": "restaurant.png"
		},
		{
			"name": "Hale Vietnam",
			"address": "1140 12th Ave, Honolulu, HI 96816 USA",
			"description": "This is my favorite restaurant in Hawaii. It's humble, has a mellow " +
						   "atmosphere, the best pho, and everything I've tried here is tasty.",
			"website": "https://www.facebook.com/pages/Hale-Vietnam-Restaurant/113853611976753"			,
			"icon": "restaurant.png"
		},
		{
			"name": "The Curb Kaimuki",
			"address": "3538 Waialae Ave, Honolulu, HI 96816 USA",
			"description": "Tiny place. Best espresso in town.",
			"website": "https://www.thecurbco.com"			,
			"icon": "cafe.png"
		},
		{
			"name": "Via Gelato",
			"address": "1142 12th Ave, Honolulu, HI 96816",
			"description": "Super tasty gelato made right there, tasty panini and espresso. " + 
						   "Nobody gets the panini, though; everyone's here for the gelato.",
			"website": "http://www.viagelatohawaii.com",
			"icon": "cafe.png"
		},
		{
			"name": "Town Restaurant",
			"address": "3435 Waialae Ave #104, Honolulu, HI 96816",
			"description": "This is the restaurant for localvores. They source as many " + 
							"ingredients from Hawaii as they can.",
			"website": "http://www.townkaimuki.com",
			"icon": "restaurant.png"
		},
		{
			"name": "Mau'umae Nature Park",
			"address": "3872 Claudine St, Honolulu, HI 96816 USA",
			"description": "Just a tiny, peaceful little park where people hardly ever go.",
			"website": "",
			"icon": "outdoor.png"
		},
		{
			"name": "Yoga Hawaii",
			"address": "1152 Koko Head Ave, Honolulu, HI 96816",
			"description": "Another great yoga studio in Kaimuki. This one specializes in kripalu " +
					   	   "and ashtanga styles. No wonder Kaimuki's full of people carrying yoga " +
					       "mats.",
			"website": "http://www.yoga-hawaii.com/",
			"icon": "yoga.png"
		},
		{
			"name": "Tamura's Fine Wine & Liquors",
			"address": "1216 10th Ave, Honolulu, HI 96816",
			"description": "Best ahi poke, although I rarely buy that due to sustainability " +
						   "concerns. They have the best prices on alcohol, except for Costco " +
						   "or maybe Don Quijote. Better selection here, though.",
			"website": "http://www.tamurasfinewine.com",
			"icon": "shop.png"
		},
		{
			"name": "Black Cat Salon",
			"address": "3512 Waialae Ave, Honolulu, HI 96816 USA",
			"description": "Some very good stylists and a hip atmosphere here.",
			"website": "http://www.theblackcatsalon.com",
			"icon": "shop.png"
		},
		{
			"name": "Big City Diner",
			"address": "3565 Waialae Ave, Honolulu, HI 96816",
			"description": "The other awesome brunch spot. I like unpretentious restaurants, " +
						   "and this fills a niche because Honolulu only has a few proper " +
						   "diners." ,
			"website": "http://bigcitydinerhawaii.com",
			"icon": "restaurant.png"
		},
		{
			"name": "To Thai For",
			"address": "3571 Waialae Ave, Honolulu, HI 96816 USA",
			"description": "I was mad at their name, it's such a cringe-y pun. But the food's " +
						   "pretty good, here. I have to eat Thai at least once a week.",
			"website": "http://www.itstothaifor.com",
			"icon": "restaurant.png"
		},
		{
			"name": "Top of the Hill",
			"address": "3579 Waialae Ave, Honolulu, HI 96816",
			"description": "I don't like this place very much tbh, but my friends don't seem to " +
						   "mind it. Dives are okay, but this one depresses me more than most do.",
			"website": "https://plus.google.com/112189750107360673777/about?gl=us&hl=en",
			"icon": "bar.png"
		},
		{
			"name": "Gecko Books",
			"address": "1151 12th Avenue, Honolulu, HI 96816",
			"description": "https://plus.google.com/101193926574315249955/about?gl=us&hl=en",
			"website": "It's a comic book shop with a good selection.",
			"icon": "shop.png"
		},
		{
			"name": "Kaimuki Sundries",
			"address": "3406 Waialae Ave, Honolulu, HI 96816",
			"description": "Just a cheap little convenience store.",
			"website": "",
			"icon": "shop.png"
		},
		{
			"name": "Verde Kaimuki",
			"address": "3607 Waialae Ave, Honolulu, HI 96816",
			"description": "Best breakfast burritos, and other tasty tasty burritos. What is " +
						   "better than a burrito? There are better things, I guess, but only " +
						   " slightly better.",
			"website": "",
			"icon": "restaurant.png"
		},
		{
			"name": "Brew'd Craftpub",
			"address": "3441 Waialae Ave, Honolulu, HI 96816",
			"description": "Good bar if you are comfortable spending $8-12 per glass of beer. " +
						   "They could afford to lower prices by a dollar or two per drink imo. " +
						   "I feel kind of ripped off paying this much for beers.",
			"website": "http://www.brewdcraftpub.com",
			"icon": "bar.png"
		},
		{
			"name": "Kona Kai Sushi",
			"address": "3579 Waialae Ave, Honolulu, HI 96816",
			"description": "The sushi chef was trained at Honolulu's famous Sasabune sushi-ya, " +
						   "and came to start his own restaurant in Kaimuki. Kinda pricey here.",
			"website": "http://google.com/?q=Kona Kai Sushi",
			"icon": "restaurant.png"
		},
		{
			"name": "Cafe Miro",
			"address": "http://cafemirohawaii.com",
			"description": "One of the few places in Hawaii to get a good French meal. This is " +
						   "a memorable place for a date. Seems like mostly Japanese people go " +
						   "to this restaurant, maybe because of the Japanese ownership.",
			"website": "http://cafemirohawaii.com",
			"icon": "restaurant.png"
		},
		{
			"name": "Goodwill",
			"address": "3638 Waialae Ave, Honolulu, HI 96816",
			"description": "Everybody loves Goodwill, and you can score here sometimes. It's " +
						   "not very picked over compared to most thrift stores.",
			"website": "http://higoodwill.org",
			"icon": "shop.png"
		},
		{
			"name": "Movie Museum",
			"address": "3566 Harding Ave #104, Honolulu, HI 96816",
			"description": "They have super comfy armchairs for seating, and you can rent the" +
						   "whole place out to screen whatever you like. BYOB.",
			"website": "http://google.com/?q=Movie Museum Kaimuki",
			"icon": "cinema.png"
		}
	],
	"mapstyle": 
	[
	    {
	        "featureType": "landscape",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 65
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 51
	            },
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 30
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 40
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.province",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "lightness": -25
	            },
	            {
	                "saturation": -100
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "hue": "#ffff00"
	            },
	            {
	                "lightness": -25
	            },
	            {
	                "saturation": -97
	            }
	        ]
	    }
	]
};


/* ======= View Controller ======= */

var viewController = {
	init: function() {
		ko.applyBindings(appViewModel(model.locations, model.mapstyle));
		mapView.init();
	}
};


/* ======= View ======= */

var mapView = {
	init: function() {
		// Vanilla JS way to listen for resizing of the window
		// and adjust map bounds
		window.addEventListener('resize', function(e) {
			// Make sure the map bounds get updated on page resize
			window.map.fitBounds(window.mapBounds);
		});
	},
};

$(function() {
	viewController.init();
});