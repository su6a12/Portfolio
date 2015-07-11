$(document).ready(function() {

	var $inputBox = $("#word-count");
	var $triesBox = $("#tries");
	var $guessBox = $("#letter-guess");
	var $wordArray = [];
	var $rightLetters = [];
	var $wrongLetters = [];
	var $letterGuess = "";
	var $correctFlag = false;
	var $correctLetterCount = 0;
	var $tries = 0;
	var $triesCount = 0;
	var $incorrectList = $('<ul></ul>');

	$inputBox.focus();

	////////////pressing letter count button//////////////
	$("#new-word").click(function() {
		$(this).css("display", "none");		//hide the generate button

		var letters = $inputBox.val();
		$tries = $triesBox.val();
		if (parseInt(letters) <= 15) {			//set limit on word length
			if ($tries <= 15) {
				$inputBox.css("display", "none");	//hide text fields
				$inputBox.prev().css("display", "none");	//hide labels
				$triesBox.css("display", "none");
				$triesBox.prev().css("display", "none");

				$("#hangman-game").css("display", "block");	//show game setup

				var wordnikAPI = "http://api.wordnik.com/v4/words.json/randomWord";

				var wordnikOptions = {
					// "dataType": "jsonp",
					"api_key": "aba07633c0aede35697bd05ceac0cb469b0ad6d7f34a3c5e0",
					"minCorpusCount": 5000,
					"minDictionaryCount": 5,
					"minLength": letters,
					"maxLength": letters,
					"hasDictionaryDef": "true"
				};

				function newWord(data) {
					var newRandomWord = data.word;	//store random word in variable
					$wordArray = newRandomWord.toLowerCase().split("");
					//console.log($wordArray); 							//////////////////////
					var hiddenWord = '<ul id="guesses">';
					for(var i = 0; i < newRandomWord.length; i++) {
						hiddenWord += '<li id="letter-' + i + '" class="letter">_</li>';
					}
					hiddenWord += '</ul>'
					$("#word-display").html(hiddenWord);
				}
				$.getJSON(wordnikAPI, wordnikOptions, newWord);
			}
			else {
				alert("Can't get that many tries!");
				$(this).css("display", "block");		//hide the generate button
				$inputBox.val("");
				$triesBox.val("");
				$inputBox.focus();
			}
		}	//end of if statement checking for letter count
		else {										//ask user for a word count < 15
			alert("Smaller number please...");
			$(this).css("display", "block");		//hide the generate button
			$inputBox.val("");
			$inputBox.focus();
		}
	}); //end of #new-word button click

	/////////pressing Guess! button////////////////////
	$("#letter-guess-btn").click(function() {
		if (/[^a-zA-Z]/.test($guessBox.val())) {		//make sure input is a letter
			alert("Only letters please!");
			$guessBox.val("");	//clear text field
			$guessBox.focus();
		}
		else {
			$letterGuess = $guessBox.val().toLowerCase();
			$guessBox.val("");	//clear text field
			$guessBox.focus();
			//console.log($letterGuess);							////////////////////////
			if ($triesCount < $tries) {
				if (($.inArray($letterGuess, $rightLetters) === -1) && ($.inArray($letterGuess, $wrongLetters) === -1)) {
					for(var i = 0; i < $wordArray.length; i++) {	//check if guessed letter is part of word and
						if ($wordArray[i] === $letterGuess) {		//also check for multiples
							$rightLetters.push($letterGuess);
							$("#guesses").children("li").eq(i).html($letterGuess);
							$correctLetterCount += 1;
							$correctFlag = true;
						}
					} //end of for loop	
					checkCorrectness($correctFlag);
				}
			}
			else {
				alert("No more guesses. Try again!");
				$("#letter-guess").prop("disabled", true);
				$("#hangman-game-reset").css("display", "block");
			}
		} //end of else	

		if ($correctLetterCount === $wordArray.length) {
				alert("You win!");
				$(this).prop("disabled", true);
				$("#letter-guess").prop("disabled", true);
				$("#hangman-game-reset").css("display", "block");
		}
	});

	////////////////pressing Reset button/////////////////
	$("#hangman-reset-btn").click(function() {
		location.reload();
		$inputBox.val("");
	});

	function checkCorrectness(result) {
		if (!result) {
			$triesCount += 1;
			$("#guesses-so-far").text($triesCount);
			$wrongLetters.push($letterGuess);
			$letterGuess.toUpperCase();
			$incorrectList.append('<li>' + $letterGuess + '</li>');
			$("#incorrect-guesses").append($incorrectList);
		}
		$correctFlag = false;		//reset flag variable
	} //end of checkCorrectness function
})