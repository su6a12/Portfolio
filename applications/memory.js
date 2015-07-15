var catPics = ["http://www.lolcats.com/images/u/12/24/lolcatsdotcompromdate.jpg", "http://www.lolcats.com/images/u/12/24/lolcatsdotcompromdate.jpg",
				"http://www.lolcats.com/images/u/12/43/lolcatsdotcomnapkin.jpg", "http://www.lolcats.com/images/u/12/43/lolcatsdotcomnapkin.jpg",
				"http://www.lolcats.com/images/u/12/43/lolcatsdotcomlikemyself.jpg", "http://www.lolcats.com/images/u/12/43/lolcatsdotcomlikemyself.jpg",
				"http://www.lolcats.com/images/u/12/24/lolcatsdotcommojo.jpg", "http://www.lolcats.com/images/u/12/24/lolcatsdotcommojo.jpg",
				"http://www.lolcats.com/images/u/08/52/lolcatsdotcom4t7m1sfb7dm4p7nt.jpg", "http://www.lolcats.com/images/u/08/52/lolcatsdotcom4t7m1sfb7dm4p7nt.jpg",
				"http://www.lolcats.com/images/u/07/37/lolcatsdotcome9c4h5zlpmp0sxsf.jpg", "http://www.lolcats.com/images/u/07/37/lolcatsdotcome9c4h5zlpmp0sxsf.jpg",
				"http://www.lolcats.com/images/u/11/45/lolcatsdotcom3gp6wm7dw3jihq9t.jpg", "http://www.lolcats.com/images/u/11/45/lolcatsdotcom3gp6wm7dw3jihq9t.jpg",
				"http://www.lolcats.com/images/u/08/46/lolcatsdotcombsr71ehdl7l9ocf2.jpg", "http://www.lolcats.com/images/u/08/46/lolcatsdotcombsr71ehdl7l9ocf2.jpg"]

var guessCount = 0;		//keep track of number of guesses
var tileFlipCount = 0;
var matches = 0;
var firstTile = "";
var firstTile_id = ""; 
var secondTile = "";
var secondTile_id = "";
var resetButton = document.getElementById("memory-reset");


function shufflePics(catPics) {
	//Fisher-Yates shuffle method
	for(var i = catPics.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = catPics[i];
		catPics[i] = catPics[j];
		catPics[j] = temp;
	}
	return catPics;
}

shufflePics(catPics);

for(var i = 0; i < catPics.length; i++) {
	var x = document.getElementById("preload");
	var img = document.createElement("img");
	img.style.display = "none";
	img.src = catPics[i];
	x.appendChild(img);
}

function setTiles() {
	var tiles = document.querySelectorAll(".tile");
	for(var i = 0; i < tiles.length; i++) {
		tiles[i].setAttribute("bottomsrc", catPics[i]);		//create own attribute to store URL of cat image
	}
}

setTiles();

// document.getElementsByClassName("tile").style.cursor = "pointer";

function flip(tile) {
	if (tileFlipCount === 0) {
		//tile.classList.add("over");
		tile.style.backgroundImage = 'url("' + tile.getAttribute("bottomsrc") + '")';
		tile.style.backgroundSize = "contain";
		tile.style.backgroundRepeat = "no-repeat";
		firstTile = tile.getAttribute("bottomsrc");
		firstTile_id = tile.id;
		tileFlipCount += 1;
	}
	else if (tileFlipCount === 1) {
		//tile.classList.add("over");
		tile.style.backgroundImage = 'url("' + tile.getAttribute("bottomsrc") + '")';
		tile.style.backgroundSize = "contain";
		tile.style.backgroundRepeat = "no-repeat";
		secondTile = tile.getAttribute("bottomsrc");
		secondTile_id = tile.id;
		tileFlipCount += 1;
		guessCount += 1;
		//check if both tiles are a match
		if (firstTile === secondTile) {
			matches += 1;
			firstTile = "";		//reset tiles info variables
			secondTile = "";
			firstTile_id = "";
			secondTile_id = "";
			tileFlipCount = 0;
			//tile.classList.remove("over");
			//if entire board is matched
			if (matches === 8) {
				alert("Congratuations! Great Memory!");
				resetButton.style.display = "block";	//show reset button
			}
		}//end of both tiles equal check
		else {
			function flipBack() {		//create a new function to set flip back time
				document.getElementById(firstTile_id).style.backgroundImage = 'url("../images/question-mark.jpg")';
				document.getElementById(secondTile_id).style.backgroundImage = 'url("../images/question-mark.jpg")';
				firstTile = "";
				secondTile = "";
				firstTile_id = "";
				secondTile_id = "";
				tileFlipCount = 0;
				//tile.classList.remove("over");
			}
			setTimeout(flipBack, 700);
		}
	}
} //end of flip function

function reset() {
	shufflePics(catPics);
	setTiles();
	var tdReset = document.getElementsByTagName("td")
	for(var i = 0; i < tdReset.length; i++) {
		tdReset[i].style.backgroundImage = 'url("../images/question-mark.jpg")';
	}
	resetButton.style.display = "none";		//hide reset button
}



