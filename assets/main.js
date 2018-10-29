(function() {

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    function formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        var hours = date.getHours();
        var minutes = date.getHours();
      
        return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours + ':' + minutes;
    }


    window.submitForm = function() {
        var $form = $('.contact-form');
        var $phone = $form.find('input[name="phone"]').removeClass('input-error');
        var $phoneErr = $form.find('.input-error-message-phone').css('visibility', 'hidden');
        var phoneVal = $phone.val().trim();
        var $email = $form.find('input[name="email"]').removeClass('input-error');
        var $emailErr = $form.find('.input-error-message-email').css('visibility', 'hidden');
        var emailVal = $email.val().trim();
        var $submit = $form.find('.contact-form-submit');

        if (!/^\d{8,13}$/.test(phoneVal)) {
            $phone.addClass('input-error');
            $phoneErr.css('visibility', 'visible').text('מספר טלפון צריך להיות מורכב ממספרים בלבד');
            return false;
        }

        if (emailVal.length > 0 && !validateEmail(emailVal)) {
            $email.addClass('input-error');
            $emailErr.css('visibility', 'visible').text('יש למלא אימייל תקני (או להשאיר את השדה ריק)');
            return false;
        }

        $submit.attr('disabled', 'disabled');
        $.ajax('http://multashka.com', {
            type: 'POST',
            data: {
                'homepage-intro-form': '1',
                'homepage-intro-name': '2פנייה מדף פרומו',
                'homepage-intro-phone': phoneVal,
                'homepage-intro-email': emailVal,
                'homepage-intro-message': 'Contact us from the landing page 2 ' + formatDate(new Date()),
                'homepage-intro-submit': 'send-from-lp',
            },
            success: function(res) {
                var height = $('.contact-form').height();
                $('.contact-form').hide();
                $('.contact-form-thank-you')
                    .css('height', height)
                    .text('תודה על פנייתך, נשמח לחזור אלייך בהקדם')
                    .show();
            },
            error: function(xhr, textStatus) {
                var height = $('.contact-form').height();
                $('.contact-form').hide();
                $('.contact-form-thank-you')
                    .css('height', height)
                    .html('לצערינו ארעה שגיאה' + '<br>' + 'תנסו ליצור קשר דרך פייסבוק או אינסטגרם, להתקשר ישירות, או נסו מאוחר יותר')
                    .show();
            },
            complete: function() {
                $submit.removeAttr('disabled');
            }
        });
        
        return false;
    };


    window.openContactUs = function(num) {
        $('.contact-us-form-wrapper-' + num).removeClass('d-none');
    }

    // https://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-with-jquery
    function isImageOk(img) {
        return !(!img.complete || img.naturalWidth === 0);
    }

    var setBgForImg = function(img, counter) {
        if (!isImageOk(img)) {
            if (!counter || counter < 10) {
                setTimeout(function() {
                    setBgForImg(img, (!counter ? 1 : ++counter));
                }, 500);
            }
        } else {
            var vibrant = new Vibrant(img);
            var swatches = vibrant.swatches();
            //var bgColor = swatches.DarkMuted.getHex();
            var bgColor1 = swatches.Muted.getHex();
            var bgColor2 = swatches.DarkMuted.getHex();
            //$(img).parents('.carousel-item').css('background', bgColor);
            $(img).parents('.carousel-item').css('background-image', 'linear-gradient(to bottom,'+bgColor1+','+bgColor2+')');
        }
    }

    // load images colors
    $(document).ready(function() {
        $('#homepageCarousel .carousel-inner img').each(function(i, img) {
            setBgForImg(img);
        });
    });

})();