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
    
        // JS Dependencies
        loadScript("//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js");
        loadScript("/yeti-cms/core.js");
        // loadScript("/yeti-cms/left-nav.js");
        loadScript('/yeti-cms/shadow-dom.js');
        loadScript('/yeti-cms/editor-base.js');
        loadScript('/yeti-cms/editor-ui.js');
        // loadScript('/yeti-cms/padlock.js');
        loadScript('/yeti-cms/content-editable.mod.js');
        
        
        
        
        
    }

})();
