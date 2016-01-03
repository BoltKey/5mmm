var wam;
var cl;
var typer;
var ep;
var dm;
var divPos;
var lastDivPos;
var keysDown;
var lastkd;
var mouseDown;
var lastmd;
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
	
	start();
	
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
	vp = 0;
	vpps = 0;
	startTime = Date.now();
	seconds = 0;
}

function endGame() {
	inplay = false;
	showResult = true;
}

function income() {
	for (k of COLORS) {
		resources[k] += production[k];
	}
	vp += vpps;
}
window.onload = main;