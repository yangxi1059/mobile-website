/*
 * @Author: 杨曦
 * @Date: 2019-12-21 14:02:00
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-10 14:21:46
 * @Version: 
 * @Description: 阿里云播放器方法
 */

 
function playLive(data) {
  // console.log(data)
  if(data.msg == 1){
    let html = ''
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
    $(`#${data.id}`).append(html)
  }
  var player = new Aliplayer({
      "id": data.id,
      "source": data.source,
      "width": "100%",
      "height": data.height,
      "autoplay": data.autoplay || true,
      "isLive": data.isLive || true,
      "rePlay": data.rePlay || false,
      "playsinline": data.playsinline || true,
      "preload": data.preload || true,
      "controlBarVisibility": "hover",
      "useH5Prism": true,
      skinLayout: [
        {
          "name": "bigPlayButton",
          "align": "blabs",
          "x": 30,
          "y": 80
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
          "name": "controlBar",
          "align": "blabs",
          "x": 0,
          "y": 0,
          "children": [
            {
              "name": "liveDisplay",
              "align": "tlabs",
              "x": 15,
              "y": 6
            },
            {
              "name": "fullScreenButton",
              "align": "tr",
              "x": 10,
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
              "x": 5,
              "y": 10
            }
          ]
        }
      ]
      }, function (player) {
        $(`#${data.id}`).find('.maskvideo').hide();
        $(`#${data.id}`).css({'background-image':''});
    });
    player.on('ended',endedHandle);
    player.on('play',playHandle);
    function playHandle(){
    }
    function endedHandle(){
      alert('直播已经结束，请刷新查看录播')
    }
}

