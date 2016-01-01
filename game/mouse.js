function click() {
	if (divPos.y > wam.top && divPos.y < wam.top + wam.h && divPos.x > wam.left && divPos.x < wam.left + wam.w) {
		wam.click(divPos.x - wam.left, divPos.y - wam.top)
	}
}