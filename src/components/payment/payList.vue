<template>
  <div class="wrap">
    <div class="pay-tp">课程清单</div>
      <div v-for="(item,index) in courseBox" :key="index" class="pay-course-list">
        <img :src="item.courseImg">
        <div class="pay-course-list-rt">
          <p>{{item.courseTitle}}</p>
          <span>￥{{item.coursePrice}}</span>
        </div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "pay-list",
      data(){
        return{

        }
      },
      props:["courseBox"],
      watch: {
        courseBox() {
          this.show();
        }
      },
      methods:{
        // 课程清单
        show(){
          // console.log(this.courseBox)
        },
      },
    }
</script>

<style scoped>
.wrap{
  background: white;
  margin-bottom: 0.2rem;
  padding: 0 0.2rem;
}
  .pay-tp{
    line-height: 0.88rem;
    color: #4A4A4A;
    font-size: 0.28rem;
    font-weight: 600;
  }
  .pay-course-list{
    padding: 0.2rem 0;
    overflow: hidden;
    border-bottom: 0.01rem solid #e7e7e7;
  }
  .pay-course-list:last-of-type{
    border-bottom: none;
  }
  .pay-course-list img{
    width: 2.38rem;
    height: 1.78rem;
    float: left;
    margin-right: 0.16rem;
    border-radius: 0.1rem;
  }
  .pay-course-list-rt {
    margin-left: 2.58rem;
    position: relative;
    height: 1.78rem;
  }
  .pay-course-list-rt p{
    color: #4A4A4A;
    font-size: 0.28rem;
    font-weight: 500;
    line-height: 0.36rem;
  }
  .pay-course-list-rt span{
    color: #FF5B09;
    font-size: 0.24rem;
    position: absolute;
    left: 0;
    bottom: 0;
    font-weight: bold;
  }
</style>
