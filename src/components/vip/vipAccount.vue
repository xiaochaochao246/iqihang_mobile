<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="vip-name">
      <div class="vip-name-list" v-show="qqShow" @click="qqRelieve(1)">
        <img src="./../login/loginImg/vip-qq.png">
        <p>QQ绑定</p>
        <img src="./vipImg/vip-right.png">
        <span>解除绑定</span>
      </div>
      <div class="vip-name-list vip-name-false" v-show="!qqShow" @click="qqLogin()">
        <img src="./vipImg/vip-fqq.png">
        <p>QQ绑定</p>
        <img src="./vipImg/vip-right.png"/>
        <span>立即绑定</span>
      </div>
      <div class="vip-name-list"  v-show="wxShow" @click="qqRelieve(2)">
        <img src="./../login/loginImg/vip-wx.png">
        <p>微信绑定</p>
        <img src="./vipImg/vip-right.png">
        <span>解除绑定</span>
      </div>
      <div class="vip-name-list vip-name-false" v-show="!wxShow" @click="wxLogin()">
        <img src="./vipImg/vip-fwx.png">
        <p>微信绑定</p>
        <img src="./vipImg/vip-right.png"/>
        <span>立即绑定</span>
      </div>
      <div class="vip-name-list" v-show="wbShow" @click="qqRelieve(3)">
        <img src="./../login/loginImg/vip-wb.png">
        <p>微博绑定</p>
        <img src="./vipImg/vip-right.png">
        <span>解除绑定</span>
      </div>
      <div class="vip-name-list vip-name-false" v-show="!wbShow" @click="wbLogin()">
        <img src="./vipImg/vip-fwb.png">
        <p>微博绑定</p>
        <img src="./vipImg/vip-right.png"/>
        <span>立即绑定</span>
      </div>
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
      htitleText:'第三方账号绑定',
      qqShow:false,
      wxShow:false,
      wbShow:false,
      userId:'',
      party:{
        qqId:'',
        wbId:'',
        wxId:''
      },
      storage:{
        qqId:'',
        wbId:'',
        wxId:''
      },
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    headerImg:function () {//判断绑定过什么
      this.axios.get('/api/party/user/v2/user/img', {})
        .then(response => {
          if (response.data.status == '888') {
            this.$router.push({name: 'loginIndex', query: {url: 'vipIindex'}});
          } else {
            this.userId = response.data.data.userId;
            if(response.data.data.qqId != null){//绑定过qq
              this.qqShow = true;
              this.storage.qqId = response.data.data.qqId
            }else{
              this.qqShow = false;
              this.storage.qqId = ""
            }
            if(response.data.data.wxId != null){//绑定过微信
              this.wxShow = true;
              this.storage.wxId = response.data.data.wxId
            }else{
              this.wxShow = false;
              this.storage.wxId = ""
            }
            if(response.data.data.wbId != null){//绑定过微博
              this.wbShow = true;
              this.storage.wbId = response.data.data.wbId
            }else{
              this.wbShow = false;
              this.storage.wbId = ""
            }
          }
        })
    },
    qqLogin(){//qq绑定
      QC.Login({
        btnId:"qqLoginBtn",//插入按钮的节点id，必选,可为空字符串
      });
      QC.Login.showPopup({
        appId:"101375266",
        redirectURI:encodeURIComponent("http://mobile.iqihang.com/vip/account?qq=1")
      });
    },
    wxLogin(){//微信绑定
      let ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8128e75740e730a2&redirect_uri=http://mobile.iqihang.com/vip/account%3Fid=${this.$route.query.id}%26wx=1&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      }else{
        Toast({
          message:  "请使用微信浏览器打开",
          position: 'middle',
          duration: 2000
        });
      }
    },
    wbLogin(){
      Toast({
        message:  "请使用APP或者电脑端绑定",
        position: 'middle',
        duration: 2000
      });
    },
    qqRelieve(id){//解绑
      if(id == "1"){//qq解除绑定
        this.storage.wxId = "";
        this.storage.wbId = "";
      }else if(id == "2"){//微信解除绑定
        this.storage.qqId = "";
        this.storage.wbId = "";
      }else if(id == "3"){//微博解除绑定
        this.storage.qqId = "";
        this.storage.wxId = "";
      }
      this.axios.post('/api/party/user/v2/user/updateopenid2', {
        userId: this.userId,
        qqId: this.storage.qqId,
        wxId: this.storage.wxId,
        wbId: this.storage.wbId
      })
        .then(response => {
          if(response.data.status == "0"){
            Toast({
              message:  response.data.msg,
              position: 'middle',
              duration: 2000
            });
            setTimeout(() => {
              this.headerImg()
            },2000)
          }else {
            Toast({
              message:  response.data.msg,
              position: 'middle',
              duration: 2000
            });
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    obtain(){//获取qq的openid
      let _this = this;
      QC.Login.getMe(function(openId, accessToken){//qq
        _this.party.qqId = openId;
        return _this.party.qqId
      });
      setTimeout(() => {
        this.implement(1);
      },1000);
      this.$route.query.qq = '';
      this.$route.query.wx = '';
    },
    wxObtain(){//获取微信的openid
      this.party.wxId = this.$route.query.code;
      setTimeout(() => {
        this.implement(2);
      },1000);
    },
    implement(id){//执行绑定事件
      if(id == '1'){//qq绑定
        this.party.wxId = "";
        this.party.wbId = "";
      }else if(id == '2'){//微信绑定
        this.party.qqId = "";
        this.party.wbId = "";
      }
      this.axios.post('/api/party/user/v2/user/updateopenid?end=h5', {
        userId: this.userId,
        qqId: this.party.qqId,
        wxId: this.party.wxId,
        wbId: this.party.wbId
      })
        .then(response => {
          if(response.data.status == "0"){
            Toast({
              message:  response.data.msg,
              position: 'middle',
              duration: 2000
            });
            setTimeout(() => {
              this.headerImg()
            },2000)
          }else {
            Toast({
              message:  response.data.msg,
              position: 'middle',
              duration: 2000
            });
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created(){
    if(this.$route.query.qq == "1"){//判断是否是绑定qq跳转回来
      this.obtain();
    }
    if(this.$route.query.wx == "1"){//判断是否是绑定微信跳转回来
      this.wxObtain()
    }
  },
  mounted(){
    this.headerImg()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip-index{
  height:100%;
  background: #f4f4f4;
}
  .vip-name{
    margin-top: 0.2rem;
    padding-top: 1rem;
  }
  .vip-name-list{
    width:100%;
    background: #fff;
    height:1rem;
    overflow: hidden;
    padding: 0 0.2rem 0 0.2rem;
    line-height: 1rem;
    border-bottom: 1px solid #e6e6e6;
    /*justify-content:center;*/
    /*align-items:center;*/
    /*display:-webkit-flex*/
  }
  .vip-name-list img:nth-child(1){
    float: left;
    width:0.7rem;
    height:0.7rem;
    margin-top: 0.1rem;
  }
  .vip-name-list span:nth-child(4){
    float: right;
    margin-right: 0.1rem;
    color: #8c8c8c;
  }
  .vip-name-list img:nth-child(3){
    float: right;
    width:0.15rem;
    height:0.23rem;
    margin-top: 0.37rem;
  }
  .vip-name-list p:nth-child(2){
    float: left;
    margin-left: 0.2rem;
    /*color: #000;*/
  }
  .vip-name .vip-name-false span{
    color: #b4b4b4;
  }
</style>
