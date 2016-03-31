(function () {
    /**
     * CLONE MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all applicable elements,
     * which removes the element from the DOM and shadow DOM.
     */
    Yeti.registerModule('cloneElementModule', {
        selector: 'li, .yeti-cloneable',
        button: function (that) {
            var tagName = Yeti.getTagName(that);
            return '<a class="yeti-context-menu-button"><i class="ion-ios-copy-outline" style="padding-right:7px !important"></i>Clone Element</a>';
        },
        action: function (event) {

            var that = event.data.that;

            var tmp = $(that).clone().attr('id', $(that).attr('id') + '-2');
            $(that).parent().append(tmp);
            Yeti.lockBuilder();
            Yeti.unlockBuilder();

            // Update shadowDOM
            var tmp2 = tmp.clone();
            _$(that).parent().append(tmp2);

        }
    });

})();