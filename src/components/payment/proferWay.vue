<template>
    <div>
      <div class="pay-paument-list-div pay-paument-list-pay">
        <div class="pay-paument-list-div-b">
          <span>优惠方式</span>
        </div>
        <ul>
          <li>
            <div v-for="(item,index) in discountInfo" :key="index">
              <div class="mark"></div>
              <span>满<i>{{item.number}}</i>科，立减<i>{{item.discount}}</i>元</span>
              <span class="span_right"><i>-￥{{item.disMoney}}</i></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "proferWay",
      data(){
          return{

          }
      },
      props: ["courseBox","preferential","discountInfo"],
      watch: {
        courseBox() {
          this.profershow();
        }
      },
      methods:{
          // 课程组合活动
        profershow(){
            console.log(this.discountInfo)
          },
      },
    }
</script>

<style scoped>
  .pay-paument-list-div {
    width: 100%;
    background: #fff;
  }
  .pay-paument-list-div-b {
    line-height: 0.88rem;
    overflow: hidden;
    margin: 0 0.2rem;
    border-bottom: 1px solid #e7e7e7;
  }
  .pay-paument-list-div-b span{
    color: #4A4A4A;
    font-size: 0.28rem;
    font-weight: 600;
  }
  .pay-paument-list-pay li {
    margin: 0 0.2rem;
    line-height: .88rem;
    overflow: hidden;
    color: #666666;
  }
  .pay-paument-list-pay span:nth-child(2){
    margin-left:.1rem;
  }
  .mark{
    height:.1rem;
    width:.1rem;
    background-color: #D0021B;
    display: inline-block;
    border-radius: 60%;
  }
  .pay-paument-list-pay li i{
    color:#f00;
  }
  span.span_right{
    float: right;
    margin-right:.3rem;
  }
  span.span_right i{
    color:#f00;
  }
  img{
    width:.2rem;
    height:.3rem;
    margin-top:.2rem;
    margin-left:.1rem;
  }
  .pay-paument-list-pay li:nth-child(1) {
    border-bottom: 1px solid #e6e6e6;
  }
  .pay-paument-list-pay li img:nth-child(1) {
    width: 0.65rem;
    height: 0.65rem;
    float: left;
    margin-right: 0.15rem;
  }
</style>
