var CH = CH || {};
CH.JsSlideshow = (function() {
	"use strict";
	var slideNumber = 1,
		$slideshow = $('.slideshow');

	var slideCount = function () {
		var slideTotal = $slideshow.find('li').length;
		return slideTotal;
	};

	// Set width of UL
	var ulWidth = function () {
		$slideshow.find('ul').css({ 'width' : 800 * slideCount() });
	};

	var animate = function () {
		$slideshow.find('ul').animate({ // TODO: Make the transition CSS
			left: '-=800'
		}, 1000);
	};

	return {
		init: function() {
			ulWidth();

			$('.nav-right').on('click', function () {
				slideNumber += 1;
				
				if (slideNumber <= slideCount()) {
					animate();
				} else {
					alert('STOP!');
				}
			});
		}
	}
}());

CH.JsSlideshow.init();