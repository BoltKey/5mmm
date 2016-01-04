function Achievements() {
	this.data = [
	{name: "Decent score", tooltip: "Score 100 or more", condition: function() {return showResult && vp >= 100}, rarity: 0},
	{name: "Good score", tooltip: "Score 300 or more", condition: function() {return showResult && vp >= 300}, rarity: 1},
	{name: "Great score", tooltip: "Score 700 or more", condition: function() {return showResult && vp >= 700}, rarity: 2},
	{name: "Amazing score", tooltip: "Score 2000 or more", condition: function() {return showResult && vp >= 2000}, rarity: 3},
	{name: "Hello world", tooltip: "You are playing the game. Good job.", condition: function() {return true}, rarity: 0},
	{name: "Wow, you must be good", tooltip: "This is second achievement awarded at the very same moment. This is a very long text too.", condition: function() {return true}, rarity: 2},
	{name: "A plat?!?!!? WOW", tooltip: "MMMMMM", condition: function() {return true}, rarity: 3},
	{name: "You are doing it wrong", tooltip: "End a game with negative score", condition: function() {return showResult && vp < 0}, rarity: 1},
	
	{name: "Builder", tooltip: "Own 20 cards", condition: function() {if (inplay) return cm.bought >= 20}, rarity: 1},
	{name: "Undecisive", tooltip: "Skip selection 10 times in a row", condition: function() {if (inplay) return cm.consecutiveSkips >= 10}, rarity: 0},
	{name: "Hoarder", tooltip: "Hoard 10 000 resources", condition: function() {
		if (inplay) {
			var a = 0; 
			for (c of COLORS){
				a += resources[c]
			}; 
			return a > 10000}}, 
	rarity: 3},
	{name: "Builder", tooltip: "Own 20 cards", condition: function() {if (inplay) return cm.bought >= 20}, rarity: 1},
	]
	this.data.sort(function(a, b) {return a.rarity - b.rarity});
	this.earned = [];
	this.check = function() {
		for (i = 0; i < this.data.length; ++i) {
			if (this.data[i].condition() && this.earned.indexOf(i) === -1){
				this.earned.push(i);
				this.award(i);
			}
		}
		if (this.awarding.length > 0) 
			if (this.awarding[0].effect <= 0) 
				this.awarding.splice(0, 1);
	}
	this.awarding = [];
	this.award = function(id) {
		this.awarding.push({id: id, effect: 300});
	}
	this.draw = function() {
		ctx.textAlign = "left";
		for (var i = 0; i < this.awarding.length; ++i) {
			var a = this.awarding[i];
			ctx.globalAlpha = (150 - Math.abs(150 - a.effect)) / 100;
			var x = canvas.width - 80 - Math.max(this.data[a.id].name.length, this.data[a.id].tooltip.length) * 8;
			var y = 30 + 50 * i;
			this.drawAch(a.id, x, y, canvas.width - x - 20, 45);
			ctx.fillStyle = "black";
			ctx.fillText("Achievement unlocked!", canvas.width - 200, 20);
			a.effect -= 1;
		}
		ctx.globalAlpha = 1;
		ctx.textAlign = "center";
	}
	this.drawHoF = function() {
		ctx.textAlign = "left";
		for (var i = 0; i < this.data.length; ++i) {
			if (this.earned.indexOf(i) > -1)
				ctx.globalAlpha = 1;
			else
				ctx.globalAlpha = 0.3;
			this.drawAch(i, 20 + Math.floor(i / 10) * 300, 50 + (i % 10) * 50, 290, 45);;
		}
		ctx.textAlign = "center";
	}
	this.drawAch = function(id, x, y, w, h) {
		var colors = ["#68410c", "#bbbbbb", "#ffff00", "#bbddff"];
		var bg = [3, 2, 0, 1];
		ctx.fillStyle = colors[bg[this.data[id].rarity]];
		ctx.fillRect(x, y, w, h);
		ctx.strokeRect(x, y, w, h);
		ctx.fillStyle = "black";
		ctx.font = "bold 15px Arial";
		ctx.fillText(this.data[id].name, x + 40, 17 + y);
		ctx.font = "15px Arial";
		ctx.fillText(this.data[id].tooltip, x + 40, 37 + y);
		
		ctx.fillStyle = colors[this.data[id].rarity];
		ctx.beginPath();
		ctx.arc(x + h/2, y + h/2, 5, 0, 2*Math.PI);
		ctx.fill();
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.lineWidth = 1;
	}
}