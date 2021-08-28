// ==UserScript==
// @name        jQuery Injection
// @namespace   ronyut
// @description inject jQuery into the page
// @version     0.1
// @author      Rony Utesvky (ronyut@gmail.com)
// @match       *://*/*
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @grant       GM_xmlhttpRequest
// @connect     ajax.googleapis.com
// @downloadURL  https://raw.githubusercontent.com/ronyut/monkeyhack/master/jquery/main.js
// ==/UserScript==


(function() {
    'use strict';

    $(document).on('keydown', reportKeyEvent);

    function reportKeyEvent (e) {
        //--- Was a Ctrl-Alt-J combo pressed?
        if (e.ctrlKey && e.altKey && e.key === "j") { // case sensitive
            e.stopPropagation ();
            e.preventDefault ()
            InjectJQuery();
        }
    }

    function InjectJQuery() {
         GM_xmlhttpRequest({
            method: 'GET',
            url : "https://code.jquery.com/jquery-3.6.0.min.js",
            onload: function(response) {
                var jq = document.createElement('script');
                jq.text = response.responseText;
                document.getElementsByTagName('head')[0].appendChild(jq);
                console.log("jQuery injected >>");
            }
        });
    }
})();
