(function () {
    /**
     * PARALLAX BACKGROUND IMAGE MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all .background-image-holder img.background-image elements,
     * which edits the child image in the DOM and shadow DOM.
     */
    Yeti.registerModule('editParallaxImgModule', {
        selector: '.background-image-holder + div.hover-state',
        isModuleRequired: true,
        button: function (that) {
            var img = $(that).parent().find('img.background-image').attr('src');

            var fqdn = Yeti.returnImageFQDN(img);

            if (img && !$('#yetiContextMenu a img[src="' + fqdn + '"]').length)
                return '<a class="yeti-context-menu-button"><i class="ion-images"></i>Edit Image<img src="' + fqdn + '"></a>';
        },
        action: function (event) {

            var that = event.data.that;
            var img = $(that).parent().find('img.background-image').attr('src');

            function currentImageEditCallback (newImage) {
                $(that).parent().find('img.background-image').attr('src', newImage);
                // Also update background: url()
                $(that).parent().find('.background-image-holder').css('background', 'url(' + newImage + ')');

                // Update shadowDOM
                _$(that).parent().find('img.background-image').attr('src', newImage);

                // Post update to collaborators
                var elID = $(that).parent().find('img.background-image').attr('id');
                Yeti.collaborators.updateAttr('#' + elID, 'src', newImage);
            }

            Yeti.set('currentImageEditCallback', currentImageEditCallback);
            Yeti.set('currentImageBeingEdited', Yeti.returnImageFQDN(img));
            Yeti.set('currentlyEditingImageID', that);
            Yeti.set('currentlyEditingImageType', "img");

            Yeti.showEditImageDialog(img, currentImageEditCallback);

        }
    });

})();