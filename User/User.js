/*
 * @Author: 杨曦
 * @Date: 2019-12-06 14:11:16
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-19 11:10:30
 * @Version: 
 * @Description: 
 */
//login或校验后
$('#loading').hide()
function Init(){
    let userDetail = JSON.parse(sessionStorage.getItem('userDetail'))
    console.log(userDetail)
    if(userDetail){
        $('.personal-name').html(userDetail.nickName)
        $('.personal-Id').html(userDetail.menteeAcc)
    }else{
        window.location.href = '../../Login/Login.html'
    }
    $('.personal-logout').click(function(){
        sessionStorage.clear('userDetail')
        window.location.reload()
    })
}
Init()