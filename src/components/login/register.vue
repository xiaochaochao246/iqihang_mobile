<template>
  <div class="login-register">
    <!--<div v-show="examRed" class="examRed">-->
      <!--<img src="./loginImg/login-red.png">-->
    <!--</div>-->
    <div class="popup" v-show="control">
      <div class="popup-content">
        <div class="popup-content-tp">
          <img :src=" appUrl "/>
        </div>
        <div class="popup-bottom">
          <button @click="receive()">立即领取</button>
          <button @click="giveUp()">我不需要</button>
        </div>
      </div>
    </div>
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="login-register-ct">
      <div class="loginbg-ct" v-show="examjudge">
        <div class="loginbg-ct-logon">
          <div class="loginbg-ct-input">
            <div class="loginbg-input-width">
              <mt-field v-model="registered.loginName" placeholder="请输入手机号" type="tel"></mt-field>
            </div>
          </div>
          <div class="loginbg-ct-input loginbg-ct-last">
            <div class="loginbg-input-width ">
              <mt-field  v-model="registered.password" placeholder="请输入密码(6至16位字母或者数字)" type="password"></mt-field>
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
        </div>
        <!--<div class="loginbg-ct-agr">-->
          <!--<img src="./paymentImg/login-cheboxFls.png">我已同意<span>《爱启航用户注册协议》</span>-->
        <!--</div>-->
        <div class="loginbg-sign">
          <button @click="nextBox()">下一步</button>
        </div>
      </div>
      <div v-show="!examjudge">
        <div class="login-reMajor-ct">
          <div class="login-reMajor-list">
            <ul>
              <li v-for="(item,index) in examtype" :class="examIndex == index  ? 'active':''" @click="examEvent(index,item.examId,item.examTitle)">
                <span></span>
                <input v-model="item.examId" ref="examId" type="hidden"/>
                <input v-model="item.examTitle" ref="examTitle" type="hidden"/>
                {{ item.examTitle }}
              </li>
            </ul>
          </div>
        </div>
        <div class="loginbg-sign">
          <button @click="registeredForm()">注册</button>
          <!--<img src="./loginImg/login-mony.png">-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PublicHeader from '@/components/public/header'
