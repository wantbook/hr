/*------*/
var proverko = 0;
function scrolly(el, speed){
  if(speed===undefined) speed=250;
  var scrolly = $(el);
  methods = {
    init: function() {
      var margintop = 0;var h = 0;var maxh = 0;
      var sli = scrolly.children('ul').children('li');
      sli.each(function(id,elem){                
        if(id!=(sli.length-1)){
          margintop+=sli.outerHeight(true);
        }
        h=sli.outerHeight(true);
        if(h>maxh) maxh=h;                
      })
      if(maxh<50) maxh=122;  
      $(scrolly).css({
        'height': maxh,
        'overflow':'hidden'   
      })
      //$(scrolly).children('ul').css('margin-top', -margintop);
      var topnav = '';
      var botnav = '';
      if(scrolly.children('ul').children('li').length==1){
        topnav = "<a class='top'><i>&nbsp;</i></a>";
        botnav = "<a class='bot'><i>&nbsp;</i></a>";
      }else{
        topnav = "<a class='top'><i>&nbsp;</i></a>";
        botnav = "<a class='bot active'><i>&nbsp;</i></a>";
      }
      if($(scrolly).parent().find('a.top').length==0) $(scrolly).parent().append(topnav);
      if($(scrolly).parent().find('a.bot').length==0) $(scrolly).parent().append(botnav);
      function goToTop(upDown, elem, PM){
        if(PM===undefined) PM = 5;
        var PorM = PM; 
        var newm = parseInt($(scrolly).children('ul').css('margin-top'));
        if($(elem).hasClass('active')){
          if(upDown=='checktop'){
            if(newm>=-PorM){
              elem.removeClass('active');
              elem.siblings('.bot').addClass('active');
              $(scrolly).children('ul').css('margin-top', 0);
              return false;
            }
          }
          if(upDown=='checkbottom'){
            if(newm<=-margintop){
              elem.removeClass('active');
              elem.siblings('.top').addClass('active');
              $(scrolly).children('ul').css('margin-top', -margintop);
              return false;
            }
          }
          if(upDown=='top'){
            if(newm>=-PorM){
              elem.removeClass('active');
              elem.siblings('.bot').addClass('active');
              $(scrolly).children('ul').css('margin-top', 0);
              return false;
            }else{
              var totop = newm+maxh;
              elem.siblings('.bot').addClass('active');
              $(scrolly).children('ul').animate({
                "margin-top": totop
              }, speed, "linear", function(){goToTop('checktop', elem)})
            }
          }  //end if('top')
          if(upDown=='bottom'){
            if(newm<=-margintop){
              elem.removeClass('active');
              elem.siblings('.top').addClass('active');
              $(scrolly).children('ul').css('margin-top', -margintop);
              return false;
            }else{
              var tobottom = newm-maxh;
              elem.siblings('.top').addClass('active');
              $(scrolly).children('ul').animate({
                "margin-top": tobottom
              }, speed, "linear", function(){goToTop('checkbottom', elem)})
            }
          }  //end if('bottom')
        }else{ return false } // end if('.hasClass("")')
      } //end func goToTop
      $(scrolly).siblings('.top').on('click', function(e){
        goToTop('top', $(this));
        e.stopPropagation();
      })
      $(scrolly).siblings('.bot').on('click', function(e){
        goToTop('bottom', $(this));
        e.stopPropagation();
      })
    }
  }
  methods.init();
}
function installDate(){
  var date = new Date();
  var month = date.getMonth();
  var text = '';
  switch(month){
    case 0: text='Январь';break;
    case 1: text='Февраль';break;
    case 2: text='Март';break;
    case 3: text='Апрель';break;
    case 4: text='Май';break;
    case 5: text='Июнь';break;
    case 6: text='Июль';break;
    case 7: text='Август';break;
    case 8: text='Сентябрь';break;
    case 9: text='Октябрь';break;
    case 10: text='Ноябрь';break;
    case 11: text='Декабрь';break;
  }
  return text;
}
function createElem(elem1, elem2){
  var masterElem = elem1;
  var secondaryElem = elem2;
  var listItem = 1;
  var eventCount = 1;
  var secondaryElemBoxLiCount = 0;
  var check = 'true';
  secondaryElem.append('<ul><li></li></ul>')
  function replace (count){
      var sliderItem = masterElem.eq(count);
      var sliderItemImgSrc = sliderItem.find('.news-image').attr('src');
      var sliderItemAHref = sliderItem.parent('a').attr('href');
      var sliderItemATarget = sliderItem.parent('a').attr('target');
      var sliderItemTitle = sliderItem.find('.news-title').text();    
      var secondaryElemBox = secondaryElem.children('ul').children('li').eq(eventCount-1);
      var secondaryElemLiStruct = '';
      secondaryElemLiStruct+= "<li>";
      secondaryElemLiStruct+= "<a class='item' href='#'>";
      secondaryElemLiStruct+= "<span class='item-inner'>";
      secondaryElemLiStruct+= "<img alt='' src=''>";
      secondaryElemLiStruct+= "<span class='item-title'></span>";
      secondaryElemLiStruct+= "</span>";
      secondaryElemLiStruct+= "</a>";
      secondaryElemLiStruct+= "</li>";
      if(count>1&&(count+1)%5==0){listItem++;}
      //alert(listItem + ' count: ' + count + ' eventCount: '+ eventCount);
      if(listItem>eventCount){
          secondaryElem.children('ul').append('<li></li>');
      } 
      if(check=='true'){secondaryElemBox.append('<ul></ul>');check='false';}
      secondaryElemBox.children('ul').append(secondaryElemLiStruct);
      
      secondaryElemBox.find('li').eq(secondaryElemBoxLiCount).find('a').attr('href', sliderItemAHref);

      secondaryElemBox.find('li').eq(secondaryElemBoxLiCount).find('a').attr('target', sliderItemATarget);

      secondaryElemBox.find('li').eq(secondaryElemBoxLiCount).find('img').attr('src', sliderItemImgSrc);
      secondaryElemBox.find('li').eq(secondaryElemBoxLiCount).find('.item-title').text(sliderItemTitle);
      secondaryElemBoxLiCount++;

      if(masterElem.length>5&&count>1&&(count+1)%5==0){eventCount++;check='true';secondaryElemBoxLiCount=0;}

  }
  for(i=0;i<masterElem.length;i++){
      replace(i);
  }
  secondaryElem.children('ul').find('ul').each(function(id, elem){
      $(elem).append("<div class='clear'></div>")
  })
  secondaryElem.children('ul').children('li').each(function(id, elem){
      if($(elem).children().length==0){
          $(elem).remove();
      }
  })
}

