<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="vip-name">
      <div class="vip-name-list">
        <mt-field label="卡号：" v-model="vipcard" placeholder="请输入卡号"></mt-field>
      </div>
      <div class="vip-name-list">
        <mt-field label="密码：" type="password" v-model="vippass" placeholder="请输入密码"></mt-field>
      </div>
      <button @click="nicknameBox()">提交</button>
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
      htitleText:'学习卡充值',
      vipcard:'',
      vippass:'',
      number : /^[0-9]\d*$/
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    nicknameBox(){//修改昵称
      this.judgeJogin()
      if(this.vipcard == ""){
        Toast({
          message: '请输入充值卡卡号',
          position: 'middle',
          duration: 2000
        });
      }else if(!this.number.test(this.vipcard )){
        Toast({
          message: '充值卡卡号是数字',
          position: 'middle',
          duration: 2000
        });
      }else if(this.vippass == ""){
        Toast({
          message: '请输入充值卡密码',
          position: 'middle',
          duration: 2000
        });
      }else if(!this.number.test(this.vippass )){
        Toast({
          message: '充值卡密码是数字',
          position: 'middle',
          duration: 2000
        });
      }else{
        this.axios.get('/api/promotion/nologin/v1/pageView/queryRechargeCard?cardNumber='+this.vipcard +'&pwd='+this.vippass, {})
          .then(response => {
            if(response.data.status == "0"){
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 2000
              });
              setTimeout(() => {
                this.$router.push({ path: '/vip'})
              },2000)
            }else {
              Toast({
                message: response.data.msg,
                position: 'middle',
              });
            }
          }).catch(err => {
          console.log(err)
        })
      }
    },
    judgeJogin(){//判断用户有没有登录
      this.axios.get(`/api/party/user/v2/user/session`, {
      })
        .then(response => {
          if (response.data.status == "888"){
            this.$router.push({path: '/login',query: {id: "vip"}})
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
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
  .vip-name{
    margin-top: 0.2rem;
    padding-top: 1rem;
  }
  .vip-name-list{
    width: 100%;
    padding: 0 0.2rem 0 0;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
  }
.vip-name button{
  margin: 0.4rem 0.2rem 0 0.2rem;
  border-radius: 8px;
  width:7.1rem;
  height:1.04rem;
  background: #3acbae;
  color: #fff;
  font-size: 0.30rem;
}
</style>
