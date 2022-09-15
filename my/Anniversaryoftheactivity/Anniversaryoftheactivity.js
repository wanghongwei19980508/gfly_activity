var activeid=176,
    activeId=1,
    pageid=0,
    TopupANDconsumptionid=0,
    consumptionrebateid=0,
    annualrankingid=0,
    giftid=0,
    alltime=0,end_time=0,
    explore_config=[
        {uid:1,id:9,time:5,diamond:50,},
        {uid:2,id:8,time:10,diamond:100,},
        {uid:3,id:7,time:15,diamond:150,},
        {uid:4,id:6,time:10,diamond:100,},
        {uid:5,id:5,time:15,diamond:150,},
        {uid:6,id:4,time:20,diamond:200,},
        {uid:7,id:3,time:15,diamond:150,},
        {uid:8,id:2,time:20,diamond:200,},
        {uid:9,id:1,time:30,diamond:300,},
    ],
    httpPath = '/ltf',
    path = 'http://obs.99yuyin.com/httpServer/image/',
    picHttp = 'http://obs.99yuyin.com/PlayerIcon/',
    roomHttp = 'http://obs.99yuyin.com/ChatRoomIcon/'
    height = $(window).height(),
    scrollHeight = $(document).scrollTop();

    var player = new SVGA.Player('.egg_img');
    var parser = new SVGA.Parser('.egg_img'); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
    player.loops=1;

var math=0,num=0,a=10.5,b=3.5,c=3.6; //风筝动画参数
var diceleft=0;  //数字的margin位置
var playerposition=0;  //人物的位置

var playerId = 0;
// var EquipmentCode = '';
// index();
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
    index(playerId);
};
// //获取安卓，ios用户名//
// function sendPlayerName(playername) {
//     var playername = playername;
// };

function index() {
    fristGift();//首充大礼包
    recharge();//充值消费大放送
    consume();//消费钻石领取奖励
    window.onscroll = function() {
        scrollHeight = $(document).scrollTop();
    }
}

// 切换页面
$('.pagebox>li>div').off().on('click',function(){
    var pageremoveclass=$('.pagebox>li>div').eq(pageid).attr('uid')+'Add';
    $('.pagebox>li>div').eq(pageid).removeClass(pageremoveclass);

    var that=this;
    var pageclass=$(that).attr('uid')+'Add';
    $(that).addClass(pageclass);
    pageid=$(that).attr('id');
    $('.change-box').hide();
    $('.change-box').eq(pageid).show()

    switch(true){
        case (pageid==0):
            fristGift();//首充大礼包
            recharge();//充值消费大放送
            consume();//消费钻石领取奖励
            break;
        case (pageid==1): 
            green();//消费绿水晶领取奖励
            purple();//消费紫水晶领取奖励
            break;
        case (pageid==2): 
            godhaolist();// 神豪排行榜
            glamourlist();// 魅力排行榜
            roomlist();// 房间排行榜
            break;
        case (pageid==3): 
            diamond();//购买VIP奖励
            bag();//购买礼包
            oneIndiana();//一钻夺宝轮播
            indiana();//夺宝现有数量
            break;
        case (pageid==4):
            invite();//邀请礼包
            hammernumber();// 砸蛋碎片 锤子数量
            diamondnumber();// 用户钻石数量
            smashingtheegg();// 座驾 气泡 称号 水晶兑换
            smashingtheeggnum();// 砸蛋次数状态 兑换 以及奖励展示
            break;
        case (pageid==5):
            characterposition();// 骰子人物位置以及积分数量
            break;
        case (pageid==6):
            statekite();// 风筝状态
            kitewas();// 风筝排行榜
        break;
        case (pageid==7):
            thestateofexplore();// 探索状态  碎片数量
            adventureexchange();// 探索奖励兑换
        break;
    };
});
// 去充值按钮
$(".goRechargeBtn").on("click", function() {
    if (/iphone|ipad|ipod/.test(ua)) {
        iosGoRecharge();
    } else {
        window.moshi.goRecharge();
    }
});
//首充大礼包
function fristGift() {
    $.ajax({
        type: "get",
        url: httpPath + "/active/rechargeFirst/getRewardStatus",
        async: true,
        data: {
            playerId: playerId,
            activeId:activeid
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {

                var fristData = data.data;
                for (var i = 0; i < fristData.length; i++) {
                    $(".firstRechargeBtn").eq(i).attr("conf_id", fristData[i].conf_id);
                    $(".firstRechargeBtn").eq(i).attr("draw", fristData[i].draw);
                };
                for (var i = 0; i < fristData.length; i++) {
                    if ($(".firstRechargeBtn").eq(i).attr('draw') == 0) {
                        $(".firstRechargeBtn").eq(i).addClass("firstAdd");
                        $(".firstRechargeBtn").eq(i).text("领取");
                        $(".firstAdd").off().one("click", function(e) {
                            var that = this;
                            var conf_id = $(that).attr("conf_id");
                            $.ajax({
                                type: "get",
                                url: httpPath + "/active/rechargeFirst/receiveReward",
                                async: true,
                                data: {
                                    playerId: playerId,
                                    activeId:activeid,
                                    confId: conf_id
                                },
                                beforeSend: function(XMLHttpRequest) {
                                    $(".loding").show();
                                    $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                                },
                                dataType: "json",
                                success: function(data) {
                                    $(".loding").hide();
                                    if (data.code == 1) {
                                        $(that).text("已领取");
                                        $(that).removeClass("firstAdd");
                                        $(that).addClass("firstBtn");
                                        alert(data.msg);
                                    } else {
                                        alert(data.msg);
                                    }
                                }
                            });
                            e.preventDefault();
                        });
                    } else if ($(".firstRechargeBtn").eq(i).attr('draw') == 1) {
                        $(".firstRechargeBtn").eq(i).text("已领取");
                        $(".firstRechargeBtn").eq(i).removeClass("fristAdd");
                        $(".firstRechargeBtn").eq(i).addClass("firstBtn");
                    } else if ($(".firstRechargeBtn").eq(i).attr('draw') == -1) {
                        $(".firstRechargeBtn").eq(i).text("未完成");
                        $(".firstRechargeBtn").eq(i).removeClass("fristAdd");
                        $(".firstRechargeBtn").eq(i).addClass("firstBtn");
                    }
                    if($(".firstRechargeBtn").eq(0).attr('draw') == -1){
                        $(".firstRechargeBtn").eq(0).text("去充值");
                        $(".firstRechargeBtn").eq(0).off().on("click", function() {
                            if (/iphone|ipad|ipod/.test(ua)) {
                                iosGoRecharge();
                            } else {
                                window.moshi.goRecharge();
                            }
                        });
                        $(".firstRechargeBtn").eq(0).addClass("fristAdd");
                        $(".firstRechargeBtn").eq(0).removeClass("firstBtn");
                    }
                };
            };
        }
    });
};
//充值消费大放送
function recharge(){
    $.ajax({
        type: "get",
        url: httpPath + "/active/recharge/getRewardStatus",
        async: true,
        data: {
            playerId: playerId,
            activeId:activeid
        },
        dataType: "json",
        success: function(data){

            if(data.code == 1){
                var rechargeData = data.data;
                for(var i = 0; i < rechargeData.length; i++) {
                    $(".rechargeBtn").eq(i).attr("conf_id", rechargeData[i].conf_id);
                    $(".rechargeBtn").eq(i).attr("draw", rechargeData[i].draw);
                };
                for(var i = 0; i < rechargeData.length; i++) {
                    if($(".rechargeBtn").eq(i).attr('draw') == 0) {
                        $('.TopupANDconsumption_height1').find('.TopupANDconsumption_list').eq(i).find('i').text(rechargeData[i].condition+'/'+rechargeData[i].condition);
                        $(".rechargeBtn").eq(i).addClass("rechargeAdd");
                        $(".rechargeBtn").eq(i).text("立即领取");
                        $(".rechargeAdd").off().one("click", function(e) {
                            var that = this;
                            var conf_id = $(that).attr("conf_id");
                            $.ajax({
                                type: "get",
                                url: httpPath + "/active/recharge/receiveReward",
                                async: true,
                                data: {
                                    playerId: playerId,
                                    activeId:activeid,
                                    confId: conf_id
                                },
                                beforeSend: function(XMLHttpRequest) {
                                    $(".loding").show();
                                    $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                                },
                                dataType: "json",
                                success: function(data) {
                                    $(".loding").hide();
                                    if(data.code == 1) {
                                        $(that).text("已领取");
                                        $(that).removeClass("rechargeAdd");
                                        $(that).removeClass("rechargeActive");
                                        alert(data.msg);
                                    } else {
                                        alert(data.msg);
                                    }
                                }
                            });
                            e.preventDefault();
                        });
                    } else if($(".rechargeBtn").eq(i).attr('draw') == 1) {
                        $(".rechargeBtn").eq(i).text("已领取");
                        $(".rechargeBtn").eq(i).removeClass("rechargeAdd");
                        $(".rechargeBtn").eq(i).removeClass("rechargeActive");
                        $('.TopupANDconsumption_height1').find('.TopupANDconsumption_list').eq(i).find('i').text(rechargeData[i].condition+'/'+rechargeData[i].condition);
                    }else if($(".rechargeBtn").eq(i).attr('draw') == -1){
                        $('.TopupANDconsumption_height1').find('.TopupANDconsumption_list').eq(i).find('i').text(data.money1+'/'+rechargeData[i].condition);
                        $(".rechargeBtn").eq(i).off().on("click", function() {
                            if(/iphone|ipad|ipod/.test(ua)) {
                                iosGoRecharge();
                            } else {
                                goRecharge();
                            }
                        });
                    }

                }
            }
        }
    });
}
//消费钻石领取奖励
function consume(){
    $.ajax({
        type: "get",
        url: httpPath + '/active/consume/getRewardStatus',
        async: true,
        data: {
            playerId: playerId,
            activeId:activeid,
            costId: 1
        },
        dataType: 'json',
        success: function(data){
            if(data.code == 1){
                var consumeData = data.data;
                var consumeLen = $(".consumeBtn").length;
                for(var i = 0; i < consumeLen; i++) {
                    $(".consumeBtn").eq(i).attr("conf_id", consumeData[i].conf_id);
                    $(".consumeBtn").eq(i).attr("draw", consumeData[i].draw);
                };
                for(var i = 0; i < consumeLen; i++) {
                    if($(".consumeBtn").eq(i).attr('draw') == 0) {
                        $(".consumeBtn").eq(i).addClass("consumeAdd");
                        $('.TopupANDconsumption_height2').find('.TopupANDconsumption_list').eq(i).find('i').text(consumeData[i].condition+'/'+consumeData[i].condition);
                        $(".consumeAdd").one("click",function(e){
                            var that = this;
                            var conf_id = $(that).attr("conf_id");
                            $.ajax({
                                type: "get",
                                url: httpPath + "/active/consume/receiveReward",
                                async: true,
                                data: {
                                    playerId: playerId,
                                    activeId:activeid,
                                    confId: conf_id
                                },
                                beforeSend: function(XMLHttpRequest) {
                                    $(".loding").show();
                                    $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                                },
                                dataType: "json", 
                                success: function(data){
                                    $(".loding").hide();
                                    if(data.code == 1) {
                                        $(that).text("已领取");
                                        $(that).removeClass("consumeAdd");
                                        alert(data.msg);
                                    } else {
                                        alert(data.msg);
                                    }
                                }
                            });
                            e.preventDefault();
                        });
                    } else if($(".consumeBtn").eq(i).attr('draw') == 1) {
                        $('.TopupANDconsumption_height2').find('.TopupANDconsumption_list').eq(i).find('i').text(consumeData[i].condition+'/'+consumeData[i].condition);
                        $(".consumeBtn").eq(i).text("已领取");
                        $(".consumeBtn").eq(i).removeClass("consumeAdd");
                    }else if($(".consumeBtn").eq(i).attr('draw') == -1){
                        $('.TopupANDconsumption_height2').find('.TopupANDconsumption_list').eq(i).find('i').text(data.consume+'/'+consumeData[i].condition);
                    }
                };
            }
        }
    });
}
// 消耗充值切换
$('.TopupANDconsumption_title>li').off().on('click',function(){
    var TopupANDconsumptionidremoveclass=$('.TopupANDconsumption_title>li').eq(TopupANDconsumptionid).attr('uid')+'Add';
    $('.TopupANDconsumption_title>li').eq(TopupANDconsumptionid).removeClass(TopupANDconsumptionidremoveclass);

    var that=this;
    var TopupANDconsumptionidclass=$(that).attr('uid')+'Add';
    $(that).addClass(TopupANDconsumptionidclass);
    TopupANDconsumptionid=$(that).attr('id');
    $('.TopupANDconsumption_box').hide();
    $('.TopupANDconsumption_box').eq(TopupANDconsumptionid).show();
    $('.TopupANDconsumption_height').eq(TopupANDconsumptionid).css({
        'height': '6.66rem'
    });
    $('.TopupANDconsumption_more').eq(TopupANDconsumptionid).text('点击查看更多');
    $('.TopupANDconsumption_more').eq(TopupANDconsumptionid).attr('uid','0');
});
// 消耗充值查看更多
$('.TopupANDconsumption_more').off().on('click',function(){
    var that=this;
    var moreid=$(that).attr('id');
    var moreuid=$(that).attr('uid');
    if(moreuid==0){
        $('.TopupANDconsumption_height').eq(moreid).css({
            'height': 'auto'
        });
        $(that).find('p').text('点击收起');
        $(that).attr('uid','1');
    }else{
        $('.TopupANDconsumption_height').eq(moreid).css({
            'height': '6.6rem'
        });
        $(that).find('p').text('点击查看更多');
        $(that).attr('uid','0');
    }
});

