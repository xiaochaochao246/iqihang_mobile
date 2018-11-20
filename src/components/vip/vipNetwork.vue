<template>
  <div class="login-index">
    <div v-show="control">
      <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
      <div class="padding-top-70">
        <mt-field label="真实姓名：" v-model="agrcontent.agrUsername"></mt-field>
        <mt-field label="身份证号码：" v-model="agrcontent.agrCardID"></mt-field>
        <mt-field label="手机号：" v-model="agrcontent.agrTel"></mt-field>
        <mt-field label="电子邮箱：" v-model="agrcontent.agrMailbox"></mt-field>
        <mt-field label="QQ号：" v-model="agrcontent.agrQq"></mt-field>
        <p class="pay-list"v-for="item in courseBox" @click="lookAgreement(item.courseTitle,item.protocol)">查看{{item.courseTitle}}协议</p>
        <button class="pay-btn" @click="agrDeposit()">保存/修改</button>
        <p class="pay-tishi">提示：为了保证您的权益请填写您的真实信息，费用支付成功后协议自动生效。登录学员中心，在查看协议即可查看。</p>
      </div>
    </div>
    <div v-show="!control">
      <public-header :htitle="htitleText" @childReturn="conReturn"></public-header>
      <div class="vip-agrsee">
        <p class="vip-agrsee-title">{{xytitle}}</p>
        <div v-html="xyconter">
          {{xyconter}}
        </div>
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
        htitleText:'签订协议',
        agrcontent:{
          agrUsername:'',
          agrCardID:'',
          agrTel:'',
          agrMailbox:'',
          agrQq:'',
          agrcontentId:''
        },
        agrArr:[],//网络协议数组
        studentId:'',//后台返回协议
        courseBox:[],
        curriculumId:'',//课程id
        classId:[],
        orderid:'',
        control:true,
        xytitle:'',
        xyconter:'',
        userId:''
      }
    },
    methods: {
      allControl(){
        this.$router.go(-1)
      },
      curriculum() {
        this.orderid = this.$route.query.orderid;
        this.curriculumId = this.$route.query.curriculumId;
        for(var i = 0;i < this.curriculumId.length;i++){
          this.classId.push({ "term": { "type_product_id": this.curriculumId[i].productId }})
        };
        this.axios.post('/es/index_product/type_product/_search', {
          "query": {
            "bool": {
              "should": this.classId
            }
          },
          "from": 0,
          "size": 20,
          "_source": ["type_product_id", "type_product_title", "type_product_protocol"]
        })
          .then(response => {
            let buyAll = response.data.hits.hits;
            let courseBox = [];
            for (let i = 0; i < buyAll.length; i++) {
              courseBox.push({
                protocol: buyAll[i]._source.type_product_protocol,//协议内容
                courseId: buyAll[i]._source.type_product_id,//课程id
                courseTitle: buyAll[i]._source.type_product_title,//课程名称
              })
            }
            this.courseBox = courseBox;
          }).catch(err => {
          console.log(err)
        })
      },
      agrDeposit(){//网络协议
        this.agrArr = [];
        if(this.agrcontent.agrUsername == ''){
          Toast({
            message: '请输入真实姓名',
            position: 'middle',
            duration: 2000
          });
        }else if(this.agrcontent.agrCardID == '' || !/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test(this.agrcontent.agrCardID)){
          Toast({
            message: '请输入正确的身份证号',
            position: 'middle',
            duration: 2000
          });
        }else if(this.agrcontent.agrTel == '' || !/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.agrcontent.agrTel)){
          Toast({
            message: '请输入正确的手机号',
            position: 'middle',
            duration: 2000
          });
        }else if(this.agrcontent.agrMailbox == '' || !/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(this.agrcontent.agrMailbox)){
          Toast({
            message: '请输入正确的邮箱',
            position: 'middle',
            duration: 2000
          });
        }else if(this.agrcontent.agrQq == '' ){
          Toast({
            message: '请输入QQ号',
            position: 'middle',
            duration: 2000
          });
        }else{
          for(var i = 0 ;i < this.courseBox.length;i++){
            if(this.courseBox[i].protocol != ""){
              this.agrArr.push({'courseName':this.courseBox[i].courseTitle,//课程名称
                'id':'',//网络协议id新增无
                'courseId':this.courseBox[i].courseId,//课程id
                'courseName':this.courseBox[i].courseTitle,//课程名称
                'username':'',//用户名
                'realName':this.agrcontent.agrUsername,//真实姓名
                'phone':this.agrcontent.agrTel,//电话
                'identityId':this.agrcontent.agrCardID,//身份证
                'email':this.agrcontent.agrMailbox,//邮箱
                'qq':this.agrcontent.agrQq,//qq
                'desciption':this.courseBox[i].protocol,//协议内容
                'title':this.courseBox[i].courseTitle + '协议',//协议名称
                'orderId':this.orderid,//订单id
                'userId':this.$route.query.userid,//用户id
              })
            };
          }
          this.axios.post('/api/party/agreement/v1/student/add', this.agrArr)
            .then(response => {
              if(response.data.status == "0"){
                for(var i = 0; i <response.data.data.length;i++){
                  this.studentId += response.data.data[i].studentId +','
                }
                this.default(this.orderid,this.studentId )
              }else {
                Toast({
                  message:   response.data.msg,
                  position: 'middle',
                });
              }
            }).catch(err => {
            console.log(err)
          })
        }
      },
      default(id,student){
        this.axios.post('/api/trade/order/v1/buy/edit/' + id, {
          orderCode: id,//订单号
          agreement:student
        })
          .then(response => {
            if (response.status == '200') {
              Toast({
                message: "协议签订成功",
                position: 'middle',
                duration: 2000
              });
              setTimeout(() => {
                this.$router.go(-1)
              },1000)
            } else {
              Toast({
                message: response.data.msg,
                position: 'middle',
              });
            }
          })
      },
      lookAgreement(title,content){
        this.control = false;
        this.xytitle = title+'协议';
        this.xyconter = content;
      },
      conReturn(){
        this.control = true;
      }
    },
    mounted(){
      this.curriculum()
    },

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-index{
    height:100%;
    background: #f4f4f4;
  }
.mint-field{
  border-bottom: 1px solid #e6e6e6;
}
  .pay-btn{
    margin: 0.4rem 0.2rem 0 0.2rem;
    border-radius: 8px;
    width: 7.1rem;
    height: 1.04rem;
    background: none;
    font-size: 0.30rem;
    background: #3acbae;
    color: #fff;
  }
.pay-tishi{
  padding: 0.2rem 0.2rem 0 0.2rem;
  line-height: 0.35rem;
  color: #999999;
}
  .pay-list{
    padding-top: 0.15rem;
    padding-left: 0.2rem;
    display: block;
  }
  .vip-agrsee{
    padding:0.2rem 0.2rem 0 0.2rem;
    line-height: 0.35rem;
    padding-top: 1rem;
    background: #f4f4f4;
  }
  .vip-agrsee .vip-agrsee-title{
    font-size: 0.28rem;
    color: #333;
    text-align: center;
    margin: 0.2rem 0 0.4rem 0;
  }
  .vip-agrsee div{
    color: #666666;
  }
</style>
