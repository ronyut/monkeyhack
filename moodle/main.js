// ==UserScript==
// @name        Moodle Bar Ilan - Download video
// @namespace   http://tampermonkey.net/
// @description download video
// @version     1.0.1
// @author      Rony Utesvky (ronyut@gmail.com)
// @match       https://lemida.biu.ac.il/mod/resource/view.php*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js?v=1
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/moodle/video.js
// ==/UserScript==


function myFunc_Moodle () {
    'use strict';

    let url = $("video source").attr("src");
    let name = $("#maincontent").parent().find("h2").text();
    $("#maincontent").parent().find(".resourcecontent").prepend('<a id="downloadVideo" download="'+ name +'" href="'+ url +'">Download Video</a>');

    $("#downloadVideo").click(function() {
        window.top.close();
    });
}

myFunc_Moodle();
