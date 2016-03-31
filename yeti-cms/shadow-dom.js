(function () {
    /*global Core*/
    /*global _$*/
    /*global $*/
    
    var ShadowDOM = window.ShadowDOM = new Core();
    
    if (!$) return;
    
    var blacklistedItems = '.wpceRemoveWhenSaving, #wpceUnlockBuilder, .wpceUnderlay, #wpceEditImageMenu, #wpceChangeIconMenu';
    var idPrefix = "yeti-"
    
    /**
     * Find highest data-id-offset
     */
    function findDataIDOffset (callback) {
        var total = 0;
        for (var i = 0; i < 1000; i++) {
            if ($('#'+idPrefix+i).length === 0)
                total++;

            if (total === 5) {
                ShadowDOM.set('idOffset', i);
                $('body').attr('data-id-offset', i);
                callback(i);
                return true;
            }
        }
    }

    /**
     * Ensure all elements have IDs (Otherwise we couldn't shadowDOM)
     */
    function assignIDsToElements (offset) {
        var i = $('body').attr('data-id-offset') || 0;
        $('body *').each(function () {
            if (!$(this).attr('id') || $(this).attr('id') === "") {
                $(this).attr('id', idPrefix + i++);
                $('body').attr('data-id-offset', i);
            }
        });
    }
    
    /**
     * Save the “Shadow DOM” to the ‘Main’ namespace
     */
    function saveShadowDOM () {
        ShadowDOM.registerGlobal('shadowDOM', {});
        if (typeof($) !== "function") return;
        
        // Copy the normal DOM to the “Shadow DOM”
        ShadowDOM.shadowDOM.main = $('body').clone();
        $(ShadowDOM.shadowDOM.main).find(blacklistedItems).remove();
        
        // Zero-out / null any includes
        ShadowDOM.shadowDOM.main.find('.yeti-include').each(function () {
            $(this).html('');
        });
    }
    
    /**
     * jQuery setup
     */
    // If we have jQuery but it's not attached to $, prevent the rest of our code from being sad.
    if (!$ && window.jQuery) $ = window.jQuery;
    
    /**
     * Manipulate the shadowDOM like it was normalDOM with jQuery
     */
    var _$ = window._$ = function (el, context) {
        var ids = [];
    
        context = context || 'main';
    
        // Also needs to work if you pass a selector to it
        if (typeof(el) === "string")
            el = $(el);
    
        $(el).each(function () {
            var id = $(this).attr('id');
            ids.push('#' + id);
        });
    
        var qs = ids.join(', ');
    
        return ShadowDOM.shadowDOM[context].find(qs);
    }
    
    // Export to global methods
    ShadowDOM.registerGlobal('findDataIDOffset', findDataIDOffset);
    ShadowDOM.registerGlobal('assignIDsToElements', assignIDsToElements);
    ShadowDOM.registerGlobal('saveShadowDOM', saveShadowDOM);
    
    // Initialization
    $(document).ready(function () {
        findDataIDOffset(assignIDsToElements);
        saveShadowDOM();
        
        // Check to ensure the shadowDOM & current document have the same length
        if ($(ShadowDOM.shadowDOM.main).html().length !== $('body').html().length)
            console.log('Error: shadowDOM length does not match document length.');
    });
    
})();