// 消耗紫绿水晶切换
$('.consumptionrebate_titlebox>li').off().on('click',function(){
    var consumptionrebateremoveclass=$('.consumptionrebate_titlebox>li').eq(consumptionrebateid).attr('uid')+'Add';
    $('.consumptionrebate_titlebox>li').eq(consumptionrebateid).removeClass(consumptionrebateremoveclass);

    var that=this;
    var consumptionrebateclass=$(that).attr('uid')+'Add';
    $(that).addClass(consumptionrebateclass);
    consumptionrebateid=$(that).attr('id');
    $('.consumptionrebate_box').hide();
    $('.consumptionrebate_box').eq(consumptionrebateid).show();
});
//消费绿水晶领取奖励
function green(){
    $.ajax({
        type: "get",
        url: httpPath + "/active/CrystalConsume/getRewardStatus",
        async: true,
        data: {
            playerId: playerId,
            activeId:activeid,
        },
        dataType: 'json',
        success: function(data){
            if(data.code==1){
                var greenData=data.data;
                var greenLen=$(".greenBtn").length;
                for(var i=0;i<greenLen;i++){
                    $(".greenBtn").eq(i).attr("conf_id", greenData[i].conf_id);
                    $(".greenBtn").eq(i).attr("draw", greenData[i].draw);
                };
                for(var i=0;i<greenLen;i++){
                    if($(".greenBtn").eq(i).attr('draw')==0){
                        $(".greenBtn").eq(i).addClass("greenAdd");
                        $(".greenBtn").eq(i).text("领取");
                        
                        $(".consumptionrebate_box").eq(0).find(".consumptionrebate_list").eq(i).find('i').text(greenData[i].condition+'/'+greenData[i].condition);
                    } else if($(".greenBtn").eq(i).attr('draw')==1){
                        $(".consumptionrebate_box").eq(0).find(".consumptionrebate_list").eq(i).find('i').text(greenData[i].condition+'/'+greenData[i].condition);
                        $(".greenBtn").eq(i).text("已领取");
                        $(".greenBtn").eq(i).removeClass("greenAdd");
                    } else if($(".greenBtn").eq(i).attr('draw')==-1){
                        $(".consumptionrebate_box").eq(0).find(".consumptionrebate_list").eq(i).find('i').text(data.consumeGreen+'/'+greenData[i].condition);
                    }
                };
                $(".greenBtn").off("click").one("click",function(e){
                    var that=this;
                    var conf_id = $(that).attr("conf_id");
                    $.ajax({
                        type:"get",
                        url:httpPath + "/active/CrystalConsume/receiveReward",
                        async:true,
                        data:{
                            playerId: playerId,
                            activeId:activeid,
                            confId: conf_id
                        },
                        beforeSend: function(XMLHttpRequest) {
                            $(".loding").show();
                            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                        },
                        dataType:"json",
                        success:function(data){
                            $(".loding").hide();
                            if(data.code==1){
                                $(that).removeClass("greenAdd");
                                $(that).text("已领取");
                                alert(data.msg);
                            } else {
                                alert(data.msg);
                            }
                        }
                    });
                    e.preventDefault();
                });
            }
        }
    });
}
//消费紫水晶领取奖励
function purple(){
    $.ajax({
        type: "get",
        url: httpPath + "/active/CrystalConsume/getRewardStatus",
        async: true,
        data: {
            playerId: playerId,
            activeId:activeid,
        },
        dataType: 'json',
        success: function(data){
            if(data.code==1){
                var purpleData=data.data;
                var purpleLen=$(".purpleBtn").length;
                for(var i=8;i<purpleLen+8;i++){
                    $(".purpleBtn").eq(i-8).attr("conf_id", purpleData[i].conf_id);
                    $(".purpleBtn").eq(i-8).attr("draw", purpleData[i].draw);
                };
                for(var i=8;i<purpleLen+8;i++){
                    if($(".purpleBtn").eq(i-8).attr('draw')==0){
                        $(".purpleBtn").eq(i-8).addClass("purpleAdd");
                        $(".purpleBtn").eq(i-8).text("领取");
                        $(".consumptionrebate_box").eq(1).find(".consumptionrebate_list").eq(i-8).find('i').text(purpleData[i].condition+'/'+purpleData[i].condition);
                    } else if($(".purpleBtn").eq(i-8).attr('draw')==1){
                        $(".consumptionrebate_box").eq(1).find(".consumptionrebate_list").eq(i-8).find('i').text(purpleData[i].condition+'/'+purpleData[i].condition);
                        $(".purpleBtn").eq(i-8).text("已领取");
                        $(".purpleBtn").eq(i-8).removeClass("purpleAdd");
                    } else if($(".purpleBtn").eq(i-8).attr('draw')==-1){
                        $(".consumptionrebate_box").eq(1).find(".consumptionrebate_list").eq(i-8).find('i').text(data.consumePurple+'/'+purpleData[i].condition);
                    }
                };
                $(".purpleBtn").off("click").one("click",function(e){
                    var that=this;
                    var conf_id = $(that).attr("conf_id");
                    $.ajax({
                        type:"get",
                        url:httpPath + "/active/CrystalConsume/receiveReward",
                        async:true,
                        data:{
                            playerId: playerId,
                            activeId:activeid,
                            confId: conf_id
                        },
                        beforeSend: function(XMLHttpRequest) {
                            $(".loding").show();
                            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                        },
                        dataType:"json",
                        success:function(data){
                            $(".loding").hide();
                            if(data.code==1){
                                $(that).removeClass("purpleAdd");
                                $(that).text("已领取");
                                alert(data.msg);
                            } else {
                                alert(data.msg);
                            }
                        }
                    });
                    e.preventDefault();
                });
            }
        }
    });
}

