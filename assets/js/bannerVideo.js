/*
 * @Author: 杨曦
 * @Date: 2019-12-23 13:47:54
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-09 11:06:57
 * @Version: 
 * @Description: 
 */
jQuery(function($){
    $('.backImg').vidbg({
        'mp4': '../assets/images/img/videoBanner.m4v',
    }, {
    // Options
    muted: true,
    loop: true,
    overlay: false,
    resizing: true,
    });
})