(function () {

    Yeti.initializationQueue.push(function () {
        // Add a class for all elements with a css background image
        $('*').filter(function () {
            if (this.currentStyle)
                return this.currentStyle['backgroundImage'] !== 'none';
            else if (window.getComputedStyle)
                return document.defaultView.getComputedStyle(this, null).getPropertyValue('background-image') !== 'none';
        }).addClass('bg-found');

        /**
         * BeeGee's my child...
         */
        $('* > .bg-found').each(function () {
            $(this).parent().addClass('bg-my-child');
        });

        /**
         * Img's my child...
         */
        $('* > img').each(function () {
            $(this).parent().addClass('img-my-child');
        });

        /**
         * Img's my grand-child...
         */
        $('* > * > img').each(function () {
            $(this).parent().parent().addClass('img-my-grand-child');
        });
    });

    function uploadCareInit () {
        uploadcare.registerTab('favorites', function (container, button, dialogApi, settings) {
            container.append('<div id="yetiUCFavoritesTab"></div>');
            button.html('<i class="fa fa-th ucButton"></i>');
            var ucFavs = $('#yetiUCFavoritesTab');
            $.each(settings.favoriteFiles, function (i, uuid) {
                ucFavs.append($('<img>', {
                    class: 'yetiFavorite-files-image',
                    src: settings.cdnBase + '/' + uuid + '/-/scale_crop/280x280/center/'
                })).on('click', function (e) {
                    dialogApi.addFiles([uploadcare.fileFrom('uploaded', uuid, settings)]);
                });
            });
        });

        uploadcare.registerTab('editor', function (container, button, dialogApi, settings) {
            container.append('<div id="yetiPixlrEditorTab" style="height:100%"></div>');
            button.html('<i class="fa fa-pencil ucButton"></i>');
            var pixlrTab = $('#yetiPixlrEditorTab');
            var url = window.location.host;
            var currentlyEditingImageID = $(Yeti.get('currentlyEditingImageID')).attr('id');
            var currentlyEditingImageType = Yeti.get('currentlyEditingImageType');
            var currentImageBeingEdited = Yeti.get('currentImageBeingEdited');

            pixlrTab.append('<iframe id="pixlrExpress" src="http://apps.pixlr.com/express/?image=' +
            currentImageBeingEdited +
            '&target=http://' +
            url +
            '/wpages/" ' +
            'style="width:100%;height:100%" ' +
            'onload="Yeti.pixlrImageCallback(document.getElementById(\'pixlrExpress\').contentWindow.location.href, ' +
            '\'#' + currentlyEditingImageID + '\', \'' + currentlyEditingImageType +
            '\');console.log(' + currentlyEditingImageID + ')"></iframe>');
        });

        // Fix for uploadcare widget button
        setTimeout(function () {
            $('div.uploadcare-widget').addClass('yeti').css('display', 'none');
        }, 1400);
    }

    uploadCareInit();

    Yeti.registerGlobal('pixlrImageCallback', function (returnURL, selector, type) {
        var newImage = returnURL.split('?image=')[1].split('&')[0];

        console.log(returnURL, newImage, type, selector);

        selector = selector.trim();

        var callback = Yeti.get('currentImageEditCallback');

        if (callback && typeof(callback) === "function") {
            callback(newImage);
        } else if (type === "background") {
            $(selector).css('background-image', 'url(' + newImage + ')');
            // Update shadowDOM
            _$(selector).css('background-image', 'url(' + newImage + ')');
        } else if (type === "img") {
            $(selector).attr('src', newImage);
            // Update shadowDOM
            _$(selector).attr('src', newImage);
        }

    });

    Yeti.registerGlobal('returnImageFQDN', function (url) {
        $('body').append('<img id="tmpIMG" src="'+url+'">');
        var fqdn = $('#tmpIMG').prop('src');
        $('#tmpIMG').remove();
        return fqdn;
    });

    Yeti.registerGlobal('showEditImageDialog', function (image, callback) {
        uploadcare.openDialog(null, {
            tabs: 'file editor favorites camera url facebook gdrive dropbox instagram evernote flickr skydrive box vk',
            crop: Yeti.getCropRatio(image),
            imagesOnly: true,
            favoriteFiles: [ '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540', '10781b8f-3536-46ea-a7a0-d7070c189540' ]
        }).done(function (file) {
            file.promise().done(function (fileInfo) {
                // Perform callback to replace image
                callback(fileInfo.cdnUrl);
                $('#yetiEditImageMenu, .yetiUnderlay').hide();
            });
        });
    });

    Yeti.registerGlobal('getCropRatio', function (imageURL) {
        var image = new Image();
        image.src = imageURL;
        return image.naturalWidth + "x" + image.naturalHeight;
    });

    /**
     * EDIT BACKGROUND IMAGE MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all elements with a background image,
     * which allows users to edit the image in the DOM and shadow DOM.
     */
    Yeti.registerModule('backgroundImageModule', {
        selector: '.bg-found',
        button: function (that) {
            var tmp = $(that).css('background-image');
            tmp = /^url\((['"]?)(.*)\1\)$/.exec(tmp);
            tmp = tmp ? tmp[2] : "";

            var fqdn = Yeti.returnImageFQDN(tmp);

            if (!$('#yetiContextMenu a img[src="' + fqdn + '"]').length)
                return '<a class="yeti-context-menu-button"><i class="ion-images"></i>Edit Image<img src="' + fqdn + '"></a>';
        },
        action: function (event) {

            var that = event.data.that;

            var tmp = $(that).css('background-image');
            tmp = /^url\((['"]?)(.*)\1\)$/.exec(tmp);
            tmp = tmp ? tmp[2] : "";

            Yeti.set('currentImageBeingEdited', Yeti.returnImageFQDN(tmp));

            Yeti.set('currentlyEditingImageID', that);
            Yeti.set('currentlyEditingImageType', "background");
            Yeti.set('currentImageEditCallback', null);

            Yeti.showEditImageDialog(tmp, function (newImage) {
                $(that).css('background-image', 'url(' + newImage + ')');
                // Update shadowDOM
                _$(that).css('background-image', 'url(' + newImage + ')');
                // Post update to collaborators
                var elID = $(that).attr('id');
                Yeti.collaborators.updateCSS('#' + elID, 'background-image', 'url(' + newImage + ')');
            });

        }
    });

    /**
     * EDIT CHILD BACKGROUND IMAGE MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all elements whose child has a background image,
     * which allows users to edit the image in the DOM and shadow DOM.
     */
    Yeti.registerModule('bgMyChildModule', {
        selector: '.bg-my-child',
        button: function (that) {
            var tmp = $(that).find('.bg-found').css('background-image');
            tmp = /^url\((['"]?)(.*)\1\)$/.exec(tmp);
            tmp = tmp ? tmp[2] : "";

            var fqdn = Yeti.returnImageFQDN(tmp);

            if (!$('#yetiContextMenu a img[src="' + fqdn + '"]').length)
                return '<a class="yeti-context-menu-button"><i class="ion-images"></i>Edit Image<img src="' + fqdn + '"></a>';
        },
        action: function (event) {

            var that = event.data.that;

            var tmp = $(that).find('.bg-found').css('background-image');
            tmp = /^url\((['"]?)(.*)\1\)$/.exec(tmp);
            tmp = tmp ? tmp[2] : "";

            Yeti.set('currentImageBeingEdited', Yeti.returnImageFQDN(tmp));

            Yeti.set('currentlyEditingImageID', that);
            Yeti.set('currentlyEditingImageType', "background");
            Yeti.set('currentImageEditCallback', null);

            Yeti.showEditImageDialog(tmp, function (newImage) {
                $(that).find('.bg-found').css('background-image', 'url(' + newImage + ')');
                // Update shadowDOM
                _$(that).find('.bg-found').css('background-image', 'url(' + newImage + ')');
                // Post update to collaborators
                var elID = $(that).find('.bg-found').attr('id');
                Yeti.collaborators.updateCSS('#' + elID, 'background-image', 'url(' + newImage + ')');
            });

        }
    });

    /**
     * EDIT CHILD IMAGE MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all elements whose child has an image,
     * which allows users to edit the image in the DOM and shadow DOM.
     */
    Yeti.registerModule('imgMyChildModule', {
        selector: '.img-my-child',
        button: function (that) {
            var tmp = $(that).find('img').attr('src');

            var fqdn = Yeti.returnImageFQDN(tmp);

            if (!$('#yetiContextMenu a img[src="' + fqdn + '"]').length)
                return '<a class="yeti-context-menu-button"><i class="ion-images"></i>Edit Image<img src="' + fqdn + '"></a>';
        },
        action: function (event) {

            var that = event.data.that;

            var tmp = $(that).find('img').attr('src');

            Yeti.set('currentImageBeingEdited', Yeti.returnImageFQDN(tmp));

            Yeti.set('currentlyEditingImageID', that);
            Yeti.set('currentlyEditingImageType', "img");
            Yeti.set('currentImageEditCallback', null);

            Yeti.showEditImageDialog(tmp, function (newImage) {
                $(that).find('img').attr('src', newImage);
                // Update shadowDOM
                _$(that).find('img').attr('src', newImage);
                // Post update to collaborators
                var elID = $(that).find('img').attr('id');
                Yeti.collaborators.updateAttr('#' + elID, newImage);
            });

        }
    });

    /**
     * EDIT GRAND-CHILD IMAGE MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all elements whose grand-child has an image,
     * which allows users to edit the image in the DOM and shadow DOM.
     */
    Yeti.registerModule('imgMyGrandChildModule', {
        selector: '.img-my-grand-child',
        button: function (that) {
            var tmp = $(that).find('img').attr('src');

            var fqdn = Yeti.returnImageFQDN(tmp);

            if (!$('#yetiContextMenu a img[src="' + fqdn + '"]').length)
                return '<a class="yeti-context-menu-button"><i class="ion-images"></i>Edit Image<img src="' + fqdn + '"></a>';
        },
        action: function (event) {

            var that = event.data.that;

            var tmp = $(that).find('img').attr('src');

            Yeti.set('currentImageBeingEdited', Yeti.returnImageFQDN(tmp));

            Yeti.set('currentlyEditingImageID', that);
            Yeti.set('currentlyEditingImageType', "img");
            Yeti.set('currentImageEditCallback', null);

            Yeti.showEditImageDialog(tmp, function (newImage) {
                $(that).find('img').attr('src', newImage);
                // Update shadowDOM
                _$(that).find('img').attr('src', newImage);
                // Post update to collaborators
                var elID = $(that).find('img').attr('id');
                Yeti.collaborators.updateAttr('#' + elID, newImage);
            });

        }
    });

    /**
     * EDIT IMAGE MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all image elements,
     * which allows users to edit the image in the DOM and shadow DOM.
     */
    Yeti.registerModule('editImageModule', {
        selector: 'img',
        button: function (that) {
            var tmp = $(that).attr('src');

            var fqdn = Yeti.returnImageFQDN(tmp);

            if (!$('#yetiContextMenu a img[src="' + fqdn + '"]').length)
                return '<a class="yeti-context-menu-button"><i class="ion-images"></i>Edit Image<img src="' + fqdn + '"></a>';
        },
        action: function (event) {

            var that = event.data.that;

            var tmp = $(that).attr('src');

            Yeti.set('currentImageBeingEdited', Yeti.returnImageFQDN(tmp));
            Yeti.set('currentlyEditingImageID', that);
            Yeti.set('currentlyEditingImageType', "img");
            Yeti.set('currentImageEditCallback', null);

            Yeti.showEditImageDialog(tmp, function (newImage) {
                $(that).attr('src', newImage);
                // Update shadowDOM
                _$(that).attr('src', newImage);
                // Post update to collaborators
                var elID = $(that).attr('id');
                Yeti.collaborators.updateAttr('#' + elID, 'src', newImage);
            });

        }
    });

})();