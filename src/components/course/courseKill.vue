<template>
    <div class="courseKill">
      <!--秒杀前-->
      <div v-if="kill_before" class="kill_before">
        <div class="courseBanner">
          <div class="killPrice">
            <span>限时秒杀价</span>
            <span>￥<i>{{killPrice}}</i>{{floatPrice}}</span>
          </div>
          <div class="killBtn">前{{inventory}}人</div>
        </div>
        <div class="killTime">
          <div class="killTime_desc">
            {{killDesc}}
          </div>
          <div class="killTime_time" v-if="killTime_time_beforeday">
            {{floatStr}}开始秒杀
          </div>
          <div class="killTime_time" v-show="killTime_time_day">
            <div>{{kill_h}}</div><i>：</i>
            <div>{{kill_m}}</div><i>：</i>
            <div>{{kill_s}}</div>
          </div>
        </div>
        <!--<div class="triangle_right"></div>-->
      </div>
      <!--正在秒杀-->
      <div v-if="kill_date" class="kill_date">
        <div class="kill_date_Banner">
          <div class="kill_date_Price">
            <span v-show="!isSoldOut">
              <img src="./courseImg/icon_person.png" alt="">
              已有{{salesVolume}}人学习
            </span>
            <span class="kill_date_null" v-show="isSoldOut">
              已抢光
            </span>
          </div>
        </div>
        <div class="kill_date_date">
          <div class="item_desc">{{killDesc}}</div>
          <div class="item">{{kill_h}}</div><i>：</i>
          <div class="item">{{kill_m}}</div><i>：</i>
          <div class="item">{{kill_s}}</div>
        </div>
        <!--<div class="kill_date_right"></div>-->
      </div>
    </div>
</template>

<script>
    export default {
        name: "courseKill",
      data(){
          return{
            killDesc:"",
            courseId:"",
            killTime_time:false,
            active_start:0,     //秒杀开始时间
            floatStr:"",        //截取秒杀时间
            active_end:0,       //秒杀结束时间
            wholePrice:"",      //秒杀价格
            killPrice:"",
            floatPrice:"",
            // 秒杀前
            killTime_time_beforeday:true,
            killTime_time_day:false,
            kill_before:false,
            showTime:0,      //展示时间
            // 秒杀中
            kill_date:false,
            isSoldOut:false,     //是否抢光
            killRemain:0,        //剩余名额
            inventory:0,         //库存
            salesVolume:0,       //学习人数
            // 倒计时
            kill_d:0,
            kill_h:0,
            kill_m:0,
            kill_s:0,
            //是否显示活动
            isactiveShow:true,
            activeDesc:false
          }
      },
      props:['associated'],
      watch:{
        associated(){
          this.getInterface();
          this.getData();
        }
      },
      methods:{
        getInterface(){
          this.courseId=this.associated[0].associatedId;
          this.salesVolume=this.associated[0].salesVolume;
        },
        getData(){
          // console.log(this.courseId);
          this.axios.post("/es/index_time_limit/_search",{
            "query": {
              "bool": {
                "must": [{
                  "term": {
                    "type_time_limit_dataType": "cut"
                  }
                },
                  {
                    "term": {
                      "type_time_limit_courseId": this.courseId
                    }
                  }],
                "must_not": [],
                "should": []
              }
            },
            "sort": [],
            "aggs": {

            }
          }).then(res=>{
            if(res.data.hits.hits.length!=0){
              var act= res.data.hits.hits[0]._source;
              // 测试数据
              // var startData = new Date("2018-11-21 16:21:00");
              // var endData = new Date("2018-11-21 16:22:00");
              // this.active_start=startData.getTime();
              // this.active_end=endData.getTime();
              // this.killRemain=100;
              // 接口数据
              this.active_start=act.type_time_limit_startTime;  //开始时间
              this.active_end=act.type_time_limit_endTime;      //结束时间
              this.killRemain=act.type_time_limit_fakeSales;    //剩余名额
              this.inventory=act.type_time_limit_newCourseStock;  //库存
              this.showTime=act.type_time_limit_showTime;         //展示时间
              this.wholePrice=act.type_time_limit_newCoursePrice; //价格
              // console.log(this.wholePrice.toFixed(2));
              this.killPrice=Math.floor(this.wholePrice);
              if(this.killPrice==this.wholePrice){
                this.floatPrice=".00"
              }else {
                this.floatPrice="."+this.wholePrice.toString().split('.')[1];
              }
              this.getKillInfo();
            }
          });
        },
        //时间转换
        dataTime(time) {
          var date = new Date(time);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          month>9 ? month : month="0"+month;
          var day = date.getDate();
          day>9 ? day : day="0"+day;
          var houer = date.getHours();
          houer>9 ? houer : houer="0"+houer;
          var minutes = date.getMinutes();
          minutes>9 ? minutes : minutes="0"+minutes;
          var seconds = date.getSeconds();
          seconds>9 ? seconds : seconds="0"+seconds;
          var dataTime = `${year}/${month}/${day} ${houer}:${minutes}:${seconds}`;
          // var dataTime1 = `${year}-${month}-${day}`;
          // if(type==0){
          //   return dataTime1;
          // }
          // return dataTime;
          this.killDesc=dataTime.slice(0,10);
          this.floatStr=dataTime.slice(11,19);
        },
        getKillInfo(){
          // 获取当前时间
            var date = new Date();
            var now = date.getTime();
            //活动开始时间
            // var startDate = new Date(this.startStr);
            // var active_start = startDate.getTime();
          var rightTime = this.showTime - now; //展示时间
          if(rightTime>0){
            this.isactiveShow=false;
            this.activeDesc=false;
          }else{
            this.isactiveShow=true;
            this.activeDesc=false;
          }
          var leftTime = this.active_start-now;
            if(leftTime>0){
              this.kill_d = Math.floor(leftTime/1000/60/60/24);
              if(this.kill_d>0){
                // 秒杀前几天
                this.kill_before=true;
                this.killTime_time_day=false;
                this.dataTime(this.active_start);
              }else if(this.kill_d==0){
                // 秒杀前一天
                this.kill_before=true;
                this.killTime_time_day=true;
                this.killTime_time_beforeday=false;
                this.isSoldOut=false;         //未开始抢
                this.killDesc="距开始";
                this.kill_h = Math.floor(leftTime/1000/60/60%24);
                this.kill_h>9 ? this.kill_h : this.kill_h = "0"+this.kill_h;

                this.kill_m = Math.floor(leftTime/1000/60%60);
                this.kill_m>9 ? this.kill_m : this.kill_m = "0"+this.kill_m;

                this.kill_s = Math.floor(leftTime/1000%60);
                this.kill_s>9 ? this.kill_s : this.kill_s = "0"+this.kill_s;
                setTimeout(this.getKillInfo,1000);
              }
            }else{
              //活动开始
              // var active_endDate = new Date(this.endStr);
              // var active_end = active_endDate.getTime();//活动结束时间
              leftTime=this.active_end-now;
              if(leftTime>0){
                this.kill_d = Math.floor(leftTime/1000/60/60/24);
                this.kill_h = Math.floor(leftTime/1000/60/60%24)+24*this.kill_d;
                this.kill_h>9 ? this.kill_h : this.kill_h = "0"+this.kill_h;
                this.killDesc="距结束";
                this.kill_date=true;
                this.kill_before=false;
                this.kill_m = Math.floor(leftTime/1000/60%60);
                this.kill_m>9 ? this.kill_m : this.kill_m = "0"+this.kill_m;

                this.kill_s = Math.floor(leftTime/1000%60);
                this.kill_s>9 ? this.kill_s : this.kill_s = "0"+this.kill_s;

                if(this.killRemain==0){
                  this.activeDesc=false;
                  this.isSoldOut=true;    //已售完
                }else{
                  this.activeDesc=true;
                  this.isSoldOut=false;
                }
                setTimeout(this.getKillInfo,1000);
              }else{
                //活动结束
                console.log("活动结束");
                this.isactiveShow=false;
                this.isSoldOut=true;    //活动结束，不买完也卖完
                this.activeDesc=false
              }
            }
            this.toCourseDetail();
        },
        toCourseDetail(){
          this.$emit("isactiveShow",this.isactiveShow,this.activeDesc);
        }
      },
      mounted(){
        // this.getKillInfo();
        // this.getData()
      }
    }
