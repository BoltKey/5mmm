function click() {
	if (isMouseIn(wam)) {
		wam.click(divPos.x - wam.x, divPos.y - wam.y)
	}
	if (isMouseIn(dm)) {
		var x = Math.floor((divPos.y - dm.y) / (dm.w / 3));
		var y = Math.floor((divPos.x - dm.x) / (dm.w / 3));
		console.log("in " + x + y);
		dm.attempt(3 * (2 - (Math.floor((divPos.y - dm.y) / (dm.w / 3)))) + Math.floor((divPos.x - dm.x) / (dm.w / 3) + 1))
	}
}

function isMouseIn(obj) {
	var c1, c2, c3, c4;
	c1 = divPos.y > obj.y;
	c2 = divPos.y < obj.y + ((typeof(obj.h) !== "undefined") ? obj.h : obj.w);
	c3 = divPos.x > obj.x;
	c4 = divPos.x < obj.x + obj.w;
	//return (c1 && c2 && c3 && c4);
	return (divPos.y > obj.y && 
	divPos.y < obj.y + ((typeof(obj.h) !== "undefined") ? obj.h : obj.w) &&
	divPos.x > obj.x &&
	divPos.x < obj.x + obj.w);
}