// ==UserScript==
// @name        Morfix Everywhere
// @namespace   ronyut
// @description Left Alt + click on any word anywhere and get a quick translation!
// @version     1.1.1
// @author      Rony Utesvky (ronyut@gmail.com)
// @match       *://*/*
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @require     https://raw.githubusercontent.com/ronyut/monkeyhack/master/morfix/bootstrap/bootstrap.min.js
// @resource    bootstrapCSS https://raw.githubusercontent.com/ronyut/monkeyhack/master/morfix/bootstrap/bootstrap.min.css
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// @downloadURL  https://cdn.jsdelivr.net/gh/ronyut/monkeyhack/morfix/main.js
// ==/UserScript==

document.head.appendChild(cssElement(GM_getResourceURL ("bootstrapCSS")));

function cssElement(url) {
  var link = document.createElement("link");
  link.href = url;
  link.rel="stylesheet";
  link.type="text/css";
  return link;
}

(function() {
    'use strict';

    var modalXHtml = `
<!-- Modal -->
<div class="modalX fadeModalMorfix" id="myModal_morfix" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modalX-dialog" role="document">
    <div class="modalX-content">
      <div class="modalX-body"></div>
    </div>
  </div>
</div>
`;

    //--- Add modal to page
    $("body").prepend(modalXHtml);

    $(document).on('keydown', reportKeyEvent);

    function reportKeyEvent (e) {
        //--- Was a Ctrl-Alt-* combo pressed?

        if (e.altKey && e.key === "x") {
            e.stopPropagation ();
            e.preventDefault ();

            let url = "https://www.google.com/search?igu=1&gws_rd=ssl&q=*****#hdtb-msb-vis";
            let style = "style='height: "+ $(window).height() * 0.7 + "px'";
            let html = '<iframe width="100%" height="100%" '+ style +' src="' + url +'"></iframe>';
            openModal(e, html, 0.93);
        }

        else if (e.altKey && e.key === "z") {
            e.stopPropagation ();
            e.preventDefault ();

            let url = "https://www.morfix.co.il/*****";
            let style = "style='height: "+ $(window).height() * 0.7 + "px'";
            let html = '<iframe width="100%" height="100%" '+ style +' src="' + url +'"></iframe>';
            openModal(e, html);
        }

        else if (e.altKey && e.key === "c") {
            e.stopPropagation ();
            e.preventDefault ();

            let url = "https://www.dictionary.com/browse/*****";
            let style = "style='height: "+ $(window).height() * 0.4 + "px'";
            let html = '<iframe width="100%" height="100%" '+ style +' src="' + url +'"></iframe>';

            url = "https://www.morfix.co.il/*****";
            html += '<iframe width="100%" height="100%" '+ style +' src="' + url +'"></iframe>';

            url = "https://www.etymonline.com/word/*****";
            html += '<iframe width="100%" height="100%" '+ style +' src="' + url +'"></iframe>';

            openModal(e, html, 0.63);
        }

    }

    function openModal(e, html, width = 0.5){
        var range = window.getSelection() || document.getSelection() || document.selection.createRange();
        var word = $.trim(range.toString());
        if (word != '') {
            e.stopPropagation();
            e.preventDefault();
            html = html.replace(/\*{5}/g, word);
            $('#myModal_morfix .modalX-body').html(html);
            $("#myModal_morfix .modalX-body").css({
                //'height': $(window).height() * 0.7
            });
            $("#myModal_morfix .modalX-dialog").css({
                'width': $(window).width() * width
            });
            $('#myModal_morfix').modalX('show');
        }
        
    }

    // enable scrolling on all pages overflow: hidden;
    /*$(document).on('mouseover', 'body', function(e) {
        let bodystyle = $("body").attr("style");
        let replaced = bodystyle.replace("overflow: hidden;", "");
        $("body").attr("style", replaced);
    });*/

})();
