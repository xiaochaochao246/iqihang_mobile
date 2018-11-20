<template>
    <div class="pay-succ">
        <public-header :htitle="'购买成功'" @childReturn="allControl"></public-header>
        <div class="paysucc_info">
          <div class="paysucc-con">购买成功</div>
        </div>
        <div v-show="withBook==0" @click="lookCourse" class="lockMyCourse"><span>查看我的课程</span></div>
        <div v-show="withBook==1" class="choose_address">
          <div class="ch_addressInfo">
            <div class="paysucc_address">
              <img src="./paymentImg/hours.png" alt="">
              <span>请选择配套资料的收货地址</span>
            </div>
            <div class="pay-desc">
              本课程包含纸质讲义或图书的订单需要选择收货地址，请您在此添加后进行选择，如若不选，将无法给您发货！
            </div>
          </div>
          <addressList :userAddList='userAddList' :userId='userId' />
          <div @click="addAddress" class="add-address">添加地址</div>
        </div>
      <freeActivity @closeBtn='closeBtn' v-show="activityShow" :activityArr='activityArr' />
    </div>
</template>

<script>
import addressList from "./addressList";
import freeActivity from "./freeActivity";
import { Toast } from "mint-ui";
import PublicHeader from "@/components/public/header";
export default {
  data() {
    return {
      withBook: "",
      orderId: "",
      courseId: "",
      userId: "",
      userAddList: [],
      activityShow: false,
      activityArr: ''
    };
  },
  components: {
    addressList,
    PublicHeader,
    freeActivity
  },
  methods: {
    allControl() {
      this.$router.go(-1);
    },
    // 获取url数据
    getUrlData() {
      let _urlOptions = this.$route.query;
      this.courseId = _urlOptions.id;
      this.orderId = _urlOptions.order;
      this.withBook = _urlOptions.withBook;
    },
    // 获取个人信息
    getUserInfo() {
      this.axios
        .get("/api/party/user/v2/user/session")
        .then(res => {
          if (res.data.status == "0") {
            this.userId = res.data.data.userId;
            this.getAddressData(res.data.data.userId);
          }
        })
        .catch(err => {
          Toast({
            message: "网络获取信息失败",
            position: "middle",
            duration: 2000
          });
        });
    },
    // 获取个人收货地址
    getAddressData(userId) {
      this.axios
        .post("/api/party/sysAddress/v1/employee/queryAll", {
          userId: userId
        })
        .then(res => {
          if (res.data.status == "0") {
            this.userAddList = res.data.data;
          }
        })
        .catch(err => {
          Toast({
            message: "网络获取信息失败",
            position: "middle",
            duration: 2000
          });
        });
    },
    // 新增收货地址
    addAddress() {
      this.$router.push({
        path: "/vip/address",
        query: {}
      });
    },
    // 获取活动信息
    getActivityData() {
      this.axios
        .get(
          `/api/promotion/voucherActivtiy/v1/voucherActivtiy/getSendInfo?orderCode=${
            this.$route.query.order
          }`
        )
        .then(res => {
          if(res.data.status == '888'){
            Toast({
              message: "请登录",
              position: "middle",
              duration: 2000
            });
            setTimeout(()=>{
              this.$router.push({
                path: '/login',
                query: {}
              })
            },2000)
          }
          if (res.status == 200 && res.data.status == "0") {
            this.activityShow = true;
            this.activityArr = res.data.data
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看我的课程
    lookCourse() {
      let courseId = this.$route.query.id.split(",");
      this.$router.push({
        path: "/course/courseconter",
        query: { order: this.$route.query.order, id: courseId[0] }
      });
    },
    // 关闭赠课赠券弹出框
    closeBtn(data){
      this.activityShow = data
    }
  },
  created() {
    this.getUrlData();
  },
  mounted() {
    this.withBook == "1" && this.getUserInfo();
    this.getActivityData();
  }
};
</script>

<style scoped>
.pay-succ {
  background: #f4f4f4;
}
.paysucc_info {
  width: 100%;
  position: relative;
  background: white;
  overflow: hidden;
  padding: 2rem 0 1rem 0;
}
.paysucc_info .paysucc-con {
  background-image: url("./paymentImg/pay-succ.png");
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 0.75rem 0.75rem;
  line-height: 0.78rem;
  font-size: 0.32rem;
  font-weight: 600;
  color: #4a4a4a;
  width: 2.3rem;
  margin: 0 auto;
  text-align: right;
}
.lockMyCourse {
  background: white;
  padding: 0rem 0 0.8rem 0;
  text-align: center;
}
.lockMyCourse span {
  width: 4.6rem;
  line-height: 0.88rem;
  background: #3accae;
  color: white;
  display: inline-block;
  border-radius: 0.2rem;
  font-size: 0.28rem;
}
.choose_address {
  background: #fff;
}
.paysucc_address {
  width: 5.1rem;
  padding: 0.2rem 0;
  margin: 0.2rem auto;
  display: flex;
  justify-content: space-around;
  align-content: space-around;
}
.paysucc_address img {
  width: 0.6rem;
  height: 0.65rem;
}
.paysucc_address span {
  line-height: 0.65rem;
  font-size: 0.33rem;
  font-weight: 500;
  color: #4a4a4a;
}
.pay-desc {
  color: #f00;
  padding: 0 0.2rem;
  font-weight: 500;
  font-size: 0.27rem;
  line-height: 0.35rem;
}
.pay-paument-list-pad {
  height: 0.2rem;
  background: #f4f4f4;
  width: 100%;
}
.add-address {
  margin: 0.75rem auto;
  width: 4.5rem;
  height: 0.74rem;
  line-height: 0.74rem;
  text-align: center;
  border-radius: 12px;
  color: #fff;
  background-color: #3accae;
}
</style>
