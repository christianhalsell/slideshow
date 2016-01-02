var CH = CH || {};
CH.JsSlideshow = (function() {

	"use strict";

	var slideNumber = 1,
		pos = 0,
		$slideshow = $('.slideshow'),
		$navLeft = $('#navLeft'),
		$navRight = $('#navRight');

	var slideCount = function () {
		var slideTotal = $slideshow.find('li').length;
		return slideTotal;
	};

	// Set width of UL
	var ulWidth = function () {
		$slideshow.find('ul').css({ 'width' : 800 * slideCount() });
	};

	var animate = function (direction) {
		if (direction === 'right') {
			pos -= 800;
		} else {
			pos += 800;
		}

		$slideshow.find('ul').animate({ // TODO: Make the transition CSS
			left: pos
		}, 1000);
	};

	var slideCheck = function () {
		if (slideNumber === 1) {
			$navLeft.addClass('hidden');
		} else {
			$navLeft.removeClass('hidden');
		}

		if (slideNumber === slideCount()) {
			$navRight.addClass('hidden');
		} else {
			$navRight.removeClass('hidden');			
		}
	}

	return {
		init: function() {
			ulWidth();
			slideCheck();

			$('.nav-right').on('click', function () {
				slideNumber += 1;
				animate('right');
				slideCheck();
			});

			$('.nav-left').on('click', function () {
				slideNumber -= 1;
				animate('left');
				slideCheck();
			});
		}
	}
}());

CH.JsSlideshow.init();