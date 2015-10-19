var myApp = angular.module("myApp", []);

myApp.controller("myController", ["$scope", "$http", function($scope, $http) {
  var searchText, wikiAPI;
  var wikiResult = "https://en.wikipedia.org/wiki/";
  $scope.resultsList = [];

  $scope.searchQuery = function() {
  	$scope.resultsList = [];
  	searchText = $("#search-field").val();
  	//generator returns a list of pageids, those are in turn plugged into wikipedia URL to retrieve page URL
  	wikiAPI = "http://en.wikipedia.org/w/api.php?action=query&generator=search&prop=extracts&exintro=true&exlimit=max&explaintext=true&" +
  						"exsentences=1&pilimit=max&format=json&gsrsearch=" + searchText + "&callback=JSON_CALLBACK";

  	$http.jsonp(wikiAPI).
	  	then(function(data) {
	  		console.log(data);
	    	var results = data.data.query.pages;
	    	console.log(results);
	    	$.each(results, function(key, value) {
	    		$scope.resultsList.push({ title: value.title, snippet: value.extract, link: wikiResult + value.title.replace(/\s/g, '%20') });
	    	});
	    	console.log($scope.resultsList);
	  		}, function(error) {
	    	console.log(error);
	  	});		// end of then callback
		//});				// end of button event listener
	}
	$scope.randomize = function() {
		$scope.resultsList = [];
		// set list=random
		wikiAPI = "http://en.wikipedia.org/w/api.php?action=query&generator=random&prop=extracts&exintro=true&exlimit=max&explaintext=true&" +
  						"exsentences=1&pilimit=max&format=json&list=random&callback=JSON_CALLBACK";

		$http.jsonp(wikiAPI).
	  	then(function(data) {
	  		console.log(data);
	    	var results = data.data.query.pages;
	    	console.log(results);
	    	$.each(results, function(key, value) {
	    		$scope.resultsList.push({ title: value.title, snippet: value.extract, link: wikiResult + value.title.replace(/\s/g, '%20') });
	    	});
	    	console.log($scope.resultsList);
	  		}, function(error) {
	    	console.log(error);
	  	});		// end of then callback
	}

}]);					// end of controller










