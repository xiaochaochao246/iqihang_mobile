<template>
  <div class="vip-index">
    <public-header :htitle="htitleText"  @childReturn="allControl"></public-header>
    <div class="vip-down">
      <img v-show="!displayT" src="./vipImg/vip-ewm.jpg">
      <button @click="down" v-show="displayT">立即下载</button>
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
      htitleText:'APP下载',
      judge:'',
      setState:{},
      displayT:true,//控制显示隐藏
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    aaa(){
      var u = navigator.userAgent, app = navigator.appVersion;
      var browser =  {//移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      };
      language: (navigator.browserLanguage || navigator.language).toLowerCase();
      var ua = navigator.userAgent.toLowerCase();
      if (browser.ios || browser.iPhone || browser.iPad) {//ios
        this.displayT = true;
        this.setState = {
          site: 'https://itunes.apple.com/cn/app/ai-qi-hang/id1172161344',
        };
      }else if (browser.android) {
        if (ua.match(/MicroMessenger/i) == "micromessenger") {//微信
          this.displayT = false;
        } else {//判断安卓
          this.setState = {
            site: 'http://s.iqihang.com/app/iqihang.apk',
          };
        }
      } else {
        this.displayT = true;
        this.setState = {
          site: "http://mobile.iqihang.com/login",
        };
      }
    },
    down(){
      window.location.href = this.setState.site;
//      console.log(this.setState.site)
    }
  },
  mounted(){
    this.aaa()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip-index{
  height:100%;
  background: #f4f4f4;
}
.vip-down img{
  display: block;
  margin: 0 auto;
  width:4rem;
  height:4rem;
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
</style>
