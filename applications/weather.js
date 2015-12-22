$(function() {
	$("#findCityBtn").click(function(event) {

		event.preventDefault();

		var city = $("#city").val();

		if (city !== "") {

			$.get("../my_projects/scraper.php?city=" + city, function(data) {

				// warning message, possibly due to invalid city input
				if (data.search("Warning") !== -1 || data === "") {
					$(".alert-success").hide();
					$(".alert-danger").html("Please enter a valid city.").fadeIn();
				}
				else {
					$(".alert-danger").hide();
					$(".alert-success").html(data).fadeIn();
				}

			});	// end of $.get()
		}
		else {
			$(".alert-success").hide();
			$(".alert-danger").html("Please enter a city name.").fadeIn();
		}

	}); // end of click
});