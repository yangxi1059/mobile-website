/*
 * @Author: 杨曦
 * @Date: 2019-12-06 14:11:16
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-18 13:32:57
 * @Version: 
 * @Description: 
 */
//login或校验后

/*
 * @Author: 杨曦
 * @Date: 2019-09-30 13:45:54
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-17 11:05:17
 * @Version:
 * @Description: 设置中文播放器 以及Share模块
 */
//ajax请求
tabs()
function tabs() {
    $('.VideoLessonsDetail-header-left').click(function(){
        $('.Video-shortstrong1').stop().animate({height:'0.15rem'},200);
        $('.Video-shortstrong2').stop().animate({height:'0px'},500);
        $('.VideoLivesDetail-list').hide().removeClass('fadeInUp').addClass('fadeOutDown')
        $('.VideoLessonsDetail-list').show().removeClass('fadeOutDown').addClass('fadeInUp')
    })
    $('.VideoLessonsDetail-header-Lives').click(function(){
        $('.Video-shortstrong1').stop().animate({height:'0px'},500);
        $('.Video-shortstrong2').stop().animate({height:'0.15rem'},200);
        $('.VideoLessonsDetail-list').hide().removeClass('fadeInUp').addClass('fadeOutDown')
        $('.VideoLivesDetail-list').show().removeClass('fadeOutDown').addClass('fadeInUp')
    })
}
function VideoLessonsAnimate(Id) {
  $('.live-Sub').click(function(){
    if(getCookie('userInfo')){
      $('.sub').show()
      $('.mask-sub').show()
      event.stopPropagation()
      $("body").css("overflow-y","hidden");
    }else{
      $('.login').show()
      $('.mask-Login').show()
      event.stopPropagation()
      $("body").css("overflow-y","hidden");
    }
  })
  let menteeId = JSON.parse(sessionStorage.getItem('userDetail')).menteeId
  console.log(menteeId)
  $('.btn-cancel').click(function(){
    hideTosubscribe()
  })
  $('.btn-yes').click(function(){
    SuccessTosubscribe(menteeId,Id)
  })
}
function hideTosubscribe(){
  $('.sub').hide()
  $('.mask-sub').hide()
}
// 订阅成功
function SuccessTosubscribe(menteeId,Id){
  let arr = []
  arr.push(Id)
  arr = {liveIdArr:arr}
  $.Myajax({
    url:`mentee/${menteeId}/live`,
    type:'post',
    data:arr
  }).then( res =>{
    console.log(res)
    if(res.code == 200){
      $('#loading').show()
      $('.sub').hide()
      $('.mask-sub').hide()
      Init(Id)
    }else{
      alert('订阅失败，可能课时不够')
    }
  })
}
function Init(Id) {
  var subStatus = 0
  if(sessionStorage.getItem('userDetail')){
    let MenteeId = JSON.parse(sessionStorage.getItem('userDetail')).menteeId;
    $.Myajax({
      // 获取学员已绑定的直播
      url:`mentee/${MenteeId}/liveList`,
      data:{
        pageNum:1,
        pageSize:999
      }
    }).then( res => {
      // console.log(res.data.rows)
      for(let i = 0;i < res.data.rows.length; i++){
        if(res.data.rows[i].liveId == Id){
          subStatus = 1
          InitLiveDetail(subStatus,Id)
        }
      }
      if( subStatus == 0){
        InitLiveDetail(subStatus,Id)
      }
    })
  }else{
    subStatus = 0
    InitLiveDetail(subStatus,Id)
  }
}
//  判断订阅状态后初始化
function InitLiveDetail(subStatus,Id){
  console.log(subStatus)
  $.Myajax({
    url: `live/${Id}/info`
  }).then(res => {
    let data = res.data;
    console.log(data)
    let detailRight = '';
    let htmlDetail = '';
    let html = '';
    window.nums = 0;
    $('#playVideo').css({'background-image':`url('${data.liveCover}')`})
      if(getCookie('userInfo') && subStatus == 1){   // 登录且订阅
          if(data.liveStatus == 0){
            html += `
              <div class="noplay playstatus">
              <div class="icon-status lived ">
              </div>
              <i class="icon-noplay"></i>${data.planTime} 
              <span class="livelines">|</span> 未直播
              </div>`
          }else {
            $.Myajax({
              url:`live/${data.liveId}/playAuth`
            }).then( res => {
              if( res.data.playType == 'live'){
                html += `<div class="startplay playstatus">正在直播</div>`
                InitLive(res.data.playUrl,data.bindCount)
              }else if( res.data.playType == 'video'){
                html += ` <div class="endplay playstatus"> <div class="icon-status lived "></div> <i class="icon-noplay"></i>${data.planTime} | 录播</div>`
                InitVideo({
                  playAuth: res.data.playAuth,
                  videoId: res.data.videoId,
                  planTime: data.planTime
                })
              }else{
                alert('视频错误')
              }
            }).catch( err =>{
              console.log(err)
            })
          }
      }else if(getCookie('userInfo') && subStatus == 0){    // 登录未订阅
        html += `<div class="mask">
          <div class="Live-msg">
              <div class="Livemsg-ImgLogin"></div>
            <div class="Livemsg-title"> 订阅后才可看直播哦～</div>
        </div>`
        if(data.liveStatus == 0){
          html += `<div class="noplay playstatus">
          <div class="icon-status"></div>
          <i class="icon-noplay"></i> ${data.planTime} <span class="livelines">|</span>  未直播
          </div>`
        }else if(data.liveStatus == 1){
          html += `<div class="startplay playstatus">
            <div class="loader-inner line-scale-pulse-out-rapid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span class="liveStatus">Live</span>
          <span class="livelines">|</span>
          <i class="iconfont followIcon icondingyuerenshu"></i>
        <span class="followNums">${data.bindCount}</span>
          </div>`
        }else if(data.liveStatus == 2){
            html += `<div class="endplay playstatus">
            <div class="icon-status"></div>
            <i class="icon-noplay"></i>${data.planTime} | 录播
            </div>`
        }
      }else if(!getCookie('userInfo')){       //未登录状态
          html += `<div class="mask">
          <div class="Live-msg">
              <div class="Livemsg-ImgLogin"></div>
            <div class="Livemsg-title"> 登录订阅后才可看直播哦～</div>
        </div>`
        if(data.liveStatus == 0){
          html += `<div class="noplay playstatus">
          <div class="icon-status"></div>
          <i class="icon-noplay"></i> ${data.planTime} <span class="livelines">|</span>  未直播
          </div>`
        }else if(data.liveStatus == 1){
          html += `<div class="startplay playstatus">
          <div class="loader-inner line-scale-pulse-out-rapid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span class="liveStatus">Live</span>
        <span class="livelines">|</span>
        <i class="iconfont followIcon icondingyuerenshu"></i>
      <span class="followNums">${data.bindCount}</span>
        </div>`
        }else if(data.liveStatus == 2){
            html += `<div class="endplay playstatus">
            <div class="icon-status"></div>
            <i class="icon-noplay"></i>${data.planTime} | 录播
            </div>`
        }
    
      }
      htmlDetail += `<div class="live-intro">
            <div class="live-title">${data.liveTitle}</div>`
      if(subStatus == 1){
        htmlDetail += ` <div class="live-Subed">Subscribed</div>`
      }else{
        htmlDetail += ` <div class="live-Sub">Subscribe</div>`
      }
      htmlDetail +=`</div>
      <div class="live-text">
          ${data.liveIntro}
      </div>
      <div class="live-msg">
            <span class="live-author">${data.liveBy}</span>
            <span class="lines">|</span>
            <span class="live-follow">订阅人数</span>
            <span class="live-nums">${data.bindCount}</span>
        </div>`
      $('#playVideo').html(html)
      $('.VideoLessonsDetail-list').html(htmlDetail)
    // showLogin()
    VideoLessonsAnimate(Id);
  })
}
// 初始化直播
function InitLive(playUrl,bindCount){
  // console.log(playUrl)
    playLive({
      id:"playVideo",
      height:408,
      "source": playUrl.m3u8,
      "width": "100%",
      "autoplay": true,
      "isLive": true,
      "rePlay": false,
      "playsinline": true,
      "preload": true,
      "controlBarVisibility": "hover",
      "useH5Prism": true,
      msg:'1',
      bindCount: bindCount
    })
}
// 初始化录播
function InitVideo(data){
  // console.log(data)
  playVideo({
    height:408,
    playAuth:data.playAuth,
    videoId:data.videoId,
    id:'playVideo',
    autoplay:true,
    times:false,
    msg:'0',
    planTime:data.planTime
  })
}
if (GetQueryString('liveId')) {
  Init(GetQueryString('liveId'));
} else {
  alert('请选择直播课程')
  window.location.href="../VideoLessons/VideoLessons.html";
}
function showLogin () {
  if(getCookie('userInfo')){
  }else{
    $('.Live-tologin').click(function(event){
      $('.login').show()
      $('.mask-Login').show()
      Login()
      event.stopPropagation()
    })
  }
  $('.mask-Login').click(function(){
    $('.login').hide()
    $('.mask-Login').hide()
  })
}







