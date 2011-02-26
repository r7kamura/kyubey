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
        } else if(e.keyCode==38) {  // ↑ 
          goFirst();
        } else if(e.keyCode==39) {  // → 
          goNext();
        } else if(e.keyCode==40) {  // ↓ 
          goLast();
        }
      });
    };

    // ページの移動 
    function goPrev() {
      if ($("section.current").prev().is("section")) {
        $("section:visible").hide();
        $("section.current").removeClass("current")
                            .prev("section")
                            .fadeIn()
                            .css("display", "block")
                            .addClass("current");
        paging();
      }
    };
    function goNext() {
      if ($("section.current").next().is("section")) {
        $("section:visible").hide();
        $("section.current").removeClass("current")
                            .next("section")
                            .fadeIn()
                            .css("display", "block")
                            .addClass("current");
        paging();
      }
    };
    function goLast() {
      goEdge("last")
      paging();
    };
    function goFirst() {
      goEdge("first");
      paging();
    };
    function goEdge(edge) {
      $("section").hide()
                  .removeClass("current");
      $("section:"+edge).fadeIn()
                        .css("display", "block")
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
