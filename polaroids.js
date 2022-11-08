function onload() {
	var covers = document.getElementsByClassName("polaroidimagecover");
	for (var i = 0; i < covers.length; i++)
	{
		covers[i].style.opacity=0;
	}
	allPolaroidsToOriginalPosition();
}

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
	polaroid.children[0].children[0].style.opacity = 0;
	polaroid.children[0].children[1].style.opacity = 1;
	//polaroid.style.opacity=0;
	//polaroid.style.backgroundImage = "none";
	
	
}

function polaroidEnter(number) {
	var polaroids = document.getElementsByClassName("polaroid");
	var thisPolaroid = polaroids[number];
	var thisleft = parseInt(thisPolaroid.dataset.originalleft);
	var thistop = parseInt(thisPolaroid.dataset.originaltop);
	for (var i = 0; i < polaroids.length; i++)
	{
		if (i != number)
		{
			var left = parseInt(polaroids[i].dataset.originalleft);
			var top = parseInt(polaroids[i].dataset.originaltop);
			var diffX = left - thisleft;
			var diffY = top - thistop;
			var distance = Math.sqrt(diffX * diffX + diffY * diffY);
			var directionX = diffX / distance;
			var directionY = diffY / distance;
			polaroids[i].style.left = (left + 10 * directionX) + '%';
			polaroids[i].style.top = (top + 10 * directionY) + '%';
			
			/*var leftAmount = 50.0 + ((i - number) * 50.0 / polaroids.length);
			polaroids[i].style.left = leftAmount + '%';
			
			var topAmount = (50.0 + ((number - i) * 50.0 / polaroids.length));
			polaroids[i].style.top = topAmount + '%';*/
		}
	}
	
	var polaroid = polaroids[number];
	
	polaroid.style.transform = "rotate(0deg) scale(1.5)";
	polaroid.style.zIndex = 999;

}

function polaroidLeave(number) {
	var polaroids = document.getElementsByClassName("polaroid");
	var polaroid = polaroids[number];

	polaroid.style.transform = "rotate(" + parseInt(polaroid.dataset.rotation) +  "deg) scale(1)";
	polaroid.style.zIndex = -1;
	polaroid.children[0].children[0].style.opacity = 1;
	polaroid.children[0].children[1].style.opacity = 0;
	allPolaroidsToOriginalPosition();
}

function allPolaroidsToOriginalPosition() {
	var polaroids = document.getElementsByClassName("polaroid");
	for (var i = 0; i < polaroids.length; i++)
	{
		polaroids[i].style.left = polaroids[i].dataset.originalleft + '%';
		polaroids[i].style.top = polaroids[i].dataset.originaltop + '%';
	}
}