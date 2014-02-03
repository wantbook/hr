$(function() {
  var application = {
    config: {
      portrait1_delay: 0,
      portrait2_delay: 5000,
      portrait3_delay: 2500,
      portrait4_delay: 5000,
      portrait5_delay: 1000,
      portrait6_delay: 5000,
      portrait7_delay: 5000,
      portrait8_delay: 0,
      loop: true,
      anim_loaded: false,
      content_isopen: false,
      webgl: false,
      revard: $("article").find(".revard"),
      article: $("article"),
      content: $("article").find(".content"),
      portrait1: $(".block_1").find(".portrait"),
      portrait2: $(".block_2").find(".portrait"),
      portrait3: $(".block_3").find(".portrait"),
      portrait4: $(".block_4").find(".portrait"),
      portrait5: $(".block_5").find(".portrait"),
      portrait6: $(".block_6").find(".portrait"),
      portrait7: $(".block_7").find(".portrait"),
      portrait8: $(".block_8").find(".portrait"),
      back_side: $("#back_side")
    },
    start: function(){
      for(var i=0; i<$("article").find(".revard_back").length; i++){
        $("#nav").append("<div class='nav' data='" + $("article").find(".revard").eq(i).attr("data") + "' data-face='" + $("article").find(".revard").eq(i).attr("data-face") + "'></div>");
      };
      $(app.article).css({"margin-left":(($("body").width()-1600)/2*100/$("body").width())+"%","margin-top":(($("body").height()-1200)/4*100/$("body").height())+"%"});

      setTimeout( function() {
        $("#loader").fadeOut(300);
        $("article").fadeIn(300);
      }, 100);
      var asa; var canvas; var dcanvas; var gl; var expmt;

      canvas = $('#my-canvas');
      console.log(canvas);

      // check to see if we can do webgl
      // ALERT FOR JQUERY PEEPS: canvas is a jquery obj - access the dom obj at canvas[0]
          dcanvas = canvas[0];
          expmt = false;
          if ("WebGLRenderingContext" in window) {
              console.log("browser at least knows what webgl is.");
              app.webgl = true;
          }
          // some browsers don't have a .getContext for canvas...
          try { gl = dcanvas.getContext("webgl"); }
          catch (x) { gl = null; }
          if (gl == null) {
              try { gl = dcanvas.getContext("experimental-webgl"); }
              catch (x) { gl = null; }
              if (gl == null) { console.log("but can't speak it"); }
              else { expmt = true; console.log('and speaks it experimentally.'); }
          } else {
              console.log('and speaks it natively.');
          }

          if (gl || expmt) {
              console.log("loading webgl content.");
          } else {
              console.log("image-only fallback. no webgl.");
              canvas.remove();
          }
    },
    slider: function(){
      setInterval( function() {
        if(!app.loop){
          setTimeout( function() {$(app.portrait1).removeClass("portrait_show")},app.portrait1_delay);
          setTimeout( function() {$(app.portrait2).removeClass("portrait_show")},app.portrait2_delay);
          setTimeout( function() {$(app.portrait3).removeClass("portrait_show")},app.portrait3_delay);
          setTimeout( function() {$(app.portrait4).removeClass("portrait_show")},app.portrait4_delay);
          setTimeout( function() {$(app.portrait5).removeClass("portrait_show")},app.portrait5_delay);
          setTimeout( function() {$(app.portrait6).removeClass("portrait_show")},app.portrait6_delay);
          setTimeout( function() {$(app.portrait7).removeClass("portrait_show")},app.portrait7_delay);
          setTimeout( function() {$(app.portrait8).removeClass("portrait_show")},app.portrait8_delay);
          app.loop=true
        }else{
          setTimeout( function() {$(app.portrait1).addClass("portrait_show")},app.portrait1_delay);
          setTimeout( function() {$(app.portrait2).addClass("portrait_show")},app.portrait2_delay);
          setTimeout( function() {$(app.portrait3).addClass("portrait_show")},app.portrait3_delay);
          setTimeout( function() {$(app.portrait4).addClass("portrait_show")},app.portrait4_delay);
          setTimeout( function() {$(app.portrait5).addClass("portrait_show")},app.portrait5_delay);
          setTimeout( function() {$(app.portrait6).addClass("portrait_show")},app.portrait6_delay);
          setTimeout( function() {$(app.portrait7).addClass("portrait_show")},app.portrait7_delay);
          setTimeout( function() {$(app.portrait8).addClass("portrait_show")},app.portrait8_delay);
          app.loop=false
        }
      } , 5000);
    },
    open_content: function(_this){
      $(app.revard).removeClass("down");
      //$(app.content).animate({bottom: "-3000px"}, 300 );
      $(app.content).addClass("down");
      //$(app.content).animate({bottom: "5%"}, 500 );
      setTimeout( function() {$(app.content).removeClass("down")  }, 500);
      $(app.content).find(".block_content").hide();
      $("#"+$(_this).attr("data")+"").show();
      $("."+$(_this).attr("data")).addClass("down");
      $("#nav").find("div").removeClass("active");
      $("#nav").find("div").eq($("#"+$(_this).attr("data")+"").index()-1).addClass("active");
      $(back_side).fadeIn(300);
      setTimeout( function() { app.content_isopen = true }, 500);
      if(app.webgl){
        if($(_this).attr("data-face")=="girl"||$(_this).attr("data-face")=="advokat"||$(_this).attr("data-face")=="programmer"){
          $("#"+$(_this).attr("data")+" .revard_scene").find("img").css("display","none");
          $("#wgl-app").appendTo("#"+$(_this).attr("data")+" .revard_scene");
          !app.anim_loaded ? (setTimeout( function() {init($(_this).attr("data-face")); app.anim_loaded = true},500)) : false;
          app.anim_loaded ? window.setFace($(_this).attr("data-face")) : false;
        }else{
          $("#"+$(_this).attr("data")+" .revard_scene").find("img").css("display","inline-block");
        }
      }else{
        $("#"+$(_this).attr("data")+" .revard_scene").find("img").css("display","inline-block");
      }
    }
  },
  app = application.config;


  application.slider();
  setTimeout( function() {
    application.start();
    $(".nav").on("click",function(){
      application.open_content(this);
    });
  }, 100);

  $("body").on("click",function(e){
      e.stopPropagation();
      if(app.content_isopen){
        app.content_isopen = false;
        $(app.content).addClass("down");
        $(app.revard).removeClass("down");
        $(app.content).find(".block_content").hide();
        $(back_side).fadeOut(300);
      }
  });

  $(app.revard).on("click",function(){
    application.open_content(this);
  });

  $(".revard").hover(function(){
    $("."+$(this).attr("data")).addClass("hover");
  },function(){
    $("."+$(this).attr("data")).removeClass("hover");
  });

  $(".nav").on("click",function(){
    application.open_content(this);
  });



  $(app.content).find("#close").on("click",function(){
    app.content_isopen = false;
    //$(app.content).animate({bottom: "-3000px"}, 300 );
    $(app.content).addClass("down");
    $(app.revard).removeClass("down");
    $(back_side).fadeOut(300);
  });

  $(".content").on("click",function(e){
    e.stopPropagation();
  });

  window.onresize = function(event) {
    var qwe;
    clearTimeout(qwe);
    qwe = setTimeout( function() {
      $(app.article).css({"margin-left":(($("body").width()-1600)/2*100/$("body").width())+"%","margin-top":(($("body").height()-1200)/4*100/$("body").height())+"%"});
    }, 100);
  }

});