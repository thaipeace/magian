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
	}
};

MainService.initAudio();

$(document).ready(function() {

	MainService.startAudio();

	activatePart('.part1');

	$('.body--wreck-driver .close-menu').click(function(event){
		$('.page--wreck-diver .adventure .part .video .skip-video').show();
		//MainService.startAudio();
		playPart1();
	});

	$('.page--wreck-diver .adventure .part .video .skip-video').click(function(event) {
		$('.body--wreck-driver .sidebar--popup.learn-popup').hide();
		$(this).hide();

		//MainService.stopAudio();
		var video = document.getElementById('part1-video');
		video.currentTime = 6;
		handleEndOfFirstVideo(video);
	});

	$('.head-to-surface img').click(function(event){
		$('.head-to-surface .confirm').show();
	});

	$('.head-to-surface .confirm .button').click(function(event){
		var action = $(event.target).text();
		if (action === 'YES') {
			deactiveControlAndCollection();
			activatePart('.part-head-to-surface');
			activeItemsInAnActivatedPart();
			playPartHeadToSurface();
		}
		$('.head-to-surface .confirm').hide();
	});

	$(document).click(function(event){
		disableAllDescription();
	});

	$('.page--wreck-diver .adventure .control .navigation > div').on('click', function(event){
		moveBackgroud($(this).attr('id'));
	});

	navigationKeyBoardSupport();
});

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
	$('.page--wreck-diver .adventure .control .continue').css('opacity', 0.5);
	var video = document.getElementById('part-head-to-surface-video');
	isVideoStoped = false;
	window.clearInterval(window.oxyVolumeDes);
	video.play();

	video.addEventListener("ended", function() {
       	activatePart('.part1');
       	$('.page--wreck-diver .adventure .control .continue').css('opacity', 1);
       	$('.body--wreck-driver .sidebar--popup.learn-popup').show();
       	$('.body--wreck-driver .sidebar--popup.learn-popup .close-menu').text('Dive again!');
    }, false);
}

function playPart1() {
	var video = document.getElementById('part1-video');
	isVideoStoped = false;
	window.clearInterval(window.oxyVolumeDes);
	video.play();
	handleEndOfFirstVideo(video);
}

function handleEndOfFirstVideo(video) {
	//handler should be bound first
    video.addEventListener("timeupdate", function(event) {
       	if (this.currentTime >= 8.5 && !isVideoStoped) {
       		isVideoStoped = true;
   			this.pause();
   			//MainService.stopAudio();
	        $('.page--wreck-diver .adventure .part .video .skip-video').hide();

	        activeItemsInAnActivatedPart();
	        startOxyVolumeDes();
	        setupCollectingEvent();
	        activeControlAndCollection();
	    	
	        $('.page--wreck-diver .adventure .continue .clickable').on('click', function(){
	        	disableAllDescription();
	        	activatePart('.part2');
	        	playPart2();
	        });
       	}

    }, false);
}

function playPart2() {
	var video = document.getElementById('part2-video');
	isVideoStoped = false;
	window.clearInterval(window.oxyVolumeDes);
	$('.page--wreck-diver .adventure .control .continue').css('opacity', 0.5);
	$('.page--wreck-diver .adventure .part2 .part-item').removeClass('active');
	MainService.startAudio();
	startOxyVolumeDes();
	video.currentTime = 0;
	video.play();

    //handler should be bound first
    video.addEventListener("timeupdate", function() {
       	if (this.currentTime >= 12.5 && !isVideoStoped) {
       		isVideoStoped = true;
            this.pause();
            //MainService.stopAudio();
            activeItemsInAnActivatedPart();
            $('.page--wreck-diver .adventure .control .continue').css('opacity', 1);

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
		$('.' + itemInCollectionClass, '.collection').css('opacity', 1);

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
		var currentHeight = 
				(oxyVolume * $('.page--wreck-diver .adventure .control .monitor .oxygen .oxy-bar').height()) / oxyTotalVolume;

		$('.page--wreck-diver .adventure .control .monitor .oxygen .oxy-bar .progress-bar').css(
			'height', currentHeight + 'px'
		);

		if (oxyVolume <= 10) {
			oxyVolume = 10;
		}
	}, 1000);
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
		}
	}

	function handlePopUpHorizonPosition(leftItemPosition, itemElement) {
		if (leftItemPosition < 10) {
			$('.description', itemElement).css('transform', 'translateX(' + ($(itemElement).width() + 10) + 'px)');
		} else {
			$('.description', itemElement).css('transform', 'translateX(0)');
		}		
	}
}

function activatePart(partSelector) {
	$('.part').removeClass('active');
	if (partSelector === 'none') return;

	setVideoCurrentTime($(partSelector).find('.part-video').attr('id'), 0);
	$(partSelector).addClass('active');
	renderDefaultItemsPositionInActivePart(partSelector);
	resetVideoPostionToTopLeft(partSelector);
}

function renderDefaultItemsPositionInActivePart(partSelector) {
	for (var itemSelector in itemsPartDefaultPosition[partSelector]) {
	    $(itemSelector).attr('style', itemsPartDefaultPosition[partSelector][itemSelector]);
	}
}

function resetVideoPostionToTopLeft(partSelector) {
	$('.part-video', partSelector).attr('style', '');
}

function setVideoCurrentTime(videoId, certainSecond) {
	var video = document.getElementById(videoId);
	video.currentTime = certainSecond;
	video.pause();
}

function activeItemsInAnActivatedPart() {
	$('.page--wreck-diver .adventure .part .part-item').removeClass('active');
	$('.page--wreck-diver .adventure .part.active .part-item').addClass('active');
}