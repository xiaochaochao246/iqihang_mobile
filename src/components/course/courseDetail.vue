<template>
    <div class="courseBg">
        <div class="courseImg">
            <img :src="detail.type_product_mainPicture" alt="">
            <div class="studyPeapleNum" v-show="!isKillShow"><span><img src="./courseImg/icon_person.png">已有{{detail.type_product_salesVolume}}人学习</span></div>
        </div>
      <!--秒杀倒计时-->
      <courseKill @isactiveShow="isactiveShow" v-show="isKillShow" :associated='associated'/>

        <div class="courseTxt">
          <div class="courseTitle">
            <img v-show="detail.type_product_classType == '2'" src="./courseImg/line_course.png" alt="">
            <h3 v-html="detail.type_product_title"></h3>
          </div>
          <!--秒杀活动-->
          <courseActive v-show="isshowActive" :associated="associated" :servicesBox="servicesBox" :servicesShow="servicesShow"/>

          <div class="coursePrince">
            <div v-if="!isshowActive">
              <h3>￥
                <span>{{Price}}</span>
                {{floatPrice}}
              </h3>
              <i v-if="servicesBox.length > 0 && servicesShow">此价格中包含服务包</i>
            </div>
            <!-- 试听视频按钮 -->
            <img @click="auditionClick" v-if="classType == '1' && videoId != '1' && !isshowActive" class="auditionBtn" src="./courseImg/audition.png" alt="">
            <img @click="auditionClick" v-if="classType == '1' && videoId != '1' && isshowActive" class="auditionBtn1" src="./courseImg/audition.png" alt="">
            <p v-show="!isshowActive">￥{{detail.type_product_highPrice + '.00'}}</p>
          </div>
        </div>
      <div v-show="activity.activitystatus" class="activityBox">
        <span class="activitylabel"><i>满减</i></span>
        <span v-show="activity.activityType == '1'" class="activityText">满 <i v-text="activity.lowestMoney"></i> 立减 <i v-text="activity.discountMoney"></i> 元</span>
        <span v-show="activity.activityType == '2'" class="activityText">满 <i v-text="activity.lowestMoney"></i> 打 <i v-text="activity.discount"></i> 折</span>
        <span class="activityTime"><img src="./courseImg/jishi.png" alt="">{{this.dataTime(activity.endTime,0)}}</span>
      </div>

      <!--<div class="activityBox">-->
        <!--<span class="activitylabel"><i>满减</i></span>-->
        <!--&lt;!&ndash;<span class="activityText">满1000立减100元</span>&ndash;&gt;-->
        <!--<span class="activityText">满1000打8折</span>-->
        <!--<span class="activityTime"><img src="./courseImg/jishi.png" alt="">2018-12-31</span>-->
      <!--</div>-->

        <ul v-show="detail.type_product_classType == '2'" class="courseInfo">
          <li><img src="./courseImg/icon_class.png" alt=""><span>课时<i>{{detail.type_product_classhour}}</i></span></li>
          <li v-if="detail.type_product_stock<500" class="stock"><span>限报人数<i>{{detail.type_product_stock}}</i></span><img src="./courseImg/icon_inventory.png" alt=""></li>
          <li class="period"><span>课程开始时间<i>{{this.dataTime(detail.type_product_delAt,0)}}</i></span><img src="./courseImg/icon_time.png" alt=""></li>
        </ul>
        <ul v-show="detail.type_product_classType == '1'" class="courseInfo">
          <li><img src="./courseImg/icon_class.png" alt=""><span>课时<i>{{detail.type_product_classhour}}</i></span></li>
          <li v-if="detail.type_product_stock<500" class="stock"><span>库存<i>{{detail.type_product_stock}}</i></span><img src="./courseImg/icon_inventory.png" alt=""> </li>
          <li class="period"><span>有效期 <i>{{this.dataTime(detail.type_product_delAt,0)}}</i></span><img src="./courseImg/icon_time.png" alt=""></li>
        </ul>
        <!-- 优惠活动 -->
        <!--<ul class="preferentialBox">-->
            <!--<li v-for="(item,index) in activeBox" :key="index">-->
                <!--<div><span class="preferentialIcon"></span>满<i> {{item.classnumber}} </i>门，立减<i> {{item.classmoney}} </i>元。<span><img src="./courseImg/icon_time.png" alt="">{{item.endtime.split(' ')[0]}}</span></div>-->
            <!--</li>-->
        <!--</ul>-->

        <!-- 选择科目 -->
        <ul class="chooseSubject" v-show="associated.length > 1">
            <li @click="jumpCourseDetail(item.associatedId)" v-show="index<3" :class="index == 0 ? 'action' : ''" v-for="(item,index) in associated" :key="index">{{item.associatedTitle}}</li>
            <span @click="chooseSubjectShow = true" v-show='associated.length > 3'><img src="./courseImg/arrow_right.png" alt=""></span>
        </ul>
        <chooseSubject @chooseSubjectShow='subjectShow' v-show="chooseSubjectShow" :associated='associated' :backgroundImg='detail.type_product_mainPicture' />
        <!-- 赠课 -->
        <div v-show="freeCourse" class="sendClass"><img src="./courseImg/send_class.png" alt="">赠课·{{freeCourse}}</div>
        <!-- 赠券 -->
        <div v-show="freeCoupon" class="sendClass"><img src="./courseImg/coupons.png" alt="">赠券·{{freeCoupon}}</div>
    </div>
