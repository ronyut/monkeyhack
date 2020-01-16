// ==UserScript==
// @name        StackOverFlow best answer
// @namespace   http://tampermonkey.net/
// @description Is the chosen answer really good?
// @version     1.0.3
// @author      Rony Utesvky (ronyut@gmail.com)
// @match       *://*/questions/*/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js?v=1
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/stackoverflow/main.js
// ==/UserScript==

function myFunc_stackoverflow() {
    'use strict';

    let accepted = $(".js-accepted-answer-indicator:not(.d-none)")[0];
    let acceptedNum = $(accepted).parent().find(".js-vote-count").text();
    let answers = $(".js-vote-count");
    answers.each(function(i, ans){
        // skip question rating
        if (i != 0 && parseInt($(ans).text()) > acceptedNum) {
            $(accepted).removeClass("fc-green-500");
            $(accepted).css("color", "orange");
            return;
        }
    });

}

myFunc_stackoverflow();
