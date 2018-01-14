var oxyTotalVolume = 180,
	oxyVolume = oxyTotalVolume;
var isVideoStoped = false;

var itemsPartDefaultPosition = {
	'.part1': {
		'.part1-item1': 'top: 21vh; left: 61vw;',
		'.part1-item2': 'top: 58vh; left: 27vw;'
	},
	'.part2': {
		'.part2-item1': 'top: 14vh; left: 50vw;',
		'.part2-item2': 'top: 16vh; left: 25vw;',
		'.part2-item3': 'top: 46vh; left: 31vw;',
		'.part2-item4': 'top: 60vh; left: 65vw;'
	},
	'.part3': {
		'.part3-item1': 'top: 24vh; left: 15vw;',
		'.part3-item2': 'top: 22vh; left: 55vw;',
		'.part3-item3': 'top: 14vh; left: 69vw;'
	},
	'.part4': {
		'.part4-item1': 'top: 65vh; left: 17vw;',
		'.part4-item2': 'top: 2vh; left: 36vw;',
		'.part4-item3': 'top: 33vh; left: 57vw;'
	},
	'.part5': {
		'.part5-item1': 'top: 44vh; left: 47vw;',
		'.part5-item2': 'top: 50vh; left: 60vw;'
	},
	'.part6': {
		'.part6-item1': 'top: 25vh; left: 57vw;',
		'.part6-item2': 'top: 13vh; left: 27vw;',
		'.part6-item3': 'top: 46vh; left: 32vw;',
		'.part6-item4': 'top: 56vh; left: 69vw;'
	},
	'.part7': {
		'.part7-item1': 'top: 7vh; left: 53vw;',
		'.part7-item2': 'top: 56vh; left: 25vw;',
		'.part7-item3': 'top: 64vh; left: 15vw;'
	},
	'.part8': {
		'.part8-item1': 'top: 28vh; left: 42vw;'
	},
	'.part9': {
		'.part9-item1': 'top: 40vh; left: 27vw;',
		'.part9-item2': 'top: 41vh; left: 60vw;',
		'.part9-item3': 'top: 60vh; left: 19vw;'
	},
	'.part10': {
		'.part10-item1': 'top: 22vh; left: 45vw;',
		'.part10-item2': 'top: 43vh; left: 15vw;'
	},
	'.part11': {
		'.part11-item1': 'top: 57vh; left: 63vw;',
		'.part11-item2': 'top: 51vh; left: 25vw;',
		'.part11-item3': 'top: 17vh; left: 21vw;',
		'.part11-item4': 'top: 27vh; left: 56vw;'
	},
	'.part12': {
		'.part12-item1': 'top: 22vh; left: 43vw;'
	},
	'.part13': {
		'.part13-item1': 'top: 40vh; left: 12vw;',
		'.part13-item2': 'top: 44vh; left: 36vw;',
		'.part13-item3': 'top: 47vh; left: 65vw;'
	},
	'.part14': {
		'.part14-item1': 'top: 24vh; left: 20vw;'
	}
};

var videoEndShot = {
	part1: 8.5,
	part2: 12.5,
	part3: 6.5,
	part4: 11.5,
	part5: 12,
	part6: 6.7,
	part7: 12,
	part8: 11.5,
	part9: 12.5,
	part10: 4,
	part11: 8.5,
	part12: 4.5,
	part13: 12,
	part14: 4
}

MainService.initAudio();