</template>

<script>
import chooseSubject from './chooseSubject'
import courseKill from './courseKill'
import courseActive from './courseActive'
export default {
  data() {
    return {
      detail: "",
      chooseSubjectSel:'',
      chooseSubjectShow: false,
      activityStatus: false,
      activity: '',
      freeCourse: '',
      freeCoupon: '',
      // 秒杀活动
      isKillShow:false,
      isshowActive:false,
      lowPrice:"",
      Price:"",
      floatPrice:""
    };
  },
  components:{
    chooseSubject,
    courseKill,
    courseActive
  },
  props: ["courseDetailData","associated","preferential","activeBox","lessonCouponArr","classType","videoId","servicesShow","servicesBox"],
  watch: {
    courseDetailData() {
      this.show();
    },
    servicesShow(){
      this.serverShow()
    }
  },
  methods: {
    show() {
      if(this.lessonCouponArr.length > 0){
          this.freeCourse = this.lessonCouponArr[0]._source.type_share_infoOfCourse;
          this.freeCoupon = this.lessonCouponArr[0]._source.type_share_infoOfTicket;
      }
      this.detail = this.courseDetailData._source;
      if(this.servicesBox.length>0){
        this.lowPrice = this.detail.type_product_lowPrice+this.servicesBox[0]._source.type_coursematch_lowPrice;
      }else{
        this.lowPrice = this.detail.type_product_lowPrice
      }
      this.Price = Math.floor(this.lowPrice);
      if(this.Price==this.lowPrice){
        this.floatPrice=".00"
      }else {
        this.floatPrice="."+this.lowPrice.toString().split('.')[1];
      }

      if(this.associated.length==0){
        this.associated.unshift({
          associatedId: this.$route.query.id,
          associatedTitle: this.detail.type_product_title,
          salesVolume: this.detail.type_product_salesVolume
        })
      }else{
        this.associated.unshift({
          associatedId: this.$route.query.id,
          associatedTitle: this.associated[0].associatedActTitle,
          salesVolume: this.detail.type_product_salesVolume
        })
      }
    },
    serverShow(){
      // console.log(this.servicesBox);
      if(this.servicesShow){
        this.lowPrice = this.detail.type_product_lowPrice+this.servicesBox[0]._source.type_coursematch_lowPrice;
      }else{
        this.lowPrice = this.detail.type_product_lowPrice
      }
      this.Price = Math.floor(this.lowPrice);
      if(this.Price==this.lowPrice){
        this.floatPrice=".00"
      }else {
        this.floatPrice="."+this.lowPrice.toString().split('.')[1];
      }
    },
    // 秒杀活动
    isactiveShow(isshow,isshowAct){
      this.isKillShow=isshow;
      this.isshowActive=isshowAct;
      this.toCourseConter();
    },
    //时间转换
    dataTime(time,type) {
      var date = new Date(Number(time));
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var houer = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var dataTime = `${year}-${month}-${day} ${houer}:${minutes}:${seconds}`;
      var dataTime1 = `${year}-${month}-${day}`;
      if(type==0){
          return dataTime1;
      }
      return dataTime;
    },
    subjectShow(status){
        this.chooseSubjectShow = status
    },
    jumpCourseDetail(id) {
      this.$router.push({
        path: "/course/courseconter",
        query: { id: id }
      });
    },
    // 试听视频跳转
    auditionClick(){
        this.$router.push({
            path:'coursevideo',
            query:{id:this.$route.query.id}
        })
    },
    //课程活动
    activityData() {
      this.nowTimea = Date.parse(new Date());
      this.axios
        .post("/es/index_activtiy/type_activtiy/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    type_activtiy_courseId:
                      this.$route.query.id instanceof Array
                        ? this.$route.query.id[0]
                        : this.$route.query.id
                  }
                },
                {
                  term: {
                    type_activtiy_status: "1"
                  }
                },
                { range: { type_activtiy_startTime: { lte: this.nowTimea } } }
              ]
            }
          },
          from: 0,
          size: 1
        })
        .then(response => {
          let nowTime = Date.parse(new Date()); //当前时间戳
          if (
            response.data.hits.hits.length == "0" ||
            nowTime > response.data.hits.hits[0]._source.type_activtiy_endTime
          ) {
            this.activityStatus = false;
          } else {
            this.activityStatus = true;
            let classOfferAll = response.data.hits.hits[0]._source;
            this.activity = {
              activitystatus: this.activityStatus,
              endTime: classOfferAll.type_activtiy_endTime,
              discount: classOfferAll.type_activtiy_discount,
              discountMoney: classOfferAll.type_activtiy_discountMoney,
              lowestMoney: classOfferAll.type_activtiy_lowestMoney,
              activityType: classOfferAll.type_activtiy_activtiyType   // 1'满减'  2'折扣'
            }
          }      
        })
        .catch(err => {
          console.log(err);
        });
    },
    toCourseConter(){
      this.$emit("isshowActive",this.isshowActive);
    }
  },
  mounted() {
      this.activityData();
  }
};
</script>

