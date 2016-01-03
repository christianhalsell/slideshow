var CH = CH || {};
CH.JsSlideshow = (function() {

	"use strict";

	var slideNumber = 1,
		pos = 0,
		duration = 5000,
		$slideshow = $('.slideshow'),
		$slideshowTitle = $('#slideshowTitle'),
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

	var getTitle = function (slide) {
		var title = $slideshow.find('li:nth-child(' + slide + ')').find('img').attr('title');
		$slideshowTitle.html(title);
	}

	var slide = function (direction) {
		if (direction === 'right') {
			slideNumber += 1;
		}

		if (direction === 'left' ) {
			slideNumber -= 1;			
		}

		animate(direction);
		slideCheck();
		getTitle(slideNumber);
	}

	return {
		init: function() {
			ulWidth();
			slideCheck();
			getTitle(slideNumber);

			$navRight.off('click.navR').on('click.navR', function () {
				if (!$(this).hasClass('disabled')) {
					slide('right');
				}
			});

			$navLeft.off('click.navL').on('click.navL', function () {
				if (!$(this).hasClass('disabled')) {
					slide('left');
				}
			});	
		}
	}
}());

CH.JsSlideshow.init();