import { Toast } from 'mint-ui'
//import store from './../../vuex/store'
export default {
  name: 'loginIndex',
  components:{
    PublicHeader,
  },
  data () {
    return {
      htitleText: '注册',
      registered: {
        loginName: '',
        password: '',
        Imgcode: '',//图形验证码
        Imgurl: "",//图形验证码的图片
        Phonecode:'',//手机验证码
      },
      register:false,
      time: 60,
      sendMsgDisabled: '',
      examjudge:true,//判断注册到了哪一步
//      examRed:false,//红包显示隐藏
      examtype:[],
      examIndex:0,
      examId:'',
      examName:'',
      examOeration:true,
      mydomain:'',
      control:false,
      appUrl:'',
      activityId:''
    }
  },
  methods: {
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    imgCode(){
      this.axios.get('/api/party/nologin/v2/user/verifyImage?width=105&height=45', {
      })
        .then(response => {
          this.registered.Imgurl=response.data.verifyImage
        })
        .catch(err => {
          console.log(err)
        })
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
      }else if(this.registered.password ==''){
        Toast({
          message: '请输入密码',
          position: 'middle',
          duration: 2000
        });
      }else if(!(/^[^\u4e00-\u9fa5]{6,16}$/.test(this.registered.password))){
        Toast({
          message: '密码为6~16位字母、数字或符号',
          position: 'middle',
          duration: 2000
        });
      }else {
        this.register = true;
      }
    },
    phoneCode(){//获取短信验证码
      this.registerFun();
      if(this.register == true){
        this.axios.get('/api/party/nologin/v2/user/sendSms?phone='+this.registered.loginName+"&cmd=9&verifyCode="+this.registered.Imgcode, {
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

            }else if(response.data.status == "1"){
              Toast({
                message: '验证码发送频繁请稍后再试',
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
    nextBox(){
      this.registerFun();//判断
      if(this.register == true && this.registered.Phonecode !=''){//判断通过并且验证码不为空
        this.axios.get('/api/party/nologin/v2/user/checkVerifyCode?verifyCode='+this.registered.Phonecode, {
        })
          .then(response => {
            if(response.data.status == '1'){
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 2000
              });
            }else if(response.data.status == '0'){
              this.examjudge = false
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
    },
    //获取考试类型id以及name
    examEvent(index,id,name){
      this.examOeration = false;
      this.examIndex = index;
      this.examId = id;
      this.examName = name;
    },
    //获取考试类型列表
    examType(){
      this.axios.post(`/es/index_catalog/type_catalog/_search`, {
        "query": {
          "bool": {
            "must": [
              {
                "term": {
                  "type_catalog_datatype": "exam"
                }
              },{
                "term":{"type_catalog_businessId":"1001"}
              }
            ]
          }
        },
        "from":0,
        "size":10,
        "sort":{
          "type_catalog_sort":{
            "order":"asc"
          }
        }
      })
        .then(response => {
          let examAll = response.data.hits.hits;
          let examBox = [];
          for(let i = 0; i < examAll.length; i++){
            examBox.push({
              'examTitle':examAll[i]._source.type_catalog_name,
              'examId':examAll[i]._source.type_catalog_id
            })
          }
          this.examtype = examBox;
        })
        .catch(err => {
          console.log(err)
        })
    },
    //注册
    registeredForm() {
      if( this.examOeration === true ){
        this.examId = this.$refs.examId[0].value;
        this.examName = this.$refs.examTitle[0].value;
      }
      this.axios.post('/api/party/nologin/v2/user/reg', {
        username:this.registered.loginName,//用户名
        password:this.registered.password,//密码
        phone:this.registered.loginName,//手机号
        verifyCodePic:this.registered.Imgcode,//图片验证码
        verifyCodeTel:this.registered.Phonecode,//手机验证码
        teamId:this.mydomain,
        businessId:'1001',
        source:'H5',
        examId:this.examId,
        examName:this.examName
      })
        .then(response => {
          if(response.data.status == "0"){//注册成功
            if(this.$route.query.qqId) {//绑定qq并且登录
                let url_login = '/api/party/nologin/v2/user/login?routingPorts=H5&code=';
                if (this.$route.query.code !== null && this.$route.query.code !== ''){
                  url_login = url_login + this.$route.query.code;
                }
              this.axios.post(url_login, {//登录
                username:this.registered.loginName,
                password:this.registered.password,
                businessId:'1001',
              })
                .then(response => {
                  if(response.data.status == "0"){
                    this.axios.post('/api/party/user/v2/user/updateopenid', {//绑定qq
                      userId: response.data.data.userId,
                      qqId: this.$route.query.qqId,
                    })
                      .then(response => {
                        Toast({
                          message: "注册成功,绑定登录中...",
                          position: 'middle',
                          duration: 2000
                        });
                        setTimeout(() => {
                          this.activity();
                        },2000)
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            }else if(this.$route.query.wxId){//绑定微信并且登录
              let url_login = '/api/party/nologin/v2/user/login?routingPorts=H5&code=';
              if (this.$route.query.code !== null && this.$route.query.code !== ''){
                url_login = url_login + this.$route.query.code;
              }
              this.axios.post(url_login, {//登录
                username:this.registered.loginName,
                password:this.registered.password,
                businessId:'1001',
              })
                .then(response => {
                  if(response.data.status == "0"){
                    this.axios.post('/api/party/user/v2/user/updateopenid?end=h5', {//绑定微信
                      userId: response.data.data.userId,
                      wxId: this.$route.query.wxId,
                    })
                      .then(response => {
                        Toast({
                          message: "注册成功,绑定登录中...",
                          position: 'middle',
                          duration: 2000
                        });
                        setTimeout(() => {
                          this.activity();
                        },2000)
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            }else{//直接登录
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 2000
              });
              setTimeout(() => {
                let url_login = '/api/party/nologin/v2/user/login?routingPorts=H5&code=';
                if (this.$route.query.code !== null && this.$route.query.code !== ''){
                  url_login = url_login + this.$route.query.code;
                }
                this.axios.post(url_login, {
                  username:this.registered.loginName,
                  password:this.registered.password,
                  businessId:'1001',
                })
                  .then(response => {
                    if(response.data.status == "0"){
                      this.activity();
                    }
                  })
                  .catch(err => {
                    console.log(err)
                  })
              },1000)
            }
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
    },
    getopenid(){
      let ua = window.navigator.userAgent.toLowerCase()
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        if ("undefined" != typeof  this.$route.query.code){
        }else if(this.$route.query.wxId){
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8128e75740e730a2&redirect_uri=http://mobile.iqihang.com/register%3Fid=${this.$route.query.id}%26wxId=${this.$route.query.wxId}%26zhuan=1&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
        }else if(this.$route.query.zhuan){
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8128e75740e730a2&redirect_uri=http://mobile.iqihang.com/register%3Fid=${this.$route.query.id}%26zhuan=1&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
        }else{
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8128e75740e730a2&redirect_uri=http://mobile.iqihang.com/register%3Fid=${this.$route.query.id}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
        }
      }
    },
    activity(){//注册成功判断是否有活动
      this.axios.get(`/api/promotion/uerActivtiy/v1/gainActivity`)
        .then(response => {
          console.log(response);
          if(response.data.status == '0'){
            this.control = true;
            this.appUrl = response.data.data.appurl;
            this.activityId = response.data.data.id;
          }else{
            this.Jump();
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    giveUp(){//不领取
      this.control = false;
      this.Jump();
    },
    receive(){//领取活动
      this.axios.get(`/api/promotion/uerActivtiy/v1/inUserIdAndActivtiyId?activityId=`+this.activityId)
        .then(response => {
          if(response.data.status == '0'){
            Toast({
              message: "领取成功",
              position: 'middle',
              duration: 2000
            });
            setTimeout(() => {
              this.Jump();
            },3000)
          }else{
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
    },
    Jump(){
      if(this.$route.query.id !== null && this.$route.query.id && this.$route.query.id != 'undefined'){
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
    }
  },
  mounted(){
    let domain = window.location.host;
    domain = domain.split(".")[0];
    this.mydomain = domain;
    this.imgCode();
    this.examType();
    this.getopenid();
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-register{
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
  border:1px solid #efefef;
  border-radius: 8px;
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
  width:4rem;
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
.login-reMajor{
  height:100%;
  background: #f4f4f4;
}
.login-reMajor-ct{
  margin: 0.18rem 0 0 0;
}
.login-reMajor-list li{
  width:100%;
  height:1rem;
  border-bottom: 1px solid #efefef;
  background: #fff;
  overflow: hidden;
  align-items:center;
  display:-webkit-flex;
}
.login-reMajor-list span{
  width:0.46rem;
  height:0.46rem;
  float: left;
  margin: 0 0.3rem 0 0.38rem;
  background: url("./loginImg/login-radioFlase.png");
  background-size: 0.46rem 0.46rem;
}
.login-reMajor-list .active span{
  background: url("./loginImg/login-radio.png");
  background-size: 0.46rem 0.46rem;
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
.loginbg-sign img{
  width:100%;
  height:1.82rem;
  margin-top: 0.47rem;
}
.examRed{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom:0;
  z-index: 111;
}
.examRed img{
  width:100%;
  height:100%;
}
.popup{
  position: fixed;
  top:0;
  bottom:0;
  right:0;
  left:0;
  background: rgba(0,0,0,.5);
  z-index: 9999;
}
.popup-content{
  width:6rem;
  height:7.5rem;
  background: #fff;
  margin: 0 auto;
  margin-top: 2rem;
}
.popup-content img{
  width:100%;
  height:100%;
}
.popup-content-tp{
  height:6.5rem;
}
.popup-bottom{
  height:1rem;
  overflow: hidden;
}
.popup-bottom button{
  width:50%;
  height:100%;
  float: left;
  color: #fff;
  font-size: 0.3rem;
}
.popup-bottom button:nth-child(1){
  background: #ff9000;
}
.popup-bottom button:nth-child(2){
  background: #4e4e4f;
}
</style>
