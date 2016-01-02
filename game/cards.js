function CardManager() {
	this.x = 280;
	this.y = 300;
	this.cardWidth = 140;
	this.cardHeight = 150;
	this.cardSpacing = 10;
	this.w = this.cardWidth * 3 + this.cardSpacing * 2;
	this.h = this.cardHeight;
	this.pool = [
		{name: "Flash cards", text: ["Get +5", "green production"], bg: "#ccffcc", cost: {red: 50, green: 0, blue: 200, black: 0}, f: function() {production.green += 5}},
		{name: "Aimbot", text: ["Get +20", "blue production"], bg: "#ccccff", cost: {red: 200, green: 200, blue: 300, black: 100}, f: function() {production.blue += 20}},
		{name: "Thunder style", text: ["Get +1", "red production"], bg: "#ffd2d2", cost: {red: 0, green: 0, blue: 50, black: 0}, f: function() {production.red += 1}},
		{name: "Autoclicker", text: ["Get +1", "blue production"], bg: "#d2d2ff", cost: {red: 50, green: 0, blue: 0, black: 0}, f: function() {production.blue += 1}},
		{name: "Mega factory", text: ["Get +15", "to production", "of every color"], bg: "#009999", cost: {red: 700, green: 700, blue: 1800, black: 400}, f: function() {for (a of COLORS) {production[a] += 15}}},
		{name: "Hack-a-mole", text: ["Get +10", "blue production"], bg: "#bbbbff", cost: {red: 450, green: 0, blue: 0, black: 0}, f: function() {production.blue += 10}},
		{name: "Charity", text: ["Gain 100 vp"], bg: "#ffffa9", cost: {red: 300, green: 300, blue: 300, black: 300}, f: function() {vp += 100}},
		{name: "Hire Ben", text: ["Get +20", "black production"], bg: "#888888", cost: {red: 100, green: 50, blue: 300, black: 0}, f: function() {production.black += 20}},
		{name: "Black market", text: ["Gain +500", "black instantly"], bg: "#bbbbbb", cost: {red: 500, green: 150, blue: 120, black: 0}, f: function() {resources.black += 500}},
		{name: "Trade post", text: ["Gain +250", "of blue, green", "and black"], bg: "#bbbbbb", cost: {red: 500, green: 0, blue: 0, black: 0}, f: function() {resources.black += 250; resources.green += 250; resources.blue += 250}},
		{name: "Landmark", text: ["Gain 1500 vp"], bg: "#ffff30", cost: {red: 3000, green: 3000, blue: 3000, black: 3000}, f: function() {vp += 1500}},
		{name: "True MLG", text: ["Gain 5 vp for each", '"PERFECT!!!" click'], bg: "#ccff30", cost: {red: 100, green: 200, blue: 500, black: 100}, f: function() {wam.mlg += 1}},
	];
	this.pool = this.pool.sort(function(a, b) {
		return (a.cost.red + a.cost.green + a.cost.blue + a.cost.black) - (b.cost.red + b.cost.green + b.cost.blue + b.cost.black);
		});
	this.bought = [];
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
				this.bought.push(this.selection[id]);
				c.f();
				this.bought.sort(); // uglyyyyy... I don't give a fuck
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
				if (middle > 10000) {debugger;}
			} while (toAdd === this.upcoming[0] || toAdd === this.upcoming[1] || toAdd >= this.pool.length);
			this.upcoming.push(toAdd);
		}
	}
	this.draw = function() {
		ctx.font = "30px Arial";
		ctx.fillText("CARDS", this.x + this.w / 2, this.y - 20);
		ctx.font = "15px Arial";
		ctx.fillText("shift + j/k/l or click to buy", this.x + this.w / 2, this.y - 5);
		
		var ey = this.cardHeight + this.cardSpacing;
		var ex = (this.cardWidth + this.cardSpacing);
		for (var j = 0; j < 2; ++j) {
			for (var i = 0; i < 3; ++i) {
				var c = this.pool[[this.selection, this.upcoming][j][i]];
				ctx.strokeStyle = (this.canAfford(c) ? "green" : "red");
				ctx.fillStyle = c.bg || "white";
				
				ctx.fillRect(this.x + i * ex, this.y + j * ey, this.cardWidth, this.cardHeight);
				ctx.strokeRect(this.x + i * ex, this.y + j * ey, this.cardWidth, this.cardHeight);
				ctx.fillStyle = "black";
				ctx.font = "20px Arial";
				ctx.fillText(c.name, this.x + i * ex + this.cardWidth / 2, this.y + 20 + j * ey);
				ctx.font = "12px Arial";
				for (var k = 0; k < 4; ++k) {
					ctx.fillStyle = COLORS[k];
					ctx.fillText(c.cost[COLORS[k]], this.x + i * ex + this.cardWidth * ((Math.floor(k/2) + 1)/3), this.y + 35 + j * ey + (k % 2) * 20);
				}
				for (k in c.text) {
					ctx.fillText(c.text[k], this.x + i * ex + this.cardWidth / 2, this.y + j * ey + 80 + k * 12);
				}
			}
			
			ctx.globalAlpha = 0.5;
		}
		ctx.globalAlpha = 1;
	}
}