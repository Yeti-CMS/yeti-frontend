(function () {
    
    Yeti.registerGlobal('siteData', {});
    
    $(document).ready(function () {
        Yeti.siteData = {};
        if (window.WPCESiteData) Yeti.siteData = WPCESiteData;
        Yeti.collectSiteData();
        Yeti.renderRepeats();
        Yeti.renderTemplates();
    });
    
    Yeti.registerGlobal('renderTemplates', function () {
        $('body > *').not('.yeti').each(function () {
            $(this).html(Yeti.render($(this).html(), Yeti.siteData, 1));
        });
    });
    
    Yeti.registerGlobal('renderRepeats', function () {
        
        $('[yeti-repeat]').each(function () {
            var $output = $(this);
            var key = $(this).attr('yeti-repeat');
            var data = Yeti.siteData[key];
            var template = $(this).html();
            var output = "";
            for (var page in data) {
                data[page]['repeat-url'] = page;
                output += Yeti.render(template, data[page], 1);
            }
            $(this).html(output);
        }); 
    });
    
    Yeti.registerGlobal('render', function (template, view, parse) {
        //don't touch the template if it is not a string
        if (typeof template !== 'string') {
            return template;
        }
        //if view is not a valid object, assume it is an empty object which effectively removes all variable assignments
        if (typeof view !== 'object' || view === null) {
            view = {};
        }
        return template.replace(/\{?\{\{\s*(.*?)\s*\}\}\}?/g, function (match, varName) {
            var value = view[varName];
            try {
                value = JSON.parse(view[varName]);
            } catch (e) {
                // Nope
            }
            
            switch (typeof value) {
                case 'string':
                case 'number':
                case 'boolean':
                    return value;
                case 'function':
                    //if the value is a function, call it passing the variable name
                    return value(varName);
                default:
                    //anything else will be replaced with an empty string. This includes object, array, date, regexp and null.
                    return '';
            }
        });
    });
    
    Yeti.registerGlobal('collectSiteData', function () {
        var siteData = Yeti.siteData;
        
        // Identify this page type (if applicable)
        var pageType = $('[yeti-page-type]').attr('yeti-page-type');
        
        // if (pageType) {
            var pathName = window.location.pathname;
            if (pageType && !siteData[pageType]) siteData[pageType] = {};
            if (pageType) siteData[pageType][pathName] = {};
            
            // Iterate through each [yeti-data]
            $('[yeti-data]').each(function () {
              var tagName = $(this).prop('tagName');
              var thisKey = $(this).attr('yeti-data');
              
              var thisAttr = $(this).html();
              if (tagName === "IMG") thisAttr = $(this).attr('src');
              
              thisAttr = JSON.stringify(thisAttr);
              
              // Save Key
              if (pageType) {
                  siteData[pageType][pathName][thisKey] = thisAttr;
              } else {
                  siteData[thisKey] = thisAttr;
              }
              
            });
            
            Yeti.siteData = siteData;
        // }
    });

})();