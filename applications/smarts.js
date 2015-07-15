$(document).ready(function() {

	var triviaAPI = "http://api.futuretraxex.com/v1/getRandomQuestion?callback=?";

	// var triviaOptions = {
	// 	"Accept": application/json
	// };

	function triviaQs(data) {
		console.log(data.q_text);
	} 

	$.getJSON(triviaAPI, triviaQs);
});
	