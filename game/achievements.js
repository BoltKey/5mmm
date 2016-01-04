function Achievements() {
	// Don't worry. I know what the fuck am I doing with the 'id' attribute.
	this.data = [
	{id: 0, name: "Decent score", tooltip: "Score 100 or more", rarity: 0},
	{id: 1, name: "Good score", tooltip: "Score 300 or more", rarity: 1},
	{id: 2, name: "Great score", tooltip: "Score 700 or more", rarity: 2},
	{id: 3, name: "Amazing score", tooltip: "Score 2000 or more",  rarity: 3},
	{id: 4, name: "Hello world", tooltip: "You are playing the game. Good job.", rarity: 0},
	{id: 7, name: "You are doing it wrong", tooltip: "End a game with negative score", rarity: 1},
	{id: 8, name: "Builder", tooltip: "Own 20 cards", rarity: 1},
	{id: 9, name: "Undecisive", tooltip: "Skip selection 10 times in a row", rarity: 0},
	{id: 10, name: "Hoarder", tooltip: "Hoard 10 000 resources", rarity: 3},
	{id: 11, name: "Global popularity", tooltip: "Build a landmark", rarity: 3},
	
	{id: 12, name: "Resource management pro", tooltip: "Have 0 resources after buying a card", rarity: 3},
	{id: 13, name: "Multitask", tooltip: "Win all 4 minigames across 2 seconds", rarity: 2},
	{id: 14, name: "Specialist", tooltip: "Gain 200 score playing 1 minigame", rarity: 3},
	{id: 15, name: "Hacker typer", tooltip: "Score 200 without using mouse", rarity: 2},
	{id: 16, name: "Keyboard unplugged", tooltip: "Score 200 without using keyboard", rarity: 2},
	{id: 17, name: "Pixel perfect", tooltip: "Make 5 'PERFECT!!!' clicks in a row", rarity: 2},
	{id: 18, name: "Humble", tooltip: "Score 200 having maximum of 3 cards", rarity: 2},
	{id: 19, name: "First card!", tooltip: "Buy your first card", rarity: 0},
	{id: 20, name: "Getting the hang of it", tooltip: "Gain resources from each minigame", rarity: 1},
	{id: 21, name: "Perfect click", tooltip: "Make a 'PERFECT!!!' click", rarity: 0},
	{id: 22, name: "8 puzzler", tooltip: "Finish an 8-puzzle", rarity: 1},
	{id: 23, name: "Mnemomist", tooltip: "Finish digit memo", rarity: 0},
	{id: 24, name: "Typist", tooltip: "Type 10 letters without a mistake", rarity: 0},
	]
	this.data.sort(function(a, b) {return a.rarity - b.rarity});
	this.earned = [];
	this.check = function() {
		if (this.awarding.length > 0) 
			if (this.awarding[0].effect <= 0) 
				this.awarding.splice(0, 1);
	}
	this.idAward = function(id) {
		var index = this.data.findIndex(function (a) {return a.id === id});
		this.award(index);
	};
	this.awarding = [];
	this.award = function(index) {
		if (this.earned.indexOf(index) === -1) {
			this.earned.push(index);
			this.awarding.push({id: index, effect: 300});
		}
	}
	this.draw = function() {
		ctx.textAlign = "left";
		for (var i = 0; i < this.awarding.length; ++i) {
			var a = this.awarding[i];
			ctx.globalAlpha = Math.max(0, Math.min(1, (150 - Math.abs(150 - a.effect)) / 100));
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
		var colors = ["#68410c", "#bbbbbb", "#ffff00", "#ffff00"];
		var bg = [1, 2, 0, 1];
		
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
		if (this.data[id].rarity === 3) {
			ctx.strokeStyle = "green";
		}
		ctx.stroke();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
	}
}