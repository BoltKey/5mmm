function DigitMemo() {
	
	this.x = 50;
	this.y = 420;
	this.w = 180;
	this.currNumb = 0;
	this.padding = 3;
	this.reward = 350;
	this.penalty = 0;
	this.mult = 1;
	this.effect = 0;
	this.earned = 0;
	this.lastReward = -1;
	this.hardStart = 0;
	this.softStart = 0;
	this.stats = {
		bestTime: -1,
		times: [],
		avg5: -1,
		avg12: -1,
	}
	
	this.newSet = function() {
		var tempvalue, randind;
		this.hardStart = Date.now();
		this.softStart = 0;
		this.currNumb = 0;
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
		ctx.font = "20px Arial";
		ctx.strokeStyle = "black";
		ctx.fillStyle = "rgba(" + (this.effect > 0 ? "0, 255, 0, " : "255, 0, 0, ") + (Math.abs(this.effect) / 100) + ")";
		ctx.strokeRect(this.x - 3, this.y - 3, this.w + 10, this.w + 10);
		ctx.fillRect(this.x - 3, this.y - 3, this.w + 10, this.w + 10);
		this.effect -= 2 * Math.sign(this.effect);  // move tow zero
		ctx.fillStyle = "#003300";
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
		ctx.fillText(resources.green + " (" + this.mult + "x)", this.x + this.w / 2, this.y - 10);
		ctx.fillText("Use numpad or mouse", this.x + this.w / 2, this.y + this.w + 25);
		if (inTrainer)
			this.drawStats();
	}
	
	this.drawStats = function() {
		ctx.font = "72px Arial";
		ctx.fillStyle = "black";
		var currhs = this.softStart === 0 ? 0 : Date.now() - this.softStart;
		ctx.fillText(niceTime(currhs), canvas.width / 2, 100);
		var tores = this.stats.times.length < 3 ? this.stats.times[this.stats.times.length - 1] : avg(this.stats.times, Math.min(5, this.stats.times.length), true);
		ctx.fillText(Math.floor(this.reward / (tores / 1000) * 10) / 10, 400, 240);
		ctx.font = "12px Arial";
		var L = this.stats.times.length; 
		for (var i = L; i > 0; --i) {
			ctx.fillText(niceTime(this.stats.times[i - 1]) + ",", 40 + (L - i) % 5 * 40, 40 + Math.floor((L - i)/5) * 25);
		}
		ctx.font = "18px Arial";
		if (this.stats.times > 5)
			ctx.fillText(avg(this.stats.times, 5, false), 400, 150);
		ctx.fillText("Approximate resources/second", 400, 170);
	}
	
	this.attempt = function(id) {
		var transl = [9, 6, 7, 8, 3, 4, 5, 0, 1, 2];
		var index = transl[id];  // translates from numpad to index of this.numbers
		if (this.softStart === 0)
			this.softStart = Date.now();
		if (!this.revealed[index]) {
			if (this.numbers[index] === this.currNumb + 1) {
				++this.currNumb;
				if (this.currNumb === 1) 
					for (i = 0; i < 9; ++i) {
						this.revealed[i] = false;
					}
				this.revealed[index] = true;
				if (this.currNumb === 9) {
					resources.green += this.reward * this.mult;
					this.earned += this.reward * this.mult;
					this.lastReward = Date.now();
					if (inplay)
						checkMulti();
					achs.idAward(23);
					this.effect = 100;
					
					var thisTime = Date.now() - this.hardStart;
					this.stats.times.push(thisTime);
					if (this.stats.bestTime > thisTime || this.stats.bestTime === -1) {
						this.stats.bestTime = thisTime;
					}
					
					this.newSet();
				}
			}
			else {
				if (this.currNumb > 3)
					this.effect = -this.currNumb * 10;
				this.currNumb = 0;
				for (i = 0; i < 9; ++i) {
					this.revealed[i] = false;
				}
				this.revealed[index] = true;
				resources.green -= this.penalty;
				this.earned -= this.penalty;
			}
		}
	}
}