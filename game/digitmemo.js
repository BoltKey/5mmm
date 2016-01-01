function DigitMemo() {
	
	this.x = 50;
	this.y = 420;
	this.w = 180;
	this.currNumb = 0;
	this.padding = 3;
	this.reward = 250;
	this.penalty = 0;
	this.newSet = function() {
		var tempvale, randind;
		this.numbers = [];
		this.revealed = [];
		for (var i = 1; i <= 9; ++i) {
			this.numbers.push(i);
			this.revealed.push(false);
		}
		for (var i = 0; i < 9; ++i) {
			randind = i + Math.floor(Math.random() * (9 - i));
			tempvalue = this.numbers[i];
			this.numbers[i] = this.numbers[randind];
			this.numbers[randind] = tempvalue;
		}
	}
	this.draw = function() {
		ctx.fillStyle = "#003300";
		ctx.strokeStyle = "black";
		for (var i = 0; i < 9; ++i) {
			var x = this.x + (this.w / 3 + this.padding) * (i % 3);
			var y = this.y + (this.w / 3 + this.padding) * Math.floor(i / 3);
			var w = (this.w - this.padding * 2) / 3;
			if (this.revealed[i]) {
				ctx.strokeRect(x, y, w, w);
				ctx.fillText(this.numbers[i], x + w/2, y + w/2 + 6)
			}
			else {
				ctx.fillRect(x, y, w, w);
			}
		}
		ctx.fillStyle = "green";
		ctx.fillText(resources.green, this.x + this.w / 2, this.y - 5);
	}
	this.attempt = function(id) {
		var transl = [9, 6, 7, 8, 3, 4, 5, 0, 1, 2];
		var index = transl[id];  // translates from numpad to index of this.numbers
			if (!this.revealed[index]) {
			if (this.numbers[index] === this.currNumb + 1) {
				++this.currNumb;
				if (this.currNumb === 1) 
					for (i = 0; i < 9; ++i) {
						this.revealed[i] = false;
					}
				this.revealed[index] = true;
				if (this.currNumb === 9) {
					resources.green += this.reward;
					this.newSet();
				}
			}
			else {
				this.currNumb = 0;
				for (i = 0; i < 9; ++i) {
					this.revealed[i] = false;
				}
				this.revealed[index] = true;
				resources.green -= this.penalty;
			}
		}
	}
}