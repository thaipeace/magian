(function() {
  'use strict';

  function ExploreCharts() {}

  ExploreCharts.prototype.init = function() {
    this.initTemplate();
    this.openLearnPopup();
    this.startSlider();
    this.startModalSlider();
    this.setupTooltip();
  };

  ExploreCharts.prototype.initTemplate = function() {
    var _this = this;
    var isMobile = window.innerWidth < 1200;
    var $information = $('.mysteries-depths--slider-information');
    var $thumbnailContainer = $('.mysteries-depths--slider-image');

    if (isMobile) {
      $information.removeClass('sp-layer sp-static');
      $information.removeAttr('data-position data-horizontal data-vertical data-width');

      $thumbnailContainer.removeClass('sp-layer sp-static');
      $thumbnailContainer.removeAttr('data-position data-horizontal data-vertical data-width');
    }

    $('.explore-charts--modal-content .tooltip').on('keypress', function(e) {
      if(e.keyCode === 13) {
        e.preventDefault();
        e.stopPropagation();
        
        var target = $(this).attr('data-modal');
        if ($(target).closest('div.jquery-modal.blocker.current').length) {
          $(target).modal("hide");
        } else {
          $(target).modal({
            fadeDuration: 250,
            fadeDelay: 1.5,
            closeExisting: false,
          });
          $(target).on($.modal.OPEN, function(event, modal) {
            _this.registerSlider(target);
            $('.close-modal').attr('tabindex', 1);
            $('.explore-charts-map-location-modal .sp-arrow.sp-previous-arrow').text('Back');
            $('.explore-charts-map-location-modal .sp-arrow.sp-next-arrow').text('Next');
          });
        }        
      }
    });
  };

  ExploreCharts.prototype.openLearnPopup = function() {
    var learnButton = $('button.learn');
    $(learnButton).trigger('click');
  };

  ExploreCharts.prototype.startSlider = function() {
    var _this = this;
    if ($('.page--explore-charts-box').length) {
      $('.page--explore-charts-box').on('click', function(e) {
        e.preventDefault();

        var target = $(this).attr('data-modal');
        $(target).modal({
          fadeDuration: 250,
          fadeDelay: 1.5,
          closeExisting: false,
        });
        $(target).on($.modal.OPEN, function(event, modal) {
          // _this.registerSlider(target);
        });
      });
    }
  };

  ExploreCharts.prototype.setupTooltip = function() {
    if ($('.tooltip').length) {
      $('.tooltip').tooltipster();
    }
  };

  ExploreCharts.prototype.startModalSlider = function() {
    var _this = this;
    if ($('.explore-charts--modal-content .tooltip').length) {
      $('.explore-charts--modal-content .tooltip').on('click', function(e) {
        e.preventDefault();

        var target = $(this).attr('data-modal');
        $(target).modal({
          fadeDuration: 250,
          fadeDelay: 1.5,
          closeExisting: false,
        });

        $(target).on($.modal.OPEN, function(event, modal) {
          _this.registerSlider(target);
          $('.close-modal').attr('tabindex', 1);
          $('.explore-charts-map-location-modal .sp-arrow.sp-previous-arrow').text('Back');
          $('.explore-charts-map-location-modal .sp-arrow.sp-next-arrow').text('Next');
        });
      });
    }
  };

  ExploreCharts.prototype.registerSlider = function(element) {
    var isMobile = window.innerWidth < 1200;
    $(element).sliderPro({
      width: '130vh',
      autoHeight: true,
      updateHash: true,
      arrows: true,
      fade: true,
      autoplay: false,
      touchSwipe: false,
    });
  };

  $(document).ready(function() {
    var exploreCharts = new ExploreCharts();
    exploreCharts.init();
  });

})();