// 排行榜切换
$('.annualranking_title>li').off().on('click',function(){
    var annualrankingremoveclass=$('.annualranking_title>li').eq(annualrankingid).attr('uid')+'Add';
    $('.annualranking_title>li').eq(annualrankingid).removeClass(annualrankingremoveclass);

    var that=this;
    var annualrankingclass=$(that).attr('uid')+'Add';
    $(that).addClass(annualrankingclass);
    annualrankingid=$(that).attr('id');
    $('.rankinglist_box').hide();
    $('.rankinglist_box').eq(annualrankingid).show();
    $('.rankingreward_box').hide();
    $('.rankingreward_box').eq(annualrankingid).show();
});
// 神豪排行榜
function godhaolist(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/rank/getRichRank",
        async: true,
        beforeSend: function(XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
        },
        data: {
            playerId: playerId,
            activeId:activeId
        },
        dataType: "json",
        success: function(data) {
            $(".loding").hide();
            if (data.code == 1) {
                let list=data.data;
                let str='';
                if(list.length>0){
                    for(i=0;i<list.length;i++){
                        let j=parseInt(i)+parseInt(1);
                        str+='<li><p class="ranking_text">'+j+'</p><img class="u_id" src="'+picHttp+list[i].pic+'.png" uid="'+list[i].uid+'"><p class="name_text">'+list[i].name+'</p><p class="numranking_text">'+list[i].score+'</p><p class="suffix_text">神豪值</p></li>'
                    }
                }else{
                    str+="暂无排名"
                }
                $('.rankinglist_box').eq(0).find('ul').html(str);
                $(".u_id").on("click",function(){
                    var type = $(this).attr("uid");
                    if(type){
                        if(/iphone|ipad|ipod/.test(ua)) {
                            getIosPersonDetails(type);
                        } else {
                            getAndroidPersonDetails(type);
                        }
                    }
                });
            } else {
                alert(data.msg);
            }
        }
    });
}
// 魅力排行榜
function glamourlist(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/rank/getCharmRank",
        async: true,
        beforeSend: function(XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
        },
        data: {
            playerId: playerId,
            activeId:activeId
        },
        dataType: "json",
        success: function(data) {
            $(".loding").hide();
            if (data.code == 1) {
                let list=data.data;
                let str=''
                if(list.length>0){
                    for(i=0;i<list.length;i++){
                        let j=parseInt(i)+parseInt(1);
                        str+='<li><p class="ranking_text">'+j+'</p><img class="u_id" src="'+picHttp+list[i].pic+'.png" uid="'+list[i].uid+'"><p class="name_text">'+list[i].name+'</p><p class="numranking_text">'+list[i].score+'</p><p class="suffix_text">魅力值</p></li>'
                    }
                }else{
                    str+="暂无排名"
                }
                $('.rankinglist_box').eq(1).find('ul').html(str);
                $(".u_id").on("click",function(){
                    var type = $(this).attr("uid");
                    if(type){
                        if(/iphone|ipad|ipod/.test(ua)) {
                            getIosPersonDetails(type);
                        } else {
                            getAndroidPersonDetails(type);
                        }
                    }
                });
            } else {
                alert(data.msg);
            }
        }
    });
}
// 房间排行榜
function roomlist(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/rank/getChatRoomRank",
        async: true,
        beforeSend: function(XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
        },
        data: {
            playerId: playerId,
            activeId:activeId
        },
        dataType: "json",
        success: function(data) {
            $(".loding").hide();
            if (data.code == 1) {
                let list=data.data;
                let str=''
                if(list.length>0){
                    for(i=0;i<list.length;i++){
                        let j=parseInt(i)+parseInt(1);
                        str+='<li><p class="ranking_text">'+j+'</p><img class="room_id" src="'+roomHttp+list[i].pic+'.png" uid="'+list[i].tid+'"><p class="name_text">'+list[i].name+'</p><p class="numranking_text">'+list[i].score+'</p><p class="suffix_text">人气值</p></li>'
                    }
                }else{
                    str+="暂无排名"
                }
                $('.rankinglist_box').eq(2).find('ul').html(str);
                $(".room_id").on("click",function(){
                    var type = $(this).attr("uid");
                    if(type){
                        if(/iphone|ipad|ipod/.test(ua)) {
                            getiosGotochatroom(type);
                        } else {
                            getAndroidGotochatroom(type);
                        }
                    }
                });
            } else {
                alert(data.msg);
            }
        }
    });
}

