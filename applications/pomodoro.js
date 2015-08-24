var pomodoroApp = angular.module("pomodoroApp", []);

pomodoroApp.controller("pomodoroController", ["$scope", "$timeout", function($scope, $timeout) {
	$scope.workTime = 25;																// set initial work and display to 25 mins
	$scope.breakTime = 5;															// set initial break to 5 mins
	$scope.isBegin = "begin";														// set button text to "begin"
	$scope.countdown = $scope.workTime;
	var minutes = $scope.countdown;
	var seconds = 0;
	var isPlaying = false;
	var isWork = true;
	var audio = new Audio("http://www.noiseaddicts.com/samples_1w72b820/3719.mp3");
	var timeout;

	$scope.updateTimer = function() {
		if (minutes > 0) {
			if (seconds === 0) {
				seconds = 60;
				minutes--;
			}
			seconds--;
		}
		else if (minutes === 0) {
			if (seconds > 0) {
				seconds--;
			}
		}

		var red = Math.floor(Math.random() * 255);					// randomize color of countdown text
		var green = Math.floor(Math.random() * 255);
		var blue = Math.floor(Math.random() * 255);
		$("#timer").css("color", "rgb(" + red + ", " + green + ", " + blue + ")");

		$scope.countdown = "" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

		if (minutes === 0 && seconds === 0) {
			audio.play();
			$scope.isBegin = "pause";													// break immediately begins
			if (isWork) {																			// check if work interval complete			
				$scope.countdown = $scope.breakTime;						// switch to break interval
				isWork = false;
			}
			else {
				$scope.countdown = $scope.workTime;							// switch back to work interval
				isWork = true;
			}
			minutes = $scope.countdown;
			timeout = $timeout($scope.updateTimer, 1000);			// start break countdown
		}
		else {
			timeout = $timeout($scope.updateTimer, 1000);
		}
	};

	$scope.start_stop = function() {
		if (!isPlaying) {
			timeout = $timeout($scope.updateTimer, 1000);
			isPlaying = true;
			$scope.isBegin = "pause";													// currently playing
		}
		else {
			$timeout.cancel(timeout);
			isPlaying = false;
			$scope.isBegin = "resume";												// currently paused
		}
	};

	$scope.clearTimer = function() {											// clear button resets all variables
		$timeout.cancel(timeout);
		$scope.workTime = 25;
		$scope.breakTime = 5;
		$scope.isBegin = "begin";
		isPlaying = false;
		isWork = true;
		$scope.countdown = $scope.workTime;
		minutes = $scope.countdown;
		seconds = 0;
	};

	$scope.addWork = function(time) {
		if (time > 0) {
			if (!isPlaying) {
				$scope.workTime++;
				$scope.countdown++;
				minutes++;
			}
		}
	};
	$scope.subWork = function(time) {
		if (time > 0) {
			if (!isPlaying) {
				$scope.workTime--;
				$scope.countdown--;
				minutes--;
			}
		}
	};
	$scope.addBreak = function(time) {
		if (time > 0) {
			if (!isPlaying) {
				$scope.breakTime++;
				if (!isWork) {
					minutes++;
				}
			}
		}
	};
	$scope.subBreak = function(time) {
		if (time > 0) {
			if (!isPlaying) {
				$scope.breakTime--;
				if (!isWork) {
					minutes--;
				}
			}
		}
	};
}]);