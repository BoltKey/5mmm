function FindLetter() {
	this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	this.letters = this.letters.split("");
	this.toFind = '';
	this.toShow = '';
	this.x = 20;
	this.y = 480;
	this.w = 150;
	this.reward = 60;
	this.penalty = 10;
	this.mult = 1;
	this.newSet = function() {
		var index = Math.floor(Math.random() * 26);
		var randind;
		var tempvalue;
		this.toFind = this.letters[index];
		this.toShow = this.letters.slice(0, index).concat(this.letters.slice(index + 1, 27));
		for (var i = 0; i < 26; ++i) {
			randind = i + Math.floor(Math.random() * (25 - i));
			tempvalue = this.toShow[i];
			this.toShow[i] = this.toShow[randind];
			this.toShow[randind] = tempvalue;
		}
	}
	this.draw = function() {
		ctx.fillStyle = "black";
		ctx.strokeRect(this.x, this.y, this.w, this.w);
		var toDraw;
		ctx.font = "20px Arial";
		for (var i = 0; i < 25; ++i) {
			ctx.fillText(this.toShow[i], this.x + 14 + (this.w / 5) * (i % 5), this.y + 23 + (this.w / 5) * (Math.floor(i/5)));
		}
		ctx.fillStyle = "red";
		ctx.fillText(resources.red, this.x + this.w / 2, this.y - 5);
	}
	this.attempt = function(x) {
		if (x === this.toFind) {
			resources.red += this.reward * this.mult;
			this.newSet();
		}
		else {
			resources.red -= this.penalty;
		}
	}
}