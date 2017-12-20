(function() {
  'use strict';

  function ContactUs() {}

  ContactUs.prototype.init = function() {
    this.submitForm();
  };

  ContactUs.prototype.submitForm = function() {
    var _this = this;
    $('#contact-us-submit').on('click', function(e) {
      e.preventDefault();

      var formEmail = $('#contact-us-form').find('input').val();
      var formComments = $('#contact-us-form').find('textarea').val();

      var values = $.unserialize($(this).serialize());
      var postUrl = 'https://cors-anywhere.herokuapp.com/https://api.sendgrid.com/api/mail.send.json';
      var postData = 'api_user=dohoangminhquan&api_key=quan1984&from=info@domain.com&subject=Contact Us&to=' + formEmail + '&text=' + formComments;

      var ajaxOptions = {
        method: 'POST',
        url: postUrl,
        data: postData
      };

      $('.contact-us-message').hide();
      $('.contact-us-message').removeClass('error success');
      $.ajax(ajaxOptions)
        .done(_this.onSendEmailDone.bind(_this))
        .fail(_this.onSendEmailFailed.bind(_this));
    });
  };

  ContactUs.prototype.onSendEmailDone = function(message) {
    var message = 'Thank you for getting in touch. Please click <a href="index.html" title="Go to Homepage">here</a> to go to the homepage';

    $('.contact-us-message').addClass('success');
    $('.contact-us-message').html(message);
    $('.contact-us-message').show();
  };

  ContactUs.prototype.onSendEmailFailed = function(jqXHR, textStatus) {
    var message = 'Failed to send email';

    $('.contact-us-message').addClass('error');
    $('.contact-us-message').html(message);
    $('.contact-us-message').show();
  };

  $(document).ready(function() {
    var contactUs = new ContactUs();
    contactUs.init();
  });

})();