<style scoped>
.courseBg {
    background: white;
}
.courseImg {
  width: 100%;
  height: 4.54rem;
  overflow: hidden;
  position: relative;
}
.courseImg img {
  width: 100%;
  height: 100%;
}
.studyPeapleNum {
  line-height: 0.52rem;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
}
.studyPeapleNum img {
  float: left;
  width: 0.22rem;
  height: 0.24rem;
  margin: 0.14rem .1rem 0 .2rem;
}
.studyPeapleNum span {
  color: white;
  font-size: 0.22rem;
}
.courseTxt{
    padding: 0 0.2rem;
}
.courseTitle {
  font-size: 0.4rem;
  color: #4a4a4a;
  padding: 0.2rem 0;
}
.courseTitle img{
    float: left;
    width: 0.84rem;
    height: 0.32rem;
    margin-top: 0.12rem;
    margin-right: 0.1rem;
}
.coursePrince{
  position: relative;
}
.courseTitle h3{
    display: inline-block;
    line-height: 0.56rem;
    font-weight: 600;
    color:#4a4a4a;
    font-size: .35rem;
}
.coursePrince h3{
    font-size: 0.24rem;
    color: #FF5B09;
    display: inline-block;
    line-height: 0.5rem;
    margin-right: 0.2rem;
}
.coursePrince h3 span{
    font-size: 0.4rem;
    color: #FF5B09
}
.coursePrince i{
    font-size: 0.2rem;
    color: #CACACA;
}
.auditionBtn{
    width: 1.88rem;
    height: 0.52rem;
    /*float: right;*/
  position: absolute;
  right:.1rem;
  top:.3rem;
}
.auditionBtn1{
  width: 1.88rem;
  height: 0.52rem;
  margin-top:.2rem;
}
.coursePrince p{
    line-height: 0.34rem;
    font-size: 0.24rem;
    font-weight: 500;
    text-decoration: line-through;
    color: #CACACA;
}
.courseInfo{
    display: flex;
    padding: 0 0.2rem;
    width: 100%;
    border-bottom: 0.01rem solid #E7E7E7;
}
.courseInfo li{
    flex: 1 0 auto;
    font-weight:500;
    float:right;
    line-height: 0.88rem;
}
.courseInfo li.stock{
  padding-right:.35rem;
}
.courseInfo li:first-child span{
  float:left;
  padding: 0 .06rem;
}
.courseInfo li span{
  padding-left: .06rem;
}
/*.courseInfo li.stock span,.courseInfo li.period span{*/
  /*padding-left:.1rem;*/
