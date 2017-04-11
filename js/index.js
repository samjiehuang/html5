
    //微传单
define(['jquery'],function($){
    var state = {
        'dataId': 1,
        'canTouch':1,//是否可点击 可滚动;
        'isOnTouchStart':0
    }

     var startX , startY , endX , endY , distanceX , distanceY  , lastId , className ,olClass , phoneTop ,phoneLeft,phoneHeight,phoneWidth,prevId,nextId;

     var init = function(olClassName){
      var className = $(olClassName);
       phoneTop = className.offset().top;
      phoneLeft = className.offset().left;
      phoneHeight = className.height();
      phoneWidth = className.width();
      prevId = parseInt(state.dataId,10) - 1;
      nextId = parseInt(state.dataId,10) + 1;
     }

     var bindEvent = function(olClassName,length,down,move,up){
         init(olClassName);
         pageNum(1,".main",1);
         olClass = olClassName;
          className = $(olClassName + ' section');
         $(olClassName).on(down,function(e){
               if(state.canTouch === 0){
                return false;
               }
                event.preventDefault();
                   startX = e.originalEvent.changedTouches?e.originalEvent.changedTouches[0].pageX:e.clientX;
                   startY = e.originalEvent.changedTouches?e.originalEvent.changedTouches[0].pageY:e.clientY;
                   noAnimate(olClass,state.dataId,prevId,nextId);
                   state.isOnTouchStart = 1;
                        $(document).on(move,function(e){
                                event.preventDefault();
                               if(state.canTouch === 0 ||state.isOnTouchStart===0){
                                return false;
                               }
                               endX = e.originalEvent.changedTouches?e.originalEvent.changedTouches[0].pageX:e.clientX;
                               endY = e.originalEvent.changedTouches?e.originalEvent.changedTouches[0].pageY:e.clientY;
                               // distanceX = endX - startX ;
                               distanceY = endY - startY;

                               if(state.dataId != lastId && distanceY < 0){
                                   pageSwipe(0,olClass,state.dataId,distanceY,nextId,phoneHeight + distanceY,move);
                               } else if(state.dataId != 1 && distanceY>0){
                                   pageSwipe(0,olClass,state.dataId,distanceY,prevId,-phoneHeight + distanceY,move);
                               }
                               if(endY<phoneTop||(endY>(phoneTop+phoneHeight))||(endX<phoneLeft)||(endX>(phoneLeft+phoneWidth)) ) {
                                           pageAnimate(olClass,state.dataId,prevId,nextId);
                                           if(state.dataId != lastId && distanceY < 0){
                                           pageSwipe(1,olClass,state.dataId,-phoneHeight,nextId,0,move); 
                                           }else if(state.dataId != 1 && distanceY>0){
                                            pageSwipe(1,olClass,state.dataId,phoneHeight,prevId,0,move);
                                           }
                                       return false;
                               }//超出范围
                             });
          
         }); 

                     $(olClassName).on(up,function(e){
                         $(document).off(move);
                          if(state.canTouch === 0 ||state.isOnTouchStart===0){
                                    return false;
                                   }
                               pageAnimate(olClass,state.dataId,prevId,nextId);
                               if(state.dataId != lastId && distanceY <  0){
                               pageSwipe(1,olClass,state.dataId,-phoneHeight,nextId,0,move);
                               }else if(state.dataId != 1 && distanceY>0){
                                pageSwipe(1,olClass,state.dataId,phoneHeight,prevId,0,move);
                               }
                     });
         
     };


    var pageSwipe = function(isPageMove,className,id,distance,otherId,otherDistance,move){
      var thispageSwipe = $(className +' section:nth-child('+ id +')');
      var otherpageSwipe =  $(className +' section:nth-child('+ otherId +')');
      var thispageLi =   $(className +' section:nth-child('+ id +') li');
      var otherpageLi = $(className +' section:nth-child('+ otherId +') li');
            thispageSwipe.css({'transform':"translateY("+distance+"px)",
                                                         '-ms-transform':"translateY("+distance+"px)",
                                                         '-webkit-transform':"translateY("+distance+"px)",
                                                         '-moz-transform':"translateY("+distance+"px)",
                                                         '-o-transform':"translateY("+distance+")px)",
                                                         'transform':"translateY("+distance+")px)",
                                                         });
            otherpageSwipe.css({'transform':"translateY("+otherDistance+"px)",
                                                         '-ms-transform':"translateY("+otherDistance+"px)",
                                                         '-webkit-transform':"translateY("+otherDistance+"px)",
                                                         '-moz-transform':"translateY("+otherDistance+"px)",
                                                         '-o-transform':"translateY("+otherDistance+")px)",
                                                         'transform':"translateY("+otherDistance+")px)"
                                                         });
                  otherpageLi.removeClass("displayNone"); 
            if(isPageMove == 1){
                state.isOnTouchStart= 0;
                state.canTouch = 0 ;
                thispageSwipe.on("webkitTransitionEnd", function(){
                    thispageLi.addClass("displayNone"); 
                            state.canTouch = 1 ;
                });
                thispageSwipe.on("transitionend", function(){
                    thispageLi.addClass("displayNone"); 
                            state.canTouch = 1 ;
                });
                   state.dataId = otherId;
                   pageNum(0,className,state.dataId);
                   nextId = state.dataId + 1;
                   prevId = state.dataId - 1;
                   $(document).off(move);
            }else if(isPageMove == 2){
              state.isOnTouchStart= 0;
                state.canTouch = 0 ;
                thispageSwipe.on("webkitTransitionEnd", function(){
                    thispageLi.addClass("displayNone"); 
                });
                thispageSwipe.on("transitionend", function(){
                    thispageLi.addClass("displayNone"); 
                });
                setTimeout(function(){
                            state.canTouch = 1 ;
                },500);
                   state.dataId = otherId;
                   pageNum(0,className,state.dataId);
                   nextId = state.dataId + 1;
                   prevId = state.dataId - 1;
                   $(document).off(move);
            }
           
        };
    var pageAnimate = function(className,id,prevId,nextId){
      var thispageAnimate =  $(className +' section:nth-child('+ id +')');
      var prevpageAnimate =  $(className +' section:nth-child('+ prevId +')');
      var nextpageAnimate =  $(className +' section:nth-child('+ nextId +')');
            thispageAnimate.css({'-webkit-transition':"transform .4s linear",
                                                        '-ms-transition':"transform .4s linear",
                                                        '-moz-transition':"transform .4s linear",
                                                        '-o-transition':"transform .4s linear",
                                                        'transition':"transform .4s linear"
                                                        });
            prevpageAnimate.css({'-webkit-transition':"transform .4s linear",
                                                        '-ms-transition':"transform .4s linear",
                                                        '-moz-transition':"transform .4s linear",
                                                        '-o-transition':"transform .4s linear",
                                                        'transition':"transform .4s linear"
                                                        });
            nextpageAnimate.css({'-webkit-transition':"transform .4s linear",
                                                        '-ms-transition':"transform .4s linear",
                                                        '-moz-transition':"transform .4s linear",
                                                        '-o-transition':"transform .4s linear",
                                                        'transition':"transform .4s linear"
                                                        });
    };
    //transition:none
    var noAnimate = function(className,id,prevId,nextId){
      var thisnoAnimate =  $(className +' section:nth-child('+ id +')');
      var prevnoAnimate =  $(className +' section:nth-child('+ prevId +')');
      var nextnoAnimate =  $(className +' section:nth-child('+ nextId +')');
            thisnoAnimate.css({'-webkit-transition':"none",
                                                        '-ms-transition':"none",
                                                        '-moz-transition':"none",
                                                        '-o-transition':"none"
                                                         });
            prevnoAnimate.css({'-webkit-transition':"none",
                                                        '-ms-transition':"none",
                                                        '-moz-transition':"none",
                                                        '-o-transition':"none"
                                                         });
            nextnoAnimate.css({'-webkit-transition':"none",
                                                        '-ms-transition':"none",
                                                        '-moz-transition':"none",
                                                        '-o-transition':"none"
                                                         });
              prevnoAnimate.off("webkitTransitionEnd");

               prevnoAnimate.off("transitionend");

              nextnoAnimate.off("webkitTransitionEnd");

                nextnoAnimate.off("transitionend");

    };

    var pageNum =function(isFirst,olClassName,id){
        if(isFirst == 1){
           lastId = parseInt($(olClassName + ' section').length,10);          
        }
     $("#totalPage").html(lastId);
     $("#pageNum").html(id);
     var percent = (id/lastId)*100 + '%';
     $(".pageProcess").css('width',percent);
    }

  var pcPageAnimate = function(type){
        if(state.canTouch === 0){
            return false;
        }
         if(type=='next'){
                        if(state.dataId != lastId ){
                            state.canTouch = 0 ;
                           noAnimate(olClass,state.dataId,prevId,nextId);
                           pageAnimate(olClass,state.dataId,prevId,nextId);
                           pageSwipe(2,olClass,state.dataId,-phoneHeight,nextId,0);
                       }
         }else if(type=='prev'){
                          if(state.dataId != 1 ){
                            state.canTouch = 0 ;
                             noAnimate(olClass,state.dataId,prevId,nextId);
                             pageAnimate(olClass,state.dataId,prevId,nextId);
                             pageSwipe(2,olClass,state.dataId,phoneHeight,prevId,0);
                       }
         }
  }

  var phonePageAnimate = function(type){

  }
    //点击事件
    var clickFlip = function(olClassName,prevButton,nextButton){
                 olClass = olClassName;
                  className = $(olClassName + ' section');
                $(prevButton).on('click',function(){
                         pcPageAnimate("prev");
                });
                $(nextButton).on('click',function(){
                         pcPageAnimate("next");
                        
                });

    };


    //鼠标滚动
    var scrollFunc=function(e){ 
        e=e || window.event; 
        if(e.wheelDelta){//IE/Opera/Chrome 
            if(e.wheelDelta < 0){
                         pcPageAnimate("next");
            }else if(e.wheelDelta > 0){
                         pcPageAnimate("prev");

            }
        }else if(e.detail){//Firefox 
            if(e.detail < 0){
                         pcPageAnimate("next");

            }else if(e.detail > 0){
                         pcPageAnimate("prev");

            }
        } 
    } ;

    var mouseScroll = function(olClassName){
         olClass = olClassName;
          className = $(olClassName + ' section');
        if(document.addEventListener){ 
            document.addEventListener('DOMMouseScroll',scrollFunc,false); 
        }
        window.onmousewheel=document.onmousewheel=scrollFunc;
    };
   
     return{
        bindEvent:bindEvent,
        mouseScroll:mouseScroll,
        clickFlip:clickFlip
     };
})

