/**
 * Author: Allen Linatoc
 * Created: 10/7/2015 10:00 PM
 * 
 * 
 * Required:
 * 
 * - jQuery
 * - Bootstrap JS
 */

var Overlay = {
   
    xhr: null,
    
    /**
     * Show an overlay
     * 
     * @param {int} _id Target "data-overlay" ID 
     * @param {XMLHttpRequest} [optional] XMLHttpRequest object to be stored
     */
    show: function(_id, xhr) 
    {
        overlayElm = '[data-overlay="' + _id.trim('_') + '"]';
        var cancelBtn = overlayElm + ' ' + 'button[data-overlay-btn]';
        
        $(overlayElm).fadeIn(500);
        $(overlayElm).data('xhr', xhr || null);
        
        if ($(overlayElm).data('xhr'))
        {
            $(cancelBtn).show().on('click', function() {
                Overlay.hide(_id);
            });
        }
    },
    
    /**
     * Hide an overlay
     * 
     * @param {int} _id Target "data-overlay" ID
     * @param {bool} _abort_xhr [optional] Boolean value if XHR request stored should be aborted. Default is TRUE.
     */
    hide: function(_id, _abort_xhr)
    {
        overlayElm = '[data-overlay="' + _id.trim('_') + '"]';
        _abort_xhr =  _abort_xhr || true;
        var cancelBtn = overlayElm + ' ' + 'button[data-overlay-btn]';
        
        $(overlayElm).fadeOut(300);
        
        Overlay.xhr = $(overlayElm).data('xhr') || null;
        
        // If XHR should be aborted
        
        if (_abort_xhr === true && Overlay.xhr && Overlay.xhr.readystate != 4)
        {
            Overlay.xhr.abort();
        }
        
        
        // Reset event handler
        
        $(cancelBtn).off('click').hide();
    }
    
};

$(document).ready(function() {
    
    // Initially hide all overlay controls
    
    $('[data-overlay]').hide();
    $('button[data-overlay-btn]').hide();
    
});