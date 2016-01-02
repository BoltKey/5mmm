

function Whackamole() {
	this.y = 220;
	this.x = 740;
	this.h = 140;
	this.w = 200;
	this.mlg = 0;
	this.mult = 1;
	texts = [];
	this.target = this.target = [5 + Math.floor(Math.random() * (this.w - 10)), 5 + Math.floor(Math.random() * (this.h - 10))];
	this.click = function(x, y) {
		change = 15 - Math.floor(Math.pow((Math.abs(x - this.target[0]) + Math.abs(y - this.target[1])), 1.2));
		change = (change > -20 ? change : -20);
		var text;
		var color = "rgba(";
		if (change > 13) {
			text = "PERFECT!!!";
			color += "0,10,100,";
			vp += this.mlg * 5;
		}
		else if (change > 9) {
			text = "Excellent!!";
			color += "255,255,20,";
		}
		else if (change > 5) {
			text = "great!";
			color += "120,255,40,";
		}
		else if (change > 0) {
			text = "good";
			color += "30,120,180,";
		}
		else {
			text = "miss";
			color += "255,10,50,";
		}
		texts.push(new floatText(text, this.x + x, this.y + y, color));
		texts.push(new floatText((change > 0 ? "+" : "") + change, this.x + this.w / 2, this.y - 20));
		resources.blue += change;
		this.target = [5 + Math.floor(Math.random() * (this.w - 10)), 5 + Math.floor(Math.random() * (this.h - 10))];
	}
	
	this.draw = function() {
		ctx.textAlign = "center";
		ctx.font = "20px Arial";
		ctx.fillStyle = "blue";
		ctx.fillText(resources.blue, this.x + this.w / 2, this.y - 5);
		ctx.fillStyle = "rgba(200,200,255,1)";
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.x, this.y, this.w, this.h);
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.strokeRect(this.x + this.target[0], this.y + this.target[1], 1, 1);
		ctx.lineWidth = 1;
		
	}
}