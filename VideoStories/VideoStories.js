/*
 * @Author: 杨曦
 * @Date: 2019-09-30 13:45:54
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-22 15:30:55
 * @Version:
 * @Description: 设置中文播放器 以及Share模块
 */
//ajax请求
window.num = 1;
var BaseUrl = "";
function displayVideos() {
  let data = arguments[0]?arguments[0]:1;
  // console.log(data)
  let html = "";
  $.Myajax({
    url:'story/list',
    data: {
      pageNum: data.num || 1,
      pageSize: 9,
    }
  }).then(res => {
    let data = res.data.rows
    console.log(data);
    // <div class="iconfont iconbofanganniu ">
                
    //           </div>
    //           <div class="play-text">PLAY VIDEO</div>
    for (let i = 0; i < data.length; i++) {
      html += `<li class="video-list_ul--li" data-class="${i}">
      <div class="list_ul--li-img" id="player-con${i}" style="background-image:url('${data[i].storyCover || '../assets/images/img/about2@2x.png'}')">
        <div class="maskvideo">
          <div class=" video-play-button btn-play" data-class="${data[i].storyId}">
              <i class="ti-control-play"></i>
          </div>
        </use>
      </div>
      </div>
      <div class="list_ul--li-main">
      <div class="Videomain-icon">
      </div>
      <div class="ul--li-main">
        <h2 class="ul--li-main_h2">${data[i].storyTitle}</h2>
      <p class="ul--li-main_p">${data[i].storyIntro}</p>
      </div>
      </div>
      </li>`
    }
    pageNum({num:num,pageNum:res.data.total});
    $(".video-list_ul").html(html);
    ToShare();
    videoList();
  })
}
displayVideos();
function ToShare(){
  $(".img_header-share").mouseenter(function () {
    var imgUrl = $(this).parent().siblings('.imgBg').attr('data-class');
    var elementId = $(this).attr('data-id');
    $(this).children(".shareList").show();
    Share(elementId,{videoUrl:'',imgUrl:imgUrl});
  });
  $(".img_header-share").mouseleave(function () {
    $(this).children(".shareList").hide();
  });
}
function videoDetail (storyId) {
  console.log(storyId,99999999)
  $.Myajax({
    url:`story/video/playAuth`,
    data:{
      storyId: storyId.storyId
    }
  }).then( res => {
    console.log(res)
    playVideo({
      videoId:res.data.videoId,
      playAuth:res.data.playAuth,
      id:storyId.id,
      useFlashPrism:false,
      times:true
    })
  })
}
function videoList () {
  $('.btn-play').click(function(){
    let storyId = $(this).attr('data-class');
    let storyCover = $(this).attr('data-type');
    let id = $(this).parents('.list_ul--li-img').attr('id');
    videoDetail({
      storyId:storyId,
      id:id,
    })
  })
}
function pageNum(data) {
  data.pageNum = Math.ceil(data.pageNum/9);
  console.log(data)
  $("#page").paging({
    nowPage: data.num || 1, // 当前页码
    pageNum: data.pageNum || 1, // 总页码
    buttonNum: 10, //要展示的页码数量
    canJump: 0,// 是否能跳转。0=不显示（默认），1=显示
    showOne: 0,//只有一页时，是否显示。0=不显示,1=显示（默认）
    callback: function (num) { //回调函数
        window.num = num ;
        displayVideos({num:num});
    }
  })
  if(data.pageNum === 0){
    $("#page").html('');
  };
}
pageNum({num:1})