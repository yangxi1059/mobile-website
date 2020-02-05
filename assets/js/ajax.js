/*
 * @Author: 杨曦
 * @Date: 2019-11-18 08:55:34
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-20 14:39:45
 * @Version: 
 * @Description: 
 */

window.jQuery.Myajax = (arg) => {
	// let baseUrl = 'http://192.168.1.199:1114/api-test/';
	// let baseUrl = 'http://192.168.1.199:2001/';
	// let baseUrl = 'http://192.168.1.105:2011/';
	// let baseUrl = 'http://192.168.1.199:1213/wb-api-dev/';
	let baseUrl = 'http://www.pageguo.com:1214/wb-api-test/';
	// let baseUrl = 'http://www.wallstreettequila.com:1215/wb-api-prod/'
	// let baseUrl = 'http://apple-free-day.51vip.biz/wb-api-dev/'

	// let baseUrl = 'http://192.168.1.105:1213/wb-api-dev/';
	// let baseUrl = 'http://192.168.1.199:1214/wb-api-test/';
	if(!getCookie('userInfo')){
		sessionStorage.removeItem('userDetail')
	}
	if(!sessionStorage.getItem('userDetail')){
		clearCookie('userInfo')
	}
	let time;
	clearTimeout(time);
	time = setTimeout(() => {
		clearCookie('userInfo');
		sessionStorage.removeItem('userDetail');
		if(getCookie('userInfo')){
			sessionStorage.removeItem();
			alert('长时间未操作已自动登出');
		}
	}, 1800000);

	if(arg.type == 'post' || arg.type == 'put' ){
		arg.data = aes_rsa.encrypt(arg.data)
		arg.data = JSON.stringify(arg.data)
	}
	arg.type = arg.type || 'get';
	arg.url = baseUrl + arg.url || '';
	arg.headers = {
		Accept: "application/json;charset=utf-8",
		'Content-Type' : 'application/json;charset=utf-8',
		Authorization:getCookie('userInfo')||'',
	}
	return new Promise((resolve,reject)=>{
		$.ajax(arg).then(
			(res,statusText,req)=>{
				if(req.status === 200){
					if(res.code === 200){
						if(res.data && res.key){
							res.data = aes_rsa.decrypt(res.data,res.key)
						}
						resolve(res);
					$('#loading').delay(1500).hide(0)
				}else if(res.code === 401) {
					clearCookie('token');
					sessionStorage.removeItem();
					reject(res.message || '请重新登录');
				}else if( res.code === 30001 ){
					clearCookie('token');
					sessionStorage.removeItem();
					reject(res.message || '');
				}else{
					reject(res || '错误了');
				}
			}else if(req.status === 401){
				sessionStorage.removeItem();
				clearCookie('token');
				reject(res.message || '请重新登录');
			}else{
				clearCookie('token');
				reject(res.message);
			}
		})
	})
};