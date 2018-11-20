<template>
  <div class="login-index">
    <public-header :htitle="'支付成功'" @childReturn="allControl"></public-header>
    <div class="payment-true">
      <img src="./paymentImg/pay-true.png">
      <p v-html="titleStates"></p>
      <p class="chen-detail">{{seconds}}秒后自动跳转到{{toHtml}}</p>
    </div>
  </div>
</template>
<script>
  import PublicHeader from '@/components/public/header'
  import { Toast } from 'mint-ui'
  export default {
    name: 'loginIndex',
    components:{
      PublicHeader,
    },
    data () {
      return {
        htitleText:'支付订单',
        paper:false,
        classTypenum:'',
        activity:false,
        activityTrue:false,
        activityId:'',
        appUrl:'',
        seconds: 4,
        timer: '',
        titleStates: '支付成功',
        toHtml:'课程详情页'
      }
    },
    methods:{
      allControl(){//返回上一页
        localStorage.removeItem('shop')
        this.$router.go(-1)
      },
      judge(){
        this.axios.get('/es/order/f/' + this.$route.query.order, {})
          .then(response => {
            let agreement = response.data._source;
            if(agreement.f_totalPrice == 0){
              this.titleStates = '领取成功'
            }
            if(agreement.f_isWithbook == "1"){
              this.paper = true
              this.toHtml = '添加地址页'
            }
            for(var i = 0;i <response.f_orderItems.length;i++){
              if(response.f_orderItems[i].classType == "1"){//录播
                  this.classTypenum = '1'
              }else if(response.f_orderItems[i].classType == "2"){
                this.classTypenum = '2'
              }else if(response.f_orderItems[i].classType == "3"){
                this.classTypenum = '3'
              }
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
      curriculum(){//我的课程
        this.$router.push({ path: '/main'});
      },
//      address(){//地址
//        this.$router.push({ path: '/vip/order', query:{orderzf:'zf'}})
//      }
      giveUp(){//一键放弃
        this.activity = false;
      },
      CutFull(){//判断有没有活动
        this.axios.get('/api/promotion/voucherActivtiy/v1/voucherActivtiy/rollCollar?orderCode='+this.$route.query.order, {})
          .then(response => {
            if(response.data.status == 0){
              this.activity = true;
              this.appUrl = response.data.data.appurl;
              this.activityId = response.data.data.id;
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
      receive(){//领取
        this.activity = false;
        this.axios.get('/api/promotion/voucherActivtiy/v1/voucherActivtiy/rollCollarVa?id='+ this.activityId, {})
          .then(response => {           
            if(response.data.status == 0){
              this.activityTrue = true
            }else{
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration:2000
              });
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
      know(){
        this.activityTrue = false
      },
      secondsFunc(){
        this.seconds = this.seconds - 1;
        if(this.seconds == 0){
          clearInterval(this.timer)
          if((localStorage.getItem('shop') == 0 || (this.$route.query.id.length > 1 && this.$route.query.id instanceof Array )) && !this.paper){
            localStorage.removeItem('shop')
            this.$router.push({ path: '/main',})
            return;
          }
          if(this.paper){
              this.$router.push({ path: '/payment/payAddress',query: {order: this.$route.query.order,id:this.$route.query.id}})
            }else{
              this.$router.push({ path: '/course/courseconter',query: {order: this.$route.query.order,id:this.$route.query.id}})
          }
          return;
        }
        this.timer = setTimeout(this.secondsFunc,1000)
      },
      // 判断是否为多个课程
      judgeCourse(){
        let urlList = this.$route.query;
        let urlId = this.$route.query.id;
      }
    },
    mounted(){//领取成功
      this.judge();
      this.CutFull();
      // this.secondsFunc();
      this.judgeCourse()
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-index{
  height:100%;
  width:100%;
  background: #f4f4f4;
}
.payment-true .payment-p{
  text-align: left;
  padding: 0 1rem 0 1rem;
  line-height: 0.45rem;
  color: #ec424f;
}
.payment-true{
  padding: 2.5rem 0.2rem 0 0.2rem;
  justify-content:center;
  align-items:center;
  /*display:-webkit-flex;*/
}
.payment-true .payment-button{
  background: #ff9000;
}
.payment-true img{
  width:1.56rem;
  height:1.56rem;
  margin: 0 auto;
  margin-bottom: 0.85rem;
  display: block;
}
.payment-true ul li{
  margin-left: 0.3rem;
  font-size: 0.28rem;
  color: #666666;
  margin-bottom: 0.4rem;
}
.payment-true ul li span{
  color: #ff8400;
}
.payment-true button{
  /*margin-top: 0.4rem;*/
  border-radius: 8px;
  width:50%;
  height:1.04rem;
  background: #3acbae;
  color: #fff;
  font-size: 0.30rem;
  display: block;
  margin: 0.4rem auto 0;
}
  .payment-true p{
    text-align: center;
    font-size: 0.3rem;
  }
  .popup{
    position: fixed;
    top:0;
    bottom:0;
    right:0;
    left:0;
    background: rgba(0,0,0,.5);
    z-index: 9999;
  }
  .popup-content{
    width:6rem;
    height:7.5rem;
    background: #fff;
    margin: 0 auto;
    margin-top: 2rem;
  }
  .popup-content img{
    width:100%;
    height:100%;
  }
  .popup-content-tp{
    height:6.5rem;
  }
.popup-bottom{
  height:1rem;
  overflow: hidden;
}
.popup-bottom button{
  width:50%;
  height:100%;
  float: left;
  color: #fff;
  font-size: 0.3rem;
}
.popup-bottom button:nth-child(1){
  background: #ff9000;
}
.popup-bottom button:nth-child(2){
  background: #4e4e4f;
}
  .success{
    width:5rem;
    margin:0 auto;
    background: #fff;
    height:3rem;
    margin-top: 40%;
  }
  .success p{
    font-size: 0.4rem;
    font-weight: bold;
    color: red;
    text-align: center;
    line-height: 2rem;
  }
  .success button{
    margin: 0 auto;
    display: block;
    width:3rem;
    height:0.8rem;
    background: #ff9000;
    color: #fff;
    border-radius: 4px;
  }
  .chen-detail{
    margin-top: 1.0rem;
  }
</style>
