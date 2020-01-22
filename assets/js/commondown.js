/*
 * @Author: 杨曦
 * @Date: 2020-01-20 14:37:46
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-22 09:51:26
 * @Version: 
 * @Description: 
 */
function down(){
    $('.navbar-toggle').click(function(){
        console.log(9889898)
		if($('#navbar-menu').css("display")=='none'){
			$('.navbar-header').css({'backgroundColor':'#fff'})
			$('.logo-scrolled').css("cssText", "display:none !important;")
			$('.header-top_nav__ul--login').css({'color':"#c32e47"})
			$('.logo-display').css("cssText", "display:block !important;")
			$('.header-login').css({'color':'#c32e47'})
			$('.navbar-toggle .fa').css({'color':'#c32e47'})
			$('.persondetail-img').css({'color':'#c32e47'})
			$('body').css({
				'overflow-y':'hidden'
			})
		}else{
			setTimeout(() => {
				$('.navbar-header').stop().animate({'backgroundColor':'transparent'},300)
				$('.logo-scrolled').css("cssText", "display:block !important;")
				$('.logo-display').css("cssText", "display:none !important;")
				$('.header-top_nav__ul--login').css({'color':"#fff"})
				$('.header-login').css({'color':'#fff'})
				$('.navbar-toggle .fa').css({'color':'#fff'})
				$('.persondetail-img').css({'color':'rgba(255,255,255,0.4)'})
			}, 400);
			$('body').css({
				'overflow-y':'auto'
			})
		}
	})
}
$(document).ready(function(){
    setTimeout(() => {
        down()
    }, 200);
})