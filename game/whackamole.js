

function Whackamole() {
	this.y = 220;
	this.x = 740;
	this.h = 140;
	this.w = 200;
	this.mlg = 0;
	this.mult = 1;
	this.consPerf = 0;
	this.earned = 0;
	this.lastReward = -1;
	this.maxRew = 20;
	this.colorBorders = [1, 10, 15, 18];
	this.colors = ["255,10,50,", "30,120,180,", "120,255,40,", "255,255,20,", "0,10,100,"];
	this.magic = {};
	for (i = 0; i < 5; ++i) {
		this.magic[this.colorBorders[i]] = this.colors[i + 1];
	}
	this.target = this.target = [5 + Math.floor(Math.random() * (this.w - 10)), 5 + Math.floor(Math.random() * (this.h - 10))];
	this.stats = {
		delay: 0,
		rpc: 0,
		rps: 0,
		cps: 0,
		
		clicks: [],
	}
	this.click = function(x, y) {
		change = this.maxRew - Math.floor(Math.pow((Math.abs(x - this.target[0]) + Math.abs(y - this.target[1])), 1.2));
		change = Math.max(change, -20);
		var colorBorders = [];
		var text;
		var color = "rgba(";
		if (change >= this.colorBorders[3]) {
			text = "PERFECT!!!";
			color += this.colors[4];
			vp += this.mlg * 5;
			achs.idAward(21);
			++this.consPerf;
			if (this.consPerf >= 5) 
				achs.idAward(17);
		}
		else {
			this.consPerf = 0;
			if (change >= this.colorBorders[2]) {
				text = "Excellent!!";
				color += this.colors[3];
			}
			else if (change >= this.colorBorders[1]) {
				text = "great!";
				color += this.colors[2];
			}
			else if (change >= this.colorBorders[0]) {
				text = "good";
				color += this.colors[1];
			}
			else {
				text = "miss";
				color += this.colors[0];
			}
		}
		
		if (inplay)
			checkMulti();
		this.stats.clicks.push({c: change, t: Date.now()});
		var lastClicks = 0;
		var lastRes = 0;
		for (i = 1; i < this.stats.clicks.length; ++i) {
			c = this.stats.clicks[this.stats.clicks.length - i];
			
			if (Date.now() - 10000 < c.t) {
				++lastClicks;
				lastRes += c.c;
			}
		}
		this.stats.rps = lastRes / 10;
		this.stats.cps = lastClicks / 10;
		var c = Math.min(10, this.stats.clicks.length);
		this.stats.rpc = ((this.stats.rpc * (c - 1)) + change) / Math.max(c, 1);
		this.stats.delay = ((this.stats.delay * (c - 1)) + Date.now() - this.lastReward) / c;
		texts.push(new floatText(text, this.x + x, this.y + y, color));
		texts.push(new floatText((change > 0 ? "+" : "") + change * this.mult, this.x + this.w / 2, this.y - 20));
		resources.blue += Math.ceil(change * this.mult);
		this.earned += Math.ceil(change * this.mult);
		this.target = [5 + Math.floor(Math.random() * (this.w - 10)), 5 + Math.floor(Math.random() * (this.h - 10))];
		this.lastReward = Date.now();
	}
	
	this.draw = function() {
		ctx.textAlign = "center";
		ctx.font = "20px Arial";
		ctx.fillStyle = "blue";
		ctx.fillText(resources.blue + " (" + this.mult + "x)", this.x + this.w / 2, this.y - 5);
		ctx.fillStyle = "rgba(200,200,255,1)";
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.x, this.y, this.w, this.h);
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.strokeRect(this.x + this.target[0], this.y + this.target[1], 1, 1);
		ctx.lineWidth = 1;
		if (inTrainer)
			this.drawStats();
	}
	this.drawStats = function() {
		ctx.font = "15px Arial";
		ctx.fillStyle = "black";
		ctx.fillText("Resources/click: " + Math.floor(this.stats.rpc * 10) / 10, 500, 200);
		ctx.fillText("Clicks/second (last 10 seconds): " + Math.floor(this.stats.cps * 10) / 10, 500, 220);
		ctx.fillText("Resources/second (last 10 seconds): " + Math.floor(this.stats.rps * 10) / 10, 500, 240);
		this.drawGraph(300, 300, 400, 180);
	}
	this.drawGraph = function(x, y, w, h) {
		ctx.fillStyle = "#dddddd";
		ctx.fillRect(x, y, w, h);
		var totals = [];
		for (var i = 0; i < this.maxRew + 1; ++i) 
			totals.push(0);
		for (var i = 0; i < this.stats.clicks.length; ++i) {
			var index = this.stats.clicks[i].c;
			if (index <= 0) 
				++totals[0];
			else
				++totals[index];
		}
		var max = Math.max(...totals);
		ctx.fillStyle = "#ff0000";
		
		for (var i = 0; i < totals.length; ++i) {
			if (typeof(this.magic[i]) !== "undefined")
				ctx.fillStyle = "rgba(" + this.magic[i] + "1)";
			ctx.fillRect(x + 5 + i * ((w - 10) / totals.length), y + h - 10, (w - 10) / totals.length - 2, - totals[i] * ((h - 20) / max));
			ctx.fillText(i, x + 15 + i * ((w - 10) / totals.length), y + h + 12);
		}
	}
}