function toggle(){
  scrolly('.scrolly.news', 400); scrolly('.scrolly.project', 400); scrolly('.scrolly.vacancies', 400);
  var news = $('.togl1'); var project = $('.togl2'); var vacancies = $('.togl3');
  var hidden = news; hidden.hide(); vacancies.hide();
  $('.fadeMenu a.news').data('start', false);
  $('.fadeMenu a').each(function(id, elem){
      if($(elem).hasClass('news')||$(elem).hasClass('project')||$(elem).hasClass('vacancies')){
          $(elem).on('mouseenter', function(e){

                if($(this).hasClass('news')){
                    project.hide();vacancies.hide();news.show();
                    $(this).addClass('active');
                    $(this).parents('ul').find('.project').removeClass('active');
                    $(this).parents('ul').find('.vacancies').removeClass('active');

                    e.stopPropagation();
                    return false
                }
                if($(this).hasClass('project')){
                    news.hide();vacancies.hide();project.show();
                    $(this).addClass('active'); 
                    $(this).parents('ul').find('.news').removeClass('active');
                    $(this).parents('ul').find('.vacancies').removeClass('active');
                    e.stopPropagation();
                    return false
                }
                if($(this).hasClass('vacancies')){
                    news.hide();project.hide();vacancies.show();
                    $(this).addClass('active'); 
                    $(this).parents('ul').find('.news').removeClass('active');
                    $(this).parents('ul').find('.project').removeClass('active');
                    e.stopPropagation();
                    return false
                }
          })
      }
  })
}

