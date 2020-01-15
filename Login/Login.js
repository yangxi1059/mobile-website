/*
 * @Author: 杨曦
 * @Date: 2019-12-06 14:11:16
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-15 18:50:14
 * @Version: 
 * @Description: 
 */
//login或校验后
function Login() {
	$('#loading').hide()
	$('.userName').val('');
    $('.passWord').val('');
	$('.userName').focus(function(){
		$(this).css({"color":"rgba(54, 59, 62, 1)","opacity":1});
        $('.login-username').css({"borderColor":"rgba(195,46,71,1)"});
	});
	$('.passWord').focus(function(){
		$(this).css({"color":"rgba(54, 59, 62, 1)","opacity":1});
        $('.login-password').css({"borderColor":"rgba(195,46,71,1)"});
	});
	$('.userName').blur(function(){
		$('.login-username').css({"borderColor":"rgba(54,59,62,.2)"});
		if($(this).val()){
			$(this).css({"opacity":1});
		}else{
			$(this).css({"opacity":.5});
		};
	});
	$('.passWord').blur(function(){
		$('.login-password').css({"borderColor":"rgba(54,59,62,.2)"});
        $('.iconpassword').css({"color":"rgba(89,89,89,1)"});
		if($(this).val()){
			$(this).css({"opacity":1});
		}else{
			$(this).css({"opacity":.5});
		};
	});
	$('.passWord').on("input",function() {
		if($('.passWord').val()) {
			$('.iconpassword').css({"color":"rgb(195,46,71)",'opacity':'1'});
		}else{
			$('.iconpassword').css({"color":"rgb(54,59,62)",'opacity':'.5'});
		};
	});
	$('.passWord').keydown(function(event) {              
		if (event.keyCode == 13) {
			if($(".userName").val() && $(".passWord").val()) {
				$('.loader-icon').show().delay(2000).hide(0);
				$('.iconpassword').hide().delay(2000).show(0);
			};
		};
	});
	$('.iconpassword').click(function(){
		LoginCheck();
	});
	$(document).keydown(function(event) {              
		if (event.keyCode == 13) {
			LoginCheck();
		};
	});
	ShowMyself();
}
function LoginCheck() {
	var data = {};
		if($(".userName").val() && $(".passWord").val()) {
			$('.loader-icon').show().delay(2000).hide(0);
			$('.iconpassword').hide().delay(2000).show(0);
		};
		if ($(".userName").val() && $(".passWord").val()) {		 
			data.account = $(".userName").val();
			data.password = $('.passWord').val();
			$.Myajax({
				url:'login/mentee',
				type: 'post',
				data:data,
			}).then(res => {
				if(res.code == 200){
					// console.log(res);
					//     // 记住密码为7天 最少2小时  
					let data = {
						imgUrl: res.data.menteeInfo.imgUrl,
						menteeAcc: res.data.menteeInfo.menteeAcc,
						menteeId: res.data.menteeInfo.menteeId,
						nickName: res.data.menteeInfo.nickName
					};
					setCookie('userInfo',res.data.token,6);
					sessionStorage.setItem('userDetail',JSON.stringify(data),6);
					window.location.replace('../../');
				}
			}).catch(err => {
				console.log(err)
				link({text:err,type:'warning'});
			});
		} else {
		}
}
Login()
function touchmove(){
	$(document).on('scroll',function(){//将文档绑定手机滑屏事件
		var TopVaule = $(document).scrollTop();
		
	})
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
touchmove()