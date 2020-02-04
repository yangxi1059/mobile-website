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
	if(JSON.parse(sessionStorage.getItem('AccessCode'))){
		let data = JSON.parse(sessionStorage.getItem('AccessCode'))
		console.log(data)
		InitCodeList(data)
	}else{
		window.location.href = '../VideoLessons/VideoLessons.html'
	}
})
function InitCodeList(data) {
	console.log(data)
	$('.lineTimee').html(`${data.codeInfo.expirationDate}`);
	let html = '';
	let tags = [];
	for(let i = 0; i < data.courseList.length; i++){
		if(data.courseList[i].tags) {
			data.courseList[i].tags = data.courseList[i].tags.split(";");
			data.courseList[i].tags = data.courseList[i].tags
		}
	};
	// var timesNum = 0;
	// var videoDuration = 0;
	// for(let i = 0; i < data.courseList.length; i++){
	// 	for(let j = 0;j < data.courseList[i].sectionList.length; j++){
	// 		for(let k= 0 ;k < data.courseList[i].sectionList[j].lessonList.length ; k++){
	// 			timesNum ++;
	// 			videoDuration += data.courseList[i].sectionList[j].lessonList[k].videoDuration
	// 			data.courseList[i].timesNum = timesNum;
	// 			data.courseList[i].videoDuration = videoDuration;
	// 		}
	// 	}
	// }
    console.log(data)
	for(let i = 0; i < data.courseList.length; i++){
		html += ` <li class="code-li">
		<div class="codeSection-img" style="background-image:url('${data.courseList[i].coverUrl}')">
			<div class="Img-bg"></div>
		</div>
		<div class="lessons-detail">
			<div class="codeSection-title">${data.courseList[i].courseTitle}</div>
			<div class="labels">`
			for(let m = 0 ; m < data.courseList[i].tags.length;m++){
				html+= `<div class="label">${ data.courseList[i].tags[m]}</div>`
			}
			html += `</div>
			<div class="codeSection-text">
				${data.courseList[i].intro}
			</div>
			<div class="menteeDetail1">
				<span class="menteeDetail">Mentor: ${data.courseList[i].author}</span>
			</div>
			<div class="video-plan">
				<div class="video-plan_list" data-class="${i}">
				<div class="Video-plan_title">List</div>
				<i class="iconfont Video-plan_icon iconzhankai"></i>
			</div>`
			for(let j = 0;j < data.courseList[i].sectionList.length; j++){
			html += 	
			  `<ul class="video-plan_ul video-plan_ul${i}">
				<li class="video-plan_li">
					<div class="plan_li-title">
						<span class="li-title_span1">${data.courseList[i].sectionList[j].sectionName}</span>
						<i class="li-title_icon iconfont iconzhankai"></i>
					</div>
					<ul class="plan_li-ul plan_li-ul${j}">`
					for(let k= 0 ;k < data.courseList[i].sectionList[j].lessonList.length ; k++){
						html += `<li class="plan_secondUl-secondLi yesplay" data-type="${data.courseList[i].sectionList[j].lessonList[k].videoTitle}" 
						data-class="${data.courseList[i].sectionList[j].lessonList[k].lessonId}" data-num="${i}">
							<div class="secondUl-secondLi_main">${data.courseList[i].sectionList[j].lessonList[k].videoTitle}</div>
							<span class="freeplay iconbofang iconfont"></span>
							<span class="li-title_time">${s_to_hs(Math.ceil(data.courseList[i].sectionList[j].lessonList[k].videoDuration))}</span>
						</li>`
					}
					html += `</ul>
				</li>
			</ul>`
			}
		  html += `</div>
		</div>
	</li>`
	}
	$('.code-ul').html(html)
	VideoLessonsAnimate(data)
}
function VideoLessonsAnimate(data) {
	$('.yesplay').click(function () {
      let lessonId = $(this).attr('data-class');    
      let num = $(this).attr('data-num');
      window.location.href = `../accessCodeDetail/accessCodeDetail.html?lessonId=${lessonId}&&num=${num}`
	  Initplayer(lessonId,data);
	})
	let iconstatus = 1;
	$('.class-times').fadeOut(200)
	$('.video-plan_list').click(function(){
	  if( iconstatus == 0){
		$(this).find('.iconzhankai').css({'transform':'rotate(45deg)'});
		let len = $(this).siblings('.video-plan_ul ').find('.plan_li-ul').length;
		for(let i = 0;i < len; i++){
			$(this).siblings(`.video-plan_ul`).find(`.plan_li-ul${i}`).show().
			stop().animate({height:($(this).siblings('.video-plan_ul ').find('.plan_li-ul')[i].getElementsByTagName("li").length) * 0.4 + 'rem' })
		}
		// $(this).siblings('.video-plan_ul ').find('.plan_li-ul').show().stop().animate({height:len * 45 })
		$(this).siblings('.video-plan_ul').find('.iconzhankai').css({'transform': 'rotate(45deg)'})
		$(this).siblings().find('.class-times').fadeOut(200)
		iconstatus = 1;
	  }else{ 
		$(this).find('.iconzhankai').css({'transform':'rotate(0deg)'});
		$(this).siblings('.video-plan_ul').find('.video-plan_li').children('.plan_li-ul').stop().animate({height:'0px'}).hide(200)
		$(this).siblings('.video-plan_ul').find('.iconzhankai').css({'transform': 'rotate(0deg)'})
		$(this).siblings().find('.class-times').fadeIn(200)
		iconstatus = 0
	  }
	})
	$('.plan_li-title').click(function () {
	  let num = $(this).parents('.video-plan_li').find('.plan_li-ul').children().length;
	  if ($(this).parents('.video-plan_li').find('.plan_li-ul').css("display") == 'none') {
		$(this).parents('.video-plan_li').find('.plan_li-ul').show();
		$(this).parents('.video-plan_li').find('.plan_li-ul').stop().animate({
		  height: num * 0.4 + 'rem' 
		});
		$(this).find('.class-times').fadeOut(200)
		// $(this).parents('.video-plan_ul').animate({height:`${ulnum * 42 + num * 42 + 10 +10}px`})
		$(this).find('.li-title_icon').stop().animate({}, function () {
		  $(this).css({
			'transform': 'rotate(45deg)'
		  });
		});
		iconstatus = 1
	  } else {
		$(this).parents('.video-plan_li').find('.plan_li-ul').stop().animate({
		  height: '0px'
		}).hide(0);
		$(this).find('.class-times').fadeIn(200)
		$(this).parents('.video-plan_li').find('.li-title_icon').stop().animate({}, function () {
		  $(this).css({
			'transform': 'rotate(0deg)'
		  });
		});
		iconstatus = 0
	  }
	})
	$('.yesplay').click(function () {
	  $('.yesplay').css({'color': '#898989'})
	  $(this).css({
		'color': '#C32E47'
	  })
	})
	$('.player-cancel').click(function () {
		$('.Toplayer').hide()
		$('.mask-player').hide()
		$('body').css({
			'overflow-y':'auto'
		})
	})
}