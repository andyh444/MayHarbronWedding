$(document).ready(function(){
	elementFadeIn($('h1.starthidden'), 0);
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
	$(".venueimagecontainer").click(function() {
		$(this).animate({width: "50%"});
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