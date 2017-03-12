jQuery(document).ready(function($) {
	initInput();
	initAccordion();
	initSelect();
	initAutocomplete();
	initBgImage();
	initFadeGallery();
	initRating();
	initCountdown();
	initCheck();
	initFilter();
	initCount();
	initTabs();
	initMenu();
	initPromo();
	initPopups();
	initHistoryAccordion();
	initSideMobile();

	if (!device.mobile() && !device.tablet()) {
		$('body').removeClass('mobile');
		$(window).resize(function() {
			/*$.fancybox.update();*/
			setTimeout(function() {
				initSly();
				initPromo();
			}, 100);
		});
	} else {
		$('body').addClass('mobile');
		$(window).on("orientationchange", function(event) {
			// $.fancybox.update();
			setTimeout(function() {
				initSly();
				initPromo();
			}, 100);
		});
		$('.menu .title').click(function(event) {
			$(this).closest('.col').toggleClass('open');
		});
		$('.vote .h4, .vote h4').click(function(event) {
			$(this).closest('.vote').toggleClass('open');
		});
	}

	if ('mask' in $.fn) {
		$('.tel-number').mask('+994 (00) 000 - 00 - 00');
		$('.phone-holder input').mask('000 00 00');
	}
});

$(window).load(function() {
	initSly();
	initHeight();
});

function initSideMobile() {
	$('.side-mobile').click(function(event) {
		$(this).closest('#sidebar').toggleClass('open');
		$('.side-menu').slideToggle();
		event.preventDefault();
	});
}

function initPromo() {
	var bodyW = $("body").width();
	if (bodyW >= 768) {
		$('#promo ul li').each(function(index, el) {
			var _img = $('img', this),
				_src = $(this).data('img-big');
			_img.attr('src', _src);
		});
	} else {
		$('#promo ul li').each(function(index, el) {
			var _img = $('img', this),
				_src = $(this).data('img-small');
			_img.attr('src', _src);
		});
	}
	initBgImage();
}

function initMenu() {
	$('.mobile-menu').click(function(event) {
		event.preventDefault();
		if (!$('body').hasClass('navigation')) {
			$('body').addClass('navigation');
			disableScroll();
		} else {
			$('body').removeClass('navigation');
			$('#nav > ul').removeClass('open');
			enableScroll();
		}
	});
	$('#nav > ul > li > a').click(function(event) {
		if($('body').hasClass('navigation') && $(this).parent().find('ul').size()) {
			event.preventDefault();
			$(this).closest('ul').addClass('open');
		}
	});
	$('#nav .back').click(function(event) {
		event.preventDefault();
		$('#nav > ul').removeClass('open');
	});
	$(document).on('click touchstart', function(event) {
		if ($(event.target).closest('.mobile-menu').length || $(event.target).closest('#nav').length) return;
		$('body').removeClass('navigation');
		if(!$('body').hasClass('options')) enableScroll();
		$('#nav > ul').removeClass('open');
		event.stopPropagation();
	});
}

function initHistoryAccordion() {
	$('.history > tbody > tr > td a').click(function(event) {
		var _this = $(this);
		if (!_this.closest('tr').hasClass('active')) {
			_this.closest('tr').next().find('.two-columns').slideDown(500, function() {
				_this.closest('tr').addClass('active');
			});
		} else {
			_this.closest('tr').next().find('.two-columns').slideUp(500, function() {
				_this.closest('tr').removeClass('active');
			});
		}
		event.preventDefault();
	});
}

function initTabs() {
	$('.tabset .control').text($('.tab-controls .active a').text());
	$('.tab-controls a').click(function(event) {
		var _id = $(this).attr('href');
		$(this).closest('.tab-controls').find('.active').removeClass('active');
		$(this).parent().addClass('active');
		if (_id == '*') {
			$(this).closest('div').find('.tab').addClass('active');
		} else {
			$(this).closest('div').find('.tab').removeClass('active');
			$(_id).addClass('active');
			$('.tabset .control').text($(this).text());
		}
		event.preventDefault();
	});

	$('.tabset .control').click(function(event) {
		$(this).next().toggleClass('open');
		event.preventDefault();
	});
	$(document).on('click', function(event) {
		if ($(event.target).closest('.tabset .control').length) return;
		$('.tab-controls').removeClass('open');
		event.stopPropagation();
	});
}

