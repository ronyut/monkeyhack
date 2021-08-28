// ==UserScript==
// @name         Morfix: enable addition of new word lists
// @namespace    ronyut
// @version      1.0.5
// @description  try to take over the world!
// @author       Rony Utesvky (ronyut@gmail.com)
// @match        https://*.morfix.co.il/*
// @grant        none
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/morfix/addNewList.js

// ==/UserScript==

(function() {
    'use strict';

    if (window.jQuery) {
        // make overflow visible
        $("body").removeClass("modal-open");

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
    }

    // remove `+`
    var hrefik = window.location.href;
    if (hrefik.includes("+")) {
        // redirect
        hrefik = decodeURI(hrefik).replace(/\+/g, "%20");
        window.location.href = hrefik;

    } else {
        // make me premium user
        oSite.PremiumUser = true;
    }

})();
