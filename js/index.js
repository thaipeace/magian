(function() {
  'use strict';

  function Index() {}

  Index.prototype.init = function() {
    this.startPlayer();
  };

  Index.prototype.startPlayer = function() {
    var player = '#music-player';
    var playerContainer = '#music-player-container';
    var options = {
      ready: function () {
        $(this).jPlayer('setMedia', {
          title: '',
          mp3: './figures/audios/audio.mp3'
        });
        $(playerContainer).find('.jp-play').trigger('click');
      },
      swfPath: '../vendors/jplayer',
      supplied: 'mp3',
      cssSelectorAncestor: '#music-player-container',
      wmode: 'window',
    };
    $(player).jPlayer(options);
  };

  $(document).ready(function() {
    var index = new Index();
    index.init();
  });

})();

