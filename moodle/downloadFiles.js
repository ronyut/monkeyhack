// ==UserScript==
// @name        Moodle Bar Ilan - Download Files
// @namespace   http://tampermonkey.net/
// @description download files from Moodle
// @version     0.1
// @author      Rony Utesvky (ronyut@gmail.com)
// @match       https://lemida.biu.ac.il/course/view.php?id=*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js?v=1
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/moodle/downloadFiles.js
// ==/UserScript==


function myFunc_MoodleFile () {
    'use strict';

    let file_titles = $(".accesshide:contains('קובץ')");
    file_titles.each(function() {
        let url = $(this).closest("a").attr("href");
        let name = $(this).parent().text().replace(" קובץ", "");
        $(this).closest(".activityinstance").append('<a download="'+ name +'" href="'+ url +'">Download File</a>');
    });
}

myFunc_MoodleFile();