function initHeight() {
	$('.blog-list a, .product-list.wishes .item').matchHeight();
}

function initCount() {
	$('.number input').keydown(function(e) {
		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});
	$('.number a').click(function(event) {
		var _this = $(this),
			_input = _this.parent().find('input');
		if (_this.hasClass('fa-angle-down')) {
			if (_input.val() > 1) _input.val(parseInt(_input.val()) - 1);
		} else _input.val(parseInt(_input.val()) + 1);
		event.preventDefault();
	});
}

function initFilter() {
	if ('slider' in $.fn) {
		var $slider = $('.slider'),
			$lower = $('.min'),
			$upper = $('.max'),
			min_rent = parseInt($slider.closest('.slider-range').find('.min').val()),
			max_rent = parseInt($slider.closest('.slider-range').find('.max').val());
		$('.slider').slider({
			range: true,
			min: min_rent,
			max: max_rent,
			values: [min_rent + parseInt(10 / 100 * max_rent), max_rent - parseInt(10 / 100 * max_rent)],
			slide: function(event, ui) {
				$lower.val(ui.values[0]);
				$upper.val(ui.values[1]);
			},
			change: function(event, ui) {
				$lower.val(ui.values[0]);
				$upper.val(ui.values[1]);
			}
		});

		$lower.val(min_rent + parseInt(10 / 100 * max_rent));
		$upper.val(max_rent - parseInt(10 / 100 * max_rent));

		$lower.change(function() {
			var low = $lower.val(),
				high = $upper.val();
			low = Math.min(low, high);
			$lower.val(low);
			$slider.slider('values', 0, low);
		});

		$upper.change(function() {
			var low = $lower.val(),
				high = $upper.val();
			high = Math.max(low, high);
			$upper.val(high);
			$slider.slider('values', 1, high);
		});
	}
	// custom css expression for a case-insensitive contains()
	jQuery.expr[':'].Contains = function(a, i, m) {
		return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};

	$('.filter-input').change(function() {
		var input = $(this),
			list = input.next();

		var filter = $(this).val();

		if (filter) {
			// this finds all links in a list that contain the input,
			// and hide the ones not containing the input while showing the ones that do
			$(list).find("label:not(:Contains(" + filter + "))").hide();
			$(list).find("label:Contains(" + filter + ")").show();
			initSly();
		} else {
			$(list).find("label").show();
			initSly();
		}
		return false;
	}).keyup(function() {
		// fire the above change event after every letter
		$(this).change();
	});

	$('.mobile-filter').click(function(event) {
		event.preventDefault();
		$('body').toggleClass('options');
	});

	$(document).on('click touchstart', function(event) {
		if ($(event.target).closest('.mobile-filter').length || $(event.target).closest('.filter').length) return;
		$('body').removeClass('options');
		event.stopPropagation();
	});
}

function initCheck() {
	if ('icheck' in $.fn) {
		$('input').icheck({
			checkboxClass: 'switch',
			radioClass: 'radio',
			increaseArea: '20%'
		});
	}
	$('input').each(function(index, el) {
		if ($(this).is(':checked')) $(this).closest('label').addClass('checked');
		else if ($(this).is(':disabled')) $(this).closest('label').addClass('disabled');
	});
	$('input').on('ifToggled', function(event) {
		$(this).closest('label').toggleClass('checked');
	});
}

function initCountdown() {
	$('.countdown').each(function(index, el) {
		var _until = $(this).data('date').split(',');
		var _time = new Date(parseInt(_until[0]), parseInt(_until[1]) - 1, parseInt(_until[2]));
		$(this).countdown({
			until: _time,
			padZeroes: true,
			format: 'HMS'
		});
	});
}

