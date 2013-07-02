// global variables
var data;
var selectedHotelIndex;
var selectedRestaurantIndex;

function onAppStart() {
	console.log("onAppStart");
	loadDataFromServer();
}


function loadDataFromServer() {
	$.ajax({
		url:'http://www.blessedbytes.de/mobdev/weimar_catalog.php?callback=?',
		type: 'GET',
        dataType: 'jsonp',
        success: function(callbackData) {
			data = callbackData;
			console.log("loaded server data");
		}
	});
}




/* Hotel List */

$('#hotel_list').on('pageinit', function() {
	initHotelList();
});


function initHotelList() {
	if(data===undefined || data==null) {
		setTimeout(initHotelList, 200);
		return;
	}
	
	// TODO: Load hotel list
}

function showHotel(hotelindex) {
	selectedHotelIndex = hotelindex; 
	$.mobile.changePage($("#hotel_details"));
}




/* Hotel Details */

$('#hotel_details').on('pagebeforeshow', function() {
	initHotelDetails();
});

function initHotelDetails() {

	// TODO: Load all hotel details 
	// hint: how could  selectedHotelIndex  be useful here?

	var hotel = data.Hotels[0];
	alert(hotel.Name);

	
	//loadHotelData(hotel, selectedHotelIndex);
	//loadHotelMap(hotel);
	//loadHotelImages(hotel);
}







/* Restaurant List */

$('#restaurant_list').on('pageinit', function() {
	initRestaurantList();
});


function initRestaurantList() {
	if(data===undefined || data==null) {
		setTimeout(initRestaurantList, 200);
		return;
	}
	
	// TODO: Load restaurant list
	
}

function showRestaurant(restaurantindex) {
	selectedRestaurantIndex = restaurantlindex; 
	$.mobile.changePage($("#restaurant_details"));
}








/* Restaurant Details */

$('#restaurant_details').on('pagebeforeshow', function() {
	initRestaurantDetails();
});

function initRestaurantDetails() {
	// TODO: Load all hotel details 
	// hint: how could  selectedRestaurantIndex  be useful here?

	var restaurant = data.Restaurants[0];
	alert(restaurant.Name);

	
	//loadRestaurantData(restaurant, selectedRestaurantIndex);
	//loadRestaurantMap(restaurant);
	//loadRestaurantImages(restaurant);
}
