// スライド表示用のjQueryプラグイン


(function(){
  jQuery.kyubey = function(){

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
          console.log("←");
        } else if(e.keyCode==38) {  // ↑
          goHome();
          console.log("↑");
        } else if(e.keyCode==39) {  // →
          goNext();
          console.log("→");
        } else if(e.keyCode==40) {  // ↓
          goLast();
          console.log("↓");
        }
      });
    };

    // ページの移動
    function goPrev() {
      if ($("section.current").prev().is("section")) {
        $("section:visible").hide();
        $("section.current").removeClass("current")
                            .prev("section")
                            .show()
                            .addClass("current");
        paging();
      }
    };
    function goNext() {
      if ($("section.current").next().is("section")) {
        $("section:visible").hide();
        $("section.current").removeClass("current")
                            .next("section")
                            .show()
                            .addClass("current");
        paging();
      }
    };
    function goLast() {
      goEdge("last")
      paging();
    };
    function goHome() {
      goEdge("first");
      paging();
    };
    function goEdge(edge) {
      $("section").hide()
                  .removeClass("current");
      $("section:"+edge).show()
                        .addClass("current");
    };

    // #page にページ番号を割り当てる
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

    // ページ読込み時の初期化動作
    function init() {
      sizing();
      paging();
      goHome();
      bindKey();
    };
    

    init();
  };

})(jQuery);
