// ==UserScript==
// @name         Shoham: Fast search courses (with Enter and Hash)
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  try to take over the world!
// @author       Rony Utesvky (ronyut@gmail.com)
// @match        https://shoham.biu.ac.il/BiuCoursesViewer/MainPage.aspx
// @grant        none
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/shoham/main.js
// ==/UserScript==

(function() {
    'use strict';

    // select year
    let year = 2020;
    $("#ContentPlaceHolder1_cmbYear").val(year);

    /************** press alt+1 to focus on the course code **************/
    $("#ContentPlaceHolder1_txLessonCode").attr("accesskey", "1");

    /************** Fast search by pressing Enter key **************/
    window.addEventListener('keypress', function(e) {
        var key = e.which;
        // when enter is pressed
        if (key == 13) {
            fixCourseNumber();
            // search!
            $("#ContentPlaceHolder1_btnSearch").click();
        }
    }, false);

    // on key up - fix the code
    $("#ContentPlaceHolder1_txLessonCode").keyup(function() {
        fixCourseNumber();
    });

    function fixCourseNumber() {
        var courseCode = $("#ContentPlaceHolder1_txLessonCode").val();
        // remove non digit chars and keep only first 5 digits
        $("#ContentPlaceHolder1_txLessonCode").val(courseCode.replace(/\D+/g, '').substr(0, 5));
    }


    /************** search by course name/code **************/
    if(window.location.hash) {

        // clear fields
        $("#ContentPlaceHolder1_txLessonCode").val("");
        $("#ContentPlaceHolder1_txLessonName").val("");
        $("#ContentPlaceHolder1_txTeacherName").val("");

        // get hash
        var hash = window.location.hash;
        var course = hash.replace(/\D+/g, '');

        // if it's only number then it's course code; else: course name
        if(course.length >= 5 && course.length <= 7) {
            $("#ContentPlaceHolder1_txLessonCode").val(course.substr(0, 5));
        } else {
            hash = decodeURI(hash).replace("#", "").replace("/\\+/g", " ");
            $("#ContentPlaceHolder1_txLessonName").val(hash);
        }

        // search!
        $("#ContentPlaceHolder1_btnSearch").click();
    }

})();
