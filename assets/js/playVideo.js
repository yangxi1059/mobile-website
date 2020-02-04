/*
 * @Author: 杨曦
 * @Date: 2019-12-21 14:02:00
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-16 14:41:00
 * @Version: 
 * @Description: 阿里云播放器录播方法
 */
 
function playVideo(data) {
  if(data.msg == 0){
    let html = ''
    html += `<div class="endplay playstatus"><i class="icon-noplay"></i>${data.planTime} | 录播视频</div>`
    $(`#${data.id}`).append(html)
  }
  $(`#${data.id}`).find('.btn-play').hide();
  $(`#${data.id}`).find('.maskvideo').hide();
  $(`#${data.id}`).css({'background-image':''});
  $(`#${data.id}`).mouseenter(function(){
    $(this).find('.prism-big-play-btn').animate({'opacity':1},200);
  });
  $(`#${data.id}`).mouseleave(function(){
    $(this).find('.prism-big-play-btn').animate({'opacity':0},200);
  });
  console.log(data)
  var player = new Aliplayer({
    "id": data.id,
    "vid": data.videoId,
    "playauth": data.playAuth,
    "qualitySort": "asc",
    "format": "m3u8",
    "mediaType": "video",
    "width": data.width ||"100%",
    "height": data.height + 'px',
    "autoplay": false,
    "isLive": data.isLive || false,
    "rePlay": data.rePlay || false,
    "playsinline": data.playsinline || true,
    "controlBarVisibility": "hover",
    "cover": data.storyCover|| '',
    "useH5Prism": true,
    "encryptType":1,
    "enableSystemMenu":true,
    "useFlashPrism":data.useFlashPrism || false, // 播放器类型
    "skinLayout": data.skinLayout || [
      {
        "name": "bigPlayButton",
        "align": "blabs",
        "x": 30,
        "y": 80
      },
      {
        "name": "H5Loading",
        "align": "cc"
      },
      {
        "name": "errorDisplay",
        "align": "tlabs",
        "x": 0,
        "y": 0
      },
      {
        "name": "infoDisplay"
      },
      {
        "name": "tooltip",
        "align": "blabs",
        "x": 0,
        "y": 56
      },
      {
        "name": "thumbnail"
      },
      {
        "name": "controlBar",
        "align": "blabs",
        "x": 0,
        "y": 0,
        "children": [
          {
            "name": "progress",
            "align": "blabs",
            "x": 0,
            "y": 44
          },
          {
            "name": "playButton",
            "align": "tl",
            "x": 15,
            "y": 12
          },
          {
            "name": "timeDisplay",
            "align": "tl",
            "x": 10,
            "y": 7
          },
          {
            "name": "fullScreenButton",
            "align": "tr",
            "x": 15,
            "y": 11
          },
          {
            "name": "setting",
            "align": "tr",
            "x": 15,
            "y": 12
          },
          {
            "name": "volume",
            "align": "tr",
            "x": 15,
            "y": 10
          }
        ]
      }
    ],
  }, 
  function (player) {
    // $(document).on("touchstart",function(){
    //   alert('点击了**按钮,马上播放')
    //   player.play()
    // })
    if(data.times){
      player.dispose()
      var player = new Aliplayer({
        "id": data.id,
        "vid": data.videoId,
        "playauth": data.playAuth,
        "qualitySort": "asc",
        "format": "m3u8",
        "mediaType": "video",
        "width": data.width ||"100%",
        "height": data.height + 'px',
        "autoplay": true,
        "isLive": data.isLive || false,
        "rePlay": data.rePlay || false,
        "playsinline": data.playsinline || true,
        "preload": data.preload || true,
        "controlBarVisibility": "hover",
        "useH5Prism": true,
        "encryptType":1,
        "enableSystemMenu":true,
        "skinLayout": data.skinLayout || [
          {
            "name": "bigPlayButton",
            "align": "blabs",
            "x": 30,
            "y": 80
          },
          {
            "name": "H5Loading",
            "align": "cc"
          },
          {
            "name": "errorDisplay",
            "align": "tlabs",
            "x": 0,
            "y": 0
          },
          {
            "name": "infoDisplay"
          },
          {
            "name": "tooltip",
            "align": "blabs",
            "x": 0,
            "y": 56
          },
          {
            "name": "thumbnail"
          },
          {
            "name": "controlBar",
            "align": "blabs",
            "x": 0,
            "y": 0,
            "children": [
              {
                "name": "progress",
                "align": "blabs",
                "x": 0,
                "y": 44
              },
              {
                "name": "playButton",
                "align": "tl",
                "x": 15,
                "y": 12
              },
              {
                "name": "timeDisplay",
                "align": "tl",
                "x": 10,
                "y": 7
              },
              {
                "name": "fullScreenButton",
                "align": "tr",
                "x": 15,
                "y": 11
              },
              {
                "name": "volume",
                "align": "tr",
                "x": 15,
                "y": 10
              }
            ]
          }
        ],
      });
      // console.log(player)
      player.on('ended',endedhandle);
      player.on('play',playhandle);
      function playhandle (){
        $('.playstatus').hide();
      }
    }
  });
}
function ready() {
}
function endedhandle (data) {
}
function playBgVideo (player) {
  alert(898989898989)
  player.play()
  document.removeEventListener("touchstart",playBgVideo,false)
}