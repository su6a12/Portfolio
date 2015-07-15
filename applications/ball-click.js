var context, canvasArea;
var x, y;			//x and y coordinates of center of circle	
var radius = 150;
var timer = 2000;		//balls disappear quicker with each click
var createCircle;

canvasArea = document.getElementsByTagName("canvas")[0];
//dynamically setting height and width of canvas area
canvasArea.width = window.innerWidth;
canvasArea.height = window.innerHeight - 200;

canvasArea.style.backgroundColor = "#C7FFEF";
context = canvasArea.getContext("2d");

window.onload = function() {
	x = Math.floor(Math.random() * (canvasArea.width - radius) + radius);
	y = Math.floor(Math.random() * (canvasArea.height - radius) + radius);
	console.log("onload: " + x, y, radius);
	setTimeout(function() { createCircle = new Circle(x, y, radius); }, timer);
}

var interval = setInterval(function() { createCircle = new Circle(x, y, radius); }, timer);

Circle = function(x, y, radius) {
	context.clearRect(0, 0, canvasArea.width, canvasArea.height);
	context.beginPath();
	context.fillStyle = "DarkCyan";
	context.arc(x, y, radius, 0, Math.PI * 2, true);
	context.closePath();
	context.fill();
	this.clicked = function() {
		x = Math.floor(Math.random() * (canvasArea.width - radius) + radius);
		y = Math.floor(Math.random() * (canvasArea.height - radius) + radius);
		console.log("x, y clicked: " + x, y);         ////////////////////////////////////////////////////
		radius -= 5;
		timer -= 100;
		setTimeout(function() { createCircle = new Circle(x, y, radius); }, timer);
		return [x, y, radius];		//pass new x, y, and radius back to event listener
	};	//end of clicked()
};


canvasArea.addEventListener("click", function(e) {
	var mouseX = e.clientX;
	var mouseY = e.clientY;
	console.log("listener: " + x, y); /////////////////////////////////////////////////////////////////
	if ((Math.pow((mouseX-x), 2) + Math.pow((mouseY-y), 2)) < Math.pow(radius, 2)) {
		console.log("inside listener" + radius);
		var x_y = createCircle.clicked();
		x = x_y[0];
		y = x_y[1];
		radius = x_y[2];
	}
});



///////////////////////////////////old code/////////////////////////////////
// var $canvas = $("canvas");
// var context = $canvas[0].getContext("2d");
// var lastEvent;				//variable to store location of mouse pointer
// var mousedown = false;

// $canvas.mousedown(function(e) {
// 	lastEvent = e;
// 	mousedown = true;
// }).mousemove(function(e) {
// 	if (mousedown) {
// 		context.beginPath();
// 		//offsetX and offsetY does not work in FF
// 		context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
// 		context.lineTo(lastEvent.offsetX, lastEvent.offsetY);
// 		context.stroke();
// 		lastEvent = e;
// 	}
// }).mouseup(function() {
// 	// context.fillStyle = "DarkCyan";
// 	// context.fill();					don't work yet
// 	mousedown = false;
// });

// $("#canvas-reset").click(function() {
// 	// $canvas.width = $canvas.width;			//somehow doesn't work
// 	context.clearRect(0, 0, 600, 400);
// });
