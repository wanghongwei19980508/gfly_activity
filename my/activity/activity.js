var activeId = 124,     //福利目标id
  activeId0 = 125,     //神秘寻宝id
  activeId1 = 126,     //神秘礼包id
  activeId2 = 127,     //砸金蛋id
  activeId3 = 128,     //超值返利id
  activeId4 = 129,     //充值榜单id
  // activeId4=132,     //消费榜单id
  activeId5 = 130,     //VIP折扣id
  activeId6 = 56,     //福星高照id  活动版本每次+1
  pageid = 0,       //按钮id     
  welfareid = 0,    //福利id
  stardayid = 0,    //福星高照id
  prizeslistday = 0,  //福星高照——奖励弹窗id
  luckystarday = 0,
  luckystarimg = 0,
  httpPath = '/ltf',
  path = 'http://obs.99yuyin.com/httpServer/image/',
  picHttp = 'http://obs.99yuyin.com/PlayerIcon/',
  roomHttp = 'http://obs.99yuyin.com/ChatRoomIcon/'
height = $(window).height(),
  scrollHeight = $(document).scrollTop();

var playerId = 0;
// var EquipmentCode = '';
index();
// var ua = navigator.userAgent.toLowerCase();
// if (/iphone|ipad|ipod/.test(ua)) {
//   getPlayerGUID();
// };
// //调用iOS获取用户ID,设备号方法//
// function getPlayerGUID() {
//   window.webkit.messageHandlers.getPlayerGUID.postMessage(null);//调用iOS获取用户ID方法
//   // window.webkit.messageHandlers.getDeviceUUID.postMessage(null);//调用iOS获取用户设备号方法
//   // window.webkit.messageHandlers.getPlayerName.postMessage(null);//调用iOS获取用户名方法
// };
// // //获取ios用户设备号//
// // function sendPlayerDevice(getDeveiceUUID){
// //     EquipmentCode=getDeveiceUUID;
// //     index();
// // }
// // //获取安卓用户设备号//
// // function sendDeviceUUID(getDeveiceUUID) {
// //     EquipmentCode=getDeveiceUUID;
// //     index();
// // };
// //获取安卓，ios用户ID//
// function sendPlayerGUID(playerGUID) {
//   playerId = playerGUID;
//   index(playerId);
// };
// // //获取安卓，ios用户名//
// // function sendPlayerName(playername) {
// //     var playername = playername;
// // };

function index() {
  signIn();
  progress();
  window.onscroll = function () {
    scrollHeight = $(document).scrollTop();
  }
}

