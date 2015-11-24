var diameter = 300;

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

function randomColor() {
	var chars = "0123456789ABCDEF".split('');
	var color = "#";
	for(var i = 0; i < 6; i++) {
		color += chars[Math.round(Math.random() * (chars.length - 1))];
	}
	return color;
}

function hideCircle() {
	var timerHide = Math.random() * 2000 + 1000;
	console.log("inside hideCircle");
	setTimeout(function() {
		document.getElementById("circle").style.display = "none";
	}, timerHide);
}

function createCircle() {
	if (diameter > 0) {
		var top_bottom = Math.floor(Math.random() * (screenHeight - diameter));
		var left_right = Math.floor(Math.random() * (screenWidth - diameter));
		var timerShow = Math.random() * 2000 + 1000;	// Generate a random number between 0 and 3000(in milliseconds);

		setTimeout(function() {
			console.log("timerShow " + timerShow);
			document.getElementById("circle").style.width = diameter + "px";
			document.getElementById("circle").style.height = diameter + "px";
			document.getElementById("circle").style.display = "block";
			document.getElementById("circle").style.borderRadius = "50%";
			document.getElementById("circle").style.backgroundColor = randomColor();
			document.getElementById("circle").style.top = top_bottom + "px";
			document.getElementById("circle").style.left = left_right + "px";
			setTimeout(function() {
				hideCircle();
			}, 0);
		}, timerShow);

		diameter -= 20;
	}
}

document.getElementById("circle").onclick = function() {
	this.style.display = "none";
	createCircle();
};

createCircle();

















// window.onload = function() {
// 	x = Math.floor(Math.random() * (canvasArea.width - radius) + radius);
// 	y = Math.floor(Math.random() * (canvasArea.height - radius) + radius);
// 	console.log("onload: " + x, y, radius);
// 	setTimeout(function() { createCircle = new Circle(x, y, radius); }, timer);
// }

// var interval = setInterval(function() { createCircle = new Circle(x, y, radius); }, timer);

// Circle = function(x, y, radius) {
// 	context.clearRect(0, 0, canvasArea.width, canvasArea.height);
// 	context.beginPath();
// 	context.fillStyle = "DarkCyan";
// 	context.arc(x, y, radius, 0, Math.PI * 2, true);
// 	context.closePath();
// 	context.fill();
// 	this.clicked = function() {
// 		x = Math.floor(Math.random() * (canvasArea.width - radius) + radius);
// 		y = Math.floor(Math.random() * (canvasArea.height - radius) + radius);
// 		console.log("x, y clicked: " + x, y);         ////////////////////////////////////////////////////
// 		radius -= 5;
// 		timer -= 100;
// 		setTimeout(function() { createCircle = new Circle(x, y, radius); }, timer);
// 		return [x, y, radius];		//pass new x, y, and radius back to event listener
// 	};	//end of clicked()
// };


// canvasArea.addEventListener("click", function(e) {
// 	var mouseX = e.clientX;
// 	var mouseY = e.clientY;
// 	console.log("listener: " + x, y); /////////////////////////////////////////////////////////////////
// 	if ((Math.pow((mouseX-x), 2) + Math.pow((mouseY-y), 2)) < Math.pow(radius, 2)) {
// 		console.log("inside listener" + radius);
// 		var x_y = createCircle.clicked();
// 		x = x_y[0];
// 		y = x_y[1];
// 		radius = x_y[2];
// 	}
// });
