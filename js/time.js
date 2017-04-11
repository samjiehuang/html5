define(['jquery'],function($){
      var state = {
         checkDigit:function(i){
             if(i<10){
                i = "0"+i;
            } ;
            return i ;
         },//判断是否双位数 显示01
         week:[
         '日','一','二','三','四','五','六'
         ],
         monthChines:[
         '一','二','三','四','五','六','七','八','九','十','十一','十二'
         ],
         oneDay:[
           'am','pm'
         ],
         hours24:function(i){

         }
      }//分钟秒钟双位数显示01
     var showTime = function(type,id){
         var time = new Date();
         var  type = type||0;
        var year = time.getFullYear(); 
        var month = time.getMonth()+1; 
        var date = time.getDate(); 
        var d = time.getDay(); 
        var h = time.getHours(); 
        var m = time.getMinutes(); 
        var s = time.getSeconds(); 
        var s = state.checkDigit(s);
        var m = state.checkDigit(m);
        $(id).html(h + ':' + m) ;
        setTimeout(showTime,500);
     }

    return {
       showTime:showTime
    };
});