// 按钮——切换页面
$('.pagebox>li').off().on('click', function () {
  res = new titleName($('.pagebox>li>div'), $('.change-box'), pageid, $(this).index());
  res.init();
  pageid = $(this).index();

  switch (true) {
    case (pageid == 0):
      progress();
      signIn();
      res = new titleName($('.welfareObjectives-content>li>div'), $('.welfare-box'), welfareid, 0);
      res.init();
      welfareid = 0;
      break;
    case (pageid == 1):
      treasure();
      greenShuffling();
      break;
    case (pageid == 2):
      gift();
      break;
    case (pageid == 3):
      vip();
      break;
    case (pageid == 4):
      smashEggs();
      shufflingOnEggs();
      break;
    case (pageid == 5):
      Rebate();
      moneyShuffling();
      break;
    case (pageid == 6):
      list();
      break;
    case (pageid == 7):
      luckyStars();
      break;
  };
});
// 福利目标——切换页面
$('.welfareObjectives-content>li').off().on('click', function () {
  res = new titleName($('.welfareObjectives-content>li>div'), $('.welfare-box'), welfareid, $(this).index());
  res.init();
  welfareid = $(this).index();
  switch (true) {
    case (welfareid == 0):
      signIn();
      break;
    case (welfareid == 1):
      recharge();
      break;
    case (welfareid == 2):
      consumeD();
      break;
    case (welfareid == 3):
      consumeG();
      break;
    case (welfareid == 4):
      consumeP();
      break;
  };
});
// 福利目标——签到
function signIn() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/welfare/signInfo",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        var Data = data.data.info;
        for (var i = 0; i < Data.length; i++) {
          $(".loginbtn").eq(i).attr("day", Data[i].day);
          $(".loginbtn").eq(i).attr("draw", Data[i].status);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".loginbtn").eq(i).attr('draw') == 1) {
            $(".loginbtn").eq(i).addClass("loginAdd");
            $(".loginbtn").eq(i).text("领取");
            $('.welfare-box').eq(0).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.dateNum);
            $(".loginAdd").off().one("click", function (e) {
              var that = this;
              var day = $(that).attr("day");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/welfare/receiveSign",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId,
                  active_v: activeId6,
                  day: day
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    $(that).text("已领取");
                    $(that).removeClass("loginAdd");
                    progress();
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".loginbtn").eq(i).attr('draw') == 2) {
            $('.welfare-box').eq(0).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.dateNum);
            $(".loginbtn").eq(i).text("已领取");
            $(".loginbtn").eq(i).removeClass("loginAdd");
          } else if ($(".loginbtn").eq(i).attr('draw') == 0) {
            $('.welfare-box').eq(0).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(data.data.num);
            $(".loginbtn").eq(i).text("未完成");
            $(".loginbtn").eq(i).removeClass("loginAdd");
          }
        };
      };
    }
  });
}
// 福利目标——充值钻石
function recharge() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/welfare/Recharge",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        var Data = data.data.info;
        for (let i = 0; i < Data.length; i++) {
          $(".rechargebtn").eq(i).attr("money", Data[i].money);
          $(".rechargebtn").eq(i).attr("draw", Data[i].status);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".rechargebtn").eq(i).attr('draw') == 1) {
            $('.welfare-box').eq(1).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.moneyNum);
            $(".rechargebtn").eq(i).addClass("rechargeAdd");
            $(".rechargebtn").eq(i).text("领取");
            $(".rechargeAdd").off().one("click", function (e) {
              var that = this;
              var money = $(that).attr("money");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/welfare/receiveRecharge",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId,
                  active_v: activeId6,
                  money: money
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    progress();
                    $(that).text("已领取");
                    $(that).removeClass("rechargeAdd");
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".rechargebtn").eq(i).attr('draw') == 2) {
            $('.welfare-box').eq(1).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.moneyNum);
            $(".rechargebtn").eq(i).text("已领取");
            $(".rechargebtn").eq(i).removeClass("rechargeAdd");
          } else if ($(".rechargebtn").eq(i).attr('draw') == 0) {
            $('.welfare-box').eq(1).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(data.data.money);
            $(".rechargebtn").eq(i).text("未完成");
            $(".rechargebtn").eq(i).removeClass("rechargeAdd");
          }
        };
      };
    }
  });
}
// 福利目标——消费钻石
function consumeD() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/welfare/consumeDiamonds",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        var Data = data.data.info;
        for (let i = 0; i < Data.length; i++) {
          $(".consumeDbtn").eq(i).attr("diamonds", Data[i].diamonds);
          $(".consumeDbtn").eq(i).attr("draw", Data[i].status);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".consumeDbtn").eq(i).attr('draw') == 1) {
            $('.welfare-box').eq(2).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.diamondsNum);
            $(".consumeDbtn").eq(i).addClass("consumeDAdd");
            $(".consumeDbtn").eq(i).text("领取");
            $(".consumeDAdd").off().one("click", function (e) {
              var that = this;
              var diamonds = $(that).attr("diamonds");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/welfare/receiveDiamonds",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId,
                  active_v: activeId6,
                  diamonds: diamonds
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    progress();
                    $(that).text("已领取");
                    $(that).removeClass("consumeDAdd");
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".consumeDbtn").eq(i).attr('draw') == 2) {
            $('.welfare-box').eq(2).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.diamondsNum);
            $(".consumeDbtn").eq(i).text("已领取");
            $(".consumeDbtn").eq(i).removeClass("consumeDAdd");
          } else if ($(".consumeDbtn").eq(i).attr('draw') == 0) {
            $('.welfare-box').eq(2).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(data.data.diamonds);
            $(".consumeDbtn").eq(i).text("未完成");
            $(".consumeDbtn").eq(i).removeClass("consumeDAdd");
          }
        };
      };
    }
  });
}
// 福利目标——消费绿水晶
function consumeG() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/welfare/consumeGreen",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        var Data = data.data.info;
        for (let i = 0; i < Data.length; i++) {
          $(".consumeGbtn").eq(i).attr("green", Data[i].green);
          $(".consumeGbtn").eq(i).attr("draw", Data[i].status);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".consumeGbtn").eq(i).attr('draw') == 1) {
            $('.welfare-box').eq(3).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.greenNum);
            $(".consumeGbtn").eq(i).addClass("consumeGAdd");
            $(".consumeGbtn").eq(i).text("领取");
            $(".consumeGAdd").off().one("click", function (e) {
              var that = this;
              var green = $(that).attr("green");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/welfare/receiveGreen",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId,
                  active_v: activeId6,
                  green: green
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    progress();
                    $(that).text("已领取");
                    $(that).removeClass("consumeGAdd");
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".consumeGbtn").eq(i).attr('draw') == 2) {
            $('.welfare-box').eq(3).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.greenNum);
            $(".consumeGbtn").eq(i).text("已领取");
            $(".consumeGbtn").eq(i).removeClass("consumeGAdd");
          } else if ($(".consumeGbtn").eq(i).attr('draw') == 0) {
            $('.welfare-box').eq(3).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(data.data.green);
            $(".consumeGbtn").eq(i).text("未完成");
            $(".consumeGbtn").eq(i).removeClass("consumeGAdd");
          }
        };
      };
    }
  });
}
// 福利目标——消费紫水晶
function consumeP() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/welfare/consumePurple",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        var Data = data.data.info;
        for (let i = 0; i < Data.length; i++) {
          $(".consumePbtn").eq(i).attr("purple", Data[i].purple);
          $(".consumePbtn").eq(i).attr("draw", Data[i].status);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".consumePbtn").eq(i).attr('draw') == 1) {
            $('.welfare-box').eq(4).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.purpleNum);
            $(".consumePbtn").eq(i).addClass("consumePAdd");
            $(".consumePbtn").eq(i).text("领取");
            $(".consumePAdd").off().one("click", function (e) {
              var that = this;
              var purple = $(that).attr("purple");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/welfare/receivePurple",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId,
                  purple: purple,
                  active_v: activeId6
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    progress();
                    $(that).text("已领取");
                    $(that).removeClass("consumePAdd");
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".consumePbtn").eq(i).attr('draw') == 2) {
            $('.welfare-box').eq(4).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.purpleNum);
            $(".consumePbtn").eq(i).text("已领取");
            $(".consumePbtn").eq(i).removeClass("consumePAdd");
          } else if ($(".consumePbtn").eq(i).attr('draw') == 0) {
            $('.welfare-box').eq(4).find('.cumulativeloginlist').eq(i).find('p').eq(0).find('span').text(data.data.purple);
            $(".consumePbtn").eq(i).text("未完成");
            $(".consumePbtn").eq(i).removeClass("consumePAdd");
          }
        };
      };
    }
  });
}
// 福利目标——目标奖励弹窗
$('.targetrewardbtn').off().on('click', function () {
  $('.targetrewardpopup').css({ "top": (scrollHeight + 50) + "px" })
  $('.backG_black , .targetrewardpopup').show();
});
$('.targetrewardclose').off().on('click', function () {
  $('.backG_black , .targetrewardpopup').hide();
});
// 福利目标——目标奖励玩法说明弹窗
$('.howtoplaybtn').off().on('click', function () {
  $('.welfareobjexplainbox').css({ "top": (scrollHeight + 50) + "px" })
  $('.backG_black , .welfareobjexplainbox').show();
});
$('.welfareobjexplainclose').off().on('click', function () {
  $('.backG_black , .welfareobjexplainbox').hide();
});
// 福利目标——用户任务进度
function progress() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/welfare/progress",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        $('.objnum').text(data.data.progress_count);
        $('.trcnum').text(data.data.progress_count);
        $('.objpercent').text(parseInt(data.data.percentage));
        $('.trcpercent').text(parseInt(data.data.percentage));
        $('.progressbar').css({ 'width': parseInt(data.data.percentage) + "%" });
        $('.schedulebar').css({ 'width': parseInt(data.data.percentage) + "%" });
        $('.targetrewardbox').hide();
        if (parseInt(data.data.percentage) < 5) {
          $('.targetrewardbox').eq(0).show();
        } else if (parseInt(data.data.percentage) < 10) {
          $('.targetrewardbox').eq(1).show();
        } else if (parseInt(data.data.percentage) < 30) {
          $('.targetrewardbox').eq(2).show();
        } else if (parseInt(data.data.percentage) < 60) {
          $('.targetrewardbox').eq(3).show();
        } else if (parseInt(data.data.percentage) < 100) {
          $('.targetrewardbox').eq(4).show();
        }
        var Data = data.data.info;
        for (let i = 0; i < Data.length; i++) {
          $(".scheduleachievedbtn").eq(i).attr("percentage", Data[i].percentage);
          $(".scheduleachievedbtn").eq(i).attr("draw", Data[i].status);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".scheduleachievedbtn").eq(i).attr('draw') == 1) {
            $('.scheduleachievedbox').find('.scheduleachievedlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.progressNum);
            $(".scheduleachievedbtn").eq(i).addClass("scheduleachievedAdd");
            $(".scheduleachievedbtn").eq(i).text("领取");
            $(".scheduleachievedAdd").off().one("click", function (e) {
              var that = this;
              var percentage = $(that).attr("percentage");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/welfare/receiveProgress",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId,
                  percentage: percentage,
                  active_v: activeId6
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    $(that).text("已领取");
                    $(that).removeClass("scheduleachievedAdd");
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".scheduleachievedbtn").eq(i).attr('draw') == 2) {
            $('.scheduleachievedbox').find('.scheduleachievedlist').eq(i).find('p').eq(0).find('span').text(Data[i].reward.progressNum);
            $(".scheduleachievedbtn").eq(i).text("已领取");
            $(".scheduleachievedbtn").eq(i).removeClass("scheduleachievedAdd");
          } else if ($(".scheduleachievedbtn").eq(i).attr('draw') == 0) {
            $('.scheduleachievedbox').find('.scheduleachievedlist').eq(i).find('p').eq(0).find('span').text(parseInt(data.data.percentage));
            $(".scheduleachievedbtn").eq(i).text("未完成");
            $(".scheduleachievedbtn").eq(i).removeClass("scheduleachievedAdd");
          }
        };
      };
    }
  });
}