</script>

<style scoped>
  /*秒杀前*/
  .courseKill{
    width:100%;
    position: relative;
  }
  .kill_before{
    height: 1.03rem;
    background: url("./courseImg/killBg.png");
    background-size: 100% 100%;
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
    width:69%;
    float: left;
    /*background-color: #ed1f4b;*/
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
    letter-spacing: .015rem;
    font-size: .5rem;
  }
  .killBtn{
    position: absolute;
    bottom:.1rem;
    left:41.5%;
    background-color: #c81a3f;
    display: inline-block;
    height:.45rem;
    color:#fff;
    line-height: .45rem;
    padding:0 .15rem;
    border-radius: 6px;
    font-size: .23rem;
  }
  .killTime{
    font-size: .27rem;
    width: 31%;
    height:1.03rem;
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /*background: linear-gradient(#fefee8, #f7f48b);*/
    /*background-size: 100% 100%;*/
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
  /*.triangle_right{*/
    /*position: absolute;*/
    /*right:34.96%;*/
    /*width: 0px;*/
    /*height: 0px;*/
    /*border: .53rem solid transparent;*/
    /*border-right: .4rem solid #f9f8b2;*/
    /*!*box-shadow: #fadaad 10px 10px 30px 5px ;//边框阴影*!*/
  /*}*/
  /*正在秒杀*/
  .kill_date{
    height:.68rem;
    background: url("./courseImg/killBg2.png");
    background-size: 100% 100%;
  }
  .kill_date_Banner{
    width:100%;
    position: relative;
  }
  .kill_date_Price{
    line-height: .68rem;
    height:.68rem;
    float: left;
    /*background-color: #ed1f4b;*/
    width:56%;
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
    width: 44%;
    height:.68rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /*background: linear-gradient(#fefee8, #f7f48b);*/
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
  /*.kill_date_right{*/
    /*position: absolute;*/
    /*right:44%;*/
    /*top:0;*/
    /*width: 0px;*/
    /*height: 0px;*/
    /*border: .35rem solid transparent;*/
    /*border-right: .3rem solid #f9f8b2;*/
  /*}*/
</style>
