// ==UserScript==
// @name        Morfix Everywhere
// @namespace   http://tampermonkey.net/
// @description Left Alt + click on any word anywhere and get a quick translation!
// @version     1.0.7
// @author      Rony Utesvky (ronyut@gmail.com)
// @match       *://*/*
// @exclude     https://www.haaretz.co.il/misc/haaretzsmartphoneapp/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js?v=1
// @require     http://tikun.li/tampermonkey/morfixEverywhere/assets/bootstrap.min.js?v=2
// @resource    bootstrapCSS http://tikun.li/tampermonkey/morfixEverywhere/assets/bootstrap.min.css?v=00000000000000008
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

function myFunc_morfix () {
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

    //--- Add nodes to page
    $("body").prepend(modalXHtml);

    var ctrlIsPressed = false;
    var altIsPressed = false;

    $(document).keydown(function(event){
        if(event.which=="18")
            altIsPressed = true;
    });

    $(document).keyup(function(e){
        altIsPressed = false;
    });

    $(document).on('contextmenu dblclick', 'body', function(e) {
        openModal(e, "https://www.morfix.co.il/");
    });

    $(document).on('keydown', 'body', function(e) {
        if (e.which == 88) { // x
            openModal(e, "https://www.google.com/search?igu=1&gws_rd=ssl&q=", 0.93, "#hdtb-msb-vis");
        }
        if (e.which == 90) { // z
            openModal(e, "https://www.morfix.co.il/");
        }
        if (e.which == 67) { // c
            openModal(e, "https://www.dictionary.com/browse/", 0.63);
        }
    });

    function openModal(e, url, width = 0.5, hash = ""){
    if(altIsPressed){
        altIsPressed = false;
        var range = window.getSelection() || document.getSelection() || document.selection.createRange();
        var word = $.trim(range.toString());
        if(word != '') {
            e.stopPropagation();
            e.preventDefault();
            $('#myModal_morfix .modalX-body').html('<iframe width="100%" height="100%" src="' + url + word + hash + '"></iframe>');
            $("#myModal_morfix .modalX-body").css({
                'height': $(window).height() * 0.7
            });
            $("#myModal_morfix .modalX-dialog").css({
                'width': $(window).width() * width
            });
            $('#myModal_morfix').modalX('show');
        }
    }
}

}

myFunc_morfix();
