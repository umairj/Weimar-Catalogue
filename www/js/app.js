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
	//loadHotelMap(currentHotel);
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
	map_image += '&zoom=16&size=350x350&sensor=false';
			
	
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
	setTimeout(initSlider, sliderTimeout);
}

function initSlider() {
	window.mySlider = new Swipe(document.getElementById("slider"), {
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
