function createButtons() {
	menubuttons = [
		{x: canvas.width / 2 - 150, y: 300, w: 300, display: "Achievements", menu: [0], onClick: "navigateMenu(1)"},
		{x: canvas.width / 2 - 150, y: 200, w: 300, display: "Play", menu: [0], onClick: "navigateMenu(2); start()"},
		{x: canvas.width / 2 - 150, y: 250, w: 300, display: "Settings", menu: [0], onClick: "navigateMenu(3)"},
		{x: canvas.width / 2 - 150, y: 400, w: 300, display: "Trainers", menu: [0], onClick: "navigateMenu(4);"},
		{x: canvas.width / 2 - 150, y: 350, w: 300, display: "Buy cards, adjust deck", menu: [0], onClick: "navigateMenu(7);"},
		
		{x: canvas.width / 2 - 150, y: 300, w: 300, display: "Typer", menu: [4], onClick: "navigateMenu(6); toTrainer(1)"},
		{x: canvas.width / 2 - 150, y: 200, w: 300, display: "Whack-a-mole", menu: [4], onClick: "navigateMenu(6); toTrainer(2)"},
		{x: canvas.width / 2 - 150, y: 250, w: 300, display: "8-puzzle", menu: [4], onClick: "navigateMenu(6); toTrainer(3)"},
		{x: canvas.width / 2 - 150, y: 350, w: 300, display: "Digit memo", menu: [4], onClick: "navigateMenu(6); toTrainer(4)"},
		
		
		{x: canvas.width / 2 - 150, y: canvas.height - 50, w: 300, display: "Back", menu: [1, 3, 4, 5, 6, 7], onClick: "escBack()"},
		
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