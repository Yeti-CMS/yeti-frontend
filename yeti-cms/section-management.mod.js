(function () {
    /*global ShadowDOM*/
    /*global Yeti*/
    /*global _$*/
    /*global $*/

    /**
     * Returns the best guess for a section owner.
     * (A section owner's children can be sorted, deleted, & cloned)
     */
    function findSectionOwner () {
        var body, bodySize, sectionOwnerID = 'body';
        var limit = 0.5; // Minimum limit. A node must contain this portion of the total page to qualify

        // Examine each DOM node
        function touchEverything (node) {
            if ((node.html().length / bodySize) > limit && node.children().length > 2)
                var tmp = node.attr('id');
            if (tmp) sectionOwnerID = '#' + tmp;
            node.children().each(function () {
                var that = $(this);
                if ((that.html().length / bodySize) > limit) touchEverything(that);
            });
        }

        body = $('body').clone();

        // Remove the stuff we know isn't important
        body.find('*').each(function () {
            if ($(this).is('script, header, footer, nav, #yetiUnlockBuilder, #yetiChangeIconMenu, .underlay'))
                $(this).remove();
        });

        bodySize = body.html().length;
        touchEverything(body);
        return sectionOwnerID;
    }

    Yeti.registerGlobal('removeByID', function (elID) {
        if (confirm('Are you sure you want to remove this section? This action cannot be undone.')) {
            $('#' + elID + ', #sortSections a[data-id=' + elID + ']').remove();
            _$($('#' + elID)).remove();
        }
    });

    // Yeti.registerGlobal('cleanupUI', function () {
    //     // Cleanup wpages UI components
    //     $('.yeti').each(function () {
    //         var tmp = $(this);
    //         tmp.detach();
    //         $('body').append(tmp);
    //     });

    //     // Reinitialize scripts
    //     $('script').each(function() {
    //         if ($(this).attr('src') && $(this).attr('src').indexOf('jquery.min.js') === -1) {
    //             var that = this;
    //             var oldSrc = $(this).attr('src');
    //             $(this).attr('src', '');
    //             setTimeout(function() {
    //                 $(that).attr('src', oldSrc + '?' + new Date);
    //             }, 250);
    //         }
    //     });

    //     // Cleanup template items with directive .cleanupReinsertToBottom
    //     $('.cleanupReinsertToBottom').each(function () {
    //         var tmp = $(this);
    //         tmp.detach();
    //         $('body').append(tmp);
    //         _$('body').append(tmp);
    //     });
    // });

    $(document).ready(function () {
        var sectionOwnerID = findSectionOwner();
        Yeti.set('sectionOwner', sectionOwnerID);

        // Mark the Section container
        $(sectionOwnerID).addClass('yeti-body-section-container');
        $(sectionOwnerID).children().not('script, .yeti, #yetiUnlockBuilder, #yetiChangeIconMenu, .yetiUnderlay, .yetiRemoveWhenSaving').addClass('yeti-body-section');
        // Todo: Make the section-specific menu do "something"
        // $('.yeti-body-section').append('<div class="cleanslate yeti-ism yeti"><div class="yeti-inline-section-menu yeti"> <a class="yeti yeti-inline-section-menu-button"> <i class="yeti ion-arrow-move"></i> </a> <a class="yeti yeti-inline-section-menu-button"> <i class="yeti ion-code"></i> </a> <a class="yeti yeti-inline-section-menu-button"> <i class="yeti ion-plus"></i> </a> <a class="yeti yeti-inline-section-menu-button yeti-bg-red"> <i class="yeti ion-trash-a"></i> </a> </div></div>')

        ShadowDOM.shadowDOM.main.find(sectionOwnerID).addClass('yeti-body-section-container');
        ShadowDOM.shadowDOM.main.find(sectionOwnerID).children().not('script, #yetiUnlockBuilder, #yetiChangeIconMenu, .yetiUnderlay, .yetiRemoveWhenSaving').addClass('yeti-body-section');
    });

    Yeti.initializationQueue.push(function () {

        $('#sortSections').html('');
        $('.yeti-body-section').each(function () {
            var that = this;
            $('#sortSections').append(function () {
                var curID = $(that).attr('id');
                // return $('<li class="yetiSortSection"> <a data-id="' + curID + '" href="#' + curID + '"> <b><i class="fa fa-list" aria-hidden="true"></i></b> '+curID+' <i class="fa fa-times-circle removeSection" onmousedown="Yeti.removeByID(\'' + curID + '\')"></i></a> </li>');
                return $('<a data-id="' + curID + '" href="#' + curID + '" class="yeti yeti-left-menu-button yeti-align-left"> <b class="ion-ios-drag"></b> <span class="yeti-text">' + curID + '</span> <i class="ion-ios-trash-outline yeti-float-right yeti-trash-icon" onmousedown="Yeti.removeByID(\'' + curID + '\')"></i> </a>');
            });
        });

        // Bind sortable to left menu
        $('#sortSections').sortable({
            items: 'a' ,
            forcePlaceholderSize: true,
            handle: 'b'
        }).bind('sortupdate', function () {
            // Detach and re-attach all of the things (in the updated order)
            $('#sortSections a').each(function () {
                var id = $(this).attr('data-id');
                // console.log(id);
                var tmp = $('#' + id);
                tmp.detach();

                // shadowDOM!
                var tmp2 = ShadowDOM.shadowDOM.main.find('#' + id);
                tmp2.detach();

                if ($('.yeti-body-section-container').length && ShadowDOM.shadowDOM.main.find('.yeti-body-section-container').length) {
                    $('.yeti-body-section-container').append(tmp);
                    ShadowDOM.shadowDOM.main.find('.yeti-body-section-container').append(tmp2);
                } else {
                    $('body').append(tmp);
                    ShadowDOM.shadowDOM.main.append(tmp2);
                }
            });

            //Yeti.cleanupUI();
        });

    });
    
    Yeti.teardownQueue.push(function () {
        $('#sortSections').html('');
    });

})();