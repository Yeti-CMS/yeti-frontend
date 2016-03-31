(function () {
    /**
     * Handle includes
     */
    function HTMLIncludes () {
        $(document).ready(function () {
            $('[data-source-url]').each(function () {
                var sourceURL = $(this).attr('data-source-url');

                $(this).load(sourceURL, function () {

                    var _i = $('body').attr('data-id-offset') || 0;
                    // Ensure all elements have Ids (Otherwise we couldn't shadowDOM)
                    $('.wpce-include *').each(function () {
                        if (!$(this).attr('id') || $(this).attr('id') === "") {
                            $(this).attr('id', 'yeti-i-' + _i++);
                        }
                    });
                });
            });

            $('.wpce-include').each(function () {
                var sourceID = $(this).attr('id');
                ShadowDOM.shadowDOM[sourceID] = $(this).clone();
            });
        });
    }
    
    $(document).ready(function () {
        HTMLIncludes();
    });
})();