<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="vip-name">
      <div class="vip-name-list">
        <span>昵称：</span>
        <input type="text" placeholder="请输入昵称" maxlength="8" v-model="vipname"/>
        <!--<mt-field label="昵称：" v-model="vipname" placeholder="请输入昵称"></mt-field>-->
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
      htitleText:'修改昵称',
      vipname:''
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    obtain(){
      this.vipname = this.$route.query.name
    },
    nicknameBox(){//修改昵称
      this.judgeJogin()
      if(this.vipname != ""){
        this.axios.post('/api/party/user/v2/user/realName', {
          realName:this.vipname
        })
          .then(response => {
            if(response.data.status == "0"){
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 2000
              });
              setTimeout(() => {
                this.$router.push({ path: '/vip'})
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
      }else{
        Toast({
          message: '请输入昵称',
          position: 'middle',
          duration: 2000
        });
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
    this.obtain()
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
    padding: 0 0 0 0.2rem;
    line-height: 1rem;
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