// 点击邀请好友按钮
$('.sharefriendsbtn').off().on('click',function(){
    $('.lucky-share').show();
});
// 点击不同分享按钮
$('.share-click').on('click', function(event) {
    event.stopPropagation();
    var mold = $(this).data('mold');
    share(mold);
});
// 关闭分享按钮
$('.lucky-share-bottom').on('click', function() {
    $('.lucky-share').hide();
});
// 分享方法
function share(mold) {
    $.ajax({
        type: 'GET',
        url: httpPath + '/drifter/shareBottle',
        async: true,
        data: {
            playerId: playerId,
            activeId:activeid,
            sharePlatform: 997,
            shareSid: 2
        },
        dataType: 'json',
        success: function(data) {
            invite()//再次获取分享状态
        }
    });
    shareBtn(mold, playerId);
};
//安卓和ios点击分别分享到微信，QQ和通讯录
function shareBtn(mold, playerId) {
    //	var playerId = playerId;
    var _num = parseInt(Math.random() * 99999999);
    var _type = mold;
    var _title = '超大额红包等你来抢';
    var _text = '一款可以抢现金红包的、趣味十足的语音聊天，交友软件！';
    var _icon = 'icon.png';
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.webkit.messageHandlers.iOSShareCustom.postMessage({
            type: _type,
            title: _title,
            text: _text,
            url: _url,
            icon: _icon
        })
    } else {
        getAndroidAtWillShare(_type, _title, _text, _url, _icon)
    }
};
//邀请礼包
function invite() {
    $.ajax({
        type: "get",
        url: httpPath + "/active/invite/getRewardStatus",
        async: true,
        data: {
            playerId: playerId,
            activeId:activeid
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                var inviteData = data.data,
                    inviteMoney = data.accountNum;
                    var inviteLen=$('.invitedreceivebtn').length;
                if(inviteMoney>=6){
                    $('.peoplecircle').css({
                        'color':'#A822AB'
                    });
                }else if(inviteMoney>=3){
                    $('.peoplecircle').eq(0).css({
                        'color':'#A822AB'
                    });
                    $('.peoplecircle').eq(1).css({
                        'color':'#A822AB'
                    });
                }else if(inviteMoney>=1){
                    $('.peoplecircle').eq(0).css({
                        'color':'#A822AB'
                    });
                }
                for (var i = 0; i < inviteData.length; i++) {
                    $(".invitedreceivebtn").eq(i).attr("conf_id", inviteData[i].conf_id);
                    $(".invitedreceivebtn").eq(i).attr("draw", inviteData[i].draw);
                };
                for (var i = 0; i < inviteLen; i++) {
                    if ($(".invitedreceivebtn").eq(i).attr('draw') == 0) {
                        $(".invitedreceivebtn").eq(i).addClass("iinvitedreceivebtnAdd");
                    } else if ($(".invitedreceivebtn").eq(i).attr('draw') == 1) {
                        $(".invitedreceivebtn").eq(i).removeClass("invitedreceivebtnAdd");
                    }
                };
                $(".invitedreceivebtnAdd").one("click", function(e) {
                    var that = this;
                    var conf_id = $(that).attr("conf_id");
                    $.ajax({
                        type: "get",
                        url: httpPath + "/active/invite/receiveReward",
                        async: true,
                        data: {
                            playerId: playerId,
                            activeId:activeid,
                            confId: conf_id
                        },
                        beforeSend: function(XMLHttpRequest) {
                            $(".loding").show();
                            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                        },
                        dataType: "json",
                        success: function(data) {
                            $(".loding").hide();
                            if (data.code == 1) {
                                $(that).removeClass("invitedreceivebtnAdd");
                                alert(data.msg);
                            } else {
                                alert(data.msg);
                            }
                        }
                    });
                    e.preventDefault();
                });
            }
        }

    });
};
// 砸蛋碎片 锤子数量
function hammernumber(){
    $.ajax({
        type: 'GET',
        url: httpPath + '/qzjactive/eggs/getSpecialCount',
        async: true,
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 1) {
                $('.hammernumber').text(data.data);
            }
        }
    });
    $.ajax({
        type: 'GET',
        url: httpPath + '/qzjactive/eggs/getWarehouse',
        async: true,
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 1) {
                $('.carfragment_text>span').text(data.data.car);
                $('.bubblefragment_text>span').text(data.data.bubble);
                $('.namefragment_text>span').text(data.data.title);
                $('.crystalfragment_text>span').text(data.data.crycal);
            }
        }
    });
}
// 用户钻石数量
function diamondnumber(){
    $.ajax({
        type: 'GET',
        url: httpPath + '/qzjactive/getDiamondNum',
        async: true,
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 1) {
                $('.diamondnumber').text(data.data.diamond);
            }
        }
    });
}
// 周年幸运彩蛋奖池活动规则
$('.eggpoolrulebtn').off().on('click',function(){
    $(".eggpool_box").css({"top": scrollHeight + "px"})
    $('.eggpool_box').show();
});
// 周年幸运彩蛋奖池活动规则关闭
$('.eggpoolbackbtn').off().on('click',function(){
    $('.eggpool_box').hide();
});
// 锤子数量加
$('.hammeradd').off().on("click", function() {
    var _this = this;
    var addVal = $(_this).parents('.hammernumber_box').find('input').val();
    addVal++;
    $(_this).parents('.hammernumber_box').find('input').val(addVal);
    $(".hammerprice").text(addVal*100);
    getcoupons($(".hammerprice").text());
});
// 锤子数量减
$('.hammersubtr').off().on("click", function() {
    var _this = this;
    var subVal = $(_this).parents('.hammernumber_box').find('input').val();
    subVal--;
    if (subVal >= 1) {
        $(_this).parents('.hammernumber_box').find('input').val(subVal);
    }
    $(".hammerprice").text(subVal*100);
    getcoupons($(".hammerprice").text());
});
// 锤子数量框输入
$('.hammernumber_box>input').on("input",function(){
    $(".hammerprice").text($(this).val()*100);
    getcoupons($(".hammerprice").text());
});
// 获取锤子优惠券
function getcoupons(num){
    $.ajax({
        type: 'GET',
        url: httpPath + '/qzjactive/eggs/getCouponsHouse',
        async: true,
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 1) {
                if(parseInt(data.data.coupons_10000)>0&&parseInt(num)>=10000){
                    if($('.coupons_10000').length<1){
                        $('#select').append('<option class="coupons_10000" value="coupons_10000" selected >满10000减2000*'+data.data.coupons_10000+'</option>');
                    }
                }else{
                    $('.coupons_10000').remove();
                };
                if(parseInt(data.data.coupons_5000)>0&&parseInt(num)>=5000){
                    if($('.coupons_5000').length<1){
                        $('#select').append('<option class="coupons_5000" value="coupons_5000" selected >满5000减1000*'+data.data.coupons_5000+'</option>');
                    }
                }else{
                    $('.coupons_5000').remove();
                };
                if(parseInt(data.data.coupons_500)>0&&parseInt(num)>=500){
                    if($('.coupons_500').length<1){
                        $('#select').append('<option class="coupons_500" value="coupons_500" selected >满500减100*'+data.data.coupons_500+'</option>');
                    }
                }else{
                    $('.coupons_500').remove();
                };
            }
        }
    });
}
// 点击砸蛋事件 判断购买与否
$('.eggbtn').off().on('click',function(){
    var that=this;
    // let type=$(that).attr('id');
    let uid=$(that).attr('uid');
    let num=$('.hammernumber').text();
    if(parseInt(uid)>parseInt(num)){
        $('.rechargehammer_box').show();       
        $('.hammernumber_box>input').val(parseInt(uid)-parseInt(num));
        $('.hammerprice').text((parseInt(uid)-parseInt(num))*100);
        getcoupons($(".hammerprice").text());
        $('.hammerdeterminebtn').off().on('click',function(){
            // 购买锤子
            let count=$('.hammernumber_box>input').val();
            let num=$('#select').val();
            $.ajax({
                type: 'GET',
                url: httpPath + '/qzjactive/eggs/buyTheDebris',
                async: true,
                data: {
                    playerId: playerId,
                    activeId:activeId,
                    count:count,
                    coupons:num
                },
                dataType: 'json',
                success: function(data) {
                    if (data.code == 1) {
                        alert(data.msg);
                        $('.rechargehammer_box').hide();
                        hammernumber();
                        diamondnumber();
                    }else{
                        alert(data.msg);
                    }
                }
            });
        });
    }else{
        throwingeggs(uid);
    }
    
});
// 关闭购买锤子
$('.hammercancelbtn').off().on('click',function(){
    $('.rechargehammer_box').hide();
});
// 砸蛋
function throwingeggs(type){
    $.ajax({
        type: 'GET',
        url: httpPath + '/qzjactive/eggs/throwingEggs',
        async: true,
        data: {
            playerId: playerId,
            activeId:activeId,
            count: type,
            useDiamond:-1
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 1) {
                var str='';
                let egg=data.data.special;
                for(i=0;i<egg.length;i++){
                    if(egg[i].sid==92){
                        str+='<li>座驾碎片x<span>'+egg[i].num+'</span>个</li>'
                    }else if(egg[i].sid==93){
                        str+='<li>气泡碎片x<span>'+egg[i].num+'</span>个</li>'
                    }else if(egg[i].sid==94){
                        str+='<li>称号碎片x<span>'+egg[i].num+'</span>个</li>'
                    }else if(egg[i].sid==95){
                        str+='<li>水晶碎片x<span>'+egg[i].num+'</span>个</li>'
                    }
                };
                $('.egg_img').css({
                    'margin-top': '1.15rem',
                    'margin-left': '1.4rem',
                    'width': '4.8rem',
                    'height': '3.8rem',
                    'background-image': 'url()',
                    'margin-bottom': '-0.25rem'
                });
                $('.eggbtn').css({
                    'pointer-events': 'none'
                });
                parser.load('rose.svga', function(videoItem) {
                    player.setVideoItem(videoItem);
                    player.startAnimation();
                    player.onFinished(function(){
                        $('.egg_img').css({
                            'margin-top': '1.9rem',
                            'margin-left': '1.5rem',
                            'width': '3.8rem',
                            'height': '2.8rem',
                            'background-image': 'url(http://obs.99yuyin.com/h5/activity/huodong/Anniversaryoftheactivity/蛋.png)',
                            'margin-bottom': '0rem'
                        });
                        $('.eggfragment_box>ul').html(str);
                        $(".eggfragment_box").css({"top": (scrollHeight + height / 2 -50) + "px"})
                        $('.eggfragment_box').show();
                        setTimeout(function(){
                            $('.eggbtn').css({
                                'pointer-events': 'auto'
                            });
                            $('.eggfragment_box').hide();
                            hammernumber();
                            diamondnumber();
                            smashingtheeggnum();
                            smashingtheegg();
                        },2000);
                    });
                });
            } else {
                alert(data.msg);
            }
        }
    })
}
// 切换砸蛋兑换页面
$('.exchangegift_title>li').off().on('click',function(){
    var giftremoveclass=$('.exchangegift_title>li').eq(giftid).attr('uid')+'Add';
    $('.exchangegift_title>li').eq(giftid).removeClass(giftremoveclass);

    var that=this;
    var giftclass=$(that).attr('uid')+'Add';
    $(that).addClass(giftclass);
    giftid=$(that).attr('id');
    $('.exchangegift_box').hide();
    $('.exchangegift_box').eq(giftid).show();

});
// 座驾 气泡 称号 水晶兑换
function smashingtheegg(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/eggs/getExchangeStatus",
        async: true,
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: 'json',
        success: function(data){
            if(data.code==1){
                let car=data.data.car;
                for(i=0;i<car.length;i++){
                    $(".carexchangebtn").eq(i).attr("conf_id", car[i].conf_id);
                    if(parseInt(car[i].condition)>parseInt($('.carfragment_text').text())){
                        $(".carexchangebtn").eq(i).attr("draw", -1);
                    }else{
                        $(".carexchangebtn").eq(i).attr("draw", 0);
                    }
                };
                let bubble=data.data.bubble;
                for(var i=0;i<bubble.length;i++){
                    $(".bubbleexchangebtn").eq(i).attr("conf_id", bubble[i].conf_id);
                    if(parseInt(bubble[i].condition)>parseInt($('.bubblefragment_text').text())){
                        $(".bubbleexchangebtn").eq(i).attr("draw", -1);
                    }else{
                        $(".bubbleexchangebtn").eq(i).attr("draw", 0);
                    }
                };
                let title=data.data.title;
                for(var i=0;i<title.length;i++){
                    $(".nameexchangebtn").eq(i).attr("conf_id", title[i].conf_id);
                    if(parseInt(title[i].condition)>parseInt($('.namefragment_text').text())){
                        $(".nameexchangebtn").eq(i).attr("draw", -1);
                    }else{
                        $(".nameexchangebtn").eq(i).attr("draw", 0);
                    }
                };
                let crystal=data.data.crystal;
                for(var i=0;i<crystal.length;i++){
                    $(".crystalexchangebtn").eq(i).attr("conf_id", crystal[i].conf_id);
                    if(parseInt(crystal[i].condition)>parseInt($('.crystalfragment_text').text())){
                        $(".crystalexchangebtn").eq(i).attr("draw", -1);
                    }else{
                        $(".crystalexchangebtn").eq(i).attr("draw", 0);
                    }
                };
                var eggchangebtnLen=$(".eggchangebtn").length;
                for(var i=0;i<eggchangebtnLen;i++){
                    if($(".eggchangebtn ").eq(i).attr('draw')==0){
                        $(".eggchangebtn").eq(i).text("兑换");
                    } else if($(".eggchangebtn").eq(i).attr('draw')==-1){
                        $(".eggchangebtn").eq(i).text("未达到");
                    }
                };
                $(".eggchangebtn").off("click").one("click",function(e){
                    var that=this;
                    var conf_id = $(that).attr("conf_id");
                    $.ajax({
                        type:"get",
                        url:httpPath + "/qzjactive/eggs/exchangeToAward",
                        async:true,
                        data:{
                            playerId: playerId,
                            activeId:activeId,
                            confId: conf_id
                        },
                        beforeSend: function(XMLHttpRequest) {
                            $(".loding").show();
                            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                        },
                        dataType:"json",
                        success:function(data){
                            $(".loding").hide();
                            if(data.code==1){
                                alert('兑换成功');
                                hammernumber();
                                smashingtheegg();
                            } else {
                                alert(data.msg);
                            }
                        }
                    });
                    e.preventDefault();
                });
            }
        }
    });
}
// 砸蛋次数状态 兑换 以及奖励展示
function smashingtheeggnum(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/eggs/getThrowCountStatus",
        async: true,
        dataType: 'json',
        data: {
            playerId: playerId,
            activeId:activeId
        },
        success: function(data) {
            if (data.code == 1) {
                if(data.count==null){
                    $('.eggnumber_text>span').text(0);
                }else{
                    $('.eggnumber_text>span').text(data.count);
                }
                var numData = data.data;
                for (var i = 0; i < numData.length; i++) {
                    $(".eggreceivebtn").eq(i).attr("conf_id", numData[i].conf_id);
                    $(".eggreceivebtn").eq(i).attr("draw", numData[i].draw);
                };
                $('.eggchest_box>li>img').off().on('click',function(){
                    let that=this;
                    let num=$(that).attr('uid');
                    let id=$(that).attr('id');
                    if($(".eggreceivebtn").eq(id).attr('draw') == 1){
                        $('.hammergiftreceived').css("visibility","visible");
                    }else{
                        $('.hammergiftreceived').css("visibility","hidden");
                    }
                    $('.hammergiftimg_box>span').text('×'+num);
                    $(".hammergift_box").css({"top": (scrollHeight + height / 2 -50) + "px"})
                    $('.hammergift_box').show();
                });
                for (var i = 0; i < numData.length; i++) {
                    if ($(".eggreceivebtn").eq(i).attr('draw') == 0) {
                        $(".eggreceivebtn").eq(i).text("领取");
                        $(".eggreceivebtn").eq(i).addClass("eggreceivebtnAdd");
                        $(".eggreceivebtnAdd").off().one("click", function(e) {
                            var that = this;
                            var conf_id = $(that).attr("conf_id");
                            $.ajax({
                                type: "get",
                                url: httpPath + "/qzjactive/eggs/recvThrowCountAward",
                                async: true,
                                beforeSend: function(XMLHttpRequest) {
                                    $(".loding").show();
                                    $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                                },
                                data: {
                                    playerId: playerId,
                                    activeId:activeId,
                                    conf_id: conf_id
                                },
                                dataType: "json",
                                success: function(data) {
                                    $(".loding").hide();
                                    if (data.code == 1) {
                                        alert('领取成功');
                                        smashingtheeggnum();
                                        hammernumber();
                                    } else {
                                        alert(data.msg);
                                    }
                                }
                            });
                            e.preventDefault();
                        })
                    } else if ($(".eggreceivebtn").eq(i).attr('draw') == 1) {
                        $(".eggreceivebtn").eq(i).text("已领取");
                        $(".eggreceivebtn").eq(i).removeClass("eggreceivebtnAdd");
                    } else if ($(".eggreceivebtn").eq(i).attr('draw') == -1) {
                        $(".eggreceivebtn").eq(i).text("未达到");
                        $(".eggreceivebtn").eq(i).removeClass("eggreceivebtnAdd");
                    }
                };
            };
        }
    });
}
// 砸蛋次数奖励关闭
$('.hammergiftclosebtn').off().on('click',function(){
    $('.hammergift_box').hide();
});
// 钻石宝箱活动规则
$('.diamonchestrulebtn').off().on('click',function(){
    $(".diamondtreasurerules_box").css({"top": (scrollHeight) + "px"})
    $('.diamondtreasurerules_box').show();
});
// 钻石宝箱活动规则关闭
$('.diamondtreasurerulesbackbtn').off().on('click',function(){
    $('.diamondtreasurerules_box').hide();
});
//购买宝箱数量加
$('.chestadd').off().on("click", function() {
    var _this = this;
    var addVal = $(_this).parents('.buy_box').find('input').val();
    addVal++;
    $(_this).parents('.buy_box').find('input').val(addVal);
});
//购买宝箱数量减
$('.chestsubtr').off().on("click", function() {
    var _this = this;
    var subVal = $(_this).parents('.buy_box').find('input').val();
    subVal--;
    if (subVal >= 1) {
        $(_this).parents('.buy_box').find('input').val(subVal);
    }
});
//购买宝箱点击事件
$('.buybtn').off().on('click',function(){
    var that=this;
    let type=$(that).attr('uid');
    let count=$(that).parents('.buy_box').find('input').val();
    if(type==1){
        var num=parseInt(count)*parseInt(375);
    }else if(type==2){
        var num=parseInt(count)*parseInt(1250);
    }else if(type==3){
        var num=parseInt(count)*parseInt(2500);
    }
    // 获取宝箱优惠券
    $.ajax({
        type: 'GET',
        url: httpPath + '/qzjactive/eggs/getCouponsHouse',
        async: true,
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 1) {
                if(parseInt(data.data.coupons_500)>0&&parseInt(num)>=500){
                    if($('.coupons1_500').length<1){
                        $('#select1').append('<option class="coupons1_500" value="coupons_500" selected >满500减100*'+data.data.coupons_500+'</option>');
                    }
                }else{
                    $('.coupons1_500').remove();
                };
                if(parseInt(data.data.coupons_5000)>0&&parseInt(num)>=5000){
                    if($('.coupons1_5000').length<1){
                        $('#select1').append('<option class="coupons1_5000" value="coupons_5000" selected >满5000减1000*'+data.data.coupons_5000+'</option>');
                    }
                }else{
                    $('.coupons1_5000').remove();
                };
                if(parseInt(data.data.coupons_10000)>0&&parseInt(num)>=10000){
                    if($('.coupons1_10000').length<1){
                        $('#select1').append('<option class="coupons1_10000" value="coupons_10000" selected >满10000减2000*'+data.data.coupons_10000+'</option>');
                    }
                }else{
                    $('.coupons1_10000').remove();
                };
                $(".giftexchangecoupon_box").css({"top": (scrollHeight + height / 2 -150) + "px"})
                $('.gifthammerprice').text(num);
                $('.giftexchangecoupon_box').show();
                $('.giftexchangesurebtn').off().on('click',function(){
                    buytreasurechest(type,count);
                });
                $('.giftexchangecancelbtn').off().on('click',function(){
                    $('.giftexchangecoupon_box').hide();
                });
            }
        }
    });
});
// 宝箱购买
function buytreasurechest(type,count){
    let coupons=$('#select1').val();
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/box/openBox",
        async: true,
        beforeSend: function(XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
        },
        data: {
            playerId: playerId,
            activeId:activeId,
            type: type,
            count:count,
            coupons:coupons
        },
        dataType: "json",
        success: function(data) {
            $(".loding").hide();
            if (data.code == 1) {
                var length=data.data;
                var skilllength=data.data.skill;
                var carlength=data.data.car;
                var titlelength=data.data.title;
                var bubblelength=data.data.bubble;
                var str='';
                if(length.diamond>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/money/diamond.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.diamond+'</span></li>';
                }
                if(length.money>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/money/wing.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.money+'</span></li>';
                }
                if(length.ticket>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/dragon/point.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.ticket+'</span></li>';
                }
                if(length.green>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/WinterSolstice/green.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.green+'</span></li>';
                }
                if(length.purple>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/WinterSolstice/purple.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.purple+'</span></li>';
                }
                for(i=0;i<skilllength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/skill/skill_prop_'+skilllength[i].sid+'@2x.png" alt="" id="skill_img"><span class="winningtime_text">×'+skilllength[i].num+'</span></li>';
                }
                for(i=0;i<carlength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="'+path+'car/icon_'+carlength[i].sid+'@2x.png"" alt="" id="car_img"><span class="winningtime_text">×'+(parseInt(carlength[i].num)/3600).toFixed(0)+'小时</span></li>';
                }
                for(i=0;i<titlelength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="'+path+'title1/icon_title_'+titlelength[i].sid+'.png"" alt="" id="title_img"><span class="winningtime_text">×'+(parseInt(titlelength[i].num)/3600).toFixed(0)+'小时</span></li>';
                }
                for(i=0;i<bubblelength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/httpServer/image/chat_bubble/'+bubblelength[i].sid+'/bubble_shop@2x.png"" alt="" id="bubble_img"><span class="winningtime_text">×'+(parseInt(bubblelength[i].num)/3600).toFixed(0)+'小时</span></li>';
                }
                $('.giftexchangecoupon_box').hide();
                $('.winninggift_box').html(str);
                $('.winningrecord_text').html('获得奖励');
                $(".winningrecord_box").css({"top": (scrollHeight + height / 2 -200) + "px"})
                $('.winningrecord_box').show();
                diamondnumber();
            } else {
                alert(data.msg);
            }
        }
    });
}
// 宝箱记录点击事件
$('.diamonchestbtn').off().on('click',function(){
    treasurecaserecords();
});
// 宝箱记录
function treasurecaserecords(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/box/getBoxBill",
        async: true,
        beforeSend: function(XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
        },
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: "json",
        success: function(data) {
            $(".loding").hide();
            if (data.code == 1) {
                var length=data.total;
                var skilllength=data.total.skill;
                var carlength=data.total.car;
                var titlelength=data.total.title;
                var bubblelength=data.total.bubble;
                var str='';
                if(length.diamond>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/money/diamond.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.diamond+'</span></li>';
                }
                if(length.money>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/money/wing.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.money+'</span></li>';
                }
                if(length.ticket>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/dragon/point.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.ticket+'</span></li>';
                }
                if(length.green>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/WinterSolstice/green.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.green+'</span></li>';
                }
                if(length.purple>0){
                    str+='<li class="intermediaterecord_box" ><img src="http://obs.99yuyin.com/h5/activity/WinterSolstice/purple.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.purple+'</span></li>';
                }
                for(i=0;i<skilllength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/skill/skill_prop_'+skilllength[i].sid+'@2x.png" alt="" id="skill_img"><span class="winningtime_text">×'+skilllength[i].num+'</span></li>';
                }
                for(i=0;i<carlength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="'+path+'car/icon_'+carlength[i].sid+'@2x.png"" alt="" id="car_img"><span class="winningtime_text">×'+(parseInt(carlength[i].num)/3600).toFixed(0)+'小时</span></li>';
                }
                for(i=0;i<titlelength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="'+path+'title1/icon_title_'+titlelength[i].sid+'.png"" alt="" id="title_img"><span class="winningtime_text">×'+(parseInt(titlelength[i].num)/3600).toFixed(0)+'小时</span></li>';
                }
                for(i=0;i<bubblelength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/httpServer/image/chat_bubble/'+bubblelength[i].sid+'/bubble_shop@2x.png"" alt="" id="bubble_img"><span class="winningtime_text">×'+(parseInt(bubblelength[i].num)/3600).toFixed(0)+'小时</span></li>';
                }
                $('.winninggift_box').html(str);
                $('.winningrecord_text').html('中奖纪录');
                $(".winningrecord_box").css({"top": (scrollHeight + height / 2 -200) + "px"})
                $('.winningrecord_box').show();
            } else {
                alert(data.msg);
            }
        }
    });
}
// 宝箱记录关闭事件
$('.winningrecordclosebtn').off().on('click',function(){
    $('.winningrecord_box').hide();
});

