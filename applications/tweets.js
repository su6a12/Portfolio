"use strict";

$("#hashtag-search").focus(function() {
	$(this).val("");
});


$("#search").click(function(event) {
	event.preventDefault();
	var $hashtag = $("#hashtag-search").val();

	var twitterAPI = "https://api.twitter.com/1.1/search/tweets.json?jsoncallback=?";
	var twitterOptions = {
		q: "%23" + $hashtag,
		callback: "data"
	};
	function displayTweets(data) {
		$("#tweet-results").html

	}
	$.getJSON(twitterAPI, twitterOptions, displayTweets);


});