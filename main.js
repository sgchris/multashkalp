(function() {
    var mainImages = {
        'all': {
            current: 1,
            max: 9
        },
        'beauty': {
            current: 1,
            max: 8
        },
        'jewelry': {
            current: 1,
            max: 12
        },
        'fashion': {
            current: 1,
            max: 18
        }
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
    var getElementOffset = function($obj) {
        var childPos = $obj.offset();
        var parentPos = $obj.parent().offset();
        return {
            top: childPos.top - parentPos.top,
            left: childPos.left - parentPos.left
        };
    }

    // change main image to the next one
    var updateImage = function(type) {
        var imageNumberRegex = /\/(\d+?)\.jpg$/i;

        // get the image object
        $image = $('.photo-type-' + type);
        imageOffset = getElementOffset($image);
        var currentImageSrc = $image.attr('src');
        
        // prepare the new image src
        var currentImageNumber = currentImageSrc.match(imageNumberRegex);
        if (currentImageNumber[1]) {
            currentImageNumber = parseInt(currentImageNumber[1]);
        }
        var newImageNumber = currentImageNumber < mainImages[type]['max'] ? 
            currentImageNumber + 1 : 1;
        var newImageSrc = currentImageSrc.replace(imageNumberRegex, '/' + newImageNumber + '.jpg');

        // prepare the new image object
        $newImage = $image.clone();
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

        $newImage.fadeIn('fast', function() {
            $image.remove();

            // make the new image back to "normal"
            $newImage.css({
                position: '',
                zIndex: '',
                left: '',
                top: '',
                width: '',
                height: ''
            });
        });
    };

    var updateImages = function() {
        var i = 1, 
            changeInterval = 800; // ms

        setTimeout(function() {
            updateImage('beauty');
        }, (i++) * changeInterval);
        setTimeout(function() {
            updateImage('jewelry');
        }, (i++) * changeInterval);

        setTimeout(function() {
            updateImage('all');
        }, (i++) * changeInterval);
        setTimeout(function() {
            updateImage('fashion');
        }, (i++) * changeInterval);
    }

    $(document).ready(function () {
        updateWhatsAppUrl();

        // images rotation
        setTimeout(function() {
            updateImages();
            setInterval(updateImages, 8000);
        }, 2000);
    });
})();