$(function() {


  /*----------*/
  var startx;
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
      //$(app.article).css({"margin-top":(($("body").height()-1200)/4*100/$("body").height())+"%"});

      setTimeout( function() {
        $("article").fadeIn(300);
      }, 100);
      var asa; var canvas; var dcanvas; var gl; var expmt;

      canvas = $('#my-canvas');
      dcanvas = canvas[0];
      expmt = false;
      if ("WebGLRenderingContext" in window) {
          app.webgl = true;
          $.getScript('js/lib/requestAnimFrame.js', function() {
            $.getScript('js/lib/three.js', function() {
              $.getScript('js/lib/JSONLoader.js', function() {
                $.getScript('js/lib/HeadControls.js', function() {
                  $.getScript('js/lib/Loader.js', function() {

                  });
                });
              });
            });
          });
      }
      try { gl = dcanvas.getContext("webgl"); }
      catch (x) { gl = null; }
      if (gl == null) {
          try { gl = dcanvas.getContext("experimental-webgl"); }
          catch (x) { gl = null; }
          if (gl == null) {
              //console.log("but can't speak it");
          }
          else {
             expmt = true;
             //console.log('and speaks it experimentally.');
          }
      } else {
           //console.log('and speaks it natively.');
      }

      if (gl || expmt) {
          //console.log("loading webgl content.");
      } else {
          //console.log("image-only fallback. no webgl.");
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
      $(app.content).addClass("down");
      setTimeout( function() {$(app.content).removeClass("down")  }, 500);
      $(app.content).find(".block_content").hide();
      $("#"+$(_this).attr("data")+"").show();
      $("."+$(_this).attr("data")).addClass("down");
      $("#nav").find("div").removeClass("active");
      $("#nav").find("div").eq($("#"+$(_this).attr("data")+"").index()).addClass("active");
      $(back_side).fadeIn(300);
      setTimeout( function() { app.content_isopen = true }, 500);
      if(app.webgl){
        if($(_this).attr("data-face")=="girl"||$(_this).attr("data-face")=="advokat"||$(_this).attr("data-face")=="programmer"||$(_this).attr("data-face")=="programmer3d"||$(_this).attr("data-face")=="copywriter"||$(_this).attr("data-face")=="girl2"||$(_this).attr("data-face")=="gamedesigner"||$(_this).attr("data-face")=="webdesigner"){
          $("#wgl-app").appendTo("#"+$(_this).attr("data")+" .revard_scene");
          !app.anim_loaded ? (setTimeout( function() {init($(_this).attr("data-face")); app.anim_loaded = true},1000)) : false;
          if(app.anim_loaded){
            window.setFace($(_this).attr("data-face"));
            $("#"+$(_this).attr("data")+" .revard_scene").find("img").css("display","none");
          }
        }else{
          $("#"+$(_this).attr("data")+" .revard_scene").find("img").css("display","block");
        }
      }else{
        $("#"+$(_this).attr("data")+" .revard_scene").find("img").css("display","block");
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
    
    if($(this).data('started')!=true){
      application.open_content(this);$(this).data('started', true);
    }

    

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
    $(app.content).addClass("down");
    $(app.revard).removeClass("down");
    $(back_side).fadeOut(300);
  });

  $(".content").on("click",function(e){
    e.stopPropagation();
  });

  window.onresize = function() {
    /*var resize;
    clearTimeout(resize);
    resize = setTimeout( function() {
      //$(app.article).css({"margin-top":(($("body").height()-1200)/4*100/$("body").height())+"%"});
      
    }, 100);*/
    if($('body').height()<1200&&$('body').height()>=928){
      $('.overflow').height($('body').height());
    }

    var resize;
    clearTimeout(resize);
    resize = setTimeout( function() {
        if($('body').width()<1600&&$('body').width()>1230){
            $('.overflow').css('margin-left', ((1600-$('body').width())/2)*-1)
        }
    }, 100);


  }

window.facesLoaded = false;

function init( name ){

    var renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( 545, 600 );

    var container = document.getElementById( "wgl-app" );
    container.appendChild( renderer.domElement );

    var clock = new THREE.Clock();
    var faceList = ["programmer", "girl", "advokat", "programmer3d", "copywriter", "girl2", "gamedesigner", "webdesigner"];
    var loader = new THREE.JSONLoader();
    var faces = {};
    var scene, camera, character, lookAtPos, mouseVec, loadPercent;

    var loaded = function( ) {

        scene = new THREE.Scene( );

        camera = new THREE.PerspectiveCamera( 45, 545 / 600, 0.1, 1000 );
        camera.position.set( 0, 1.5, 3 );
        camera.lookAt(new THREE.Vector3(0,1,0));

        lookAtPos = new THREE.Vector3(0, 0, camera.position.z - 0.5);
        mouseVec = new THREE.Vector3(0, 0, camera.position.z - 0.5);


        var light = new THREE.PointLight( 0xf4e1b4, 1, 100 );
        light.position.set( 5, 5, 7 );

        var light2 = new THREE.PointLight( 0xf4e1b4, 1, 100 );
        light2.position.set( -5, 5, 7 );

        var xAxis = new THREE.Mesh(
            new THREE.CubeGeometry( 50, 0.01, 0.01 ),
            new THREE.MeshBasicMaterial( { color: 0xff0000} )
        );
        var yAxis = new THREE.Mesh(
            new THREE.CubeGeometry( 0.01, 50, 0.01 ),
            new THREE.MeshBasicMaterial( { color: 0x00ff00} )
        );
        var zAxis = new THREE.Mesh(
            new THREE.CubeGeometry( 0.01, 0.01, 50 ),
            new THREE.MeshBasicMaterial( { color: 0x0000ff} )
        );

        loadFromArr(faceList);

        scene.add( camera );
        scene.add( light );
        scene.add( light2 );

        animate();

    }

    var loadFromArr = function(arr){

        var i = 0;
        var len = arr.length;

        var loadNext = function(){

            loadPercent = i * 100 / len;
            loadPercent = Math.round(loadPercent);

            $("#loader").find(".load_graf").css("width",loadPercent+"%");
            $("#loader").find(".load_text").text(loadPercent + " %");

            i++
            if ( i > len ) {
                window.facesLoaded = true;
                setTimeout( function() {
                  $("#wgl-app").find("canvas").css("opacity","1");
                  $("#loader").fadeOut(200);
                  $("#wgl-app").parent().find("img").fadeOut(300);
                }, 500);
                return;
            }


            //console.log(i)
            loader.load( "assets/characters/" + arr[i-1] + "/" + arr[i-1] + ".js", function( geometry, materials ) {

                var mesh = new THREE.SkinnedMesh(
                    geometry,
                    new THREE.MeshFaceMaterial(materials)
                );
                mesh.visible = false;

                if(name == arr[i-1]) {
                    character = new THREE.HeadControls( mesh, camera, renderer.domElement, scene, true );
                    mesh.visible = true;
                }

                scene.add( mesh );
                //console.log(arr[i-1])
                faces[arr[i-1]] = mesh;

                loadNext();

            })
        }

        loadNext();



    }


    var render = function( ){


        var delta = clock.getDelta( );

        if(character && character.update) character.update( delta );

        renderer.render( scene, camera );

    }

    var animate = function( ) {
        render( );
        requestAnimFrame( animate );
    }

    loaded( );

    window.setFace = function(name){

        for ( var face in faces ) {
            faces[face].visible = false;
        }
        faces[name].visible = true;
        character.setMesh( faces[name] );
    }
}
if($('.about_news').length>0){
  $('a').each(function(id, elem){
    $(elem).on('click', function(e){
      e.stopPropagation;
    })
  })
}

  if($('.content-box').length>0||$('.project').length>0){
    $('.exit').on('click', function(){
      document.location = $(this).attr('href');
    })
    
  }
  if($('.about.project').length>0){
    $('.aboutProjectRightPageSlider').find('a').each(function(id, elem){
      $(elem).on('click', function(){
        document.location = $(this).attr('href');
      })

    })
  }else{
    $('.magazine').on('click', function(e){
      e.stopPropagation();
    })
    $('body').on('click', function(){
        if($('.about').length>0||$('.about_project')>0){ }else{
         $('.magazine').attr('style', '');$(".magazine-page").hide();$(".bg-layout").hide();
        }
    })
    $("a[href='#about']").on("click", function(e) {
      $(".magazine-page").show();
      $(".bg-layout").fadeIn();
      $(".magazine").animate({ "top" : "50%", "margin-top" : "-450px" }, 250)
      e.stopPropagation();
    });
  }

    
    if ($('.magazine').length>0){
      var date = new Date();
      var m = parseInt(date.getMonth());m++;
      var y = parseInt(date.getFullYear());
      $('.magazine').find('.month').text(function(){return installDate()});
      $('.magazine').find('.number').text(function(){
          text = y +" - № " + m;
          return text;
      })
      $('.right-side .exit').on('click', function(e){
        $('body').click();
      })
    }
    if($('.bor').length>0){$(".bor .box").mCustomScrollbar({});}
    
    if($('body').height()<=938){
      $('body').prepend('<div class="overflow"></div>')
      $('.overflow').append($('article'))
    }
});