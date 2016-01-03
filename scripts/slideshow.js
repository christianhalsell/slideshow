var CH = CH || {};
CH.JsSlideshow = (function() {

	"use strict";

	var slideNumber = 1,
		pos = 0,
		duration = 5000,
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
			$navLeft.addClass('disabled');
		} else {
			$navLeft.removeClass('disabled');
		}

		if (slideNumber === slideCount()) {
			$navRight.addClass('disabled');
		} else {
			$navRight.removeClass('disabled');			
		}
	};

	var slideRight = function () {
		if (!$(this).hasClass('disabled')) {
			slideNumber += 1;
			animate('right');
			slideCheck();
		}
	};

	var slideLeft = function () {
		if (!$(this).hasClass('disabled')) {
			slideNumber -= 1;
			animate('left');
			slideCheck();
		}
	};

	return {
		init: function() {
			ulWidth();
			slideCheck();

			$navRight.off('click.navR').on('click.navR', slideRight);
			$navLeft.off('click.navL').on('click.navL', slideLeft);
		}
	}
}());

CH.JsSlideshow.init();