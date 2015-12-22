$(document).ready(function() {

	// Call the blinking function for Play button to blink
	blinking();
	
	$("button").on("click", function() {
		// Stop the button from blinking after it's been clicked
		$(this).removeClass("blink");

		// Disable button once game has started
		$("button").attr("disabled", true);

		// Set first reel to stop between 500 to 800 milliseconds
		var random1 = Math.floor(Math.random() * (800 - 500 + 1)) + 500;
		// Set second reel to stop between 1000 to 1300 milliseconds
		var random2 = Math.floor(Math.random() * (1300 - 1000 + 1)) + 1000;
		// Set third reel to stop between 1500 to 1800 milliseconds
		var random3 = Math.floor(Math.random() * (1800 - 1500 + 1)) + 1500;

		// 
		var slot1_Spin = slotSpin($("#slot1 img"));
		var slot2_Spin = slotSpin($("#slot2 img"));
		var slot3_Spin = slotSpin($("#slot3 img"));

		// Each slot stops at a different random time
		// Once the third slot stops, code calls isWinner() to check if player wins a cup of caffeine
		setTimeout(function() {
			clearInterval(slot1_Spin);
		}, random1);
		setTimeout(function() {
			clearInterval(slot2_Spin);
		}, random2);
		setTimeout(function() {
			clearInterval(slot3_Spin);
			isWinner();
		}, random3);
	});

	// Spins slot
	function slotSpin(images) {
		var index = 0;

		return setInterval(function() {
			images.eq(index).removeClass("active").addClass("inactive");
			if (index === 2) {
				index = 0;
			}
			else {
				index++;
			}
			images.eq(index).removeClass("inactive").addClass("active");
		}, 30);
	}

	// Check if player is a winner
	function isWinner() {

		var drinks = ["Coffee", "Tea", "Espresso"]
		var images = { "winner": "../images/winner.png", "loser": "../images/cry.png" };
		var isWinnerFlag;
		// Check which image is at the first slot, check it against second and third slots
		var activeIndex = $("#slot1 img.active").index();
		if ($("#slot2 img.active").index() === activeIndex && $("#slot3 img.active").index() === activeIndex) {
			isWinnerFlag = true;
			announcement(isWinnerFlag, images["winner"], drinks[activeIndex]);
		}
		else {
			isWinnerFlag = false;
			announcement(isWinnerFlag, images["loser"]);
		}
	}

	// Displays animation and text based on game result
	function announcement(flag, image, drink) {
		$(".result").delay(400).queue(function() {
			$(this).addClass("animate").append("<img src='"+ image + "'/>").dequeue();
		});
		setTimeout(function() {
			$(".result").removeClass("animate").empty();
			if (flag) {
				$(".result").addClass("text").html("You win " + drink + "!").animate({ "top": "25%" });
			}
			else {
				$(".result").addClass("text").html("Better luck next time!").animate({ "top": "25%" });
			}
		}, 2000);
		setTimeout(function() {
			$(".result").removeClass("text").empty().removeAttr("style");
			reset();
		}, 3800);
	}

	// Reset function to start a new round
	function reset() {
		// re-enable start button
		$("button").attr("disabled", false);
		$("button").addClass("blink");
		blinking();
		//$("#slot1, #slot2, #slot3").children().removeClass("active").addClass("inactive");
	}

	// Make the Play for Caffeine! button blink
	function blinking() {
		$(".blink").animate({
			opacity: 0.1
		}, 600, function() {
			$(this).animate({
				opacity: 1.0
			}, 600, blinking);
		});
	}
});