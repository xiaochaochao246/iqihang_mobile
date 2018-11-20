<template>
  <div class="login-index">
    <public-header :htitle="htitleText"  @childReturn="allControl"></public-header>
    <div class="loginbg">
      <div class="binding">
        <div class="binding-input">
          <mt-field v-model="loginTel"  placeholder="请输入手机号" type="tel"></mt-field>
        </div>
        <div class="binding-input">
          <mt-field v-model="loginPass" placeholder="请输入密码" type="password"></mt-field>
        </div>
        <div class="loginbg-sign">
          <button @click="binding()">确认绑定</button>
          <button @click="register()">新用户注册</button>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import PublicHeader from '@/components/public/header'
import { Toast } from 'mint-ui'
let qqDeposit="";
export default {
  name: 'loginIndex',
  components:{
    PublicHeader,
  },
  data () {
    return {
      htitleText:'绑定已有账号',
      loginTel:'',
      loginPass:'',
      userId:'',
      party:{
        qqId:'',
        wbId:'',
        wxId:''
      }
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    obtain(){
      let _this = this;
      QC.Login.getMe(function(openId, accessToken){//qq
        _this.party.qqId = openId;
        return _this.party.qqId
      });
      if ("undefined" != typeof  this.$route.query.code){
        this.party.wxId = this.$route.query.code
      }
      setTimeout(() => {
        this.discharge();
      },500)
    },
    binding(){
      if(this.loginTel == ""){
        Toast({
          message: '手机号不能为空',
          position: 'middle',
          duration: 2000
        });
      }else if(!(/^1(3|4|5|7|8|9)\d{9}$/.test(this.loginTel)) || this.loginTel.length != '11' ){
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
        this.axios.post('/api/party/nologin/v2/user/login?routingPorts=H5', {
          username:this.loginTel,
          password:this.loginPass,
          businessId:'1001',
        })
          .then(response => {
            if(response.data.status == "0"){
              this.userId = response.data.data.userId;
              this.implement()
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
    discharge(){//判断用户有没有绑定过,如果绑定了就直接登录如果没有绑定就执行绑定
      if(this.party.qqId != "" || this.party.wxId != ""){
        this.axios.post('/api/party/nologin/v2/user/logins?end=h5&routingPorts=H5', {
          routingPorts: "H5",
          qqId: this.party.qqId,
          wxId: this.party.wxId,
          wbId: this.party.wbId
        })
          .then(response => {
            if(response.data.status == "0"){
//              this.$router.replace({path: '/'})
              if(this.$route.query.id !== null && this.$route.query.id && this.$route.query.id != 'undefined'){
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
            }else if(response.data.status == "1"){//判断有没有绑定,如果没有绑定返回uid
              this.party.wxId = response.data.data.wxId
            }else if(response.data.status == "2"){//判断有没有绑定,如果没有绑定返回uid
              Toast({
                message:  "请求超时请重新登陆",
                position: 'middle',
                duration: 2000
              });
              setTimeout(() => {
                this.$router.replace({path: '/login'})
              },2000)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }else{
        setTimeout(() => {
          this.discharge()
        },1000)
      }

    },
    implement(){//执行绑定事件
//      if ("undefined" != typeof  this.$route.query.code){
//        this.party.wxId = this.$route.query.code
//      }
      this.axios.post('/api/party/user/v2/user/updateopenid?end=h5&openid='+this.party.wxId+'', {
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
              if(this.$route.query.id !== null && this.$route.query.id && this.$route.query.id != 'undefined'){
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
    },
    register(){
      if(this.party.qqId){
        if(this.$route.query.zhuan){
          this.$router.push({path: '/register',query:{qqId:this.party.qqId,id:this.$route.query.id,zhuan:1}})
        }else if(this.$route.query.id){
          this.$router.push({path: '/register',query:{qqId:this.party.qqId,id:this.$route.query.id}})
        }else{
          this.$router.push({path: '/register',query:{qqId:this.party.qqId}})
        }
      }else if(this.party.wxId){
        if(this.$route.query.zhuan){
          this.$router.push({path: '/register',query:{wxId:this.party.wxId,id:this.$route.query.id,zhuan:1}})
        }else if(this.$route.query.id){
          this.$router.push({path: '/register',query:{wxId:this.party.wxId,id:this.$route.query.id}})
        }else{
          this.$router.push({path: '/register',query:{wxId:this.party.wxId}})
        }
      }
    }
  },
  created(){
    this.obtain()
  },
  mounted(){
//    this.discharge()
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
  .binding{
    margin-top: 0.5rem;
  }
  .binding-input{
    width: 7rem;
    margin: 0 auto;
  }
  .binding .binding-input:nth-child(1) a{
    border:1px solid #efefef;
    border-bottom: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px
  }
.binding .binding-input:nth-child(2) a{
  border:1px solid #efefef;
  border-top: 1px solid #dedede;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px
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