// 神秘寻宝——神秘寻宝活动
function treasure() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/Treasure/TreasureInfo",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId0,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        $('.treasuretimenum').text(data.data.my_treasureMap);
      }
    }
  });
}
// 神秘寻宝——神秘寻宝单抽
$('.treasureonebtn').off().on('click', function () {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/Treasure/receiveTreasure",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId0,
      active_v: activeId6,
      type: 1,
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        let a = $('.green-lighting').attr('uid');
        let b = data.data.Num  //到达位置
        let c = new wheelOfFortune('#greenSquare', 'green-lighting', $('.greenSquare').length, a, b, 50, 2, $('.treasurebtn'), nihaoa);
        c.init();
        let str = '';
        str += `<li><div class="rewardimgbox"><img class="greencrystalimg" src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/WinterSolstice/green.png" alt=""></div><p>绿水晶x${data.data.green}</p></li>`;
        $('.greentreasurebox>ul').html(str);
      } else {
        alert(data.msg);
      }
    }
  });
});
// 神秘寻宝——神秘寻宝十连抽
$('.treasuretenbtn').off().on('click', function () {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/Treasure/receiveTreasure",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId0,
      active_v: activeId6,
      type: 10,
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        let a = [$('.green-lighting').attr('uid')];
        let b = [];
        let str = '';
        for (let i = 0; i < data.data.length; i++) {
          let d = data.data[i].Num;
          str += `<li><div class="rewardimgbox"><img class="greencrystalimg" src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/WinterSolstice/green.png" alt=""></div><p>绿水晶x${data.data[i].green}</p></li>`;;
          b.push(d);
          a.push(d);
        }
        a.pop();
        let c = new wheelOfFortune('#greenSquare', 'green-lighting', $('.greenSquare').length, a, b, 50, 2, $('.treasurebtn'), nihaoa);
        c.init();
        $('.greentreasurebox>ul').html(str);
      } else {
        alert(data.msg);
      }
    }
  });
});
// 神秘寻宝——抽奖回调函数
function nihaoa() {
  $('.backG_black , .greenSquare-box').show(200);
  treasure();
  Rebate();
  greenShuffling();
  moneyShuffling();
}
// 神秘寻宝——中奖弹窗
$('.greenSquaresurebtn').off().on('click', function () {
  $('.backG_black , .greenSquare-box').hide();
})
// 神秘寻宝——神秘寻宝抽奖纪录
function greenShuffling() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/Treasure/TreasureList",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId0,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        var str = '';
        for (var i = 0; i < data.data.length; i++) {
          str += `<p><span class="treasuretitle" uid="${data.data[i].uid}">${data.data[i].name}</span><span>获得</span><span class="treasurenum">绿水晶*${data.data[i].number}</span></p>`;
        };
        $('.treasurehuntcontent>div').html(str);
        // var c=new shuffling($('.treasurehuntcontent'),$('.treasurehuntcontent>div'),$('.treasurehuntcontent>div>p'),1000);
        // c.init();
      }
    }
  });
}

// 神秘礼包——神秘礼包
function gift() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/Gift/GiftInfo",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId1,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        var Data = data.data;
        for (let i = 0; i < Data.length; i++) {
          $(".purchasebtn").eq(i).attr("type", Data[i].Num);
          $(".purchasebtn").eq(i).attr("draw", Data[i].isBuy);
          $('.giftbagcontent').eq(i).find('li').eq(1).find('p').find('span').text(Data[i].BuyNum);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".purchasebtn").eq(i).attr('draw') == 1) {
            $(".purchasebtn").eq(i).addClass("purchaseAdd");
            $(".purchasebtn").eq(i).text("购买");
            $(".purchaseAdd").off().one("click", function (e) {
              var that = this;
              var type = $(that).attr("type");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/Gift/BuyGift",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId1,
                  active_v: activeId6,
                  type: type
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    setTimeout(() => {
                      gift();
                    }, 1000);
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".purchasebtn").eq(i).attr('draw') == 0) {
            $(".purchasebtn").eq(i).text("已购买");
            $(".purchasebtn").eq(i).removeClass("purchaseAdd");
          }
        };
      };
    }
  });
}

// VIP折扣——vip领取礼包
function vip() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/Vip/VIPInfo",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId5,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        var Data = data.data[0];
        for (let i = 0; i < Data.length; i++) {
          $(".buybtn").eq(i).attr("type", Data[i].Num);
          $(".buybtn").eq(i).attr("draw", Data[i].isBuy);
          $('.vipdiscountlist').eq(i).find('ul').find('li').eq(2).find('p').find('span').text(Data[i].BuyNum);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".buybtn").eq(i).attr('draw') == 1) {
            $(".buybtn").eq(i).addClass("buyAdd").removeClass('tobuyvipvip');
            $(".buybtn").eq(i).text("领取");
            $(".buyAdd").off().one("click", function (e) {
              var that = this;
              var type = $(that).attr("type");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/Vip/receiveVip",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId5,
                  active_v: activeId6,
                  type: type
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    setTimeout(function () {
                      vip();
                    }, 1000);
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".buybtn").eq(i).attr('draw') == 0) {
            $(".buybtn").eq(i).text("已领取");
            $(".buybtn").eq(i).removeClass("buyAdd").removeClass('tobuyvipvip');
          } else if ($(".buybtn").eq(i).attr('draw') == 2) {
            $(".buybtn").eq(i).text("去开通");
            $(".buybtn").eq(i).removeClass("buyAdd").addClass('tobuyvipvip');
            $('.tobuyvipvip').off().on('click', function () {
              if (/iphone|ipad|ipod/.test(ua)) {
                memberIos();
              } else {
                memberAndroid();
              }
            })
          }
        };
        var Data1 = data.data[1];
        for (let i = 0; i < Data1.length; i++) {
          $(".buyvipbtn").eq(i).attr("type", Data1[i].Num);
          $(".buyvipbtn").eq(i).attr("draw", Data1[i].isBuy);
          $('.vipdiscountlist').eq(i + 3).find('ul').find('li').eq(1).find('p').find('span').text(Data1[i].BuyNum);
        };
        for (var i = 0; i < Data1.length; i++) {
          if ($(".buyvipbtn").eq(i).attr('draw') == 1) {
            $(".buyvipbtn").eq(i).addClass("buyvipAdd").removeClass('tobuyvipvip');
            $(".buyvipbtn").eq(i).text("购买");
            $(".buyvipAdd").off().one("click", function (e) {
              var that = this;
              var type = $(that).attr("type");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/Vip/VipBuy",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId5,
                  active_v: activeId6,
                  type: type
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    setTimeout(function () {
                      vip();
                    }, 1000);
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".buyvipbtn").eq(i).attr('draw') == 0) {
            $(".buyvipbtn").eq(i).text("已购买");
            $(".buyvipbtn").eq(i).removeClass("buyvipAdd").removeClass('tobuyvipvip');
          } else if ($(".buyvipbtn").eq(i).attr('draw') == 2) {
            $(".buyvipbtn").eq(i).text("去开通");
            $(".buyvipbtn").eq(i).removeClass("buyvipAdd").addClass('tobuyvipvip');
            $('.tobuyvipvip').off().on('click', function () {
              if (/iphone|ipad|ipod/.test(ua)) {
                memberIos();
              } else {
                memberAndroid();
              }
            })
          }
        };
      };
    }
  });
}

