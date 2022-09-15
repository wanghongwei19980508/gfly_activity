
/**
 * 切换标签页 （基于JQ）
 * @param className {要切换的title名集合}
 * @param boxName {要切换的box名集合}
 * @param upId {前一个title的序号值}
 * @param downId {当前title的序号值}
 */
class titleName{
    constructor(className,boxName,upId,downId){
        this.className=className;
        this.boxName=boxName;
        this.upId=upId;
        this.downId=downId;
    }
    init(){
        this.remove();
        this.add();
    }
    remove(){
        let classRemoveName=this.className.eq(this.upId).attr('uid')+'Add';
        this.className.eq(this.upId).removeClass(classRemoveName);
    }
    add(){
        let classAddName=this.className.eq(this.downId).attr('uid')+'Add';
        this.className.eq(this.downId).addClass(classAddName);
        this.boxName.hide();
        this.boxName.eq(this.downId).show(0);
    }
}

/**
 * 大转盘 （基于JQ）
 * @param classID {要切换的id前缀 (传值'#idname')}
 * @param className {光标名称 ('classname')}
 * @param turnTablelength {转盘格子length}
 * @param upId {当前转盘光标的位置号}
 * @param downId {转盘光标要抵达的位置号}
 * @param turnTableTime{光标运动时间,以毫秒计算}
 * @param turnTableNum{转盘转动圈数,可以为0}
 * @param btn{点击事件的指向}
 * @param endfunction{结束后吊起的函数}
 */
