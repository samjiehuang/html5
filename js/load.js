



    var base = function(){
                var isMobile = function(){
             return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(navigator.userAgent)) ;
          }

                   var setScale =function(){
                var phoneMaxWidth =  document.documentElement.clientWidth || 320;
                  var phoneMaxHeight = document.documentElement.clientHeight  ||504;
                  var pageScale = 1;
                  if (phoneMaxWidth / phoneMaxHeight >= 320 / 504) {
                            pageScale =  phoneMaxHeight / 504;
                        } else {
                            pageScale =phoneMaxWidth / 320;
                        };
                var content = 'width=320, initial-scale=' + pageScale + ', maximum-scale=' + pageScale + ', user-scalable=no';
                document.getElementById('viewport').setAttribute('content', content);
                var phoneZoom = document.getElementsByClassName("wall-content")[0];
                var phoneHeight = parseInt(phoneZoom.offsetHeight,10);
                if(phoneMaxWidth>320){
                     var phoneWidth = 320;
                    var left = -(phoneWidth)/2+'px';
                    // $(".wall-content").css({
                    //     'width':"320px",
                    //     'margin-left':left
                    // });
                    phoneZoom.style.cssText +='width :320px;margin-left:'+left+';';
                }
                if(phoneHeight>504){
                    var top = (phoneHeight-504)/2+'px';
                    // $(".wall-content").css({
                    //     'height':"504px",
                    //     'top':top
                    // });
                    phoneZoom.style.cssText +=';height:504px;top : '+top+';';
                }
        }
        

        var phone = function(){

         if (isMobile()) {
                setScale();
            }else{
             document.body.className += 'pc';
            }
        }



            return {
                isMobile:isMobile,
                phone:phone
            }
    }();