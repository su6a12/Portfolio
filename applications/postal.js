$(function() {

	$("#findZipBtn").click(function(event) {

		event.preventDefault();

		var address = $("#address").val();

		// use variable to check if user inputs valid address with postal code
		var result = 0;

		// encodeURIComponent encodes special characters and , / ? : @ & = + $ #
		$.ajax({
			type: "GET",
			url: "https://maps.googleapis.com/maps/api/geocode/xml?address=" + encodeURIComponent(address) + "&key=AIzaSyAATjC6denyIPy9E7UmaN427-tQFmsLFQc", 	
			dataType: "xml",
			success: function(xml) {
				$(xml).find("address_component").each(function() {
					if ($(this).find("type").text() === "postal_code") {
						var postal = $(this).find("long_name").text();
						$(".alert-danger").hide();
						$(".alert-info").html(postal).fadeIn();
						result = 1;
					}
				});
				// reset text input field
				$("#address").val("");
			},	// end of success
			error: function() {
				$(".alert-danger").html("We've encountered an error. Please try again.").fadeIn();
			}
		});

		if (result === 0) {
			$(".alert-info").hide();
			$(".alert-danger").html("Please enter a valid address.").fadeIn();
		}

	}); // end of click
});