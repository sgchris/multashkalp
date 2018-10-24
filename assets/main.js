(function() {
    
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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
                'homepage-intro-name': 'פנייה מדף פרומו',
                'homepage-intro-phone': phoneVal,
                'homepage-intro-email': emailVal,
                'homepage-intro-message': 'Contact us from the landing page ' + formatDate(new Date()),
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
})();