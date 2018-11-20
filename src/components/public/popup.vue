<template>
  <div class="popup">
    <div>
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="录播">
          <courseList></courseList>
        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
          <vipIndex></vipIndex>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="foot">
      <mt-tabbar v-model="selected">
        <mt-tab-item id="首页">
          <p><img src="./publicimg/foot-icon1.png"/></p>
          首页
        </mt-tab-item>
        <mt-tab-item id="录播">
          <p><img src="./publicimg/foot-icon2.png"/></p>
          录播
        </mt-tab-item>
        <mt-tab-item id="我的课程">
          <p><img src="publicimg/foot-icon3.png"/></p>
          我的课程
        </mt-tab-item>
        <mt-tab-item id="直播">
          <p><img src="publicimg/foot-icon4.png"/></p>
          直播
        </mt-tab-item>
        <mt-tab-item id="我的">
          <p><img src="publicimg/foot-icon5.png"/></p>
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
  import courseList from './../course/courselist.vue'
  import vipIndex from './../vip/vipIndex.vue'
export default {
  components: {
    courseList,
    vipIndex
  },
  props:{

  },
  name: 'index',
  data () {
    return {
      selected:'录播'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foot img{
  width:0.44rem;
  height: 0.4rem;
  margin-bottom: 0.15rem;
}
</style>
