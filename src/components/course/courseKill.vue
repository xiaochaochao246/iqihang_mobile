<template>
    <div class="courseKill">
      <!--秒杀前-->
      <div v-if="kill_before">
        <div class="courseBanner">
          <div class="killPrice">
            <span>限时秒杀价</span>
            <span>￥<i>{{killPrice}}</i>{{floatPrice}}</span>
          </div>
          <div class="killBtn">前{{killPrice}}人</div>
        </div>
        <div class="killTime">
          <div class="killTime_desc" >
            {{killDesc}}
          </div>
          <div class="killTime_time" v-if="killTime_time_beforeday">
            {{floatStr}}开始秒杀
          </div>
          <div class="killTime_time" v-show="killTime_time_day">
            <div>{{before_kill_h}}</div><i>：</i>
            <div>{{before_kill_m}}</div><i>：</i>
            <div>{{before_kill_s}}</div>
          </div>
        </div>
        <div class="triangle_right"></div>
      </div>
      <!--正在秒杀-->
      <div v-if="kill_date">
        <div class="kill_date_Banner">
          <div class="kill_date_Price">
            <span v-show="!isSoldOut">
              <img src="./courseImg/icon_person.png" alt="">
              已有4871人学习
            </span>
            <span class="kill_date_null" v-show="isSoldOut">
              已抢光
            </span>
          </div>
        </div>
        <div class="kill_date_date">
          <div class="item_desc">{{killDesc}}</div>
          <div class="item">{{before_kill_h}}</div><i>：</i>
          <div class="item">{{before_kill_m}}</div><i>：</i>
          <div class="item">{{before_kill_s}}</div>
        </div>
        <div class="kill_date_right"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "courseKill",
      data(){
          return{
            killDesc:"",
            killTime_time:false,
            startStr:"",//秒杀开始时间
            floatStr:"",//截取秒杀时间
            endStr:"",//秒杀结束时间
            wholePrice:"",//秒杀价格
            orginPrice:"",
            killPrice:"",
            floatPrice:"",
            // 秒杀前
            killTime_time_beforeday:true,
            killTime_time_day:false,
            kill_before:false,
            // 秒杀中
            kill_date:false,
            isSoldOut:false,//是否抢光
            killRemain:"",//剩余名额
            // 倒计时
            before_kill_d:0,
            before_kill_h:0,
            before_kill_m:0,
            before_kill_s:0,
            //是否显示活动
            isactiveShow:true,
          }
      },
      props:['associated'],
      watch:{
        associated(){
          this.getInterface()
        }
      },
      methods:{
          getData(){
            this.startStr="2018/11/21 00:00:00";
            this.endStr="2018/11/22 00:00:00";
            this.killRemain=100;
            this.wholePrice="1000.00";
            this.orginPrice="1680.00";
            this.floatPrice=this.wholePrice.substring(this.wholePrice.length-3);
            this.killPrice=this.wholePrice.slice(0,4);
          },
        getInterface(){

        },
        getKillInfo(){
          this.getData();
          // 获取当前时间
            var date = new Date();
            var now = date.getTime();
            //活动开始时间
            var startDate = new Date(this.startStr);
            var active_start = startDate.getTime();
            // 时间差
            var leftTime = active_start-now;
            if(leftTime>0){
              this.before_kill_d = Math.floor(leftTime/1000/60/60/24);
              if(this.before_kill_d>0){
                // 秒杀前几天
                this.kill_before=true;
                this.isSoldOut=true;         //未开始抢
                this.killTime_time_day=false;
                this.killDesc=this.startStr.slice(0,10);
                this.floatStr=this.startStr.slice(10,19);
              }else if(this.before_kill_d==0){
                // 秒杀前一天
                this.kill_before=true;
                this.killTime_time_day=true;
                this.killTime_time_beforeday=false;
                this.isSoldOut=true;         //未开始抢
                this.killDesc="距开始";
                this.before_kill_h = Math.floor(leftTime/1000/60/60%24);
                if(this.before_kill_h<=9){
                  this.before_kill_h='0'+this.before_kill_h;
                }
                // this.before_kill_h>9 ? this.before_kill_h:'0'+this.before_kill_h;
                this.before_kill_m = Math.floor(leftTime/1000/60%60);
                if(this.before_kill_m<=9){
                  this.before_kill_m='0'+this.before_kill_m;
                }
                // this.before_kill_m>9 ? this.before_kill_m:'0'+this.before_kill_m;
                this.before_kill_s = Math.floor(leftTime/1000%60);
                // this.before_kill_s>9 ? this.before_kill_s:'0'+this.before_kill_s;
                if(this.before_kill_s<=9){
                  this.before_kill_s='0'+this.before_kill_s;
                }
                setTimeout(this.getKillInfo,1000);
              }
            }else{
              //活动开始
              var active_endDate = new Date(this.endStr);
              var active_end = active_endDate.getTime();//活动结束时间
              leftTime=active_end-now;
              if(leftTime>0){
                this.killDesc="距结束";
                this.kill_date=true;
                this.kill_before=false;
                this.before_kill_h = Math.floor(leftTime/1000/60/60%24);
                if(this.before_kill_h<=9){
                  this.before_kill_h='0'+this.before_kill_h;
                }
                // this.before_kill_h>9 ? this.before_kill_h:'0'+this.before_kill_h;
                this.before_kill_m = Math.floor(leftTime/1000/60%60);
                if(this.before_kill_m<=9){
                  this.before_kill_m='0'+this.before_kill_m;
                }
                // this.before_kill_m>9 ? this.before_kill_m:'0'+this.before_kill_m;
                this.before_kill_s = Math.floor(leftTime/1000%60);
                // this.before_kill_s>9 ? this.before_kill_s:'0'+this.before_kill_s;
                if(this.before_kill_s<=9){
                  this.before_kill_s='0'+this.before_kill_s;
                }
                if(this.killRemain==0){
                  this.isSoldOut=true;    //已售完
                }
                setTimeout(this.getKillInfo,1000);
              }else{
                //活动结束
                this.isactiveShow=false;
                this.isSoldOut=true;    //活动结束，不买完也卖完
              }
            }
            this.toCourseDetail();
        },
        toCourseDetail(){
          this.$emit("isactiveShow",this.isactiveShow,this.isSoldOut);
        }
      },
      mounted(){
        this.getKillInfo();
      }
    }
