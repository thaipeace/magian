(function() {
  'use strict';

  function MysteriesDepths() {}

  MysteriesDepths.prototype.init = function() {
    this.initTemplate();
    this.openLearnPopup();
    this.startSlider()
  };

  MysteriesDepths.prototype.initTemplate = function() {
    var isMobile = window.innerWidth < 1200;
    var $information = $('.mysteries-depths--slider-information');
    var $thumbnailContainer = $('.mysteries-depths--slider-image');

    if (isMobile) {
      $information.removeClass('sp-layer sp-static');
      $information.removeAttr('data-position data-horizontal data-vertical data-width');

      $thumbnailContainer.removeClass('sp-layer sp-static');
      $thumbnailContainer.removeAttr('data-position data-horizontal data-vertical data-width');
    }
  };

  MysteriesDepths.prototype.openLearnPopup = function() {
    var learnButton = $('button.learn');
    $(learnButton).trigger('click');
  };

  MysteriesDepths.prototype.startSlider = function() {
    var _this = this;
    if ($('.mysteries-depths--link').length) {
      $('.mysteries-depths--link').on('click', function(e) {
        e.preventDefault();

        var target = $(this).attr('href');
        $(target).modal({
          fadeDuration: 250,
          fadeDelay: 1.5,
        });
        $(target).on($.modal.OPEN, function(event, modal) {
          _this.registerSlider(target);
          $('.close-modal').attr('tabindex', 1);
          $('.mysteries-depths--slider-content .sp-arrow.sp-previous-arrow').text('Back');
          $('.mysteries-depths--slider-content .sp-arrow.sp-next-arrow').text('Next');
        });
      });
    }
  };

  MysteriesDepths.prototype.registerSlider = function(element) {
    var isMobile = window.innerWidth < 1200;
    $(element).sliderPro({
      width: isMobile ? '98%' : '130vh',
      autoHeight: true,
      updateHash: true,
      arrows: true,
      fade: true,
      autoplay: false,
      touchSwipe: false,
    });
  };

  $(document).ready(function() {
    var mysteriesDepths = new MysteriesDepths();
    mysteriesDepths.init();
  });

})();

