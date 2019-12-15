// ==UserScript==
// @name         GDB GUI
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Shortcuts for GDB GUI
// @author       Rony Utesvky (ronyut@gmail.com)
// @match        http://127.0.0.1:5000/
// @grant        none
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/gdbgui/main.js
// ==/UserScript==

(function() {
    'use strict';

    let reloadBtn = $("button[title='Erase file from local cache and re-fetch it']");
    reloadBtn.css("background-color", "cyan");
    reloadBtn.addClass("reloadBtn");

    // create access key for command line
    $(".gdb_command_input").attr("accesskey", "q");

    $(document).on("keydown", function(e){
        if (e.which == 116) { // f5
            e.preventDefault();
            $("#run_button").click();
            reloadBtn.click();
        }

        if (e.which == 118) { // f7
            e.preventDefault();
            $("#step_button").click();
        }

        if (e.which == 119) { // f8
            e.preventDefault();
            $("#next_button").click();
        }

        if (e.which == 112) { // f1
            e.preventDefault();
            reloadBtn.click();
        }
    });

})();
