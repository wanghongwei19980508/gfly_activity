
// 奖励配置表
// 如果有新加请按顺序添加，好进行修改
function giftNameByBackground(type, num, sid) {
    var data = {};
    if (type == `money`) {
        data.classname = `MoneyImg`;
        data.name = `元宝`;
        data.img = `http://obs.99yuyin.com/h5/activity/money/wing.png`;
        data.num = num;
        return data;
    } else if (type == `green`) {
        data.classname = `GreenImg`;
        data.name = `绿水晶`;
        data.img = `http://obs.99yuyin.com/h5/activity/WinterSolstice/green.png`;
        data.num = num;
        return data;
    } else if (type == `coin`) {
        data.classname = `CoinImg`;
        data.name = `砸蛋币`;
        data.img = `http://obs.99yuyin.com/h5/activity/huodong/NewYearFestival/砸蛋币.png`;
        data.num = num;
        return data;
    } else if (type == `purple`) {
        data.classname = `PurpleImg`;
        data.name = `紫水晶`;
        data.img = `http://obs.99yuyin.com/h5/activity/WinterSolstice/purple.png`;
        data.num = num;
        return data;
    } else if (type == `ticket`) {
        data.classname = `TicketImg`;
        data.name = `点券`;
        data.img = `http://obs.99yuyin.com/h5/activity/dragon/point.png`;
        data.num = num;
        return data;
    } else if (type == `skill`) {
        data.classname = `SkillImg`;
        if (sid == 1) {
            data.name = `大力丸`;
        } else if (sid == 2) {
            data.name = `如意葫芦`;
        } else if (sid == 3) {
            data.name = `烈焰红唇`;
        } else if (sid == 4) {
            data.name = `葵花宝典`;
        } else if (sid == 5) {
            data.name = `魔法棒`;
        } else if (sid == 7) {
            data.name = `捆仙绳`;
        }
        data.img = `http://obs.99yuyin.com/h5/activity/skill/skill_prop_${parseInt(sid)}@2x.png`;
        data.num = num;
        return data;
    } else if (type == `special`) {
        data.classname = `SkillImg`;
        if (sid == 1) {
            data.name = `大力丸`;
        } else if (sid == 2) {
            data.name = `如意葫芦`;
        } else if (sid == 3) {
            data.name = `烈焰红唇`;
        } else if (sid == 4) {
            data.name = `葵花宝典`;
        } else if (sid == 5) {
            data.name = `魔法棒`;
        } else if (sid == 7) {
            data.name = `捆仙绳`;
        }
        data.img = `http://obs.99yuyin.com/h5/activity/skill/skill_prop_${parseInt(sid)}@2x.png`;
        data.num = num;
        return data;
    } else if (type == `bubble`) {
        data.classname = `BubbleImg`;
        if (sid == 50001) {
            data.name = `圣诞老人`;
        } else if (sid == 50002) {
            data.name = `爱情物语`;
        } else if (sid == 50003) {
            data.name = `五一劳模`;
        } else if (sid == 50004) {
            data.name = `相约520`;
        } else if (sid == 50005) {
            data.name = `我爱吃粽子`;
        } else if (sid == 50006) {
            data.name = `欢度六一`;
        } else if (sid == 50007) {
            data.name = `海边假日`;
        } else if (sid == 50008) {
            data.name = `海之恋`;
        } else if (sid == 50009) {
            data.name = `浪漫七夕`;
        } else if (sid == 50010) {
            data.name = `大闹天宫`;
        } else if (sid == 50011) {
            data.name = `万圣狂欢`;
        } else if (sid == 50012) {
            data.name = `冬日浓情`;
        } else if (sid == 50013) {
            data.name = `尊贵神豪`;
        } else if (sid == 50014) {
            data.name = `人气之星`;
        } else if (sid == 50015) {
            data.name = `魅力男神`;
        } else if (sid == 50016) {
            data.name = `魅力女神`;
        } else if (sid == 50017) {
            data.name = `周年快乐`;
        }
        data.img = `http://obs.99yuyin.com/httpServer/image/chat_bubble/${parseInt(sid)}/bubble_shop@2x.png`;
        (parseInt(num) / 3600).toFixed(0) >= 24 ? data.num = `${(parseInt(num) / 3600 / 24).toFixed(0)}天` : data.num = `${(parseInt(num) / 3600).toFixed(0)}小时`
        return data;
    } else if (type == `car`) {
        data.classname = `CarImg`;
        if (sid == 4000100) {
            data.name = `F117-夜鹰`;
        } else if (sid == 4000200) {
            data.name = `幻影战斗机`;
        } else if (sid == 4000300) {
            data.name = `湾流G650`;
        } else if (sid == 4000400) {
            data.name = `黑鹰直升机`;
        } else if (sid == 4000500) {
            data.name = `法拉利`;
        } else if (sid == 4000600) {
            data.name = `布加迪`;
        } else if (sid == 4000700) {
            data.name = `兰博基尼`;
        } else if (sid == 4000800) {
            data.name = `保时捷`;
        } else if (sid == 4000900) {
            data.name = `凯佰赫战盾`;
        } else if (sid == 4001000) {
            data.name = `派拉蒙掠夺者`;
        } else if (sid == 4001100) {
            data.name = `剑齿虎装甲车`;
        } else if (sid == 4001200) {
            data.name = `枭龙越野车`;
        } else if (sid == 4010100) {
            data.name = `甲壳虫`;
        } else if (sid == 4010200) {
            data.name = `宝马MINI`;
        } else if (sid == 4010300) {
            data.name = `日蚀号`;
        } else if (sid == 4010400) {
            data.name = `皇家梦想号`;
        } else if (sid == 4011000) {
            data.name = `蝙蝠战车`;
        } else if (sid == 4011001) {
            data.name = `神州火箭`;
        } else if (sid == 4011002) {
            data.name = `最强挖掘机`;
        } else if (sid == 4011003) {
            data.name = `天作之合`;
        } else if (sid == 4011004) {
            data.name = `天作之合`;
        } else if (sid == 4011005) {
            data.name = `端午龙舟`;
        } else if (sid == 4011006) {
            data.classname = `Car1Img`;
            data.name = `小美的三轮车`;
        } else if (sid == 4011007) {
            data.name = `王者号`;
        } else if (sid == 4011008) {
            data.name = `擎天柱`;
        } else if (sid == 4011009) {
            data.name = `八一`;
        } else if (sid == 4011010) {
            data.name = `爱神`;
        } else if (sid == 4011011) {
            data.name = `急速追风`;
        } else if (sid == 4011012) {
            data.classname = `Car1Img`;
            data.name = `神威号`;
        } else if (sid == 4011013) {
            data.name = `南瓜车`;
        } else if (sid == 4011014) {
            data.name = `魔法座驾`;
        } else if (sid == 4011015) {
            data.name = `大黄蜂`;
        } else if (sid == 4011016) {
            data.name = `科迈罗`;
        } else if (sid == 4011017) {
            data.name = `圣诞雪橇`;
        } else if (sid == 4011018) {
            data.name = `第六元素概念车`;
        } else if (sid == 4011019) {
            data.name = `比翼双飞`;
        } else if (sid == 4011020) {
            data.name = `比翼双飞`;
        } else if (sid == 4011021) {
            data.name = `万瑞麒麟`;
        } else if (sid == 4011022) {
            data.name = `五彩灵狐`;
        } else if (sid == 4011023) {
            data.name = `FFL战鹰`;
        } else if (sid == 4011024) {
            data.name = `哈雷`;
        } else if (sid == 4011025) {
            data.name = `H307`;
        } else if (sid == 4011026) {
            data.name = `幽冥快艇`;
        } else if (sid == 4011027) {
            data.name = `仙轿`;
        }
        data.img = `http://obs.99yuyin.com/httpServer/image/car/icon_${parseInt(sid)}@2x.png`;
        (parseInt(num) / 3600).toFixed(0) >= 24 ? data.num = `${(parseInt(num) / 3600 / 24).toFixed(0)}天` : data.num = `${(parseInt(num) / 3600).toFixed(0)}小时`
        return data;
    } else if (type == `title`) {
        if (sid <= 3000000) {
            var srt = `animation_title`;
        } else {
            var srt = `icon_title`;
        }
        if (sid == 1000000) {
            data.name = `愚乐至上`;
        } else if (sid == 1000001) {
            data.name = `愚人节`;
        } else if (sid == 1000002) {
            data.name = `踏青之旅`;
        } else if (sid == 1000003) {
            data.name = `气度翩翩`;
        } else if (sid == 1000004) {
            data.name = `倾国倾城`;
        } else if (sid == 1000005) {
            data.name = `登峰造极`;
        } else if (sid == 1000006) {
            data.name = `久久守护`;
        } else if (sid == 1000007) {
            data.name = `君临天下`;
        } else if (sid == 1000008) {
            data.name = `天长`;
        } else if (sid == 1000009) {
            data.name = `地久`;
        } else if (sid == 1000010) {
            data.name = `至尊VIP`;
        } else if (sid == 1000011) {
            data.name = `久久伴侣`;
        } else if (sid == 1000012) {
            data.name = `神出鬼没`;
        } else if (sid == 1000013) {
            data.name = `万鬼朝宗`;
        } else if (sid == 1000014) {
            data.name = `百鬼夜行`;
        } else if (sid == 1000015) {
            data.name = `狂欢派对`;
        } else if (sid == 1000016) {
            data.name = `单身贵族`;
        } else if (sid == 1000017) {
            data.name = `单身仙女`;
        } else if (sid == 1000020) {
            data.name = `全服最美女神`;
        } else if (sid == 1000021) {
            data.name = `全服最帅男神`;
        } else if (sid == 1000022) {
            data.name = `人气之星`;
        } else if (sid == 1000023) {
            data.name = `绝世神豪`;
        } else if (sid == 1000024) {
            data.name = `绝世神豪`;
        } else if (sid == 1000030) {
            data.name = `元宵节快乐`;
        } else if (sid == 1000031) {
            data.name = `中国加油`;
        } else if (sid == 1000035) {
            data.name = `森林卫士`;
        } else if (sid == 1000036) {
            data.name = `虐怪狂人`;
        } else if (sid == 1000037) {
            data.name = `挚爱康乃馨`;
        } else if (sid == 1000038) {
            data.name = `久久盟主`;
        } else if (sid == 1000039) {
            data.name = `名震江湖`;
        } else if (sid == 1000040) {
            data.name = `王者彩翼`;
        } else if (sid == 1000043) {
            data.name = `童心未泯`;
        } else if (sid == 1000044) {
            data.name = `寒耕暑耘`;
        } else if (sid == 1000045) {
            data.name = `萌新`;
        } else if (sid == 1000049) {
            data.name = `柔情密意`;
        } else if (sid == 1000050) {
            data.name = `花成蜜就`;
        } else if (sid == 1000051) {
            data.name = `情投意合`;
        } else if (sid == 1000052) {
            data.name = `天作之合`;
        } else if (sid == 1000053) {
            data.name = `相濡以沫`;
        } else if (sid == 1000054) {
            data.name = `普天同庆`;
        } else if (sid == 4100000) {
            data.name = `开国守护`;
        } else if (sid == 4100001) {
            data.name = `开国男爵`;
        } else if (sid == 4100002) {
            data.name = `开国子爵`;
        } else if (sid == 4100003) {
            data.name = `开国伯爵`;
        } else if (sid == 4100004) {
            data.name = `开国侯爵`;
        } else if (sid == 4100005) {
            data.name = `开国公爵`;
        } else if (sid == 4100006) {
            data.name = `开国亲王`;
        } else if (sid == 4100007) {
            data.name = `开国骑士`;
        } else if (sid == 4100008) {
            data.name = `开国元帅`;
        } else if (sid == 4100009) {
            data.name = `镇国功臣`;
        } else if (sid == 4100010) {
            data.name = `镇国将军`;
        } else if (sid == 4100014) {
            data.name = `五一劳模`;
        } else if (sid == 4100015) {
            data.name = `好友如云`;
        } else if (sid == 4100016) {
            data.name = `千万富翁`;
        } else if (sid == 4100017) {
            data.name = `国民老公`;
        } else if (sid == 4100018) {
            data.name = `国民女神`;
        } else if (sid == 4100019) {
            data.name = `高富帅`;
        } else if (sid == 4100020) {
            data.name = `白富美`;
        } else if (sid == 4100021) {
            data.name = `土豪`;
        } else if (sid == 4100022) {
            data.name = `有钱任性`;
        } else if (sid == 4100023) {
            data.name = `仙女下凡`;
        } else if (sid == 4100024) {
            data.name = `魅力女神`;
        } else if (sid == 4100025) {
            data.name = `气质女神`;
        } else if (sid == 4100026) {
            data.name = `大众女神`;
        } else if (sid == 4100027) {
            data.name = `至尊情圣`;
        } else if (sid == 4100028) {
            data.name = `风流男神`;
        } else if (sid == 4100029) {
            data.name = `多情男神`;
        } else if (sid == 4100030) {
            data.name = `大众男神`;
        } else if (sid == 4100031) {
            data.name = `护花使者`;
        } else if (sid == 4100032) {
            data.name = `戏水龙王`;
        } else if (sid == 4100033) {
            data.name = `舞舟圣手`;
        } else if (sid == 4100034) {
            data.name = `竞舟达人`;
        } else if (sid == 4100035) {
            data.name = `龙舟健将`;
        } else if (sid == 4100036) {
            data.name = `霸道粽裁`;
        } else if (sid == 4100037) {
            data.name = `豪情粽王`;
        } else if (sid == 4100038) {
            data.name = `一代粽师`;
        } else if (sid == 4100039) {
            data.name = `粽子使者`;
        } else if (sid == 4100040) {
            data.name = `五彩花绳`;
        } else if (sid == 4100041) {
            data.name = `祖国的花朵`;
        } else if (sid == 4100042) {
            data.name = `豪气贵族`;
        } else if (sid == 4100043) {
            data.name = `阔气财主`;
        } else if (sid == 4100044) {
            data.name = `不差钱`;
        } else if (sid == 4100045) {
            data.name = `豪气贵族`;
        } else if (sid == 4100047) {
            data.name = `举世闻名`;
        } else if (sid == 4100048) {
            data.name = `大名鼎鼎`;
        } else if (sid == 4100049) {
            data.name = `赫赫有名`;
        } else if (sid == 4100051) {
            data.name = `海神之子`;
        } else if (sid == 4100052) {
            data.name = `丐帮成员`;
        } else if (sid == 4100053) {
            data.name = `丐帮舵主`;
        } else if (sid == 4100054) {
            data.name = `丐帮长老`;
        } else if (sid == 4100055) {
            data.name = `盗神再临`;
        } else if (sid == 4100056) {
            data.name = `盗圣之名`;
        } else if (sid == 4100057) {
            data.name = `盗王传说`;
        } else if (sid == 4100058) {
            data.name = `盗侠之风`;
        } else if (sid == 4100059) {
            data.name = `独领风骚`;
        } else if (sid == 4100060) {
            data.name = `齐天大圣`;
        } else if (sid == 4100061) {
            data.name = `平天大圣`;
        } else if (sid == 4100062) {
            data.name = `混天大圣`;
        } else if (sid == 4100063) {
            data.name = `花果山护法`;
        } else if (sid == 4100064) {
            data.name = `玉皇大帝`;
        } else if (sid == 4100065) {
            data.name = `二郎神`;
        } else if (sid == 4100066) {
            data.name = `托塔天王`;
        } else if (sid == 4100067) {
            data.name = `天庭护法`;
        } else if (sid == 4100068) {
            data.name = `威震三界`;
        } else if (sid == 4100069) {
            data.name = `念君悠悠`;
        } else if (sid == 4100070) {
            data.name = `伊人切切`;
        } else if (sid == 4100071) {
            data.name = `相伴相随`;
        } else if (sid == 4100072) {
            data.name = `倾城之恋`;
        } else if (sid == 4100073) {
            data.name = `国民女团`;
        } else if (sid == 4100079) {
            data.name = `硕士辅导`;
        } else if (sid == 4100080) {
            data.name = `学士辅导`;
        } else if (sid == 4100081) {
            data.name = `博士辅导`;
        } else if (sid == 4100082) {
            data.name = `万兽之王`;
        } else if (sid == 4100083) {
            data.name = `十万斩`;
        } else if (sid == 4100084) {
            data.name = `冷面杀手`;
        } else if (sid == 4100085) {
            data.name = `时空猎人`;
        } else if (sid == 4100086) {
            data.name = `画好月圆`;
        } else if (sid == 4100087) {
            data.name = `天之骄子`;
        } else if (sid == 4100089) {
            data.name = `捣蛋大王`;
        } else if (sid == 4100090) {
            data.name = `魔法王座`;
        } else if (sid == 4100091) {
            data.name = `武林盟主`;
        } else if (sid == 4100092) {
            data.name = `掌门`;
        } else if (sid == 4100093) {
            data.name = `长老`;
        } else if (sid == 4100094) {
            data.name = `护法`;
        } else if (sid == 4100095) {
            data.name = `执事`;
        } else if (sid == 4100096) {
            data.name = `掌门`;
        } else if (sid == 4100097) {
            data.name = `长老`;
        } else if (sid == 4100098) {
            data.name = `护法`;
        } else if (sid == 4100099) {
            data.name = `执事`;
        } else if (sid == 4100105) {
            data.name = `掌门`;
        } else if (sid == 4100106) {
            data.name = `长老`;
        } else if (sid == 4100107) {
            data.name = `护法`;
        } else if (sid == 4100108) {
            data.name = `执事`;
        } else if (sid == 4100118) {
            data.name = `考的全会`;
        } else if (sid == 4100119) {
            data.name = `蒙的全对`;
        } else if (sid == 4100120) {
            data.name = `冰雪大帝`;
        } else if (sid == 4100121) {
            data.name = `冰雪智多星`;
        } else if (sid == 4100122) {
            data.name = `冰雪大力士`;
        } else if (sid == 4100123) {
            data.name = `冰雪小精灵`;
        } else if (sid == 4100124) {
            data.name = `万紫千红`;
        } else if (sid == 4100125) {
            data.name = `开天辟地`;
        } else if (sid == 4100126) {
            data.name = `辞旧迎新`;
        } else if (sid == 4100127) {
            data.name = `初生牛犊`;
        } else if (sid == 4100128) {
            data.name = `五谷丰登`;
        } else if (sid == 4100129) {
            data.name = `无所不知`;
        } else if (sid == 4100130) {
            data.name = `瞒天过海`;
        } else if (sid == 4100131) {
            data.name = `爱神`;
        } else if (sid == 4100132) {
            data.name = `年兽`;
        } else if (sid == 4100133) {
            data.name = `全民情人`;
        } else if (sid == 4100134) {
            data.name = `污妖王`;
        } else if (sid == 4100135) {
            data.name = `小可爱`;
        } else if (sid == 4100136) {
            data.name = `钻石王老五`;
        } else if (sid == 4100137) {
            data.name = `恭贺新春`;
        } else if (sid == 4100138) {
            data.name = `美女杀手`;
        } else if (sid == 4100144) {
            data.name = `鬼斧神工`;
        } else if (sid == 4100148) {
            data.name = `天选之人`;
        } else if (sid == 4100149) {
            data.name = `小皇帝`;
        } else if (sid == 4100150) {
            data.name = `至高无上`;
        } else if (sid == 4100151) {
            data.name = `劳动最光荣`;
        } else if (sid == 4200003) {
            data.name = `全服好男子`;
        } else if (sid == 4200004) {
            data.name = `全服好菇凉`;
        } else if (sid == 4200005) {
            data.name = `最漂亮的老公`;
        } else if (sid == 4200006) {
            data.name = `最帅气的老婆`;
        } else if (sid == 4200031) {
            data.name = `全服第一男神`;
        } else if (sid == 4200032) {
            data.name = `全服最美女神`;
        } else if (sid == 5000001) {
            data.name = `久久首富`;
        } else if (sid == 5000002) {
            data.name = `久久首富`;
        } else if (sid == 5000003) {
            data.name = `久久首富`;
        } else if (sid == 5000004) {
            data.name = `久久首富`;
        } else if (sid == 5000005) {
            data.name = `久久首富`;
        } else if (sid == 9900001) {
            data.name = `久久首富`;
        } else if (sid == 9900002) {
            data.name = `官方巡查`;
        } else if (sid == 9900003) {
            data.name = `第一家族`;
        } else if (sid == 9900004) {
            data.name = `第一家族`;
        } else if (sid == 9900005) {
            data.name = `第一家族`;
        } else if (sid == 9900006) {
            data.name = `久久语音第一龙头家族`;
        } else if (sid == 9900007) {
            data.name = `第一家族`;
        } else if (sid == 9900008) {
            data.name = `官方巡查`;
        } else if (sid == 9900009) {
            data.name = `久久首富`;
        } else if (sid == 9900060) {
            data.name = `滚开我有病`;
        } else if (sid == 9900061) {
            data.name = `过来我有药`;
        } else if (sid == 9900064) {
            data.name = `滚开我有病`;
        } else if (sid == 9900065) {
            data.name = `过来我有药`;
        } else if (sid == 9900090) {
            data.name = `最奈斯的老公`;
        } else if (sid == 9900091) {
            data.name = `最完美的老婆`;
        } else if (sid == 9900093) {
            data.name = `莫失莫忘`;
        } else if (sid == 9900096) {
            data.name = `扛把子`;
        } else if (sid == 9900097) {
            data.name = `请叫我豪`;
        } else if (sid == 9900114) {
            data.name = `温柔鲁叔`;
        } else if (sid == 9900134) {
            data.name = `极速飙车`;
        } else if (sid == 9900135) {
            data.name = `女神`;
        } else if (sid == 9900140) {
            data.name = `冲上云霄`;
        } else if (sid == 9900141) {
            data.name = `全服BOSS终结者`;
        } else if (sid == 9900142) {
            data.name = `女神小祖宗`;
        } else if (sid == 9900149) {
            data.name = `霸气的相公`;
        } else if (sid == 9900150) {
            data.name = `温柔的娘子`;
        } else if (sid == 9900165) {
            data.name = `荣誉城主`;
        } else if (sid == 9900166) {
            data.name = `鲜花收藏家`;
        } else if (sid == 9900167) {
            data.name = `玩家饲养员`;
        } else if (sid == 9900168) {
            data.name = `创意总监`;
        } else if (sid == 9900169) {
            data.name = `奢侈品行家`;
        } else if (sid == 9900170) {
            data.name = `结婚对象`;
        } else if (sid == 9900179) {
            data.name = `情圣`;
        } else if (sid == 9900180) {
            data.name = `撩妹圣手`;
        } else if (sid == 9900182) {
            data.name = `凤求凰`;
        } else if (sid == 9900183) {
            data.name = `壕`;
        } else if (sid == 9900206) {
            data.name = `天真烂漫`;
        } else if (sid == 9900207) {
            data.name = `小土豪`;
        } else if (sid == 9900208) {
            data.name = `比翼双飞`;
        } else if (sid == 9900209) {
            data.name = `人气新秀`;
        } else if (sid == 9900210) {
            data.name = `万人迷`;
        } else if (sid == 9900211) {
            data.name = `情有独钟`;
        } else if (sid == 9900216) {
            data.name = `逆天战神`;
        } else if (sid == 9900217) {
            data.name = `我只粽意你`;
        } else if (sid == 9900218) {
            data.name = `甜粽子`;
        } else if (sid == 9900219) {
            data.name = `香粽大王`;
        } else if (sid == 9900224) {
            data.name = `凤舞九天`;
        } else if (sid == 9900225) {
            data.name = `战无双`;
        } else if (sid == 9900226) {
            data.name = `父爱如山`;
        } else if (sid == 9900227) {
            data.name = `爸爸去哪儿`;
        } else if (sid == 9900228) {
            data.name = `父爱如山`;
        } else if (sid == 9900229) {
            data.name = `天之骄子`;
        } else if (sid == 9900230) {
            data.name = `父爱如山`;
        } else if (sid == 9900231) {
            data.name = `父爱如山`;
        } else if (sid == 9900232) {
            data.name = `父爱如山`;
        } else if (sid == 9900233) {
            data.name = `父爱如山`;
        } else if (sid == 9900234) {
            data.name = `父爱如山`;
        } else if (sid == 9900235) {
            data.name = `顶天立地`;
        } else if (sid == 9900236) {
            data.name = `顶天立地`;
        } else if (sid == 9900243) {
            data.name = `傲视群雄`;
        } else if (sid == 9900244) {
            data.name = `傲视群雄`;
        } else if (sid == 9900245) {
            data.name = `傲视群雄`;
        } else if (sid == 9900246) {
            data.name = `清凉一夏`;
        } else if (sid == 9900247) {
            data.name = `清凉一夏`;
        } else if (sid == 9900248) {
            data.name = `清凉一夏`;
        } else if (sid == 9900249) {
            data.name = `酷爽一夏`;
        } else if (sid == 9900250) {
            data.name = `酷爽一夏`;
        } else if (sid == 9900251) {
            data.name = `酷爽一夏`;
        } else if (sid == 9900252) {
            data.name = `冰凉夏日`;
        } else if (sid == 9900253) {
            data.name = `冰凉夏日`;
        } else if (sid == 9900254) {
            data.name = `冰凉夏日`;
        } else if (sid == 9900261) {
            data.name = `气度翩翩`;
        } else if (sid == 9900262) {
            data.name = `倾国倾城`;
        } else if (sid == 9900263) {
            data.name = `气度翩翩`;
        } else if (sid == 9900264) {
            data.name = `赫赫有名`;
        } else if (sid == 9900265) {
            data.name = `家喻户晓`;
        } else if (sid == 9900266) {
            data.name = `倾国倾城`;
        } else if (sid == 9900267) {
            data.name = `气度翩翩`;
        } else if (sid == 9900268) {
            data.name = `倾国倾城`;
        } else if (sid == 9900269) {
            data.name = `富甲一方`;
        } else if (sid == 9900280) {
            data.name = `天下无双`;
        } else if (sid == 9900281) {
            data.name = `龙的传人`;
        } else if (sid == 9900286) {
            data.name = `矢志不渝`;
        } else if (sid == 9900287) {
            data.name = `永结同心`;
        } else if (sid == 9900288) {
            data.name = `矢志不渝`;
        } else if (sid == 9900289) {
            data.name = `永结同心`;
        } else if (sid == 9900290) {
            data.name = `矢志不渝`;
        } else if (sid == 9900291) {
            data.name = `矢志不渝`;
        } else if (sid == 9900328) {
            data.name = `全服第一坑`;
        } else if (sid == 9900329) {
            data.name = `全服第一坑`;
        } else if (sid == 9900330) {
            data.name = `全服贼好看`;
        } else if (sid == 9900331) {
            data.name = `全服贼好看`;
        } else if (sid == 9900332) {
            data.name = `全服第一坑`;
        } else if (sid == 9900335) {
            data.name = `全服贼可爱`;
        } else if (sid == 9900338) {
            data.name = `佛语辅导队队长`;
        } else if (sid == 9900339) {
            data.name = `鼎流辅导队队长`;
        } else if (sid == 9900340) {
            data.name = `傲世辅导队队长`;
        } else if (sid == 9900341) {
            data.name = `挥金如土`;
        } else if (sid == 9900342) {
            data.name = `良师益友`;
        } else if (sid == 9900343) {
            data.name = `披星戴月`;
        } else if (sid == 9900344) {
            data.name = `桃李争妍`;
        } else if (sid == 9900345) {
            data.name = `春风化雨`;
        } else if (sid == 9900346) {
            data.name = `挥金如土`;
        } else if (sid == 9900351) {
            data.name = `月光之神`;
        } else if (sid == 9900352) {
            data.name = `彩云追月`;
        } else if (sid == 9900353) {
            data.name = `彩云追月`;
        } else if (sid == 9900354) {
            data.name = `彩云追月`;
        } else if (sid == 9900355) {
            data.name = `至尊神豪`;
        } else if (sid == 9900356) {
            data.name = `霸气侧漏`;
        } else if (sid == 9900357) {
            data.name = `月光之礼`;
        } else if (sid == 9900358) {
            data.name = `至尊神豪`;
        } else if (sid == 9900365) {
            data.name = `豪气冲天`;
        } else if (sid == 9900366) {
            data.name = `一叶知秋`;
        } else if (sid == 9900367) {
            data.name = `瓜果飘香`;
        } else if (sid == 9900368) {
            data.name = `秋风执扇`;
        } else if (sid == 9900369) {
            data.name = `秋水伊人`;
        } else if (sid == 9900380) {
            data.name = `欢度国庆`;
        } else if (sid == 9900381) {
            data.name = `王者归来`;
        } else if (sid == 9900382) {
            data.name = `国士无双`;
        } else if (sid == 9900383) {
            data.name = `最帅的先生`;
        } else if (sid == 9900384) {
            data.name = `最美的娘子`;
        } else if (sid == 9900409) {
            data.name = `全服最帅的老公`;
        } else if (sid == 9900410) {
            data.name = `全服最美的媳妇`;
        } else if (sid == 9900435) {
            data.name = `雪王子`;
        } else if (sid == 9900436) {
            data.name = `雪公主`;
        } else if (sid == 9900557) {
            data.name = `兄弟团老大`;
        } else if (sid == 9900558) {
            data.name = `姐妹团老大`;
        } else if (sid == 9900861) {
            data.name = `开国亲王`;
        } else if (sid == 9900862) {
            data.name = `开国公爵`;
        } else if (sid == 9900863) {
            data.name = `开国侯爵`;
        } else if (sid == 9900864) {
            data.name = `开国伯爵`;
        } else if (sid == 9900865) {
            data.name = `开国子爵`;
        } else if (sid == 9900866) {
            data.name = `开国男爵`;
        } else if (sid == 9900867) {
            data.name = `开国守护`;
        } else if (sid == 9900868) {
            data.name = `开国游侠`;
        } else if (sid == 9900882) {
            data.name = `共醉重阳节`;
        } else if (sid == 9900883) {
            data.name = `共醉重阳节`;
        } else if (sid == 9900907) {
            data.name = `魅力男神`;
        } else if (sid == 9900908) {
            data.name = `魅力女神`;
        } else if (sid == 9900909) {
            data.name = `放飞梦想`;
        } else if (sid == 9900910) {
            data.name = `尊贵神豪`;
        } else if (sid == 9900911) {
            data.name = `平台守护者`;
        } else if (sid == 9900924) {
            data.name = `冰雪聪明`;
        } else if (sid == 9900928) {
            data.name = `我有钞能力`;
        } else if (sid == 9900932) {
            data.name = `饺小玲珑`;
        } else if (sid == 9900936) {
            data.name = `嗨皮闹圣诞`;
        } else if (sid == 9900940) {
            data.name = `跨年狂欢`;
        } else if (sid == 9900943) {
            data.name = `腊初迎新`;
        } else if (sid == 9900952) {
            data.name = `风雨同粥`;
        } else if (sid == 9900953) {
            data.name = `风雨同粥`;
        } else if (sid == 9900955) {
            data.name = `五谷丰登`;
        } else if (sid == 9900956) {
            data.name = `花团锦簇`;
        } else if (sid == 9900962) {
            data.name = `牛气冲天`;
        } else if (sid == 9901007) {
            data.name = `天选福星`;
        }
        data.img = `http://obs.99yuyin.com/httpServer/image/title1/${srt}_${parseInt(sid)}.png`;
        data.classname = `TittleImg`;
        (parseInt(num) / 3600).toFixed(0) >= 24 ? data.num = `${(parseInt(num) / 3600 / 24).toFixed(0)}天` : data.num = `${(parseInt(num) / 3600).toFixed(0)}小时`
        return data;
    } else {
        data.classname = `未知`;
        data.name = `未知`;
        data.img = `none`;
        data.num = '???';
        return data;
    }
}