// 砸金蛋——玩法说明弹窗
$('.egghowtoplaybtn').off().on('click', function () {
  $('.smasheggsexplainbox').css({ "top": (scrollHeight + 20) + "px" })
  $('.backG_black , .smasheggsexplainbox').show();
});
$('.smasheggsexplainclose').off().on('click', function () {
  $('.backG_black , .smasheggsexplainbox').hide();
});
// 砸金蛋——奖励预览弹窗
$('.rewardstorebox>li:nth-child(1)').off().on('click', function () {
  $('.backG_black , .rewardpreviewbox').show();
});
$('.rewardpreviewclose').off().on('click', function () {
  $('.backG_black , .rewardpreviewbox').hide();
});
// 砸金蛋——砸蛋商店弹窗
$('.rewardstorebox>li:nth-child(2)').off().on('click', function () {
  eggsShop();
  $('.eggsmashingshopbox').css({ "top": 20 + "px" })
  $('.backG_black , .eggsmashingshopbox').show();
});
function eggsShop() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/SmashEggs/EggsShop",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId2,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        $('.eggcoinnum').text(data.coins);
        $('.diamnondnum').text(data.diamonds);
        var Data = data.data;
        for (let i = 0; i < Data.length; i++) {
          $(".commoditybuybtn").eq(i).attr("type", Data[i].Num);
          $(".commoditybuybtn").eq(i).attr("draw", Data[i].canBuy);
          $('.commoditylist').eq(i).find('ul').find('li').eq(1).find('p').find('span').text(Data[i].isBuy);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".commoditybuybtn").eq(i).attr('draw') == 1) {
            $(".commoditybuybtn").eq(i).addClass("commoditybuyAdd");
            $(".commoditybuybtn").eq(i).text("购买");
            $(".commoditybuyAdd").off().one("click", function (e) {
              var that = this;
              var type = $(that).attr("type");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/SmashEggs/ShopBuy",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId2,
                  active_v: activeId6,
                  type: type
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    setTimeout(function () {
                      eggsShop();
                    }, 1000)
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".commoditybuybtn").eq(i).attr('draw') == 0) {
            $(".commoditybuybtn").eq(i).text("购买");
            $(".commoditybuybtn").eq(i).removeClass("commoditybuyAdd");
          } else if ($(".commoditybuybtn").eq(i).attr('draw') == 2) {
            $(".commoditybuybtn").eq(i).text("已购买");
            $(".commoditybuybtn").eq(i).removeClass("commoditybuyAdd");
          }
        };
      }
    }
  })
}
$('.eggsmashingshopclose').off().on('click', function () {
  $('.backG_black , .eggsmashingshopbox').hide();
});
// 砸金蛋——砸金蛋中奖纪录弹窗
$('.winningrecordbtn').off().on('click', function () {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/SmashEggs/EggsList",
    async: true,
    dataType: "json",
    data: {
      playerId: playerId,
      activeId: activeId2,
      active_v: activeId6
    },
    success: function (data) {
      if (data.code == 1) {
        var str = '';
        var Data = data.data;
        for (let i = 0; i < Data.length; i++) {
          let data = giftNameByBackground(Data[i].reward.type, Data[i].reward.num, Data[i].reward.sid);
          // console.log(data);
          str += `<li><div class="rewardimgbox"><img class="little${data.classname}" src="${data.img}" alt=""></div><p>${data.name}×${data.num}</p></li>`;
        }

        $('.eggrewardlistbox>ul').html(str);
        $(".eggrewardbox").css({ "top": (scrollHeight + 50) + "px" })
        $('.backG_black , .eggrewardbox').show();
      }
    }
  })
});
$('.eggrewardsurebtn').off().on('click', function () {
  $('.backG_black , .eggrewardbox').hide();
});
// 砸蛋轮播
function shufflingOnEggs() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/SmashEggs/EggsAllList",
    async: true,
    dataType: "json",
    data: {
      playerId: playerId,
      activeId: activeId2,
      active_v: activeId6
    },
    success: function (data) {
      if (data.code == 1) {
        var Data = data.data;
        str = '';
        for (let i = 0; i < Data.length; i++) {
          let data = giftNameByBackground(Data[i].reward.type, Data[i].reward.num, Data[i].reward.sid);
          str += `<li>恭喜<span class="eggname">${Data[i].name}</span>获得<span class="eggnum">${data.name}x${data.num}</span></li>`;
        }
        $('.egglist>ul').html(str);
        var c = new shuffling($('.egglist'), $('.egglist>ul'), $('.egglist>ul>li'), 3000);
        c.init();
      }
    }
  })
}
// 砸金蛋——获取砸蛋信息
function smashEggs() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/SmashEggs/EggsTimes",
    async: true,
    dataType: "json",
    data: {
      playerId: playerId,
      activeId: activeId2,
      active_v: activeId6
    },
    success: function (data) {
      if (data.code == 1) {
        $('.hammereggnum').text(data.surplus);
        $('.hammerprogressbox>div:nth-child(1)').text(data.times);
        let num = data.times / 10;
        $('.hammerbar').css({ 'width': num + "%" });
        if (num > 100) {
          $('.hammerbar').css({ 'width': 100 + "%" });
        }
        var Data = data.data;
        for (let i = 0; i < Data.length; i++) {
          $(".hammercontent>li").eq(i).attr("type", Data[i].Num);
          $(".hammercontent>li").eq(i).attr("draw", Data[i].isReceive);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".hammercontent>li").eq(i).attr('draw') == 1) {
            $(".hammercontent>li").eq(i).addClass("hammerLingqu");
            $(".hammerLingqu").off().one("click", function (e) {
              var that = this;
              var type = $(that).attr("type");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/SmashEggs/receiveTimes",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId2,
                  active_v: activeId6,
                  type: type
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    smashEggs();
                    shufflingOnEggs();
                    $(that).removeClass("hammerLingqu");
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".hammercontent>li").eq(i).attr('draw') == 0) {
            $(".hammercontent>li").eq(i).removeClass("hammerLingqu");
          } else if ($(".hammercontent>li").eq(i).attr('draw') == 2) {
            $(".hammercontent>li").eq(i).removeClass("hammerLingqu");
          }
        };
      }
    }
  })
}
var player = new SVGA.Player('.eggimgbox');
var parser = new SVGA.Parser('.eggimgbox'); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
player.loops = 1;
// 砸金蛋——砸蛋
$('.hammereggbtnbox>div').off().on('click', function () {
  let type = $(this).attr('uid');
  egganimtion(type);
})
function egganimtion(type) {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/SmashEggs/smashEggs",
    async: true,
    dataType: "json",
    data: {
      playerId: playerId,
      activeId: activeId2,
      active_v: activeId6,
      type: type
    },
    success: function (data) {
      if (data.code == 1) {
        var str = '';
        var Data = data.data;
        if (Data.length > 0) {
          for (let i = 0; i < Data.length; i++) {
            let data = giftNameByBackground(Data[i].type, Data[i].num, Data[i].sid);
            str += `<li><div class="rewardimgbox"><img class="little${data.classname}" src="${data.img}" alt=""></div><p>${data.name}×${data.num}</p></li>`;

          }
        } else {
          let data = giftNameByBackground(Data.type, Data.num, Data.sid);
          str += `<li><div class="rewardimgbox"><img class="little${data.classname}" src="${data.img}" alt=""></div><p>${data.name}×${data.num}</p></li>`;
        }
        $('.hammereggbtnbox>div').css({
          'pointer-events': 'none'
        });
        $('.eggimgbox').css({
          'width': '3.8rem',
          'height': '3.8rem',
          'margin-top': '-0.65rem',
          'margin-left': '1.09rem',
          'background-image': 'url()'
        });
        parser.load('rose.svga', function (videoItem) {
          player.setVideoItem(videoItem);
          player.startAnimation();
          player.onFinished(function () {
            $('.eggimgbox').css({
              'width': '2.98rem',
              'height': '3.11rem',
              'background-image': 'url(https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/蛋.png)',
              'background-size': '100% 100%',
              'margin': '0 auto',
              'margin-left': '1.5rem'
            });
            $('.eggrewardlistbox>ul').html(str);
            smashEggs();
            $(".eggrewardbox").css({ "top": (scrollHeight + 50) + "px" })
            $('.backG_black , .eggrewardbox').show();
            setTimeout(function () {
              $('.hammereggbtnbox>div').css({
                'pointer-events': 'auto'
              });
            }, 2000);
          });
        });
      } else {
        alert(data.msg);
      }
    }
  })
}

