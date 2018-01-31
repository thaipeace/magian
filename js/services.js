var MainService = (function(){
	
	var journalDatas = [
		{
			itemCodes: ["item22", "item101"],
			itemName: "Donkey Engine Boiler",
			itemDetail: "This is the boiler, which was used for heating water to create steam that powered small engines like the donkey engine.",
			shipDetail: "<p>The George Marsh was a ship of sail during the era of steam ships.</p><p>Steam engine technology was used on deck to help make work easier and crews smaller.</p>",
			conditionsDetail: "The boiler has been moved on this wreck – it would have normally been placed in the middle of the ship",
			pointPosition: "top: 44%; left: 12%",
			itemImage: "img/wreck-diver/items/journal/A02_Boiler_MarkedUp_Image.jpg",
			itemImageAttachment: "img/wreck-diver/items/STEP05_Boiler_image_rollover.png"
		},
		{
			itemCodes: [],
			itemName: "",
			itemDetail: "",
			shipDetail: "",
			conditionsDetail: "",
			pointPosition: "",
			itemImage: '',
			itemImageAttachment: ''
		}
	];

	return {
		journalDatas: journalDatas,
		initAudio: initAudio,
		stopAudio: stopAudio,
		startAudio: startAudio,
		activeJournal: activeJournal,
		bindDatasToJournalByItem: bindDatasToJournalByItem,
		resetStyleByJournal: resetStyleByJournal
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

	function activeJournal() {
		$('.journal').addClass('active');

		var dive1ItemsDiscoveredElement = $('.bag > div[data-dive=1][discover=true]');
		dive1ItemsDiscoveredElement.append('<img class="bag__item--image" src="img/wreck-diver/discovered_object_tick.png" />');
		dive1ItemsDiscoveredElement.css('cursor', 'pointer');
		dive1ItemsDiscoveredElement.css('z-index', 1);

	  	dive1ItemsDiscoveredElement.on('click', function(event){
	  		$('.book').css('background', 'transparent');
			$('.left-page, .right-page, .attachment-image').css('display', 'flex');
			bindDatasToJournalByItem($(this).attr('class'));
			restyleItemByJournal($(this));
		});
	}

	function bindDatasToJournalByItem(itemCode) {
		journalDatas.forEach(function(journalData){
			if (journalData.itemCodes.indexOf(itemCode) !== -1) {
				$('.attachment-image--src', '.journal').css('background-image', 'url(' + journalData.itemImageAttachment + ')');
				$('.item-detail-label', '.journal').html(journalData.itemName);
				$('.item-detail-text', '.journal').html(journalData.itemDetail);
				$('.ship-detail-text', '.journal').html(journalData.shipDetail);
				$('.item-name', '.journal').html(journalData.itemName);
				$('.item-image', '.journal').css('background-image', 'url(' + journalData.itemImage + ')');
				$('.conditions-text', '.journal').html(journalData.conditionsDetail);
				$('.location-point', '.journal').attr('style', journalData.pointPosition);
			}
		});
	}

	function restyleItemByJournal(collectionElement) {
		$('img', collectionElement).css('-webkit-filter', 'invert(60%) sepia(1) contrast(2)');
		$('img', collectionElement).css('filter', 'invert(60%) sepia(1) contrast(2)');

		$('.bag__item--image', collectionElement).css('-webkit-filter', 'brightness(1) hue-rotate(234deg) saturate(2)');
		$('.bag__item--image', collectionElement).css('filter', 'brightness(1) hue-rotate(234deg) saturate(2)');
	}

	function resetStyleByJournal() {
		var dive1ItemsDiscoveredElement = $('.bag > div[data-dive=1][discover=true]');
		dive1ItemsDiscoveredElement.css('cursor', 'normal');
		dive1ItemsDiscoveredElement.css('z-index', 'auto');

		$('img', dive1ItemsDiscoveredElement).css('-webkit-filter', 'invert(100%)');
		$('img', dive1ItemsDiscoveredElement).css('filter', 'invert(100%)');

		$('.bag__item--image', dive1ItemsDiscoveredElement).remove();
	}
})()