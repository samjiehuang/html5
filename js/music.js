define(['jquery'],function($){       
    　　　　var state={
              musicStart:1
              };
    　　　　var loadMusic = function(url,idBox,id,className){
    　　　　　var box = $(idBox);
              var musicId = document.getElementById(id);
              var img = new Image();
              img.src = url;
              img.onload = function(){
                 img.onload = null;
                 musicId.play();
                 box.addClass(className);
              }
              img.src = url ;
    　　　　};
            var btnAction = function(btn,id,className,down){
                  $(btn).on(down, function () {
                        if (state.musicStart == 1) {
                            document.getElementById(id).pause();
                            state.musicStart = 0;
                        } else {
                            document.getElementById(id).play();
                            state.musicStart = 1;
                        }
                        $(this).toggleClass(className, '');
                        return false;
                  });
            };
    　　　　return {
                loadMusic : loadMusic,
                btnAction : btnAction
    　　　　};
　　});