function initSly() {
	if ('sly' in $.fn) {
		$frame = $('.sly .sly-holder');
		$frame2 = $('.scroll .scroll-holder');

		var _cycle = 0,
			_interval = 0;

		$frame.each(function() {
			var _this = $(this);
			var $wrap = $(this).parent();

			$('> *', _this).each(function() {
				var sum = 0;
				$(this).find("> *").each(function() {
					sum += ($(this).outerWidth(true));
				}).parent().width(sum);
			});

			var _thisW = _this.width(),
				_listW = _this.children().width();

			if (_listW > _thisW) $wrap.addClass('init');
			else $wrap.removeClass('init');

			if ($wrap.is('[data-cycle]')) {
				_cycle = 'pages';
				_interval = parseInt($wrap.data('interval'));
			}

			$(this).sly({
				horizontal: 1,
				smart: 1,
				mouseDragging: 1,
				touchDragging: 1,
				releaseSwing: 1,
				startAt: 0,
				cycleBy: _cycle,
				cycleInterval: _interval,
				scrollBar: $wrap.find('.scrollbar'),
				activatePageOn: 'click',
				scrollBy: 0,
				speed: 1000,
				elasticBounds: 1,
				easing: 'easeOutExpo',
				dragHandle: 1,
				dynamicHandle: 0,
				clickBar: 1,
				prevPage: $wrap.find('.fa-angle-left'),
				nextPage: $wrap.find('.fa-angle-right'),
				draggedClass: 'dragged', // Class for dragged elements (like SLIDEE or scrollbar handle).
				activeClass: 'active', // Class for active items and pages.
				disabledClass: 'disabled'
			}, {
				move: function(a) {
					wst = this.pos.cur;
				}
			});
			$frame.sly('reload');
		});
		$frame2.each(function() {
			var _this = $(this);
			var $wrap = $(this).parent();

			var _thisW = _this.outerHeight(true),
				_listW = _this.children().outerHeight(true);

			if (!$('.scrollbar', $wrap).size()) $wrap.append('<div class="scrollbar"><div class="handle"><div class="mousearea"></div></div></div>');

			if (_listW > _thisW) $wrap.addClass('init');
			else $wrap.removeClass('init');

			$(this).sly({
				horizontal: 0,
				smart: 1,
				mouseDragging: 1,
				touchDragging: 1,
				releaseSwing: 1,
				startAt: 0,
				cycleBy: 0,
				cycleInterval: 0,
				scrollBar: $wrap.find('.scrollbar'),
				activatePageOn: 'click',
				scrollBy: 120,
				speed: 1000,
				elasticBounds: 1,
				easing: 'easeOutExpo',
				dragHandle: 1,
				dynamicHandle: 1,
				clickBar: 1,
				prevPage: $wrap.find('.fa-angle-left'),
				nextPage: $wrap.find('.fa-angle-right'),
				draggedClass: 'dragged', // Class for dragged elements (like SLIDEE or scrollbar handle).
				activeClass: 'active', // Class for active items and pages.
				disabledClass: 'disabled'
			}, {
				move: function(a) {
					wst = this.pos.cur;
				}
			});
			$frame2.sly('reload');
		});
		$frame2.parent().mouseenter(function(event) {
			if ($(this).hasClass('init') && !$('body').hasClass('mobile')) disableScroll();
			else enableScroll();
		}).mouseleave(function(event) {
			enableScroll();
		});
	}
}

function initRating() {
	$('.rating').each(function(index, el) {
		var _this = $(this),
			_readOnly = false;
		if (_this.is('[data-readOnly]')) _readOnly = true;
		_this.barrating({
			theme: 'fontawesome-stars',
			readonly: _readOnly
		});
	});
}

function initFadeGallery() {
	$('#promo').fadeGallery({
		slides: 'li',
		btnPrev: '.fa-angle-left',
		btnNext: '.fa-angle-right',
		event: 'click',
		autoRotation: false,
		switchTime: 5000,
		animSpeed: 500
	});
	$('.photo').fadeGallery({
		slides: '.big-photo li',
		pagerLinks: '.preview li',
		btnPrev: '.fa-angle-left',
		btnNext: '.fa-angle-right',
		event: 'click',
		autoRotation: false,
		switchTime: 5000,
		animSpeed: 500
	});
	$('.fade-gallery').fadeGallery({
		slides: '.gallery li',
		pagerLinks: '.preview li',
		event: 'click',
		autoRotation: false,
		switchTime: 5000,
		animSpeed: 500
	});
}

