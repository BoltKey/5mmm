function createButtons() {
	menubuttons = [
		{x: canvas.width / 2 - 150, y: 300, w: 300, display: "Achievements", menu: [0], onClick: "navigateMenu(1)"},
		{x: canvas.width / 2 - 150, y: 200, w: 300, display: "Play", menu: [0], onClick: "navigateMenu(2); start()"},
		{x: canvas.width / 2 - 150, y: 250, w: 300, display: "Settings", menu: [0], onClick: "navigateMenu(3)"},
		{x: canvas.width / 2 - 150, y: 350, w: 300, display: "Trainers", menu: [0], onClick: "navigateMenu(4)"},
		{x: canvas.width / 2 - 150, y: 500, w: 300, display: "Return to menu", menu: [5], onClick: "navigateMenu(0)"},
		{x: 20, y: canvas.height - 50, w: 300, display: "Back", menu: [1, 3, 4], onClick: "navigateMenu(0)"},
		
	];
}

function navigateMenu(id) {
	$(".btn").remove();
	currMenu = id;
	showResult = false;
	for (b of menubuttons) {
		if (b.menu.indexOf(id) > -1) {
			var a = $("<button type='button' class='btn btn-lg btn-primary' onclick='" + b.onClick + "'>" + b.display + "</button>")
			a.css("position", "fixed");
			a.css("left", b.x);
			a.css("top", b.y);
			a.css("width", b.w);
			$("body").append(a);
		}
	}
}