(function () {
    /*global Yeti*/
    /*global $*/
    
    $(document).ready(function () {
       $('body').append('<div id="yeti-left-nav" class="cleanslate yeti-hidden yeti"> <div class="yeti yeti-left-nav"> <div class="yeti-left-left"> <a class="yeti yeti-left-menu-button yeti-open-sections-list-button yeti-hidden"> <i class="ion-ios-copy-outline"></i> </a> <a class="yeti yeti-left-menu-button yeti-open-add-section-button yeti-hidden"> <i class="ion-ios-plus-empty"></i> </a> <div class="yeti-align-button-bottom"> <a class="yeti yeti-left-menu-button yeti-unlock-button"> <i class="ion-ios-locked-outline"></i> </a> </div> </div> <div class="yeti-left-two yeti-one"> <div class="yeti-left-title"> MANAGE SECTIONS </div><div id="sortSections"></div> </div> <div class="yeti-left-two yeti-two"> <div class="yeti-left-title"> ADD A SECTION </div> <div id="yeti-add-section"></div> </div> </div> </div>'); 
    
        $('.yeti-open-sections-list-button').on('mouseenter', function () {
            $('.yeti-left-two').animate({ scrollTop: 0 }, 1);
            $('.yeti-open-sections-list-button, .yeti-open-add-section-button').removeClass('yeti-active');
            $('.yeti-left-two').removeClass('yeti-open');
            $(this).addClass('yeti-active');
            $('.yeti-left-two.yeti-one').addClass('yeti-open');
          });
          
          $('.yeti-open-add-section-button').on('mouseenter', function () {
            $('.yeti-left-two').animate({ scrollTop: 0 }, 1);
            $('.yeti-open-sections-list-button, .yeti-open-add-section-button').removeClass('yeti-active');
            $('.yeti-left-two').removeClass('yeti-open');
            $(this).addClass('yeti-active');
            $('.yeti-left-two.yeti-two').addClass('yeti-open');
          });
          
          $('.yeti-left-two').on('mouseleave', function () {
            $('.yeti-open-sections-list-button, .yeti-open-add-section-button').removeClass('yeti-active');
            $('.yeti-left-two').removeClass('yeti-open');
          });
        
        $('.yeti-unlock-button').on('click', function () {
            Yeti.toggleEditorLock();
        });
        
        // Automatically unlock the editor if specific query params are present
        if (window.location.search.indexOf('yedit') !== -1 && window.location.search.indexOf('editing=true') !== -1) {
            setTimeout(function () {
                Yeti.unlockEditor();
            }, 700);
        }
        
        if (window.location.search.indexOf('yedit') !== -1) $('#yeti-left-nav').removeClass('yeti-hidden');
        
        $('body').off('tripleclick').on('tripleclick', function () {
            if (Yeti.get('isLocked')) Yeti.unlockEditor();
        });
        
        $('body').append('<div id="yetiUnderlay" class="underlay"></div>');
        
        // Underlay action
        $('.yetiUnderlay').mousedown(function () {
            $('#yetiEditImageMenu, #yetiChangeIconMenu, #yetiChangeElegantIconMenu, .yetiUnderlay').hide();
            $('.uploadcare-dialog-close').click();
        });
        
        $('body').append('<div id="yetiPublishButton" class="yeti cleanslate yeti-hidden yeti-position-bottom-right"><a class="yeti yeti-button" onclick="Yeti.saveHTML()">Publish Changes</a></div>');
    });
    
    Yeti.set('isLocked', true);
    
    Yeti.registerGlobal('unlockEditor', function () {
        $('#yeti-left-nav').removeClass('yeti-hidden');
        $('.yeti-open-sections-list-button, .yeti-open-add-section-button').removeClass('yeti-hidden');
        // Modify window.location.search
            var search = window.location.search;
    
            if (search.indexOf("yedit") === -1 || search.indexOf("editing=true") === -1) {
                if (search.indexOf('?') === -1) {
                    search = "?";
                } else if (search.length > 1 && search.indexOf("editing") === -1) {
                    search += "&";
                }
    
                if (search.indexOf('yedit') === -1)
                    search += "yedit";
    
                if (search.indexOf('editing') === -1) {
                    search += "&editing=true";
                } else if (search.indexOf('editing=false') !== -1) {
                    search = search.replace('editing=false', 'editing=true');
                }
                
                var locationPathName = window.location.pathname;
    
                window.history.replaceState('editing', 'editing', locationPathName + search);
            }
        
        $('.yeti-unlock-button i').toggleClass('ion-ios-locked-outline, ion-ios-unlocked-outline');
        Yeti.executeInitializationQueue();
        Yeti.set('isLocked', false);
    });
    
    Yeti.registerGlobal('lockEditor', function () {
        $('.yeti-open-sections-list-button, .yeti-open-add-section-button').addClass('yeti-hidden');
        // Modify window.location.search
            var search = window.location.search;
    
            if (search.indexOf("yedit") !== -1 || search.indexOf("editing=true") !== -1) {
                search = search.replace('editing=true', 'editing=false');
                var locationPathName = window.location.pathname;
                window.history.replaceState('yediting', 'yediting', locationPathName + search);
            }
            
        $('.yeti-unlock-button i').toggleClass('ion-ios-locked-outline, ion-ios-unlocked-outline');
        Yeti.executeTeardownQueue();
        Yeti.set('isLocked', true);
    });
    
    Yeti.registerGlobal('toggleEditorLock', function () {
        if (Yeti.get('isLocked')) {
            Yeti.unlockEditor();
        } else {
            Yeti.lockEditor();
        }
    });

})();