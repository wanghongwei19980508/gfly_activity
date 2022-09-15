// svg
var player = new SVGA.Player('.eggimg');
var parser = new SVGA.Parser('.eggimg'); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
player.loops = 1;


var playerId = 132874;
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

index();

function index() {
    pageData();
    carousel();
}
// 砸蛋轮播
function carousel() {
    $.ajax({
        type: "get",
        url: "获取数量接口地址",  //获取数量接口地址
        async: true,
        data: {
            playerId: playerId
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                let Data = data.data;
                let str = "";
                for (let i = 0; i < Data.length; i++) {
                    let data = giftNameByBackground(Data[i].type, Data[i].num, Data[i].sid);
                    str += `<li><p>恭喜：<span class="nametext">${Data[i].name}</span>获得<span class="rewardtext">${data.name}x${data.num}</span></p></li>`;
                }
                $(".congratulationsbox>ul").html(str);
                var c = new shuffling($(".congratulationsbox"), $(".congratulationsbox>ul"), $('.congratulationsbox>ul>li'), 3000);
                c.init();
            }
        }
    })
}
// 按钮样式切换
$('.hammerbtn').off().on('click', function () {
    $('.hammerbtn').removeClass('hammerAdd');
    $(this).addClass('hammerAdd');
});
function pageData() {
    $.ajax({
        type: "get",
        url: "切换接口？",  //
        async: true,
        data: {
            playerId: playerId
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                let luckynum = data.data.luckynum;
                let diamond = data.data.diamond;
                let hammer = data.data.hammer;
                $('.diamondshammerbox').find('li').eq(0).find('p').eq(0).find('span').text(diamond);
                $('.diamondshammerbox').find('li').eq(1).find('p').eq(0).find('span').text(hammer);
                $('.luckynum').text(luckynum);
            }
        }
    })
}
$('.imfeelingbtn').off().on('click', function () {
    $(".myinput").val(1);
    $('.pricecontent>p>span').text(200);
    // pageData();
    setTimeout(function () {
        let hammer = $('.diamondshammerbox').find('li').eq(1).find('p').eq(0).find('span').text();
        let num = $('.hammerAdd').attr('uid');
        if (parseInt(hammer) >= parseInt(num)) {
            smashEggs(num);
        } else {
            $('.backG_black , .buyhammerpopupbox').show();
        }
    }, 500)
});

$('.plusbtn').off().on("click", function () {
    var addVal = $('.myinput').val();
    addVal++;
    $('.myinput').val(addVal);
    $('.pricecontent>p>span').text(addVal * 200);
});
$('.reducebtn').off().on("click", function () {
    var reduceVal = $('.myinput').val();
    reduceVal--;
    if (reduceVal >= 1) {
        $('.myinput').val(reduceVal);
        $('.pricecontent>p>span').text(reduceVal * 200);
    }
});
$('.myinput').on("input", function () {
    var myinputVal = $('.myinput').val();
    $('.pricecontent>p>span').text(myinputVal * 200);
});

