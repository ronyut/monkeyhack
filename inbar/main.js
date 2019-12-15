// ==UserScript==
// @name         Inbar: Make it Awesome!
// @namespace    http://tampermonkey.net/
// @version      1.1.5
// @description  try to take over the world!
// @author       Rony Utesvky (ronyut@gmail.com)
// @match        https://inbar.biu.ac.il/*
// @grant        GM_xmlhttpRequest
// @connect      tikun.li
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/inbar/main.js
// ==/UserScript==

(function() {
    'use strict';

    $("#tbActions_ctl05_edtCourseCode").attr("accesskey", "1");

    window.addEventListener('keyup', function(e) {

        // outside
        var courseCode = $("#tbActions_ctl05_edtCourseCode").val();
        if (courseCode != "")
        {
            // remove non digit chars and keep only first 5 digits
            $("#tbActions_ctl05_edtCourseCode").val(courseCode.replace(/\D+/g, '').substr(0, 5));
        }

        // inside courses modal
        var courseCode2 = $("#ContentPlaceHolder1_edtUserCodeSearch").val();
        if (courseCode2 != undefined && courseCode2 != "")
        {
            // remove non digit chars and keep only first 5 digits
            $("#ContentPlaceHolder1_edtUserCodeSearch").val(courseCode2.replace(/\D+/g, '').substr(0, 5));
        }

    }, false);

     /****************************************************
     * Closing popup doesn't refresh the page!
     ****************************************************/
    let grayBackCover = $("#ContentPlaceHolder1_mdLinkToLessons_modal");
    let coursesModal = $("#ContentPlaceHolder1_mdLinkToLessons");
    let noMoedModal = $("#ContentPlaceHolder1_mdLessonNoStudySessionData");
    let grayNoMoedCover = $("#ContentPlaceHolder1_mdLessonNoStudySessionData_modal");
    let collisionsdModal = $("#ContentPlaceHolder1_mdScheduleConflictLessons");
    let grayCollisionsCover = $("#ContentPlaceHolder1_mdThresholdRemark_modal");

    // hide modal when clicking "close"
    let closeBtn = $("[value='סגור']");
    closeBtn.attr("type", "button");
    closeBtn.attr("onclick", "");
    closeBtn.click(function() {
        $(".opaque-div:last").hide();
        $("#ContentPlaceHolder1_mdCourseRequirementsEx_modal").hide();
        $(this).closest("[role='dialog']").hide();
    });

    // hide modal when clicking "cancel"
    closeBtn = $("[value='בטל']");
    closeBtn.attr("type", "button");
    closeBtn.attr("onclick", "");
    closeBtn.click(function() {
        $("#ContentPlaceHolder1_ucMandatoryAdditionalLessonsSelection_dlgDialog_modal").hide();
        $(this).closest("[role='dialog']").hide();
    });

    // if dull message appears close the modal
    let dullModal = $("#ContentPlaceHolder1_mdThresholdRemark");
    if (dullModal.text().indexOf("לתלמידי בית הספר ללימודי יסוד") >= 0) {
        $(".opaque-div:last").hide();
        dullModal.hide();
    }

    // close courses selection modal when clicking on close button in the modal
    $("#ContentPlaceHolder1_btnmdLinkToLessonsClose").click(function () {
        grayBackCover.hide();
    });

    // closing modal of "קורסים ללא מועדים"
    $("#ContentPlaceHolder1_btnmdLessonNoStudySessionDataClose").click(function () {
        grayNoMoedCover.hide();
    });

    // closing modal of collisions
    $("#ContentPlaceHolder1_btnmdScheduleConflictLessonsClose").click(function () {
        grayCollisionsCover.hide();
    });

    // if the courses modal has been opened and now is hidden
    if (coursesModal.length > 0) {
        // prevent the shibutz button from refreshing the page
        let button = $('[value="שיבוץ מרשימה"]');
        button.removeAttr("onclick");

        // when clicking on schedule ("shibutz") and the modal already exists
        button.click(function() {
            grayBackCover.show();
            coursesModal.show();
        });
    }

    // if the "קורסים ללא מועדים" modal has been opened and now is hidden
    if (noMoedModal.length > 0) {
        // prevent the "no moed" button from refreshing the page
        let button = $('[value="רשימת קבוצות קורס ללא מועדים"]');
        button.removeAttr("onclick");

        // when clicking on schedule no moed and the modal already exists
        button.click(function() {
            grayNoMoedCover.show();
            noMoedModal.show();
        });
    }

    // if the collisions modal has been opened and now is hidden
    if (collisionsdModal.length > 0) {
        // prevent the "no moed" button from refreshing the page
        let button = $('[value="חפיפת קבוצות קורס"]');
        button.removeAttr("onclick").attr("type", "button");

        // when clicking on schedule no moed and the modal already exists
        button.click(function() {
            grayCollisionsCover.show();
            collisionsdModal.show();
        });
    }



    // colorize the courses in the main table
    let coursesCells = $("#ContentPlaceHolder1_tdScheduleGrid .GridView td[style='width:180px;']");
    coursesCells.each(function (i, cell) {
        if($(cell).text().trim() != ""){
            // semester 1
            if (i % 2 == 0) {
                $(cell).attr("semester", 1);
            } else {
                $(cell).attr("semester", 2);
            }


            // check if CS or BS
            let color = "";
            let courseCode = $(cell).find("span").html().toString().trim();
            courseCode = courseCode.substring(courseCode.indexOf("<br>") + 1).replace(/\D+/g, '').substr(0, 2);
            courseCode = parseInt(courseCode);

			// if CS
            if (courseCode == 89) {
                color = "purple";
            } else if (courseCode == 80 || courseCode == 27) { // BS
                color = "blue";
            }

            if (color != "") {
                $(cell).css("background-color", color);
                $(cell).find("span").css("color", "white");
            }
        }
    });

	// add semester toggle buttons
    $(".ToolBarCell3 table[role=presentation] tbody tr").append("<td><input type='button' id='toggleSem1' value='סמסטר א'> <input type='button' id='toggleSem2' value='סמסטר ב'></td>");

    // toggle semester 1
    $('body').on('click', '#toggleSem1', function() {
        if ($("td[semester=1][style*='visibility: hidden']").length == 0) {
            $("td[semester=1]").css("visibility", "hidden");
        } else {
            $("td[semester=1]").css("visibility", "");
        }
    });

    // toggle semester 2
    $('body').on('click', '#toggleSem2', function() {
        if ($("td[semester=2][style*='visibility: hidden']").length == 0) {
            $("td[semester=2]").css("visibility", "hidden");
        } else {
            $("td[semester=2]").css("visibility", "");
        }
    });




    // my custom functions
    var myFunctions = window.myFunctions = {};

    // add special class to eshkols
    $("#divBalance").addClass("divBalanceRony");
    $("#divBalanceMatrix").addClass("divBalanceRony");

    /****************************************************
    * Hide all full courses
    ****************************************************/
    let full = $("[src='App_Themes/default/gfx/CheckBox/NoReadOnly.gif']").parent().parent().parent();
    full.hide();
    full.attr("fullCourse", "true");

    // add a toggle button to show/hide full courses
    let eigthTH = $("#ContentPlaceHolder1_mdLinkToLessons .GridHeader th:nth-child(8)");
    eigthTH.css("cursor", "pointer");
    eigthTH.toggleClass("HighLight");
    eigthTH.removeAttr("onClick");
    eigthTH.click(function() {
        myFunctions.toggleFullCourses(this);
    });

    // add a toggle button to show/hide bad teachers
    let sixTH = $("#ContentPlaceHolder1_mdLinkToLessons .GridHeader th:nth-child(6)");
    sixTH.css("cursor", "pointer");
    sixTH.toggleClass("HighLight");
    sixTH.removeAttr("onClick");
    sixTH.click(function() {
        myFunctions.toggleBadTeachers(this);
    });

    // add a toggle button to show/hide irrelavent threads
    let eshkol = $(".divBalanceRony .GridHeader th:nth-child(2)");
    eshkol.css("cursor", "pointer");
    eshkol.toggleClass("HighLight");
    eshkol.removeAttr("onClick");
    eshkol.click(function() {
        myFunctions.toggleFilteredThreads(this);
    });


    // toggle full courses
    myFunctions.toggleFullCourses = function (el) {
        $("[fullCourse='true']").toggle();
        $(el).toggleClass("HighLight");
    }

    // toggle filtered threads
    myFunctions.toggleFilteredThreads = function (element) {
        let filtered = $("[filteredThread='true']");
        filtered.toggle();
        $(".divBalanceRony .GridHeader th:nth-child(2)").toggleClass("HighLight");
    }

    // toggle bad teachers
    myFunctions.toggleBadTeachers = function (el) {
        $("[badTeacher='true']").toggle();
        $(el).toggleClass("HighLight");
    }

    /****************************************************
     * Hide bad lecturers and Bold good ones
     ****************************************************/
    let courses = $("#divLessons .GridView tr");

    // get good filters
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://tikun.li/tampermonkey/inbar/inbar.php?get=good",
        synchronous: true,
        onload: function(response) {
            let goodTeachers = response.responseText.split("|||");
            goodTeachers.pop();

            courses.each(function(i, el) {
                goodTeachers.forEach(function(teacher) {
                    if ($(el).text().indexOf(teacher) >= 0 && $(el).attr("class") != undefined && teacher != "") {
                        $(el).css("font-weight", "bold");
                        $(el).attr("goodTeacher", "true");
                    }
                });
            });
        }
    });

    // get bad filters
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://tikun.li/tampermonkey/inbar/inbar.php?get=bad",
        synchronous: true,
        onload: function(response) {
            let badTeachers = response.responseText.split("|||");
            badTeachers.pop();

            courses.each(function(i, el) {
                badTeachers.forEach(function(teacher) {
                    if ($(el).text().indexOf(teacher) >= 0 && $(el).attr("class") != undefined && teacher != "") {
                        $(el).hide();
                        $(el).attr("badTeacher", "true");
                    }
                });
            });
        }
    });


     /****************************************************
     * Bold good lecturers
     ****************************************************/

    /*****************************************************************************
     * Hide irrelavant threads in the table on the right and within courses modal
     ****************************************************************************/

    let irrThreads = ['קורסים כלליים', 'תקווה ישראלית', "שנה א' מדעי המוח", "מדעי המוח-מדעי המחשב שנה א' חובה", "מדעי המחשב (עם מדעי המח) דו ראשי חובה שנה א'", "שנה א'"];
    let threads = $(".divBalanceRony .GridView tr");
    threads.each(function(i, el) {
        irrThreads.forEach(function(thread) {
            if ($(el).text().indexOf(thread) >= 0 && $(el).text().indexOf("חובה:") == -1) {
                $(el).hide();
                $(el).attr("filteredThread", "true");
            }
        });
    });

    /***********************************************************
     * Color courses outside in eshkol and in the courses modal
     **********************************************************/
    let colors = {"מדעי המחשב": "purple", "מדעי המוח": "blue"};
    threads.each(function(i, el) {
        let firstLocation = -1;
        $.each(colors, function(course, color) {
            let location = $(el).text().indexOf(course);
            if (location > -1 && (location < firstLocation || firstLocation == -1)) {
                $(el).attr("onmouseout", "this.style.backgroundColor='" + color + "';");
                $(el).css("background-color", color);
                $(el).css("color", "white");
                firstLocation = location;
            }
        });
    });

})();
