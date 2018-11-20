<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="vip-name">
      <div class="feedback-content">
        <div class="feedback-explain">
          <span>问题和意见</span>
          <p>您也可以加入QQ群624896781，以便更快速的得到反馈。</p>
        </div>
        <div class="feedback-information">
          <p>请填写您的反馈内容：</p>
          <textarea v-model="feedback.content" ></textarea>
        </div>
        <div class="feedback-contact">
          <p>联系方式(选填)：</p>
          <input type="text" placeholder="QQ/邮箱/手机号，方便我们与您联系" v-model="feedback.contact"/>
        </div>
      </div>
      <!--<mt-field label="用户名：" type="text" v-model="feedback.username"></mt-field>-->
      <!--<mt-field label="手机号：" type="text" v-model="feedback.tel"></mt-field>-->
      <!--<mt-field label="QQ：" type="text" v-model="feedback.qq"></mt-field>-->
      <!--<mt-field label="E-mail：" type="text" v-model="feedback.email"></mt-field>-->
      <!--<mt-field label="意见反馈：" placeholder="请输入内容" type="textarea" rows="4" v-model="feedback.content" ></mt-field>-->
      <button @click="feedsubmint()">一键反馈</button>
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
      htitleText:'意见反馈',
      userid:'',
      feedback:{
        username:'',
        contact:'',
        content:'',
        email:'',
        tel:'',
        qq:''
      }
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    nicknameBox(){
      this.axios.get(`/api/party/user/v2/user/session`, {
      })
        .then(response => {
          if (response.data.status == "888"){
            this.$router.push({path: '/login',query: {id: "vip"}})
          }else{
            this.userid = response.data.data.userId;
            this.feedback.username = response.data.data.username;
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
    feedsubmint(){
      if(this.feedback.contact == ''){
        Toast({
          message: '请输入联系方式',
          position: 'middle',
          duration: 2000
        });
      }else if(!/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.feedback.contact) && !/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(this.feedback.contact) && !/^\d{5,10}$/.test(this.feedback.contact)){
        Toast({
          message: '请输入正确的联系方式',
          position: 'middle',
          duration: 2000
        });
      }else{
//        if(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.feedback.contact)){
//          this.feedback.tel = this.feedback.contact
//        }else if(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(this.feedback.contact)){
//          this.feedback.email = this.feedback.contact
//        }else if(/^\d{5,10}$/.test(this.feedback.contact)){
//          this.feedback.qq = this.feedback.contact
//        }
        this.axios.post('/api/message/v1/feedback/add', {
          userId:this.userId,//用户id
          username:this.feedback.username,//用户名称
          qq:this.feedback.contact,//联系方式
          email:'H5',
          desciption:this.feedback.content,
          phone:''
        })
          .then(response => {
            if(response.data.status == "0"){
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 2000
              });
              setTimeout(() => {
                this.feedback.username = '';
                this.feedback.content = '';
                this.feedback.email = '';
                this.feedback.qq = '';
                this.feedback.qq = '';
                this.feedback.contact = '';
                this.$router.go(-1)
              },2000)
            }else {
              this.$message({
                message: response.data.msg,
                type: 'warning'
              });
            }
          }).catch(err => {
          console.log(err)
        })
      }
    },
  },
  mounted(){
    this.nicknameBox()
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
  .feedback-content{
    height:5.5rem;
    width:100%;
    background: #fff;
    padding: 0 0.5rem 0 0.5rem;
  }
  .feedback-explain{
    padding-top: 0.2rem;
  }
  .feedback-explain span{
    display: block;
    color: #979797;
    font-size: 0.28rem;
  }
  .feedback-content p{
    display: block;
    color: #979797;
    line-height: 0.28rem;
    font-size: 0.25rem;
    padding-top: 0.2rem;
  }
  .feedback-information{
    padding-top: 0.3rem;
  }
  .feedback-information textarea{
    width:100%;
    height:1.2rem;
    background: #f6f5f5;
    margin-top: 0.2rem;
  }
  .feedback-contact{
    margin-top: 0.1rem;
  }
  .feedback-contact input{
    width:100%;
    height:0.6rem;
    background: #f6f5f5;
    border: 1px solid #e8e8e8;
    margin-top: 0.2rem;
  }
  .vip-name button{
    margin: 0.4rem 0.2rem 0 0.2rem;
    border-radius: 8px;
    width:7.1rem;
    height:1.04rem;
    background: #3acbae;
    color: #fff;
    font-size: 0.28rem;
  }
  .mint-cell{
    border-bottom: 1px solid #e6e6e6;
  }
</style>
