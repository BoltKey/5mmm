function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	if (inplay) {
		wam.draw();
		//fl.draw();
		typer.draw();
		dm.draw();
		ep.draw();
		for (t of texts) {
			t.draw();
		}
		if (texts.length > 30) {
			texts = texts.slice(texts.length  - 30, texts.length + 1);
		}
		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.fillText(resources.red, 400, 580);
		ctx.fillStyle = "green";
		ctx.fillText(resources.green, 400, 620);
		ctx.fillStyle = "blue";
		ctx.fillText(resources.blue, 560, 580);
		ctx.fillStyle = "black";
		ctx.fillText(resources.black, 560, 620);
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