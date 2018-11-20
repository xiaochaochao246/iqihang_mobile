<template>
  <div class="login-index">
    <img src="./login/loginImg/404.png">
    <router-link :to="{ path: '/'}">您访问的页面已经飞到太空了！【返回爱启航首页】</router-link>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    name: 'loginIndex',
    data () {
      return {

      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-index{
  overflow: hidden;
  text-align: center;
}
.login-index img{
  display: block;
  width:3rem;
  height:3rem;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 0.2rem;
}
</style>
