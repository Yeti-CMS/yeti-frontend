(function () {
    /*global $*/
    
    $(document).ready(function () {
        function wrapOrphanTextNodes () {
            // var validElementNames = ['YETI-INLINE', 'A', 'DIV', 'P', 'SPAN', 'SCRIPT', 'STYLE', 'STRONG', 'EM', 'SMALL', 'LABEL', 'OPTION'];
            // validElementNames.indexOf(this.parentElement.nodeName)
            
            $('body').not('.yeti').find('*').not('iframe').contents().filter(function () {
                    return this.nodeType === 3 && 
                    $.trim(this.nodeValue) !== '' && 
                    this.parentElement.nodeName !== "WPCE-INLINE" && 
                    this.parentElement.nodeName !== "A" && 
                    this.parentElement.nodeName !== "DIV" && 
                    this.parentElement.nodeName !== "P" && 
                    this.parentElement.nodeName !== "SPAN" && 
                    this.parentElement.nodeName !== "SCRIPT" && 
                    this.parentElement.nodeName !== "STYLE" && 
                    this.parentElement.nodeName !== "STRONG" && 
                    this.parentElement.nodeName !== "EM" && 
                    this.parentElement.nodeName !== "SMALL" && 
                    this.parentElement.nodeName !== "LABEL" && 
                    this.parentElement.nodeName !== "OPTION" && 
                    this.parentElement.nodeName[0] !== "H";
            }).filter(function() {
              return typeof(this) === "object";
            }).wrap('<yeti-inline/>');
            $('yeti-inline').css('display', 'inline');
        }
        
        wrapOrphanTextNodes();
        $('body').append('<div class="yeti-palette yeti-include yeti-hidden" id="yetiPalette" data-source-url="/yeti-cms/content-blocks.html"></div>');
    });
    
})();
