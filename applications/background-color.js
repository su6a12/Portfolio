"use strict";
// var color = $("body").css("background-color");

$(document).ready(function() {
//"Pick Your Color" button
	$("#revealColorSelect").click(function() {
		$("#colorSelect").toggle();
	});

	function changeColor() {
		var red = $("#red").val();
		var green = $("#green").val();
		var blue = $("#blue").val();
		$("#newColorBox").css("background-color", "rgb(" + red + "," + green + "," + blue + ")");
	}

	//Updates color box in real time
	$("input[type=range]").on("input", changeColor);

	//"Change Background" button
	$("#change-color").click(function() {
		$("body").css("background-color", $("#newColorBox").css("background-color"));
		$("#red").val(0);
		$("#green").val(0);
		$("#blue").val(0);
		$("#newColorBox").css("background-color", "black");
	});
})