$(document).ready(function() {
	MainService.startAudio();

	activatePart('.part1');

	$('.body--wreck-driver .close-menu').click(function(event){
		$('.page--wreck-diver .adventure .part.active .video .skip-video').show();
		//MainService.startAudio();
		playPartBegin('part1-video');
	});

	$('.dive-again-button').click(function(){
		$(this).hide();

		$('.still-image').hide();
		deactiveControlAndCollection();
		$('.page--wreck-diver .adventure .part.active .video .skip-video').show();
		playPartBegin('part8-video');
	});

	$('.page--wreck-diver .adventure').on('click', '.part.active .video .skip-video', function(event) {
		$(this).hide();

		var video = {};
		if ($('.part1').hasClass('active')) {
			$('.body--wreck-driver .sidebar--popup.learn-popup').hide();
			video = document.getElementById('part1-video');
			video.currentTime = 6;
		} else if ($('.part8').hasClass('active')) {
			video = document.getElementById('part8-video');
			video.currentTime = 6.5;
		}

		if (video.hasOwnProperty()) {
			handleEndOfFirstVideo(video);
		}
	});

	$('.head-to-surface img').click(function(event){
		$('.head-to-surface .confirm').show();
		$('.collection .dive-complete-massage').hide();
	});

	$('.head-to-surface .confirm .button').click(function(event){
		var action = $(event.target).text();

		if (action === 'YES') {
			if (!isAllItemInActiveDiveFound()) {
				resetCollectionItemFoundInActivePart();
			}

			deactiveControlAndCollection();
			activatePart('.part-head-to-surface');
			$('.page--wreck-diver .adventure .part .part-item').removeClass('active');
			playPartHeadToSurface();
		}
		$('.oxygen .confirm').hide();
		$('.head-to-surface .confirm').hide();
	});

	$('.oxygen .confirm .button').click(function(event){
		var action = $(event.target).text();
		if (action === 'OK') {
			deactiveControlAndCollection();
			activatePart('.part-head-to-surface');
			resetCollectionItemFoundInActivePart();
			$('.page--wreck-diver .adventure .part .part-item').removeClass('active');
			playPartHeadToSurface();
		}
		$('.oxygen .confirm').hide();
	});

	$(document).click(function(event){
		disableAllDescription();
	});

	$('.page--wreck-diver .adventure .control .navigation > div').on('click', function(event){
		moveBackgroud($(this).attr('id'));
	});

	navigationKeyBoardSupport();

	$('.page--wreck-diver .adventure').on('click', '.part.active .continue .clickable',function(){
		$('.part .continue .clickable').css('pointer-events', 'none');
		disableAllDescription();
		var nextPartSelector = '.' + $('.part.active').next().attr('name');
		var nextPartName = $('.part.active').next().attr('name');
		activatePart(nextPartSelector);
		playPart(nextPartName);
	});
});

function playPart(partName) {
	var partSelector = '.' + partName;

	window.clearInterval(window.oxyVolumeDes);
	$('.page--wreck-diver .adventure .part.active .continue').css('opacity', 0.5);
	$('.part .continue .clickable').css('pointer-events', 'none');

	var video = document.getElementById($('.part-video', partSelector).attr('id'));
	isVideoStoped = false;
	startOxyVolumeDes();
	video.currentTime = 0;
	video.play();

	isVideoStoped = false;
	video.addEventListener("timeupdate", function() {
       	if (this.currentTime >= videoEndShot[partName] && !isVideoStoped) {
       		this.pause();

       		if (partName !== 'part7') {
       			$('.page--wreck-diver .adventure .part.active .continue').css('opacity', 1);
       			$('.page--wreck-diver .adventure .part.active .continue .clickable').css('pointer-events', 'auto');	
       		}
       		
       		isVideoStoped = true;
            activeItemsInAnActivatedPart();
            setupCollectingEvent();
            activeControlAndCollection();
        }
    }, false);
}

function disableAllDescription() {
	var visibleDescription = false;
	$('.adventure .description').each(function(index, element) {
		if ($(element).css('visibility') === 'visible') {
			visibleDescription = true;
		}
	});
	
	if (isVideoStoped && visibleDescription) {
		$('.description').css({
			visibility: 'hidden',
			'z-index': 0
		});
		startOxyVolumeDes();
	}
}

function playPartHeadToSurface() {
	$('.page--wreck-diver .adventure .part.active .continue').css('opacity', 0.5);
	var video = document.getElementById('part-head-to-surface-video');
	isVideoStoped = false;
	window.clearInterval(window.oxyVolumeDes);
	video.play();

	video.addEventListener("ended", function() {
		oxyVolume = oxyTotalVolume;
		updateOxyBarUI(oxyVolume);
		var activeDive = getActiveDive();

		if (isAllItemInActiveDiveFound()) {
			if (activeDive === "1") {
				$('.page--wreck-diver .collection').addClass('active');
				activatePart('.part8');
				$('.part-head-to-surface').attr('data-dive', 2);
			} else {

			}
		}else {
			if (activeDive === "1") {
		       	activatePart('.part1');
		       	$('.body--wreck-driver .sidebar--popup.learn-popup').show();
		       	$('.body--wreck-driver .sidebar--popup.learn-popup .close-menu').text('Dive again!');
	       	} else {
	       		activatePart('.part8');
	       		$('.page--wreck-diver .collection').addClass('active');
	       		$('.still-image').show();
	       		$('.dive-again-button').show();
	       	}

	       	$('.bag > div[data-dive="' + activeDive + '"]').css('opacity', '0.2');
		}

		$('.page--wreck-diver .adventure .part.active .continue').css('opacity', 0);
		
    }, false);
}

