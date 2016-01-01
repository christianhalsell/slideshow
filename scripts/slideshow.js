var CH = CH || {};
CH.Slideshow = (function() {
	"use strict";

	var a = function () {
		$('body').css({'background-color' : 'blue'});
	};

	return {
		init: function() {
			a();
		}
	}
}());

CH.Slideshow.init();