//购买VIP奖励
function diamond() {
    $.ajax({
        type: "get",
        url: httpPath + "/active/Egg/getVipAwardStatus",
        async: true,
        dataType: 'json',
        data: {
            playerId: playerId,
            activeId:activeid
        },
        success: function(data) {
            if (data.code == 1) {
                var diamondData = data.data;
                for (var i = 0; i < diamondData.length; i++) {
                    $(".byVipBtn").eq(i).attr("conf_id", diamondData[i].conf_id);
                    $(".byVipBtn").eq(i).attr("draw", diamondData[i].draw);
                };
                for (var i = 0; i < diamondData.length; i++) {
                    if ($(".byVipBtn").eq(i).attr('draw') == 0) {
                        $(".byVipBtn").eq(i).text("立即领取");
                        $(".byVipBtn").eq(i).addClass("diamondAdd");
                        $(".diamondAdd").off().one("click", function(e) {
                            var that = this;
                            var conf_id = $(that).attr("conf_id");

                            $.ajax({
                                type: "get",
                                url: httpPath + "/active/Egg/VipAward",
                                async: true,
                                beforeSend: function(XMLHttpRequest) {
                                    $(".loding").show();
                                    $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                                },
                                data: {
                                    playerId: playerId,
                                    activeId:activeid,
                                    consumeType: conf_id
                                },
                                dataType: "json",
                                success: function(data) {
                                    $(".loding").hide();
                                    if (data.code == 1) {
                                        $(that).text("已领取");
                                        $(that).removeClass("diamondAdd");
                                        $(that).removeClass("diamondActive");
                                        $(that).addClass("diamondadd");
                                        //										diamond();
                                        alert(data.msg);
                                        ticketFlag = false;
                                    } else {
                                        alert(data.msg);
                                    }
                                }
                            });
                            e.preventDefault();
                        })
                    } else if ($(".byVipBtn").eq(i).attr('draw') == 1) {
                        $(".byVipBtn").eq(i).text("已领取");
                        $(".byVipBtn").eq(i).removeClass("diamondAdd");
                        $(".byVipBtn").eq(i).removeClass("diamondActive");
                        $(".byVipBtn").eq(i).addClass("diamondadd");
                    } else if ($(".byVipBtn").eq(i).attr('draw') == -1) {
                        $(".byVipBtn").eq(i).off().on("click", function() {
                            if (/iphone|ipad|ipod/.test(ua)) {
                                memberIos();
                            } else {
                                memberAndroid();
                            }
                        });
                    }
                };
            };
        }
    });
};
//购买礼包
function bag() {
    var str_mrak = '<div class="btn_mark"></div>';
    $.ajax({
        type: "get",
        url: httpPath + "/active/giftPack/getRewardStatus",
        async: true,
        data: {
            playerId: playerId,
            activeId:activeid
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                var bargainData = data.data;
                for (var i = 0; i < bargainData.length; i++) {
                    $(".packBagBtn").eq(i).attr("id", bargainData[i].id);
                    $(".packBagBtn").eq(i).attr("use_num", bargainData[i].use_num);
                    $(".packBagBtn").eq(i).attr("status", bargainData[i].status);
                };
                for (var i = 0; i < bargainData.length; i++) {
                    if ($(".packBagBtn").eq(i).attr('status') == 0) {
                        $(".packBagBtn").eq(i).addClass("bargainAdd");
                    } else if ($(".packBagBtn").eq(i).attr('status') == 1) {
                        $(".packBagBtn").eq(i).text("已购买");
                        $(".packBagBtn").eq(i).removeClass("bargainAdd");
                    }
                };
                $(".bargainAdd").on("click", function(e) {
                    var that = this;
                    var confId = $(that).attr("id");
                    var use_num = $(that).attr("use_num");
                    $(this).parents(".overflow_box").append(str_mrak);
                    if (use_num < 2) {
                        $.ajax({
                            type: "get",
                            url: httpPath + "/active/giftPack/receiveReward",
                            async: true,
                            beforeSend: function(XMLHttpRequest) {
                                $(".loding").show();
                                $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                            },
                            data: {
                                playerId: playerId,
                                activeId:activeid,
                                confId: confId
                            },
                            dataType: "json",
                            success: function(data) {
                                $(".loding").hide();
                                if (data.code == 1) {
                                    use_num++;
                                    $(that).attr("use_num", use_num);
                                    alert(data.msg);
                                    if ($(that).attr("use_num") == 2) {
                                        $(that).removeClass("bargainAdd");
                                        $(that).text('已购买');
                                    };
                                    $(".btn_mark").remove();
                                } else {
                                    $(".btn_mark").remove();
                                    alert(data.msg);
                                }
                            }
                        });
                    };
                    e.preventDefault();
                });
            }
        }
    });
};
//一钻夺宝轮播
function oneIndiana() {
    $.ajax({
        type: "get",
        url: httpPath + "/seizeTreasure/winList",
        async: true,
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                var str = '';
                if (data.data.length > 0) {
                    for (var i = 0; i < data.data.length; i++) {
                        str += '<li><span>' + data.data[i].user_name  + '</span>'+data.data[i].description + '<i>共计消耗' + data.data[i].buy_num +'钻石' + '</i></li>';
                    };
                    $('.new_rolling_list').html(str);
                    setInterval('autoScroll(".rolling_content")', 3000);
                } else {
                    var str = '<p>暂无人中奖</p>';
                    $('.rolling_content').html(str);
                }
            };
        }
    });
};
//轮播方法
function autoScroll(obj) {
    $(obj).find("ul").animate({
        marginTop: "-30px"
    }, 500, function() {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    })
};
//夺宝现有数量
function indiana() {
    $.ajax({
        type: "get",
        url: httpPath + '/seizeTreasure/progressList',
        async: true,
        dataType: "json",
        success: function(data) {
            $.each(data.data, function(index, val) {
                $('.indiana_num').find('.fl').eq(index - 1).text(val);
                if (index == 1) {
                    $('.progress').eq(index - 1).width(((val / 988) * 100).toFixed(2) + '%');
                } else if (index == 2) {
                    $('.progress').eq(index - 1).width(((val / 3988) * 100).toFixed(2) + '%');
                } else if (index == 3) {
                    $('.progress').eq(index - 1).width(((val / 3000) * 100).toFixed(2) + '%');
                } else if (index == 4) {
                    $('.progress').eq(index - 1).width(((val / 3000) * 100).toFixed(2) + '%');
                } else if (index == 5) {
                    $('.progress').eq(index - 1).width(((val / 3500) * 100).toFixed(2) + '%');
                } else if (index == 6) {
                    $('.progress').eq(index - 1).width(((val / 6000) * 100).toFixed(2) + '%');
                }

            });
        }
    });
};
//一钻夺宝数量加
$('.addition').off().on("click", function() {
    var _this = this;
    var addVal = $(_this).parents('.select').find('.myInput').val();
    addVal++;
    $(_this).parents('.select').find('.myInput').val(addVal);
});
//一钻夺宝数量减
$('.subtraction').off().on("click", function() {
    var _this = this;
    var subVal = $(_this).parents('.select').find('.myInput').val();
    subVal--;
    if (subVal >= 1) {
        $(_this).parents('.select').find('.myInput').val(subVal);
    }
});
// 一钻夺宝点击购买
$('.diamondBtn').on('click', function() {
    var _this = this;
    var which_one = $(_this).attr('which_one');
    var testNum = /[1-9]\d*/;
    var buyNum = $(_this).parents('.detail1').find('.select').find('.myInput').val();
    if (testNum.test(buyNum)) {
        $.ajax({
            type: "get",
            url: httpPath + "/seizeTreasure/buy",
            async: true,
            data: {
                uid: playerId,
                activeId:activeid,
                which_one: which_one,
                num: buyNum
            },
            beforeSend: function(XMLHttpRequest) {
                $(".loding").show();
                $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
            },
            dataType: "json",
            success: function(data) {
                $(".loding").hide();
                if (data.code == 1) {
                    alert(data.msg);
                    $(_this).parents('.detail1').find('.select').find('.myInput').val(1);
                    indiana();
                } else {
                    alert(data.msg);
                    $(_this).parents('.detail1').find('.select').find('.myInput').val(1);
                }
            }
        });
    } else {
        alert('请输入合法数字');
    }
});

