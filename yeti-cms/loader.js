var headContent = document.getElementsByTagName('head')[0].innerHTML;
var bodyContent = document.body;
var loaderName = "wsiteAsyncLoaderComplete";

(function () {
    
    function loadScriptAsync (resource) {
        var sNew = document.createElement("script");
        sNew.async = true;
        sNew.src = resource;
        var s0 = document.getElementsByTagName('script')[0];
        s0.parentNode.insertBefore(sNew, s0);
    }

    function loadScript (resource) {
        document.write('<script src="' + resource + '" class="wpceScript"></script>');
    }

    function loadStylesheet (resource) {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = resource;
        link.rev = "yeti";
        link.media = 'all';
        head.appendChild(link);
    }

    if (!window[loaderName] && !window.wsiteAsyncLoaderComplete) {
        
        // document.write("<script>window.wsiteAsyncLoaderComplete = true;</script>");
        
        window[loaderName] = true;
        
        loadStylesheet("/yeti-cms/yeti-cms.css");
        loadStylesheet("https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css");
        loadStylesheet("https://fonts.googleapis.com/css?family=Lato:400,300,700");
        loadStylesheet("https://cdn.linearicons.com/free/1.0.0/icon-font.min.css");
        loadStylesheet("https://cdnjs.cloudflare.com/ajax/libs/dragula/3.6.6/dragula.min.css");
        loadStylesheet("/yeti-cms/vex.css");
        loadStylesheet("/yeti-cms/vex-theme-default.css");
        loadStylesheet("https://cdnjs.cloudflare.com/ajax/libs/messenger/1.4.0/css/messenger.css");
        loadStylesheet("https://cdnjs.cloudflare.com/ajax/libs/messenger/1.4.0/css/messenger-theme-air.css");
        loadStylesheet("//wsite.io/assets/minimalist-basic/content.css");
        
        document.write('<script class="yeti-script">var UPLOADCARE_LOCALE = "en", UPLOADCARE_AUTOSTORE = true, UPLOADCARE_PUBLIC_KEY = "b6170b92061c78b01560";</script>');
    
        // JS Dependencies
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js");
        loadScript("/yeti-cms/triple-click.js");
        
        loadScript("/yeti-cms/vex.combined.min.js");
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/messenger/1.4.0/js/messenger.min.js");
        loadScript("https://ucarecdn.com/widget/1.5.5/uploadcare/uploadcare.full.min.js");
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/html5sortable/0.1.8/html.sortable.js");
        loadScript("https://cdn.jsdelivr.net/lodash/3.5.0/lodash.compat.min.js");
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/dragula/3.6.6/dragula.min.js");
        
        document.write("<script class='yeti-script'>vex.defaultOptions.className = 'vex-theme-default'; Messenger.options = { extraClasses: 'messenger-fixed messenger-on-top messenger-on-right', theme: 'air'};</script>");
        
        loadScript("/yeti-cms/core.js");
        loadScript("/yeti-cms/prepare-dom.js");
        loadScript("/yeti-cms/html-includes.js");
        loadScript('/yeti-cms/shadow-dom.js');
        loadScript('/yeti-cms/editor-base.js');
        loadScript('/yeti-cms/editor-ui.js');
        
        loadScript('/yeti-cms/content-editable.mod.js');
        loadScript('/yeti-cms/section-management.mod.js');
        loadScript('/yeti-cms/add-section.mod.js');
        loadScript('/yeti-cms/site-data.mod.js');
        loadScript('/yeti-cms/link-editor.mod.js');
        loadScript('/yeti-cms/section-link-editor.mod.js');
        loadScript('/yeti-cms/image-editor.mod.js');
        loadScript('/yeti-cms/masked-image-editor.mod.js');
        loadScript('/yeti-cms/image-link-editor.mod.js');
        loadScript('/yeti-cms/parallax-image-editor.mod.js');
        loadScript('/yeti-cms/unified-icon-editor.mod.js');
        
        loadScript("/yeti-cms/clone-element.mod.js");
        loadScript("/yeti-cms/remove-element.mod.js");
        
        
        // SiteData
        loadScript("//" + window.location.host + "/sites/" + siteName + "/sitedata.js");
        
        
        
    }

})();
