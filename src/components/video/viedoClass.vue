<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" :hurl="htitleUrl"></public-header>
    <div class="vip-down">
      <p>亲~您暂无此课程观看权限</p>
      <p>请立即购买此课程~</p>
      <button><router-link :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研数学'}}">立即购买</router-link></button>
    </div>
  </div>
</template>
<script>
import PublicHeader from '@/components/public/header'
export default {
  name: 'loginIndex',
  components:{
    PublicHeader,
  },
  data () {
    return {
      htitleText:'暂无课程权限',
      htitleUrl:'/course',

    }
  },
  methods:{

  },
  mounted(){
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip-index{
  height:100%;
  background: #f4f4f4;
}
.vip-down{
  margin: 0 auto;
  text-align: center;
  font-size: 0.3rem;
  padding-top: 45%;
  line-height: 0.35rem;
}
  .vip-down button{
    margin-top: 0.5rem;
    color: rgb(255, 255, 255);
    padding: 0.2rem 1.2rem;
    background-color: rgb(58, 203, 174);
    border-radius: 5px;
    font-size: 0.26rem;
  }
.vip-down button a{
  color: #fff;
}
</style>
