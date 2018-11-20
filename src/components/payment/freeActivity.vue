<template>
  <div>
    <div class="courseWrap"></div>
    <div class="courseCon"></div>
    <div class="giveCourse">
      <div class="giveDesc">
        <img src="./paymentImg/gift.png" alt="">
        <span>随课赠送</span>
      </div>
      <div class="givecourseDesc">
        赠课内容已下发放至账户，请查收。
      </div>
      <div class="courseContent">
        <div v-for="(item,index) in activityArr.courseList" :key="index" class="payCourseList">
          <img :src="item.mainPicture">
          <p v-text="item.title"></p>
        </div>
      </div>
      <div class="couponsContent">
        <div v-for="(item,index) in activityArr.ticketList" :key="index" class="couponsList">
          <div v-if="item.couponType == '1'" class="order-tab-list-tp"><i>{{item.discount}}</i><span>折扣券</span></div>
          <div v-if="item.couponType == '2'" class="order-tab-list-tp"><b>￥</b><i>{{preferentialMoney}}</i><span>代金券</span></div>
          <ul>
            <li>编号： {{item.cardNumber}}</li>
            <li>有效期： {{dataTime(item.startTime)}}至{{dataTime(item.endTime)}}</li>
            <li v-if="item.couponType == '1'">使用范围：满{{item.satisfyMoney}}元，打{{item.discount}}折</li>
            <li v-if="item.couponType == '2'">使用范围：满{{item.satisfyMoney}}元，减{{item.preferentialMoney}}元</li>
            <li>适用课程：无期限</li>
          </ul>
        </div>
      </div>
      <div @click="closeBtn" class="courseBtn">
        我知道了
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "giveCourse",
  data() {
    return {};
  },
  props: ["activityArr"],
  watch: {
    activityArr() {
      this.show();
    }
  },
  methods: {
    show() {
      console.log(this.activityArr);
    },
    //时间转换
    dataTime(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return `${year}-${month}-${day}`
    },
    // 关闭弹框
    closeBtn(){
      this.$emit('closeBtn', false)
    }
  }
};
</script>

<style scoped>
.courseWrap {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 20%;
  width: 100%;
  background: linear-gradient(#40c3a8, #ececed);
  background-size: 100% 100%;
}
.courseCon {
  position: absolute;
  top: 20%;
  bottom: 0;
  right: 0;
  left: 0;
  height: 80%;
  width: 100%;
  background-color: #ececed;
}
.giveCourse {
  background-color: #fafbfc;
  width: 89.33%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.1rem;
  box-shadow: #e1efef 0px 0px 10px 10px;
}
.giveDesc {
  margin: 0.4rem auto;
  width: 2.3rem;
  display: flex;
  justify-content: space-around;
  align-content: space-around;
}
.giveDesc img {
  height: 0.55rem;
}
.giveDesc span {
  line-height: 0.55rem;
  font-size: 0.32rem;
  color: #4a4a4a;
}
.givecourseDesc {
  color: #3accae;
  text-align: center;
  font-size: 0.28rem;
  letter-spacing: 0.02rem;
  margin-bottom: 0.3rem;
}
.courseContent {
  width: 92%;
  margin: 0 auto 0.2rem;
  background-color: #fff;
}
.payCourseList {
  width: 92%;
  padding: 0.2rem 0;
  margin: 0 auto;
  overflow: hidden;
  border-bottom: 0.01rem solid #e7e7e7;
}
.payCourseList:last-child {
  border-radius: 0.2rem;
  border-bottom: none;
}
.payCourseList img {
  width: 2.38rem;
  height: 1.78rem;
  float: left;
  margin-right: 0.16rem;
  border-radius: 0.1rem;
}
.payCourseList p {
  color: #4a4a4a;
  font-size: 0.26rem;
  font-weight: 500;
  line-height: 0.36rem;
  letter-spacing: 0.02rem;
}
.couponsContent {
  background-color: #fff;
  width: 92%;
  margin: 0 auto;
  border-radius: 0.1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: space-around;
}
.couponsList {
  background-color: #d72e7c;
  margin: 0.2rem auto;
  width: 92%;
  border-radius: 0.1rem;
  border-bottom: 0.01rem solid #e7e7e7;
}
.order-tab-list-tp {
  height: 1.03rem;
  margin: 0 0 0 0.26rem;
  color: #fff;
  overflow: hidden;
  padding-top: 0.2rem;
}
.order-tab-list-tp b {
  font-weight: normal;
  color: #fff;
  font-size: 0.3rem;
  padding-right: 0.1rem;
}
.order-tab-list-tp i {
  font-weight: normal;
  color: #fff;
  font-size: 0.7rem;
  padding-right: 0.3rem;
}
.order-tab-list-tp span {
  font-size: 0.35rem;
  color: #fff;
}
.order-tab-list-tp button {
  border: 1px solid #fff;
  width: 1.3rem;
  height: 0.45rem;
  border-radius: 4px;
  color: #fff;
  margin-left: 0.4rem;
  background: none;
}
.couponsList ul {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
.couponsList li {
  color: #fff;
  padding-left: 0.26rem;
  line-height: 0.37rem;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.courseBtn {
  border-bottom-left-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #fff;
  margin-top: 0.6rem;
  font-size: 0.29rem;
  text-align: center;
  background-color: #3acbae;
}
</style>
