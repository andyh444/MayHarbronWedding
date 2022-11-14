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
	
	console.log(previousActiveIndex);
	
	var appearFromLeft = index > previousActiveIndex;
	
	// make all non active 
	elements[previousActiveIndex].dataset.activepage = false;
	void pages[previousActiveIndex].offsetWidth;
	if (index > previousActiveIndex) {
		pages[previousActiveIndex].dataset.status = "disappearingToRight";
	}
	else {
		pages[previousActiveIndex].dataset.status = "disappearingToLeft";
	}
	elements[index].dataset.activepage = true;
	
	var animationDuration = 250; // this needs to be the same as in the css file
	var scaledDuration = 1.1 * animationDuration;
	console.log("original duration: " + animationDuration + ", scaled duration: " + scaledDuration);
	// when animation has finished, make the previous page display hidden
	setTimeout(function() {
		pages[previousActiveIndex].dataset.status = "hidden";
	}, scaledDuration);
	console.log("prev active index: " + previousActiveIndex);
	if (index != 1) {
		clearPolaroids();
	}
	else if (previousActiveIndex != 1) {
		initialisePolaroids();
	}
	void pages[index].offsetWidth;
	setTimeout(function() {
		if (index > previousActiveIndex) {
			pages[index].dataset.status="activeFromLeft";
		}
		else {
			pages[index].dataset.status="activeFromRight";
		}
		
	},scaledDuration);
}


	
function bodyonload() {
	console.log("hello");
}