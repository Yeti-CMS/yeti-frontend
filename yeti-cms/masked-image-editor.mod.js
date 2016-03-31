(function () {
    /*global Yeti*/
    /*global _$*/
    /*global $*/
    
    /**
     * EDIT MASKED IMAGE MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all figure & .image-mask elements,
     * which edits the child image in the DOM and shadow DOM.
     */
    Yeti.registerModule('editMaskedImageModule', {
        selector: 'figure, .image-mask',
        isModuleRequired: function () {
            return $('figure img, .image-mask img').length > 0;
        },
        button: function (that) {
            var img = $(that).find('img').attr('src');

            var fqdn = Yeti.returnImageFQDN(img);

            if (img && !$('#yetiContextMenu a img[src="' + fqdn + '"]').length)
                return '<a class="yeti-context-menu-button"><i class="ion-images"></i>Edit Image<img src="' + fqdn + '"></a>';
        },
        action: function (event) {

            var that = event.data.that;
            var img = $(that).find('img').attr('src');

            Yeti.set('currentImageBeingEdited', Yeti.returnImageFQDN(img));
            Yeti.set('currentlyEditingImageID', that);
            Yeti.set('currentlyEditingImageType', "img");
            Yeti.set('currentImageEditCallback', null);

            Yeti.showEditImageDialog(img, function (newImage) {
                $(that).find('img').attr('src', newImage);
                // Update shadowDOM
                _$(that).find('img').attr('src', newImage);

                // Post update to collaborators
                var elID = $(that).find('img').attr('id');
                Yeti.collaborators.updateAttr('#' + elID, 'src', newImage);
            });

        }
    });
    
})();
