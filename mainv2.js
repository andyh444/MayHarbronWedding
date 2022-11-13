function headerItemClick(index) {
	console.log("hello");
	var elements = document.getElementsByClassName("headerItem");
	var pages = document.getElementsByClassName("page");
	var previousActiveIndex = -1;
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].dataset.activepage === "true") {
			previousActiveIndex = i;
		}
		if (i === index) {
			elements[i].dataset.activepage = true;
			pages[i].dataset.activepage = true;
		}
		else {
			elements[i].dataset.activepage = false;
			pages[i].dataset.activepage = false;
		}
	}
	console.log("prev active index: " + previousActiveIndex);
	if (index != 1) {
		clearPolaroids();
	}
	else if (previousActiveIndex != 1) {
		initialisePolaroids();
	}
}


	
function bodyonload() {
	console.log("hello");
}