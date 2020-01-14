/*
 * @Author: 杨曦
 * @Date: 2019-09-30 13:48:12
 * @LastEditors  : 杨曦
 * @LastEditTime : 2020-01-13 09:06:04
 * @Version: 
 * @Description: 
 */
//ajax请求渲染主体
window.num = 1
function displayOffers(newdata) {
  // console.log(newdata)
  // listDetail数据兼容ie
  $.Myajax({
    url: 'offer/list',
    data:{
      applySeason:newdata.applySeason || '2020',
      division:newdata.division || "",
      location:newdata.location || "",
      pageNum:newdata.pageNum || 1,
      pageSize:1000
    }
  }).then(res => {
    // console.log(res);
    let str = '';
        arr1 = res.data.rows;
       for (let i = 0; i < arr1.length; i++) {
         str += `<li class="main-headerul_li--main">
                   <ul class="headerul-ul_li">
                     <li class="main-headerul-mentee">
                       <p class="main-headerul--p">${arr1[i].menteeName}</p>
                     </li>
                     <li class="main-headerul-edu">
                       <p class="main-headerul--p">${arr1[i].schoolName}</p>
                     </li>
                     
                     <li class="main-headerul-offer">
                       <p class="main-headerul--p main-headerul--p_OfferImg" data-class="${arr1[i].praiseVoucherMosaic}">${arr1[i].companyName}</p>
                     </li>
                     <li class="main-headerul-job">
                       <p class="main-headerul--p">${arr1[i].devistion}</p>
                     </li>
                     <li class="main-headerul-review">
                        <p class="main-headerul--p main-headerul--p_ReviewImg" data-class="${arr1[i].resultVoucherMosaic}">Review</p>
                     </li>
                   </ul>
                   
                 </li>`
       };
       $('.offerList-year-span').html(newdata.applySeason);
       $('.offersList-title').html(newdata.title);
       $(".main-headerul").html(str);
       offerClickImg();
      })
    }
   
