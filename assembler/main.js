// ==UserScript==
// @name        Assembler Online
// @namespace   http://tampermonkey.net/
// @description
// @version     0.1
// @author      Rony Utesvky (ronyut@gmail.com)
// @match       https://www.jdoodle.com/compile-assembler-gcc-online/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/assembler/main.js
// ==/UserScript==

function myFunc_assembler() {
    'use strict';

    //let btn = $("#ide-right .level-item .field .control:nth-child(2) > button");
    //let shareParent = $(".share-button").parent();
    //shareParent.html(btn);

    let fullScreenBtn = $("#ide-right .level-item .field .control:nth-child(3) > button");
    fullScreenBtn.click();

}

myFunc_assembler();