// 趣味掷骰子活动规则
$('.specificationbtn').off().on('click',function(){
    $(".rulesoffundice_box").css({"top": (scrollHeight) + "px"});
    $('.rulesoffundice_box').show();
});
// 趣味掷骰子活动规则关闭
$('.rulesoffundicebackbtn').off().on('click',function(){
    $('.rulesoffundice_box').hide();
});
// 骰子人物位置以及积分数量
function characterposition(){
    $.ajax({
        type: 'GET',
        url: httpPath + '/qzjactive/dice/getIntegralHaved',
        async: true,
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 1) {
                playerposition=data.index;
                let star='#square'+playerposition;
                $(star).addClass('square-player');
                $('.currentpoints_text>span').text(data.data);
            } else {
                alert(data.msg);
            }
        }
    })
}
// 骰子点击事件
$('.dicerollerbtn').off().on('click',function(){
    $('.dicerollerbtn').css({
        'pointer-events': 'none'
    });
    $.ajax({
        type: 'GET',
        url: httpPath + '/qzjactive/dice/rollTheDice',
        async: true,
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 1) {
                var math1=data.len;
                rollthedice(math1,data.index);
                if(data.data.length != 0){
                    var length=data.data;
                    var skilllength=data.data.skill;
                    var carlength=data.data.car;
                    var titlelength=data.data.title;
                    var bubblelength=data.data.bubble;
                    var str='';
                    if(length.diamond>0){
                        str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/money/diamond.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.diamond+'</span></li>';
                    }
                    if(length.money>0){
                        str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/money/wing.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.money+'</span></li>';
                    }
                    if(length.ticket>0){
                        str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/dragon/point.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.ticket+'</span></li>';
                    }
                    if(length.green>0){
                        str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/WinterSolstice/green.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.green+'</span></li>';
                    }
                    if(length.purple>0){
                        str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/WinterSolstice/purple.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.purple+'</span></li>';
                    }
                    for(i=0;i<skilllength.length;i++){
                        str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/skill/skill_prop_'+skilllength[i].sid+'@2x.png" alt="" id="skill_img"><span class="winningtime_text">×'+skilllength[i].num+'</span></li>';
                    }
                    for(i=0;i<carlength.length;i++){
                        str+='<li class="intermediaterecord_box"><img src="'+path+'car/icon_'+carlength[i].sid+'@2x.png"" alt="" id="car_img"><span class="winningtime_text">×'+(parseInt(carlength[i].num)/3600).toFixed(0)+'小时</span></li>';
                    }
                    for(i=0;i<titlelength.length;i++){
                        str+='<li class="intermediaterecord_box"><img src="'+path+'title1/animation_title_'+titlelength[i].sid+'.png"" alt="" id="title_img"><span class="winningtime_text">×'+(parseInt(titlelength[i].num)/3600).toFixed(0)+'小时</span></li>';
                    }
                    for(i=0;i<bubblelength.length;i++){
                        str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/httpServer/image/chat_bubble/'+bubblelength[i].sid+'/bubble_shop@2x.png"" alt="" id="bubble_img"><span class="winningtime_text">×'+(parseInt(bubblelength[i].num)/3600).toFixed(0)+'小时</span></li>';
                    }
                    $('.diceroller_content').html(str);
                }else{
                    $('.diceroller_content').html('暂未中奖');
                }
            } else {
                $('.dicerollerbtn').css({
                    'pointer-events': 'auto'
                });
                alert(data.msg);
            }
        }
    });
});
// 摇骰子添加骰子
function rollthedice(math1,ending){
    var content='';
    let pic=math1;
    for(i=0;i<16;i++,pic++){
        if(pic>=7){
            pic=pic-7;
            content+='<img src="http://obs.99yuyin.com/h5/activity/huodong/Anniversaryoftheactivity/'+pic+'.png">';
        }else{
            content+='<img src="http://obs.99yuyin.com/h5/activity/huodong/Anniversaryoftheactivity/'+pic+'.png">';
        }
    }
    $('.diceroller').html(content);
    rollthediceanimation(math1,ending);
}
// 摇骰子动画
function rollthediceanimation(math1,ending){
    diceleft=0;
    var dice=setInterval(function(){
        diceleft=diceleft+0.118;
        $('.diceroller').css({
            'margin-left':'-'+diceleft+'rem'
        })
    },50);
    setTimeout(function(){
        clearInterval(dice);
        var dice1=setInterval(function(){
            diceleft=diceleft+0.118;
            $('.diceroller').css({
                'margin-left':'-'+diceleft+'rem'
            })
        },25);
        setTimeout(function(){
            clearInterval(dice1);
            var dice2=setInterval(function(){
                diceleft=diceleft+0.118;
                $('.diceroller').css({
                    'margin-left':'-'+diceleft+'rem'
                })
            },50);
            setTimeout(function(){
                clearInterval(dice2);
                var dice3=setInterval(function(){
                    diceleft=diceleft+0.118;
                    $('.diceroller').css({
                        'margin-left':'-'+diceleft+'rem'
                    })
                },100);
                setTimeout(function(){
                    clearInterval(dice3);
                    peoplemove(math1,ending);
                },1000);
            },500);
        },625);
    },1000);
}
// 人物移动
function peoplemove(math1,ending){
    var people=setInterval(function(){
        let star='#square'+playerposition;
        playerposition=parseInt(playerposition)+1;
        if(playerposition>35){
            playerposition=0;
        }
        let end='#square'+playerposition;
        $(star).removeClass('square-player');
        $(end).addClass('square-player');
    },400);
    setTimeout(function(){
        clearInterval(people);
        $(".diceroller_box").css({"top": (scrollHeight + height / 2 -50) + "px"})
        $('.diceroller_box').show();
        setTimeout(function(){
            $('#square'+ending).removeClass('square-player');
            characterposition();
            $('.diceroller_box').hide();
            $('.dicerollerbtn').css({
                'pointer-events': 'auto'
            });
        }, 1400);
    },400*math1);
}
// 点击摇骰子奖励记录
$('.warehousebtn').off().on('click',function(){
    dicerecord();
})
// 摇骰子奖励记录
function dicerecord(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/dice/getDiceBill",
        async: true,
        beforeSend: function(XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
        },
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: "json",
        success: function(data) {
            $(".loding").hide();
            if (data.code == 1) {
                var length=data.total;
                var skilllength=data.total.skill;
                var carlength=data.total.car;
                var titlelength=data.total.title;
                var bubblelength=data.total.bubble;
                var str='';
                if(length.diamond>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/money/diamond.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.diamond+'</span></li>';
                }
                if(length.money>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/money/wing.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.money+'</span></li>';
                }
                if(length.ticket>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/dragon/point.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.ticket+'</span></li>';
                }
                if(length.green>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/WinterSolstice/green.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.green+'</span></li>';
                }
                if(length.purple>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/WinterSolstice/purple.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.purple+'</span></li>';
                }
                for(i=0;i<skilllength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/skill/skill_prop_'+skilllength[i].sid+'@2x.png" alt="" id="skill_img"><span class="winningtime_text">×'+skilllength[i].num+'</span></li>';
                }
                for(i=0;i<carlength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="'+path+'car/icon_'+carlength[i].sid+'@2x.png"" alt="" id="car_img"><span class="winningtime_text">×'+(parseInt(carlength[i].num)/3600).toFixed(0)+'小时</span></li>';
                }
                for(i=0;i<titlelength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="'+path+'title1/animation_title_'+titlelength[i].sid+'.png"" alt="" id="title_img"><span class="winningtime_text">×'+(parseInt(titlelength[i].num)/3600).toFixed(0)+'小时</span></li>';
                }
                for(i=0;i<bubblelength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/httpServer/image/chat_bubble/'+bubblelength[i].sid+'/bubble_shop@2x.png"" alt="" id="bubble_img"><span class="winningtime_text">×'+(parseInt(bubblelength[i].num)/3600).toFixed(0)+'小时</span></li>';
                }
                $('.diceroller_content1').html(str);
                $(".diceroller_box1").css({"top": (scrollHeight + height / 2 -200) + "px"})
                $('.diceroller_box1').show();
            } else {
                alert(data.msg);
            }
        }
    });
}
// 关闭摇骰子奖励记录
$('.dicerollerBtn').off().on('click',function(){
    $('.diceroller_box1').hide();
});

