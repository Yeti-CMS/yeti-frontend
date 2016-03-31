(function () {

    Yeti.initializationQueue.push(function () {
        // Normal elements
        $('a, h1, h2, h3, h4, h5, h6, p, span, blockquote, li, small, .yeti-content-editable, yeti-inline')
            .not('.yeti *, #yetiContextMenu, #yetiContextMenu p, #yetiLeftMenu, #yetiLeftMenu *, .uploadcare-widget *')
            .each(function () {
                var thisToString = $(this).html() + "";
                if (thisToString[0] !== "<" || thisToString.slice(-1) !== ">") {
                    $(this).attr('contenteditable', 'true').off('focus').off('blur')
                        .bind('focus', function () {
                            Yeti.ceEdit(this);
                        })
                        .bind('blur', function () {
                            Yeti.ceUpdate(this);
                        });
                }
            });

        // Childless DIVs
        $('div').not('.yeti *, #yetiContextMenu, #yetiContextMenu *, #yetiLeftMenu, #yetiLeftMenu *, .uploadcare-widget *').each(function () {
             if ($(this).children().length === 0 && $(this).html()) {
                 $(this).attr('contenteditable', true).off('focus').off('blur').bind('focus', function () {
                     Yeti.ceEdit(this);
                 }).bind('blur', function () {
                     Yeti.ceUpdate(this);
                 });
             }
        });
    });

    /**
     * CONTENT EDITABLE::CREATE LINK MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all [contenteditable] elements,
     * which creates a link in the DOM and shadow DOM.
     */
    Yeti.registerModule('ceCreateLinkModule', {
        selector: '[contenteditable]',
        selectorAction: 'prepend',
        button: function () {
            if (!$('#yetiContextMenu [data-type=edit-link]').length && !$('#yetiContextMenu [data-type=create-link]').length)
                return '<a class="yeti-context-menu-button"><i class="ion-link" style="padding-right:7px !important"></i>Create Link</a>';
        },
        action: function (event) {

            var that = event.data.that;

            var link = prompt('Please specify the link.');
            if (link) document.execCommand('createLink', false, link);

            _$(that).html($(that).html());
        }
    });

    /**
     * CONTENT EDITABLE::STRIKE THROUGH MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all [contenteditable] elements,
     * which creates strike-through text in the DOM and shadow DOM.
     */
    Yeti.registerModule('ceStrikeThroughModule', {
        selector: '[contenteditable]',
        selectorAction: 'prepend',
        button: function () {
            if (!$('#yetiContextMenu [data-type=strike-through]').length)
                return '<a class="yeti-context-menu-button yeti-quarter-button"><span class="lnr lnr-strikethrough"></span></a>';
        },
        action: function (event) {

            var that = event.data.that;

            document.execCommand('strikeThrough', false, null);

            _$(that).html($(that).html());
        }
    });

    /**
     * CONTENT EDITABLE::UNDERLINE MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all [contenteditable] elements,
     * which creates underlined text in the DOM and shadow DOM.
     */
    Yeti.registerModule('ceUnderlineModule', {
        selector: '[contenteditable]',
        selectorAction: 'prepend',
        button: function () {
            if (!$('#yetiContextMenu [data-type=underline]').length)
                return '<a class="yeti-context-menu-button yeti-quarter-button"><span class="lnr lnr-underline"></span></a>';
        },
        action: function (event) {

            var that = event.data.that;

            document.execCommand('underline', false, null);

            _$(that).html($(that).html());
        }
    });

    /**
     * CONTENT EDITABLE::ITALICS MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all [contenteditable] elements,
     * which creates italic text in the DOM and shadow DOM.
     */
    Yeti.registerModule('ceItalicsModule', {
        selector: '[contenteditable]',
        selectorAction: 'prepend',
        button: function () {
            if (!$('#yetiContextMenu [data-type=italics]').length)
                return '<a class="yeti-context-menu-button yeti-quarter-button"><span class="lnr lnr-italic"></span></a>';
        },
        action: function (event) {

            var that = event.data.that;

            document.execCommand('italic', false, null);

            _$(that).html($(that).html());
        }
    });

    /**
     * CONTENT EDITABLE::BOLD MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all [contenteditable] elements,
     * which creates bold text in the DOM and shadow DOM.
     */
    Yeti.registerModule('ceBoldModule', {
        selector: '[contenteditable]',
        selectorAction: 'prepend',
        button: function () {
            if (!$('#yetiContextMenu [data-type=bold]').length)
                return '<a class="yeti-context-menu-button yeti-quarter-button"><span class="lnr lnr-bold"></span></a>';
        },
        action: function (event) {

            var that = event.data.that;

            document.execCommand('bold', false, null);

            _$(that).html($(that).html());
        }
    });

    // Register a global
    Yeti.registerGlobal('ceWatch', []);

    Yeti.registerGlobal('ceEdit', function (el) {
        var elHTML = $(el).html();
        Yeti.set('currentCEValue', elHTML);
    });

    Yeti.registerGlobal('ceUpdate', function (el) {
        var elID = $(el).attr('id');
        var elHTML = $(el).html();
        if (elHTML !== Yeti.get('currentCEValue')) {

            // Send TogetherJS update
            // Yeti.collaborators.updateHTML('#' + elID, elHTML);

            // Update shadowDOM
            _$('#' + elID).html($(el).html());
            
            // Add to watchlist
            if (Yeti.ceWatch.indexOf(elID) === -1)
                Yeti.ceWatch.push(elID);
        }
    });

    Yeti.teardownQueue.push(function () {
        $('[contenteditable=true]').attr('contenteditable', 'false');
    });

    // Watch Content Editables (heartbeat)
    setInterval(function () {
        for (var i = 0; i < Yeti.ceWatch.length; i++) {
            // Update shadowDOM for each element in the watchlist (Because, ctrl-z)
            _$('#' + Yeti.ceWatch[i]).html($('#' + Yeti.ceWatch[i]).html());
            // Save changes
            // if (Yeti.get('userID') && Yeti.get('pageToken') && !Yeti.get('isLocked'))
            //     Yeti.saveHTML();
        }
    }, 5000);

})();