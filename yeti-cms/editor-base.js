(function () {
    /*global Messenger*/
    /*global ShadowDOM*/
    /*global Core*/
    /*global $*/
    
    var Yeti = window.Yeti = new Core();
    
    var blacklistedSelectors = '.yeti *, .yeti-ignore, .yeti-ignore *, #yetiContextMenu, #yetiContextMenu p, #yetiLeftMenu *, #yetiPalette *, .yeti-not-editable, .yeti-not-editable *, .instafeed *';
    Yeti.registerGlobal('blacklistedSelectors', blacklistedSelectors);
    
    /**
     * Base Editor Module
     */
    var editorModule = {
    
        /**
         * contextMenu is the element we're appending our element to
         */
        contextMenu: '.yeti-context-menu',
    
        /**
         * We require a debounce function to "clear" the menu between clicks
         */
        debounce: function () {
            var timestamp = +new Date;
            if (timestamp - (Yeti.get('previousTimeStamp') || 0) > 100) {
                $(this.contextMenu).html('');
                Yeti.set('previousTimeStamp', timestamp);
            }
        },
    
        /**
         * The initialize function binds the event, debounces events, and triggers the display of the context menu
         */
        bindModuleToContextMenu: function () {
    
            var self = this;
    
            // bind to a specific context for this instance of the editor
            $('body')
    
                // binding context for this specific module
                .find(this.selector)
    
                // filters out editor UI
                .not(blacklistedSelectors)
    
                // bind the function to the contextmenu event
                .on('contextmenu', function (event) {
    
                    event.preventDefault();
    
                    self.debounce();
    
                    if (self.selectorAction === "append") {
                        $(self.contextMenu).append(self.generateButton(this, self));
                    }
    
                    if (self.selectorAction === "prepend") {
                        $(self.contextMenu).prepend(self.generateButton(this, self));
                    }
    
                    self.displayContextMenu(event, self);
                });
    
        },
    
        /**
         * Based on event location, displayContextMenu calculates the new position of the context menu and displays it
         */
        displayContextMenu: function (event, self) {
    
            // Displays the context menu near the mouse pointer
            var xOffset = event.clientX;
            var yOffset = event.clientY;
    
            // Prevent context menu from being rendered too close to the right edge of the window
            if (xOffset > $(window).width() - 160)
                xOffset = parseInt($(window).width() - 160);
    
            // Prevent context menu from being rendered too close to the bottom edge of the window
            if (yOffset > $(window).height() - 50)
                yOffset = parseInt(yOffset - 50);
    
            $(self.contextMenu).css('top', yOffset + 'px');
            $(self.contextMenu).css('left', xOffset + 'px');
            $(self.contextMenu).show();
        },
    
        /**
         * Feature detection returns a boolean value which will enable or disable the current module
         */
        isModuleRequired: true,
    
        /**
         * The initialization hook is called each time the editor is created
         */
        initialization: function () {
            this.bindModuleToContextMenu();
        },
    
        /**
         * The teardown hook is called each time the editor is destroyed & should leave nothing behind,
         * Aiming to leave the DOM in a similar state as it was found
         */
        teardown: null,
    
        /**
         * selector we wish to bind our editor functionality to
         */
        selector: null,
    
        /**
         * Action to be applied once the contextmenu event is triggered (append or prepend)
         */
        selectorAction: 'append',
    
        /**
         * Event triggered to activate our intended editor functionality
         */
        event: 'mousedown',
    
        /**
         * HTML to append/prepend to the context menu
         */
        button: null,
    
        /**
         * Our intended functionality for the editor
         */
        action: null,
    
        /**
         * Binds our context menu button to trigger a specific action on a specific event
         */
        generateButton: function (that, self) {
            // Returns a button (to be appended to the context menu
            // Which performs an action on a specific event (usually mousedown or touchstart)
            // Passing the context (that) to the action as event.data.that
            return $(self.button(that)).off(self.event).on(self.event, { that: that }, self.action);
        }
    
    };
    
    /**
     * Register WPCE module
     */
    function registerModule (namespace, obj) {
        Yeti[namespace] = $.extend({}, Yeti.baseEditorModule, obj);
    
        if (!Yeti[namespace]) Yeti[namespace] = {};
    
        if (Yeti[namespace].isModuleRequired) {
            Yeti.initializationQueue.push(function () {
                Yeti[namespace].initialization();
            });
            Yeti.teardownQueue.push(function () {
                Yeti[namespace].teardown;
            });
        }
    }
    
    function executeInitializationQueue () {
        Yeti.executeFunctionArray(Yeti.initializationQueue);
    }
    
    function executeTeardownQueue () {
        Yeti.executeFunctionArray(Yeti.teardownQueue);
    }
    
    Yeti.registerGlobal('initializationQueue', []);
    Yeti.registerGlobal('teardownQueue', []);
    Yeti.registerGlobal('registerModule', registerModule);
    Yeti.registerGlobal('executeInitializationQueue', executeInitializationQueue);
    Yeti.registerGlobal('executeTeardownQueue', executeTeardownQueue);
    Yeti.registerGlobal('baseEditorModule', editorModule);
    
    Yeti.registerGlobal('getTagName', function (el) {
        var str = $(el).prop("tagName");
        if (!str) return ""; // Early return for null
        // Growing dictionary of tag names
        if (str.toLowerCase() === "a")
            str = "LINK";
        if (str.toLowerCase() === "i")
            str = "ICON";
        if (str.toLowerCase() === "p")
            str = "PARAGRAPH";
        if (str.toLowerCase() === "h1")
            str = "HEADLINE-1";
        if (str.toLowerCase() === "h2")
            str = "HEADLINE-2";
        if (str.toLowerCase() === "h3")
            str = "HEADLINE-3";
        if (str.toLowerCase() === "h4")
            str = "HEADLINE-4";
        if (str.toLowerCase() === "h5")
            str = "HEADLINE-5";
        if (str.toLowerCase() === "h6")
            str = "HEADLINE-6";
        return str;
    });
    
    Yeti.initializationQueue.push(function () {
    
        // Prepend the outline element to the <BODY>
        $('body').prepend('<style id="yetiOutline">.yeti-body-section *:hover, .nav-container *:hover, .footer-container *:hover { box-shadow: inset 0 0 1px rgba(0,0,0,0.65); }</style>');
        
        // Append the context menu to the <BODY>
        $('body').append('<div id="yetiContextMenu" class="yeti yetiRemoveWhenSaving cleanslate"><div class="yeti-context-menu"></div></div>');
    
        // "Close" the context menu when we don't need it
        $('*').mousedown(function (event) {
            if (event.which === 1) {
                $('.yeti-context-menu').hide();
                $('.yeti-context-menu').html('');
            }
        });
    
        // Utility Underlay
        $('body').append('<div class="yetiUnderlay yeti yetiRemoveWhenSaving"></div>');
    
        // Underlay action
        $('.yetiUnderlay').on('mousedown', function () {
            $('#yetiEditImageMenu, #yetiChangeIconMenu, #yetiChangeElegantIconMenu, .yetiUnderlay').hide();
            $('.uploadcare-dialog-close').click();
        });
    });
    
    Yeti.teardownQueue.push(function () {
        $('#yetiContextMenu, #yetiOutline').remove();
        $("*").off("contextmenu");
        $('.yeti-context-menu').hide();
        $('*').off('mousedown');
    });
    
    $(document).ready(function () {
        setTimeout(function () {
            // listen for ShadowDOM length and show publish button
            var DOMlength = ShadowDOM.shadowDOM.main.html().length;
        
            // Check for ShadowDOM updates on an interval (ShadowDOM Length test)
            setInterval(function () {
                if (Yeti.get('isLocked')) return;
                var newDOMLength = ShadowDOM.shadowDOM.main.html().length;
                // console.log(newDOMLength, DOMlength);
                if (newDOMLength === DOMlength) return;
                $('#yetiPublishButton').removeClass('yeti-hidden');
                DOMlength = newDOMLength;
            }, 500);
        }, 5000);
    });
        
})();
