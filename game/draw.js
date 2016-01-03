function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	if (inplay) {
		wam.draw();
		//fl.draw();
		typer.draw();
		dm.draw();
		ep.draw();
		cm.draw();
		for (t of texts) {
			t.draw();
		}
		if (texts.length > 30) {
			texts = texts.slice(texts.length  - 30, texts.length + 1);
		}
		
		ctx.fillStyle = "white";
		ctx.fillRect(360, 550, 240, 80);
		ctx.font = "20px Arial";
		ctx.fillStyle = "red";
		ctx.fillText(resources.red + " (+" + production.red + ")", 430, 580);
		ctx.fillStyle = "green";
		ctx.fillText(resources.green + " (+" + production.green + ")", 430, 620);
		ctx.fillStyle = "blue";
		ctx.fillText(resources.blue + " (+" + production.blue + ")", 530, 580);
		ctx.fillStyle = "black";
		ctx.fillText(resources.black + " (+" + production.black + ")", 530, 620);
		
		ctx.fillText(Math.floor(seconds / 60) + ":" + ((seconds % 60) < 10 ? "0" : "") + seconds%60, canvas.width / 2 - 40, 30);
		ctx.fillStyle = "#bbbb00";
		ctx.fillText(vp, canvas.width / 2 + 40, 30);
	}
	else if (showResult) {
		ctx.fillStyle = "black";
		ctx.font = "40px Arial";
		ctx.fillText("Time over. You scored " + vp, canvas.width / 2, 200 );
		ctx.fillText("Press 'End' or click here to restart.", canvas.width / 2, 250)
	}
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