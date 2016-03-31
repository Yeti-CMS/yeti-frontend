(function () {
    /*global Yeti*/
    /*global _$*/
    /*global $*/

    // Add .is-image-link to a[href]-s containing images
    $(document).ready(function () {
        $('a').each(function () {
            // Todo: consider adding additional image formats
            if (this.href && /\.(?:jpg|jpeg|png)$/i.test(this.href.toLowerCase()))
                $(this).addClass('is-image-link');
        });

    });

    /**
     * LINKED IMAGE EDITOR MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all a.is-image-link elements,
     * which edits or replaces the image in the DOM and shadow DOM.
     */
    Yeti.registerModule('imageLinkEditorModule', {
        selector: 'a.is-image-link',
        isModuleRequired: function () {
            return $('a.is-image-link').length > 0;
        },
        button: function (that) {
            var img = $(that).attr('href');

            var fqdn = Yeti.returnImageFQDN(img);

            if (img && !$('#yetiContextMenu a img[src="' + fqdn + '"]').length)
                return '<a class="yeti-context-menu-button"><i class="ion-images"></i>Edit Image<img src="' + fqdn + '"></a>';
        },
        action: function (event) {

            var that = event.data.that;
            var img = $(that).attr('href');

            Yeti.set('currentImageBeingEdited', Yeti.returnImageFQDN(img));
            Yeti.set('currentlyEditingImageID', that);
            Yeti.set('currentlyEditingImageType', "img");
            Yeti.set('currentImageEditCallback', null);

            Yeti.showEditImageDialog(img, function (newImage) {
                $(that).attr('href', newImage);
                // Update shadowDOM
                _$(that).attr('src', newImage);

                // Post update to collaborators
                var elID = $(that).attr('id');
                Yeti.collaborators.updateAttr('#' + elID, 'src', newImage);
            });

        }
    });
})();
