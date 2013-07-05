// global variables
var data;
var selectedHotelIndex;
var selectedRestaurantIndex;

function onAppStart() {
	console.log("onAppStart");
	loadDataFromServer();
	
	/* to show back button always */
	$(document).bind("mobileinit", function() {
		  $.mobile.page.prototype.options.addBackBtn = true;
	});
	
	InitHotelDetailsButtons();
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
	
	var $hotelsList = $('#hotel_listview');
	var hotelsData = data.Hotels;
	var hotelElementsCollection = [];
	
	console.log(hotelsData);
	
	
	for( var i in hotelsData ) {
		var currentHotel = hotelsData[i];
		var $hotelElement = $('<li>');
		$hotelElement.attr('class','listcontent')
		$hotelElement.append('<a>');
		$hotelElement.find('a')
					.attr('href','#hotel_details')
					.html(currentHotel.Name)
					.append('<img class="listimage" src="'+currentHotel.Pictures[0]+'" />')
					.append('<p>'+currentHotel.Location+'</p>')
					.append('<p>'+currentHotel.Pricing+'</p>')
					.data('index',i)
					.click(function(){
							showHotel($(this).data('index'));
						});
		hotelElementsCollection.push($hotelElement);
	}
	
	$hotelsList
		.append(hotelElementsCollection)
		.listview('refresh');
		
	
	
	
	
	
	// TODO: Load hotel list
}

function showHotel(hotelindex) {
	selectedHotelIndex = hotelindex; 
	$.mobile.changePage($("#hotel_details"));
}

function InitHotelDetailsButtons() {
	$('#hotel-call-btn').click(function(){
		if( !selectedHotelIndex ) {
			return;
		}
		var hotel = data.Hotels[selectedHotelIndex];
	});
	
	$('#hotel-contact-btn').click(function(){
		if( !selectedHotelIndex ) {
			return;
		}
		var hotel = data.Hotels[selectedHotelIndex];
	});
	
	$('#hotel-maps-btn').click(function(){
		if( !selectedHotelIndex ) {
			return;
		}
		var hotel = data.Hotels[selectedHotelIndex];
	});
} 


/* Hotel Details */

$('#hotel_details').on('pagebeforeshow', function() {
	initHotelDetails();
});

function initHotelDetails() {

	// TODO: Load all hotel details 
	// hint: how could  selectedHotelIndex  be useful here?

	var currentHotel = data.Hotels[selectedHotelIndex];
	
	
	
	loadHotelData(currentHotel);
	loadHotelImages(currentHotel);
}

function loadHotelData( hotel ) {
	$('#hotel_details_header').html(hotel.Name);
	
	var address = 
			hotel.Name+'<br/>'+
			hotel.Street+'<br/>'+
			hotel.ZIPCode+', '+hotel.Town+'<br/>'+
			hotel.Telephone+'<br/>'+
			hotel.Email+'</p>';
	
	var map_image = 'http://maps.googleapis.com/maps/api/staticmap?markers=';
	map_image += hotel.Coordinates;
	map_image += '&zoom=16&size=350x350&scale=2&sensor=false';
			
	
	$('#hotel-data')
		.empty()
		.append('<h2>'+hotel.Name+'</h2>')
		.append('<p><strong>Pricing:</strong> '+hotel.Pricing+'</p>')
		.append('<p><strong>Rating:</strong> '+hotel.Rating+' stars</p>')
		.append('<p><strong>Location:</strong> '+hotel.Location+'</p>')
		.append('<p><strong>Rooms:</strong> '+hotel.Rooms+'</p>')
		.append('<h3>Address & Contact</h3>')
		.append('<p>'+address+'</p>')
		.append('<h3>Description</h3>')
		.append('<p>'+hotel.Description+'</p>')
		.append('<h3>Map</h3>')
		.append('<img class="map-image" src="'+map_image+'" />');
	
}

function loadHotelImages( hotel ) {
	
	var hotelImageElementsCollection = [];
	var pictures = hotel.Pictures;
	
	
	for( var i in pictures ) {
		var pictureHtml = '<div display="none"><img src="'+pictures[i]+'" height="200" width="300"/></div>';
		hotelImageElementsCollection.push( $( pictureHtml ) );
	}
	
	$('#hotel_photos')
		.empty()
		.append(hotelImageElementsCollection);
	
	
	var sliderTimeout = isMobile ? 2000 : 500;
	setTimeout("initSlider('slider');", sliderTimeout);
}

