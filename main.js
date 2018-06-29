(function () {
    var maxImagesInType = {
        'all': 9,
        'beauty': 8,
        'jewelry': 12,
        'fashion': 18
    };

    // udpate the URL of WhatsApp send message link
    var updateWhatsAppUrl = function () {
        // update whatsApp link for mobile
        var mobileAgentRegex = /android|webos|iphone|ipad|ipod|blackberry|bb|playbook|iemobile|windows phone|kindle|silk|opera mini/i;
        if (mobileAgentRegex.test(navigator.userAgent.toLowerCase())) {
            var $whatsappLink = $('.whatsapp-link');
            $whatsappLink.attr('href', $whatsappLink.attr('href').replace('web.', 'api.'))
        }
    };

    // get {top, left} of a jQuery element
    var getElementOffset = function ($obj) {
        var childPos = $obj.offset();
        var parentPos = $obj.parent().offset();
        return {
            top: childPos.top - parentPos.top,
            left: childPos.left - parentPos.left
        };
    }

    // change main image to the next one
    var updateImage = function (type) {
        var imageNumberRegex = /\/(\d+?)\.jpg$/i;

        // get the image object
        var $image = $('.photo-type-' + type + ':eq(0)');
        //var imageOffset = getElementOffset($image);

        // prepare the new image src
        var currentImageSrc = $image.attr('src');
        var currentImageNumber = currentImageSrc.match(imageNumberRegex);
        if (currentImageNumber[1]) {
            currentImageNumber = parseInt(currentImageNumber[1]);
        }
        var newImageNumber = currentImageNumber < maxImagesInType[type] ? currentImageNumber + 1 : 1;
        var newImageSrc = currentImageSrc.replace(imageNumberRegex, '/' + newImageNumber + '.jpg');

        var $newImage = $image.clone();
        $newImage.attr('src', newImageSrc);
        $newImage.css({
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 10
        }).hide();
        $newImage.insertBefore($image);

        $newImage.fadeIn(function () {
            $('.photo-type-' + type + ':gt(0)').remove();

            // make the new image back to "normal"
            $('.photo-type-' + type).css({
                position: '',
                zIndex: '',
                left: '',
                top: '',
                width: '',
                height: ''
            });

            delete $image;
        });
    };

    var updateImages = function () {
        var i = 1,
            changeInterval = 1000; // ms

        setTimeout(function () {
            updateImage('all');
        }, (i++) * changeInterval);

        setTimeout(function () {
            updateImage('fashion');
        }, (i++) * changeInterval);

        setTimeout(function () {
            updateImage('jewelry');
        }, (i++) * changeInterval);

        setTimeout(function () {
            updateImage('beauty');
        }, (i++) * changeInterval);
    }


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
    
    $(document).ready(function () {
        updateWhatsAppUrl();

        // images rotation
        setTimeout(function () {
            updateImages();
            setInterval(function () {
                updateImages()
            }, 8000);
        }, 2000);
    });
})();