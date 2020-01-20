/*
 * @Author: 杨曦
 * @Date: 2019-09-27 08:21:57
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-20 14:38:33
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
							<i class="iconfont icontop_login"></i>
							<span class="header-top_nav__ul--login" data-toggle="modal" data-target="#myModal">${arr1.other}</span>
						</div>
					</div>
				</div>`;
			window.loginHtml = loginHtml;
			$(".header-top_nav__ul").html(headerListHtml);
			if(getCookie('userInfo') && sessionStorage.getItem('userDetail')){
				let userdata = JSON.parse(sessionStorage.getItem('userDetail'));
				let userHtml = '';
				userHtml += `<div class="header-user">
					<div class="login-flex">
					<div class="header-top_nav__ul--user">
					<div class="person-img">
						<a href="../../User/User.html">
							<div class="persondetail-img iconfont icontouxiang" ></div>
						</a>
					</div>
					</div>
					</div>
					</div>`;
				window.userHtml = userHtml;
				$('.header-top_nav__ul--lastli').html(userHtml);
				userlist();
				ShowMyself();
			}else{
				$('.header-top_nav__ul--lastli').html(loginHtml);
				$('.header-login').click(function(){
					$('.login').show()
					$('.mask-Login').show()
					event.stopPropagation()
					$("body").css("overflow-y","hidden");
				})
				$('.mask-Login').click(function(){
					$('.login').hide()
					$('.mask-Login').hide()
					event.stopPropagation()
					$("body").css("overflow-y","auto");
				})
			};
			$('.VerificationCode-title').click(function(){
				getVCode();
			});
			downMenu();
		}
	})
	$.Myajax({
		url:'system/setting?itemIds=qrCode',
	}).then(res => {
		$('.erweima2').html(`<img src="${res.data.qrCode.itemValue}" class="erweima2img"/>`);
		$('.support-erweima').css({'background-image':`url('${res.data.qrCode.itemValue}')`})
	});
}
$('.navbar-toggle').click(function(){
	console.log(111111)
	if($('#navbar-menu').css("display") == 'none'){
		$('.navbar-header').css({'background-color':'#fff'})
	}
})
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

// 头部下拉框选中字体变色
function downMenu() {


	$('.footer-icon_wechat').click(function(event){
		$('.wechat-connect').show().stop().animate({opacity:1,top:'-2.2rem'},500);
		event.stopPropagation();
	});
	$(document).click(function(event){
		$('.wechat-connect').stop().animate({opacity:0,top:'-2.4rem'},500).hide();
	});
	$('.btn-light').click(function(){
		window.location.href = '../../About/About.html'
	})
	
}
// 用户下拉框
function userlist() {
	$('.persondetail-img').click(function(){
		console.log('个人中心')
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
// touchmove()
function link(data) {
    swal({
        text: data.text,
        icon: data.type,
        buttons: {
            cancel: {text: '取消', value: false, visible: true},
		}
    }).then((res) => {
		$('body').css({
			"overflow-y": "auto"
		})
	});
}