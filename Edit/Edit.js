/*
 * @Author: 杨曦
 * @Date: 2019-12-06 14:11:16
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-19 10:54:13
 * @Version: 
 * @Description: 
 */
//login或校验后
$('#loading').hide()
function Init(){
    let userDetail = JSON.parse(sessionStorage.getItem('userDetail'))
    console.log(userDetail)
    if(userDetail){
        $('.edit-id').html(userDetail.menteeAcc)
    }else{
        window.location.href = '../../Login/Login.html'
    }
    $('input').focus(function(){
        $(this).css({
            'opacity':'1'
        })
    })
    $('input').blur(function(){
        $(this).css({
            'opacity':'.5'
        })
    })
    $('.old-pass').blur(function(){
        if( !$('.old-pass').val()){
            link({text:'老密码不能为空', type:'warning'});
        }
    })
    $('.firstpass').blur(function(){
        if( !$('.firstpass').val()){
            link({text:'新密码不能为空', type:'warning'});
        }else{
            if($('.old-pass').val() == $('.firstpass').val()){
                link({text:'新老密码不能相同', type:'warning'});
            }
        }
    })
    $('.againpass').blur(function(){
        if( !$('.againpass').val()){
            link({text:'确认密码不能为空', type:'warning'});
        }
    })
    $('.btn-cancel').click(function(){
        $('input').val('')
    })
    console.log(userDetail)
    $('.btn-ok').click(function(){
        let newpass1 = $('.firstpass').val();
        let newpass2 = $('.againpass').val();
        let oldpass = $('.old-pass').val();
        console.log(newpass1,newpass2,oldpass)
        if(newpass1 && newpass2 && oldpass){
            if(newpass1 == newpass2){
                $.Myajax({
                    url:`mentee/${userDetail.menteeId}/password`,
                    type:'put',
                    data:{
                        oldPassword: oldpass,
                        newPassword: newpass2
                    }
                }).then( res => {
                    console.log(res)
                    if( res.code == 200 ){
                        clearCookie('userInfo');
                        link({text:'密码重置成功请重新登录', type:'warning'});
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000);
                    }
                }).catch( err => {
                    link({text:err, type:'warning'});
                    $('input').val('')
                })
            }else{
                link({text:'请输入两次正确的密码', type:'warning'});
            }
        }else{
            link({text:'请输入完整', type:'warning'});
        }
    })
}
Init()