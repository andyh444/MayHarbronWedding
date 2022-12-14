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
	/*$("#showMapButton").click(function() {
		toggleMapVisibility();
	});*/
	
	setupFontResizing(document.getElementsByClassName("textboxoverimage"),0.05);
	setupFontResizing([document.getElementById("showMapButton")],0.25);
	window.onscroll = function(){scroll()};
});

function setupFontResizing(parentElements, ratio) {
	var resizeObserver = new ResizeObserver((entries) =>
	{
		for (var i = 0; i < entries.length; i++)
		{
			var thisElement = entries[i].target;
			var child = thisElement.firstElementChild;
			for (var j = 0; j < thisElement.children.length; j++)
			{
				thisElement.children[j].style.fontSize = (ratio * thisElement.offsetWidth) + 'px';
			}
		}
	})
	for (var i = 0; i < parentElements.length; i++)
	{
		resizeObserver.observe(parentElements[i]);
	}
}

function toggleMapVisibility() {
	var buttonElement = document.getElementById("showMapButton");
	$('.hideOnShowMap').stop();
	var hideMapText = document.getElementById("hideMapText");
	var showMapText = document.getElementById("showMapText");
		
	if (buttonElement.dataset.state === "show")
	{
		buttonElement.dataset.state = "hide";
		$('.hideOnShowMap').fadeOut();
		spinText(hideMapText, 1);
		spinText(showMapText, 0);
	}
	else
	{
		buttonElement.dataset.state = "show";
		$('.hideOnShowMap').fadeIn();
		spinText(hideMapText, 0);
		spinText(showMapText, 1);
	}
}

function spinText(element, opacity) {
	var newSpin = parseInt(element.dataset.rotation) + 180;
	element.style.transform="translate(-50%,-50%) rotate(" + newSpin + "deg)";
	element.dataset.rotation=newSpin;
	element.style.opacity = opacity;
}

function newAnimationClass(element, oldClass, newClass) {
	if (element.classList.contains(oldClass))
	{
		element.classList.remove(oldClass);
	}
	void element.offsetWidth; // trigger reflow
	if (!element.classList.contains(oldClass))
	{
		element.classList.add(newClass);
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

function scroll() {
	var scrollTop = document.documentElement.scrollTop;
	var containers = document.getElementsByClassName("big bodyimagecontainer");
	for (var i = 0; i < containers.length; i++)
	{
		var rect = containers[i].getBoundingClientRect();
		if (rect.top + rect.height >= 0.33 * rect.height
			&& rect.top <= window.innerHeight - 0.33 * rect.height)
		{
			// inside the window
			if (!containers[i].classList.contains("expandbodyimagecontainerclass"))
			{
				newAnimationClass(containers[i],"contractbodyimagecontainerclass", "expandbodyimagecontainerclass");
			}

		}
		else
		{
			if (!containers[i].classList.contains("contractbodyimagecontainerclass"))
			{
				newAnimationClass(containers[i],"expandbodyimagecontainerclass", "contractbodyimagecontainerclass");
			}
		}
	}
}