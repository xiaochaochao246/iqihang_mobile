<template>
  <div class="login-index">
    <public-header :htitle="htitleText"  @childReturn="allControl"></public-header>
    <div class="loginbg">
      <div class="loginbg-tp">
        <img src="./loginImg/login-logo.png">
      </div>
      <div class="loginbg-ct">
        <div class="loginbg-ct-logon">
          <div class="loginbg-ct-input">
            <div class="loginbg-input-width ">
              <mt-field v-model="loginTel"  placeholder="请输入手机号" type="tel"></mt-field>
            </div>
          </div>
          <div class="loginbg-ct-input loginbg-ct-last">
            <div class="loginbg-input-width loginbg-input-wcode">
              <mt-field v-model="loginPass" placeholder="请输入密码" :type=" inputType " ></mt-field>
            </div>
            <span class="input-img" @click="tiggleImg()"><img :src=" imgUrl "> </span>
          </div>
        </div>
        <div class="loginbg-ct-forget">
          <router-link :to="{path:'/Retrieve'}"><img src="./loginImg/login-forget.png" >忘记密码</router-link>
        </div>
        <div class="loginbg-sign">
          <button @click="loginSign" >登录</button>
          <button @click="register">新用户注册</button>
        </div>
      </div>
      <!--<div class="login-three">-->
        <!--<div class="login-three-tp">-->
          <!--<span></span><i>其他登录方式</i><span></span>-->
        <!--</div>-->
        <!--<div class="login-three-bm">-->
          <!--<span id="qqLoginBtn" @click="aaa()"><img  src="./loginImg/vip-qq.png"/></span>-->
          <!--<span><img src="./loginImg/vip-wx.png"/></span>-->
          <!--<span><img src="./loginImg/vip-wb.png"/></span>-->
        <!--</div>-->
      <!--</div>-->
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
      htitleText:'登录',
      loginTel:'',//手机号
      loginPass:'',//密码
      tiggle:true,
      inputType:'password',
      imgUrl: require('./loginImg/login-close.png'),
      qquser:''
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    loginSign(){
      if(this.loginTel == ""){
        Toast({
          message: '手机号不能为空',
          position: 'middle',
          duration: 2000
        });
      }else if(!(/^1(3|4|5|7|8|9)\d{9}$/.test(this.loginTel))){
        Toast({
          message: '请输入正确手机号',
          position: 'middle',
          duration: 2000
        });
      }else if(this.loginPass == ""){
        Toast({
          message: '密码不能为空',
          position: 'middle',
          duration:2000
        });
      }else if(!(/^[^\u4e00-\u9fa5]{6,16}$/.test(this.loginPass))){
        Toast({
          message: '密码为6~16位字母、数字或符号',
          position: 'middle',
          duration:2000
        });
      }else{
        this.axios.post('/api/party/nologin/v2/user/login?routingPorts=H5&code='+this.$route.query.code, {
          username:this.loginTel,
          password:this.loginPass,
          businessId:'1001',
        })
          .then(response => {
            if(response.data.status == "0"){
              Toast({
                message: '登录成功',
                position: 'middle',
                duration: 2000
              });
              setTimeout(() => {
                if(this.$route.query.id !== null && this.$route.query.id && this.$route.query.id != "undefined"){
                  //获取session
                  if(this.$route.query.zhuan){//判断是否是从专题过来
                    window.location.href = this.$route.query.id;
                  }else{
                    this.$router.replace({path: this.$route.query.id})
                  }
                }else if(this.$route.query.id  == null){
                  this.$router.replace({path: '/'})
                } else if(this.$route.query.id  == "undefined"){
                  this.$router.replace({path: '/'});
                }else{
                  this.$router.replace({path: '/'})
                }
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
    tiggleImg(){
      if(this.tiggle === true){
        this.tiggle = false;
        this.inputType = "text";
        this.imgUrl = require('./loginImg/login-open.png')
      }else{
        this.tiggle = true;
        this.inputType = "password";
        this.imgUrl = require('./loginImg/login-close.png')
      }
    },
    headerImg:function () {
      this.axios.get('/api/party/user2/user/img', {
      })
        .then(response => {
          if(response.data.status == '888'){
            this.$router.push({path: '/login'})
          }else {
            this.userId = response.data.data.userId;
            if(response.data.data.realName){
              this.header.phone=response.data.data.realName
            }else {
              this.header.phone=response.data.data.phone;//用户id
            }
            if(response.data.data.headImg){
              this.header.imgurl=response.data.data.headImg;
            }else {
              this.header.imgurl = usredefault;
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getopenid(){
      let ua = window.navigator.userAgent.toLowerCase()
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        if ("undefined" != typeof  this.$route.query.code){
        }else{
          if(this.$route.query.zhuan){//判断是否是从专题过来
            //设置session

            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8128e75740e730a2&redirect_uri=http://mobile.iqihang.com/login%3Fid=${this.$route.query.id}%26zhuan=1&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
          }else{
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8128e75740e730a2&redirect_uri=http://mobile.iqihang.com/login%3Fid=${this.$route.query.id}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
          }
        }
      }
    },
    register(){
      if(this.$route.query.zt){
        this.$router.push({path: '/register',query:{id:this.$route.query.zt}})
      }else{
        this.$router.push({path: '/register',query:{id:'/'}})
      }
    },
//    judgeJogin(){//判断用户有没有登录
//      alert(1)
//      this.axios.get(`/api/party/user/v2/user/session`, {
//      })
//        .then(response => {
//          if (response.data.status != "888"){
//            this.$router.push({path: '/'})
//          }
//        })
//        .catch(err => {
//          console.log(err)
//        })
//    },
  },
  mounted(){
    this.getopenid();
//    this.aaa()
//    this.judgeJogin()
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login-index{
  height:100%;
  background: #f4f4f4;
}
.loginbg{
  width:7rem;
  margin: 0 auto;
  padding-top: 1rem;

}
.loginbg-tp{
  height:3.5rem;
  justify-content:center;
  align-items:center;
  display:-webkit-flex;
}
.loginbg-tp img{
  width:2.16rem;
  height:1rem;
}
.login-three{
  margin-top: 0.5rem;
}
.login-three-tp{
  width:4.2rem;
  margin: 0 auto;
  overflow: hidden;
}
.login-three-tp span{
  float: left;
  height:1px;
  width:1.1rem;
  background: #bbbbbb;
  margin-top: 0.1rem;
}
.login-three-tp i{
  float: left;
  padding:  0 0.2rem 0 0.2rem;
  color: #b5b5b5;
}
.login-three-bm{
  width:4rem;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 0.5rem;
}
.login-three-bm img{
  width:0.8rem;
  height:0.8rem;
}
.login-three-bm span{
  float: left;
  width:0.8rem;
  height:0.8rem;
}
.login-three-bm span:nth-child(1){
  background: url("./loginImg/vip-qq.png");
  background-size: 0.8rem 0.8rem;
}
#qqLoginBtn a img{
  display: none !important;
}
.login-three-bm span:nth-child(2){
  margin:0 0.75rem 0 0.75rem;
}
.loginbg-ct-input{
  position: relative;
  width:100%;
}
.loginbg-ct-logon{
  border:1px solid #efefef;
  border-radius: 8px;
  background: #fff;
}
.mint-cell-wrapper{
  background: none !important;
}
.loginbg-input-width{
  width:6.5rem;
  margin-left: 0.2rem;
}
.loginbg-input-wcode{
  width:6.2rem;
}
.input-img img{
  width:0.4rem;
  position: absolute;
  right: 0.3rem;
  top:0.4rem;
}
.loginbg-ct-last{
  border-top: 1px solid #efefef;
}
.loginbg-ct-forget{
  overflow: hidden;
  margin-top: 0.24rem;
  margin-left: 0.2rem;
}
.loginbg-ct-forget a{
  color: #8c8c8c;
  line-height: 0.255rem;
}
.loginbg-ct-forget img{
  width:0.3rem;
  height:0.28rem;
  float: left;
  margin-right: 0.1rem;
}
.loginbg-sign button{
  margin-top: 0.4rem;
  border-radius: 8px;
  width:100%;
  height:1.04rem;
  background: none;
  font-size: 0.30rem;
}
.loginbg-sign button a{
  width:100%;
  height:100%;
  display: block;
  line-height: 1.04rem;
  font-size: 0.3rem;
}
.loginbg-sign button:nth-child(1){
  background: #3acbae;
  color: #fff;
}
.loginbg-sign button:nth-child(2){
  background: #e2e2e2;
  color: #3acbae;
}
</style>
