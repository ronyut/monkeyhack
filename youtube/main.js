// ==UserScript==
// @name        Youtube No Disturb
// @namespace   http://tampermonkey.net/
// @description Watch videos in youtube without disturbance
// @version     1.0.1
// @author      Rony Utesvky (ronyut@gmail.com)
// @match       https://www.youtube.com/watch*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js?v=1
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/youtube/main.js
// ==/UserScript==

function myFunc_youtubeNoDist () {
    'use strict';

    let form = $("#search-form");
    form.append('<button id="dontDisturb" style="">Don\'t Disturb</button>');


    if($.cookie("dontDisturb") == 0){
        $("#dontDisturb").css("background-color", "red");
    } else {
        $("#dontDisturb").css("background-color", "green");
    }

    $("#dontDisturb").click(function(e) {
        e.preventDefault();

        let active = false;
        if($.cookie("dontDisturb") == 1){
            active = true;
        }

        let vidChannel = $("#primary .ytd-channel-name a").text();
        let vids = $("#secondary .ytd-channel-name[title!='"+vidChannel+"']");

        vids.each(function(i, m){
            let title = $(m).attr("title");
            if(typeof title !== typeof undefined && title !== false){
                $(m).closest("ytd-compact-video-renderer").toggle();
            }
        });

        // disable if active
        if(active){
            $(".html5-endscreen").css("margin-top", "auto");
            $.cookie("dontDisturb", 0);
            $(this).css("background-color", "red");
        } else {
            //$(".ytp-upnext").toggle();
            $(".html5-endscreen").css("margin-top", "1000px");
            $.cookie("dontDisturb", 1);
            $(this).css("background-color", "green");
        }

    });

    $(document).on("scroll mouseover", function(e) {
        removeBad();
    });

    function removeBad(){
        // do nothing if dontDisturb mode is off
        if($.cookie("dontDisturb") == 0){
            return;
        }

        let vidChannel = $("#primary .ytd-channel-name a").text();
        let vids = $("#secondary .ytd-channel-name[title!='"+vidChannel+"']");
        vids.each(function(i, m){
            let title = $(m).attr("title");
            if(typeof title !== typeof undefined && title !== false){
                $(m).closest("ytd-compact-video-renderer").hide();
            }
        });
    }
}

myFunc_youtubeNoDist();
removeBad();
