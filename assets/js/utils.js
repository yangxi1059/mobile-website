/*
 * @Author: 杨曦
 * @Date: 2019-11-20 17:21:10
 * @LastEditors: 杨曦
 * @LastEditTime: 2019-12-11 16:37:27
 * @Version: 
 * @Description: 
 */
// 设置cookie t=分钟数
function setCookie(key, value, t) {
	if (t == undefined || t == null) {
		t = 60 * 2 * 60;
	}
	if (typeof (t) != 'number') {
		t = 60 * 2 * 60;
	}
	var minutes = t * 60 * 1000 * 60;
	var exp = new Date();
	exp.setTime(exp.getTime() + minutes + 8 * 3600 * 1000);
	//path=/表示全站有效，而不是当前页
	document.cookie = key + "=" + value + ";path=/;expires=" + exp.toUTCString();
}
// getcookie
function getCookie(key) {
	var arr1 = document.cookie.split('; '); //将cookie按“; ”分割，数组元素为： cookie名=cookie值
	for (var i = 0; i < arr1.length; i++) { //分割数组里的每个元素
		var arr2 = arr1[i].split('='); //按照“=”分割
		if (arr2[0] == key) { //如果数组的第一个元素等于给定的cookie名称
			return decodeURI(arr2[1]); //返回翻译编码后的cookie值
		}
	}
}
// 删除cookie
function clearCookie(name) {  
	setCookie(name, "", -1);  
} 
function s_to_hs(s){
	//计算分钟
	//算法：将秒数除以60，然后下舍入，既得到分钟数
	var h;
	h  =   Math.floor(s/60);
	//计算秒
	//算法：取得秒%60的余数，既得到秒数
	s  =   s%60;
	//将变量转换为字符串
	h    +=    '';
	s    +=    '';
	//如果只有一位数，前面增加一个0
	h  =   (h.length==1)?'0'+h:h;
	s  =   (s.length==1)?'0'+s:s;
	return h+':'+s;
  }