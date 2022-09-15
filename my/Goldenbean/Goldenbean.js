// svg
var player = new SVGA.Player('.eggimg');
var parser = new SVGA.Parser('.eggimg'); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
player.loops=1;

var playerId = 0;
// var EquipmentCode = '';

var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
    getPlayerGUID();
};
//调用iOS获取用户ID,设备号方法//
function getPlayerGUID() {
    window.webkit.messageHandlers.getPlayerGUID.postMessage(null);//调用iOS获取用户ID方法
    // window.webkit.messageHandlers.getDeviceUUID.postMessage(null);//调用iOS获取用户设备号方法
    // window.webkit.messageHandlers.getPlayerName.postMessage(null);//调用iOS获取用户名方法
};
// //获取ios用户设备号//
// function sendPlayerDevice(getDeveiceUUID){
//     EquipmentCode=getDeveiceUUID;
//     index();
// }
// //获取安卓用户设备号//
// function sendDeviceUUID(getDeveiceUUID) {
//     EquipmentCode=getDeveiceUUID;
//     index();
// };
//获取安卓，ios用户ID//
function sendPlayerGUID(playerGUID) {
    playerId = playerGUID;
    index();
};
// //获取安卓，ios用户名//
// function sendPlayerName(playername) {
//     var playername = playername;
// };


$('.myInput').off().on('click',function(){
    $('.bluediamondtext').show();
    $('.rechargebtn').show();
});
$('.myInput').on("input",function(){
    var myInputVal = $('.myInput').val();
    $('.bluediamondtext>span').text(myInputVal*100);
    var spantext=$('.bluediamondtext>span').text();
    // console.log(spantext);
    if(spantext==NaN || spantext=='NaN'){
        $('.bluediamondtext>span').text(0);
    }
});

$('.rechargebtn').off().on('click',function(){
    var myInputVal = $('.myInput').val();
    $('.moneytext>span').text(myInputVal);
    $('.diamondtext>span').text(myInputVal*100);
    $('.backG_black, .paymentpopupbox').show();
})
$('.backbtn').off().on('click',function(){
    $('.backG_black, .paymentpopupbox').hide();
})

$('.wechatbtn').off().on('click',function(){
    setupForm(102);
})
$('.alipaybtn').off().on('click',function(){
    setupForm(103);
})
function setupForm(e) {
    var u = navigator.userAgent,
    o = $('.myInput').val()*100,
    n =  !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    r = "xxxxx?payMethod=" + e + "&PlayerId=" + 49133 + "&money=" + o + "&_t=" + (new Date).getTime();
    n && (r += "&os=" + n),
    location.href = r
}
