(function(){
  jQuery.kyubey = function(config){
    var config = $.extend({animation: "fadeIn"}, config);

    // 画面に合わせて高さを調整 
    function sizing() {
      var h = window.innerHeight;
      var w = window.innerWidth;
      $("section").not(".center").css("height", h + "px");
      $("section.center").css("max-height", h + "px");
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
      $("section:visible").removeClass("current").hide();
      if (config.animation == "fadeIn") {
        jObj.fadeIn();
      } else if (config.animation == "slideDown") {
        jObj.slideDown();
      }
      jObj.css("display", "block")
          .addClass("current");
      paging();
    };

    // ページの移動 
    function goPrev() {
      if ($("section.current").prev().is("section")) {
        show($("section.current").prev());
      }
    };
    function goNext() {
      if ($("section.current").next().is("section")) {
        show($("section.current").next());
      }
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

    // ページ読込み時用の初期化動作 
    function init() {
      sizing();
      paging();
      goFirst();
      bindKey();
    };

    init();
  };

})(jQuery);
