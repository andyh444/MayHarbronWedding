function onload() {
	var covers = document.getElementsByClassName("polaroidimagecover");
	for (var i = 0; i < covers.length; i++)
	{
		covers[i].style.opacity=0;
	}
	allPolaroidsToOriginalPosition(true);
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
			
			// the closer the polaroid is to the active polaroid, the more it gets displaced
			var amount = 10.0 * Math.pow(distance / 100, -0.5);
			console.log(amount);
			polaroids[i].style.left = (left + amount * directionX) + '%';
			polaroids[i].style.top = (top + amount * directionY) + '%';
			
			var rotation = parseInt(polaroids[i].dataset.rotation) + 30 * (Math.random()-0.5);
			polaroids[i].style.transform = "rotate(" + rotation +  "deg) scale(1)";
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
	allPolaroidsToOriginalPosition(true);
}

function allPolaroidsToOriginalPosition(includeRotation) {
	var polaroids = document.getElementsByClassName("polaroid");
	for (var i = 0; i < polaroids.length; i++)
	{
		if (includeRotation === true)
		{
			polaroids[i].style.transform = "rotate(" + parseInt(polaroids[i].dataset.rotation) +  "deg) scale(1)";
	
		}
		polaroids[i].style.left = polaroids[i].dataset.originalleft + '%';
		polaroids[i].style.top = polaroids[i].dataset.originaltop + '%';
	}
}