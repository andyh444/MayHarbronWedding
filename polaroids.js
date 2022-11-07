function polaroidClick(number) {
	var polaroid = document.getElementsByClassName("polaroid")[number];
	/*if (polaroid.classList.contains("polaroidFlipAnimation")){
		polaroid.classList.remove("polaroidFlipAnimation");
		void polaroid.offsetWidth;
		polaroid.classList.add("polaroidFlipBackAnimation");
	}
	else {
		polaroid.classList.remove("polaroidFlipBackAnimation");
		void polaroid.offsetWidth;
		polaroid.classList.add("polaroidFlipAnimation");
	}*/
	polaroid.style.transform = "rotate(0deg) scale(-1.5, 1.5)";
	polaroid.style.backgroundImage = "none";
}

function polaroidEnter(number) {
	var polaroid = document.getElementsByClassName("polaroid")[number];
	polaroid.style.transform = "rotate(0deg) scale(1.5)";
	polaroid.style.zIndex = 999;
}

function polaroidLeave(number) {
	var polaroid = document.getElementsByClassName("polaroid")[number];
	//polaroid.classList.remove("polaroidFlipAnimation");
	//polaroid.classList.remove("polaroidFlipBackAnimation");
	console.log("rotation: " + polaroid.dataset.rotation);
	polaroid.style.transform = "rotate(" + parseInt(polaroid.dataset.rotation) +  "deg) scale(1)";
	polaroid.style.zIndex = -1;
}