function initBgImage() {
	$('#promo li a, .photo li a, .big-photo li, .big-pic, .blog-list .pic, .note a, .gallery li, .preview a, .registration-holder').each(function(index, el) {
		var _src = $('> img', this).attr('src');
		$('> img', this).hide();
		$(this).css('background-image', 'url(' + _src + ')');
	});
}

function initAutocomplete() {
	$('.search-button, .mobile-search a').click(function(event) {
		event.preventDefault();
		$('.search input').val('').focus();
		$('.search').toggleClass('show');
	});
	$('.search .close').click(function(event) {
		event.preventDefault();
		$('.search').removeClass('show');
	});

	var src = [{
		value: "Dolce Gabbana Cool Water",
		label: "Dolce Gabbana Cool Water",
		icon: "images/product/img01.jpg"
	}, {
		value: "Dolce Gabbana Pour Homme",
		label: "Dolce Gabbana Pour Homme",
		icon: "images/product/img02.jpg"
	}, {
		value: "Dolce Gabbana El Passo",
		label: "Dolce Gabbana El Passo",
		icon: "images/product/img03.jpg"
	}, {
		value: "Dolce Gabbana Velvet Love Perfume",
		label: "Dolce Gabbana Velvet Love Perfume",
		icon: "images/product/img04.jpg"
	}];
	$(".search input").autocomplete({
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: function(request, response) {
				var results = $.ui.autocomplete.filter(src, request.term);
				response(results.slice(0, 3)); //show 3 items.
			},
			open: function(event, ui) {
				if ($('.ui-autocomplete li').length >= 3) {
					$('.ui-autocomplete').append('<li class="view-all"><a href="javascript:alert(\'redirecting...\')"><span>View all results</span><i class="fa fa-caret-right" aria-hidden="true"></i></a></li>'); //See all results
				}
			},
			search: function(event, ui) {
				if ($('.ui-autocomplete li').length >= 3) {
					$('.ui-autocomplete').append('<li class="view-all"><a href="javascript:alert(\'redirecting...\')"><span>View all results</span><i class="fa fa-caret-right" aria-hidden="true"></i></a></li>'); //See all results
				} else {
					$('.ui-autocomplete li.view-all').remove();
				}
			}
		})
		.autocomplete("instance")._renderItem = function(ul, item) {
			return $("<li>")
				.append('<div class="visual"><img src="' + item.icon + '" /></div><strong class="name">' + item.label + '</strong>')
				.appendTo(ul);
		};
}

function initSelect() {
	if ('SumoSelect' in $.fn) {
		$('select').not('.rating').SumoSelect();
		$('.SumoSelect').each(function(index, el) {
			var _class = $('select', this).data('class'),
				_title = $('select', this).attr('placeholder');
			if (!$(this).find('.SelectBox span').hasClass('placeholder')) $(this).closest('.input').addClass('enter');
			if ($(this).hasClass('disabled')) $(this).closest('.input').addClass('disabled');
			$(this).addClass(_class);
			$('.SelectBox', this).attr('data-title', _title);
		});
	};
	$('select').not('.rating').change(function(event) {
		$(this).closest('.input').addClass('enter');
		$(this).blur();
		if ($(this).closest('.SumoSelect').hasClass('number')) $(this).closest('.SumoSelect').addClass('enter');
	});
}

function initInput() {
	var defaultVal = '';
	$('.input input, .input textarea').focus(function(event) {
		$(this).closest('.input').addClass('focus');
	}).blur(function(event) {
		$(this).closest('.input').removeClass('focus');
		var actionVal = $(this).val();
		if (actionVal != defaultVal) $(this).closest('.input').addClass('enter');
		else $(this).closest('.input').removeClass('enter');
	}).keyup(function(event) {
		var actionVal = $(this).val();
		if (actionVal != defaultVal) $(this).closest('.input').addClass('enter');
		else $(this).closest('.input').removeClass('enter');
	}).change(function(event) {
		var actionVal = $(this).val();
		if (actionVal != defaultVal) $(this).closest('.input').addClass('enter');
		else $(this).closest('.input').removeClass('enter');
		$(this).blur();
	});
	$('.input input, .input textarea').each(function(index, el) {
		if($(this).val() != '') $(this).closest('.input').addClass('enter');
		else $(this).closest('.input').removeClass('enter');
	});
	autosize($('textarea'));
}

