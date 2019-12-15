// ==UserScript==
// @name         Morfix: enable addition of new word lists
// @namespace    http://tampermonkey.net/
// @version      1.0.4
// @description  try to take over the world!
// @author       Rony Utesvky (ronyut@gmail.com)
// @match        https://www.morfix.co.il/*
// @grant        none
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/morfix/addNewList.js
// ==/UserScript==

(function() {
    'use strict';

    // make website full page width
    $(".col-lg-9").css("width", "100%");

    // remove new list addition
    $("#customListsAddView").remove();
    // remove ad
    $(".custom_lists_add").hide();

    $(".custom_list_items_container").each(function(i, el){
        var wordID = $(this).attr("data-word_id");
        var html = `<div id="customListsAddView" style=""><form action="/LearnPrivate/CreateList" autocomplete="off" data-ajax="true" data-ajax-begin="$('.add_to_list_btn').popover('hide');" data-ajax-success="learn.addList" id="form0" method="post"><input type="hidden" value="`+ wordID +`" name="id">
                    <div class="custom_list_new_title">
                        שם
                    </div>
                    <input type="text" name="name" placeholder="רשימה חדשה">
                    <input type="submit" value="יצירת רשימה חדשה"></form></div>`;
        $(this).append(html);
    });



})();
