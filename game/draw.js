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
		ctx.fillText("Victory points: " + vp, canvas.width / 2 + 60, 30);
	}
	else if (showResult) {
		cm.draw();
		ctx.fillStyle = "black";
		ctx.font = "40px Arial";
		ctx.fillText("Time over. You scored " + vp, canvas.width / 2, 300 );
		ctx.fillText("Press 'End' or click here to restart.", canvas.width / 2, 350)
	}
	else if (currMenu === 1) {
		achs.drawHoF();
	}
	achs.draw();
}

function drawResources(x, y, w, h, vals, prod, rectangle) {
	if (rectangle) {
		ctx.fillStyle = "white";
		ctx.fillRect(x, y, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(x, y, w, h);
	}
	ctx.font = (h / 4) + "px Arial";
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