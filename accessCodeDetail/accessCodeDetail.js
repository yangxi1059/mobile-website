/*
 * @Author: 杨曦
 * @Date: 2020-01-15 15:26:53
 * @LastEditors: 杨曦
 * @LastEditTime: 2020-01-15 15:38:56
 * @Version: 
 * @Description: 
 */
$(document).ready(function(){
	$('#loading').delay(1500).hide(0)
	let lessonId = GetQueryString('lessonId');
	let num = GetQueryString('num');
	if(JSON.parse(sessionStorage.getItem('AccessCode'))){
		let data = JSON.parse(sessionStorage.getItem('AccessCode'))
		console.log(data)
		if( num && lessonId ){
			let arr = data.courseList[num]
			InitAccessCodeDetail(lessonId,arr,data.codeInfo.accessCode)
			Initplayer(lessonId,data.codeInfo.accessCode)
		}else{
			window.location.href = '../accessCode/accessCode.html'
		}
	}else{
		window.location.href = '../VideoLessons/VideoLessons.html'
	}
	
})
function InitAccessCodeDetail(lessonId,arr,accessCode) {
	console.log(arr)
	let html = '';
	html += `<div class="video-plan">
				<div class="video-plan_list" >
				<div class="Video-plan_title">List</div>
				<i class="iconfont Video-plan_icon iconzhankai"></i>
			</div>
			  <ul class="video-plan_ul">`
			  for(let i = 0; i < arr.sectionList.length; i++){
				html +=`<li class="video-plan_li">
							<div class="plan_li-title">
								<span class="li-title_span1">${arr.sectionList[i].sectionName}</span>
								<i class="li-title_icon iconfont iconzhankai"></i>
							</div>
							<ul class="plan_li-ul">`
					for(let k= 0 ;k < arr.sectionList[i].lessonList.length ; k++){
						html += `
						<li class="plan_secondUl-secondLi yesplay" data-type="${arr.sectionList[i].lessonList[k].videoTitle}" 
							data-class="${arr.sectionList[i].lessonList[k].lessonId}" data-num="${i}">
							<div class="secondUl-secondLi_main">${arr.sectionList[i].lessonList[k].videoTitle}</div>
							<span class="freeplay iconbofang iconfont"></span>
							<span class="li-title_time">${s_to_hs(Math.ceil(arr.sectionList[i].lessonList[k].videoDuration))}</span>
						</li>`
					}
					html += `</ul></li>`
			  	}	
			html += `</ul></div>`
		$('.lessonList').html(html)
		AnimationCode(accessCode)
}
function Initplayer(lessonId,accessCode){
	$.Myajax({
		url:'/course/lesson/access/playAuth',
		data:{
			accessCode:accessCode,
			lessonId:lessonId
		}
	}).then( res => {
		console.log(res)
		playVideo({
			videoId: res.data.videoId,
			id: 'player-Video',
			playAuth: res.data.playAuth,
			autoplay: true,
			times:true,
		})
	})
}
function AnimationCode(accessCode) {
	$('.yesplay').click(function(){
		let lessonId = $(this).attr('data-class')
		Initplayer(lessonId,accessCode)
	})
}