$(".confirmationbtn").off().on("click", function () {
    buyhammer();
})
$(".cancelbtn").off().on("click", function () {
    $(".backG_black , .buyhammerpopupbox").hide();
    $(".backG_black , .diamondshortagepopupbox").hide();
})
$(".torechargebtn").off().on("click", function () {
    // 跳到星恋充值页面
})
// 购买锤子
function buyhammer() {
    var myinput = $(".myinput").val();  //给后台传值
    $.ajax({
        type: "get",
        url: "获取购买锤子接口地址",  //获取购买锤子接口地址
        async: true,
        data: {
            playerId: playerId,
            number: myinput  //给后台传值
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                let type = data.data.type;
                let msg = data.data.msg;
                if (type == 0) {
                    $(".backG_black , .buyhammerpopupbox").hide();
                    $(".backG_black , .buysuccesspopupbox").show();
                    setTimeout(function () {
                        $(".backG_black , .buysuccesspopupbox").hide();
                    }, 500)
                } else if (type == 1) {
                    $(".backG_black , .buyhammerpopupbox").hide();
                    $('.backG_black , .diamondshortagepopupbox').show();
                } else {
                    alert(msg);
                }
            }
        }
    })
}
// 
function smashEggs(num) {
    parser.load('../svg/egg.svga', function (videoItem) {
        $('.eggimg').css({ 'background-image': 'url()' });
        player.setVideoItem(videoItem);
        player.startAnimation();
        // 动画结束
        player.onFinished(function () {
            $('.eggimg').css({ 'background-image': 'url("../img/蛋.png")' });
            setTimeout(function () {
            }, 2000);
            $.ajax({
                type: "get",
                url: "获取砸蛋接口",
                async: true,
                data: {
                    playerId: playerId,
                    type: num
                },
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        let str = "";
                        let Data = data.data;
                        if (Data.length > 1) {
                            for (let i = 0; i < Data.length; i++) {
                                let data = giftNameByBackground(Data[i].type, Data[i].num, Data[i].sid);
                                str += `<li class="hammerthlist"><img class="little${data.classname}" src="${data.img}" alt=""><p>${data.name}<span>x${data.num}</span></p></li>`;
                            }
                            $(".hammerthpopupbox>div").html(str);
                            $('.backG_black , .hammerthpopupbox').show();
                        } else {
                            let data = giftNameByBackground(Data[i].type, Data[i].num, Data[i].sid);
                            str += `<div class="hammeronecontent"><img class="little${dta.classname}" src="${data.img}" alt=""><p>${data.name}<span>x${data.num}</span></p></div>`;
                            $(".hammeronepopupbox").html(str);
                            $('.backG_black , .hammeronepopupbox').show();
                        }
                        setTimeout(function () {
                            $(".backG_black , .hammeronepopupbox , .hammerthpopupbox").hide();
                        }, 3000)
                    }
                }
            })
        });
    });
}
// 关闭按钮
$('.closebtn').off().on('click', function () {
    $('.backG_black , .prizepoolpopupbox , .rulepopupbox , .nowinningrecordpopupbox , .winningrecordpopupbox , .dailylistpopupbox').hide();
});
// 本期奖池弹窗
$('.prizepoolbtn').off().on('click', function () {
    $.ajax({
        type: "get",
        url: "获取本期奖池接口",
        async: true,
        dataType: "json",
        data: {
            playerId: playerId
        },
        success: function (data) {
            if (data.code == 1) {
                var str = "";
                var Data = data.data;
                for (let i = 0; i < Data.length; i++) {
                    let data = giftNameByBackground(Data[i].type, Data[i].sid, Data[i].num);
                    str += `<li class="prizepoollist"><img class="little${data.classname}" src="${data.img}" alt=""><div><img src="../img/蓝钻.png" alt=""><span>${Data.rise}</span></div></li>`;
                }
                $(".prizepoolcontent").html(str);
                $('.backG_black , .prizepoolpopupbox').show();
            }
        }
    })
    $('.backG_black , .prizepoolpopupbox').show();
});
// 规则介绍弹窗
$('.activityrulesbtn').off().on('click', function () {

    $('.backG_black , .rulepopupbox').show();
});
// 
$('.winningrecordbtn').off().on('click', function () {
    $.ajax({
        type: "get",
        url: "获取中奖纪录接口",
        async: true,
        dataType: "json",
        data: {
            playerId: playerId
        },
        success: function (data) {
            if (data.code == 1) {
                var str = "";
                var Data = data.data;
                if (Data.length > 0) {
                    for (let i = 0; i < Data.length; i++) {
                        let data = giftNameByBackground(Data[i].type, Data[i].sid, Data[i].num);
                        str += `<li class="winningrecordlist"><div><p><span class="giftname">${data.name}</span><span class="giftnum">x${Data[i].num}</span><span class="giftdiamonds">(${Data[i].rise}钻石)</span></p><p>${Data[i].time}</p></div><img class="little${data.classname}" src="${data.img}" alt=""></li>`;
                    }
                    $(".winningrecordcontent").html(str);
                    $('.backG_black , .winningrecordpopupbox').show();
                } else {
                    $('.backG_black , .nowinningrecordpopupbox').show();
                }
            }
        }
    })
});
// 每日榜单弹窗
$('.dailylistbtn').off().on('click', function () {
    $.ajax({
        type: "get",
        url: "获取每日榜单接口",
        async: true,
        dataType: "json",
        data: {
            playerId: playerId
        },
        success: function (data) {
            if (data.code == 1) {
                var str = "";
                for (var i = 0; i < data.data.length; i++) {
                    let Data = giftNameByBackground(data.data[i].type, data.data[i].sid, data.data[i].num);
                    str += `<li class="dailylistlist"><p>${i + 1}</p><img src="${data.data[i].pic}" alt=""><div><p>${data.data[i].name}</p><p>${data.data[i].time}</p></div><div><p>${Data.name}</p><p>(${data.data[i].rise}钻石)</p></div></li>`;
                }
                $(".dailylistcontent").html(str);
                $('.backG_black , .dailylistpopupbox').show();
            }
        }
    })
});