</script>

<style scoped>
  /*秒杀前*/
  .courseKill{
    width:100%;
    position: relative;
  }
  .killPrice{
    height:1.03rem;
    display: flex;
    flex-flow: column;
    padding: .1rem 0 .1rem .25rem;
  }
  .courseBanner{
    position: relative;
    display: flex;
    flex-direction: row;
    width:65%;
    float: left;
    background-color: #ed1f4b;
  }
  .killPrice span{
    color: #fffd9b;
    font-size: .23rem;
  }
  .killPrice span:nth-child(2){
    margin-top:.1rem;
  }
  .killPrice span i{
    font-weight: 700;
    color: #fffd9b;
    letter-spacing: .035rem;
    font-size: .46rem;
  }
  .killBtn{
    position: absolute;
    bottom:.1rem;
    left:55.5%;
    /*margin:.4rem 0 0 .3rem;*/
    background-color: #c81a3f;
    display: inline-block;
    height:.45rem;
    color:#fff;
    width:1.25rem;
    line-height: .45rem;
    text-align: center;
    border-radius: 6px;
    font-size: .23rem;
  }
  .killTime{
    font-size: .27rem;
    width: 35%;
    height:1.03rem;
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(#fefee8, #f7f48b);
    background-size: 100% 100%;
  }
  .killTime_desc{
    margin-bottom:.1rem;
  }
  .killTime_desc,.killTime_time{
    color:#ED1F4B;
    font-weight: 600;
    font-size: .27rem;
    text-align: center;
  }
  .killTime_time div{
    display: inline-block;
    height:.46rem;
    width:.46rem;
    text-align: center;
    line-height: .46rem;
    color:#fff;
    border-radius: 5px;
    background: linear-gradient(#ed1f4b, #c91a3f);
  }
  .killTime_time i{
    font-weight: 600;
    color: #ed1f4b;
  }
  .triangle_right{
    position: absolute;
    right:34.96%;
    width: 0px;
    height: 0px;
    border: .53rem solid transparent;
    border-right: .4rem solid #f9f8b2;
  }
  /*正在秒杀*/
  .kill_date_Banner{
    width:100%;
    position: relative;
  }
  .kill_date_Price{
    line-height: .68rem;
    height:.68rem;
    float: left;
    background-color: #ed1f4b;
    width:54%;
  }
  .kill_date_Price span.kill_date_null{
    color:#fff;
    margin-left:.28rem;
    letter-spacing: .03rem;
    font-size: .33rem;
  }
  .kill_date_Price span{
    color:#fff;
    margin:0 .1rem;
    font-size: .22rem;
  }
  .kill_date_Price span img{
    float:left;
    width: .22rem;
    height:.24rem;
    margin-top:.24rem;
    margin-left:.28rem;
  }
  .kill_date_date{
    float: right;
    font-size: .27rem;
    width: 46%;
    height:.68rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(#fefee8, #f7f48b);
    background-size: 100% 100%;
  }
  .kill_date_date i{
    line-height: .68rem;
    color: #ed1f4b;
  }
  .kill_date_date div{
    /*margin-top:.1rem;*/
    font-weight: 600;
    display: inline-block;
    height:.46rem;
    line-height: .46rem;
    text-align: center;
  }
  .kill_date_date .item{
    width:.46rem;
    border-radius: 5px;
    text-align: center;
    line-height: .46rem;
    color:#fff;
    background: linear-gradient(#ed1f4b, #c91a3f);
  }
  .item_desc{
    color: #ed1f4b;
    margin-right:.15rem;
  }
  .kill_date_right{
    position: absolute;
    right:46%;
    top:0;
    width: 0px;
    height: 0px;
    border: .35rem solid transparent;
    border-right: .3rem solid #f9f8b2;
  }
</style>