function initSlider(id) {
	window.mySlider = new Swipe(document.getElementById(id), {
		startSlide: 0,
		// speed: 400,
		auto: 2000,
		continuous: true,
		// disableScroll: false,
		// stopPropagation: false,
		// callback: function(index, elem) {},
		// transitionEnd: function(index, elem) {}
	});
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
	
	var $restaurantsList = $('#restaurant_listview');
	var restaurantsData = data.Restaurants;
	var restaurantsElementsCollection = [];
	
	console.log(restaurantsData);
	
	
	for( var i in restaurantsData ) {
		var currentRestaurant = restaurantsData[i];
		var $restaurantElement = $('<li>');
		$restaurantElement.attr('class','listcontent');
		$restaurantElement.append('<a>');
		$restaurantElement.find('a')
					.attr('href','#restaurant_details')
					.html(currentRestaurant.Name)
					.append('<img class="listimage" src="'+currentRestaurant.Pictures[0]+'" />')
					.append('<p>'+currentRestaurant.Location+'</p>')
					.append('<p>'+currentRestaurant.OpeningHours+'</p>')
					.data('index',i)
					.click(function(){
							showRestaurant($(this).data('index'));
						});
		restaurantsElementsCollection.push($restaurantElement);
	}
	
	$restaurantsList
		.append(restaurantsElementsCollection)
		.listview('refresh');
	
}

function showRestaurant(restaurantindex) {
	selectedRestaurantIndex = restaurantindex; 
	$.mobile.changePage($("#restaurant_details"));
}








/* Restaurant Details */

$('#restaurant_details').on('pagebeforeshow', function() {
	initRestaurantDetails();
});

function initRestaurantDetails() {
	// TODO: Load all restaurant details 
	// hint: how could  selectedRestaurantIndex  be useful here?

	var currentRestaurant = data.Restaurants[selectedRestaurantIndex];
	
	
	
	loadRestaurantData(currentRestaurant);
	loadRestaurantImages(currentRestaurant);
}

function loadRestaurantData(restaurant) {
	$('#restaurant_details_header').html(restaurant.Name);
	
	var address = 
			restaurant.Name+'<br/>'+
			restaurant.Street+'<br/>'+
			restaurant.ZIPCode+', '+restaurant.Town+'<br/>'+
			restaurant.Telephone+'<br/>'+
			restaurant.Email+'</p>';
	
	var map_image = 'http://maps.googleapis.com/maps/api/staticmap?markers=';
	map_image += restaurant.Coordinates;
	map_image += '&zoom=16&size=350x350&scale=2&sensor=false';
			
	
	$('#restaurant-data')
		.empty()
		.append('<h2>'+restaurant.Name+'</h2>')
		.append('<p><strong>Type:</strong> '+restaurant.Type+'</p>')
		.append('<p><strong>Opening Hours:</strong> '+restaurant.OpeningHours+' stars</p>')
		.append('<p><strong>Location:</strong> '+restaurant.Location+'</p>')
		.append('<p><strong>Seating:</strong> '+restaurant.Seats+'</p>')
		.append('<p>'+restaurant.Extra+'</p>')
		.append('<h3>Address & Contact</h3>')
		.append('<p>'+address+'</p>')
		.append('<h3>Description</h3>')
		.append('<p>'+restaurant.Description+'</p>')
		.append('<h3>Map</h3>')
		.append('<img class="map-image" src="'+map_image+'" />');
	

}

function loadRestaurantImages( restaurant ) {
	
	var restaurantImageElementsCollection = [];
	var pictures = restaurant.Pictures;
	
	
	for( var i in pictures ) {
		var pictureHtml = '<div display="none"><img src="'+pictures[i]+'" height="200" width="300"/></div>';
		restaurantImageElementsCollection.push( $( pictureHtml ) );
	}
	
	$('#restaurant_photos')
		.empty()
		.append(restaurantImageElementsCollection);
	
	
	var sliderTimeout = isMobile ? 2000 : 500;
	setTimeout("initSlider('restaurantSlider');", sliderTimeout);
}


function InitRestaurantDetailsButtons() {
	$('#restaurant-call-btn').click(function(){
		if( !selectedRestaurantIndex ) {
			return;
		}
		var restaurant = data.Restaurants[selectedRestaurantIndex];
	});
	
	$('#restaurant-contact-btn').click(function(){
		if( !selectedRestaurantIndex ) {
			return;
		}
		var restaurant = data.Restaurants[selectedRestaurantIndex];
	});
	
	$('#restaurant-maps-btn').click(function(){
		if( !selectedRestaurantIndex ) {
			return;
		}
		var restaurant = data.Restaurants[selectedRestaurantIndex];
	});
} 