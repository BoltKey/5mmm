function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	if (inplay) {
		wam.draw();
		//fl.draw();
		typer.draw();
		dm.draw();
		ep.draw();
		cm.draw();
		ctx.font = "20px Arial"
		for (t of texts) {
			t.draw();
		}
		if (texts.length > 30) {
			texts = texts.slice(texts.length  - 30, texts.length + 1);
		}
		drawResources(10, 10, cm.w - 120, 80, resources, true, true);
		ctx.fillText(Math.floor(seconds / 60) + ":" + ((seconds % 60) < 10 ? "0" : "") + seconds%60, canvas.width / 2 - 60, 30);
		ctx.fillStyle = "#bbbb00";
		ctx.fillText("Victory points: " + vp, canvas.width / 2 + 100, 30);
	}
	else if (showResult) {
		cm.draw();
		ctx.fillStyle = "black";
		ctx.font = "40px Arial";
		ctx.fillText("Time over. You scored " + vp, canvas.width / 2, 300 );
		ctx.fillText("Press 'End' or click here to restart.", canvas.width / 2, 350);
		
	}
	else if (inTrainer) {
		trainerGame.draw();
		for (t of texts) {
			t.draw();
		}
	}
	if (currMenu === 1) {
		achs.drawHoF();
		ctx.globalAlpha = 0.1;
	}
	if (currMenu !== 2 && currMenu !== 5) {
		drawLogo(50, 50, 200);
	}
	
	achs.draw();
}

function drawLogo(x, y, w) {
	ctx.beginPath();
	ctx.rect(x, y, w * 1.3, w * 0.9);
	ctx.fillStyle = "#999999";
	ctx.fill();
	ctx.fillStyle = "black";
	ctx.textAlign = "left";
	ctx.fillStyle = "#555500";
	ctx.font = w * 0.6 + "px Arial";
	ctx.fillText("5", x + 0.02 * w, y + w * 0.5);
	ctx.fillStyle = "#990000";
	ctx.font = w * 0.28 + "px Arial";
	ctx.fillText("Minute", x + w * 0.38, y + w * 0.3);
	ctx.fillStyle = "#aa0000";
	ctx.font = w * 0.19 + "px Arial";
	ctx.fillText("Minigame", x + w * 0.38, y + w * 0.5);
	ctx.fillStyle = "#cc0000";
	ctx.font = w * 0.27 + "px Arial";
	ctx.fillText("MAYHEM!", x + 0.02 * w, y + w * 0.78);
}

function drawResources(x, y, w, h, vals, prod, rectangle) {
	if (rectangle) {
		ctx.fillStyle = "white";
		ctx.fillRect(x, y, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(x, y, w, h);
	}
	ctx.font = (h / 3) + "px Arial";
	ctx.fillStyle = "red";
	ctx.fillText(vals.red + (prod ? " (+" + production.red + ")" : ""), x + w * 0.25, y + h * 0.4);
	ctx.fillStyle = "green";
	ctx.fillText(vals.green + (prod ? (" (+" + production.green + ")") : ""), x + w * 0.25, y + h * 0.8);
	ctx.fillStyle = "blue";
	ctx.fillText(vals.blue + (prod ? " (+" + production.blue + ")" : ""), x + w * 0.75, y + h * 0.4);
	ctx.fillStyle = "black";
	ctx.fillText(vals.black + (prod ? " (+" + production.black + ")" : ""), x + w * 0.75, y + h * 0.8);
}

function floatText(text, x, y, color) {
	this.time = 0;
	this.text = text;
	this.x = x;
	this.y = y;
	this.color = color;
	this.draw = function() {
		ctx.fillStyle = this.color + (1 - this.time / 70) + ")";
		ctx.fillText(this.text, this.x, this.y);
		++this.time;
		this.y -= 0.5;
		/*if (this.time === 70) {
			ac.texts.splice(ac.texts.indexOf(this), 1);
		}*/
	}
}

function niceTime(n) {
	n = Math.floor(n/10);
	return Math.floor(n / 100) + "." + (n % 100 < 10 ? "0" : "") + n % 100;
}