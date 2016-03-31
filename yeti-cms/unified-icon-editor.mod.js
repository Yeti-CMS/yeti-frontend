(function () {
    
    var iconFontClassNames = [];
    
    String.prototype.toUnicode = function () {
        var result = "";
        for (var i = 0; i < this.length; i++)
            result += "\\u" + ("000" + this[i].charCodeAt(0).toString(16)).substr(-4);
        return result;
    };
    
    function findIconsOnPage () {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var el = document.styleSheets[i];
        
            if (el && el.rules) {
                for (var j = 0; j < el.rules.length; j++) {
                    var elm = el.rules[j];
                    var content = "";
                    if (elm && elm.style && elm.style.content)
                        content = elm.style.content;
                    if (content && content[0] === '"')
                        content = JSON.parse(content);
                    
                    var u = content.toUnicode();
                    var h = u.split('\\u').join('');
                    var k = parseInt(h, 16);
                    if (k > 10000) {
                        var selector = elm.selectorText;
                        if (selector.indexOf('::before') !== -1) {
                            var matches = selector.match(/\.[\w\-]*/g);
                            if (matches && matches.length === 1) {
                                var iconClassName = matches[0];
                                iconClassName = iconClassName.slice(1);
                                // console.log('icon found: ' + iconClassName);
                                iconFontClassNames.push(iconClassName); 
                            }                      
                        }
                    }
                }
            }
        }
        
        iconFontClassNames = iconFontClassNames.filter(function (value, index, self) { 
            return self.indexOf(value) === index;
        });
        
        // Remove .small, if it exists
        var smallIndex = iconFontClassNames.indexOf('small');
        if (smallIndex !== -1)
            iconFontClassNames.splice(smallIndex, 1);
        
        return iconFontClassNames;
    }

    function buildyetiChangeIconMenu () {
        var iconClasses = findIconsOnPage();
        for (var i = 0; i < iconClasses.length; i++) {
            $('#yetiChangeIconMenu').append(function () {
                var iconClass = iconClasses[i];
                if (!iconClass || iconClass.trim === '') return;
                var prefix = "";
                if (iconClass.indexOf('fa-') === 0) prefix = "fa ";
                if (iconClass.indexOf('icon-') === 0) prefix = "icon ";
                if (iconClass.indexOf('glyphicon-') === 0) prefix = "glyphicon ";
                return $('<i class="' + prefix + iconClasses[i] + '"></i>').off('mousedown').mousedown(function () {
                    var c = $(this).attr('class');
                    Yeti.changeIcon(c);
                    $('#yetiChangeIconMenu i').removeClass('selected');
                    $(this).addClass('selected');
                });
            });
        }
    }

    Yeti.registerGlobal('changeIcon', function (newClass) {
        var currentIconBeingEdited = Yeti.get('currentIconBeingEdited');
        var oldClasses = $(currentIconBeingEdited).attr('class').split(' ');
        
        var newClasses = oldClasses.filter(function(className) {
            return iconFontClassNames.indexOf(className) === -1;
        });
        
        newClasses = newClasses.join(' ');
        // console.log(newClasses);
        
        $(currentIconBeingEdited).attr('class', '');
        $(currentIconBeingEdited).addClass(newClass + " " + newClasses);
        
        // Update shadowDOM
        _$(currentIconBeingEdited).attr('class', '');
        _$(currentIconBeingEdited).addClass(newClass + " " + newClasses);
    });

    /**
     * EDIT ICON MODULE
     *
     * Appends a button (as defined) to the context menu, triggered for all i elements,
     * which switches between icons in the DOM and shadow DOM.
     */
    Yeti.registerModule('unifiedIconEditorModule', {
        selector: 'i, .fa, .glyphicon, .icon',
        selectorAction: 'prepend',
        button: function () {
                return '<a class="yeti-context-menu-button"><i class="ion-android-checkbox-outline-blank" style="padding-right:7px !important"></i>Choose Icon</a>';
        },
        action: function (event) {

            var that = event.data.that;

            Yeti.set('currentIconBeingEdited', that);
            $('#yetiChangeIconMenu, .yetiUnderlay').fadeIn('fast');

            // Make the original icon selected
            $('#yetiChangeIconMenu i').removeClass('selected');
            var currentClass = $(that).attr('class').slice(2).trim();
            $('#yetiChangeIconMenu i.' + currentClass).addClass('selected');

            // Update the shadowDOM with the contents of the DOM for this specific element
            _$(that).attr('class', $(that).attr('class'));

            // Post update to collaborators
            // var elID = $(that).attr('id');
            // Yeti.collaborators.updateAttr('#' + elID, 'class', $(that).attr('class'));

        }
    });

    Yeti.initializationQueue.push(function () {
        // Change icon modal
        $('body').append('<div class="yetiRemoveWhenSaving" id="yetiChangeIconMenu"><h2>Change Icon</h2></div>');
        buildyetiChangeIconMenu();
    });

    Yeti.teardownQueue.push(function () {
        $('#yetiChangeIconMenu').remove();
    });

})();