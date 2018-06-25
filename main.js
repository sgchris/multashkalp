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
        var $image = $('.photo-type-' + type);
        var imageOffset = getElementOffset($image);

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
            left: imageOffset['left'],
            top: imageOffset['top'],
            width: $image.outerWidth() + 'px',
            height: $image.outerHeight() + 'px',
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

    var validator = new FormValidator('contact-form', [{
        name: 'phone',
        display: 'required',
        rules: 'required|numeric|min_length[8]|max_length[14]'
    }, {
        name: 'email',
        rules: 'valid_email'
    }], function(errors, event) {
        var $form = $('.contact-form');
        var $phone = $form.find('input[name="phone"]').removeClass('input-error');
        var $phoneErr = $form.find('.input-error-message-phone').css('visibility', 'hidden');
        var $email = $form.find('input[name="email"]').removeClass('input-error');
        var $emailErr = $form.find('.input-error-message-email').css('visibility', 'hidden');
        
        if (errors && errors.length > 0) {
            errors.forEach(function(errData) {
                if (errData.name == 'phone') {
                    $phone.addClass('input-error');
                    $phoneErr.css('visibility', 'visible');
                }
                if (errData.name == 'email') {
                    $email.addClass('input-error');
                    $emailErr.css('visibility', 'visible');
                }
            });
            return;
        } else {
            $iframe = $('iframe#submit-form-iframe');
            if ($iframe.length == 0) {
                $iframe = $('<iframe>')
                    .attr('id', 'submit-form-iframe')
                    .attr('width', '1')
                    .attr('height', '1')
                    .css('visibility', 'hidden')
                $(document).append($iframe);
            }

            $form.attr('target', 'submit-form-iframe').submit();
        }
    });

    /*
    window.submitForm = function() {
        var $phone = $('.contact-form input[name="phone"]');
        var $email = $('.contact-form input[name="email"]');

        // check phone
        if ($phone.val().trim() == '') {
            $phone.addClass('input-error');
            return false;
        } else {
            $phone.removeClass('input-error');
        }

        // check phone only numbers
        if (!/^\d+$/.test($phone.val().trim())) {
            $phone.addClass('input-error');
            alert('מספר טלפון צריך להיות מורכב ממספרים בלבד');
            return false;
        } else {
            $phone.removeClass('input-error');
        }

        
        console.log('submitting');
        return false;
    };
    */
    
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