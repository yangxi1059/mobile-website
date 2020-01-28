/*
 * @Author: 杨曦
 * @Date: 2019-12-06 14:11:16
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-21 11:54:20
 * @Version: 
 * @Description: 
 */
//login或校验后
tabs()
function tabs() {
    $('.VideoLessonsDetail-header-left').click(function(){
        $('.Video-shortstrong1').stop().animate({'width':'70px'},200);
        $('.Video-shortstrong2').stop().animate({'width':'0px'},200);
        $('.VideoLivesDetail-list').hide().removeClass('fadeInUp').addClass('fadeOutDown')
        $('.VideoLessonsDetail-list').show().removeClass('fadeOutDown').addClass('fadeInUp')
    })
    $('.VideoLessonsDetail-header-Lives').click(function(){
      $('.Video-shortstrong1').stop().animate({'width':'0px'},200);
        $('.Video-shortstrong2').stop().animate({'width':'70px'},200);
        $('.VideoLessonsDetail-list').hide().removeClass('fadeInUp').addClass('fadeOutDown')
        $('.VideoLivesDetail-list').show().removeClass('fadeOutDown').addClass('fadeInUp')
    })
}
function Init(Id) {
  $.Myajax({
    url: `course/${Id}/detail`
  }).then(res => {
    let data = res.data;
    let detailRight = '';
    let times = 0;
    let arr = [];
    window.nums = 0;
    console.log(data)
    //  课程封面
    $('#playVideo').css({'background-image':`url('${data.coverUrl}')`})
    
    for (let i = 0; i < data.sectionList.length; i++) {
      arr.push(data.sectionList[i].lessonList.length)
      detailRight += `<li class="video-plan_li">
                    <div class="plan_li-title">
                        <span class="li-title_span1">${data.sectionList[i].sectionName}</span>
                        <span class="class-times">${data.sectionList[i].lessonList.length}课时</span>
                        <span class="class-time">${s_to_hs(Math.ceil(data.sectionList[i].sectionDuration))}</span>
                        <i class="li-title_icon iconfont iconzhankai"></i>
                    </div>
                    <ul class="plan_li-ul plan_li-ul${i}">`
      for (let j = 0; j < data.sectionList[i].lessonList.length; j++) {
        times ++ ;
        nums ++ ;
        if (data.sectionList[i].lessonList[j].videoPublic * 1 != 0) {
          detailRight += `<li class="plan_secondUl-secondLi yesplay" data-class="${data.sectionList[i].lessonList[j].lessonId}">
                    <div class="secondUl-secondLi_main">${data.sectionList[i].lessonList[j].videoTitle}</div>
                    <span class="freeplay iconbofang iconfont"></span>
                    <span class="li-title_time">${s_to_hs(Math.ceil(data.sectionList[i].lessonList[j].videoDuration)) || 0}</span>
                  </li>`
        } else {
          detailRight += `<li class="plan_secondUl-secondLi noplay" data-class="${data.sectionList[i].lessonList[j].lessonId}">
                    <div class="secondUl-secondLi_main">${data.sectionList[i].lessonList[j].videoTitle}</div>
                    <span class="payplay iconfont iconquanxian"></span>
                    <span class="li-title_time">${s_to_hs(Math.ceil(data.sectionList[i].lessonList[j].videoDuration)) || 0}</span>
                  </li>`
        };
      }
      detailRight += `</ul>
      </li>`
    }
    let html = `
        <div class="lessons-title">${data.courseTitle}</div>
        <div class="lessons-text">${data.intro}</div>
        <div class="lessons-msg">
            <span class="lessons-author">${data.author}</span>
            <span class="span-lines">|</span>
            <span class="lessons-Alltimes">总${times}课时</span>
            <span class="span-lines">|</span>
            <span class="lessons-Alltime">总时长${s_to_hs(Math.ceil(data.courseDuration))}</span>
        </div>`
    $('.video-plan_times').html(`${times}课时`)
    $('.video-plan_timeList').html(s_to_hs(Math.ceil(data.courseDuration)))
    $('.lessons-main').html(html)
    $('.video-plan_ul').html(detailRight)
    VideoLessonsAnimate(arr)
    if (getCookie('userInfo')) {
      $('.log-msg').html('Learn More');
      $('.log-msg').click(function(){
        $('.mask').show()
        $('.text-Popup').show()
        $("body").css("overflow-y","hidden");
      })
    } else {
      $('.log-msg').html('VIP Mentees Please Log In First');
      $('.log-msg').click(function(){
        $('.login').show()
        $('.mask-Login').show()
        event.stopPropagation()
        $("body").css("overflow-y","hidden");
      })
    }
  }).catch( err => {
    alert('暂未找到该课程，返回课程列表')
    window.location.href = '../VideoLessons/VideoLessons.html'
  })
}
if (GetQueryString('courseId')) {
  Init(GetQueryString('courseId'));
} else {
  alert('请选择课程')
  window.location.href="../VideoLessons/VideoLessons.html"
}
function Initplayer(lessonId) {
  $('html,body').animate({scrollTop:'0px'},'slow');
  if (lessonId) {
    $.Myajax({
      url: `course/lesson/playAuth`,
      data:{
        lessonId : lessonId
      }
    }).then(res => {
      playVideo({
        videoId: res.data.videoId,
        id: 'playVideo',
        playAuth: res.data.playAuth,
        autoplay: true,
        times:true,
      });
    }).catch(res => {
    })
  }
}
function VideoLessonsAnimate(data) {
  $('.help').click(function(){
    $('.support-lessons').show()
    $('.mask-Login').show()
    event.stopPropagation()
    $("body").css("overflow-y","hidden");

  })
  $('.yesplay').click(function () {
    let lessonId = $(this).attr('data-class');
    Initplayer(lessonId);
  })
  $('.noplay').click(function(){
    if(getCookie('userInfo')){
      $('.mask').show()
      $('.text-Popup').show()
      $("body").css("overflow-y","hidden");

    }else{
      $('.login').show()
      $('.mask-Login').show()
      event.stopPropagation()
      $("body").css("overflow-y","hidden");

    }
  })
  $('.mask-Login').click(function(){
    $('.support-lessons').hide()
    $('.login').hide()
    $('.mask-Login').hide()
    $("body").css("overflow-y","auto");

  })
  $('.btn-cancel').click(function(){
    $('.mask').hide()
    $('.text-Popup').hide()
    $("body").css("overflow-y","auto");
  })
  let iconstatus = 1;
  $('.class-times').fadeOut(200)
  console.log(data)
  $('.video-plan').click(function(){
    console.log(88888888888888)
    if( iconstatus == 0){
      $(this).find('.iconzhankai').css({'transform':'rotate(45deg)'});
      for(let i = 0; i < data.length; i++){
        $(`.plan_li-ul${i}`).show().stop().animate({height:`${data[i] * 0.31}rem` })
      }
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
        height: `${num * 0.31}rem`
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
 
}