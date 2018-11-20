<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="vip-name">
      <div class="vip-name-list">
        <mt-field label="旧密码：" type="password" v-model="oldpass" placeholder="请输入旧密码"></mt-field>
      </div>
      <div class="vip-name-list">
        <mt-field label="新密码：" type="password" v-model="newpass" placeholder="请输入新密码"></mt-field>
      </div>
      <div class="vip-name-list">
        <mt-field label="确认新密码：" type="password" v-model="newpasstrue" placeholder="请确认新密码"></mt-field>
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
      htitleText:'修改密码',
      oldpass:'',
      newpass:'',
      newpasstrue:''
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    nicknameBox(){//修改昵称
      this.judgeJogin();
      if(this.oldpass == ""){
        Toast({
          message: '请输入旧密码',
          position: 'middle',
          duration: 2000
        });
      }else if(this.newpass == ""){
        Toast({
          message: '请输入新密码',
          position: 'middle',
          duration: 2000
        });
      }else if(this.newpasstrue == ""){
        Toast({
          message: '请确认新密码',
          position: 'middle',
          duration: 2000
        });
      }else if(this.newpasstrue != this.newpass){
        Toast({
          message: '两次密码不一致',
          position: 'middle',
          duration: 2000
        });
      }else if(!(/^[^\u4e00-\u9fa5]{6,16}$/.test(this.newpasstrue)) || !(/^[^\u4e00-\u9fa5]{6,16}$/.test(this.newpass))){
        Toast({
          message: '密码为6~16位字母、数字或符号',
          position: 'middle',
          duration: 2000
        });
      }else{
        this.axios.post('/api/party/user/v2/user/updatepwd', {
          password:this.oldpass,
          newpassword1:this.newpass,
          newpassword2:this.newpasstrue,
          businessId:'1001',
        })
          .then(response => {
            if(response.data.status == "0"){
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 1000
              });
              setTimeout(() => {
                this.$router.push({ path: '/login'})
              },1000)
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
