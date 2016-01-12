$(window).scroll(function() {
	var scrollHeight = $(this).scrollTop();
	var headerHeight = $("#header").height();

	if (scrollHeight < headerHeight) {
	// Fades title in and out depending on page position
		$("#title").css({ 
										"opacity": 0.8 - scrollHeight / 400,
										"transform": "translate(0px, " + scrollHeight / 2.5 + "%)"
										});		// Creates the fading effect for the main title

	}

	// Fades nav bar in and out depending on page position
	// Want to fade in nav bar before about me section, so starting 
	if (scrollHeight >= (headerHeight - 75)) {
		$("#main-nav").css({
											"position": "fixed",
											"top": 0
											}).fadeIn(600);

		 $("p span").each(function(index) {
	        		$(this).delay(index * 1000).fadeIn(1000);
	      			});
	}
	if (scrollHeight < (headerHeight - 75)) {
		$("#main-nav").fadeOut("fast");
	}

	// Fade project thumbnails in and out depending on page position
	// Start the fade in before the section reaches top of screen
	if (scrollHeight > $("#projects").offset().top - ($(window).height() / 1.5)) {
		$(".project").each(function(index) {
			setTimeout(function() {
				// eq() takes the index of a set of DOM elements and only applies code to that
			$(".project").eq(index).addClass("showImg");
			}, 200 * (index + 1));
		});
	}

	// if (scrollHeight > $("#lol-window").offset().top - $(window).height()) {
	// 	var opacity = (scrollHeight - $("#lol-window").offset().top + 200) / (scrollHeight / 3);
	// 	$("#lol-window").css({
	// 											"background-position": "center " + (scrollHeight - $("#lol-window").offset().top + 10) + "px"
	// 											});
	// 	$("#window-transition").css({
	// 															"opacity": opacity
	// 															});
	// }
});		// end of window.scroll

// Go to position on page where desired section is
$("a[href^='#']").on("click", function(event) {
	event.preventDefault();
	var $target = $(this.hash);
	$("html, body").animate({
			scrollTop: $target.offset().top
	}, 500);
});




