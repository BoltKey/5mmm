function EightPuzzle() {
	
	this.x = 750;
	this.y = 420;
	this.w = 180;
	this.padding = 3;
	this.reward = 500;
	this.effect = 0;
	this.mult = 1;
	this.inverted = false;
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
	
	this.doMove = function(direction) {
		// 0 left, 1 up, 2 right, 3 down 
		var free = this.tiles.indexOf(9);
		// edge of the board
		if (direction === 2 && free % 3 === 2 ||
			direction === 3 && free / 3 >= 2 ||
			direction === 0 && free % 3 === 0 ||
			direction === 1 && free / 3 < 1)
			return;
		switch(direction) {
			case 0: 
				this.tiles[free] = this.tiles[free - 1];
				this.tiles[free - 1] = 9;
				break;
			case 1:
				this.tiles[free] = this.tiles[free - 3];
				this.tiles[free - 3] = 9;
				break;
			case 2:
				this.tiles[free] = this.tiles[free + 1];
				this.tiles[free + 1] = 9;
				break;
			case 3:
				this.tiles[free] = this.tiles[free + 3];
				this.tiles[free + 3] = 9;
				break;
		}
		if (this.softStart === 0) {
			this.softStart = Date.now();
		}
		if (this.solved()) {
			this.effect = 100;
			resources.black += this.reward * this.mult;
			this.earned += this.reward * this.mult;
			achs.idAward(22);
			this.lastReward = Date.now();
			if (inplay)
				checkMulti();
			var thisTime = Date.now() - this.hardStart;
			this.stats.times.push(thisTime);
			if (this.stats.bestTime > thisTime || this.stats.bestTime === -1) {
				this.stats.bestTime = thisTime;
			}
			this.newSet();
		}
	}
	this.drawStats = function() {
		ctx.font = "72px Arial";
		ctx.fillStyle = "black";
		var currhs = (Date.now() - this.hardStart);
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
	this.draw = function() {
		ctx.font = "20px Arial";
		ctx.fillStyle = "rgba(0, 255, 0, " + (this.effect / 100) + ")";
		this.effect -= Math.sign(this.effect);
		ctx.fillRect(this.x - 2 * this.padding, this.y - this.padding * 2, this.w + 5 * this.padding + 1, this.w + 5 * this.padding + 1);
		ctx.fillStyle = "#cccccc";
		ctx.strokeRect(this.x - 2 * this.padding, this.y - this.padding * 2, this.w + 5 * this.padding + 1, this.w + 5 * this.padding + 1);  // dont ask about that one pixel please
		//ctx.fillRect(this.x - 2 * this.padding, this.y - this.padding * 2, this.w + 5 * this.padding + 1, this.w + 5 * this.padding + 1);
		ctx.fillStyle = "black";
		for (var i = 0; i < 9; ++i) {
			var x = this.x + (this.w / 3 + this.padding) * (i % 3);
			var y = this.y + (this.w / 3 + this.padding) * Math.floor(i / 3);
			var w = (this.w - this.padding * 2) / 3;
			if (this.tiles[i] !== 9) {
				ctx.strokeRect(x, y, w, w);
				ctx.fillStyle = ((this.tiles[i] < 5 || this.tiles[i] === 7) ? "#ff9999" : "#9999ff");
				ctx.fillRect(x, y, w, w);
				ctx.fillStyle = "black";
				ctx.fillText(this.tiles[i], x + w/2, y + w/2 + 6);
			}
		}
		
		ctx.fillText(resources.black + " (" + this.mult + "x)", this.x + this.w / 2, this.y - 20);
		
		if (inTrainer) {
			this.drawStats();
		}
	}
	this.solved = function() {
		for (var i = 0; i < 9; ++i) {
			if (!(this.tiles[i] === i + 1)) {
				return false;
			}
		}
		return true;
	}
	this.newBoard = function() {
		this.tiles = [];
		for (var i = 0; i < 9; ++i) {
			this.tiles.push(i + 1);
		}
	}
	// random state algorythm by ben1996123, transcribed to JS by BoltKey
	this.newSet = function() {
		this.newBoard();
		while(this.solved()){
			var a, d, tempval;
			var parity = false;

			//random permutation of pieces
			for(var i = 0; i < 8; ++i) {
				d = i + Math.floor(Math.random() * (8 - i));
				tempval = this.tiles[i];
				this.tiles[i] = this.tiles[d];
				this.tiles[d] = tempval;
				if (this.tiles[d] === this.tiles[i]) 
					parity = !parity;
			}

			//fix parity by doing a random 2 cycle
			if(parity){
				do{
					a = Math.floor(Math.random() * 8);
					d = Math.floor(Math.random() * 8);
				}
				while(a === d);
				tempval = this.tiles[a];
				this.tiles[a] = this.tiles[d];
				this.tiles[d] = tempval;
			}

			//move the empty space to a random position
			a = Math.floor(Math.random() * 3);
			d = Math.floor(Math.random() * 3);
			for (var i = 0; i < a; ++i) 
				this.doMove(0);
			for (var i = 0; i < d; ++i) 
				this.doMove(1);
		}
		this.hardStart = Date.now();
		this.softStart = 0;
	}
}