function playPartBegin(videoId) {
	var video = document.getElementById(videoId);
	isVideoStoped = false;
	window.clearInterval(window.oxyVolumeDes);
	video.play();
	handleEndOfFirstVideo(video);
}

function handleEndOfFirstVideo(video) {
	//handler should be bound first
    video.addEventListener("timeupdate", function(event) {
    	var partName = $(video).closest('.part').attr('name');

       	if (this.currentTime >= videoEndShot[partName] && !isVideoStoped) {
       		isVideoStoped = true;
   			this.pause();
   			
   			$('.page--wreck-diver .adventure .part.active .continue').css('opacity', 1);
   			$('.page--wreck-diver .adventure .part.active .continue .clickable').css('pointer-events', 'auto');	
	        activeItemsInAnActivatedPart();
	        oxyVolume = oxyTotalVolume;
			updateOxyBarUI(oxyVolume);
	        startOxyVolumeDes();

	        setupCollectingEvent();
	        activeControlAndCollection();
       	}

    }, false);
}

function playPart2() {
	var video = document.getElementById('part2-video');
	isVideoStoped = false;
	window.clearInterval(window.oxyVolumeDes);
	$('.page--wreck-diver .adventure .part.active .continue').css('opacity', 0.5);
	$('.page--wreck-diver .adventure .part2 .part-item').removeClass('active');

	startOxyVolumeDes();
	
	video.currentTime = 0;
	video.play();

    //handler should be bound first
    video.addEventListener("timeupdate", function() {
       	if (this.currentTime >= 12.5 && !isVideoStoped) {
       		isVideoStoped = true;
            this.pause();

            activeItemsInAnActivatedPart();
            $('.page--wreck-diver .adventure .part.active .continue').css('opacity', 1);

            setupCollectingEvent();
            activeControlAndCollection();
        }
    }, false);
}

function setupCollectingEvent() {
	$('.page--wreck-diver .adventure .part .part-item.active .twinkles').on('click', function(event) {
		$(this).css({
			'animation-name': 'stop-it',
			background: 'none'
		});

		$('img', event.target).show();
	});

	$('.page--wreck-diver .adventure .part .part-item.active .twinkles img').on('click', function(event) {
		event.stopPropagation();
		var parentContext = $(this).parent().parent();
		disableAllDescription()
		$('.description', parentContext).css({
			visibility: 'visible',
			'z-index': 1
		});

		var itemInCollectionClass = $('.twinkles', parentContext).data('target');
		$('.' + itemInCollectionClass, '.collection').attr('discover', true).css('opacity', 1);

		if (isAllItemInActiveDiveFound() && $(parentContext).closest('.part').attr('data-dive') === '1') {
			$('.collection .dive-complete-massage').show();
		}

		window.clearInterval(window.oxyVolumeDes);
	});
}

function activeControlAndCollection() {
	$('.page--wreck-diver .adventure .control').addClass('active');
	$('.page--wreck-diver .collection').addClass('active');
}

function deactiveControlAndCollection() {
	$('.page--wreck-diver .adventure .control').removeClass('active');
	$('.page--wreck-diver .collection').removeClass('active');
}

function startOxyVolumeDes() {
    window.oxyVolumeDes = setInterval(function() {
		oxyVolume--;
		updateOxyBarUI(oxyVolume);

		if (oxyVolume <= 0) {
			window.clearInterval(window.oxyVolumeDes);
			if (!isAllItemInActiveDiveFound()) {
				$('.oxygen .confirm').show();	
			}
		}
	}, 1000);
}

function updateOxyBarUI(oxyVolume) {
	var currentHeight = 
		(oxyVolume * $('.page--wreck-diver .adventure .control .monitor .oxygen .oxy-bar').height()) / oxyTotalVolume;

	$('.page--wreck-diver .adventure .control .monitor .oxygen .oxy-bar .progress-bar').css(
		'height', currentHeight + 'px'
	);
}

function navigationKeyBoardSupport() {
	document.onkeydown = function(e) {
	    switch (e.keyCode) {
	        case 37:
	        	moveBackgroud('left');
	            break;
	        case 38:
	            moveBackgroud('up');
	            break;
	        case 39:
	            moveBackgroud('right');
	            break;
	        case 40:
	            moveBackgroud('down');
	            break;
	    }
	};
}

