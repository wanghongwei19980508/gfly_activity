$(".pay-type").click(function () {
  showTab(e = $(this).parent("form").attr("id"))
});
function showTab(e) {
  if (e || (e = "alipay"), "weixin" != e || -1 !== location.hostname.indexOf("2tianxin")) $(".items").hide(),
    $("#" + e + ".items").toggle();



  else {
    var a = "https://top.cnsltx.com" + location.pathname; - 1 !== location.hostname.indexOf("beta") && (a = "http://top.cnsltx.com" + location.pathname);
    var i = {
      player: playerid,
      tab: e,  //boing-weixin
      ts: timestamp() //时间戳
    };
    location.href = a + "?" + $.param(i)  //json 串
  }
}
function setupForm(e) {
  $("#" + e + " .a3").click(function (a) {
    var i = $(this).attr("rel");
    if (i) if ($("#user-name").val()) {
      var t = $("#user-id"),
        o = $("#" + e + " input[name=channel]").val(),
        n = isMobile(),
        r = "buyGo?payMethod=" + o + "&PlayerId=" + t.val() + "&money=" + i + "&_t=" + (new Date).getTime();
      n && (r += "&os=" + n),
        location.href = r
    } else alert("无效用户ID")
  })
}
function index() {
  idTimeout = 0,
    playerid = getURLParameter("playerid");
  // 将支付宝充值显示
  var e = getURLParameter("tab");
  showTab(e),
    $(".pay-type").click(function () {
      showTab(e = $(this).parent("form").attr("id"))
    }),

    // 获取用户ID
    $("#user-id").on("keyup", function () {
      clearTimeout(idTimeout),
        idTimeout = setTimeout(searchNameByID, 1280)
    }).val(playerid).focus(),
    playerid && searchNameByID(),

    setupForm("alipay"),
    setupForm("boing-weixin");
}

function searchNameByID() {
  clearTimeout(idTimeout);

  var e = {
    header: 4,
    id: $("#user-id").val(),
    ts: timestamp()
  };
  e.id && (setLoading(!0), $.getJSON("searchUser", e,
    function (e) {
      e && e.id ? ($("#user-name").val(e.nickname), $("#user-id").val(e.id)) : $("#user-name").val(""),
        double(e),
        setLoading(!1)
    }))
}
function double(e) {
  $(".a3-top").html("首冲钻石翻倍");
  for (var i in e.goods_first) {
    $(".a3-top").eq(e.goods_first[i].substr(- 1, 1) - 1).html("");
    $(".a3-top").eq(e.goods_first[i].substr(- 1, 1) - 1 + 8).html("");
  }
}
function setLoading(e) {
  e ? (loading = !0, $(".spinner").show()) : (loading = !1, clearTimeout(loadingTimeout), loadingTimeout = setTimeout(function () {
    loading || $(".spinner").hide()
  },
    500))
}
var loadingTimeout = 0;