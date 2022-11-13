function headerItemClick(index) {
	console.log("hello");
	var elements = document.getElementsByClassName("headerItem");
	var pages = document.getElementsByClassName("page");
	for (var i = 0; i < elements.length; i++) {
		if (i === index) {
			elements[i].dataset.activepage = true;
			pages[i].dataset.activepage = true;
		}
		else {
			elements[i].dataset.activepage = false;
			pages[i].dataset.activepage = false;
		}
	}
	if (index != 1) {
		clearPolaroids();
	}
	else {
		initialisePolaroids();
	}
}


	
function bodyonload() {
	console.log("hello");
}