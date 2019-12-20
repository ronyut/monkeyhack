// ==UserScript==
// @name         Haaretz ad blocker
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  try to take over the world!
// @author       Rony Utesvky (ronyut@gmail.com)
// @match        https://www.haaretz.co.il/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/haaretz/adblock.js
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function() {
        setTimeout(function() {
            let ad = $("div[id^='strip']:contains('מינוי לאתר')");
            ad.closest("span").parent().remove();

            let ad2 = $("section a span:contains('לרכישה')");
            ad2.closest("section").parent().parent().remove();

        }, 4000);

        let adSpotter = $("h1:contains('שמנו לב שחוסם הפרסומות שלך מופעל')");
        let buy = $("section section p:contains('רכשו עכשיו מינוי לאתר הארץ')");
        if (buy.length > 0 || adSpotter.length > 0) {
            window.location.href = "http://tikun.li/haaretz/?url=" + window.location.href;
        }

        let googleAds = $("div[id*='google_ads']");
        googleAds.parent().remove();

    });

    $(document).scroll(function() {
        let ad = $("div[id^='strip']:contains('מינוי לאתר')");
        ad.closest("span").parent().remove();
    });

})();
