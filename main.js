$(document).ready(function(){
	setNoOfDays();
	
	elementFadeIn($('h1.starthidden'), 0);
	elementFadeIn($('h2.starthidden'), 0);
	elementFadeIn($('img.starthidden'), 100);
	elementFadeIn($('div.starthidden'), 200);
	//$("img").click(function(){
	//	$(this).animate({opacity:'0',width:'0',margin:'50%'});
	//});
	$(".venueimagecontainer").mouseenter(function() {
		imageAnimate($(this),50,100,16);
	});
	$(".venueimagecontainer").mouseleave(function() {
		imageAnimate($(this),100,0,1);
	});
	//$(".venueimagecontainer").click(function() {
	//	$(this).animate({width: "50%"});
	//});
	$("#showMapButton").click(function() {
		var textElement = document.getElementById("showMapText");
		var elementOpacity;
		if (textElement.innerHTML === "Show Map")
		{
			textElement.innerHTML = "Hide Map";
			elementOpacity = '0%';
		}
		else
		{
			textElement.innerHTML = "Show Map";
			elementOpacity = '100%';
		}
		$('.hideOnShowMap').fadeToggle();
	});
});

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