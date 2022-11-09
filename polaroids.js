class PolaroidData {
	constructor(imageFileName, descriptionString, dateString) {
		this.imageFileName = imageFileName;
		this.descriptionString = descriptionString;
		this.dateString = dateString;
	}
}

function onload() {
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
		var element = createPolaroid(i, 80 * Math.random(), 50 * Math.random(), rotation, polaroidDataList[i]);
		groupElement.appendChild(element);
	}
	var covers = document.getElementsByClassName("polaroidimagecover");
	
	
	setTimeout(initialisePolaroids,100);
}

function initialisePolaroids() {
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

	var containerElement = document.createElement('div');
	containerElement.classList.add('polaroidcontainer');
	polaroidElement.appendChild(containerElement);
	
	var imagecontainerElement = document.createElement('div');
	imagecontainerElement.classList.add('polaroidimagecontainer');
	imagecontainerElement.innerHTML = "<image class='polaroidimage' src='Images\\" + polaroidData.imageFileName + "' />"
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
	
	polaroid.children[0].style.transform = "rotate(0deg) scale(-1.5, 1.5)";
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

			//var newLeft = amount * directionX;
			//var newTop = amount * directionY;
			//polaroids[i].style.transform = "translate(" + (10* polaroids[i].dataset.originalleft + newLeft) + "vw, " + 10 * newTop + "px)"; 
			
			var rotation = parseInt(polaroids[i].dataset.rotation) + 30 * (Math.random()-0.5);
			polaroids[i].children[0].style.transform = "rotate(" + rotation +  "deg) scale(1)";
		}
	}
	
	var polaroid = polaroids[number];
	
	polaroid.children[0].style.transform = "rotate(0deg) scale(1.5)";
	polaroid.style.zIndex = 999;

}

function polaroidLeave(number) {
	var polaroids = document.getElementsByClassName("polaroid");
	allPolaroidsToOriginalPosition(true);
	
	var polaroid = polaroids[number];

	polaroid.children[0].style.transform = "rotate(" + parseInt(polaroid.dataset.rotation) +  "deg) scale(1)";
	polaroid.style.zIndex = -1;
	polaroid.children[0].children[0].style.opacity = 1;
	polaroid.children[0].children[1].style.opacity = 0;
	
}

function allPolaroidsToOriginalPosition(includeRotation) {
	var polaroids = document.getElementsByClassName("polaroid");
	for (var i = 0; i < polaroids.length; i++)
	{
		if (includeRotation === true)
		{
			polaroids[i].children[0].style.transform = "rotate(" + parseInt(polaroids[i].dataset.rotation) +  "deg) scale(1)";
	
		}
		polaroids[i].style.left = polaroids[i].dataset.originalleft + '%';
		polaroids[i].style.top = polaroids[i].dataset.originaltop + '%';
		
		//polaroids[i].style.transform = "translate(" + polaroids[i].dataset.originalleft + "vw, " + 10 * polaroids[i].dataset.originaltop + "px)"; 
			
	}
}