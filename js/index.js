(function() {
  'use strict';

  function Index() {}

  Index.prototype.init = function() {
    MainService.initAudio();
    MainService.startAudio();
  };

  $(document).ready(function() {
    var index = new Index();
    index.init();
  });

})();

