<template>
  <div>
    <div class="activity-top">
      <div class="activity-title fn-left">领券中心</div>
      <div class="fn-right activity-list" v-show="login">
        <ul>
          <li><router-link :to="{ path: '/login',query: {id: '/activity?'+this.myurl,zt:'/activity?'+this.myurl}}">登陆</router-link></li>
          <li><router-link :to="{ path: '/activityregister',query: {id: '/activity?'+this.myurl}}">注册</router-link></li>
        </ul>
      </div>
      <div class="fn-right activity-list" v-show="personal">
        <ul>
          <li><router-link :to="{ path: '/'}">首页</router-link></li>
          <li @click="outLine()">退出</li>
        </ul>
      </div>
    </div>
    <div class="activity">
      <div class="activity-card">
        <div class="fn-left card-left">
          <span v-if="couponType == '2'">￥</span>
          <span class="font-size">{{discount}}</span>
          <span v-if="couponType == '2'">元</span>
          <span v-if="couponType == '1'">折</span>
        </div>
        <div class="fn-right card-right">
          <p>剩余<span>{{activeSize}}</span>张</p>
          <p>{{activeType}}</p>
        </div>
        <div class="fn-clear"></div>
      </div>
      <div class="activity-conter">
        <p>使用条件：{{activeClass}}</p>
        <p>有效期：{{showtime}}至{{endtime}}</p>
        <p>使用范围：满{{satisfyMoney}}元可以使用</p>
      </div>
      <div class="activity-btn">
        <ul>
          <li class="btn"  v-if="classStatus !='2' && activeSize != '0' && timeShow != '1'" @click="activityBtn(activeId)">立即领取</li>
          <li class="btn" v-if="classStatus =='2'">
            <router-link v-if="ifcourse == '0'" :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研数学'}}">立即使用</router-link>
            <router-link v-if="ifcourse == '1'" :to="{ path: '/course/courseconter', query:{id:courseId}}">立即使用</router-link>
          </li>
          <li class="btn" v-if="this.timeShow == '1'">已过期</li>
          <li class="btn" v-if="this.activeSize == '0' && classStatus !='2'">已领完</li>
          <li><router-link :to="{ path: '/vip/coupon'}">查看我的优惠券</router-link></li>
        </ul>
        <div class="fn-clear"></div>
      </div>
      <div class="activity-foot">遇到问题请联系：400-856-9099</div>
    </div>
  </div>

