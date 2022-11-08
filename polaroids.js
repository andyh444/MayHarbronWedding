function onload() {
	var covers = document.getElementsByClassName("polaroidimagecover");
	for (var i = 0; i < covers.length; i++)
	{
		covers[i].style.opacity=0;
	}
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
	for (var i = 0; i < polaroids.length; i++)
	{
		if (i != number)
		{
			var leftAmount = 50.0 + ((i - number) * 50.0 / polaroids.length);
			console.log((i + 1) + ',' + polaroids.length);
			polaroids[i].style.left = leftAmount + '%';
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
	for (var i = 0; i < polaroids.length; i++)
	{
		if (i != number)
		{
		polaroids[i].style.left = polaroids[i].dataset.originalleft;
		}
	}
}