// 超值返利——玩法说明弹窗
$('.rechargehowtoplaybtn').off().on('click', function () {
  $('.premiumrebateexplainbox').css({ "top": (scrollHeight + 50) + "px" })
  $('.backG_black , .premiumrebateexplainbox').show();
});
$('.premiumrebateexplainclose').off().on('click', function () {
  $('.backG_black , .premiumrebateexplainbox').hide();
});
// 超值返利——壕气返利弹窗
$('.rechargegiftbtn').off().on('click', function () {
  $('.returntoprofitbox').css({ "top": (scrollHeight + 50) + "px" })
  $('.backG_black , .returntoprofitbox').show();
});
$('.returntoprofitclose').off().on('click', function () {
  $('.backG_black , .returntoprofitbox').hide();
});
// 超值返利——超值返利
function Rebate() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/Rebate/RebateInfo",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId3,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        $('.luckdrawnum').text(data.data.times);
        $('.moatairnum').text(data.data.rich);
      }
    }
  });
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/Rebate/RebateTimes",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId3,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        var Data = data.data;
        setTimeout(() => {
          var a = $('.moatairnum').text(), b;
          for (let i = 0; i < Data.length; i++) {
            if (parseInt(a) <= parseInt(Data[i].Num)) {
              b = Data[i].Num;
              $('.moatairnum1').text(b);
              $('.moatairbar').css({ 'width': parseInt(a / b * 100) + "%" })
              return
            }
          };
        }, 1000);
        for (let i = 0; i < Data.length; i++) {
          $(".rebatebtn").eq(i).attr("Num", Data[i].Num);
          $(".rebatebtn").eq(i).attr("draw", Data[i].isReceive);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".rebatebtn").eq(i).attr('draw') == 1) {
            $('.rebatecontent').eq(i).find('li').eq(1).find('p').find('span').text(Data[i].Num);
            $(".rebatebtn").eq(i).addClass("rebateAdd");
            $(".rebatebtn").eq(i).text("领取");
            $(".rebateAdd").off().one("click", function (e) {
              var that = this;
              var Num = $(that).attr("Num");
              $.ajax({
                type: "get",
                url: "/ltf/hjxactive/Rebate/receiveTimes",
                async: true,
                data: {
                  playerId: playerId,
                  activeId: activeId3,
                  active_v: activeId6,
                  type: Num
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    $(that).text("已领取");
                    $(that).removeClass("rebateAdd");
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".rebatebtn").eq(i).attr('draw') == 2) {
            $('.rebatecontent').eq(i).find('li').eq(1).find('p').find('span').text(Data[i].Num);
            $(".rebatebtn").eq(i).text("已领取");
            $(".rebatebtn").eq(i).removeClass("rebateAdd");
          } else if ($(".rebatebtn").eq(i).attr('draw') == 0) {
            $('.rebatecontent').eq(i).find('li').eq(1).find('p').find('span').text(data.rich);
            $(".rebatebtn").eq(i).text("未完成");
            $(".rebatebtn").eq(i).removeClass("rebateAdd");
          }
        };
      };
    }
  });
}
// 超值返利——超值返利单抽
$('.luckdrawonebtn').off().on('click', function () {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/Rebate/Rebate",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId3,
      active_v: activeId6,
      type: 1,
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        let a = $('.money-lighting').attr('uid');
        let b = data.data.Num  //到达位置
        let c = new wheelOfFortune('#moneySquare', 'money-lighting', $('.moneySquare').length, a, b, 50, 2, $('.luckdrawbtn'), nihaoa);
        c.init();
        let str = '';
        str += `<li><div class="rewardimgbox"><img class="greencrystalimg" src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/money/wing.png" alt=""></div><p>元宝x${data.data.money}</p></li>`;
        $('.greentreasurebox>ul').html(str);
      } else {
        alert(data.msg);
      }
    }
  });
});
// 超值返利——超值返利十连抽
$('.luckdrawtenbtn').off().on('click', function () {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/Rebate/Rebate",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId3,
      active_v: activeId6,
      type: 10,
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        let a = [$('.money-lighting').attr('uid')];
        let b = [];
        let str = '';
        for (let i = 0; i < data.data.length; i++) {
          let d = data.data[i].Num;
          str += `<li><div class="rewardimgbox"><img class="greencrystalimg" src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/money/wing.png" alt=""></div><p>元宝x${data.data[i].money}</p></li>`;
          b.push(d);
          a.push(d);
        }
        a.pop();
        let c = new wheelOfFortune('#moneySquare', 'money-lighting', $('.moneySquare').length, a, b, 50, 2, $('.luckdrawbtn'), nihaoa);
        c.init();
        $('.greentreasurebox>ul').html(str);
      } else {
        alert(data.msg);
      }
    }
  });
});
// 超值返利——超值返利抽奖纪录
function moneyShuffling() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/Rebate/RebateList",
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId3,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        var str = '';
        for (var i = 0; i < data.data.length; i++) {
          str += `<p><span class="awardannouncementtitle" uid="${data.data[i].uid}">${data.data[i].name}</span><span>获得</span><span class="awardannouncementnum">元宝×${data.data[i].number}</span></p>`;
        };
        $('.awardannouncementcontent>div').html(str);
        // var c=new shuffling($('.awardannouncementcontent'),$('.awardannouncementcontent>div'),$('.awardannouncementcontent>div>p'),1000);
        // c.init();
      }
    }
  });
}

