<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="vip-card">
      <mt-field label="卡号" v-model="ruleForm2.number" placeholder="请输入课程卡号"></mt-field>
      <mt-field label="密码" type="password" v-model="ruleForm2.pass" placeholder="请输入课程卡密码"></mt-field>
      <button @click="submitForm('ruleForm2')">激活</button>
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
      htitleText:'课程卡激活',
      ruleForm2:{
        number:'',
        pass:''
      }
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    submitForm(formName) {
      this.judgeJogin()
      if(this.ruleForm2.number == ""){
        Toast({
          message: "请输入课程卡号",
          position: 'middle',
          duration: 2000
        });
      }else if(this.ruleForm2.pass == ""){
        Toast({
          message: "请输入课程卡密码",
          position: 'middle',
          duration: 2000
        });
      }else if(this.ruleForm2.number != "" && this.ruleForm2.pass != ""){
        this.axios.post(`/api/promotion/nologin/v1/pageView/courseCard`, {
          cardNumber:this.ruleForm2.number,
          pwd:this.ruleForm2.pass
        })
          .then(response => {
            if(response.data.status == "0"){
              Toast({
                message: "激活成功",
                position: 'middle',
                duration: 2000
              });
              setTimeout(() => {
                this.$router.push({path: '/vip'})
              },2000)
            }else {
              Toast({
                message: response.data.msg,
                position: 'middle',
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
.vip-card{
  margin-top:0.2rem;
  padding-top: 1rem;
}
  .mint-cell{
    border-bottom: 1px solid #e6e6e6;
  }
  .vip-card .mint-cell:nth-last-child(1){
    border-bottom: none;
  }
.vip-index button{
  margin: 0.4rem 0.2rem 0 0.2rem;
  border-radius: 8px;
  width:7.1rem;
  height:1.04rem;
  background: #3acbae;
  color: #fff;
  font-size: 0.30rem;
}
</style>
