$(document).ready(function(){
	setNoOfDays();
	
	elementFadeIn($('h1.starthidden'), 0);
	elementFadeIn($('h2.starthidden'), 0);
	elementFadeIn($('img.starthidden'), 100);
	elementFadeIn($('div.starthidden'), 200);
	$(".venueimagecontainer").mouseenter(function() {
		imageAnimate($(this),50,100,16);
	});
	$(".venueimagecontainer").mouseleave(function() {
		imageAnimate($(this),100,0,1);
	});
	$("#showMapButton").click(function() {
		toggleMapVisibility();
	});
	
	setupFontResizing(document.getElementsByClassName("textboxoverimage"),0.05);
	setupFontResizing([document.getElementById("showMapButton")],0.25);
});

function setupFontResizing(parentElements, ratio) {
	var resizeObserver = new ResizeObserver((entries) =>
	{
		for (var i = 0; i < entries.length; i++)
		{
			var thisElement = entries[i].target;
			var child = thisElement.firstElementChild;
			child.style.fontSize = (ratio * thisElement.offsetWidth) + 'px';
		}
	})
	for (var i = 0; i < parentElements.length; i++)
	{
		resizeObserver.observe(parentElements[i]);
	}
}

function toggleMapVisibility() {
	var textElement = document.getElementById("showMapText");
	$('.hideOnShowMap').stop();
	if (textElement.innerHTML === "Show Map")
	{
		textElement.innerHTML = "Hide Map";
		$('.hideOnShowMap').fadeOut();
	}
	else
	{
		textElement.innerHTML = "Show Map";
		$('.hideOnShowMap').fadeIn();
	}
}

function imageAnimate(element,imageOpacity,textOpacity,textFontSize) {
	element.find(".venueimage").stop(true);
	element.find(".imagetext").stop(true);
	element.find(".venueimage").animate({opacity: imageOpacity + '%'});
	element.find(".imagetext").animate({opacity: textOpacity + '%' ,fontSize:textFontSize + 'px'});
}

function elementFadeIn(element, delayMs) {
	element.delay(delayMs).fadeIn(1000);
}

function setNoOfDays() {
	var el = document.getElementById('noOfDays');
	el.innerHTML = noOfDaysToGo();
}

function noOfDaysToGo() {
	var today = new Date();
	var targetDate = new Date('2023-07-23T00:00:01');
	var diffInMs = targetDate - today;
	return Math.ceil(diffInMs / (1000 * 3600 * 24));
}