// 充值榜单——排行榜显示弹窗
$('.trophybtn').off().on('click', function () {
  $('.chartslistbox').css({ "top": 20 + "px" })
  $('.backG_black , .chartslistbox').show();
});
$('.chartslistclose').off().on('click', function () {
  $('.backG_black , .chartslistbox').hide();
});
// 充值榜单——排行榜信息
function list() {
  $.ajax({
    type: "get",
    url: "/ltf/hjxactive/RankList/RankListInfo",  //充值钻石
    // url: "/ltf/hjxactive/GiftRank/RankListInfo",     //消费钻石
    async: true,
    data: {
      playerId: playerId,
      activeId: activeId4,
      active_v: activeId6
    },
    dataType: "json",
    success: function (data) {
      if (data.code == 1) {
        $('.myrankingnum').text(data.data.my_number);
        $('.rechargeamountnum').text(parseInt(data.data.my_total));
        $('.integralnum').text(parseInt(data.data.first_total));  //充值
        // $('.integralnum').text(data.data.first_total);  //消费
        $('.investlistcontent>p').text(data.data.name);
        $('.investlistheadimg').css({ 'background-image': `url(${picHttp}${data.data.pic}.png)` });
        var Daata = data.data.RankList;
        var Data = [];
        var num = [], num1 = [];
        for (let i = 0; i < Daata.length; i++) {
          num.push(Daata[i].number);
          num1.push(i);
        }
        for (let i = 0; i < Daata[Daata.length - 1].number; i++) {
          if ((i + 1) == num[0]) {
            Data.push(Daata[num1[0]]);
            num.shift();
            num1.shift();
          } else {
            let obj = { total: "000", uid: 00000, name: "暂未上榜", pic: "kongbai", number: i };
            Data.push(obj);
          }
        }
        // console.log(Data);
        var classname = "uid";
        var str = "";
        if (Data.length == 1) {
          str = `<div class="topthreebox">
                    <ul>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/银牌.png" alt="">
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/占位.png" alt="">
                            <p>暂未上榜</p>
                            <p>???</p>
                        </li>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/金牌.png" alt="">
                            <img class="${classname}" uid="${Data[0].uid}" src="${picHttp}${Data[0].pic}.png" alt="">
                            <p>${Data[0].name}</p>
                            <p>${Data[0].total}</p>
                        </li>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/铜牌.png" alt="">
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/占位.png" alt="">
                            <p>暂未上榜</p>
                            <p>???</p>
                        </li>
                    </ul>
                </div>`
        } else if (Data.length == 2) {
          str = `<div class="topthreebox">
                    <ul>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/银牌.png" alt="">
                            <img class="${classname}" uid="${Data[1].uid}" src="${picHttp}${Data[1].pic}.png" alt="">
                            <p>${Data[1].name}</p>
                            <p>${Data[1].total}</p>
                        </li>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/金牌.png" alt="">
                            <img class="${classname}" uid="${Data[0].uid}" src="${picHttp}${Data[0].pic}.png" alt="">
                            <p>${Data[0].name}</p>
                            <p>${Data[0].total}</p>
                        </li>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/铜牌.png" alt="">
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/占位.png" alt="">
                            <p>暂未上榜</p>
                            <p>???</p>
                        </li>
                    </ul>
                </div>`
        } else if (Data.length == 3) {
          str = `<div class="topthreebox">
                    <ul>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/银牌.png" alt="">
                            <img class="${classname}" uid="${Data[1].uid}" src="${picHttp}${Data[1].pic}.png" alt="">
                            <p>${Data[1].name}</p>
                            <p>${Data[1].total}</p>
                        </li>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/金牌.png" alt="">
                            <img class="${classname}" uid="${Data[0].uid}" src="${picHttp}${Data[0].pic}.png" alt="">
                            <p>${Data[0].name}</p>
                            <p>${Data[0].total}</p>
                        </li>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/铜牌.png" alt="">
                            <img class="${classname}" uid="${Data[2].uid}" src="${picHttp}${Data[2].pic}.png" alt="">
                            <p>${Data[2].name}</p>
                            <p>${Data[2].total}</p>
                        </li>
                    </ul>
                </div>`
        }
        if (Data.length > 3) {
          str += `<div class="topthreebox">
                    <ul>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/银牌.png" alt="">
                            <img class="${classname}" uid="${Data[1].uid}" src="${picHttp}${Data[1].pic}.png" alt="">
                            <p>${Data[1].name}</p>
                            <p>${Data[1].total}</p>
                        </li>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/金牌.png" alt="">
                            <img class="${classname}" uid="${Data[0].uid}" src="${picHttp}${Data[0].pic}.png" alt="">
                            <p>${Data[0].name}</p>
                            <p>${Data[0].total}</p>
                        </li>
                        <li>
                            <img src="https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/铜牌.png" alt="">
                            <img class="${classname}" uid="${Data[2].uid}" src="${picHttp}${Data[2].pic}.png" alt="">
                            <p>${Data[2].name}</p>
                            <p>${Data[2].total}</p>
                        </li>
                    </ul>
                </div><div class="otherplacestextbox">
                                <li>排名</li>
                                <li>玩家名</li>
                                <li>积分</li>
                            </div>
                            <div class="otherplacesbox">
                                <div>`
          for (let i = 3; i < Data.length; i++) {
            str += `<ul class="otherplaceslist">
                                <li>${i + 1}</li>
                                <li>
                                    <img class="otherplacesheadimg ${classname}" uid="${Data[i].uid}" src="${picHttp}${Data[i].pic}.png" alt="">
                                    <span class="otherplacesheadname">${Data[i].name}</span>
                                </li>
                                <li>${Data[i].total}</li>
                                <div class="otherplacesline"></div>
                            </ul>`;
          }
          str += `</div></div>`;
        }
        // str+=`<div class="rechargerankingtip">送礼消费8888钻石可以上榜</div>`;   //消费
        str += `<div class="rechargerankingtip">充值300元钻石可以上榜</div>`;   //充值
        $('.popupbox1').html(str);
        $('.uid').off().on('click', function () {
          var type = $(this).attr("uid");
          if (type) {
            if (/iphone|ipad|ipod/.test(ua)) {
              getIosPersonDetails(type);
            } else {
              getAndroidPersonDetails(type);
            }
          }
        })
      }
    }
  })
}


