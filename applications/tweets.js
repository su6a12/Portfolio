$(function() {

	$("#findTweets").click(function(event) {

		event.preventDefault();


		var hashtag = $("#tweets").val();


		if (hashtag !== "") {

			$.get("../my_projects/twitter_search.php?hashtag=" + hashtag, function(data) {
				console.log(data);
			});
		}

	});

});