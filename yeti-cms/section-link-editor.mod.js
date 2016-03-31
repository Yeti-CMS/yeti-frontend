(function () {
    /*global Yeti*/
    /*global vex*/
    /*global _$*/
    /*global $*/

    $(document).ready(function () {
        $("a[href^='#']").each(function () {
            $(this).addClass('yeti-section-link');
        });
    });

    /**
     * SECTION LINK EDITOR MODULE
     */
    Yeti.registerModule('sectionLinkEditorModule', {
        selector: 'a.yeti-section-link',
        button: function () {
            return '<a data-type="edit-section-link" class="yeti-context-menu-button"><i class="ion-link" style="padding-right:7px !important"></i>Link to Section</a>';
        },
        action: function (event) {

            var that = event.data.that;

            var previousLink = $(that).attr('data-link');

            var newLink;

            var inputs = '<select name="selector">';
            // Construct select options
            $('#sortSections > a').each(function () {
                var selector = $(this).attr('data-id');
                var selected = '#' + selector === previousLink ? 'selected' : '';
                inputs += '<option value="#' + selector + '" ' + selected + '>' + selector + '</option>';
            });
            inputs += '</select>';

            vex.dialog.open({
                message: 'Choose a section to link to:',
                input: inputs,
                buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {
                        text: 'Select'
                    }), $.extend({}, vex.dialog.buttons.NO, {
                        text: 'Cancel'
                    })
                ],
                callback: function(data) {
                    if (data === false)
                        return console.log('Cancelled');
                    newLink = data.selector;
                    // If the user returns a new link to us, update the DOM and shadow DOM
                    if (newLink && newLink !== previousLink) {
                        $(that).attr('data-link', newLink); // DOM
                        $(that).attr('href', newLink); // DOM
                        // shadow DOM
                        _$(that).attr('href', newLink);

                        // Post update to collaborators
                        var elID = $(that).attr('id');
                        Yeti.collaborators.updateAttr('#' + elID, 'href', newLink);
                    }
                    return console.log('Selector', data.selector);
                }
            });
        }
    });
    
})();
