// ==UserScript==
// @name         Unblur examples on Reverso
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  try to take over the world!
// @author       Rony Utesvky (ronyut@gmail.com)
// @match        https://context.reverso.net/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/reverso/main.js

// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        $(".example").css("-webkit-filter", "blur(0px)");
        $(".example").css("filter", "blur(0px)");
    }, false);

})();
