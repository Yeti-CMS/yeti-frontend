(function () {
    /**
     * REMOVE MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all applicable elements,
     * which removes the element from the DOM and shadow DOM.
     */
    Yeti.registerModule('removeElementModule', {
        selector: 'li, .wpce-removable',
        button: function (that) {
            var tagName = Yeti.getTagName(that);
            return '<a class="yeti-context-menu-button"><i class="ion-backspace" style="padding-right:7px !important"></i>Remove</a>';
        },
        action: function (event) {
            var that = event.data.that;
            $(that).remove();
            _$(that).remove();
            // Post update to collaborators
            var elID = $(that).attr('id');
            Yeti.collaborators.removeElement('#' + elID);
        }
    });
})();