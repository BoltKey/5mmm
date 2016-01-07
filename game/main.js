var wam;
var cl;
var typer;
var ep;
var dm;
var trainerGame;
var inTrainer;
var divPos;
var lastDivPos;
var keysDown;
var lastkd;
var keybUsed;
var mouseDown;
var mouseUsed;
var lastmd;
var inTrainer = 0;
var resources = {red: 0, green: 0, blue: 0, black: 0};
var production = {red: 0, green: 0, blue: 0, black: 0};
var texts = [];

var vp = 0;
var vpps = 0;
var seconds;
var startTime;
var COLORS = ["red", "green", "blue", "black"];
var inplay = false;
var showResult = false;

var currMenu = 0;
function main() {
	
	
	//canvas
	canvas = $("#game")[0];
	ctx = canvas.getContext("2d");
	ctx.fillText("Loading... If you can read this, something went wrong probably", 10, 10);
	
	//mouse
	var offset = $("#game").offset();
	$(document).mousemove(function(e){
    divPos = {
        x: e.pageX - offset.top,
        y: e.pageY - offset.left
		}
	})
	lastDivPos = {x: 0, y: 0};
	lastmd = 0;
	mouseDown = 0;
	document.body.onmousedown = function() { 
		++mouseDown; 
		if (mouseDown === -1 || mouseDown === 2) mouseDown = 1; 
	}
	document.body.onmouseup = function() { 
		--mouseDown;
	}
	
	//keyboard
	keysDown = [];
	lastkd = [];
	$(document).keydown(function(ev) { 
		if (keysDown.indexOf(ev.keyCode) === -1) {
			keysDown.push(ev.keyCode); 
			console.log("currently pressed keys are " + keysDown + " last keys are: " + lastkd);
		}
		if ([8, 37, 38, 39, 40].indexOf(ev.keyCode) !== -1) {
			ev.preventDefault();
		}
	});
	$(document).keyup(function(ev) { keysDown.splice(keysDown.indexOf(ev.keyCode), 1) } );
	
	
	// fps control
	then = Date.now();
	fps = 60;
	fpshistory = [];
	interval = 1000/fps;
	
	createButtons();
	navigateMenu(0);
	//start();
	
	//objects
	achs = new Achievements();
	achs.idAward(4);
	mainloop();
}

function start() {
	//objects
	wam = new Whackamole();
	//fl = new FindLetter();
	typer = new Typer();
	//fl.newSet();
	dm = new DigitMemo();
	dm.newSet();
	ep = new EightPuzzle();
	ep.newSet();
	
	
	
	resources = {red: 0, green: 0, blue: 0, black: 0};
	production = {red: 0, green: 0, blue: 0, black: 0};
	
	cm = new CardManager();
	cm.newSet(true);
	cm.newSet(false);

	inplay = true;
	mouseUsed = false;
	keybUsed = false;
	vp = 0;
	vpps = 0;
	startTime = Date.now();
	seconds = 0;
}

function toTrainer(type) {
	inTrainer = type;
	trainerGame = [0, new Typer(), new Whackamole(), new EightPuzzle(), new DigitMemo()][type];
	switch(type) {
		case 1: typer = trainerGame; break;
		case 2: wam = trainerGame; break;
		case 3: ep = trainerGame; break;
		case 4: dm = trainerGame; break;
	}
	if (type > 2)
		trainerGame.newSet();
}

function endGame() {
	inplay = false;
	if (vp >= 100) {
		achs.idAward(0);
		if (vp >= 300) {
			achs.idAward(1);
			if (vp >= 700) {
				achs.idAward(2);
				if (vp >= 2000) {
					achs.idAward(3);
				}
			}
		}
	}
	
	if (vp >= 200) {
		if (cm.bought.length <= 3) 
			achs.idAward(18);
		if (!mouseUsed)
			achs.idAward(15);
		if (!keybUsed)
			achs.idAward(16);
		if (gamesUsed() === 1) 
			achs.idAward(14);
	}
	else if (vp < 0) {
		achs.award(7);
	}
	navigateMenu(5);
	showResult = true;
	
}
function gamesUsed() {
	var ret = 0;
	for (a of [wam, dm, typer, ep]) {
		if (a.earned > 0)
			++ret;
	}
	
	return ret;
}
function escBack() {
	if (inplay) {
		endGame();
	}
	else {
		if (inTrainer) {
			inTrainer = false;
		}
		navigateMenu(0);
	}
}
function checkMulti() {
	for (m of [wam, ep, dm, typer]) {
		if (m.lastReward + 2000 < Date.now()) 
			return false;
	}
	achs.idAward(13);
	return true;
}
function income() {
	var tot = 0;
	for (k of COLORS) {
		resources[k] += production[k];
		tot += resources[k];
	}
	if (tot >= 10000) 
		achs.idAward(10);
	vp += vpps;
}
function avg(results, n, plain) {
	if (typeof(plain) === "undefined") plain = true;
	var retval = "";
	var temp = [];
	for (var i = 0; i < n; ++i) {
		temp.push(results[results.length - (i + 1)]);
	}
	var sorted = JSON.parse(JSON.stringify(temp)).sort(function(a, b) {return a - b} );
	var toavg = 0;
	for (var i = 1; i < n - 1; ++i) {
		toavg += sorted[i];
	}
	var avg = Math.round((toavg / (n-2)) * 100) / 100;
	if (plain) {
		return avg;
	}
	return retval += "Avg" + n + ": " + niceTime(avg) + " ";
}
window.onload = main;