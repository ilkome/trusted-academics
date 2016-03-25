/* 

	ILya Komichev
	ilko.me

*/



$(function() {

	// ==============================================
	//	custom #select
	// ==============================================	
	$('select, .js-styler').styler({
		selectSearch: false,
		selectSmartPositioning: true,
	});


	// ===============================================
	//	scroller
	// ===============================================
	$(".js-scrollerbox").mCustomScrollbar({
		scrollInertia:150,
		advanced:{
			updateOnContentResize: true
		}
	});



	// ===============================================
	//	order btn
	//	remove this on production 
	// ===============================================
	$(".js-toogle-class").on("click", function(e) {
		e.preventDefault();
		$(this).toggleClass("btn-grey");
	});



	// ===============================================
	// block animation on home
	// ===============================================2
	if($(".headerhome").length) {
		var windowHeight = $(window).height();

		// services
		servicesPosition = $(".services").offset().top - windowHeight + windowHeight/2;
		servicesContent = $(".services__content").addClass("is-animate");
		animateServices();

		// guarantees
		guaranteesPosition = $(".guarantees").offset().top - windowHeight + windowHeight/2;
		guaranteesContent = $(".guarantees__content").addClass("is-animate");
		animateGuarantees();


		$(window).on('scroll', function(){
			animateServices();
			animateGuarantees();
		});
	}

	function animateServices() {
		if($(window).scrollTop() > servicesPosition ) {
			servicesContent.addClass('is-animated');
		}
	}

	function animateGuarantees() {
		if($(window).scrollTop() > guaranteesPosition ) {
			guaranteesContent.addClass('is-animated');
		}
	}



	// ===============================================
	// header menu
	// ===============================================
	var headmenu = $('.js-headmenu'),
	headmenuTopPosition = 400;
	
	animateHeader();
	$(window).on('scroll', function(){
		animateHeader();
	});

	function animateHeader() {
		if($(window).scrollTop() > 200) {
			headmenu.addClass('headmenu-fixed-hide');
		} else {
			headmenu.removeClass('headmenu-fixed-hide');
		}
		
		if($(window).scrollTop() > headmenuTopPosition && ($(window).width() > 1010)) {
			headmenu.addClass('headmenu-fixed');
		} else {
			headmenu.removeClass('headmenu-fixed');
		}
	}




	// ===============================================
	// order price fixed block
	// ===============================================
	var orderprice = $(".js-orderprice-fixed");
	if(orderprice.length) {

		orderprice.sticky({
			topSpacing:130,
			bottomSpacing:400
		});

		if($(window).width() < 1010) {
			orderprice.unstick();
		}
	}

	$(".js-order-show").on("click", function(e){
		e.preventDefault();
		if($(".js-order-hidden").is(":visible")) {
			$(".js-order-hidden").slideUp("", function(){
				orderprice.sticky('update');
			});
		} else {
			$(".js-order-hidden").slideDown("", function(){
				orderprice.sticky('update');
			});
		}

	});



	// ===============================================
	// google map
	// ===============================================
	if($("#gmap").length) {
		var map;

		function initializeGmap() {
			// position
			var latitude = 51.752847,
				longitude = -1.258455,
				map_zoom = 11;

			// marker
			var markerUrl = "img/map-marker.png";

			// styles
			var style = [{"stylers": [{ "hue": "#ffa200" }]}];

			// set google map options
			var mapOptions = {
				center: new google.maps.LatLng(latitude, longitude),
				zoom: map_zoom,
				panControl: false,
				zoomControl: true,
				mapTypeControl: false,
				streetViewControl: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false,
				styles: style,
			};
			
			// inizialize the map
			map = new google.maps.Map(document.getElementById('gmap'), mapOptions);

			// add a custom marker to the map
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude, longitude),
				map: map,
				visible: true,
				icon: markerUrl,
			});
		}

		//	add listener
		google.maps.event.addDomListener(window, 'load', initializeGmap);
	}
});