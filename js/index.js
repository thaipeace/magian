(function() {
  'use strict';

  function Index() {}

  Index.prototype.init = function() {
    MainService.initAudio();
    MainService.startAudio();
    this.openLearnPopup();
  };

  Index.prototype.openLearnPopup = function() {
    $('.learn').trigger('click');
  };

  $(document).ready(function() {
    var index = new Index();
    index.init();
  });

})();

