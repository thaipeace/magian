var MainService = (function(){
	
	return {
		initAudio: initAudio,
		stopAudio: stopAudio,
		startAudio: startAudio
	}

	function initAudio() {
		var player = '#music-player';
	    var playerContainer = '#music-player-container';
	    var options = {
	      ready: function () {
	        $(this).jPlayer('setMedia', {
	          title: '',
	          mp3: './figures/audios/audio.mp3'
	        });
	      },
	      swfPath: '../vendors/jplayer',
	      supplied: 'mp3',
	      cssSelectorAncestor: '#music-player-container',
	      wmode: 'window',
	      loop: true
	    };
	    $(player).jPlayer(options);
	}

	function stopAudio() {
		$('#music-player-container').find('.jp-pause').trigger('click');
	}

	function startAudio() {
		setTimeout(function(){
			$('#music-player-container').find('.jp-play').trigger('click');
		}, 1000);
	}
})()