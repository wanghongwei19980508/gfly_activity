/**
 * Created by Administrator on 2017/9/1.
 */

/*--------------------------------将此文件引用在活动js前面-------------------------------------*/
/*--------------如需要在此js下拿用户id，将此js引入到页头hade内或者通过创建一个html标签隐藏，将id填充到此标签text()内，再通过text()取----------------*/

/*function sendPlayerGUID(playerGUID) {
    //获取用户ID
    $('.playid').text(playerGUID);
    //playid = playerGUID
}
//调用iOS获取用户ID
function getPlayerGUID() {
    window.webkit.messageHandlers.getPlayerGUID.postMessage(null);
}*/
//getPlayerGUID();


//调用ios跳转的个人信息页方法,传入用户id
function getIosPersonDetails (type) {
    window.webkit.messageHandlers.getIosPersonDetails.postMessage(type);
}
//调用Android跳转的个人信息页方法,值传入用户id
function getAndroidPersonDetails (type) {
    window.moshi.getAndroidPersonDetails(type);
}

//调用iOS跳转房间方法,传入房间id
function getiosGotochatroom(type) {
    window.webkit.messageHandlers.gotochatroom.postMessage(type);
}
//调用Android跳转房间方法,传入房间id
function getAndroidGotochatroom(type) {
    window.moshi.getAndroidGotochatroom(type);
}

//调用ios方法拉起Safari浏览器传url跳转到此url页面
function goSafari (type) {
    window.webkit.messageHandlers.goSafari.postMessage(type);
}
//调用安卓方法拉起外部浏览器传url跳转到此url页面(应用内更新使用)
function getBrowser (type) {
    window.moshi.getBrowser(type);
}

//调用安卓方法拉起外部浏览器传url跳转到此url页面
function getBrowser2 (type) {
    window.moshi.getBrowser2(type);
}

//调用安卓自定义分享方法
// type: 类型   title：标题    text：内容   url：链接   icon：图片（直接写图片名）
//@param type 0微信好友  1qq好友 2朋友圈  3qq空间
function getAndroidAtWillShare(type,title,text,url,icon) {
    window.moshi.getAndroidAtWillShare(type,title,text,url,icon);
}
//调用ios自定义分享的方法
/*function iOSShareCustom({type:_type,title:_title,text:_text,url:_url,icon:_icon}) {
    window.webkit.messageHandlers.iOSShareCustom.postMessage({type:_type,title:_title,text:_text,url:_url,icon:_icon});  通过对象方式传入key:value
}*/

//ios调用邀请方法,传入type类型0,1,2  //@param type 0微信好友  1qq好友 2通讯录
function getShareRedRain(type) {
    window.webkit.messageHandlers.shareRedRain.postMessage(type);
}
//安卓调用邀请方法,传入type类型0,1,2  //@param type 0微信好友  1qq好友 2通讯录
function getAndroidRedRain(type) {
    window.moshi.getAndroidRedRain(type);
}

//ios应用内邀请和分享的方法，以图片的形式分享出去，传入type类型1,2,3    1 微信。2 QQ。 3 手机
function sharePicIos(type) {
    window.webkit.messageHandlers.sharePic.postMessage(type);
}
//安卓应用内分享和邀请的方法，以图片的形式分享出去，传入type类型1,2,3    1 微信。2 QQ。 3 手机
function sharePicAndroid(type) {
    window.moshi.sharePic(type);
}

//ios跳转我的钱包
function goMyWalletIos() {
    window.webkit.messageHandlers.goMyWallet.postMessage(null);
}
//安卓跳转我的钱包
function goMyWalletAndroid() {
 window.moshi.goMyWallet();
 }

//Android去充值
function goRecharge() {
    window.moshi.goRecharge();
};
//iOS去充值
function iosGoRecharge() {
    window.webkit.messageHandlers.iosGoRecharge.postMessage(null);
};

//Android去升级
function upgrade() {
    window.moshi.upgrade();
};
//iOS去升级
function iosUpgrade() {
    window.webkit.messageHandlers.iosUpgrade.postMessage(null);
};

//Android领取vip礼包，type需要传json字符串{'sid' : 11} 11黄金 12铂金 13钻石
function AndroidGetVipReward(cmd, type) {
    window.moshi.sendCommonMessage(cmd, type);
};
//iOS领取vip礼包
function iosGetVipReward(type) {
    window.webkit.messageHandlers.receiveVipReward.postMessage(type);
};

//data传3个
//sid 1排山倒海 2吸金大法 3么么哒 4葵花点穴手 5移花接木 7复活奴隶
//type 2道具 1钻石 0元宝
//ios中h5页面使用技能
function useSkillToSomeOne(data) {
    window.webkit.messageHandlers.useSkillToSomeOne.postMessage(data);
}

//ios返回技能成功或者失败的消息 0成功 1失败
function sendUseSkillToSomeOne(res) {
    //alert(res);
}

//安卓技能使用
//Android中h5页面使用技能
function AndroidUseSkillToSomeOne(cmd, type) {
    window.moshi.sendCommonMessage(cmd, type);
};

//Android使用技能返回消息
function sendCommonMessageResult(cme, String) {
    //alert(cme + '---' + String);
}

//Android跳VIP
function memberAndroid(){
    window.moshi.memberAndroid();
}
//Android跳VIP
function memberIos(){
    window.webkit.messageHandlers.memberIos.postMessage(null);
}
// var playerId = localStorage.getItem("playerId");
// console.log(playerId)
//Android获取房间id
// function getAndroidCurrentRoomId(){
//     window.moshi.getUserRoomTid();
// }
//ios获取房间id
function getIosCurrentRoomId(){
    window.webkit.messageHandlers.getCurrentRoomId.postMessage(null);
}

// data传2个  用户id和要打开的页面
// pager   0:礼物   1：技能  2：座驾
// skillid  0不处理 1排山倒海 2吸金大法 3么么哒 4葵花点穴手 5移花接木 7复活奴隶
// 安卓送礼
function AndroidsendGiftSkillCar(uid,pager,skillid){
    alert('1');
    window.moshi.sendGiftSkillCar(uid,pager,skillid);
}