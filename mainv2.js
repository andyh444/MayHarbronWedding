function bodyonload() {
	window.addEventListener("hashchange", function(e) {
		setPageFromURL();
	});

	setNoOfDays();
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

function setNoOfDays() {
	const el = document.getElementById('numberOfDaysLabel');
	const daysToGo = noOfDaysToGo();
	var message;
	if (daysToGo < 0) {
		message = "It's happened already! What are you doing back here? :P";
	}
	else if (daysToGo == 0) {
		message = "We're saying I do today!";
	}
	else if (daysToGo == 1) {
		message = `We're saying I do tomorrow!`;
	}
	else {
		message = `We're saying I do in ${daysToGo} days!`;
	}
	el.innerHTML = message;
}

function noOfDaysToGo() {
	var today = new Date();
	var targetDate = new Date('2023-07-23T00:00:01'); //'2023-07-23T00:00:01'
	var diffInMs = targetDate - today; // gives a timespan in milliseconds
	return Math.ceil(diffInMs / (1000 * 3600 * 24));
}