require.config({
	paths:{
		"jquery":"http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min",
		"music":"music",
		"time":"time",
		"index":"index"
	}
});
require(['jquery','music','time','index'],function($,music,time,index){
	$(function(){


		      var isMobile = base.isMobile();
              var down=isMobile?'touchstart':'mousedown';
              var up= isMobile?'touchend':'mouseup';
              var move=isMobile?'touchmove':'mousemove';

	   if(!isMobile){
	        time.showTime(0,'#timeNow');
			index.mouseScroll('.main');
			index.clickFlip('.main','#page-prev','#page-next');//鼠标单击
	   } 
	     	index.bindEvent('.main',100,down,move,up);
       
         imgLoad(img_list,function(list,num){
                  if(num == list.length){
                  	 $(".percent-process").css('width','160px');
			      	  $(".percent-process").on('webkitTransitionEnd',function(){
			      	  	$(".index-loading").css("display",'none');
			      	  })
			      	  $(".loading-process").on('transitionEnd',function(){
			      	  	$(".index-loading").css("display",'none');
			      	  })
                  }
          });
         music.loadMusic('images/icon.png','#content-music','music',"animate-rotate");
         music.btnAction('#content-music','music',"animate-rotate",down);
	})
	
})