/*
 * @Author: 杨曦
 * @Date: 2019-09-27 08:21:57
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-15 17:38:05
 * @Version:
 * @Description: 公共头部js
 */

// 获取地址栏数据
function GetQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
// header footer数据渲染
function initHeaderFooter(url) {
	$.ajax({
		url: url,
		success: function (res) {
			let headerListHtml = "";
			let loginHtml = '';
			let footerHtml = '';
			let arr1 = res.data.header.headerLoginmsg;
			let arr2 = res.data.header.headerListMsg;
			let arr3 = res.data.footer;
			for (let i = 0; i < arr2.length; i++) {
				headerListHtml +=
					'<li class="header-top_nav__ul--li"><a  href="' + arr2[i].url + '" >' +
					arr2[i].name +
					'</a><ul class="header-top_li__ul">';
				for (let j = 0; j < arr2[i].detail.length; j++) {
					if (arr2[i].detail.length !== 0) {
						headerListHtml +=
							'<li class="header-top_li__ul--li"><a href="#">' +
							arr2[i].detail[j].name +
							"</a></li>";
					}
				}
				headerListHtml += "</ul></li>";
			}
			loginHtml+=`<div class="header-login">
				<div class="login-flex">
					<div class="header-Login">
						<div class="bg-color"></div>
						<span class="header-top_nav__ul--login" data-toggle="modal" data-target="#myModal">${arr1.other}</span>
					</div></div></div>`;
			window.loginHtml = loginHtml;
			$(".header-top_nav__ul").html(headerListHtml);
			if(getCookie('userInfo') && sessionStorage.getItem('userDetail')){
				let userdata = JSON.parse(sessionStorage.getItem('userDetail'));
				let userHtml = '';
				userHtml += `<div class="header-user">
					<div class="login-flex">
					<div class="header-top_nav__ul--user">
					<div class="person-img">
						<div class="persondetail-img" style="background-image:url('${"../../images/icons/headerHome.png" || userdata.imgUrl}')"></div>
					</div>
					<ul class="my-DropDown">
						<li class="my-DropDown_li0 my-DropDown_li">
							<div class="user-name">${userdata.nickName}</div>
							<div class="user-id">ID：${userdata.menteeAcc}</div>
						</li>
						<li class="my-DropDown_li1 my-DropDown_li">
							<a class="user-center" href="../PersonalCenter/PersonalCenter.html">
									Personal Center
							</a>
							<span class="lines-span"></span>
						</li>
						<li class="my-DropDown_li2 my-DropDown_li">
							<a class="user-myvideo" href="../PersonalCenter/PersonalCenter.html?lesson=L">
								<i class="iconfont  iconshipinsHome-copy iconshipins"></i>
								My Video Lessons
							</a>
						</li>
						<li class="my-DropDown_li3 my-DropDown_li" >
							<a class="user-mylive my-DropDown_li" href="../PersonalCenter/PersonalCenter.html?live=B">
								<i class="iconfont mylive-icon iconzhibo"></i>
								My Live Broadcast
							</a>
							<span class="lines-span lines-span1 "></span>
						</li>
						<li class="user-logout my-DropDown_li">Logout</li>
					</ul>
					</div>
					</div>
					</div>`;
				window.userHtml = userHtml;
				$('.header-top_nav__ul--lastli').html(userHtml);
				userlist();
				ShowMyself();
			}else{
				$('.header-top_nav__ul--lastli').html(loginHtml);
			};
			$('.VerificationCode-title').click(function(){
				getVCode();
			});
			downMenu();
			LoginBtn();
		}
	})
	$.Myajax({
		url:'system/setting?itemIds=qrCode',
	}).then(res => {
		$('.erweima2').html(`<img src="${res.data.qrCode.itemValue}" class="erweima2img"/>`);
	});
}
function ShowMyself() {
	$(".header-top_nav__ul--user").mouseenter(function () {
		$(".my-DropDown").show();
	});
	$(".header-top_nav__ul--user").mouseleave(function () {
		$(".my-DropDown").hide();
	});
	CancellationUser();
}
// 注销按钮
function CancellationUser () {
	$('.user-logout').click(function(){
		clearCookie('userInfo');
		sessionStorage.removeItem('userDetail');
		location.reload();
	});
}
// 中英文切换按钮
function translate(){
	$('.translate').click(function(){
		if(getCookie('language')=='En'){
			initHeaderFooter('../../assets/json/commonCn.json');
			$('.translateCn').css({"color":'rgba(255,255,255,1)'});
			$('.translateEn').css({"color":'rgba(255,255,255,0.70)'});
			setCookie('language','Cn',1);
		}else{
			initHeaderFooter('../../assets/json/commonEn.json');
			$('.translateEn').css({"color":'rgba(255,255,255,1)'});
			$('.translateCn').css({"color":'rgba(255,255,255,0.70)'});
			setCookie('language','En',1);
		};
	});
}
// 中英文状态
function translateStatus (){
	if(getCookie('language')=='Cn'){
		initHeaderFooter('../../assets/json/commonCn.json');
		$('.translateCn').css({"color":'rgba(255,255,255,1)'});
		$('.translateEn').css({"color":'rgba(255,255,255,0.70)'});
	}else if(getCookie('language')=='En'){
		initHeaderFooter('../../assets/json/commonEn.json');
		$('.translateEn').css({"color":'rgba(255,255,255,1)'});
		$('.translateCn').css({"color":'rgba(255,255,255,0.70)'});
	}else{
		initHeaderFooter('../../assets/json/commonEn.json');
		$('.translateEn').css({"color":'rgba(255,255,255,1)'});
		$('.translateCn').css({"color":'rgba(255,255,255,0.70)'});
		setCookie('language','En',1);
	};
	translate();
}
translateStatus()
// 点击登录
function LoginBtn() {
	$('.header-Login').click(function(){
		$('#loading').show();
		window.location.href = '../Login/Login.html';
	});
}
// 头部下拉框选中字体变色
function downMenu() {
	$('.footer-icon_wechat').click(function(event){
		$('.wechat-connect').show().stop().animate({opacity:1,top:'-2.2rem'},500);
		event.stopPropagation();
	});
	$(document).click(function(event){
		$('.wechat-connect').stop().animate({opacity:0,top:'-2.4rem'},500).hide();
	});
	// $('.footer-icon_wechat').click(function(event){
	// 	if( WechatStatus == 0){
	// 		$('.wechat-connect').show().stop().animate({opacity:1,top:'-370px'},500);
	// 		WechatStatus = 1;
	// 	}else{
	// 	}
	// 	event.stopPropagation();
	// })
	// $(document).click(function(){
	// 	$('.wechat-connect').hide().stop().animate({opacity:0,top:'-480px'},500);
	// 	 WechatStatus = 0;
	// });
	$('.iconbotton_2,.iconbotton_1').mouseenter(function(){
		$(this).stop().animate({opacity:.5},500);
	});
	$('.iconbotton_2,.iconbotton_1').mouseleave(function(){
		$(this).stop().animate({opacity:.3},500);
	});
	$('.footer-main_left p').mouseenter(function(){
		$(this).stop().animate({opacity:'1'},200);
	});
	$('.footer-main_left p').mouseleave(function(){
		$('.footer-main_left p').stop().animate({opacity:'0.8'},200);
	});
	$('.footer-main_center p').mouseenter(function(){
		$(this).css({'opacity':'1'});
	});
	$('.footer-main_center p').mouseleave(function(){
		$('.footer-main_center p').css({opacity:'0.8'});
	});
	$('.header-Login').mouseenter(function(){
		$('.bg-color').stop().animate({width:'100%'});
	});
	$('.header-Login').mouseleave(function(){
		$('.bg-color').stop().animate({width:'0%'});
	});
}
// 用户下拉框
function userlist() {
	$('.my-DropDown_li').mouseenter(function(){
		$(this).find('a').addClass('active2');
		$(this).siblings('li').find('a').removeClass('active2');
	});
}
// 弹出框始终居中
function leftTop(obj) {
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();
	var scrolltop = $(document).scrollTop();
	var scrollleft = $(document).scrollLeft();
	var objLeft = (screenWidth - obj.width())/2 + scrollleft  ;
	var objTop = (screenHeight - obj.height())/2 + scrolltop;
	obj.css({left: objLeft + 'px', top: objTop + 'px'});
}
function cancelSpace(e){
    var e = e|| window.event;
    var elm = e.srcElement || e.target;
    var key = e.keyCode || e.charCode;
    if(key == 32){
        if(elm.tagName.toLowerCase()=="input" && elm.type.toLowerCase()=="text" || elm.tagName.toLowerCase() == "textarea"){
            return;
        }
        if(window.event){
            e.returnValue = false;
        }
        else{
            e.preventDefault();
        }
    }
}
$(document).keydown(function(e){
	cancelSpace(e)
})
function touchmove(){
	$(document).on('scroll',function(){//将文档绑定手机滑屏事件
		var TopVaule = $(document).scrollTop();
		if(TopVaule >= 10){
			$('.logo-scrolled').attr('src','../assets/images/icons/mobile-logo_big.png')
			$(".navbar").css({'background':'#fff'});
			$('.header-login').css({'color':'#222'});
			$('.navbar-toggle .fa').css({'color':'#222'})
		}else{
			$('.logo-scrolled').attr('src','../assets/images/icons/mobile-logo.png')
			$(".navbar").css({'background':'none'}); 
			$('.header-login').css({'color':'#fff'})
			$('.navbar-toggle .fa').css({'color':'#fff'})
		}
	})
}
touchmove()

 