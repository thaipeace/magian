(function() {
  'use strict';

  function ExploreHmsLawrence() {}

  ExploreHmsLawrence.prototype.init = function() {
    this.initTemplate();
    this.openLearnPopup();
    this.startSlider();
    this.startTextModal();
  };

  ExploreHmsLawrence.prototype.initTemplate = function() {
    var isMobile = window.innerWidth < 768;
    var $information = $('.mysteries-depths--slider-information');
    var $thumbnailContainer = $('.mysteries-depths--slider-image');

    if (isMobile) {
      $information.removeClass('sp-layer sp-static');
      $information.removeAttr('data-position data-horizontal data-vertical data-width');

      $thumbnailContainer.removeClass('sp-layer sp-static');
      $thumbnailContainer.removeAttr('data-position data-horizontal data-vertical data-width');
    }
  };

  ExploreHmsLawrence.prototype.openLearnPopup = function() {
    var learnButton = $('button.learn');
    $(learnButton).trigger('click');
  };

  ExploreHmsLawrence.prototype.startSlider = function() {
    var _this = this;
    if ($('.page--exploring-hms-lawrence .page--exploring-video').length) {
      $('.page--exploring-hms-lawrence .page--exploring-video').on('click', function(e) {
        e.preventDefault();

        var target = $(this).attr('data-modal');
        $(target).modal({
          fadeDuration: 250,
          fadeDelay: 1.5,
        });

        $(target).on($.modal.OPEN, function(event, modal) {
          $('.close-modal').attr('tabindex', 1);
          $('#page--exploring-video-player video').get(0).play();
        });
      });
    }
  };

  ExploreHmsLawrence.prototype.startTextModal = function() {
    var _this = this;
    if ($('.page--exploring-text').length) {
      $('.page--exploring-text').on('click', function(e) {
        e.preventDefault();

        var target = $(this).attr('data-modal');
        $(target).modal({
          fadeDuration: 250,
          fadeDelay: 1.5,
        });

        $(target).on($.modal.OPEN, function(event, modal) {
          _this.registerSlider(target);
          $('.close-modal').attr('tabindex', 1);
          $('.exploring-hms--slider-content .sp-arrow.sp-previous-arrow').text('Back');
          $('.exploring-hms--slider-content .sp-arrow.sp-next-arrow').text('Next');
        });
      });
    }
  };

  ExploreHmsLawrence.prototype.registerSlider = function(element) {
    var isMobile = window.innerWidth < 768;
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
    var exploreHms = new ExploreHmsLawrence();
    exploreHms.init();
  });

})();

