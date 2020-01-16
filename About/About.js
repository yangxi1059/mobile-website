/*
 * @Author: 杨曦
 * @Date: 2019-12-04 09:13:28
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-16 14:37:21
 * @Version: 
 * @Description: 
 */

if(GetQueryString('target') == 'joinUs'){
    $('html,body').animate({scrollTop:'3800px'},300);
}
$(document).ready = function(){
    $('#loading').show()
    $('#loading').delay(2000).hide(0)
}
tabs()
function tabs() {
    $('.VideoLessonsDetail-header-left').click(function(){
        $('.Video-shortstrong1').stop().animate({height:'0.15rem'},200);
        $('.Video-shortstrong2').stop().animate({height:'0px'},500);
        // $('.VideoLivesDetail-list').hide().removeClass('fadeInUp').addClass('fadeOutDown')
        // $('.VideoLessonsDetail-list').show().removeClass('fadeOutDown').addClass('fadeInUp')
    })
    $('.VideoLessonsDetail-header-Lives').click(function(){
        $('.Video-shortstrong1').stop().animate({height:'0px'},500);
        $('.Video-shortstrong2').stop().animate({height:'0.15rem'},200);
        // $('.VideoLessonsDetail-list').hide().removeClass('fadeInUp').addClass('fadeOutDown')
        // $('.VideoLivesDetail-list').show().removeClass('fadeOutDown').addClass('fadeInUp')
    })
}