(function () {
    /*global ShadowDOM*/
    /*global dragula*/
    /*global Yeti*/
    /*global _$*/
    /*global $*/
    
    Yeti.initializationQueue.push(function () {
        $(document).ready(function () {
            $('#yeti-add-section').html('');
            $('.yeti-palette > *').each(function () {
                var that = this;
                var itemName = $(that).attr('data-id');
                if (!itemName) {
                    itemName = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                    $(that).attr('data-id', itemName);
                }
                var thumb = $(that).attr('data-thumbnail-url');
                // var tmp = '<li><img src="' + thumb + '" data-name="' + itemName + '"><div>' + itemName + '</div></li>';
                var tmp = '<a class="yeti yeti-left-menu-button"> <img src="' + thumb + '" data-name="' + itemName + '" alt=""> <span class="yeti-text yeti-thumbnail-label">' + itemName + '</span> </a>';
                if (!thumb) {
                    var contents = $(that).html();
                    tmp = '<li><div class="yeti thumbnail" data-name="' + itemName + '">' + contents + '</div></li>';
                    tmp = '<a class="yeti yeti-left-menu-button" data-name="' + itemName + '"> <span class="yeti-text yeti-thumbnail-label">' + contents + '</span> </a>';
                }
                $('#yeti-add-section').append(tmp);
            });
            
            var deb = 0;
            
            dragula([document.getElementById('yeti-add-section'), document.querySelector('.yeti-body-section-container') || document.body], {
              removeOnSpill: false,
              copy: function (el, source) {
                return source.id === "yeti-add-section";
              },
              accepts: function (el, target) {
                // console.log(el, target);
                // if (target && target.class && target.class.indexOf('yeti-body-section-container') !== -1) return true;
                // return false
                return true;
              }
            }).on('drop', function (el) {
                if (deb) return;
                deb = 1;
                // console.log('drop');
                setTimeout(function () {
                    deb = 0;
                }, 400);
                var dataName = $(el).find('img').attr('data-name');
                // console.log(dataName);
                // $(el).html(dataName);
                
                
                var tmp = $('#yetiPalette > [data-id=' + dataName + ']').first().clone();
                var p = parseInt((Math.random() * 24) + 1);
                tmp.attr('id', p);
                _$(tmp).attr('id', p);
                tmp.addClass('yeti-body-section');
                var tmp2 = tmp.clone(); // ShadowDOM needs a clone
                
                // console.log(tmp);

                // Insert it
                if ($('.yeti-body-section-container').length && ShadowDOM.shadowDOM.main.find('.yeti-body-section-container').length) {
                    // $('.yeti-body-section-container').append(tmp);
                    $(el).after(tmp);
                    var thisID = $(el).prev().attr('id');
                    // console.log(thisID);
                    ShadowDOM.shadowDOM.main.find('#'+thisID).after(tmp2);
                    
                    // setTimeout(function () { Yeti.initBuilder(); },1);
                    $(el).remove();
                } else {
                    // $('body').append(tmp);
                    // ShadowDOM.shadowDOM.main.append(tmp2);
                    $(el).after(tmp);
                    thisID = $(el).prev().attr('id');
                    // console.log(thisID);
                    ShadowDOM.shadowDOM.main.find('#'+thisID).after(tmp2);
                    // Yeti.initBuilder();
                    // setTimeout(function () { Yeti.initBuilder(); },1);
                    $(el).remove();
                }
                
            });
        });
    });

    Yeti.registerGlobal('animateToSelector', function (selector) {
        $('html,body').animate({
            scrollTop: $(selector).offset().top - 100
        }, 1000);
    });
    
    Yeti.registerGlobal('collectPalette', function () {
        $('.yeti-body-section').each(function () {
            
        });
    });

    Yeti.teardownQueue.push(function () {
        $('#yeti-add-section').html('');
    });

})();

// Add section section
// $('#sortSections').append(function () {
//     return $('<select id="yetiAddSectionSelect"></select>');
// });
// $('#yetiAddSectionSelect').append(function () {
//     return $('<option id="defSec">Add a Section...</option>');
// });

// $('#yetiPalette > *').each(function () {
//     var that = this;
//     $('#yetiAddSectionSelect').append(function () {
//         var datID = $(that).attr('data-id');
//         return $('<option data-id="' + datID + '" value="' + datID + '">' + datID + '</option>');
//     });
// });

// $('#yetiAddSectionSelect').change(function () {
//     var id = $('#yetiAddSectionSelect').val();
//     var p = prompt('Name this section');
//     if (p) {
//         // Clone from palette
//         var tmp = $('#yetiPalette > [data-id=' + id + ']').clone();

//         // Check maxlength of potential ID
//         if (p.length > 16)
//             p = p.slice(0, 15);

//         // Strip invalid chars from potential ID
//         p = p.match(/([A-Za-z0-9\-\_]+)/g).join('');

//         // Force uniqueness of ID
//         // Todo: For the love of Chrisss fix this immediately its so terrible omg
//         if ($('#'+p).length)
//             p = p + '' + parseInt((Math.random() * 24) + 1);

//         // Set ID
//         tmp.attr('id', p);
//         _$(tmp).attr('id', p);


//         var tmp2 = tmp.clone(); // ShadowDOM needs a clone

//         // Insert it
//         if ($('.yeti-body-section-container').length && ShadowDOM.shadowDOM.main.find('.yeti-body-section-container').length) {
//             $('.yeti-body-section-container').append(tmp);
//             ShadowDOM.shadowDOM.main.find('.yeti-body-section-container').append(tmp2);
//         } else {
//             $('body').append(tmp);
//             ShadowDOM.shadowDOM.main.append(tmp2);
//         }

//         // Cleanup UI to ensure proper order
//         // Yeti.cleanupUI();
//     }
//     $('#defSec').attr('selected', true);

//     // Content has changed. Reset all of the things!
//     Yeti.executeTeardownQueue();
//     Yeti.executeInitializationQueue();
// });