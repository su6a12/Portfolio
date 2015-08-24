$(document).ready(function() {

	var currNumList = [];	// keeps track of number to perform calculations on
	var result = 0;				// keeps track of result so far
	var currNum = "";			// keeps track of numerical input in string form
	var mathFunc = "";		// keeps track of mathematical calculations to perform

	$("div.btn").on("click", function() {
		// if button clicked is CE (Clear Entry), clear current numerical input
		if ($(this).attr("id") === "clear-entry") {
			$("#display").html("0");
			currNum = "";
		}
		// if button clicked is AC (All Clear), clear all entries and variables
		else if ($(this).attr("id") === "all-clear") {
			$("#display").html("0");
			currNum = "";
			currNumList = [];
			result = 0;
			mathFunc = "";
		}
		// if button clicked is a number, save numbers in currNum and display on screen
		// limit number count to 13
		else if ($(this).hasClass("number")) {
			if (currNum.length < 13) {
				currNum += $(this).html();
				$("#display").html(currNum);
			}
		}
		// for all other buttons
		else if ($(this).hasClass("func")) {
			if (currNum !== "") {
				// push current number to array list
				currNumList.push(parseFloat(currNum));
				currNum = "";
				// if two numbers entered
				if (currNumList.length === 2) {
					result = doTheMath(currNumList[0], currNumList[1], mathFunc); // use previous mathFunc to perform calculation
					currNumList.splice(0, 2, parseInt(result));		// clear list of numbers and add result for next calculation
					$("#display").html(result);
					currNum = "";
				}
				mathFunc = $(this).html();	// save current math function for next iteration
			}
		}
		// if equal button
		else if ($(this).html() === "=") {
			if (currNum !== "") {
				currNumList.push(parseFloat(currNum));
				if (currNumList.length === 1) {
					$("#display").html(currNumList[0]);
				}
				else {
					result = doTheMath(currNumList[0], currNum, mathFunc);
					$("#display").html(result);
					mathFunc = "";
					currNumList = [];
				}
			}
			
		}
		
	}).on("mousedown", function() {
		// randomize click colors
		var red = Math.floor(Math.random() * 255);
		var green = Math.floor(Math.random() * 255);
		var blue = Math.floor(Math.random() * 255);
		$(this).css("background-color", "rgb(" + red + ", " + green + ", " + blue + ")");
	// return to normal color on mouseup
	}).on("mouseup", function() {
		$(this).css("background-color", "white");
	});
});

function doTheMath(num1, num2, mathFunc) {
	console.log(num1, num2, mathFunc);
	var num1 = parseFloat(num1), num2 = parseFloat(num2);
	switch(mathFunc) {
		case "%":
			var result = num1 % num2;
			return result.toString().substring(0, 13);		// max number places to fit in display is 13
			break;
		case "/":
			var result = num1 / num2;
			return result.toString().substring(0, 13);
			break;
		case "+":
			var result = num1 + num2
			return result.toString().substring(0, 13);;
			break;
		case "-":
			var result = num1 - num2;
			return result.toString().substring(0, 13);;
			break;
		case "*":
			var result = num1 * num2;
			return result.toString().substring(0, 13);;
			break;
	}
}