<template>
    <div class="courseActive">
      <div class="active_left">
        <div class="active_price">
          <i>￥</i>
          <span>1000</span>
          <i>.00</i>
        </div>
        <div class="original_price">￥1680.00</div>
      </div>
      <div class="active_right">
        剩余名额：<i>100</i>人
      </div>
      <div class="circular_border"></div>
    </div>
</template>

<script>
    export default {
        name: "courseActive",
      data(){
          return{

          }
      },
      props:["associated"],
      watch:{
        associated(){
          this.getCourseData()
        }
      },
      methods:{
        getCourseData(){
          console.log(this.associated);
        }
      }
    }
</script>

<style scoped>
  .courseActive{
    position: relative;
    height:1.15rem;
    width: 96%;
    margin:0 auto;
    background-color: #ed1f4b;
    border-radius: 10px;
  }
  .active_left{
    float: left;
    padding:.15rem 0 0 .15rem;
  }
  .active_price span,.active_price i{
    color:#FFFD9B;
  }
  .active_price span{
    font-size: .5rem;
    font-weight: 600;
  }
  .active_price i{
    font-size: .22rem;
  }
  .original_price{
    margin-top: .1rem;
    color:#fff;
    font-size: .22rem;
    text-decoration: line-through;
  }
  .active_right{
    width: 41%;
    position: absolute;
    right:0;
    top:0;
    text-align: center;
    height: 1.15rem;
    line-height: 1.15rem;
    font-size: .22rem;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    letter-spacing: .02rem;
    background-color: #e20e3b;
    color:#fff;
  }
  .active_right i{
    color:#fff;
    letter-spacing: .02rem;
    font-weight: 600;
    margin-left:.1rem;
    margin-right:.1rem;
    font-size: .36rem;
  }
  .circular_border{
    position: absolute;
    top:0;
    right:41%;
    width: 0;
    height: 0;
    border-bottom: 1.15rem solid #e20e3b;
    border-left: 2.7rem solid transparent;
  }
</style>
