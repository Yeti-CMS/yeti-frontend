(function () {
    /**
     * Link Editor Module
     */
    Yeti.registerModule('linkEditorModule', {
        selector: 'a',
        button: function () {
            $('#yetiContextMenu .create-link').remove();
            return '<a class="yeti-context-menu-button"><i class="ion-link" style="padding-right:7px !important"></i>Edit Link</a>';
        },
        action: function (event) {

            var that = event.data.that;

            var previousLink = $(that).attr('data-link');

            // Prompt the user to edit the link
            var link = prompt('Please specify the link.', previousLink);

            // If the user returns a new link to us, update the DOM and shadow DOM
            if (link && link !== previousLink) {
                // DOM
                $(that).attr('data-link', link);
                // shadow DOM
                _$(that).attr('href', link);
                // Post update to collaborators
                var elID = $(that).attr('id');
                Yeti.collaborators.updateAttr('#' + elID, 'href', link);
            }
        }
    });

    Yeti.initializationQueue.push(function () {
        // Remove HREFs from links
        $('a:not("#yetiLeftMenu *")').each(function () {
            $(this).attr('data-link', $(this).attr('href'));
        });
    });

    Yeti.teardownQueue.push(function () {
        // Restore HREFs from [data-link]
        $('a').each(function () {
            $(this).removeAttr('data-link');
        });
    });

    $(document).ready(function () {
        $('a:not("#yetiLeftMenu *")').click(function (e) {
            if (!Yeti.get('isLocked'))
                e.preventDefault();
        });
    });

})();