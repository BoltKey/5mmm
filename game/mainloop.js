function mainloop() {
	requestAnimationFrame(mainloop);
	now = Date.now();
	delta = now - then;
	if (delta > interval) {
		// fps calculation
		fpshistory.push(1000/delta);
		if (fpshistory.length > 20) {
			fpshistory.shift();
		}
		var tot = 0;
		for (f of fpshistory) {
			tot += f;
		}
		currfps = tot / fpshistory.length;
		then = now - (delta % interval);
		
		if (mouseDown && !lastmd) {
			cl = true;
			click();
		}
		else {
			cl = false;
		}
		checkkeys();
		achs.check();
		
		if (inplay) {
			updateSeconds();
			//gameframe();
		}
		lastmd = mouseDown;
		lastkd = JSON.parse(JSON.stringify(keysDown));
		draw();
	}
	
}

function updateSeconds() {
	if (seconds * 1000 < now - startTime) {
		++seconds;
		if (seconds >= 300) {
			endGame();
		}
		income();
	}
	if (gamesUsed() === 4) {
		achs.idAward(20);
	}
}