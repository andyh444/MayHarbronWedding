function bodyonload() {
	window.addEventListener("hashchange", function(e) {
		setPageFromURL();
	});
	
	setPageFromURL();
}

function headerItemClick(index) {
	var buttons = document.getElementsByClassName("headerItem");
	document.location.href = "#" + buttons[index].dataset.name;
}

function changePage(index) {
		var buttons = document.getElementsByClassName("headerItem");
	var pages = document.getElementsByClassName("page");
	
	// first get the previous active index
	var previousActiveIndex = -1;
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].dataset.activepage === "true") {
			previousActiveIndex = i;
		}
	}
	if (index === previousActiveIndex) {
		// no need to do anything, we're already on this page
		return;
	}

	var animationDuration = 250; // this needs to be the same as in the css file

	var makeActiveDelay = 0;
	// make all non active 
	if (previousActiveIndex != -1) {
		makeActiveDelay = 1.1 * animationDuration; // if there's no previous index, just show the new index straight away
		buttons[previousActiveIndex].dataset.activepage = false;
		void pages[previousActiveIndex].offsetWidth;
		if (index > previousActiveIndex) {
			pages[previousActiveIndex].dataset.status = "disappearingToRight";
		}
		else {
			pages[previousActiveIndex].dataset.status = "disappearingToLeft";
		}
		
		setTimeout(function() {
			pages[previousActiveIndex].dataset.status = "hidden";
		}, 1.1 * animationDuration);
	}
	buttons[index].dataset.activepage = true;
	
	if (index != 1) {
		clearPolaroids();
	}
	else if (previousActiveIndex != 1) {
		initialisePolaroids();
	}
	void pages[index].offsetWidth;
	console.log("make active delay: "+ makeActiveDelay);
	setTimeout(function() {
		if (index > previousActiveIndex) {
			pages[index].dataset.status="activeFromLeft";
		}
		else {
			pages[index].dataset.status="activeFromRight";
		}
		
	}, makeActiveDelay);
}

function setPageFromURL() {
	console.log("setting page from URL");
	var split = document.location.href.split("#");
	console.log(split);
	if (split.length == 2) {
		var buttons = document.getElementsByClassName("headerItem");
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].dataset.name === split[1]) {
				changePage(i);
				return;
			}
		}
	}
	headerItemClick(0);
}
