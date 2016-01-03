function CardManager() {
	this.x = 280;
	this.y = 300;
	this.cardWidth = 140;
	this.cardHeight = 150;
	this.cardSpacing = 10;
	this.effect = 0;
	this.w = this.cardWidth * 3 + this.cardSpacing * 2;
	this.h = this.cardHeight;
	this.pool = [
		{name: "Flash cards", text: ["Get +5", "green production"], bg: "#ccffcc", cost: {red: 50, green: 0, blue: 200, black: 0}, vp: 2, f: function() {production.green += 5}},
		{name: "Aimbot", text: ["Get +20", "blue production"], bg: "#ccccff", cost: {red: 200, green: 200, blue: 300, black: 100}, vp: 1, f: function() {production.blue += 20}},
		{name: "Thunder style", text: ["Get +1", "red production"], bg: "#ffd2d2", cost: {red: 0, green: 0, blue: 50, black: 0}, vp: 1, f: function() {production.red += 1}},
		{name: "Autoclicker", text: ["Get +1", "blue production"], bg: "#d2d2ff", cost: {red: 50, green: 0, blue: 0, black: 0}, vp: 1, f: function() {production.blue += 1}},
		{name: "Slidy sim", text: ["Get +2", "black production"], bg: "#eeeeee", cost: {red: 60, green: 0, blue: 60, black: 0}, vp: 2, f: function() {production.black += 2}},
		{name: "Statue", text: [], bg: "#ffffcf", cost: {red: 20, green: 0, blue: 30, black: 0}, vp: 10, f: function() {}},
		{name: "Collect taxes", text: ["Lose 10 vp.", "Gain 200 red and", "200 blue instantly"], bg: "#bbeeee", cost: {red: 0, green: 0, blue: 0, black: 100}, vp: -10, f: function() {resources.red += 200; resources.blue += 200}},
		{name: "Green mind", text: ["Get +2", "green production"], bg: "#eeffee", cost: {red: 50, green: 0, blue: 70, black: 0}, vp: 2, f: function() {production.green += 2}},
		{name: "Mega factory", text: ["Get +15", "to production", "of every color"], bg: "#009999", cost: {red: 700, green: 700, blue: 1800, black: 400}, vp: 30, f: function() {for (a of COLORS) {production[a] += 15}}},
		{name: "Mini factory", text: ["Get +3", "to production", "of every color"], bg: "#33aaaa", cost: {red: 160, green: 160, blue: 400, black: 100}, vp: 10, f: function() {for (a of COLORS) {production[a] += 3}}},
		{name: "Hack-a-mole", text: ["Get +10", "blue production"], bg: "#bbbbff", cost: {red: 450, green: 0, blue: 0, black: 0}, vp: 5, f: function() {production.blue += 10}},
		{name: "Charity", text: [], bg: "#ffffa9", cost: {red: 300, green: 300, blue: 300, black: 300}, vp: 200, f: function() {}},
		{name: "Tighten tiles", text: ["Increase black", "reward multiplier", "by 0.5"], bg: "#667766", cost: {red: 25, green: 350, blue: 25, black: 100}, vp: 4, f: function() {ep.mult += 0.5;}},
		{name: "Click! Faster!!", text: ["Increase blue", "reward multiplier", "by 0.5"], bg: "#7777ee", cost: {red: 25, green: 350, blue: 100, black: 25}, vp: 4, f: function() {wam.mult += 0.5;}},
		{name: "Memo league", text: ["Increase green", "reward multiplier", "by 0.5"], bg: "#77ee77", cost: {red: 25, green: 425, blue: 25, black: 25}, vp: 4, f: function() {dm.mult += 0.5;}},
		{name: "Key element", text: ["Increase red", "reward multiplier", "by 0.5"], bg: "#ee7777", cost: {red: 100, green: 350, blue: 25, black: 25}, vp: 4, f: function() {typer.mult += 0.5;}},
		{name: "Multi talent", text: ["Increase red", "reward multiplier", "by 0.5"], bg: "#9900cc", cost: {red: 100, green: 700, blue: 100, black: 100}, vp: 8, f: function() {typer.mult += 0.5;}},
		{name: "Hire Ben", text: ["Get +20", "black production"], bg: "#888888", cost: {red: 200, green: 200, blue: 600, black: 0}, f: function() {production.black += 20}, vp: 5, },
		{name: "Time shift", text: ["Freeze time", "for 10 seconds"], bg: "#bbbbbb", cost: {red: 200, green: 200, blue: 200, black: 1000}, vp: 15, f: function(){startTime += 10000}},
		{name: "Black market", text: ["Gain +500", "black instantly"], bg: "#bbbbbb", cost: {red: 500, green: 150, blue: 120, black: 0}, vp: 4, f: function(){resources.black += 500}},
		{name: "Trade post", text: ["Gain +250", "of blue, green", "and black"], bg: "#bbbbbb", cost: {red: 500, green: 0, blue: 0, black: 0},  vp: 3, f: function(){resources.black += 250; resources.green += 250; resources.blue += 250}},
		{name: "Landmark", text: [], bg: "#ffff30", cost: {red: 3000, green: 3000, blue: 3000, black: 3000}, vp: 1500, f: function() {}},
		{name: "Cathedral", text: ["Get +1 vp", "every second"], bg: "#ffbb00", cost: {red: 200, green: 200, blue: 300, black: 500}, vp: 0, f: function() {vpps += 1}},
		{name: "True MLG", text: ["Gain 5 vp for each", '"PERFECT!!!" click'], vp: 0, bg: "#ccff30", cost: {red: 100, green: 200, blue: 500, black: 100}, f: function() {wam.mlg += 1}},
	];
	this.pool = this.pool.sort(function(a, b) {
		return (a.cost.red + a.cost.green + a.cost.blue + a.cost.black) - (b.cost.red + b.cost.green + b.cost.blue + b.cost.black);
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
			if (c.cost[k] > resources[k])
				return false;
		}
		return true;
	}
	this.buy = function(id) {
		if (id >= 0 && id < 3) {
			c = this.pool[this.selection[id]];
			if (this.canAfford(c)) {
				for (k of COLORS) {
					resources[k] -= c.cost[k];
				}
				vp += c.vp;
				this.bought.push(this.selection[id]);
				c.f();
				this.last = this.selection.slice();
				this.lastbought = id;
				this.effect = 100;
				this.bought.sort(function(a, b){return a-b}); // uglyyyyy... I don't give a fuck
				this.newSet(false);
			}
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
			if (this.pool[middle].cost.red + this.pool[middle].cost.green + this.pool[middle].cost.blue + this.pool[middle].cost.black > midcost || middle === this.pool.length - 1)
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
		var c = this.pool[id];
		ctx.strokeStyle = border ? (this.canAfford(c) ? "green" : "red") : "black";
		ctx.fillStyle = c.bg || "white";
		ctx.fillRect(x, y, w, h);
		ctx.strokeRect(x, y, w, h);
		if (drawText) {
			ctx.fillStyle = "black";
			ctx.font = Math.floor((h / 150) * 20) + "px Arial";
			ctx.fillText(c.name, x + w / 2, y + 20);
			ctx.fillStyle = "#bbbb00";
			ctx.fillText(c.vp, x + w / 2, y + h * 0.55);
			ctx.fillStyle = "black";
			ctx.font = "12px Arial";
			for (var k = 0; k < 4; ++k) {
				ctx.fillStyle = COLORS[k];
				ctx.fillText(c.cost[COLORS[k]], x + w * ((Math.floor(k/2) + 1)/3), y + 35 + (k % 2) * 20);
			}
			for (k in c.text) {
				ctx.fillText(c.text[k], x + w / 2, y + h * 0.75 + k * 12);
			}
		}
	}
	this.draw = function() {
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
			this.drawCard(this.bought[i], 20 + 4 * i + 50 * spaces, 50, this.cardWidth * 0.8, this.cardHeight * 0.8, false, this.bought[i + 1] !== this.bought[i]);
		}
		ctx.globalAlpha = 1;
	}
}