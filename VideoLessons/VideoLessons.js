/*
 * @Author: 杨曦
 * @Date: 2019-12-13 10:16:49
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-20 14:54:05
 * @Version: 
 * @Description: VideoLessons页面 初始化直播和录播列表
 */

//  分页

window.num = 1
function InitVideoLessonsList () {
    // 初始化默认第一页
    let data = arguments[0]?arguments[0]:1;
    $.Myajax({
        url:`course/list?pageNum=${data}&&pageSize=21`
    }).then(res => {
        console.log(res.data);
        let Videototal = res.data.total;
        let tags = [];
        for(let i=0;i<res.data.rows.length;i++){
            if(res.data.rows[i].tags) {
                res.data.rows[i].tags = res.data.rows[i].tags.split(";");
            };
        };
        // console.log(res.data);
        let html = '';
        for(let i = 0; i < res.data.rows.length; i++){
            html += `<li class="VideoLessonsDetail-li">
            <div class="block-overflow">
                <div class="VideoLessonsDetail-li_top"  style="background-image:url('${res.data.rows[i].coverUrl}')"></div>
                <a href="../VideoLessonsDetail/VideoLessonsDetail.html?courseId=${res.data.rows[i].courseId}">
                <div class="block-videoImg">
                    <div class="VideoLessonsDetail-li_More">
                        <div class="MoreDeatil-text">MORE DETAILS</div>
                        <i class="MoreDeatil-icon iconfont iconstories_more"></i>
                    </div>
                    </div>
                </a>
            </div>
            <h2 class="VideoLessonsDetail-title">
                    ${res.data.rows[i].courseTitle}
            </h2>
            <div class="VideoLessonsDetail-Label">
            <div class="labels-list">`
            if(res.data.rows[i].tags) {
                for(let j=0; j<res.data.rows[i].tags.length;j++) {
                    html += `<div class="Label">${res.data.rows[i].tags[j]}</div>`;
                };
            }else{
                html += `<div class="Label">none</div>`;
            }
            html += `</div><p class="VideoLessonsDetail-p">${res.data.rows[i].intro}</p>
            <div class="VideoInformation">
                <span class="Mentor-Video">${res.data.rows[i].author}</span>
                <span>|</span>
                <span class="Mentor-times">共${res.data.rows[i].videoCount}课时</span>
                <span>|</span>
                <span class="Mentor-time">总时长${s_to_hs(Math.ceil(res.data.rows[i].videoDurationTotal))}</span>
            </div>
        </li>`
        }
        $('.VideoLessonsDetail-ul').html(html);
        VideoAnimation1();
        pageNum({num:num,pageNum:res.data.total});
    }).catch(err =>{
    });
}
function pageNum(data) {
    data.pageNum = Math.ceil(data.pageNum/21);
    $("#page").paging({
        nowPage: data.num || 1, // 当前页码
        pageNum: data.pageNum, // 总页码
        buttonNum: 10, //要展示的页码数量
        canJump: 0,// 是否能跳转。0=不显示（默认），1=显示
        showOne: 0,//只有一页时，是否显示。0=不显示,1=显示（默认）
        callback: function (num) { //回调函数
            window.num = num ;
            InitVideoLessonsList(num);
        }
    })
    if(data.pageNum === 0){
        $("#page").html('');
    };
}
function VideoAnimation1() {
    $('.block-overflow').mouseenter(function(){
        $(this).find('.block-videoImg').stop().animate({backgroundColor:'rgba(0,0,0,.5)'});
        $(this).find('.VideoLessonsDetail-li_top').css({'transform':'scale(1.1)'});
        $(this).find('.MoreDeatil-text').stop().animate({right:'24px'},500).siblings('i').stop().animate({opacity:'1'},500);
    });
    $('.block-overflow').mouseleave(function(){
        $(this).find('.block-videoImg').stop().animate({backgroundColor:'rgba(72,89,102,.2)'});
        $(this).find('.VideoLessonsDetail-li_top').css({'transform':'scale(1)'});
        $(this).find('i').stop().animate({opacity:'0'},500).siblings('.MoreDeatil-text').stop().animate({right:'0px'},500);
    });
}
InitVideoLessonsList()
window.livenum = 1
function InitVideoLivesList () {
    // 初始化默认第一页
    let data = arguments[0]?arguments[0]:1;
    $.Myajax({
        url:`live/online/list`,
        type:'get',
        data: {
            pageNum:1,
            pageSize:21
        }
    }).then(res => {
        let Videototal = res.data.total;
        console.log(res.data)
        let html = '';
        for(let i = 0; i < res.data.rows.length; i++){
            html += `<li class="VideoLessonsDetail-li">
            <div class="block-overflow">
                <div class="VideoLessonsDetail-li_top"  style="background-image:url('${res.data.rows[i].liveCover}')"></div>
                <a href="../VideoLivesDetail/VideoLivesDetail.html?liveId=${res.data.rows[i].liveId}">
                <div class="block-videoImg">`
                if(res.data.rows[i].liveStatus == 0){
                    html += `<div class="Waitstatus">
                        <i class="icon-status lived "></i>
                        <span class="liveStatus">${res.data.rows[i].planTime}</span>
                        <span class="livelines">|</span>
                        <i class="iconfont followIcon"></i>
                        <span class="followNums">未直播</span>
                    </div>`
                } else if(res.data.rows[i].liveStatus == 1){
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
                    <span class="followNums">${res.data.rows[i].bindCount}</span>
                </div>`
                }   else if(res.data.rows[i].liveStatus == 2){
                    html += `<div class="playedstatus">
                        <i class="icon-status lived"></i>
                        <span class="liveStatus">${res.data.rows[i].planTime}</span>
                        <span class="livelines">|</span>
                        <i class="iconfont followIcon"></i>
                        <span class="followNums">录播</span>
                    </div>`
                }
                html += `<div class="VideoLessonsDetail-li_More">
                            <div class="MoreDeatil-text">MORE DETAILS</div>
                            <i class="MoreDeatil-icon iconfont iconstories_more"></i>
                        </div>
                    </div>
                </a>
            </div>
            <h2 class="VideoLessonsDetail-title">
                    ${res.data.rows[i].liveTitle}
            </h2>
            <p class="VideoLessonsDetail-p">${res.data.rows[i].liveIntro}</p>
            <div class="VideoInformation">
                <span class="Mentor-Video">${res.data.rows[i].liveBy}</span>
                <span>|</span>
                <span class="Mentor-times">订阅人数&nbsp
                    <span class="followNums">
                        ${res.data.rows[i].bindCount}
                    </span>
                </span>
            </div>
        </li>`
        }
        if(html == ''){
            $('.video-block').show()
        }else{
            $('.VideoLivesDetail-ul').html(html);
            VideoAnimation2();
        }
        pageNumLive({livenum:livenum,pageNum:res.data.total});
    });
}
function pageNumLive(data) {
    data.pageNum = Math.ceil(data.pageNum/21);
    $("#pageLives").paging({
        nowPage: data.livenum || 1, // 当前页码
        pageNum: data.pageNum, // 总页码
        buttonNum: 10, //要展示的页码数量
        canJump: 0,// 是否能跳转。0=不显示（默认），1=显示
        showOne: 0,//只有一页时，是否显示。0=不显示,1=显示（默认）
        callback: function (num) { //回调函数
            window.livenum = num ;
            InitVideoLivesList(livenum);
        }
    })
    if(data.pageNum === 0){
        $("#pageLives").html('');
    };
}
function VideoAnimation2() {
    $('.block-overflow').mouseenter(function(){
        $(this).find('.block-videoImg').stop().animate({backgroundColor:'rgba(0,0,0,.5)'});
        $(this).find('.VideoLessonsDetail-li_top').css({'transform':'scale(1.1)'});
        $(this).find('.MoreDeatil-text').stop().animate({right:'24px'},500).siblings('.MoreDeatil-icon').stop().animate({opacity:'1'},500);
    });
    $('.block-overflow').mouseleave(function(){
        $(this).find('.block-videoImg').stop().animate({backgroundColor:'rgba(72,89,102,.2)'});
        $(this).find('.VideoLessonsDetail-li_top').css({'transform':'scale(1)'});
        $(this).find('.MoreDeatil-icon').stop().animate({opacity:'0'},500).siblings('.MoreDeatil-text').stop().animate({right:'0px'},500);
    });
}
tabs()
function tabs() {
    pageNum({num:1})
    $('.VideoLessonsDetail-header-left').click(function(){
        $('.video-block').hide()
        $('.Video-shortstrong1').stop().animate({height:'0.15rem'},200);
        $('.Video-shortstrong2').stop().animate({height:'0px'},500);
        InitVideoLessonsList()
        $('.VideoLivesDetail-list').hide().removeClass('fadeInUp').addClass('fadeOutDown')
        $('.VideoLessonsDetail-list').show().removeClass('fadeOutDown').addClass('fadeInUp')
        pageNum({num:1})
    })
    $('.VideoLessonsDetail-header-Lives').click(function(){
        $('.video-block').hide()
        $('.Video-shortstrong1').stop().animate({height:'0px'},500);
        $('.Video-shortstrong2').stop().animate({height:'0.15rem'},200);
        InitVideoLivesList()
        $('.VideoLessonsDetail-list').hide().removeClass('fadeInUp').addClass('fadeOutDown')
        $('.VideoLivesDetail-list').show().removeClass('fadeOutDown').addClass('fadeInUp')
        pageNumLive({livenum:1})
    })
}