</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    name: 'search',
    components:{
    },
    data () {
      return {
        login:false,
        personal:false,
        activeSize:'',
        activeClass:'',
        showtime:'',
        endtime:'',
        satisfyMoney:'',
        activeType:'',
        discount:'',
        timeShow:'',
        activeId:'',
        classStatus:'',
        couponType:'',
        ifcourse:'',
        courseId:'',
        myurl:'',
        square_json:{}
      }
    },
    methods:{
      add(m){
        return m<10?'0'+m:m
      },
      //获取用户id
      userIdBox() {
        this.axios.get('/api/party/user/v2/user/session', {})
          .then(response => {
            if(response.data.status == '0'){
              this.personal = true
            }else if(response.data.status != '0'){
              this.login = true
            }
          }).catch(err => {
          console.log(err)
        })
      },
      activityList(){
        this.myurl = window.location.search.split("?").join('');
        this.axios.get('/api/promotion/nologin/v1/pageView/getvolumeById?volumeId='+this.myurl)
          .then(response => {
            this.activeSize = response.data.data.size;//剩余张数
            this.ifcourse = response.data.data.ifcourse;
            if(response.data.data.ifcourse == '1'){
              this.activeClass = response.data.data.courseName;
              this.courseId = response.data.data.courseId
            }else if(response.data.data.ifcourse == '0') {
              this.activeClass ='无限制';
            }
            if(response.data.data.couponType == '1'){
              this.discount =  response.data.data.discount;
              this.activeType = '折扣券'
            }else if(response.data.data.couponType == '2'){
              this.discount =  response.data.data.preferentialMoney;
              this.activeType = '代金券'
            }
            this.couponType = response.data.data.couponType;
            //开始时间
            var showdate = new Date(response.data.data.startTime);
            var showyear = showdate.getFullYear();
            var showmonth = showdate.getMonth() + 1;
            var showday = showdate.getDate();
            this.showtime = showyear + '年' + this.add(showmonth) + '月' + this.add(showday) +'日' ;
            //结束时间
            var date = new Date(response.data.data.endTime);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            this.endtime = year + '年' + this.add(month) + '月' + this.add(day) +'日' ;
            this.satisfyMoney = response.data.data.satisfyMoney;//满足金额
            this.activeId = response.data.data.id;//优惠券id
            this.classStatus = response.data.status;//是否领过此券
            //判断是否过期
            var viptime = Date.parse(new Date());
            if(viptime > response.data.data.endTime){
              this.timeShow = '1'
            };
            //判断是否作废
            if(response.data.data.status == '2'){
              this.timeShow = '1'
            };
          })
          .catch(err => {
            console.log(err)
          })
      },
      activityBtn(id){
        this.axios.get('/api/promotion/nologin/v1/pageView/rollCollar?volumeId='+id)
          .then(response => {
            if(response.data.status == '888'){
              this.$router.push({path: '/login', query: {id: '/activity?'+this.myurl}})
            }else if(response.data.status == '-1'){
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 1000
              });
            }else if(response.data.status == '0'){
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 1000
              });
              window.location.reload();
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      outLine(){//退出接口
        this.axios.get('/api/party/user/v2/user/logout',{
          credentials: 'include',
        })
          .then(response => {
            if(response.data.status == "0"){
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 1000
              });
              this.$router.push({path: '/'})
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      iosLogin(){
        var password = this.$route.query.urlId;//密码
        var username = this.$route.query.lwId;//用户名
        var wxId = this.$route.query.wxId;//用户名
        var wbId = this.$route.query.wbId;//用户名
        var qqId = this.$route.query.qqId;//用户名
        if(username){
          password = Base64.decode(password);
          username = Base64.decode(username);
          username = username.substring(5,16);
          password = password.substring(6,password.length-9);
          this.ios(username,password);
        }else if(qqId){
          this.square_json = {
            routingPorts: "H5",
            'qqId': qqId,
            'wxId': '',
            'wbId': ''
          };
          this.square()
        }else if(wxId){
          this.square_json = {
            routingPorts: "H5",
            'qqId': '',
            'wxId': wxId,
            'wbId': ''
          };
          this.square()
        }else if(wbId){
          this.square_json = {
            routingPorts: "H5",
            'qqId': '',
            'wxId': '',
            'wbId': wbId
          };
          this.square()
        }
      },
      ios(username,password){
        this.axios.post('/api/party/nologin/v2/user/login?routingPorts=H5&code='+this.$route.query.code, {
          username:username,
          password:password,
          businessId:'1001',
        })
          .then(response => {
            if(response.data.status == "0"){
              this.personal = true;
              this.login = false;
            }else{
              this.personal = false;
              this.login = true;
            }

          })
          .catch(err => {
            console.log(err)
          })
      },
      square(){
        this.axios.post('/api/party/nologin/v2/user/logins?end=h5&routingPorts=H5',this.square_json)
          .then(response => {
            if(response.data.status == "0"){
              if(response.data.status == "0"){
                this.personal = true;
                this.login = false;
              }else{
                this.personal = false;
                this.login = true;
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      /*判断当前设备跳转到指定地址。PCurl:PC端地址；WebUel:PC端地址；*/
      MBjudgment(PCurl){
        var UserClient = navigator.userAgent.toLowerCase();
        var IsIPad = UserClient.match(/ipad/i) == "ipad";
        var IsIphoneOs = UserClient.match(/iphone os/i) == "iphone os";
        var IsMidp = UserClient.match(/midp/i) == "midp";
        var IsUc7 = UserClient.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var IsUc = UserClient.match(/ucweb/i) == "ucweb";
        var IsAndroid = UserClient.match(/android/i) == "android";
        var IsCE = UserClient.match(/windows ce/i) == "windows ce";
        var IsWM = UserClient.match(/windows mobile/i) == "windows mobile";
        if(IsIPad || IsIphoneOs || IsMidp || IsUc7 || IsUc || IsAndroid || IsCE || IsWM){

        }else{
          window.location.href = PCurl;
        }
      }
    },
    mounted(){
      this.myurl = window.location.search.split("?").join('');
      this.userIdBox();
      this.activityList();
      this.iosLogin();
      this.MBjudgment('http://www.iqihang.com/activity?'+this.myurl)
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .activity-top{
    width: 100%;
    height: 1rem;
    background: #3acbae;
    color: #fff;
    position: absolute;
    top:0;
    left: 0;
    padding: 0 .2rem;
  }
  .activity-title{
    color: #fff;
    line-height: 1rem;
  }
  .activity-list li{
    float: left;
    line-height: 1rem;
    margin-left: .3rem;
    color: #fff;
  }
  .activity-list li a{
    color: #fff;
  }
  .activity{
    margin-top: 1rem;
    padding-top: 1.5rem;
  }
  .activity-card{
    width:7.12rem;
    height: 2.35rem;
    background: url("../vip/vipImg/vip-coupon.png") no-repeat;
    background-size: cover;
    margin: 0 auto;
  }
  .activity-foot{
    padding-top: 1.5rem;
    text-align: center;
  }
  .card-left{
    width: 4.8rem;
    text-align: center;
    height: 2.35rem;
    line-height: 2.35rem;
  }
  .card-left span{
    color: #fff;
  }
  .font-size{
    font-size: 1rem;
    color: #fff;
  }
  .card-right{
    width: 2.32rem;
    text-align: center;
    line-height: .5rem;
    padding-top: .8rem;
  }
  .card-right p{
    color: #fff;
  }
  .card-right span{
    color: #fff000;
    padding: 0 .1rem;
  }
  .activity-conter{
    padding:.2rem;
    line-height: .5rem;
  }
  .activity-btn{
    width: 7rem;
    margin: 0 auto;
    clear: both;
  }
  .activity-btn li{
    width: 3.3rem;
    height: .8rem;
    line-height: .8rem;
    float: left;
    margin: .1rem;
    text-align: center;
  }
  .activity-btn li:last-child{
    background: #fff;
    border: 1px solid #d34a4a;
    border-radius: .1rem;
  }
  .activity-btn li a{
    color: #d34a4a;
  }
  .btn{
    background: #d34a4a;
    color: #fff;
    border-radius: .1rem;
  }
  .activity-btn li.btn a{
    width: 3.3rem;
    height: .8rem;
    color: #fff;
    display: inline-block;
  }
</style>