function moveBackgroud(direction) {
	disableAllDescription();

	var videoElement = $('.page--wreck-diver .adventure .part.active .part-video');
	var topVideoPosition = parseInt(videoElement.css('top'));
	var leftVideoPosition = parseInt(videoElement.css('left'));

	var itemElements = $('.page--wreck-diver .adventure .part.active .part-item');

	var controlElement = $('.page--wreck-diver .adventure .control');
	var collectionElement = $('.page--wreck-diver .collection');
	var headerHeight = $('header').height();
	
	switch (direction) {
		case 'up':
			if (topVideoPosition < headerHeight) {
				videoElement.css('top', topVideoPosition + 10);
			}

			$.each(itemElements, function(index, itemElement){
				var topItemPosition = parseInt($(itemElement).css('top'));
				if (topVideoPosition < headerHeight) {
					$(itemElement).css('top', topItemPosition + 10);
				}
				
				handlePopUpVerticalPosition(parseInt($(itemElement).css('top')), itemElement);
			});
			
			break;
		case 'down':
			if (Math.abs(topVideoPosition) < controlElement.height()) {
				videoElement.css('top', topVideoPosition - 10);
			}

			$.each(itemElements, function(index, itemElement){
				var topItemPosition = parseInt($(itemElement).css('top'));
				if (Math.abs(topVideoPosition) < controlElement.height()) {
					$(itemElement).css('top', topItemPosition - 10);
				}

				handlePopUpVerticalPosition(parseInt($(itemElement).css('top')), itemElement);
			});	
			
			break;
		case 'left':
			if (leftVideoPosition < 0) {
				videoElement.css('left', leftVideoPosition + 10);	
			}
			

			$.each(itemElements, function(index, itemElement){
				var leftItemPosition = parseInt($(itemElement).css('left'));
				if (leftVideoPosition < 0) {
					$(itemElement).css('left', leftItemPosition + 10);
				}

				if ($(itemElement).find('.onleft').length > 0) {
					//handlePopUpHorizonPosition(leftItemPosition, itemElement);
				}
			});

			break;
		case 'right':
			if (Math.abs(leftVideoPosition) < collectionElement.width()) {
				videoElement.css('left', leftVideoPosition - 10);
			}

			$.each(itemElements, function(index, itemElement){
				var leftItemPosition = parseInt($(itemElement).css('left'));
				if (Math.abs(leftVideoPosition) < collectionElement.width()) {
					$(itemElement).css('left', leftItemPosition - 10);
				}

				if ($(itemElement).find('.onleft').length > 0) {
					//handlePopUpHorizonPosition(leftItemPosition, itemElement);
				}
			});

			break;
	}
}

function activatePart(partSelector) {
	$('.part').removeClass('active');
	$(partSelector).addClass('active');

	if (partSelector === 'none' || $(partSelector).find('.part-video').length < 1) return;

	setVideoCurrentTime($(partSelector).find('.part-video').attr('id'), 0.1);
	renderDefaultItemsPositionInActivePart(partSelector);
	resetVideoPostionToTopLeft(partSelector);
	clearItemsStyle(partSelector);
}

function renderDefaultItemsPositionInActivePart(partSelector) {
	for (var itemSelector in itemsPartDefaultPosition[partSelector]) {
	    $(itemSelector).attr('style', itemsPartDefaultPosition[partSelector][itemSelector]);
	}
}

function resetVideoPostionToTopLeft(partSelector) {
	$('.part-video', partSelector).removeAttr('style');
}

function clearItemsStyle(partSelector) {
	$('.part-item .description, .part-item .arrow, .part-item .twinkles, .part-item .twinkles img', partSelector).removeAttr('style');
}

function setVideoCurrentTime(videoId, certainSecond) {
	var video = document.getElementById(videoId);
	video.currentTime = certainSecond;
}

function activeItemsInAnActivatedPart() {
	$('.page--wreck-diver .adventure .part .part-item').removeClass('active');
	$('.page--wreck-diver .adventure .part.active .part-item').addClass('active');

	$('.page--wreck-diver .adventure .part.active .part-item').each(function (index, element) {
	    handlePopUpVerticalPosition(parseInt($(element).css('top')), element);
	});
}

function resetCollectionItemFoundInActivePart() {
	var diveNumber = $('.adventure').find('.part.active').attr('data-dive');
	$('.bag > div[data-dive="' + diveNumber + '"]').attr('discover', 'false').css('opacity', '0.2');
}

function isAllItemInActiveDiveFound() {
	var diveNumber = $('.adventure').find('.part.active').attr('data-dive');

	return $('.bag > div[data-dive="' + diveNumber + '"]').toArray().every(function(item){
		return $(item).attr('discover') === 'true';
	})
}

