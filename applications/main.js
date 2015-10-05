$("#about-link").click(function() {
  $("span").each(function(index) {
    $(this).delay(index * 1000).fadeIn(1000);
  });
});

$(window).scroll(function() {
	var scrollHeight = $(this).scrollTop();
	// Fades title in and out depending on page position
	$(".title").css({ 
							"opacity": 0.8 - scrollHeight / 400,
							"transform": "translate(0px, " + scrollHeight / 2.5 + "%)"
							});		// Creates the fading effect for the main title

	// Fades nav bar in and out depending on page position
	if (scrollHeight >= 400) {
		$("#main-nav").css({
							"position": "fixed",
							"top": 0
							}).fadeIn(800);

		 $("p span").each(function(index) {
          		$(this).delay(index * 1000).fadeIn(1000);
        			});
	}
	if (scrollHeight < 400) {
		$("#main-nav").fadeOut("fast");
	}

	// Fade project thumbnails in and out depending on page position
	// Start the fade in before the section reaches top of screen
	if (scrollHeight > $("#projects-list").offset().top - ($(window).height() / 1.5)) {
		$(".project").each(function(index) {
			setTimeout(function() {
				// eq() takes the index of a set of DOM elements and only applies code to that
			$(".project").eq(index).addClass("show");
			}, 200 * (index + 1));
		});
	}
});		// end of window.scroll

// Go to position on page where desired section is
$("a[href^='#']").on("click", function(event) {
	event.preventDefault();
	var $target = $(this.hash);
	$("html, body").animate({
			scrollTop: $target.offset().top - 40
	}, 500);
});




