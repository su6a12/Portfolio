var count = 0;
var winner = false;
var player1RGB, player2RGB, rgbVal, position;

$("#revealColorSelect").click(function() {
	$("#colorSelect").toggle();
});

function changeColor() {
	var r = $("#red").val();
	var g = $("#green").val();
	var b = $("#blue").val();
	$("#newColorBox").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
	rgbVal = "rgb(" + r + "," + g + "," + b + ")";
}

$("input[type=range]").on("input", changeColor);

//reset slider to black after selection is made
function resetColor() {
	$("#red").val(0);
	$("#green").val(0);
	$("#blue").val(0);
	$("#newColorBox").css("background-color", "black");
}
//set player1 color
$("#player1-color").click(function() {
	player1RGB = rgbVal;
	$(this).css("background-color", player1RGB);
	resetColor();
});
//set player2 color
$("#player2-color").click(function() {
	player2RGB = rgbVal;
	$(this).css("background-color", player2RGB);
	resetColor();
});

$(".square").click(function() {
	count += 1;
	//player 1
	if (count % 2 !== 0 || count === 1) {
		$(this).css("background-color", player1RGB);
		$(this).addClass("X");
		checkVictory("X");
	} 
	//player 2
	else {
		$(this).css("background-color", player2RGB);
		$(this).addClass("O");
		checkVictory("O");
	}
});
			
function checkVictory(player) {
	if ($("#one").hasClass(player) && $("#two").hasClass(player) && $("#three").hasClass(player) ||
		$("#one").hasClass(player) && $("#five").hasClass(player) && $("#nine").hasClass(player) ||
		$("#one").hasClass(player) && $("#four").hasClass(player) && $("#seven").hasClass(player) ||
		$("#two").hasClass(player) && $("#five").hasClass(player) && $("#eight").hasClass(player) ||
		$("#three").hasClass(player) && $("#five").hasClass(player) && $("#seven").hasClass(player) ||
		$("#three").hasClass(player) && $("#six").hasClass(player) && $("#nine").hasClass(player) ||
		$("#four").hasClass(player) && $("#five").hasClass(player) && $("#six").hasClass(player) ||
		$("#seven").hasClass(player) && $("#eight").hasClass(player) && $("#nine").hasClass(player)) {
			if (player === "X") {
				$("#tictac-result").html("Player 1 Wins!");
				$(".square").unbind("click");
			} else {
				$("#tictac-result").html("Player 2 Wins!");
				$(".square").unbind("click");
			}
		$("#revealColorSelect").hide();
		$("#colorSelect").hide();
		$("#resetBoard").show();
	} else if (count === 9) {
		$("#tictac-result").html("It's a Tie!");
		$("#revealColorSelect").hide();
		$("#colorSelect").hide();
		$("#resetBoard").show();
	} 
}

//reset board
$("#resetBoard").click(function() {
	$("#gameboard").children().css("background-color", "white").removeClass("X O");
	$("#resetBoard").hide();
	$("#tictac-result").html("");
	$("#revealColorSelect").show();
	$("#player1-color").css("background-color", "DarkCyan");
	$("#player2-color").css("background-color", "DarkCyan");
	count = 0;
});

