
new Vue({
  el: '.box',
  data: {
    playerId: '133848',
    shareShow: false,
    giftShow: false,
    pageList: {
      pagebtn0: true,
      pagebtn1: false,
      pagebtn2: false,
      pagebtn3: false,
    },
    page0: {
      dateList: [],
      familyGift: [],
      familyTask: [],
      familyBtn: '',
      item: []
    },
    page1: {
      rechargeChangeBtn: 1,
      rechargeList: []
    },
    page2: {
      inviteList: [],
      inviteTask: [
        { tip: '特殊贡献奖一', content: '当有效邀请人数达到50人时，可获得初级自选靓号' },
        { tip: '特殊贡献奖二', content: '当有效邀请人数达到100人时，可获得中级自选靓号' },
        { tip: '特殊贡献奖三', content: '当有效邀请人数达到200人时，可获得高级自选靓号' },
      ],
      threeList: [],
      treeContent: [],
      my: {},
    },
    page3: {
      forceTask: [],
      threeList: [],
      familyList: [],
      my: []
    },
    path: 'http://obs.99yuyin.com/httpServer/image/',
    picHttp: 'http://obs.99yuyin.com/PlayerIcon/',
    roomHttp: 'http://obs.99yuyin.com/ChatRoomIcon/',
    height: '',
    scrollHeight: '',
  },
  methods: {
    sendPlayerGUID(playerGUID) {
      playerId = playerGUID;
      this.familyDate()
    },
    pageChange(i) {
      switch (true) {
        case (i == 0):
          this.familyDate();
          break;
        case (i == 1):
          this.rechargeDate();
          break;
        case (i == 2):
          this.inviteDate();
          break;
        case (i == 3):
          this.getfamilyTree();
          break;
      }
      let pageList = this.pageList
      for (const key in pageList) {
        pageList[key] = false
      }
      pageList['pagebtn' + i] = true
    },
    familyDate() {
      $.ajax({
        type: "get",
        url: "/ltf/hjxactive/family/active",
        async: true,
        data: {
          playerId: this.playerId,
        },
        beforeSend: function (XMLHttpRequest) {
          $(".loding").show();
          $(".loding>img").css({ "top": (this.scrollHeight + this.height / 2) + "px" })
        },
        dataType: "json",
        success: (data) => {
          $(".loding").hide();
          if (data.code == 1) {
            let dateList = data.data
            dateList.forEach(item => {
              if (item.is_today == true) {
                this.getFamilyDate(item)
              }
            })
            this.page0.dateList = dateList
          } else {
            alert(data.msg)
          }
        }
      });
    },
    dateChange(item) {
      if (item.disabled && !item.is_today) {
        let dateList = this.page0.dateList
        dateList.forEach(i => {
          if (i.uid == item.uid) {
            i.is_today = true
            this.getFamilyDate(i)
          } else {
            i.is_today = false
          }
        })
        this.page0.dateList = dateList
      }
    },
    getFamilyDate(item) {
      this.page0.item = item
      let familyGift = []
      item.reward.forEach(item => {
        let data = giftNameByBackground(item.type, item.reward.num, item.reward.sid)
        familyGift.push(data)
      })
      this.page0.familyGift = familyGift
      this.page0.familyTask = item.task
      this.page0.familyBtn = item.status
    },
    getfamilyGift() {
      if (this.page0.familyBtn == 1) {
        $.ajax({
          type: "get",
          url: "/ltf/hjxactive/family/receiveActive",
          async: true,
          data: {
            playerId: this.playerId,
            id: this.page0.item.id
          },
          beforeSend: function (XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (this.scrollHeight + this.height / 2) + "px" })
          },
          dataType: "json",
          success: (data) => {
            $(".loding").hide();
            if (data.code == 1) {
              this.familyDate()
              alert(data.msg)
            } else {
              alert(data.msg)
            }
          }
        });
      }
    },
    rechargeChange(i) {
      this.page1.rechargeChangeBtn = i
      this.rechargeDate()
    },
    rechargeDate() {
      $.ajax({
        type: "get",
        url: "/ltf/hjxactive/family/recharge",
        async: true,
        data: {
          playerId: this.playerId,
          id: this.page1.rechargeChangeBtn
        },
        beforeSend: function (XMLHttpRequest) {
          $(".loding").show();
          $(".loding>img").css({ "top": (this.scrollHeight + this.height / 2) + "px" })
        },
        dataType: "json",
        success: (data) => {
          $(".loding").hide();
          if (data.code == 1) {
            let rechargeList = this.rechargeChangeBtn == 1 ? data.data.client : data.data.agent
            rechargeList.forEach(i => {
              let rechargeGift = []
              i.reward.forEach(item => {
                let data = giftNameByBackground(item.type, item.reward.num, item.reward.sid)
                rechargeGift.push(data)
              })
              i.rechargeGift = rechargeGift
            })
            this.$set(this.page1, 'rechargeList', rechargeList)
            console.log(rechargeList);
          } else {
            alert(data.msg)
          }
        }
      });
    },
    getrechargeGift(i) {
      if (i.status == 1) {
        $.ajax({
          type: "get",
          url: "/ltf/hjxactive/family/receiveRecharge",
          async: true,
          data: {
            playerId: this.playerId,
            level: i.level,
            type: i.type
          },
          beforeSend: function (XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (this.scrollHeight + this.height / 2) + "px" })
          },
          dataType: "json",
          success: (data) => {
            $(".loding").hide();
            if (data.code == 1) {
              this.rechargeDate()
              alert(data.msg)
            } else {
              alert(data.msg)
            }
          }
        });
      }
    },
    inviteDate() {
      $.ajax({
        type: "get",
        url: "/ltf/hjxactive/family/invite",
        async: true,
        data: {
          playerId: this.playerId,
        },
        beforeSend: function (XMLHttpRequest) {
          $(".loding").show();
          $(".loding>img").css({ "top": (this.scrollHeight + this.height / 2) + "px" })
        },
        dataType: "json",
        success: (data) => {
          $(".loding").hide();
          if (data.code == 1) {
            this.$set(this.page2, 'my', data.data.my)
            // let inviteList = data.data
            let inviteList = [data.data.reward]
            inviteList.forEach(i => {
              let inviteGift = []
              i.reward.forEach(item => {
                let data = giftNameByBackground(item.type, item.reward.num, item.reward.sid)
                inviteGift.push(data)
              })
              i.inviteGift = inviteGift
            })
            this.$set(this.page2, 'inviteList', inviteList)
            let treeContent = data.data.rankList
            if (treeContent.length < 3) {
              this.$set(this.page2, 'threeList', treeContent)
            } else {
              threeList = treeContent.splice(0, 3)
              this.$set(this.page2, 'threeList', threeList)
              this.$set(this.page2, 'treeContent', treeContent)
            }
            console.log(inviteList);
          } else {
            alert(data.msg)
          }
        }
      });
    },
    getinviteGift(i) {
      if (i.status == 1) {
        $.ajax({
          type: "get",
          url: "/ltf/hjxactive/family/receiveInvite",
          async: true,
          data: {
            playerId: this.playerId,
            id: i.id
          },
          beforeSend: function (XMLHttpRequest) {
            $(".loding").show();
            $(".loding>img").css({ "top": (this.scrollHeight + this.height / 2) + "px" })
          },
          dataType: "json",
          success: (data) => {
            $(".loding").hide();
            if (data.code == 1) {
              this.inviteDate()
              alert(data.msg)
            } else {
              alert(data.msg)
            }
          }
        });
      }
    },
    changeShareShow(type) {
      this.shareShow = type
    },
    share(mold) {
      $.ajax({
        type: 'GET',
        url: '/ltf/drifter/shareBottle',
        async: true,
        data: {
          playerId: this.playerId,
          activeId: 185,
          sharePlatform: 997,
          shareSid: 2
        },
        dataType: 'json',
        success: function (data) {
        }
      });
      shareBtn(mold, this.playerId);
    },
    gotoApp(type) {
      if (type) {
        let ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
          getIosPersonDetails(type);
        } else {
          getAndroidPersonDetails(type);
        }
      }
    },
    getfamilyTree() {
      $.ajax({
        type: "get",
        url: "/ltf/hjxactive/family/power",
        async: true,
        data: {
          playerId: this.playerId,
        },
        beforeSend: function (XMLHttpRequest) {
          $(".loding").show();
          $(".loding>img").css({ "top": (this.scrollHeight + this.height / 2) + "px" })
        },
        dataType: "json",
        success: (data) => {
          $(".loding").hide();
          if (data.code == 1) {
            this.$set(this.page3, 'forceTask', data.data.task)
            this.$set(this.page3, 'my', data.data.my)
            let familyList = data.data.rankList
            if (familyList.length < 3) {
              this.$set(this.page3, 'threeList', familyList)
            } else {
              threeList = familyList.splice(0, 3)
              this.$set(this.page3, 'threeList', threeList)
              this.$set(this.page3, 'familyList', familyList)
            }
            this.$set(this.page3, 'reward', data.data.reward)
          } else {
            alert(data.msg)
          }
        }
      });
    },
    familyContentGift(id) {
      this.giftShow = id
      this.scrollHeight = $(document).scrollTop()
      $(".giftBox").css({ "top": (this.scrollHeight + 10) + "px" })
      let giftReward = this.page3.reward[id - 1]
      giftReward.forEach(i => {
        let familyGift = []
        i.reward.forEach(item => {
          let data = giftNameByBackground(item.type, item.reward.num, item.reward.sid)
          familyGift.push(data)
        })
        i.familyGift = familyGift
      })
      this.$set(this.page3, 'giftReward', giftReward)
    }
  },
  created() {
    this.height = $(window).height()
    this.scrollHeight = $(document).scrollTop()
    // var ua = navigator.userAgent.toLowerCase();
    // if (/iphone|ipad|ipod/.test(ua)) {
    //   window.webkit.messageHandlers.getPlayerGUID.postMessage(null);//调用iOS获取用户ID方法
    // }
    window.sendPlayerGUID = this.sendPlayerGUID
  }
})

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