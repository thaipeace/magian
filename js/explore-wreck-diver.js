var oxyVolume = 20;
var isVideoStoped = false;

$(document).ready(function() {
	$('.body--wreck-driver .close-menu').click(function(event){
		$('.page--wreck-diver .adventure .part .video .skip-video').show();
		playPart1();
	});

	$('.page--wreck-diver .adventure .part .video .skip-video').click(function(event) {
		$('.body--wreck-driver .close-menu').trigger('click');
		$(event.target).hide();

		var video = document.getElementById('part1-video');
		video.currentTime = 8.5;
		handleEndOfFirstVideo(video);
	});

	$(document).click(function(event){
		var visibleDescription = false;
		$('.adventure .description').each(function(index, element) {
			if ($(element).css('visibility') === 'visible') {
				visibleDescription = true;
			}
		});
		
		if (isVideoStoped && visibleDescription) {
			$('.description').css('visibility', 'hidden');
			startOxyVolumeDes();
		}
	});
});

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
	        $('.page--wreck-diver .adventure .part .video .skip-video').hide();
	        $('.page--wreck-diver .adventure .part1 .part-item').addClass('show');
	        
	        startOxyVolumeDes();
	        setupCollectingEvent();
	        showControlAndCollection();
	    	
	        $('.page--wreck-diver .adventure .continue').on('click', function(){
	        	$('.part').removeClass('active');
	        	$('.part2').addClass('active');
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
	video.play();

    //handler should be bound first
    video.addEventListener("timeupdate", function() {
       	if (this.currentTime >= 12.5 && !isVideoStoped) {
       		isVideoStoped = true;
            this.pause();
            $('.page--wreck-diver .adventure .part2 .part-item').addClass('show');
            $('.page--wreck-diver .adventure .control .continue').css('opacity', 1);

            startOxyVolumeDes();
            setupCollectingEvent();
            showControlAndCollection();
        }
    }, false);
}

function setupCollectingEvent() {
	$('.page--wreck-diver .adventure .part .part-item.show .twinkles').on('click', function(event) {
		$(this).css({
			'animation-name': 'stop-it',
			background: 'none'
		});

		$('img', event.target).show();
	});

	$('.page--wreck-diver .adventure .part .part-item.show .twinkles img').on('click', function(event) {
		event.stopPropagation();
		var parentContext = $(this).parent().parent();
		$('.description').css('visibility', 'hidden');
		$('.description', parentContext).css('visibility', 'visible');

		var itemInCollectionClass = $('.twinkles', parentContext).data('target');
		$('.' + itemInCollectionClass, '.collection').css('opacity', 1);

		window.clearInterval(window.oxyVolumeDes);
	});
}

function showControlAndCollection() {
	$('.page--wreck-diver .adventure .control').show();
	$('.page--wreck-diver .collection').show();

	$('.page--wreck-diver .adventure .control .navigation > div').on('click', function(event){
		moveBackgroud($(this).attr('id'));
	});

	navigationKeyBoardSupport();
}

function startOxyVolumeDes() {
    window.oxyVolumeDes = setInterval(function() {
		oxyVolume--;
		var currentHeight = 
				(oxyVolume * $('.page--wreck-diver .adventure .control .monitor .oxygen .oxy-bar').height()) / 20;

		$('.page--wreck-diver .adventure .control .monitor .oxygen .oxy-bar .progress-bar').css(
			'height', currentHeight + 'px'
		);

		if (oxyVolume === 0) {
			window.clearInterval(window.oxyVolumeDes);
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
	var videoElement = $('.page--wreck-diver .adventure .part.active .part-video');
	var topVideoPosition = parseInt(videoElement.css('top'));
	var leftVideoPosition = parseInt(videoElement.css('left'));

	var itemElements = $('.page--wreck-diver .adventure .part.active .part-item');

	var controlElement = $('.page--wreck-diver .adventure .control');
	var collectionElement = $('.page--wreck-diver .collection');
	
	switch (direction) {
		case 'up':
			if (Math.abs(topVideoPosition) >= controlElement.height()) return;
			videoElement.css('top', topVideoPosition - 10);

			$.each(itemElements, function(index, itemElement){
				var topItemPosition = parseInt($(itemElement).css('top'));
				$(itemElement).css('top', topItemPosition - 10);
			});
			
			break;
		case 'down':
			if (topVideoPosition >= 0) return;
			videoElement.css('top', topVideoPosition + 10);

			$.each(itemElements, function(index, itemElement){
				var topItemPosition = parseInt($(itemElement).css('top'));
				$(itemElement).css('top', topItemPosition + 10);
			});

			break;
		case 'left':
			if (Math.abs(leftVideoPosition) >= collectionElement.width()) return;
			videoElement.css('left', leftVideoPosition - 10);

			$.each(itemElements, function(index, itemElement){
				var leftItemPosition = parseInt($(itemElement).css('left'));
				$(itemElement).css('left', leftItemPosition - 10);
			});

			break;
		case 'right':
			if (leftVideoPosition >= 0) return;
			videoElement.css('left', leftVideoPosition + 10);

			$.each(itemElements, function(index, itemElement){
				var leftItemPosition = parseInt($(itemElement).css('left'));
				$(itemElement).css('left', leftItemPosition + 10);
			});

			break;
	}
}