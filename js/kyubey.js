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
    function hatenize() {
      var hatena = new Hatena({sectionanchor: " "});
      $(".hatena").each(function(){
        hatena.parse($(this).text());
        $(this).html(hatena.html());
      });
      upHeadingLevel();
    };

    // 見出し(h1, h2, etc...)のレベルを上げる
    function upHeadingLevel(level) {
      if (level == undefined) {
        level = 2;
      }
      $.each([1, 2, 3], function(i){
        $(".hatena h" + (i+level)).replaceWith(function(){
          return "<h"+i+">" + $(this).html() + "</h"+i+">";
        });
      });
    };

    // .textile内の文字列をtextile記法でHTML化する
    function textile() {
      $(".textile").each(function(){
        $(this).html(convert($(this).text()));
      });
    };

    function textileFull() {
      $(".textileFull").each(function(){
        $(this).html(convert($(this).text()));
      });
      $(".textileFull h1").each(function(){
        $(this).nextUntil("h1").andSelf().wrapAll("<section>");
      });
      $(".textileFull").replaceWith($(".textileFull").html());
    };

    // ページ読込み時用の初期化動作 
    function init() {
      sizing();
      hatenize();
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