// 放飞梦想活动规则
$('.kiterulebtn').off().on('click',function(){
    $(".rulesforflyingdreams_box").css({"top": scrollHeight + "px"})
    $('.rulesforflyingdreams_box').show();
});
// 放飞梦想活动规则关闭
$('.rulesforflyingdreamsbackbtn').off().on('click',function(){
    $('.rulesforflyingdreams_box').hide();
});
// 风筝状态
function statekite(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/fly/getFlyStatus",
        async: true,
        beforeSend: function(XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
        },
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: "json",
        success: function(data) {
            $(".loding").hide();
            if (data.code == 1) {
                $('.heightmeter').text(data.score_max);
                $('.lastmeter').text(data.score_last);
                $('.test-txt').html('点击放飞<br>剩余<span>'+data.count+'</span>次');
                if(data.count>0){
                    $('.test-content').addClass('test_content');
                    // 风筝点击事件
                    $('.test_content').off().on('click',function(){
                        $('.test_content').css({
                            'pointer-events': 'none'
                        });
                        $.ajax({
                            type: "get",
                            url: httpPath + "/qzjactive/fly/gotoFly",
                            async: true,
                            beforeSend: function(XMLHttpRequest) {
                                $(".loding").show();
                                $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                            },
                            data: {
                                playerId: playerId,
                                activeId:activeId,
                            },
                            dataType: "json",
                            success: function(data) {
                                $(".loding").hide();
                                if (data.code == 1) {
                                    math=(data.score_last/40).toFixed(0);
                                    flyinganimation(data.score_last);
                                } else {
                                    alert(data.msg);
                                }
                            }
                        });            
                    });
                }
            } else {
                alert(data.msg);
            }
        }
    });
}
// 风筝动画
function flyinganimation(score_last){
    var delay=setInterval(function(){
        num=parseInt(num)+parseInt(math);
        a=a-0.25;
        b=b-((Math.floor(Math.random()*20)-10)/160).toFixed(3);
        if(score_last>=3000){
            c=c-(Math.floor(Math.random()*5)/100).toFixed(2);
        }else{
            c=c-(Math.floor(Math.random()*9)/100).toFixed(2);
        };
        $('.test').css({
            'margin-top':'-'+a+'rem'
        });
        $('.test-content').css({
            'left':b+'rem',
            'top':c+'rem'
        });
        $('.test-txt').text(num+'米');
    },100);
    setTimeout(function(){
        clearInterval(delay);
        $('.test-txt').text(score_last+'米');
        setTimeout(function(){
            $('.test-content').css({
                'pointer-events': 'auto'
            });
            $('.test-content').css({
                'left':b+'rem',
                'top':c+'rem'
            });
            $('.test').css({
                'margin-top':'-'+a+'rem'
            });
            statekite();
            kitewas();
        },800);
        math=0;
        num=0;
        a=10.5;
        b=3.5;
        c=3.6;
    },4000);
}
// 风筝排行榜
function kitewas(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/fly/getFlyRank",
        async: true,
        beforeSend: function(XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
        },
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: "json",
        success: function(data) {
            $(".loding").hide();
            if (data.code == 1) {
                let kit=data.data;
                let str=''
                if(kit.length>0){
                    if(kit.length>10){
                        $('.Kite_list').css({
                            'height':'12rem',
                            'overflow':'scroll'
                        });
                    }
                    for(i=0;i<kit.length;i++){
                        let j=parseInt(i)+parseInt(1);
                        str+='<ul><li><P>'+j+'</P></li><li><img class="u_id" src="'+picHttp+kit[i].pic+'.png" uid="'+kit[i].uid+'"></li><li><p>'+kit[i].name+'</p></li><li><p>'+kit[i].score_max+'</p></li></ul>'
                    }
                }else{
                    str+="暂无排名"
                }
                $('.Kite_list').html(str);
                $(".u_id").on("click",function(){
                    var type = $(this).attr("uid");
                    if(type){
                        if(/iphone|ipad|ipod/.test(ua)) {
                            getIosPersonDetails(type);
                        } else {
                            getAndroidPersonDetails(type);
                        }
                    }
                });
            } else {
                alert(data.msg);
            }
        }
    });
}