class wheelOfFortune{
    constructor(classID,className,turnTablelength,upId,downId,turnTableTime,turnTableNum,btn,endfunction){
        this.classID=classID;
        this.className=className;
        this.turnTablelength=parseInt(turnTablelength);
        this.upId=upId;
        this.downId=downId;
        this.turnTableTime=parseInt(turnTableTime);
        this.turnTableNum=parseInt(turnTableNum);
        this.btn=btn;
        this.endfunction=endfunction;
        this.set;  //定时器
        // 单抽事件
        this.num=parseInt(upId);  //定时器内的位置变化
        this.spend=0;  //定时器的总执行时间
        this.time=0;  //定时器执行的次数
        this.spendnum=0;  //定时器的每次执行时间
        this.counter=1;  //定时器内的计数器
        this.changenum=0;  //定时器的更改节点
        // 十连抽事件
        this.setting;  //一个定时器  目前没用
        this.arr=[];  //数组  目前没用到
        this.arrNum=0;  //十连抽指针
        this.arrTime=0;  //十连抽定时器的总执行时间
        this.arrAgainTime=this.turnTableTime*10;  //  十连抽延时器执行时间
    }
    init(){
        this.btn.css({
            'pointer-events': 'none'
        });
        if(this.upId.length>1 && this.downId.length>1){
            this.begin();
            this.removePrelude();
        }else{
            this.start();
            this.end();
        }
    }
    start(){
        if(this.downId > this.upId){
            this.time=this.turnTableNum*this.turnTablelength+this.downId-this.upId;
        }else if(this.downId <= this.upId){
            this.time=this.turnTableNum*this.turnTablelength+this.turnTablelength-this.upId+this.downId;
        }
        this.changenum = Math.floor(this.time/3);
        this.spend = this.turnTableTime*(this.time+1);
        if(this.turnTableNum === 0){
            this.spend -= this.turnTableTime
            this.spendnum=this.turnTableTime;
            this.animation1();
        }else{
            this.spendnum=(15*this.turnTableTime)/10;
            this.animation();
        }
    }
    animation(){
        this.set=setInterval(() => {
            let star=this.classID+this.num;
            this.num=this.num+1;
            if(this.num>=this.turnTablelength){
                this.num=this.num-this.turnTablelength;
            }
            let end=this.classID+this.num;
            $(star).removeClass(this.className);
            $(end).addClass(this.className);
            // console.log('当前位置：'+this.num+'转动次数'+this.counter  );

            if(this.counter === this.changenum){
                this.spendnum-=this.turnTableTime;
                clearInterval(this.set);
                this.animation();
            }else if(this.counter === this.changenum*2){
                this.spendnum=this.turnTableTime;
                clearInterval(this.set);
                this.animation();
            }
            this.counter++;
        },this.spendnum);
        // console.log('速度：'+this.spendnum);
        // console.log('转动次数'+this.counter);
    }
    animation1(){
        this.set=setInterval(() => {
            let star=this.classID+this.num;
            this.num=this.num+1;
            if(this.num>=this.turnTablelength){
                this.num=this.num-this.turnTablelength;
            }
            let end=this.classID+this.num;
            $(star).removeClass(this.className);
            $(end).addClass(this.className);
            // console.log('当前位置：'+this.num+'转动次数'+this.counter  );
        },this.spendnum);
    }
    end(){
        setTimeout(() => {
            // console.log('转动次数'+this.counter +'总次数' +this.time);
            clearInterval(this.set);
            setTimeout(() => {
                let b='#'+$('.'+this.className).attr('id');
                $(b).removeClass(this.className);
                $(this.classID+this.downId).addClass(this.className);
                this.btn.css({
                    'pointer-events': 'auto'
                });
                if(typeof this.endfunction === 'function'){
                    this.endfunction();
                }
            }, 300);
        }, this.spend);
    }
    begin(){
        if(this.turnTableNum>0){
            this.time=this.turnTablelength*this.turnTableNum;
            this.changenum=Math.floor(this.time/2)-1;
            this.spendnum=15*this.turnTableTime/10;
            this.spend=this.turnTableTime*this.time;
            // console.log(this.spend)
            // console.log('更改节点'+this.changenum);
            this.animation();
        }else{
            this.spend=this.turnTableTime;
            this.turnTableTime=this.turnTableTime;
        }
    }
    removePrelude(){
        setTimeout(() => {
            // console.log('转动次数'+this.counter +'总次数' +this.time);
            clearInterval(this.set);
            this.againAnimation();
        },this.spend+this.turnTableTime);
    }
    againAnimation(){
        if(parseInt(this.downId[this.arrNum]) > parseInt(this.upId[this.arrNum]) ){
            this.time=parseInt(this.downId[this.arrNum])-parseInt(this.upId[this.arrNum]);
        }else if(parseInt(this.downId[this.arrNum]) <= parseInt(this.upId[this.arrNum])){
            this.time=this.turnTablelength-parseInt(this.upId[this.arrNum])+parseInt(this.downId[this.arrNum]);
        }
        this.arrTime = this.turnTableTime*this.time;
        // console.log(this.arrTime);
        // console.log(this.arrNum);
        this.spendnum = this.turnTableTime;
        this.animation1();
        
        if(this.arrNum<this.downId.length){
            this.arrNum++;
        }else{
            clearInterval(this.set);
            this.arrAgainTime=9999999999999;
            this.flicker();
        }
        setTimeout(() => {
            clearInterval(this.set);
            setTimeout(() => {
                this.againAnimation();
            },this.arrAgainTime);
        },this.arrTime);
    }
    flicker(){
        for(let i=0;i<this.arrNum;i++){
            $(this.classID+parseInt(this.downId[i])).addClass(this.className);
        }
        setTimeout(() => {
            for(let i=0;i<this.arrNum;i++){
                $(this.classID+parseInt(this.downId[i])).removeClass(this.className);
            }
            $(this.classID+parseInt(this.downId[this.arrNum-1])).addClass(this.className);
            this.btn.css({
                'pointer-events': 'auto'
            });
            if(typeof this.endfunction === 'function'){
                this.endfunction();
            }
        },1000);
    }
}
/*
* 奖励轮播 （基于JQ）
* @param boxName {外框box}
* @param ulName {运动的框}
* @param liName {轮播的集合}
* @param time {轮播每次的时间}
*/
class shuffling{
    constructor(boxName,ulName,liName,time){
        this.boxName=boxName;
        this.ulName=ulName;
        this.liName=liName;
        this.time=time;

        this.actualHeight=0;
        this.standardHeight=0;
        this.moreHeight=0;
        this.marginTop=0;
    }
    init(){
        this.star();
    }
    star(){
        this.actualHeight=(this.liName.length-1)*parseFloat(this.liName.eq(0).css('height'));
        this.standardHeight=parseFloat(this.boxName.css('height'));
        this.moreHeight=this.actualHeight-this.standardHeight;
        if(this.moreHeight>0){
            this.animation();
        }
    }
    animation(){
        // if(this.marginTop === 0){
            this.set=setInterval(() => {
                this.marginTop=parseFloat(this.ulName.css('margin-top'));
                if(this.moreHeight+this.marginTop>0){
                    this.marginTop-=parseFloat(this.liName.eq(0).css('height'));
                }else{
                    this.marginTop=0;
                }
                // console.log(this.marginTop);
                this.ulName.css({'margin-top':this.marginTop});
            },this.time);
        // }
    }
}


