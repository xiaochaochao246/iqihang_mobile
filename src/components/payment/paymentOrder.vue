<template>
  <!--提交订单成功页面-->
  <div class="backgroud">
    <public-header :htitle="'支付订单'" @childReturn="control"></public-header>
    <div class="padding-top-70">
      <div class="content">
        <img src="./paymentImg/pay-submit.png" alt="">
        <div class="content_con">
          <h3>订单提交成功!</h3>
          <div class="order_num">
            <span>订单号：</span>
            <span>{{orderId}}</span>
          </div>
          <div class="order_info">
            <span>订单总额：</span>
            <span>￥{{totalPrice}}</span>
          </div>
          <div class="order_info">
            <span>账户余额：</span>
            <span>￥{{balance}}</span>
          </div>
          <div class="order_info">
            <span>还需支付：</span>
            <span>￥{{actualPrice}}</span>
          </div>
          <div @click="subPayTrue" class="order_btn">确认支付</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublicHeader from "@/components/public/header";
import { Toast, Indicator } from "mint-ui";
export default {
  name: "pay-order",
  components:{
    PublicHeader
  },
  data(){
    return {
      orderId:'',
      courseId: '',
      type: '',
      balance: 0,
      totalPrice: 0,
      actualPrice: 0,
      backUrl: '',
      withBook: 0  // 是否发书  0 不发书  1  发书
    }
  },
  methods: {
    control() {
      this.$router.go(-1);
    },
    // 获取url字段
    getUrlData(){
      this.orderId = this.$route.query.orderId;
      this.courseId = this.$route.query.courseId;
      this.type = this.$route.query.type;
    },
    // 获取登录信息
    getUserInfo(){
      this.axios.get('/api/party/user/v2/user/session')
      .then( res => {
        console.log(res)
        if(res.status == '200' && res.data.status == '888'){
          Toast({
            message: "请登录!",
            position: "middle",
            duration: 2000
          })
          setTimeout(()=>{
            this.$router.push({
              path: "/login",
            },2000)
          })
        }else if(res.status == 200 && res.data.status == '0'){
          this.balance = res.data.data.money;
          this.getOrderData(false)
        }
      })
    },
    // 获取订单信息
    getOrderData(statu){
      let _courseId = this.courseId
      this.axios.get(`/es/order/f/${this.$route.query.orderId}`)
      .then( res => {
        Indicator.close()
        console.log(res)
        if(statu){
          if(res.data._source.f_status == '3'){  // 支付成功
            this.withBook = res.data._source.f_isWithbook
            Toast({
              message: "支付成功",
              position: "middle",
              duration: 2000
            })
            setTimeout(()=>{
              this.$router.push({
                path: "/payment/paymenttrue",
                query: { order: code, id: _courseId, withBook:res.data._source.f_isWithbook }
              });
            },2000)
            return
          }else{
            Toast({
              message: "支付失败,请重新支付",
              position: "middle",
              duration: 2000
            })
            return
          }
        }else{
          if(res.data._source.f_status == '0'){
            this.totalPrice = (res.data._source.f_promotionPrice).toFixed(2)
            if(this.balance > this.totalPrice){
              this.actualPrice = 0.00
            }else{
              this.actualPrice = (this.totalPrice - this.balance).toFixed(2)
            }         
          }
        }
      })
      .catch( err => {
        console.log(err)
      })
    },
    // 确认支付
    subPayTrue(){
      Indicator.open({
        text: '支付中...',
        spinnerType: 'fading-circle'
      });
      let tmpurl = `http://p.iqihang.com/payment%2Fpaymentorder%3Ftype%3D${this.type}%26orderId%3D${this.orderId}%26courseId%3D${this.courseId}%26payStatus%3Dtrue`;
      this.backUrl = tmpurl;
      this.pay(this.type,this.orderId,tmpurl)
    },
    pay(zflx, code, hdurl) {
      let _courseId = this.courseId,
          _that = this;
      //立即支付
      if (zflx == "1") {
        //支付宝支付
        this.axios
          .get(
            `/api/trade/pay/v1/payRequest/2/h5/${code}?returnUrl=${hdurl}`,
            {}
          )
          .then(response => {
            if (response.data.status == "0") {
              //支付宝支付
              document.writeln(response.data.msg);
            } else if (response.data.status == "8") {
              Indicator.close()
              //余额支付
              this.$router.push({
                path: "/payment/paymentsuccess",
                query: { order: code, id: _courseId, withBook:_that.withBook }
              });
            }
            this.Orderflag = true;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (zflx == "2") {
        //微信支付
        let _courseId = this.courseId;
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          this.axios
            .get(`/api/trade/pay/v1/payRequest/1/JSAPI/${code}?code=`, {
              //+code
            })
            .then(response => {
              if (response.data.status == "888") {
                this.$router.push({ path: "/login" });
              } else if (response.data.status == "8") {
                Indicator.close()
                //余额支付
                this.$router.push({
                  path: "/payment/paymentsuccess",
                  query: { order: this.orderCode, id: _courseId, withBook:_that.withBook }
                });
              } else {
                this.wxpayparams = response;
                this.wxpay();
              }
            });
          this.Orderflag = true;
        } else {
          this.axios
            .get(`/api/trade/pay/v1/payRequest/1/h5/${code}`, {})
            .then(response => {
              if (response.data.status == "888") {
                this.$router.push({ path: "/login" });
              } else if (response.data.status == "8") {
                Indicator.close()
                //余额支付成功
                this.$router.push({
                  path: "/payment/paymentsuccess",
                  query: { order: code, id: _courseId,withBook:_that.withBook }
                });
              } else {
                //调用三方支付
                this.mwebUrl = response.data.data.mweb_url;
                window.location.href =
                  response.data.data.mweb_url + `&redirect_url=${hdurl}`;
              }
              this.Orderflag = true;
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        alert(response.data.msg);
      }
    },
    wxpay() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.jsApiCall(),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.jsApiCall());
          document.attachEvent("onWeixinJSBridgeReady", this.jsApiCall());
        }
      } else {
        this.jsApiCall();
      }
    },
    jsApiCall() {
      let response = this.wxpayparams;
      let orderCode = this.orderCode;
      let _router = this.$router;
      let _courseId = this.courseId;
      let that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: response.data.data.appId,
          timeStamp: response.data.data.timeStamp,
          nonceStr: response.data.data.nonceStr,
          package: response.data.data.package,
          signType: "MD5",
          paySign: response.data.data.sign
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            Toast({
              message: "支付成功",
              position: "middle",
              duration: 1000
            });
            //支付成功
            _router.push({
              path: "/payment/paymenttrue",
              query: { order: orderCode, id: _courseId }
            });
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            Toast({
              message: "支付失败...",
              position: "middle",
              duration: 1000
            });
          }
        }
      );
    },
    judgeJogin() {
      var _router = this.$route
      // console.log(_router.query)
      //判断用户有没有登录
      this.axios
        .get(`/api/party/user/v2/user/session`, {})
        .then(response => {
          if (response.data.status == "888") {
            this.$router.push({ path: "/login", query: { id: _router.query.paycid } });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  created() {
    // 获取url字段
    this.getUrlData();
  },
  mounted() {
    if (typeof this.$route.query.payStatus) {
      //判断是否支付失败,如果支付失败就停留在当前页面,如果成功就到支付成功页面
      this.getOrderData(this.$route.query.payStatus);
    }
    this.getUserInfo()
    this.judgeJogin();
  },
};
</script>

<style scoped>
/*提交订单成功页面开始*/
.backgroud {
  background: #f4f4f4;
  height: 100%;
}
.padding-top-70 {
  padding-top: 1rem;
}
.content {
  width: 5.6rem;
  height: 7.9rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.content img {
  margin: 0.6rem 1.1rem 0.25rem 1.9rem;
  height: 1.7rem;
}
.content .content_con {
  clear: both;
  text-align: center;
}
.content .content_con h3 {
  font-size: 0.36rem;
  color: #4A4A4A;
}
.order_num {
  margin: 0.55rem 0;
  font-size: 0.22rem;
}
.order_num span {
  color: #cacaca;
  font-size: 0.2rem;
}
.order_info {
  height: 0.65rem;
  line-height: 0.65rem;
  text-align: center;
}
.order_info span{
  font-size: 0.285rem;
  font-weight: 600;
  color: #4a4a4a;
  width: 49%;
  display: inline-block;
  text-align: right
}
.order_info span:last-child {
  color: #ff5b09;
  font-size: 0.26rem;
  font-weight: 550;
  text-align: left;
}
.order_btn {
  margin: 0.38rem auto;
  width: 4.8rem;
  height: 0.75rem;
  color: #fff;
  font-size: 0.29rem;
  line-height: 0.75rem;
  border-radius: 0.1rem;
  background-color: #ff5b09;
}
/*提交订单成功页面结束*/
</style>
