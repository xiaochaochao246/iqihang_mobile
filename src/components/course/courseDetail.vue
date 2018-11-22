<template>
    <div class="courseBg">
        <div class="courseImg">
            <img :src="detail.type_product_mainPicture" alt="">
            <div class="studyPeapleNum" v-show="!isKillShow"><span><img src="./courseImg/icon_person.png">已有{{detail.type_product_salesVolume}}人学习</span></div>
        </div>
      <!--秒杀倒计时-->
      <courseKill @isactiveShow="isactiveShow" v-show="isKillShow" :associated='associated'/>

        <div class="courseTxt">
          <div class="courseTitle"><img v-show="detail.type_product_classType == '2'" src="./courseImg/line_course.png" alt=""><h3 v-html="detail.type_product_title"></h3></div>
          <!--秒杀活动-->
          <courseActive v-show="isshowActive" :associated="associated"/>

          <div class="coursePrince">
            <div v-show="!isshowActive">
              <h3>￥<span>{{detail.type_product_lowPrice}}</span>.00</h3><i>此价格中包含服务包</i>
            </div>
            <!-- 试听视频按钮 -->
            <img @click="auditionClick" v-if="classType == '1' && videoId != '1'" class="auditionBtn" src="./courseImg/audition.png" alt="">
            <p v-show="!isshowActive">￥{{detail.type_product_highPrice + '.00'}}</p>
          </div>
        </div>
        <ul v-show="detail.type_product_classType == '2'" class="courseInfo">
            <li><img src="./courseImg/icon_class.png" alt="">课时 {{detail.type_product_classhour}}</li>
            <li><img src="./courseImg/icon_inventory.png" alt="">限报人数 {{detail.type_product_stock}}</li>
            <li><img src="./courseImg/icon_time.png" alt="">课程开始时间 {{this.dataTime(detail.type_product_delAt,0)}}</li>
        </ul>
        <ul v-show="detail.type_product_classType == '1'" class="courseInfo">
            <li><img src="./courseImg/icon_class.png" alt="">课时 {{detail.type_product_classhour}}</li>
            <li><img src="./courseImg/icon_inventory.png" alt="">库存 {{detail.type_product_stock}}</li>
            <li><img src="./courseImg/icon_time.png" alt="">有效期 {{this.dataTime(detail.type_product_delAt,0)}}</li>
        </ul>
        <!-- 优惠活动 -->
        <div v-show="activity.activitystatus" class="activityBox">
            <span class="activitylabel">满减</span>
            <span v-show="activity.activityType == '1'" class="activityText">满 <i v-text="activity.lowestMoney"></i> 立减 <i v-text="activity.discountMoney"></i> 元。</span>
            <span v-show="activity.activityType == '2'" class="activityText">满 <i v-text="activity.lowestMoney"></i> 打 <i v-text="activity.discount"></i> 折。</span>
            <span class="activityTime"><img src="./courseImg/icon_time.png" alt="">{{this.dataTime(activity.endTime,0)}}</span>
        </div>
        <ul class="preferentialBox">
            <li v-for="(item,index) in activeBox" :key="index">
                <div><span class="preferentialIcon"></span>满<i> {{item.classnumber}} </i>门，立减<i> {{item.classmoney}} </i>元。<span><img src="./courseImg/icon_time.png" alt="">{{item.endtime.split(' ')[0]}}</span></div>
            </li>
        </ul>
        <!-- 选择科目 -->
        <ul class="chooseSubject" v-show="associated.length > 1">
            <li @click="jumpCourseDetail(item.associatedId)" v-show="index<3" :class="index == 0 ? 'action' : ''" v-for="(item,index) in associated" :key="index">{{item.associatedTitle}}</li>
            <span @click="chooseSubjectShow = true" v-show='associated.length > 3'><img src="./courseImg/arrow_right.png" alt=""></span>
        </ul>
        <chooseSubject @chooseSubjectShow='subjectShow' v-show="chooseSubjectShow" :associated='associated' :backgroundImg='detail.type_product_mainPicture' />
        <!-- 赠课 -->
        <div v-show="freeCourse" class="sendClass"><img src="./courseImg/send_class.png" alt="">赠课·{{freeCourse}}</div>
        <!-- 赠券 -->
        <div v-show="freeCoupon" class="sendClass"><img src="./courseImg/send_class.png" alt="">赠券·{{freeCoupon}}</div>
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
    };
  },
  components:{
    chooseSubject,
    courseKill,
    courseActive
  },
  props: ["courseDetailData","associated","preferential","activeBox","lessonCouponArr","classType","videoId"],
  watch: {
    courseDetailData() {
      this.show();
    }
  },
  methods: {
    show() {
      if(this.lessonCouponArr.length > 0){
          this.freeCourse = this.lessonCouponArr[0]._source.type_share_infoOfCourse
          this.freeCoupon = this.lessonCouponArr[0]._source.type_share_infoOfTicket
      }
      this.detail = this.courseDetailData._source;
      this.associated.unshift({
          associatedId: this.$route.query.id,
          associatedTitle: this.detail.type_product_title,
          salesVolume: this.detail.type_product_salesVolume
      })
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
  margin-top: 0.14rem;
  margin-left: 0.2rem;
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
.courseTitle h3{
    display: inline-block;
    line-height: 0.56rem;
    font-weight: 600;
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
    float: right;
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
    margin: 0 0.2rem;
    border-bottom: 0.01rem solid #E7E7E7;
}
.courseInfo li{
    flex: 1 0 auto;
    font-weight:500;
    font-size:0.22rem;
    color: #9B9B9B;
    font-weight: 500;
    line-height: 0.88rem;
}
.courseInfo li img{
    display: inline-block;
    margin-right: 0.05rem;
}
.courseInfo li:first-of-type img{
    width: 0.28rem;
    height: 0.2rem;
}
.courseInfo li:nth-of-type(2){
    color: #D70000;
}
.courseInfo li:nth-of-type(2) img,.courseInfo li:last-of-type img{
    height: 0.22rem;
    width: 0.22rem;
    float: left;
    margin-top: 0.33rem;
}
.chooseSubject{
    display: flex;
    height: 0.9rem;
    overflow: hidden;
    margin: 0 0.2rem;
    align-items:center;
    position: relative;
    border-bottom: 0.01rem solid #e7e7e7;
}
.chooseSubject li{
    width: 28%;
    margin-right: 3%;
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
}
.chooseSubject .action{
    border-color: #3EEFCB;
    color: #3EEFCB;
    background: #edfffb;
}
.chooseSubject span{
    position: absolute;
    right: 0.2rem;
    top: 0.3rem;
    display: inline-block;
    width: 0.4rem;
    height: 0.9rem;
}
.chooseSubject span img{
    display: inline-block;
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
    margin-right: 0.1rem;
    border-bottom: 0.01rem solid #e7e7e7;
}
.activityBox{
    height: 0.6rem;
    margin: 0 0.2rem;
    border-bottom: 0.01rem solid #e7e7e7;
}
.activityBox .activitylabel{
    float: left;
    width: 0.62rem;
    height: 0.3rem;
    background: #FF5B09;
    border-radius: 0.05rem;
    font-size: 0.12rem;
    color: white;
    text-align: center;
    line-height: 0.3rem;
    margin-top: 0.15rem;
}
.activityBox .activityText{
    color: #FF5B09;
    font-size: 0.24rem;
    font-weight: 600;
    margin-left: 0.2rem;
    line-height: 0.6rem;
}
.activityBox .activityText i{
    color: #FF5B09;
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
