<template>
    <div class="payWay">
      <div class="pay-paument-list-div pay-paument-list-pay">
        <div class="pay-paument-list-div-b">
          <span>支付方式</span>
        </div>
        <ul>
          <li :class="{ 'active' : isA, '': !isA}" @click='toggle' v-show="isShow">
            <img src="./paymentImg/pay-zfb.png"/>
            <span>支付宝支付</span>
            <i></i>
          </li>
          <li :class="{ 'active' : isB, '': !isB}" @click='toggleB'>
            <img src="./paymentImg/pay-wx.png"/>
            <span>微信支付</span>
            <i></i>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "pay-way",
      data(){
          return{
            isA: true, //控制支付方式
            isB: false, //控制支付方式,
            payment: "1", //默认支付宝
            isShow:true,
          }
      },
      methods:{
        toggle() {
          //控制支付方式
          this.isB = false;
          this.isA = true;
          this.payment = "1";
          this.byindex()
        },
        toggleB() {
          //控制支付方式
          this.isB = true;
          this.isA = false;
          this.payment = "2";
          this.byindex()
        },
        byindex(){
          this.$emit("payWaybyindex",this.isA,this.isB,this.payment,this.isShow)
        },
      },
    }
</script>

<style scoped>
  .payWay{
    width: 100%;
    background: #fff;
    margin: 0.2rem 0;
    border-bottom: 0.01rem solid #e7e7e7;

  }
  .pay-paument-list-div-b{
    overflow: hidden;
    padding: 0 0.2rem;
    line-height: 0.88rem;
    border-bottom: 1px solid #e7e7e7;
  }
  .pay-paument-list-div-b span{
    color: #4A4A4A;
    font-size: 0.28rem;
    font-weight: 600;
  }
  .pay-paument-list-pay li {
    margin:0 0.2rem;
    line-height: 0.88rem;
    overflow: hidden;
    color: #666666;
  }
  .pay-paument-list-pay li:nth-child(1) {
    border-bottom: 1px solid #e6e6e6;
  }
  .pay-paument-list-pay li img:nth-child(1) {
    width: 0.5rem;
    height: 0.5rem;
    float: left;
    margin-right: 0.15rem;
    margin-top: 0.19rem;
  }
  .pay-paument-list-pay ul span{
    line-height: .45rem;
    font-size: .28rem;
  }
  .pay-paument-list-pay ul i {
    background: url("./../payment/paymentImg/pay-radioFal.png");
    background-size: 0.4rem 0.4rem;
    width: 0.4rem;
    height: 0.4rem;
    float: right;
    margin-top: 0.24rem;
  }
  .pay-paument-list-pay ul .active i {
    background: url("./../payment/paymentImg/pay-rad.png");
    background-size: 0.4rem 0.4rem;
    width: 0.4rem;
    height: 0.4rem;
  }
</style>
