function checkkeys() {
	for (k of keysDown) {
		if (lastkd.indexOf(k) > -1) {
			keyHold(k);
		}
		else {
			keyPress(k);
		}
	}
}

function keyPress(k) {
	
	if (k >= 65 && k <= 90) {
		if (keysDown.indexOf(16) > -1) {
			cm.buy(k - 74);
		}
		else {
			typer.attempt(typer.alphabet[k - 65]);
		}
	}
	if (k >= 97 && k <= 105) {
		dm.attempt(k - 96);
	}
	if (k >= 37 && k <= 40) {
		if (ep.inverted) {
			ep.doMove(k - 37);
		}
		else {
			var a = {37: 39, 39: 37, 38: 40, 40: 38};
			ep.doMove(a[k] - 37);
		}
	}
	if (k === 35) {
		start();
	}
}
function keyHold(k) {
	
}