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

// 财富
$('.wealthbtn').off().on('click',function(){
    $('.wealthbtn').addClass('wealthAdd');
    $('.charmbtn').removeClass('charmAdd');
    $('.experiencevaluebtn').removeClass('experiencevalueAdd');
    $('.wealthbox').show();
    $('.charmbox').hide();
    $('.experiencevaluebox').hide();
});
// 魅力
$('.charmbtn').off().on('click',function(){
    $('.wealthbtn').removeClass('wealthAdd');
    $('.charmbtn').addClass('charmAdd');
    $('.experiencevaluebtn').removeClass('experiencevalueAdd');
    $('.wealthbox').hide();
    $('.charmbox').show();
    $('.experiencevaluebox').hide();
});
// 经验值
$('.experiencevaluebtn').off().on('click',function(){
    $('.wealthbtn').removeClass('wealthAdd');
    $('.charmbtn').removeClass('charmAdd');
    $('.experiencevaluebtn').addClass('experiencevalueAdd');
    $('.wealthbox').hide();
    $('.charmbox').hide();
    $('.experiencevaluebox').show();
});