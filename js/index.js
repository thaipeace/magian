(function() {
  'use strict';

  function Index() {}

  Index.prototype.init = function() {
    MainService.initAudio();
    MainService.startAudio();
    this.openLearnPopup();
    this.setupEvents();
  };

  Index.prototype.openLearnPopup = function() {
    $('.learn').trigger('click');
  };

  Index.prototype.setupEvents = function() {
    $('.navi-area > div').on('click', function() {
      $('.navi-area > div').removeClass('active');
      $(this).addClass('active');
    });
  }

  $(document).ready(function() {
    var index = new Index();
    index.init();
  });

})();