function handlePopUpVerticalPosition(topItemPosition, itemElement) {
	var headerHeight = $('header').height();
	if ($(itemElement).find('.ontop').length > 0) {
		if (topItemPosition <= headerHeight) {
			$('.description', itemElement).css('transform', 'translateY(' + ($(itemElement).height() + 10) + 'px)');
			$('.description .arrow', itemElement).css({
				top: '-4vh',
				bottom: 'unset',
				'border-left-color': 'transparent',
				'border-right-color': 'transparent',
				'border-bottom-color': 'inherit',
				'border-top-color': 'transparent'
			});
		} else {
			$('.description', itemElement).css('transform', 'translateY(0)');
			$('.description .arrow', itemElement).css({
				top: 'unset',
				bottom: '-4vh',
				'border-left-color': 'transparent',
				'border-right-color': 'transparent',
				'border-bottom-color': 'transparent',
				'border-top-color': 'inherit'
			});
		}
	} else if ($(itemElement).find('.onleft').length > 0) {
		if (topItemPosition <= headerHeight/4) {
			$('.description', itemElement).css('transform', 'translate(0, ' + ($(itemElement).height() + 10) + 'px)');
			$('.description .arrow', itemElement).css({
				top: '-4vh',
				bottom: 'unset',					    
				transform: 'translateX(-50%)',
				left: 'calc(50%)',
				'border-left-color': 'transparent',
				'border-right-color': 'transparent',
				'border-bottom-color': 'inherit',
				'border-top-color': 'transparent'
			});
		} else if (topItemPosition + $(itemElement).height() >= window.innerHeight - $('.page--wreck-diver .adventure .control').height() * 1.25) {
			$('.description', itemElement).css('transform', 'translateY(0)');
			$('.description .arrow', itemElement).css({
				top: 'unset',
				bottom: '-4vh',
				left: '50%',
				transform: 'translateX(-50%)',
				'border-left-color': 'transparent',
				'border-right-color': 'transparent',
				'border-bottom-color': 'transparent',
				'border-top-color': 'inherit'
			});
		} else {
			$('.description', itemElement).css('transform', 'translate(calc(-50% - 7vh), calc(50% + 6.5vh))');
			$('.description .arrow', itemElement).css({
				left: 'calc(100% + 2.3vh)',
		        bottom: 'calc(50%)',
				transform: 'translate(-50%, 50%)',
			    top: 'unset',
			    'border-left-color': 'inherit',
			    'border-right-color': 'transparent',
			    'border-bottom-color': 'transparent',
			    'border-top-color': 'transparent'
			});
		}
	} else if ($(itemElement).find('.onright').length > 0) {
		if (topItemPosition <= headerHeight/4) {
			$('.description', itemElement).css('transform', 'translate(0, ' + ($(itemElement).height() + 10) + 'px)');
			$('.description .arrow', itemElement).css({
				top: '-4vh',
				bottom: 'unset', 
				transform: 'translateX(-50%)',
				left: 'calc(50%)',
				right: 'unset',
				'border-left-color': 'transparent',
				'border-right-color': 'transparent',
				'border-bottom-color': 'inherit',
				'border-top-color': 'transparent'
			});
		} else if (topItemPosition + $(itemElement).height() >= window.innerHeight - $('.page--wreck-diver .adventure .control').height() * 1.05) {
			$('.description', itemElement).css('transform', 'translateY(0)');
			$('.description .arrow', itemElement).css({
				top: 'unset',
				bottom: '-4vh',
				left: '50%',
				right: 'unset',
				transform: 'translateX(-50%)',
				'border-left-color': 'transparent',
				'border-right-color': 'transparent',
				'border-bottom-color': 'transparent',
				'border-top-color': 'inherit'
			});
		} else {
			$('.description', itemElement).css('transform', 'translate(calc(50% + 7vh), calc(50% + 6.5vh))');
			$('.description .arrow', itemElement).css({
			    'right': 'calc(100% + -2vh)',
			    'left': 'unset',
			    'bottom': 'calc(50%)',
			    'transform': 'translate(-50%, 50%)',
			    'border-right-color': 'inherit',
			    'border-left-color': 'transparent',
			    'border-bottom-color': 'transparent',
			    'border-top-color': 'transparent'
			});
		}
	}
}

function handlePopUpHorizonPosition(leftItemPosition, itemElement) {
	if (leftItemPosition < 10) {
		$('.description', itemElement).css('transform', 'translateX(' + ($(itemElement).width() + 10) + 'px)');
	} else {
		$('.description', itemElement).css('transform', 'translateX(0)');
	}		
}

function getActiveDive() {
	return $('.part-head-to-surface').attr('data-dive');
}