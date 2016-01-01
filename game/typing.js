function Typer() {
	this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	this.alphabet = this.alphabet.split("");
	this.letters = [];
	this.x = 50;
	this.y = 360;
	this.w = 180;
	this.offset = 0;
	this.amt = 10;
	this.reward = 5;
	this.penalty = 3;
	for (var i = 0; i < this.amt; ++i) {
		this.letters.push(this.alphabet[Math.floor(Math.random() * 26)]);
	}
	this.draw = function() {
		ctx.font = "20px Arial";
		this.offset *= 0.98;
		ctx.strokeRect(this.x + this.offset + 8, this.y - 20, 20, 24); 
		for (var i = 0; i < this.amt; ++i) {
			ctx.fillStyle = "rgba(0, 0, 0, " + ((1 / this.amt) * i + (1 / this.amt)) + ")";
			ctx.fillText(this.letters[i], this.x + (this.w / this.amt) * (this.amt - i) + this.offset, this.y);
		}
		ctx.fillStyle = "red";
		ctx.fillText(resources.red, this.x + this.w / 2, this.y - 20);
	}
	this.attempt = function(x) {
		if (this.letters[this.amt - 1] === x) {
			resources.red += this.reward;
			
			this.letters.splice(this.amt - 1, 1);
			this.letters = [this.alphabet[Math.floor(Math.random() * 26)]].concat(this.letters);
			this.offset += this.w / this.amt;
			texts.push(new floatText("+" + this.reward, this.x + this.w / 2 - 10 + (Math.floor(Math.random() * 20)), this.y - 40, "rgba(0, 255, 0, "));
		}
		else {
			resources.red -= this.penalty;
			texts.push(new floatText("-" + this.penalty, this.x + this.w / 2 - 10 + (Math.floor(Math.random() * 20)), this.y - 20, "rgba(255, 0, 0, "));
		}
	}
}