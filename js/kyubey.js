(function($){
  $.kyubey = function(args){
    var config = $.extend({animation: "fadeIn"}, args);

    // 画面に合わせて高さを調整 
    function sizing() {
      var h = window.innerHeight;
      var w = window.innerWidth;
      $("section").css("max-height", h + "px");
    };

    // キーバインドの設定 
    function bindKey() {
      $(window).keyup(function(e){
        if(e.keyCode==37) {         // ← 
          goPrev();
        } else if(e.keyCode==38) {  // ↑ 
          goFirst();
        } else if(e.keyCode==39) {  // → 
          goNext();
        } else if(e.keyCode==40) {  // ↓ 
          goLast();
        }
      });
    };

    // ページ表示時の処理
    function show(jObj) {
      if (jObj.is("section")) {
        $("section:visible").removeClass("current").hide();
        $.fn[config.animation].apply(jObj);
        jObj.css("display", "block")
            .addClass("current");
        paging();
      }
    };

    // ページの移動 
    function goPrev() {
      show($("section.current").prev());
    };
    function goNext() {
      show($("section.current").next());
    };
    function goLast() {
      show($("section:last"));
    };
    function goFirst() {
      show($("section:first"));
    };

    // #page にページ番号を挿入 
    function paging() {
      var pageNum = $("section").length;
      var i = 1;
      $("section").each(function(){
        if ($(this).is(".current")) {
          return false; // break
        } else {
          i++;
        }
      });
      $("#page").text(i + " / " + pageNum);
    };

    // .hatena内の文字列をはてな記法でHTML化する
    function hatenize(selector) {
      selector = selector || ".hatena";
      var hatena = new Hatena({sectionanchor: " "});
      $(selector).each(function(){
        hatena.parse($(this).text());
        $(this).html(hatena.html());
      });
      $(".section").each(function(){ // はてな記法は勝手にdiv.sectionを付けるので消す 
        $(this).replaceWith($(this).html());
      });
      upHeadingLevel(selector, 2);
    };

    // .hatenaのsectionに分けてあげる版
    function hatenizeFull() {
      var selector = ".hatenaFull";
      hatenize(selector);
      separateSection(selector);
    };

    // 見出し(h1, h2, etc...)のレベルを上げる
    function upHeadingLevel(selector, level) {
      $.each([1, 2, 3, 4], function(i){
        $(selector + " h" + (i + level)).replaceWith(function(){
          return "<h"+i+">" + $(this).html() + "</h"+i+">";
        });
      });
    };

    // .textile内の文字列をtextile記法でHTML化する
    function textile(selector) {
      selector = selector || ".textile";
      $(selector).each(function(){
        $(this).html(convert($(this).text()));
      });
    };

    // .textileのsectionに分けてあげる版
    function textileFull() {
      var selector = ".textileFull";
      textile(selector);
      separateSection(selector);
    };

    // h1タグごとにsectionに分ける
    function separateSection(selector, func) {
      $(selector + " h1").each(function(){
        $(this).nextUntil("h1").andSelf().wrapAll("<section>");
      });
      $(selector).replaceWith($(selector).html());
    };

    // ページ読込み時用の初期化動作 
    function init() {
      sizing();
      hatenize();
      hatenizeFull();
      textile();
      textileFull();
      paging();
      goFirst();
      bindKey();
      prettyPrint();
    };

    init();
  };

})(jQuery);
