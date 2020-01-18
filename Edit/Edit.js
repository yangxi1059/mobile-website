/*
 * @Author: 杨曦
 * @Date: 2019-12-06 14:11:16
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-18 13:50:15
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
        alert('请先登录')
        window.location.href = '../../Login/Login.html'
    }
}
Init()