function initAccordion() {
	$('.accordion .item .heading').click(function() {
		if (!$(this).parent().hasClass('active')) {
			$(this).parents('.accordion').children('.item.active').find('.expanded').slideUp(500, function() {
				$(this).parent().removeClass('active');
			});
			$(this).parent().find('.expanded').slideDown(500, function() {
				$(this).parent().addClass('active')
			});
		} else {
			$(this).parents('.accordion').children('.item.active').find('.expanded').slideUp(500, function() {
				$(this).parent().removeClass('active');
			});
		}
	});
}

function initPopups() {
	$(document).on('click touchstart', '[data-popup="on"]', function(event) {
		var _this = $(this),
				_margin = 60,
			_class = '', _close, _url, _type = 'ajax';
		if (_this.is('[href]')) _url = _this.attr('href');
		else _url = _this.data('href');
		if(_this.data('close')) _close = false;
		else _close = true;
		if(_this.data('class')) _class = _this.data('class');
		if(_url.substr(0, 1) == '#') _type = 'inline';
		else _type = 'ajax';
		if ($('#wrapper').width() < 767) _margin = 10;
		$.fancybox({
			type: _type,
			wrapCSS: 'popup ' + _class,
			href: _url,
			padding: 0,
			fixed: false,
			autoCenter: false,
			margin: _margin,
			minWidth: 370,
			maxWidth: 1020,
			maxHeight: '100%',
			closeBtn: _close,
			fitToView: false,
			scrolling: 'visible',
			openMethod: 'fadescaleIn',
			closeMethod: 'fadescaleOut',
			tpl: {
				closeBtn : '<a class="fancybox-item fancybox-close" href="javascript:;"><span></span></a>'
			},
			helpers: {
				overlay: {
					closeClick : false,
					locked: false
				}
			},
			beforeShow: function(current, previous) {
				if ('icheck' in $.fn) {
					$('.popup input').icheck({
						checkboxClass: 'switch',
						radioClass: 'radio',
						increaseArea: '20%'
					});
				}
				$('.popup input').each(function(index, el) {
					if ($(this).is(':checked')) $(this).closest('label').addClass('checked');
					else if ($(this).is(':disabled')) $(this).closest('label').addClass('disabled');
				});
				$('.popup input').on('ifToggled', function(event) {
					$(this).closest('label').toggleClass('checked');
				});
				initSelect();
				initInput();
				initBgImage();
				initFilter();
				initSly();
				initCount();
				initRating();
				initFadeGallery();
				initPopupGallery(_this);
			}
		});
		event.preventDefault();
	});
	$(document).on('click', '.popup .back', function(event) {
		event.preventDefault();
		$.fancybox.close();
	});
}

function initPopupGallery(galleryElem) {
	var _index = 0;
	if($(galleryElem).hasClass('big-photo')) _index = $('.active', galleryElem).index();
	else if($(galleryElem).hasClass('video')) {
		_index = $(galleryElem).index();
		var _src = $('.popup .preview li:eq('+_index+') a').attr('href');
		$('.popup .big-photo li:eq('+_index+') iframe').attr('src', _src);
	}

	$('.popup .preview li').eq(_index).trigger('click');

	$('.popup .preview li').click(function(event) {
		if($(this).hasClass('video')) {
			var _index = $(this).index(),
				_src = $(this).find('a').attr('href');
			$('.popup .big-photo li:eq('+_index+') iframe').attr('src', _src);
		} else $('.popup .big-photo iframe').attr('src', '');
	});

	$('.popup .photo > .fa').click(function(event) {
		event.preventDefault();
		if($('.popup .preview .active').hasClass('video')) {
			var _index = $('.popup .preview .active').index(),
				_src = $('.popup .preview .active').find('a').attr('href');
			$('.popup .big-photo li:eq('+_index+') iframe').attr('src', _src);
		} else $('.popup .big-photo iframe').attr('src', '');
	});
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {
	37: 1,
	38: 1,
	39: 1,
	40: 1
};

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}