function reviewClickImg() {
  $(document).click(function () {
    $('.offerul').hide();
    $('.divisionul').hide();
    $('.years-lists').hide();
  });

  $('.offerchoose,.offer-span').click(function(event){
    $('.divisionul').hide();
    $('.years-lists').hide();
    event.stopPropagation();
  });
  $('.data-years').click(function(event){
    $('.offerul').hide();
    $('.divisionul').hide();
    event.stopPropagation();
  });
  $('.offerli').mouseenter(function(){
    $(this).css({'color':'#C32E47'});
    $(this).siblings('li').css({'color':'#3B3B3B'});
  });
  $('.years-detail').mouseenter(function(){
    $(this).css({'color':'#C32E47'});
    $(this).siblings('li').css({'color':'#3B3B3B'});
  });
  $('.jobchoose,.division-span').click(function(event){
    $('.offerul').hide();
    $('.years-lists').hide();
    event.stopPropagation();
  });
  $('.divisionli').mouseenter(function(){
    $(this).css({'color':'#C32E47'});
    $(this).siblings('li').css({'color':'#3B3B3B'});
  });
  $('.divisionli').click(function(event){
    $(this).text();
    $('.division-span').text($(this).text()).attr('data-class',$(this).attr('data-class'));
    let division = $(this).attr('data-class');
    let location = $('.offer-span').attr('data-class');
    let years = $('.years-span').attr('data-class');
    displayOffers({
      applySeason:years,
      location:location,
      division:division
    })
    $('.divisionul').hide();
    event.stopPropagation();
  })
  $('.offerli').click(function(event){
    $('.offer-span').text($(this).text()).attr('data-class',$(this).attr('data-class'));
    let location = $(this).attr('data-class');
    let division = $('.division-span').attr('data-class');
    let years = $('.years-span').attr('data-class');
    displayOffers({
      applySeason:years,
      location:location,
      division:division
    })
    $('.offerul').hide();
    event.stopPropagation();
  })
}
// 点击 Offer received图片去现
function offerClickImg() {
  $('.main-headerul--p_OfferImg').click(function (event) {
    let url = $(this).attr('data-class');
    // console.log(url);
    $('.mask').show();
    $('.white-block').show();
    $('.white-block').children('img').attr("src",url).show();
    $('body').css({
      "overflow-y":"hidden"
      });
    event.stopPropagation();
  })
  $('.main-headerul--p_ReviewImg').click(function (event) {
    let url = $(this).attr('data-class');
    // console.log( $(this).parents('.headerul-ul_li'));
    $('.mask').show();
    $('.review').attr("src",url).show();
    $('body').css({
      "overflow-y":"hidden"
      });
    event.stopPropagation();
  })
  $('.mask').click(function () {
    $('body').css({
      "overflow-y":"scroll"
      });
    $('.mask').hide();
    $('.white-block').hide();
    $('.review').hide()
  })
}
//  点击改变年份重新请求数据渲染页面
function changeYear(){
  $('.years-detail').click(function(event){
    $('.years-span').attr('data-class',$(this).attr('data-class'));
    $('.years-span').text($(this).attr('data-type'));
    $('.years-lists').hide();
    event.stopPropagation();
    let location = $('.offer-span').attr('data-class');
    let division = $('.division-span').attr('data-class');
    let years = $('.years-span').attr('data-class');
    let listDown = offers
    for(let i=0;i<listDown.length;i++){
      if(years == listDown[i].applySeason){
        var arr1 = listDown[i].locationDic;
        var arr2 = listDown[i].divisionDic;
        var title = listDown[i].title;
      };
    };
    arr1.unshift({itemName: "All", itemValue: ""});
    arr2.unshift({itemName: "All", itemValue: ""});
    let html = '';
    let html1 = '';
    for(let i = 0;i<arr1.length;i++){
      html += `
      <li class="offerli" data-class="${arr1[i].itemValue}">${arr1[i].itemName}</li>
      `;
    };
    for(let j=0;j<arr2.length;j++) {
      html1+=`
      <li class="divisionli" data-class="${arr2[j].itemValue}">${arr2[j].itemName}</li>
      `;
    };
    $('.offerul').html(html);
    $('.divisionul').html(html1);
    reviewClickImg();
    displayOffers({
      title:title,
      applySeason:years,
      location:location,
      division:division
    });
  })

}
function Initfirst (data) {
  $.Myajax({
    url:`offer/init`
  }).then(res => {
    window.offers = res.data
    listDown = res.data;
    // console.log(res.data);
    let html = '';
    let html1 = '';
    let html2 = '';
    let arr1 = res.data[0].locationDic;
    let arr2 = res.data[0].divisionDic;
    arr1.unshift({itemName: "All", itemValue: ""});
    arr2.unshift({itemName: "All", itemValue: ""});
    for(let i = 0;i < arr1.length;i++){
      html += `
      <li class="offerli" data-class="${arr1[i].itemValue}">${arr1[i].itemName}</li>
      `;
    }
    for(let j = 0;j < arr2.length;j++) {
      html1 += `
      <li class="divisionli" data-class="${arr2[j].itemValue}">${arr2[j].itemName}</li>
      `;
    }
    for(let k = 0;k < res.data.length;k++){
      html2 += `<li class="years-detail" data-class="${res.data[k].applySeason}" data-type="${res.data[k].applySeason} Recruiting Season">${res.data[k].title}</li>`;
    }
    $('.offerul').html(html);
    $('.divisionul').html(html1);
    $('.years-lists').html(html2);
    displayOffers({
      title: listDown[0].title,
      applySeason: listDown[0].applySeason
    })
    changeYear();
    reviewClickImg();
  })
}
Initfirst()
$(document).ready(function(){
  $('.offerchoose,.offer-span').click(function(event){
    $('.offerul').toggle();
    event.stopPropagation();
  });
  $('.data-years').click(function(event){
    $('.years-lists').toggle();
    event.stopPropagation();
  });
  $('.jobchoose,.division-span').click(function(event){
    $('.divisionul').toggle();
    event.stopPropagation();
  });
})

