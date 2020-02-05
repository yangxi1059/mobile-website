/*
 * @Author: 杨曦
 * @Date: 2019-12-06 14:11:16
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-18 14:44:55
 * @Version: 
 * @Description: 
 */
//login或校验后
function Init(){
    let userDetail = JSON.parse(sessionStorage.getItem('userDetail'))
    console.log(userDetail)
    if(userDetail){
        $('.personal-name').html(userDetail.nickName)
        $('.personal-Id').html(userDetail.menteeAcc)
    }else{
        alert('请先登录')
        window.location.href = '../../Login/Login.html'
    }
}
Init()
InitVideoList()
function InitVideoList() {
    let menteeId = JSON.parse(sessionStorage.getItem('userDetail')).menteeId;
    $.Myajax({
        url:`mentee/${menteeId}/courseList`,
        data:{
            pageNum:1,
            pageSize:999
        }
    }).then(res => {
        console.log(res);
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
        if(html){
            $('.VideoLessonsDetail-ul').html(html);
            $('.video-block').hide()
        }else{
            $('.video-block').show()
        }
        $('#loading').delay(1500).hide(0)
    })
}
function InitVideoLivesList(num) {
    let menteeId = JSON.parse(sessionStorage.getItem('userDetail')).menteeId;
    $.Myajax({
        url:`mentee/${menteeId}/liveList`,
        data:{
            pageNum:num || 1,
            pageSize:999
            }
    }).then(res => {
            console.log(res)
            let aliveList = '';
            let LiveDetails = res.data.rows;
            for(let i = 0;i < LiveDetails.length; i++){
                aliveList += `<li class="Video-detail_li">
                <a href="../VideoLivesDetail/VideoLivesDetail.html?liveId=${LiveDetails[i].liveId}">
                `
                    if(LiveDetails[i].liveStatus == 0){
                        aliveList += `<div class="block-overflow noselected" id="playVideo${i}" data-class="${LiveDetails[i].liveId}">
                            <div class="VideoLessonsDetail-li_top"  style="background-image:url('${LiveDetails[i].liveCover || 'https://bucket-wst-website-dev.oss-cn-shanghai.aliyuncs.com/cover/1/20191213/小猫图片.png'}')"></div>
                            <div class="block-videoImg">
                            <div class="Waitstatus">
                                <i class="icon-status Waitliving"></i>
                                <span class="liveStatus">${LiveDetails[i].planTime}</span>
                                <span class="livelines">|</span>
                                <i class="iconfont followIcon"></i>
                                <span class="followNums">开始直播</span>
                            </div>
                                <div class="VideoLessonsDetail-li_More">
                                        <div class="MoreDeatil-text">MORE DETAILS</div>
                                        <i class="MoreDeatil-icon iconfont iconstories_more"></i>
                                    </div>
                                </div>
                            </div>`
                    }else if(LiveDetails[i].liveStatus == 1){
                        aliveList += `<div class="block-overflow" id="playVideo${i}" data-class="${LiveDetails[i].liveId}">
                            <div class="VideoLessonsDetail-li_top"  style="background-image:url('${LiveDetails[i].liveCover || 'https://bucket-wst-website-dev.oss-cn-shanghai.aliyuncs.com/cover/1/20191213/小猫图片.png'}')"></div>
                            <div class="block-videoImg">
                                <div class="playstatus">
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
                                </div>
                                <div class="VideoLessonsDetail-li_More">
                                        <div class="MoreDeatil-text">MORE DETAILS</div>
                                        <i class="MoreDeatil-icon iconfont iconstories_more"></i>
                                </div>
                                </div>
                            </div>`
                    }else if(LiveDetails[i].liveStatus == 2){
                        aliveList += `<div class="block-overflow" id="playVideo${i}" data-class="${LiveDetails[i].videoId}" data-type="2">
                            <div class="VideoLessonsDetail-li_top"  style="background-image:url('${LiveDetails[i].liveCover || 'https://bucket-wst-website-dev.oss-cn-shanghai.aliyuncs.com/cover/1/20191213/小猫图片.png'}')"></div>
                            <div class="block-videoImg">
                                <div class="playedstatus">
                                    <i class="icon-status lived"></i>
                                    <span class="liveStatus">${LiveDetails[i].planTime}</span>
                                    <span class="livelines">|</span>
                                    <i class="iconfont followIcon"></i>
                                    <span class="followNums">录播</span>
                                </div>
                                <div class="VideoLessonsDetail-li_More">
                                        <div class="MoreDeatil-text">MORE DETAILS</div>
                                        <i class="MoreDeatil-icon iconfont iconstories_more"></i>
                                </div>
                            </div>
                            </div>`
                    }else if(LiveDetails[i].liveStatus == 3){
                        aliveList += `<div class="block-overflow" id="playVideo${i}" data-class="${LiveDetails[i].videoId}" data-type="2">
                            <div class="VideoLessonsDetail-li_top"  style="background-image:url('${LiveDetails[i].liveCover || 'https://bucket-wst-website-dev.oss-cn-shanghai.aliyuncs.com/cover/1/20191213/小猫图片.png'}')"></div>
                            <div class="block-videoImg">
                                <div class="playedstatus">
                                    <i class="icon-status lived"></i>
                                    <span class="liveStatus">${LiveDetails[i].planTime}</span>
                                    <span class="livelines">|</span>
                                    <i class="iconfont followIcon"></i>
                                    <span class="followNums">录播</span>
                                </div>
                                <div class="VideoLessonsDetail-li_More">
                                        <div class="MoreDeatil-text">MORE DETAILS</div>
                                        <i class="MoreDeatil-icon iconfont iconstories_more"></i>
                                </div>
                            </div>
                            </div>`
                    }
                    else if(LiveDetails[i].liveStatus == 4){
                        aliveList += `<div class="block-overflow" id="playVideo${i}" data-class="${LiveDetails[i].videoId}" data-type="2">
                            <div class="VideoLessonsDetail-li_top"  style="background-image:url('${LiveDetails[i].liveCover || 'https://bucket-wst-website-dev.oss-cn-shanghai.aliyuncs.com/cover/1/20191213/小猫图片.png'}')"></div>
                            <div class="block-videoImg">
                                <div class="playedstatus">
                                    <i class="icon-status lived"></i>
                                    <span class="liveStatus">${LiveDetails[i].planTime}</span>
                                    <span class="livelines">|</span>
                                    <i class="iconfont followIcon"></i>
                                    <span class="followNums">录播</span>
                                </div>
                                <div class="VideoLessonsDetail-li_More">
                                        <div class="MoreDeatil-text">MORE DETAILS</div>
                                        <i class="MoreDeatil-icon iconfont iconstories_more"></i>
                                </div>
                            </div>
                            </div>`
                    }
                    aliveList += `<div class="Video-detail_text">
                        <h3 class="Video-detail_h3">${LiveDetails[i].liveTitle}</h3>
                        <div class="Video-detail_main">
                            <span class="author">${LiveDetails[i].updateBy}</span>
                            <span class="lines">|</span>
                            <span class="follow">订阅人数</span>
                            <span class="Akey Akey1">${LiveDetails[i].bindCount}</span>
                        </div>
                    </div>
                    </a>
                </li>`
            }
            if(aliveList){
                $('.VideoLivesDetail-ul').html(aliveList);
                $('.video-block').hide()
            }else{
                $('.video-block').show()
            }
            // pageNumLives({
            //     pageNum:res.data.total,
            //     num:window.num1
            // })
    })
}
tabs()
function tabs() {
    // pageNum({num:1})
    $('.VideoLessonsDetail-header-left').click(function(){
        $('.Video-shortstrong1').stop().animate({height:'0.15rem'},200);
        $('.Video-shortstrong2').stop().animate({height:'0px'},500);
        InitVideoList()
        $('.VideoLivesDetail-list').hide().removeClass('fadeInUp').addClass('fadeOutDown')
        $('.VideoLessonsDetail-list').show().removeClass('fadeOutDown').addClass('fadeInUp')
        // pageNum({num:1})
    })
    $('.VideoLessonsDetail-header-Lives').click(function(){
        $('.Video-shortstrong1').stop().animate({height:'0px'},500);
        $('.Video-shortstrong2').stop().animate({height:'0.15rem'},200);
        InitVideoLivesList()
        $('.VideoLessonsDetail-list').hide().removeClass('fadeInUp').addClass('fadeOutDown')
        $('.VideoLivesDetail-list').show().removeClass('fadeOutDown').addClass('fadeInUp')
        // pageNumLive({livenum:1})
    })
}