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
			"description": "The best brunch tbh. Their skillets are bomb.",
			"website": "http://www.kokoheadcafe.com"			
		},
		{
			"name": "Hale Vietnam",
			"address": "1140 12th Ave, Honolulu, HI 96816 USA",
			"description": "This is my favorite restaurant in Hawaii. It's humble, has a mellow " +
						   "atmosphere, the best pho, and everything I've tried here is tasty.",
			"website": "https://www.facebook.com/pages/Hale-Vietnam-Restaurant/113853611976753"			
		},
		{
			"name": "The Curb Kaimuki",
			"address": "3538 Waialae Ave, Honolulu, HI 96816 USA",
			"description": "The best espresso.",
			"website": "https://www.thecurbco.com"			
		},
		{
			"name": "Via Gelato",
			"address": "1142 12th Ave, Honolulu, HI 96816",
			"description": "Super tasty gelato made right there, tasty panini and espresso. " + 
						   "Nobody gets the panini, though; everyone's here for the gelato.",
			"website": "http://www.viagelatohawaii.com"
		},
		{
			"name": "Town Restaurant",
			"address": "3435 Waialae Ave #104, Honolulu, HI 96816",
			"description": "This is the restaurant for localvores. They source as many " + 
							"ingredients from Hawaii as they can.",
			"website": "http://www.townkaimuki.com"
		},
		{
			"name": "Mau'umae Nature Park",
			"address": "Mau'Umae Nature Park, Honolulu, HI 96816 USA",
			"description": "Just a tiny, peaceful little park where people hardly ever go.",
			"website": ""
		},
		{
			"name": "Yoga Hawaii",
			"address": "1152 Koko Head Ave, Honolulu, HI 96816",
			"description": "Another great yoga studio in Kaimuki. This one specializes in kripalu " +
					   	   "and ashtanga styles. No wonder Kaimuki's full of people carrying yoga " +
					       "mats.",
			"website": "http://www.yoga-hawaii.com/"
		},
		{
			"name": "Tamura's Fine Wine & Liquors",
			"address": "1216 10th Ave, Honolulu, HI 96816",
			"description": "Best ahi poke, although I rarely buy that due to sustainability " +
						   "concerns. They have the best prices on alcohol, except for Costco " +
						   "or maybe Don Quijote. Better selection here, though.",
			"website": "http://www.tamurasfinewine.com"
		},
		{
			"name": "Black Cat Salon",
			"address": "3512 Waialae Ave, Honolulu, HI 96816 USA",
			"description": "Some very good stylists and a hip atmosphere here.",
			"website": "http://www.theblackcatsalon.com"
		},
		{
			"name": "Big City Diner",
			"address": "3565 Waialae Ave, Honolulu, HI 96816",
			"description": "The other awesome brunch spot. I like unpretentious restaurants, " +
						   "and this fills a niche because Honolulu only has a few proper " +
						   "diners." ,
			"website": "http://bigcitydinerhawaii.com"
		},
		{
			"name": "To Thai For",
			"address": "3571 Waialae Ave, Honolulu, HI 96816 USA",
			"description": "I was mad at their name, it's such a cringe-y pun. But the food's " +
						   "pretty good, here. I have to eat Thai at least once a week.",
			"website": "http://www.itstothaifor.com"
		},
		{
			"name": "Top of the Hill",
			"address": "3579 Waialae Ave, Honolulu, HI 96816",
			"description": "I don't like this place very much, but my friends don't seem to " +
						   "mind. I like dives but it depresses me to be here.",
			"website": "https://plus.google.com/112189750107360673777/about?gl=us&hl=en"
		},
		{
			"name": "Gecko Books",
			"address": "1151 12th Avenue, Honolulu, HI 96816",
			"description": "https://plus.google.com/101193926574315249955/about?gl=us&hl=en",
			"website": "Cool little comic book shop with a good selection."
		},
		{
			"name": "Kaimuki Sundries",
			"address": "3406 Waialae Ave, Honolulu, HI 96816",
			"description": "Crack seed store. Classic local spot.",
			"website": ""
		},
		{
			"name": "Verde Kaimuki",
			"address": "3607 Waialae Ave, Honolulu, HI 96816",
			"description": "Best breakfast burritos, and other tasty tasty burritos. What is " +
						   "better than a burrito? Prety much nothing, that's what.",
			"website": ""
		},
		{
			"name": "Brew'd Craftpub",
			"address": "3441 Waialae Ave, Honolulu, HI 96816",
			"description": "Good bar if you are comfortable spending $8-10 per glass of beer. " +
						   "They could afford to lower prices by a dollar or two per drink doe.",
			"website": "http://www.brewdcraftpub.com"
		},
		{
			"name": "Kona Kai Sushi",
			"address": "3579 Waialae Ave, Honolulu, HI 96816",
			"description": "Kaimuki's Sasabune (famous Sushi-ya in Honolulu). Kinda pricey tho.",
			"website": "http://google.com/?q=Kona Kai Sushi"
		},
		{
			"name": "Cafe Miro",
			"address": "http://cafemirohawaii.com",
			"description": "One of the few places in Hawaii to get a good French meal. This is " +
						   "a good place to impress a date. Seems like only Japanese people go " +
						   "to this restaurant.",
			"website": "http://cafemirohawaii.com"
		},
		{
			"name": "Goodwill",
			"address": "3638 Waialae Ave, Honolulu, HI 96816",
			"description": "Everybody loves Goodwill, and you can score here sometimes. It's " +
						   "not very picked over compared to most thrift stores.",
			"website": "http://higoodwill.org"
		},
		{
			"name": "Movie Museum",
			"address": "3566 Harding Ave # 104, Honolulu, HI 96816",
			"description": "They have really comfy armchair seats, and you can rent the whole " +
						   "place out and screen whatever you like. BYOB.",
			"website": "http://google.com/?q=Movie Museum Kaimuki"
		}
	]
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

$(function() {
	viewController.init();
});