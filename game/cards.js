function CardManager() {
	this.x = 280;
	this.y = 300;
	this.cardWidth = 130;
	this.cardHeight = 180;
	this.cardSpacing = 10;
	this.effect = 0;
	this.w = this.cardWidth * 3 + this.cardSpacing * 2;
	this.h = this.cardHeight;
	this.skipCost = {red: 0, green: 0, blue: 0, black: 0};
	this.consecutiveSkips = 0;
	this.drawSkip = {x: this.x + 50, y: this.y + this.cardHeight + 30, w: this.w - 100, h: 100};
	this.pool = [];
	for (var i = 0; i < cs.selectedCombo.length; ++i) {
		this.pool.push($.grep(cs.pool, function(a){return a.id === cs.selectedCombo[i]})[0]);
		this.pool[i].varCost = JSON.parse(JSON.stringify(this.pool[i].cost));
	}
	this.pool = this.pool.sort(function(a, b) {
		return (a.varCost.red + a.varCost.green + a.varCost.blue + a.varCost.black) - (b.varCost.red + b.varCost.green + b.varCost.blue + b.varCost.black);
		});
	this.bought = [];
	this.last = [];
	this.lastbought = 0;
	this.selection = [];
	this.upcoming = [];
	for (var i = 0; i < 3; ++i) {
		do {
			toAdd = Math.floor(Math.random() * this.pool.length);
		} while (toAdd === this.upcoming[0] || toAdd === this.upcoming[1]);
		this.upcoming.push(toAdd);
	}
	this.canAfford = function(c) {
		for (k of COLORS) {
			if (c.varCost[k] > resources[k])
				return false;
		}
		return true;
	}
	this.skipCostCalc = function() {
		for (c of COLORS) {
			this.skipCost[c] = Math.floor(resources[c] * (1 - (0.75 * Math.pow(0.5, this.consecutiveSkips)))); 
		}
	}
	this.skip = function() {
		for (c of COLORS) {
			resources[c] -= this.skipCost[c];
		}
		this.last = this.selection.slice();
		this.lastbought = -1;
		this.newSet();
		this.effect = 100;
		if (++this.consecutiveSkips >= 10) {
			achs.idAward(9);
		};
	}
	this.buy = function(id) {
		if (this.pool[this.selection[id]].name === "Landmark") {
			achs.idAward(11);
		}
		achs.idAward(19);
		this.consecutiveSkips = 0;
		if (id >= 0 && id < 3) {
			c = this.pool[this.selection[id]];
			if (this.canAfford(c)) {
				for (k of COLORS) {
					resources[k] -= c.varCost[k];
				}
				vp += c.vp;
				this.bought.push(this.selection[id]);
				c.f();
				this.last = this.selection.slice();
				this.lastbought = id;
				this.effect = 100;
				this.bought.sort(function(a, b){return a-b}); // uglyyyyy... I don't give a fuck
				for (f of COLORS) {
					c.varCost[f] = Math.floor(1.1 * c.varCost[f]);
				}
				this.newSet(false);
				if (this.bought.length >= 20) {
					achs.idAward(8);
				}
			}
		}
		if (resources.red === 0 && resources.green === 0 && resources.blue === 0 && resources.black === 0) {
			achs.idAward(12);
		}
	}
	this.newSet = function(first) {
		// TODO: select based on resources etc
		// So. It's gonna be resources + production * 30
		var midcost = 0;
		for (c of COLORS) {
			midcost += resources[c] + production[c] * 30;
		}
		midcost += Math.max(wam.mult, dm.mult, typer.mult, ep.mult) * 18 * 10;
		var middle = 0
		while ("Leonardo di Caprio" !== "man with Oscar") {
			if (this.pool[middle].varCost.red + this.pool[middle].varCost.green + this.pool[middle].varCost.blue + this.pool[middle].varCost.black > midcost || middle === this.pool.length - 1)
				break;
			++middle;
		}
		if (!first)
			this.selection = this.upcoming.slice();  // magic
		this.upcoming = [];
		var toAdd;
		for (var i = 0; i < 3; ++i) {
			do {
				toAdd = Math.floor(middle - Math.pow(Math.random() * 3, 2));  // magic
				toAdd = Math.max(0, toAdd);
				++middle;
				middle = Math.min(middle, this.pool.length);
				if (middle > 10000) {debugger;}
			} while (toAdd === this.upcoming[0] || toAdd === this.upcoming[1] || toAdd >= this.pool.length);
			this.upcoming.push(toAdd);
		}
	}
	this.drawCard = function(id, x, y, w, h, border, drawText) {
		this.skipCostCalc();
		var c = this.pool[id];
		ctx.strokeStyle = border ? (this.canAfford(c) ? "green" : "red") : "black";
		ctx.fillStyle = c.bg || "white";
		ctx.fillRect(x, y, w, h);
		ctx.strokeRect(x, y, w, h);
		ctx.strokeStyle = "black";
		if (drawText) {
			ctx.fillStyle = "black";
			ctx.font = Math.floor((h / 150) * 15) + "px Arial";
			ctx.fillText(c.name, x + w / 2, y + h * 0.16);
			
			ctx.fillStyle = "#aaaaaa";
			ctx.beginPath();
			ctx.rect(x + w * 0.3, y + h * 0.55, w * 0.4, (h / 150) * 18);
			ctx.rect(x + w * 0.1, y + h * 0.7, w * 0.8, h * 0.26);
			ctx.fill();
			ctx.stroke();
			ctx.fillStyle = "#eeee00";
			ctx.fillText(c.vp, x + w / 2, y + h * 0.65);
			ctx.fillStyle = "black";
			drawResources(x + w * 0.2, y + h * 0.25, w * 0.6, h / 3.8, c.varCost, false, true);
			ctx.font = w / 12 + "px Arial";
			for (k in c.text) {
				ctx.fillText(c.text[k], x + w / 2, y + h * 0.78 + k * h / 15);
			}
			ctx.beginPath();
			switch(c.rarity) {
				case 0:
					ctx.fillStyle = "#aaaa77";
					ctx.arc(x + 0.18 * w, y + 0.6 * h, 3, 0, 2 * Math.PI);
					ctx.stroke();
					ctx.fill();
					ctx.beginPath();
					ctx.arc(x + 0.82 * w, y + 0.6 * h, 3, 0, 2 * Math.PI);
					ctx.stroke();
					ctx.fill();
			}
		}
	}
	this.draw = function() {
		if (inplay) {
			ctx.font = "30px Arial";
			ctx.fillText("CARDS", this.x + this.w / 2, this.y - 20);
			ctx.font = "15px Arial";
			ctx.fillText("shift + j/k/l or click to buy", this.x + this.w / 2, this.y - 5);
			
			var ey = this.cardHeight + this.cardSpacing;
			var ex = (this.cardWidth + this.cardSpacing);
			ctx.globalAlpha = 1 - (this.effect / 200)
			for (var j = 0; j < 2 + (this.effect > 0); ++j) {
				for (var i = 0; i < 3; ++i) {
					if (j === 2) {
						if (i === this.lastbought) {
							ctx.globalAlpha = 0;
						}
						else {
							ctx.globalAlpha = this.effect / 100;
						}
					}
					var id = [this.selection, this.upcoming, this.last][j][i];
					var y = this.y + j * ey - (this.cardHeight + this.cardSpacing) * (((10000 - Math.pow(this.effect, 2)) / 10000) - 1 + (j === 2 ? 3 : 0));
					var x = this.x + i * ex;
					this.drawCard(id, x, y, this.cardWidth, this.cardHeight, true, true);
				}
				ctx.globalAlpha = 0.5;
			}
			ctx.globalAlpha = 0.5;
			drawResources(this.drawSkip.x, this.drawSkip.y, this.drawSkip.w, this.drawSkip.h, this.skipCost, false, true);
			
			ctx.fillText("Skip", this.drawSkip.x + this.drawSkip.w / 2, this.drawSkip.y + this.drawSkip.h / 2 + 5);
			ctx.globalAlpha = 1;
		}
		this.effect -= Math.sign(this.effect) * 2;
		ctx.globalAlpha = 1;
		var spaces = 0;
		var last = this.bought[0];
		for (i = 0; i < this.bought.length; ++i) {
			if (last !== this.bought[i]) {
				last = this.bought[i];
				++spaces;
			}
			if (this.bought[i + 1] !== this.bought[i] && this.bought[i] === this.last[this.lastbought])
				ctx.globalAlpha = 1 - this.effect / 100;
			else
				ctx.globalAlpha = 1;
			this.drawCard(this.bought[i], 20 + 3 * i + 30 * spaces, 110, this.cardWidth * 0.6, this.cardHeight * 0.6, false, this.bought[i + 1] !== this.bought[i]);
		}
		ctx.globalAlpha = 1;
	}
}