// 福星高照——切换页面
$('.stardaybox>li').off().on('click', function () {
  res = new titleName($('.stardaybox>li'), $('.firstprize-box'), stardayid, $(this).index());
  res.init();
  stardayid = $(this).index();
  luckyStars();
});
// 福星高照——奖励弹窗切换页面
$('.prizeslistdaybox>li').off().on('click', function () {
  res = new titleName($('.prizeslistdaybox>li'), $('.prizeslist-content'), prizeslistday, $(this).index());
  res.init();
  prizeslistday = $(this).index();
});
function luckyStars() {
  $.ajax({
    type: "get",
    url: "/ltf/active/mascot/getRewardStatus",
    async: true,
    dataType: "json",
    data: {
      player_id: playerId,
      active_v: activeId6
    },
    success: function (data) {
      if (data.code == 1) {
        if (data.data[stardayid] != undefined) {
          if (data.data[stardayid].pic != '') {
            $('.starascendantheadimg').css({ 'background-image': `url(${picHttp}${data.data[stardayid].pic}.png)` });
            $('.starascendantheadimg').attr('uid', data.data[stardayid].uid);
            $('.starascendanttitle').text(data.data[stardayid].name);
            $('.starascendantheadimg').off().on('click', function () {
              var type = $(this).attr("uid");
              if (type) {
                if (/iphone|ipad|ipod/.test(ua)) {
                  getIosPersonDetails(type);
                } else {
                  getAndroidPersonDetails(type);
                }
              }
            })
          } else {
            $('.starascendantheadimg').css({ 'background-image': `url(https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/占位.png)` });
            $('.starascendanttitle').text('暂无人上榜');
          }
        } else {
          $('.starascendantheadimg').css({ 'background-image': `url(https://jiujiu-obs.obs.cn-north-4.myhuaweicloud.com/h5/activity/huodong/NewYearFestival/占位.png)` });
          $('.starascendanttitle').text('暂无人上榜');
        }
      }
    }
  })
}
// 福星高照——福星显示弹窗
$('.luckystarbtn').off().on('click', function () {
  $('.luckystarbox').css({ "top": 20 + "px" })
  $('.backG_black , .luckystarbox').show();
  listOfFusion();
});
$('.luckystarclose').off().on('click', function () {
  $('.backG_black , .luckystarbox').hide();
});
// 福星高照——奖励弹窗切换页面
$('.luckystardaybox>li').off().on('click', function () {
  $('.luckystardaybtn').eq($(this).index()).addClass('luckystardayAdd');
  $('.luckystardaybtn').eq(luckystarday).removeClass('luckystardayAdd');
  luckystarday = $(this).index();
  listOfFusion();
});
function listOfFusion() {
  $.ajax({
    type: "get",
    url: "/ltf/active/mascot/getLotteryInformation",
    async: true,
    dataType: "json",
    data: {
      player_id: playerId,
      active_v: activeId6
    },
    success: function (data) {
      if (data.code == 1) {
        var Data = data.data;
        var MyNumber = data.MyNumber;
        var day, day1 = [], day2 = [], day3 = [], day4 = [], day5 = [], day6 = [], day7 = [];
        var str = '', str1 = '', str2 = '', str3 = '', str4 = '', str5 = '', str6 = '', str7 = '', Str = '', Str1 = '', Str2 = '', Str3 = '', Str4 = '', Str5 = '', Str6 = '', Str7 = '';
        for (let i = 0; i < Data.length; i++) {
          if (Data[i].condition == 1) {
            day1.push(Data[i]);
          } else if (Data[i].condition == 2) {
            day2.push(Data[i]);
          } else if (Data[i].condition == 3) {
            day3.push(Data[i]);
          } else if (Data[i].condition == 4) {
            day4.push(Data[i]);
          } else if (Data[i].condition == 5) {
            day5.push(Data[i]);
          } else if (Data[i].condition == 6) {
            day6.push(Data[i]);
          } else if (Data[i].condition == 7) {
            day7.push(Data[i]);
          }
        }
        if (luckystarday == 0) {
          day = day1;
        } else if (luckystarday == 1) {
          day = day2;
        } else if (luckystarday == 2) {
          day = day3;
        } else if (luckystarday == 3) {
          day = day4;
        } else if (luckystarday == 4) {
          day = day5;
        } else if (luckystarday == 5) {
          day = day6;
        } else if (luckystarday == 6) {
          day = day7;
        }
        for (let i = 0; i < day.length; i++) {
          if (day[i].award == 1) {
            str1 += `<div>${day[i].name}</div>`;
            Str1 += `<div>${day[i].number}</div>`
          } else if (day[i].award == 2) {
            str2 += `<div>${day[i].name}</div>`;
            Str2 += `<div>${day[i].number}</div>`
          } else if (day[i].award == 3) {
            str3 += `<div>${day[i].name}</div>`;
            Str3 += `<div>${day[i].number}</div>`
          } else if (day[i].award == 4) {
            str4 += `<div>${day[i].name}</div>`;
            Str4 += `<div>${day[i].number}</div>`
          } else if (day[i].award == 5) {
            str5 += `<div>${day[i].name}</div>`;
            Str5 += `<div>${day[i].number}</div>`
          } else if (day[i].award == 6) {
            str6 += `<div>${day[i].name}</div>`;
            Str6 += `<div>${day[i].number}</div>`
          } else if (day[i].award == 7) {
            str7 += `<div>${day[i].name}</div>`;
            Str7 += `<div>${day[i].number}</div>`
          }
        }
        $('.luckystarlistcontent>ul').eq(0).find('li').eq(1).html(str1);
        $('.luckystarlistcontent>ul').eq(1).find('li').eq(1).html(str2);
        $('.luckystarlistcontent>ul').eq(2).find('li').eq(1).html(str3);
        $('.luckystarlistcontent>ul').eq(3).find('li').eq(1).html(str4);
        $('.luckystarlistcontent>ul').eq(4).find('li').eq(1).html(str5);
        $('.luckystarlistcontent>ul').eq(5).find('li').eq(1).html(str6);
        $('.luckystarlistcontent>ul').eq(6).find('li').eq(1).html(str7);
        $('.luckystarlistcontent>ul').eq(7).find('li').eq(1).html(Str1);
        $('.luckystarlistcontent>ul').eq(8).find('li').eq(1).html(Str2);
        $('.luckystarlistcontent>ul').eq(9).find('li').eq(1).html(Str3);
        $('.luckystarlistcontent>ul').eq(10).find('li').eq(1).html(Str4);
        $('.luckystarlistcontent>ul').eq(11).find('li').eq(1).html(Str5);
        $('.luckystarlistcontent>ul').eq(12).find('li').eq(1).html(Str6);
        $('.luckystarlistcontent>ul').eq(13).find('li').eq(1).html(Str7);
        for (let i = 0; i < MyNumber.length; i++) {
          str += `<ul><li class="prizenumbertext">${MyNumber[i].number}</li><li>${MyNumber[i].award}等奖</li><li>第${MyNumber[i].condition}天</li></ul>`;
        }
        $('.myprizenumbercontent').html(str);
      }
    }
  })
}
// 福星号切换
$('.luckystarimgbox>ul>li').off().on('click', function () {
  let res = new titleName($('.luckystarimgbox>ul>li'), $('.prizelistbox'), luckystarimg, $(this).index());
  res.init();
  luckystarimg = $(this).index()
});
// 福星高照——奖励显示弹窗
$('.awardbtn').off().on('click', function () {
  $('.awardbox').css({ "top": (scrollHeight + 20) + "px" })
  $('.backG_black , .awardbox').show();
});
$('.awardclose').off().on('click', function () {
  $('.backG_black , .awardbox').hide();
});
// 福星高照——玩法显示弹窗
$('.luckystarexplainbtn').off().on('click', function () {
  $('.luckystarexplainbox').css({ "top": (scrollHeight + 50) + "px" })
  $('.backG_black , .luckystarexplainbox').show();
});
$('.luckystarexplainclose').off().on('click', function () {
  $('.backG_black , .luckystarexplainbox').hide();
});
// 福星高照——祈福显示弹窗
$('.blessingmissionbtn').off().on('click', function () {
  prayerTask();
});
function prayerTask() {
  $.ajax({
    type: "get",
    url: "/ltf/active/mascot/getTaskStatus",
    async: true,
    dataType: "json",
    data: {
      player_id: playerId,
      active_v: activeId6
    },
    success: function (data) {
      if (data.code == 1) {
        var Data = data.data.task;
        var number = data.data.numbers;
        var str = '';
        if (number.length > 0) {
          for (var i = 0; i < number.length; i++) {
            if (number[i].award > 0) {
              str += `<li class="myblessinglistAdd"><p class="blessingnum">${number[i].number}</p></li>`;
            } else {
              str += `<li class="myblessinglistbtn"><p style="color:#fff" class="blessingnum">${number[i].number}</p></li>`;
            }
          }
          $('.myblessinglist>ul').html(str);
        }
        for (var i = 0; i < Data.length; i++) {
          $(".blessingtasklistbtn").eq(i).attr("task_id", Data[i].task_id);
          $(".blessingtasklistbtn").eq(i).attr("draw", Data[i].didReceive);
          $('.blessingtasklist').eq(i).find('p').eq(0).find('span').text(Data[i].task_progress);
        };
        for (var i = 0; i < Data.length; i++) {
          if ($(".blessingtasklistbtn").eq(i).attr('draw') == -1) {
            $(".blessingtasklistbtn").eq(i).addClass("blessingtasklistAdd").removeClass("gotofengxiang").removeClass("gotochongzhi");
            $(".blessingtasklistbtn").eq(i).text("领取");
            $(".blessingtasklistAdd").off().one("click", function (e) {
              var that = this;
              var task_id = $(that).attr("task_id");
              $.ajax({
                type: "get",
                url: "/ltf/active/mascot/receiveAwardWithTask",
                async: true,
                data: {
                  player_id: playerId,
                  active_v: activeId6,
                  task_id: task_id
                },
                beforeSend: function (XMLHttpRequest) {
                  $(".loding").show();
                  $(".loding>img").css({ "top": (scrollHeight + height / 2) + "px" })
                },
                dataType: "json",
                success: function (data) {
                  $(".loding").hide();
                  if (data.code == 1) {
                    prayerTask();
                    alert(data.msg);
                  } else {
                    alert(data.msg);
                  }
                }
              });
              e.preventDefault();
            });
          } else if ($(".blessingtasklistbtn").eq(i).attr('draw') == 0) {
            if (i == 0) {
              $(".blessingtasklistbtn").eq(i).text("未完成");
              $(".blessingtasklistbtn").eq(i).removeClass("blessingtasklistAdd");
            } else if (i >= 1 && i <= 5) {
              $(".blessingtasklistbtn").eq(i).text("去充值");
              $(".blessingtasklistbtn").eq(i).addClass("gotochongzhi");
              $('.gotochongzhi').off().on("click", function () {
                if (/iphone|ipad|ipod/.test(ua)) {
                  iosGoRecharge();
                } else {
                  window.moshi.goRecharge();
                }
              });
            } else if (i == 6) {
              $(".blessingtasklistbtn").eq(i).text("分享");
              $(".blessingtasklistbtn").eq(i).addClass("gotofengxiang");
              $('.gotofengxiang').off().on('click', function () {
                $('.lucky-share').show();
              });
            }
          } else if ($(".blessingtasklistbtn").eq(i).attr('draw') == 1) {
            $(".blessingtasklistbtn").eq(i).text("已领取");
            $(".blessingtasklistbtn").eq(i).removeClass("blessingtasklistAdd").removeClass("gotofengxiang").removeClass("gotochongzhi");
          }
        };
        $('.blessingmissionbox').css({ "top": 10 + "px" })
        $('.backG_black , .blessingmissionbox').show();
      }
    }
  })
}
$('.blessingmissionclose').off().on('click', function () {
  $('.backG_black , .blessingmissionbox').hide();
});
// 点击不同分享按钮
$('.share-click').on('click', function (event) {
  event.stopPropagation();
  var mold = $(this).data('mold');
  share(mold);
});
// 关闭分享按钮
$('.lucky-share-bottom').on('click', function () {
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
      activeId: 185,
      sharePlatform: 997,
      shareSid: 2
    },
    dataType: 'json',
    success: function (data) {
      prayerTask();//再次获取分享状态
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
  var _url = 'http://top.cnsltx.com/share/' + _num + '/qr/' + playerId;
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