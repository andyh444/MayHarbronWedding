function headerItemClick(index) {
	console.log("hello");
	var elements = document.getElementsByClassName("headerItem");
	for (var i = 0; i < elements.length; i++) {
		if (i === index) {
			elements[i].dataset.activepage = true;
		}
		else {
			elements[i].dataset.activepage = false;
		}
	}
}
	
function bodyonload() {
	console.log("hello");
}