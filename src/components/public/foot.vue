<template>
  <div class="footer">
    <ul>
      <li>
        <router-link :to="{ path: '/'}">
          <p><img :src=" srconeA "/></p>
          <p>首页</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/course', query:{course:'考研公共课'}}">
          <p><img :src=" srconeB "/></p>
          <p>录播</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/main'}">
          <p><img :src=" srconeC "/></p>
          <p>我的课程</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/course/courselive', query:{course:'考研公共课'}}">
          <p><img :src=" srconeD "/></p>
          <p>直播</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/vip'}">
          <p><img :src=" srconeE "/></p>
          <p>个人</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'footer',
  props:['srconeA','srconeB','srconeC','srconeD','srconeE'],
  data () {
    return {

    }
  },
}
</script>
<style scoped>
  .footer{
    width: 100%;
    height: 1rem;
    background: #fff;
    border-top: 1px solid #f2f2f2;
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    text-align: center;
  }
  .footer li{
    width: 20%;
    float: left;
    line-height: .3rem;
  }
  .footer li img{
    width: .47rem;
    height: .4rem;
    margin-top: .1rem;
  }
  .footer li a{
    font-size: .24rem;
  }
  .router-link-exact-active p{
    color: #3acbae;
  }
</style>
