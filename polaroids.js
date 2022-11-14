class PolaroidData {
	constructor(imageFileName, descriptionString, dateString) {
		this.imageFileName = imageFileName;
		this.descriptionString = descriptionString;
		this.dateString = dateString;
	}
}

function onload() {
	initialisePolaroids();
}

function initialisePolaroids() {
	console.log("initialising polaroids");
	var groupElement = document.getElementsByClassName('polaroidgroup')[0];
	const polaroidDataList = [new PolaroidData("AndyAndMollySmall.jpg", "Happy on the Hill", "23 July 23"),
		new PolaroidData("image3.jpg", "Some waterfall somewhere", "31st Feb '86"),
		new PolaroidData("image1.jpg", "Sofa time", "1st Dec '26"),
		new PolaroidData("image2.jpg", "Beach", "9th Nov '22"),
		new PolaroidData("AndyAndMollyChrisWedding.jpg", "Smile", "23 July 23"),
		new PolaroidData("ford fiesta.jpg", "Cool car", "32nd Dec '32")];
	for (var i = 0; i < polaroidDataList.length; i++)
	{
		var rotation = Math.round(60 * (Math.random() - 0.5));
		console.log(rotation);
		var element = createPolaroid(i, 20 + 60 * Math.random(), 20 + 60 * Math.random(), rotation, polaroidDataList[i]);
		groupElement.appendChild(element);
	}
	var covers = document.getElementsByClassName("polaroidimagecover");
	
	
	setTimeout(initialisePolaroidPositions,500);
}

function clearPolaroids() {
	console.log("clearing polaroids");
	var count = 0;
	
	do {
		var polaroids = document.getElementsByClassName('polaroid');
		count = polaroids.length;
		for (var i = 0; i < polaroids.length; i++) {
			polaroids[i].parentNode.removeChild(polaroids[i]);
		}
	}
	while (count > 0);
}

function initialisePolaroidPositions() {
	var covers = document.getElementsByClassName("polaroidimagecover");
	
	for (var i = 0; i < covers.length; i++)
	{
		covers[i].style.opacity=0;
	}
	allPolaroidsToOriginalPosition(true);
}

function createPolaroid(index, left, top, rotation, polaroidData) {
	var polaroidElement = document.createElement('div');
	polaroidElement.classList.add('polaroid');
	polaroidElement.dataset.originalleft = left;
	polaroidElement.dataset.originaltop = top;
	polaroidElement.dataset.rotation = rotation;
	polaroidElement.dataset.status = "normal";

	var containerElement = document.createElement('div');
	containerElement.classList.add('polaroidcontainer');
	
	polaroidElement.appendChild(containerElement);
	
	var imagecontainerElement = document.createElement('div');
	imagecontainerElement.classList.add('polaroidimagecontainer');
	imagecontainerElement.innerHTML = "<image loading='lazy' class='polaroidimage' src='Images\\" + polaroidData.imageFileName + "' />"
							+ "<div class='polaroidimagecover'>";
	
	containerElement.appendChild(imagecontainerElement);
	
	
	var backElement = document.createElement('div');
	backElement.classList.add('polaroidbackcontainer');
	backElement.innerHTML = "<div class='polaroidback'>" + polaroidData.descriptionString + "<br>" + polaroidData.dateString + "</div>";
	containerElement.appendChild(backElement);
	
	polaroidElement.onclick = function(){polaroidClick(index)};
	polaroidElement.onmouseenter = function(){polaroidEnter(index)};
	polaroidElement.onmouseleave = function(){polaroidLeave(index)};

	//var groupElement = document.getElementsByClassName('polaroidgroup')[0];
	//groupElement.appendChild(polaroidElement);
	return polaroidElement;
}

function polaroidClick(number) {
	var polaroid = document.getElementsByClassName("polaroid")[number];
	var status = polaroid.dataset.status;
	polaroid.style.removeProperty("left");
	polaroid.style.removeProperty("top");
	polaroid.children[0].style.removeProperty("transform");
	if (status === "normal" || status === "hover") {
		polaroid.dataset.status = "zoomAndCentre";
	}
	else if (status === "zoomAndCentre") {
		polaroid.dataset.status = "flip";
	}
	else if (status === "flip") {
		polaroid.dataset.status = "zoomAndCentrePostFlip";
	}
	else if (status === "zoomAndCentrePostFlip") {
		polaroid.dataset.status = "normal";
		polaroidLeave(number);
	}
	if (polaroid.dataset.status != "normal")
	{
		$(".blackoverlay").fadeIn();
	}
	else
	{
		$(".blackoverlay").fadeOut();
	}
}

function polaroidEnter(number) {
	var polaroids = document.getElementsByClassName("polaroid");
	var thisPolaroid = polaroids[number];
	if (thisPolaroid.dataset.status != "normal")
	{
		console.log(thisPolaroid.dataset.status);
		return;
	}
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
			
			var thisLeft = left + amount * directionX;
			var thisTop = top + amount * directionY;
			
			polaroids[i].style.left = "clamp(0%," + thisLeft + '%' + ",100%)";
			polaroids[i].style.top = "clamp(0%," + thisTop + '%' + ",100%)";

			//var newLeft = amount * directionX;
			//var newTop = amount * directionY;
			//polaroids[i].style.transform = "translate(" + (10* polaroids[i].dataset.originalleft + newLeft) + "vw, " + 10 * newTop + "px)"; 
			
			var rotation = parseInt(polaroids[i].dataset.rotation) + 30 * (Math.random()-0.5);
			polaroids[i].children[0].style.transform = "rotate(" + rotation +  "deg) scale(1)";
		}
	}
	//thisPolaroid.children[0].style.transform = "rotate(0deg) scale(1.5)";
	thisPolaroid.children[0].style.removeProperty("transform");
	thisPolaroid.dataset.status = "hover";
}

function polaroidLeave(number) {
	var polaroids = document.getElementsByClassName("polaroid");
	var polaroid = polaroids[number];
	if (polaroid.dataset.status === "hover" || polaroid.dataset.status === "normal")
	{
		allPolaroidsToOriginalPosition(true);
		polaroid.children[0].style.transform = "rotate(" + parseInt(polaroid.dataset.rotation) +  "deg) scale(1)";
		polaroid.dataset.status = "normal";
	}
}

function blackoverlayclick() {
	allPolaroidsToOriginalPosition(true);
}

function allPolaroidsToOriginalPosition(includeRotation) {
	var polaroids = document.getElementsByClassName("polaroid");
	$(".blackoverlay").fadeOut();
	for (var i = 0; i < polaroids.length; i++)
	{
		if (includeRotation === true)
		{
			polaroids[i].children[0].style.transform = "rotate(" + parseInt(polaroids[i].dataset.rotation) +  "deg) scale(1)";
	
		}
		polaroids[i].dataset.status = "normal";
		polaroids[i].style.left = polaroids[i].dataset.originalleft + '%';
		polaroids[i].style.top = polaroids[i].dataset.originaltop + '%';
		
		//polaroids[i].style.transform = "translate(" + polaroids[i].dataset.originalleft + "vw, " + 10 * polaroids[i].dataset.originaltop + "px)"; 
			
	}
}