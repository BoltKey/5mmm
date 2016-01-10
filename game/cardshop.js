function cardShop() {
	this.pool = [
	//{id: 0, name: "Free stuff!!!", text: ["Here, take some", "resources at cost", "of vp"], bg: "#ccffcc", cost: {red: -25, green: -25, blue: -25, black: -25}, vp: -5, f: function() {}},
		{id: 1, name: "Flash cards", text: ["Get +5", "green production"], bg: "#ccffcc", cost: {red: 50, green: 0, blue: 200, black: 0}, vp: 2, f: function() {production.green += 5}, rarity: 2},
		//{id: 2, name: "Aimbot", text: ["Get +20", "blue production"], bg: "#ccccff", cost: {red: 200, green: 200, blue: 300, black: 100}, vp: 1, f: function() {production.blue += 20}},
		{id: 3, name: "Thunder style", text: ["Get +1", "red production"], bg: "#ffd2d2", cost: {red: 0, green: 0, blue: 50, black: 0}, vp: 1, f: function() {production.red += 1}, rarity: 0},
		{id: 4, name: "Autoclicker", text: ["Get +1", "blue production"], bg: "#d2d2ff", cost: {red: 50, green: 0, blue: 0, black: 0}, vp: 1, f: function() {production.blue += 1}, rarity: 0},
		{id: 5, name: "Slidy sim", text: ["Get +2", "black production"], bg: "#eeeeee", cost: {red: 60, green: 0, blue: 60, black: 0}, vp: 2, f: function() {production.black += 2}, rarity: 0},
		{id: 6, name: "Statue", text: [], bg: "#ffffcf", cost: {red: 40, green: 20, blue: 60, black: 20}, vp: 15, f: function() {}, rarity: 0},
		{id: 2, name: "Dark temple", text: [], bg: "#555555", cost: {red: 40, green: 100, blue: 40, black: 300}, vp: 50, f: function() {}, rarity: 0},
		{id: 7, name: "Collect taxes", text: ["Lose 10 vp.", "Gain 120 red and", "120 blue instantly"], bg: "#bbeeee", cost: {red: 0, green: 0, blue: 8, black: 100}, vp: -10, f: function() {resources.red += 120; resources.blue += 120}, rarity: 2},
		{id: 9, name: "Green mind", text: ["Get +2", "green production"], bg: "#eeffee", cost: {red: 50, green: 0, blue: 70, black: 0}, vp: 2, f: function() {production.green += 2}, rarity: 0},
		{id: 10, name: "Mega factory", text: ["Get +15", "to production", "of every color"], bg: "#009999", cost: {red: 700, green: 700, blue: 1800, black: 400}, vp: 30, f: function() {for (a of COLORS) {production[a] += 15}}, rarity: 3},
		{id: 11, name: "Mini factory", text: ["Get +3", "to production", "of every color"], bg: "#33aaaa", cost: {red: 160, green: 160, blue: 400, black: 100}, vp: 10, f: function() {for (a of COLORS) {production[a] += 3}}, rarity: 0},
		{id: 12, name: "Hack-a-mole", text: ["Get +10", "blue production"], bg: "#bbbbff", cost: {red: 450, green: 0, blue: 0, black: 0}, vp: 5, f: function() {production.blue += 10}, rarity: 2},
		{id: 13, name: "Speech to text", text: ["Get +10", "red production"], bg: "#ffbbbb", cost: {red: 0, green: 0, blue: 450, black: 0}, vp: 5, f: function() {production.red += 10}, rarity: 2},
		{id: 14, name: "Church", text: [], bg: "#ffffa9", cost: {red: 300, green: 300, blue: 300, black: 300}, vp: 200, f: function() {}, rarity: 0},
		{id: 15, name: "Tighten tiles", text: ["Increase black", "reward multiplier", "by 0.5"], bg: "#667766", cost: {red: 25, green: 350, blue: 25, black: 100}, vp: 4, f: function() {ep.mult += 0.5;}, rarity: 2},
		{id: 16, name: "Click! Faster!!", text: ["Increase blue", "reward multiplier", "by 0.5"], bg: "#7777ee", cost: {red: 25, green: 350, blue: 100, black: 25}, vp: 4, f: function() {wam.mult += 0.5;}, rarity: 2},
		{id: 17, name: "Memo league", text: ["Increase green", "reward multiplier", "by 0.5"], bg: "#77ee77", cost: {red: 25, green: 425, blue: 25, black: 25}, vp: 4, f: function() {dm.mult += 0.5;}, rarity: 2},
		{id: 18, name: "Key element", text: ["Increase red", "reward multiplier", "by 0.5"], bg: "#ee7777", cost: {red: 100, green: 350, blue: 25, black: 25}, vp: 4, f: function() {typer.mult += 0.5;}, rarity: 2},
		{id: 19, name: "Multi talent", text: ["Increase all", "reward multipliers", "by 0.5"], bg: "#9900cc", cost: {red: 100, green: 700, blue: 100, black: 100}, vp: 8, f: function() {dm.mult += 0.5; ep.mult += 0.5; wam.mult += 0.5; typer.mult += 0.5;}, rarity: 3},
		{id: 20, name: "Hire Ben", text: ["Get +20", "black production"], bg: "#888888", cost: {red: 200, green: 200, blue: 600, black: 0}, f: function() {production.black += 20}, vp: 5, rarity: 2},
		{id: 21, name: "Time shift", text: ["Gain 10", "additional seconds"], bg: "#bbbbbb", cost: {red: 1000, green: 1000, blue: 1000, black: 1000}, vp: 15, f: function(){startTime += 10000; seconds -= 10}, rarity: 3},
		{id: 22, name: "Black market", text: ["Gain +500", "black instantly"], bg: "#bbbbbb", cost: {red: 500, green: 150, blue: 120, black: 0}, vp: 4, f: function(){resources.black += 500}, rarity: 1},
		{id: 23, name: "Trade post", text: ["Gain +250", "of blue, green", "and black"], bg: "#bbbbbb", cost: {red: 500, green: 0, blue: 0, black: 0}, vp: 3, f: function(){resources.black += 250; resources.green += 250; resources.blue += 250}, rarity: 1},
		{id: 24, name: "Landmark", text: [], bg: "#ffff30", cost: {red: 3000, green: 3000, blue: 3000, black: 3000}, vp: 2500, f: function() {}, rarity: 3},
		{id: 25, name: "Cathedral", text: ["Get +1 vp", "every second"], bg: "#ffbb00", cost: {red: 200, green: 200, blue: 300, black: 500}, vp: 0, f: function() {vpps += 1}, rarity: 2},
		{id: 26, name: "True MLG", text: ["Gain 15 vp for each", '"PERFECT!!!" click'], vp: 0, bg: "#ccff30", cost: {red: 60, green: 120, blue: 200, black: 100}, f: function() {wam.mlg += 1}, rarity: 2},
	];
	this.freeCards = [];
	for (i of this.pool) {
		if (true)//(i.rarity === 0)
			this.freeCards.push(i.id);
	}
	this.selectedCombo = this.freeCards;
	this.draw = function() {
		
	}
}