// 星系探索活动规则
$('.ruledescriptionbtn').off().on('click',function(){
    $(".rulesofgalaxy_box").css({"top": (scrollHeight) + "px"})
    $('.rulesofgalaxy_box').show();
});
// 星系探索活动规则关闭
$('.rulesofgalaxybackbtn').off().on('click',function(){
    $('.rulesofgalaxy_box').hide();
});
// 探索二级页面  点击探索
$('.goandexplorebtn').off().on('click',function(){
    var that=this;
    var exploreid=$(that).attr('id');
    $('.primarygalaxies_title').css({
        'background-image':'url("http://obs.99yuyin.com/h5/activity/huodong/Anniversaryoftheactivity/星系-'+exploreid+'.png")'
    });
    $('.galaxy_firstpage').hide();
    $('.galaxy_secondpage').show();
    var data=parseInt(exploreid)*3;
    for(i=0;i<3;i++,data++){
        if(explore_config[data].uid==3){
            $('.star_box>img').css({
                'width': '1.9rem',
                'height': '1.7rem',
                'margin-left':'-0.2rem',
                'float':'left',
            });
        }else{
            $('.star_box>img').css({
                'width': '1.7rem',
                'height': '1.7rem',
                'margin-left':'0rem',
                'float':'left',
            });
        }
        $('.star_box').eq(i).find('img').attr('src','http://obs.99yuyin.com/h5/activity/huodong/Anniversaryoftheactivity/星球'+explore_config[data].uid+'.png');
        $('.explore_box').eq(i).find('img').attr('src','http://obs.99yuyin.com/h5/activity/huodong/Anniversaryoftheactivity/碎片'+explore_config[data].uid+'.png');
        $('.explore_box').eq(i).find('span').text(explore_config[data].time);
        let text='开始探索（<span>'+explore_config[data].diamond+'</span>钻/次）';
        $('.startexploringbtn').eq(i).html(text);
        $('.startexploringbtn').eq(i).attr('id',explore_config[data].id);  
        $('.startexploringbtn').eq(i).addClass('startexploringBtn');
    };
    thestateofexplore();
    $('.startexploringBtn').off().on('click',function(){
        var that=this;
        var type=$(that).attr('id');
        $.ajax({
            type: "get",
            url: httpPath + "/qzjactive/explore/startExploreGalaxies",
            async: true,
            beforeSend: function(XMLHttpRequest) {
                $(".loding").show();
                $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
            },
            data: {
                playerId: playerId,
                activeId:activeId,
                type: type
            },
            dataType: "json",
            success: function(data) {
                $(".loding").hide();
                if (data.code == 1) {
                    alltime=data.data;
                    //所需时间
                    adventure(type);
                } else {
                    alert(data.msg);
                }
            }
        });

    });
});
// 探索二级页面关闭
$('.return_text').off().on('click',function(){
    $('.galaxy_firstpage').show();
    $('.galaxy_secondpage').hide();
});
// 探索状态  碎片数量
function thestateofexplore(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/explore/getExploreGalaxiesStatus",
        async: true,
        beforeSend: function(XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
        },
        data: {
            playerId: playerId,
            activeId:activeId,
        },
        dataType: "json",
        success: function(data) {
            $(".loding").hide();
            if (data.code == 1) {
                let backpack=data.backpack;
                if(data.data.length != 0){
                    alltime=data.data.time;
                    adventure(data.data.type);
                }
                for(i=0;i<backpack.length;i++){
                    let k=9-parseInt(backpack[i].sid)
                    $('.fragmentoutputnum').eq(k).text(backpack[i].num);
                    for(a=0;a<4;a++){
                        $('.fragmentkuang').eq(a).find('li').eq(k).find('p').find('span').text(backpack[i].num);
                    }
                }
            } else {
                alert(data.msg);
            }
        }
    });
}
// 获取探索id 来计算以及倒计时时间
function adventure(type){
    let startid=9-parseInt(type);
    let exploreid=Math.floor(startid/3).toFixed(0);
    let id=startid%3;
    console.log(startid+'***'+exploreid+'...'+id);
    // 探索返回成功
    $('.startexploringbtn').removeClass('startexploringBtn').addClass('startexploringbtnRemove').css({
        'pointer-events': 'none'
    });
    $('.goandexplorebtn').addClass('goandexplorebtnRemove').css({
        'pointer-events': 'none'
    });
    $('.startexploringbtn').eq(id).removeClass('startexploringbtnRemove').addClass('startexploringbtnAdd').css({
        'pointer-events': 'auto'
    });
    $('.goandexplorebtn').eq(exploreid).removeClass('goandexplorebtnRemove').text('前往查看').css({
        'pointer-events': 'auto'
    });
    $('.startexploringbtn').eq(id).prev().show();
    adventuretime();
}
// 探索倒计时
function adventuretime(){
    let data =  new Date();
    let NowTime =(data.getTime()/1000).toFixed(0);
    end_time=parseInt(alltime)+parseInt(NowTime);
    var delay=setInterval(function(){
        // 精确到秒的  所有下面我就除以了1000，不要小数点后面的
        var data =  new Date();
        var NowTime =(data.getTime()/1000).toFixed(0);
        //如果后台给的是毫秒 上面不用除以1000  下面的计算时间也都要除以1000 这里我去掉1000了
        if(NowTime<=end_time){
            var t =end_time -NowTime;
            $('.adventuretime').width(((t / alltime) * 100).toFixed(2) + '%');
            var m=Math.floor(t/60%60);//分 var m=Math.floor(t/1000/60%60)
            $('.adventure_text').text(t+'s/'+alltime+'s');
            let a=parseInt(m*50)+50;
            let text='立即完成（<span>'+a+'</span>钻/次）';
            $('.startexploringbtnAdd').html(text);
            $('.startexploringbtnAdd').off().on('click',function(){
                let type=$('.startexploringbtnAdd').attr('id');
                $.ajax({
                    type: "get",
                    url: httpPath + "/qzjactive/explore/receiveAward",
                    async: true,
                    beforeSend: function(XMLHttpRequest) {
                        $(".loding").show();
                        $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                    },
                    data: {
                        playerId: playerId,
                        activeId:activeId,
                        type: type,
                        diamondNow:1
                    },
                    dataType: "json",
                    success: function(data) {
                        $(".loding").hide();
                        if (data.code == 1) {
                            clearInterval(delay);
                            alltime=0;
                            end_time=0;
                            let picnum=108-parseInt(data.data.special[0].sid);
                            let num=data.data.special[0].num;
                            adventuresuc(picnum,num);
                            $('.startexploringbtn').prev().hide();
                        } else {
                            alert(data.msg);
                        }
                    }
                });
            });
        }else{
            clearInterval(delay);
            alltime=0;
            end_time=0;
            $('.startexploringbtn').prev().hide();
            $('.startexploringbtnAdd').addClass('startexploringbtnadd').removeClass('startexploringbtnAdd');
            $('.startexploringbtnadd').html('立即领取');
            $('.startexploringbtnadd').off().on('click',function(){
                let type=$('.startexploringbtnadd').attr('id');
                $.ajax({
                    type: "get",
                    url: httpPath + "/qzjactive/explore/receiveAward",
                    async: true,
                    beforeSend: function(XMLHttpRequest) {
                        $(".loding").show();
                        $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                    },
                    data: {
                        playerId: playerId,
                        activeId:activeId,
                        type: type,
                        diamondNow:0
                    },
                    dataType: "json",
                    success: function(data) {
                        $(".loding").hide();
                        if (data.code == 1) {
                            let picnum=108-parseInt(data.data.special[0].sid);
                            let num=data.data.special[0].num;
                            $('.startexploringbtn').prev().hide();
                            adventuresuc(picnum,num);
                        } else {
                            alert(data.msg);
                        }
                    }
                });
            });
        };
    },1000)
}
// 探索领取
function adventuresuc(picnum,num){
    let str='<li><img src="http://obs.99yuyin.com/h5/activity/huodong/Anniversaryoftheactivity/碎片'+picnum+'.png"><span>×'+num+'个</span>'
    $('.successexploring').html(str);
    $(".successexploring_box").css({"top": (scrollHeight + height / 2 -50) + "px"});
    $('.successexploring_box').show();

    $('.successexploringbtn').off().on('click',function(){
        $('.startexploringbtn').removeClass('startexploringbtnRemove').removeClass('startexploringbtnAdd').removeClass('startexploringbtnadd').addClass('startexploringBtn').css({
            'pointer-events': 'auto'
        });
        $('.goandexplorebtn').removeClass('goandexplorebtnRemove').text('前往探索').css({
            'pointer-events': 'auto'
        });
        $('.galaxy_firstpage').show();
        $('.galaxy_secondpage').hide();
        $('.successexploring_box').hide();
    });
    thestateofexplore();
    adventureexchange();
}
// 探索奖励兑换
function adventureexchange(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/explore/exchangeDebrisToBoxStatus",
        async: true,
        dataType: 'json',
        data: {
            playerId: playerId,
            activeId:activeId
        },
        success: function(data) {
            if (data.code == 1) {
                var adventureData = data.data;
                for (var i = 0; i < adventureData.length; i++) {
                    // if(parseInt($('.fragmentoutputnum').eq(0).text())>=parseInt(adventureData[i].need_9)&&parseInt($('.fragmentoutputnum').eq(1).text())>=parseInt(adventureData[i].need_8)&&parseInt($('.fragmentoutputnum').eq(2).text())>=parseInt(adventureData[i].need_7)&&parseInt($('.fragmentoutputnum').eq(3).text())>=parseInt(adventureData[i].need_6)&&parseInt($('.fragmentoutputnum').eq(4).text())>=parseInt(adventureData[i].need_5)&&parseInt($('.fragmentoutputnum').eq(5).text())>=parseInt(adventureData[i].need_4)&&parseInt($('.fragmentoutputnum').eq(6).text())>=parseInt(adventureData[i].need_3)&&parseInt($('.fragmentoutputnum').eq(7).text())>=parseInt(adventureData[i].need_2)&&parseInt($('.fragmentoutputnum').eq(8).text())>=parseInt(adventureData[i].need_1)){
                        $(".exchangebtn").eq(i).attr("draw", 0);
                    // }else{
                    //     $(".exchangebtn").eq(i).attr("draw", 1);
                    // }
                    $(".exchangebtn").eq(i).attr("uid", adventureData[i].id);
                    $(".exchangebtn>span").eq(i).text(adventureData[i].draw+'/'+adventureData[i].max_count);
                };
                for (var i = 0; i < adventureData.length; i++) {
                    if ($(".exchangebtn").eq(i).attr('draw') == 0) {
                        $(".exchangebtn").eq(i).addClass("exchangebtnAdd");
                        $(".exchangebtnAdd").off().one("click", function(e) {
                            var that = this;
                            var type = $(that).attr("uid");
                            $.ajax({
                                type: "get",
                                url: httpPath + "/qzjactive/explore/exchangeDebrisToBox",
                                async: true,
                                beforeSend: function(XMLHttpRequest) {
                                    $(".loding").show();
                                    $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                                },
                                data: {
                                    playerId: playerId,
                                    activeId:activeId,
                                    type: type
                                },
                                dataType: "json",
                                success: function(data) {
                                    $(".loding").hide();
                                    if (data.code == 1) {
                                        alert('兑换成功');
                                        thestateofexplore();
                                        adventureexchange();
                                    } else {
                                        alert(data.msg);
                                    }
                                }
                            });
                            e.preventDefault();
                        })
                    }
                };
            };
        }
    });
}
// 探索纪录点击事件
$('.searchrecordsbtn').off().on('click',function(){
    explorerecord();
});
// 探索纪录
function explorerecord(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/explore/getExchangeBill",
        async: true,
        beforeSend: function(XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
        },
        data: {
            playerId: playerId,
            activeId:activeId,
            type:1
        },
        dataType: "json",
        success: function(data) {
            $(".loding").hide();
            if (data.code == 1) {
                let search=data.data;
                let str=''
                if(search.length>0){
                    if(search.length>10){
                        $('.searchrecords_list').css('height','10rem')
                    }
                    for(i=0;i<search.length;i++){
                        let j=parseInt(108)-parseInt(search[i].special[0].sid);
                        str+='<ul><li><img src="http://obs.99yuyin.com/h5/activity/huodong/Anniversaryoftheactivity/碎片'+j+'.png"><span>×'+search[i].special[0].num+'</span></li><li>'+search[i].create_time+'</li></ul>'
                    }
                }else{
                    str+="暂无纪录"
                }
                $('.searchrecords_list').html(str);
                $(".searchrecords_Box").css({"top": (scrollHeight+100) + "px"})
                $('.searchrecords_Box').show();
            } else {
                alert(data.msg);
            }
        }
    });
}
// 探索纪录关闭事件
$('.removesearchrecordsbtn').off().on('click',function(){
    $('.searchrecords_Box').hide();
})
// 宝箱兑换活动规则
$('.winningrecordrulebtn').off().on('click',function(){
    $(".rulesoftreasure_box").css({"top": (scrollHeight) + "px"})
    $('.rulesoftreasure_box').show();
});
// 宝箱兑换活动规则关闭
$('.rulesoftreasurebackbtn').off().on('click',function(){
    $('.rulesoftreasure_box').hide();
});
// 碎片兑换纪录点击事件
$('.winningrecordbtn').off().on('click',function(){
    fragmentexchangerecord();
});
// 碎片兑换纪录
function fragmentexchangerecord(){
    $.ajax({
        type: "get",
        url: httpPath + "/qzjactive/explore/getExchangeBill",
        async: true,
        beforeSend: function(XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
        },
        data: {
            playerId: playerId,
            activeId:activeId,
            type:2
        },
        dataType: "json",
        success: function(data) {
            $(".loding").hide();
            if (data.code == 1) {
                var length=data.total;
                var skilllength=data.total.skill;
                var carlength=data.total.car;
                var titlelength=data.total.title;
                var bubblelength=data.total.bubble;
                var str='';
                if(length.diamond>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/money/diamond.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.diamond+'</span></li>';
                }
                if(length.money>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/money/wing.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.money+'</span></li>';
                }
                if(length.ticket>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/dragon/point.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.ticket+'</span></li>';
                }
                if(length.green>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/WinterSolstice/green.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.green+'</span></li>';
                }
                if(length.purple>0){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/WinterSolstice/purple.png" alt="" id="crystal_img"><span class="winningtime_text">×'+length.purple+'</span></li>';
                }
                for(i=0;i<skilllength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/h5/activity/skill/skill_prop_'+skilllength[i].sid+'@2x.png" alt="" id="skill_img"><span class="winningtime_text">×'+skilllength[i].num+'</span></li>';
                }
                for(i=0;i<carlength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="'+path+'car/icon_'+carlength[i].sid+'@2x.png"" alt="" id="car_img"><span class="winningtime_text">×'+(parseInt(carlength[i].num)/3600).toFixed(0)+'小时</span></li>';
                }
                for(i=0;i<titlelength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="'+path+'title1/animation_title_'+titlelength[i].sid+'.png"" alt="" id="title_img"><span class="winningtime_text">×永久</span></li>';
                }
                for(i=0;i<bubblelength.length;i++){
                    str+='<li class="intermediaterecord_box"><img src="http://obs.99yuyin.com/httpServer/image/chat_bubble/'+bubblelength[i].sid+'/bubble_shop@2x.png"" alt="" id="bubble_img"><span class="winningtime_text">×'+(parseInt(bubblelength[i].num)/3600).toFixed(0)+'小时</span></li>';
                }
                $('.winninggift_box').html(str);
                $('.winningrecord_text').html('兑换纪录');
                $(".winningrecord_box").css({"top": (scrollHeight + height / 2 -200) + "px"})
                $('.winningrecord_box').show();
            } else {
                alert(data.msg);
            }
        }
    });
}
// 碎片兑换内容
$('.planettreasurechest_content>img').off().on('click',function(){
    let num=$(this).attr('uid')
    $(".chest_Box").css({"top": (scrollHeight + height / 2 -50) + "px"})
    $('.chest_Box').eq(num).show();
});
// 碎片兑换内容关闭
$('.surebtn').off().on('click',function(){
    $('.chest_Box').hide();
})