/*
 * @Author: 杨曦
 * @Date: 2019-12-06 14:11:16
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-17 18:57:23
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
  $('.Tosubscribe-No').mouseenter(function(){
    $(this).stop().animate({backgroundColor: 'rgba(137,137,137,1)'},200)
  })
  $('.Tosubscribe-No').mouseleave(function(){
    $(this).stop().animate({backgroundColor: 'rgba(137,137,137,0.8)'},200)
  })
  $('.Tosubscribe-Yes').mouseenter(function(){
    $(this).stop().animate({backgroundColor: '#b12a40'},200)
  })
  $('.Tosubscribe-Yes').mouseleave(function(){
    $(this).stop().animate({backgroundColor: 'rgba(195,46,71,1)'},200)
  })
  $('.Live-Sub').mouseenter(function(){
    $(this).stop().animate({backgroundColor: '#b12a40'},200)
  })
  $('.Live-Sub').mouseleave(function(){
    $(this).stop().animate({backgroundColor: 'rgba(195,46,71,1)'},200)
  })
  $('.menteeDetailBtn').click(function () {
    if (getCookie('userInfo')) {
      window.location.href = '../PersonalCenter/PersonalCenter.html';
    } else {
      window.location.href = '../Login/Login.html';
    }
  })
  $('.ipt-question').keyup(function(){
    if($(this).val()){
      $(this).css({'opacity':'1','color':'#3B3B3B'})
      $('.btn-question').stop().animate({backgroundColor:'#C32E47'},100)
    }else{
      $(this).css({'opacity':'.5','color':'#898989'})
      $('.btn-question').stop().animate({backgroundColor:'#9F9F9F'},100)
    }
  })
  $('.ipt-question').blur(function(){
    if($(this).val()){
      $(this).css({'opacity':'0.5','color':'#898989'})
      $('.btn-question').stop().animate({backgroundColor:'#C32E47'},100)
    }else{
      $('.btn-question').stop().animate({backgroundColor:'#9F9F9F'},100)
    }
  })
  $('.btn-question').mouseenter(function(){
    if($('.ipt-question').val()){
      $(this).css({backgroundColor: '#b12a40'},200)
    }
  })
  $('.btn-question').mouseleave(function(){
    if($('.ipt-question').val()){
      $(this).css({backgroundColor: 'rgba(195,46,71,1)'},200)
    }
  })
  $('.ipt-question').focus(function(){
    if($(this).val()){
      $(this).css({'opacity':'1','color':'#3B3B3B'})
    }
  })
  $('.Live-Tosub').click(function(event){
    let menteeId = JSON.parse(sessionStorage.getItem('userDetail')).menteeId
    // console.log(menteeId)
    $('.Tosubscribe').show()
    event.stopPropagation()
    $('.Tosubscribe-No').click(function(){
      hideTosubscribe()
    })
    $('.Tosubscribe-Yes').click(function(){
      SuccessTosubscribe(menteeId,Id)
    })
  })
}
function hideTosubscribe(){
  $('.Tosubscribe').hide()
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
      $('.Tosubscribe').hide()
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
  $.Myajax({
    url: `live/${Id}/info`
  }).then(res => {
    let data = res.data;
    console.log(data)
    let detailRight = '';
    let LoginHtml = ''
    let times = 0;
    let html = ''
    window.nums = 0;
      if(getCookie('userInfo') && subStatus == 1){   // 登录且订阅
          if(data.liveStatus == 0){
            html += `<div class="noplay playstatus"><i class="icon-noplay"></i>${data.planTime} <span class="livelines">|</span> 未直播</div>`
          }else {
            $.Myajax({
              url:`live/${data.liveId}/playAuth`
            }).then( res => {
              if( res.data.playType == 'live'){
                html += `<div class="startplay playstatus">正在直播</div>`
                InitLive(res.data.playUrl,data.bindCount)
              }else if( res.data.playType == 'video'){
                html += `<div class="endplay playstatus"><i class="icon-noplay"></i>${data.planTime} | 录播</div>`
                InitVideo({
                  playAuth: res.data.playAuth,
                  videoId: res.data.videoId,
                  planTime: data.planTime
                })
              }else{
                alert('视频错误')
              }
            }).catch( err =>{
              // console.log(err)
            })
          }
          html += `</div><div class="Video-block" id="playVideo" style="background-image:url('${data.liveCover}')">
          </div>
            </div>
            <div class="Video-introduction">
              <h2 class="Video-introduction_title">
                ${data.liveTitle}
              <div class="Live-Nosub">Subscribed<i class="icon-subed"></i> </div>
              </h2>
              <div class="LiveAuthor">
                <i class="author-icon iconfont"></i>
                <span class="auth-Name">${data.liveBy}</span>
                <i class="follow-icon iconfont"></i>
                <span class="followNums">
                  订阅人数
                  <span class="followpeople">${data.bindCount}</span>
                </span>
              </div>
              <p class="Video-introduction_p">${data.liveIntro}</p>
            </div>
          </div>`
          // 登录状态下的聊天区域
          if(res.data.liveStatus == 1){
            if(res.data.liveSpan){
              detailRight += `
              <div class="LiveHeader">
                <h2 class="Liveright-title">
                  Questions
                  <div class="Liveheader-lines"></div>
                </h2>
              </div>
              <div class="Liveright-chat">
                <div class="chatermsg-block">
                    <div class="chatblock">
                      <div class="chater-img"></div>
                      <div class="chater-msg">
                        <div class="chater-user">
                          <div class="chater-user_top">
                            <div class="chater-Name">Sally</div>
                            <div class="chater-time">12-18</div>
                          </div>
                        <div class="chater-question">Why xxxtention why ?</div>
                      </div>
                    </div>
                  </div>
              </div>`
              $('.ipt-block').html(`<div class="submitQuestion">
              <div class="ipt-text">
                  <span class="input-title">Q &nbsp:</span>
                  <input type='text' style='display:none'> 
                  <input type="text" placeholder="输入问题" class="ipt-question"  readonly onclick="this.removeAttribute('readonly')" autocomplete="off">
                  <button class="btn-question">Send</button>
              </div>
              </div>`)
            }else{
              detailRight += `
              <div class="LiveHeader">
                <h2 class="Liveright-title">
                Questions
                <div class="Liveheader-lines"></div>
                </h2>
              </div>
              <div class="Liveright-msg">
                <div class="Liveright-img"></div>
                <div class="Liveright-main">暂时还没有人提问哦~</div>
              </div>`
              $('.ipt-block').remove()
            }
          }else if(res.data.liveStatus == 2){
            detailRight += `
            <div class="LiveHeader">
              <h2 class="Liveright-title">
              Questions
              <div class="Liveheader-lines"></div>
              </h2>
            </div>
            <div class="Liveright-msg">
              <div class="Liveright-img"></div>
              <div class="Liveright-main">暂时还没有人提问哦~</div>
            </div>`
            $('.ipt-block').remove()
          }else if(res.data.liveStatus == 0){
            detailRight += `
          <div class="LiveHeader">
            <h2 class="Liveright-title">
            Questions
            <div class="Liveheader-lines"></div>
            </h2>
          </div>
          <div class="Liveright-msg">
            <div class="Liveright-img"></div>
            <div class="Liveright-main">暂时还没有人提问哦~</div>
          </div>`
           
            $('.ipt-block').remove()
          }
        }
        
        else if(getCookie('userInfo') && subStatus == 0){    // 登录未订阅
          html += `<div class="mask">
            <div class="Live-msg">
                <div class="Livemsg-ImgLogin"></div>
              <div class="Livemsg-title"> 订阅后才可看直播哦～</div>
          </div>`
          if(data.liveStatus == 0){
            html += `<div class="noplay playstatus"><i class="icon-noplay"></i> ${data.planTime} <span class="livelines">|</span>  未直播</div>`
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
              html += `<div class="endplay playstatus"><i class="icon-noplay"></i>${data.planTime} | 录播</div>`
          }
          html += `</div><div class="Video-block" id="playVideo" style="background-image:url('${data.liveCover}')"></div>
          </div>
          <div class="Video-introduction">
            <h2 class="Video-introduction_title">
              ${data.liveTitle}
            <div class="Live-Sub Live-Tosub">Subscribe</div></h2>
            <div class="LiveAuthor">
              <i class="author-icon iconfont"></i>
              <span class="auth-Name">${data.liveBy}</span>
              <i class="follow-icon iconfont"></i>
              <span class="followNums">
                订阅人数
                <span class="followpeople">${data.bindCount}</span>
              </span>
            </div>
            <p class="Video-introduction_p">${data.liveIntro}</p>
          </div>
        </div>`
        // 登录且未订阅下的聊天区域
        detailRight += `
        <div class="LiveHeader">
          <h2 class="Liveright-title">
          Questions
          <div class="Liveheader-lines"></div>
          </h2>
        </div>
        <div class="Liveright-msg">
          <div class="Liveright-img"></div>
          <div class="Liveright-main">订阅后才可查看</div>
        </div>`
        }else if(!getCookie('userInfo')){       //未登录状态
          html += `<div class="mask">
          <div class="Live-msg">
              <div class="Livemsg-ImgLogin"></div>
            <div class="Livemsg-title"> 登录订阅后才可看直播哦～</div>
        </div>`
        if(data.liveStatus == 0){
          html += `<div class="noplay playstatus"><i class="icon-noplay"></i>${data.planTime} <span class="livelines">|</span>  未直播</div>`
        }else if(data.liveStatus == 1){
          html += `<div class="playstatus">
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
            html += `<div class="endplay playstatus"><i class="icon-noplay"></i>${data.planTime} | 录播</div>`
        }
        html += `</div><div class="Video-block" id="playVideo" style="background-image:url('${data.liveCover}')"></div>
        </div>
        <div class="Video-introduction">
          <h2 class="Video-introduction_title">
            ${data.liveTitle}
          <div class="Live-Sub Live-tologin">Subscribe</div></h2>
          <div class="LiveAuthor">
            <i class="author-icon iconfont"></i>
            <span class="auth-Name">${data.liveBy}</span>
            <i class="follow-icon iconfont"></i>
            <span class="followNums">
              订阅人数
              <span class="followpeople">${data.bindCount}</span>
            </span>
          </div>
          <p class="Video-introduction_p">${data.liveIntro}</p>
        </div>
      </div>`
      // 未登录状态下的聊天区域
      detailRight += `
      <div class="LiveHeader">
        <h2 class="Liveright-title">
        Questions
        <div class="Liveheader-lines"></div>
        </h2>
      </div>
      <div class="Liveright-msg">
        <div class="Liveright-img"></div>
        <div class="Liveright-main">登录订阅后才可查看哦～</div>
      </div>`
      }
    $('.block').html(detailRight);
    $('.VideoLessons-detail_left').html(html);
    $('#loading').delay(1500).hide(0)

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
    // console.log(9999999)
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







