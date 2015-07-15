function drawAnalogClock() {
	var drawing = document.getElementById("canvas-clock");
	//check that browser supports canvas feature
	var ctx = drawing.getContext("2d");
	var centerX = drawing.width / 2;
	var centerY = drawing.height / 2;
	var clockWidth = 400;
	var clockRadius = 200;

	function tick() {
		var date = new Date();
		ctx.clearRect(0, 0, drawing.width, drawing.height);
		drawClock();

		var minutes = date.getMinutes();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		drawHand(clockWidth/2.3, minutes * 6);	//360/60 = 6

		var seconds = date.getSeconds();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		drawHand(clockWidth/2.3, seconds * 6);	//360/60 = 6

		var hours = date.getHours();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		if (minutes === 0) { hourDegree = hours * 30; }
		else { hourDegree = (((60 * hours) + minutes) / 2); }		//equation found on wikipedia
		drawHand(clockWidth/3, hourDegree);		//360/12 = 30

		function drawClock() {
			ctx.beginPath();
			//outer circle
			ctx.arc(centerX, centerY, clockRadius, 0, 2 * Math.PI, false);		//last parameter for direction C vs CC
			//inner circle
			ctx.moveTo(centerX + (clockRadius - 17), centerY);
			ctx.arc(centerX, centerY, (clockRadius - 17), 0, 2 * Math.PI, false);
			//setting thicker line of clock circles
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.closePath();

			drawNumbers();

			function drawNumbers() {
				var numbers = 12;
				ctx.font = "bold 16px Arial";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";

				for(var i = 1; i <= 12; i++) {
					ctx.save();				//save current state of styles and transformations
					ctx.beginPath();
					ctx.translate(centerX, centerY);	//remaps (0, 0)
					var angle = (i * 30) * Math.PI/180;		//360/12 = 30 to get degrees of rotation needed
					ctx.rotate(angle);
					ctx.translate(0, -clockRadius * 0.96);
					ctx.rotate(-angle);			//keeps numbers upright
					ctx.fillText(i, 0, 0);
					//ctx.rotate(angle);		//don't need
					ctx.stroke();
					ctx.closePath();
					ctx.restore();					//restores state back to original when for loop began
				}
			} //end of drawNumbers
		} //end of drawClock

		function drawHand(length, angle) {
		 	ctx.save();
		 	ctx.beginPath();
		 	ctx.translate(centerX, centerY);
		 	ctx.rotate(-180 * Math.PI/180);
		 	ctx.rotate(angle * Math.PI/180);
		 	ctx.moveTo(0, 0);
		 	ctx.lineTo(0, length);
		 	ctx.stroke();
		 	ctx.closePath();
		 	ctx.restore();
		} //end of drawHand
	}	//end of tick

	tick();
	window.setInterval(tick, 1000);
	//drawClock();

}

//http://lyndonarmitage.com/making-an-analog-clock-using-the-html5-canvas-tag/

//https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/HTML-canvas-guide/Translation,Rotation,andScaling/Translation,Rotation,andScaling.html