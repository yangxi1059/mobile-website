/*
 * @Author: 杨曦
 * @Date: 2019-09-27 08:21:57
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-17 16:23:36
 * @Version: 
 * @Description: 官网首页动画ie10
 */
// 首页视屏渲染
function InitHome(){
    $.Myajax({
		url:'system/setting?itemIds=videoHome',
	}).then(res => {
        let HomeVideoDetail = ` 
        <h3 class="About-h3">ABOUT WST Career</h3>
        <div class="about-main">${res.data.videoHome.itemValue.videoTitle}</div>
        <div class="thumb-img" id="index-about_right" style="background:url(${res.data.videoHome.itemValue.coverURL})">
            <div class="video">
                <div class=" video-play-button btn-play">
                    <i class="ti-control-play"></i>
                </div>
            </div>
        </div>`        
    $('.thumbte').html(HomeVideoDetail)
    $('.btn-play').click(function(){
        InitHomeVideo()
    })
    }).catch(err => {
    })
    $.Myajax({
        url:'course/list',
        data:{
            pageNum:1,
            pageSize:2
        }
    }).then(res => {
        let htmlLessons = '';
        let arr1 = res.data.rows.slice(0,2);
        console.log(arr1)
        let tags = [];
        for (let i = 0;i < arr1.length; i++){
            if(res.data.rows[i].tags) {
                arr1[i].tags = arr1[i].tags.split(";");
            };
            // console.log(arr1[i])
            htmlLessons += `
            <div class="videoLesson-main_text">
                <div class="videoLesson-main_left${i} animated videoLesson-main_left">
                    <a href="./VideoLessonsDetail/VideoLessonsDetail.html?courseId=${arr1[i].courseId}">
                        <div class="img-bgc" style="background-image:url('${arr1[i].coverUrl}')"></div>
                    </a>
                </div>
                <div class="videoLesson-text">
                <div class="videoLesson-detail_text${i} videoLesson-detail_text animated">
                <h2 class="Home-Lessons_title${i} Home-Lessons_title animated">${arr1[i].courseTitle}</h2>
                <div class="tags${i} animated tags">`
                for(let j = 0;j<arr1[i].tags.length; j++){
                    htmlLessons += `<div class="tagDetail">${arr1[i].tags[j]}</div>`
                }
            htmlLessons += `</div>
                <p class="Home-lessons_intro${i} Home-lessons_intro animated">${arr1[i].intro}</p>
                <div class="lessons-detail${i} animated lessons-detail">
                    <span class="lessons-detail_author">${arr1[i].author}</span>
                    <span class="spanlines">|</span>
                    <span class="lessons-detail_times">共${arr1[i].videoCount}课时</span>
                    <span class="spanlines">|</span>
                    <span class="lessons-detail_time">总时长${s_to_hs(Math.ceil(arr1[i].videoDurationTotal))}</span>
                </div>
                <div class="Homebackimg-push1 HomebackimgIcon${i} animated">
                <a href="./VideoLessonsDetail/VideoLessonsDetail.html?courseId=${arr1[i].courseId}">
                    <div class="Homebackimg-push_text1">
                        <span class="Homebackimg-push_span1">MORE DETAILS</span>
                        <i class="Homebackimg-push_i1 iconfont iconhome_knowmore"></i>
                    </div>
                </a>
            </div>
            </div>
                </div>
            </div>`
        }
        $('.videoLesson-main').html(htmlLessons);
    })
}
InitHome()
function InitHomeVideo(data){
    $.Myajax({
        url:`system/home/video/playAuth`
    }).then( res => {
        playVideo({
            id:"index-about_right",
            videoId:res.data.videoId,
            playAuth:res.data.playAuth,
            autoplay:true,
            times:false,
        })
    })
}
