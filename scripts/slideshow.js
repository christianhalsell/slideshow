var CH = CH || {};
CH.JsSlideshow = (function() {

	"use strict";

	var $dot = $('.js-dot'),
		$navLeft = $('#navLeft'),
		$navRight = $('#navRight'),
		pos = 0,
		slideCount,
		slideNumber = 1,
		$slideshow = $('.slideshow'),
		$slideshowTitle = $('#slideshowTitle'),
		slideHeight,
		slideWidth;

	var dotSelected = function () {
		$('.js-dot').removeClass('selected');
		$('.js-dot:nth-child(' + slideNumber + ')').addClass('selected');
	}

	var slideSetup = function () {
		slideHeight = $slideshow.find('li:nth-child(1)').find('img').height();
		slideWidth = $slideshow.find('li:nth-child(1)').find('img').width();

		$slideshow.css({ 'height' : slideHeight, 'width' : slideWidth});
		slideCount = $slideshow.find('li').length;
		$slideshow.find('ul').css({ 'width' : slideWidth * slideCount });

		// create the dots for navigation
		for (var i = 1; i <= slideCount; i++) {
			$('.dots-wrap').append('<div class="dot js-dot" data-slide="' + i + '"></dot>');
		}

		dotSelected();
	};

	var animate = function (direction) {
		if (direction === 'right') {
			pos -= slideWidth;
		} else {
			pos += slideWidth;
		}

		$slideshow.find('ul').animate({ // TODO: Make the transition CSS
			left: pos
		}, 1000);
	};

	var goToSlide = function (slide) {
		$navLeft.add($navRight).removeClass('disabled');

		if (slideNumber === 1) {
			$navLeft.addClass('disabled');
		}

		if (slideNumber === slideCount) {
			$navRight.addClass('disabled');		
		}

		var title = $slideshow.find('li:nth-child(' + slide + ')').find('img').attr('title');
		$slideshowTitle.html(title);
	}

	var showSlideCount = function () {
		$('#slideCount').html(slideNumber);
	};

	var showSlideTotal = function () {
		$('#slideTotal').html(slideCount);
	};

	var slide = function (direction) {
		if (direction === 'right') {
			slideNumber ++;
		} else {
			slideNumber --;
		}

		animate(direction);
		dotSelected();
		goToSlide(slideNumber);
		showSlideCount();
	}

	var init = function() {
		// ulWidth();
		slideSetup();
		goToSlide(slideNumber);
		showSlideCount();
		showSlideTotal();

		$navRight.off('click.carousel').on('click.carousel', function () {
			if (!$(this).hasClass('disabled')) {
				slide('right');
			}
		});

		$navLeft.off('click.carousel').on('click.carousel', function () {
			if (!$(this).hasClass('disabled')) {
				slide('left');
			}
		});	
	}

	return {
		init: init
	}
}());

CH.JsSlideshow.init();