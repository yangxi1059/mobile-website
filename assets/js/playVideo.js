/*
 * @Author: 杨曦
 * @Date: 2019-12-21 14:02:00
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-15 18:18:04
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
  alert(data.id)
  var player = new Aliplayer({
    "id": data.id,
    "vid": data.videoId,
    "playauth": data.playAuth,
    "qualitySort": "asc",
    "format": "m3u8",
    "mediaType": "video",
    "width": data.width ||"100%",
    "height": data.height + 'px',
    "autoplay": data.autoplay || true,
    "isLive": data.isLive || false,
    "rePlay": data.rePlay || false,
    "playsinline": data.playsinline || true,
    "controlBarVisibility": "hover",
    "cover": data.storyCover|| '',
    "useH5Prism": true,
    "enableSystemMenu":true,
    "useFlashPrism":data.useFlashPrism || false, // 播放器类型
    "skinLayout": data.skinLayout || [
      // {
      //   "name": "bigPlayButton",
      //   "align": "blabs",
      //   "x": 30,
      //   "y": 80
      // },
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
        "autoplay": data.autoplay || false,
        "isLive": data.isLive || false,
        "rePlay": data.rePlay || false,
        "playsinline": data.playsinline || true,
        "preload": data.preload || true,
        "controlBarVisibility": "hover",
        "useH5Prism": true,
        "enableSystemMenu":true,
        "skinLayout": data.skinLayout || [
          // {
          //   "name": "bigPlayButton",
          //   "align": "blabs",
          //   "x": 30,
          //   "y": 80
          // },
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
                "x": 10,
                "y": 12
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
                "x": 5,
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
        getkeyval();
      }
      function getkeyval(){ //绑定按钮事件
        // console.log($('.prism-big-play-btn').hasClass("playing"))
        $(document).keydown(function(event) {        
          event.preventDefault();      
          if (event.keyCode == 32) {
            if($('.prism-big-play-btn').hasClass("playing")){
              player.pause();
            }else{
              player.play();
            }
          };
        })
      }
    }
  });
}
function endedhandle (data){
}