/*}*/
.courseInfo li span i{
  padding-left:.06rem;
}
.courseInfo li span,.courseInfo li span i{
  float: right;
  color: #9B9B9B;
  font-size:0.22rem;
}
.courseInfo li img{
  display: inline-block;
  margin-right: 0.05rem;
  margin-top: 0.33rem;
}
.courseInfo li:first-of-type img{
  width: 0.28rem;
  height: 0.2rem;
  float:left;
}
.courseInfo li.stock span,.courseInfo li.stock span i{
    color: #D70000;
    font-weight: 600;
}
.courseInfo li.stock img,.courseInfo li.period img{
    height: 0.22rem;
    width: 0.22rem;
    float: right;
}
.chooseSubject{
    display: flex;
    /*justify-content: space-around;*/
    height: 0.9rem;
    overflow: hidden;
    margin: 0 0.2rem;
    align-items:center;
    position: relative;
    border-bottom: 0.01rem solid #e7e7e7;
}
.chooseSubject li{
    width: 29%;
    margin-right: 3.5%;
    border: 0.01rem solid #e7e7e7;
    height: 0.46rem;
    line-height: 0.46rem;
    border-radius: 0.23rem;
    text-align: center;
    color: #696969;
    font-size: 0.24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 0 0.2rem;
}
.chooseSubject .action{
    border-color: #3EEFCB;
    color: #3EEFCB;
    background: #edfffb;
}
.chooseSubject span{
    position: absolute;
    right: 0;
    top: 0.3rem;
    display: inline-block;
    width: 0.4rem;
    height: 0.9rem;
}
.chooseSubject span img{
    display: inline-block;
    float:right;
    width: 0.18rem;
    height: 0.31rem;
}
.sendClass{
    height: 0.9rem;
    line-height: 0.9rem;
    color: #696969;
    font-size: 0.26rem;
    margin: 0 0.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 0.01rem solid #e7e7e7;
}
.sendClass img{
    float: left;
    width: 0.3rem;
    height: 0.3rem;
    margin-top: 0.3rem;
    margin-right: 0.25rem;
    border-bottom: 0.01rem solid #e7e7e7;
}
.activityBox{
    height: 0.6rem;
    /*margin: 0 0.2rem;*/
    padding: 0 .2rem;
    margin-top:.2rem;
    background-color: #e7fffa;
    /*border-bottom: 0.01rem solid #e7e7e7;*/
}
.activityBox .activitylabel{
    float: left;
    width: 0.62rem;
    height: 0.3rem;
    background: #fc531b;
    border-radius: 0.07rem;
    text-align: center;
    line-height: 0.3rem;
    margin-top: 0.14rem;
}
.activityBox .activitylabel i{
    color:#fff;
  text-align: center;
  letter-spacing: .01rem;
    display: inline-block;
    font-size: .1rem;
  line-height: .13rem;
  -webkit-transform:scale(.8);
  -moz-transform:scale(.8);
  -o-transform:scale(.8);
  -ms-transform:scale(.8);
    transform:scale(.8);
}
.activityBox .activityText{
    color: #FF5B09;
    font-size: 0.24rem;
    font-weight: 600;
    float:left;
    letter-spacing: .01rem;
    margin-left: 0.2rem;
    line-height: 0.6rem;
}
.activityBox .activityText i{
    color: #FF5B09;
}
.activityBox .activityTime{
  float:right;
  margin-top:.04rem;
  color:#9b9b9b;
  font-size: .22rem;
}
.activityBox .activityTime img{
    height: 0.22rem;
    width: 0.22rem;
    margin-top: 0.15rem;
    margin-right: 0.1rem;
}
.preferentialBox{
    padding: 0 0.2rem;
}
.preferentialBox li{
    line-height: 0.6rem;
    border-bottom: 0.01rem solid #e7e7e7;
}
.preferentialBox li div{
    color: #696969;
}
.preferentialBox li div i{
    color: #FC531B;
    font-weight: 600;
}
.preferentialBox li img {
    display: inline-block;
    height: 0.22rem;
    width: 0.22rem;
    /* float: left; */
    margin: 0.15rem 0.1rem 0 0.3rem;
}
.preferentialBox .preferentialIcon{
    width: 0.1rem;
    height: 0.1rem;
    line-height: 0.1rem;
    background: #FC531B;
    border-radius: 50%;
    float: left;
    margin: 0.25rem 0.15rem 0 0;
}
</style>
