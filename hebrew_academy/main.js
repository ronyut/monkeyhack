// ==UserScript==
// @name         Hebrew Academy: Verb search
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Rony Utesvky (ronyut@gmail.com)
// @match        https://hebrew-academy.org.il/%D7%9C%D7%95%D7%97%D7%95%D7%AA-%D7%A0%D7%98%D7%99%D7%99%D7%AA-%D7%94%D7%A4%D7%95%D7%A2%D7%9C/
// @grant        none
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/hebrew_academy/main.js
// ==/UserScript==

(function() {
    'use strict';

    /************** search by verb **************/

    // scroll
    document.getElementById('content-box').scrollIntoView();

    // get hash
    var hash = window.location.hash;
    if (hash != null && hash != "") {

        // get hash
        hash = decodeURI(hash).replace("#", "").replace(/([\?].+)/g, '');
        $("a[href='#nituah-pealim']").parent().click();
        $("#hataya").val(hash + " ");
        $("#hataya").focus();
    }

})();
