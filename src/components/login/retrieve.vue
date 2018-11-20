<template>
  <div class="login-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="login-register-ct">
      <div class="loginbg-ct-logon">
        <div class="loginbg-ct-input">
          <div class="loginbg-input-width">
            <mt-field v-model="registered.loginName" placeholder="请输入手机号" type="tel"></mt-field>
          </div>
        </div>
        <div class="loginbg-ct-input loginbg-ct-last">
          <div class="loginbg-input-width loginbg-input-Verification">
            <mt-field v-model="registered.Imgcode" placeholder="请输入验证码"  ></mt-field>
          </div>
          <span class="img-code" @click="imgCode"><img :src='registered.Imgurl'/></span>
        </div>
        <div class="loginbg-ct-input loginbg-ct-last">
          <div class="loginbg-input-width loginbg-input-code">
            <mt-field v-model="registered.Phonecode" placeholder="请输入手机验证码"  ></mt-field>
          </div>
          <span v-if="!sendMsgDisabled" class="phone-codeactive" @click="phoneCode()">获取手机验证码</span>
          <span v-if="sendMsgDisabled" class="phone-code" >{{time+'秒后重新获取'}}</span>
        </div>
        <div class="loginbg-ct-input loginbg-ct-last">
          <div class="loginbg-input-width ">
            <mt-field  v-model="registered.password" placeholder="请输入新密码" type="password"></mt-field>
          </div>
        </div>
        <div class="loginbg-ct-input loginbg-ct-last">
          <div class="loginbg-input-width ">
            <mt-field  v-model="registered.passcon" placeholder="请确认新密码" type="password"></mt-field>
          </div>
        </div>
      </div>
      <div class="loginbg-sign">
        <button @click="registeredForm()">确认</button>
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
  data() {
    return {
      htitleText: '找回密码',
      registered: {
        loginName: '',
        password: '',
        Imgcode:'',//图形验证码
        Imgurl:"",//图形验证码图片
        Phonecode: '',//手机验证码
        passcon:'',//确认密码
      },
      time: 60,
      sendMsgDisabled: '',
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    imgCode(){//获取图形验证码
      this.axios.get('/api/party/nologin/v2/user/verifyImage?width=105&height=45', {
      })
        .then(response => {
          this.registered.Imgurl=response.data.verifyImage
        })
        .catch(err => {
          console.log(err)
        })
    },
    phoneCode(){//获取短信验证码
      this.registerFun();
      if(this.register == true){
        this.axios.get('/api/party/nologin/v2/user/sendSms?phone='+this.registered.loginName+"&cmd=10&verifyCode="+this.registered.Imgcode, {
        })
          .then(response => {
            if(response.data.status == "0"){
              let me = this;
              me.sendMsgDisabled = true;
              let interval = window.setInterval(function() {
                if ((me.time--) <= 0) {
                  me.time = 60;
                  me.sendMsgDisabled = false;
                  window.clearInterval(interval);
                }
                this.flag = false
              }, 1000);
              Toast({
                message: '手机验证码发送成功',
                position: 'middle',
                duration: 2000
              });

            }else {
              Toast({
                message: response.data.msg,
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
    registerFun(){
      if(this.registered.loginName == '' && this.registered.Imgcode ==''){
        Toast({
          message: '请输入手机号和图形验证码',
          position: 'middle',
          duration: 2000
        });
      } else if(this.registered.loginName != '' && this.registered.Imgcode ==''){
        Toast({
          message: '请输入图形验证码',
          position: 'middle',
          duration: 2000
        });
      } else if(this.registered.loginName == '' && this.registered.Imgcode !=''){
        Toast({
          message: '请输入手机号',
          position: 'middle',
          duration: 2000
        });
      }else if(!(/^1(3|4|5|7|8|9)\d{9}$/.test(this.registered.loginName)) && this.registered.Imgcode !=''){
        Toast({
          message: '请输入正确手机号',
          position: 'middle',
          duration: 2000
        });
      }else {
        this.register = true;
      }
    },
    registeredForm(){
      this.registerFun();//判断
      if(this.registered.password == ""){
        Toast({
          message: '请输入新密码',
          position: 'middle',
          duration: 2000
        });
      }else if(this.registered.passcon == ""){
        Toast({
          message: '请确认新密码',
          position: 'middle',
          duration: 2000
        });
      }else if(this.registered.passcon != this.registered.password){
        Toast({
          message: '两次密码不一致',
          position: 'middle',
          duration: 2000
        });
      }else if(!(/^[^\u4e00-\u9fa5]{6,16}$/.test(this.registered.passcon)) || !(/^[^\u4e00-\u9fa5]{6,16}$/.test(this.registered.password))) {
        Toast({
          message: '密码为6~16位字母、数字或符号',
          position: 'middle',
          duration: 2000
        });
      }else if(this.register == true && this.registered.Phonecode !=''){//判断通过并且验证码不为空
        this.axios.post('/api/party/nologin/v2/user/findpwd', {
          username: this.registered.loginName,//用户名1
          password: this.registered.password,//密码
          verifyCodePic:this.registered.Imgcode,//验证码
          verifyCodeTel:this.registered.Phonecode,
          businessId:'1001',
        })
          .then(response => {
            if(response.data.status == "0"){
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 2000
              });
              setTimeout(() => {
                this.$router.push({path: '/login'})
              },1000)
            }else {
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 2000
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      }else{
        Toast({
          message: '请输入手机验证码',
          position: 'middle',
          duration: 2000
        });
      }
    }
  },
  mounted(){
    this.imgCode()
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-index{
    height:100%;
    background: #f4f4f4;
  }
  .login-register-ct{
    margin: 0 0.18rem 0 0.18rem;
    padding-top: 1.18rem;
  }
  /*input样式开始*/
  .loginbg-ct-input{
    position: relative;
    width:100%;
    overflow: hidden;
  }
  .loginbg-ct-logon{
    border-radius: 4px;
    background: #fff;
  }
  .loginbg-ct-input{
    position: relative;
    width:100%;
  }
  .loginbg-input-width{
    width:6.5rem;
    margin-left: 0.2rem;
  }
  .loginbg-input-code{
    width:4.3rem;
    float: left;
  }
  .loginbg-ct-last{
    border-top: 1px solid #efefef;
  }
  .loginbg-sign button{
    margin-top: 0.4rem;
    border-radius: 8px;
    width:100%;
    height:1.04rem;
    background: #3acbae;
    color: #fff;
    font-size: 0.30rem;
  }
  /*input样式结束*/
  .phone-codeactive{
    float: right;
    width:2.6rem;
    height:100%;
    line-height: 0.9rem;
    text-align: center;
    font-size: 0.25rem;
    display: block;
    color: #3acbae;
  }
  .phone-code{
    float: right;
    width:2.6rem;
    height:100%;
    line-height: 0.9rem;
    text-align: center;
    font-size: 0.25rem;
    display: block;
    color: #c1c1c1;
  }
  .loginbg-input-Verification{
    width:4.3rem;
    border-right: 1px solid #efefef;
    float: left;
  }
  .img-code{
    float: left;
    display: block;
    height:100%;
    width:2.58rem;
  }
  .img-code img{
    margin: 0 auto;
    display: block;
  }
  .loginbg-ct-agr{
    margin: 0.4rem 0 0 0.2rem;
    line-height: 0.3rem;
  }
  .loginbg-ct-agr img{
    width:0.28rem;
    height:0.3rem;
    margin-right: 0.2rem;
    float: left;
  }
  .loginbg-ct-agr span{
    color: #3acbae;
  }
</style>
