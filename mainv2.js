function headerItemClick(index) {
	console.log("hello");
	var elements = document.getElementsByClassName("headerItem");
	var pages = document.getElementsByClassName("page");
	
	// first get the previous active index
	var previousActiveIndex = -1;
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].dataset.activepage === "true") {
			previousActiveIndex = i;
		}
	}
	if (index === previousActiveIndex) {
		// no need to do anything, we're already on this page
		return;
	}
	
	// make all non active 
	elements[previousActiveIndex].dataset.activepage = false;
	pages[previousActiveIndex].dataset.activepage = false;
	
	setTimeout(
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