function CardManager() {
	this.x = 280;
	this.y = 300;
	this.cardWidth = 140;
	this.cardHeight = 150;
	this.cardSpacing = 10;
	this.pool = [
		{name: "Memo bot", text: ["Get +10", "green production"], colorcode: 0, cost: {red: 50, green: 0, blue: 200, black: 0}, f: function() {production.green += 10}},
		{name: "Thunder style", text: ["Get +5", "red production"], colorcode: 0, cost: {red: 0, green: 0, blue: 50, black: 0}, f: function() {production.red += 5}},
		{name: "Mega factory", text: ["Get +15", "to production", "of every color"], colorcode: 0, cost: {red: 20, green: 20, blue: 1500, black: 0}, f: function() {for (a of COLORS) {production[a] += 15}}},
		{name: "c", colorcode: 0, cost: {red: 0, green: 0, blue: 0, black: 0}, f: function() {resources.red++}},
		{name: "Charity", text: ["Gain 10 vp"], colorcode: 0, cost: {red: 30, green: 30, blue: 30, black: 30}, f: function() {vp += 10}},
		{name: "Nikoli Guru", text: ["Get +20", "black production"], colorcode: 0, cost: {red: 100, green: 50, blue: 300, black: 0}, f: function() {vp += 10}},
	]
	this.bought = [];
	this.selection = [];
	this.upcoming = [];
	for (var i = 0; i < 3; ++i) {
		this.upcoming.push(Math.floor(Math.random() * this.pool.length));
	}
	this.canAfford = function(c) {
		for (k of COLORS) {
			if (c.cost[k] > resources[k])
				return false;
		}
		return true;
	}
	this.buy = function(id) {
		c = this.pool[this.selection[id]];
		if (this.canAfford(c)) {
			for (k of COLORS) {
				resources[k] -= c.cost[k];
			}
			this.bought.push(this.selection[id]);
			c.f();
			this.newSet();
		}
	}
	this.newSet = function() {
		// TODO: select based on resources
		this.selection = this.upcoming.slice();  // magic
		this.upcoming = [];
		for (var i = 0; i < 3; ++i) {
			this.upcoming.push(Math.floor(Math.random() * this.pool.length));
		}
	}
	this.draw = function() {
		ctx.font = "30px Arial";
		ctx.fillText("CARDS", this.x + (this.cardWidth * 3 + this.cardSpacing * 2) / 2, this.y - 10);
		
		var ey = this.cardHeight + this.cardSpacing;
		var ex = (this.cardWidth + this.cardSpacing);
		for (var j = 0; j < 2; ++j) {
			for (var i = 0; i < 3; ++i) {
				var c = this.pool[[this.selection, this.upcoming][j][i]];
				ctx.strokeStyle = (this.canAfford(c) ? "green" : "red");
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
					ctx.fillText(c.text[k], this.x + i * ex + this.cardWidth / 2, this.y + j * ey + 80 + k * 10);
				}
			}
			
			ctx.globalAlpha = 0.5;
		}
		ctx.globalAlpha = 1;
	}
}