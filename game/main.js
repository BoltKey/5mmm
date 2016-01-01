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
var texts = [];
var resources = {red: 0, green: 0, blue: 0, black: 0};
var inplay = true;
function main() {
	//objects
	wam = new Whackamole();
	//fl = new FindLetter();
	typer = new Typer();
	//fl.newSet();
	dm = new DigitMemo();
	dm.newSet();
	ep = new EightPuzzle();
	ep.newSet();
	//canvas
	canvas = $("#game")[0];
	ctx = canvas.getContext("2d");
	ctx.fillRect(10, 10, 10, 10);
	//mouse
	var offset = $("#game").offset();
	$(document).mousemove(function(e){
    divPos = {
        x: e.pageX - offset.left,
        y: e.pageY - offset.top
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
	
	mainloop();
}
window.onload = main;