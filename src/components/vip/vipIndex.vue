<template>
  <div class="vip-index">
    <div class="vip-index-hd">
      <div class="vip-index-hd-tp">
        <router-link :to="{path:'/vip/information'}">
        <div class="vip-index-hd-lf">
          <img :src=" headImg " @click="information()">
        </div>
        </router-link>
        <router-link :to="{path:'/vip/information'}">
        <div class="vip-index-hd-ct">
          <p class="vip-name" @click="information()">{{ username }}</p>
          <p class="vip-nameTitle" @click="information()">{{ usermoney }}</p>
        </div>
        </router-link>
        <div class="vip-index-hd-rt">
          <button v-show="judgeState" @click="outLine()">退出登录</button>
          <router-link :to="{path:'/login',query: {id: 'vip'}}" tag="button" v-show="!judgeState">立即登录</router-link>
        </div>
      </div>
      <div class="vip-index-hd-bm">
        <ul>
          <li class="fn-relative" @click="usernews()"><img src="./vipImg/vip-news.png">消息<span v-show="badge"></span></li>
          <li @click="receipt()"><img src="./vipImg/vip-address.png">收货地址</li>
          <router-link :to="{path:'/vip/down'}"><li><img src="./vipImg/vip-cache.png">APP下载</li></router-link>
        </ul>
      </div>
    </div>
    <div class="vip-index-ct">
      <div class="vip-index-ct-order">
        <div class="vip-index-ct-title">
          <img src="./vipImg/vip-oerder.png">
          订单中心
        </div>
        <div class="vip-index-ct-list">
          <li v-for="(item,index) in order"  @click="listEvent(index)"><img :src="item.imgSrc"><p>{{item.name}}</p></li>
        </div>
      </div>
    </div>
    <div class="vip-index-ct">
      <div class="vip-index-ct-order">
        <div class="vip-index-ct-title">
          <img src="./vipImg/vip-common.png">
          常用功能
        </div>
        <div class="vip-index-ct-list">
          <li v-for="(item,index) in common" @click="listTwoEvent(index)"><img :src="item.imgSrc">{{item.name}}</li>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div>
      <div style="height: 1rem"></div>
      <footerbt :srconeC="srconeC" :srconeA=" srconeA " :srconeB=" srconeB " :srconeD=" srconeD " :srconeE=" srconeE "></footerbt>
    </div>
  </div>

</template>
<script>
import PublicHeader from '@/components/public/header'
import { Toast } from 'mint-ui'
import footerbt from '@/components/public/foot'
export default {
  name: 'loginIndex',
  components:{
    PublicHeader,
    footerbt
  },
  data () {
    return {
      srconeA:require("../public/publicimg/foot-icon1.png"),
      srconeB:require("../public/publicimg/foot-icon2.png"),
      srconeC:require("../public/publicimg/foot-icon3.png"),
      srconeD:require("../public/publicimg/foot-icon4.png"),
      srconeE:require("../public/publicimg/foot-icon15.png"),
      badge: false,  // 站内信
      username:'请登录',//用户名
      userId:'',//用户id
      headImg:require('./vipImg/vip-pic.png'),//头像
      usermoney:'登录后可购课离线缓存学习',//余额
      judgeName:'',//登录后的用户名,用来判断是否登录的
      judgeState:false,//判断按钮是登录还是退出
      isShow:false,//判断是否有未读消息
      message:'',//未读消息数量
      order:[{
        name:'我的订单',
        imgSrc:require('./vipImg/vip-tp1.png')
      },{
        name:'优惠券',
        imgSrc:require('./vipImg/vip-tp2.png')
      },{
        name:'课程卡激活',
        imgSrc:require('./vipImg/vip-tp3.png')
      }],
      common:[{
        name:'我的协议',
        imgSrc:require('./vipImg/vip-tp5.png')
      },{
        name:'我的购物车',
        imgSrc:require('./vipImg/vip-tp10.png')
      },{
        name:'我的收藏',
        imgSrc:require('./vipImg/vip-tp12.png')
      },{
        name:'账户信息',
        imgSrc:require('./vipImg/vip-tp7.png'),
      },{
        name:'客服咨询',
        imgSrc:require('./vipImg/vip-tp4.png')
      },{
        name:'修改密码',
        imgSrc:require('./vipImg/vip-tp13.png')
      }],
    }
  },
  methods:{
    judge(){//获取用户名头像余额
      this.axios.get(`/api/party/user/v2/user/session`, {
      })
        .then(response => {
          if (response.data.status == "0"){
            if(response.data.data.realName){
              this.username = response.data.data.realName
            }else {
              this.username = response.data.data.username;//用户id
            }
            if(response.data.data.headImg){
              this.headImg=response.data.data.headImg;
            }
            this.usermoney = "余额：￥"+response.data.data.money;
            this.judgeState = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    information(){//个人信息页面
      this.judgeJogin()
//      this.$router.push({path: '/retrieve'})
    },
    unreadMessage(){//站内信未读消息
      this.axios.get('/api/party/user/v2/user/session')
        .then(response => {
          if(response.data.data == 0){
            this.isShow = false
          }else if(response.data.data < 99){
            this.message = response.data.data
            this.isShow = true
          }else {
            this.message = '99+';
            this.isShow = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    usernews(){//消息跳转
      this.judgeJogin('/vip/news');
    },
    receipt(){//收货地址
      this.judgeJogin('/vip/order');
    },
    listEvent(index){//循环判断点击li进行不同时间
      switch(index)
      {
        case 0:
          this.judgeJogin('/vip/order');
          break;
        case 1:
          this.judgeJogin('/vip/coupon');
          break;
        case 2:
          this.judgeJogin('/vip/card');
          break;
      }
    },
    listTwoEvent(index){
      switch(index)
      {
        case 0:
          this.judgeJogin('/vip/agreement')
          break;
        case 1:
          this.judgeJogin('/vip/shopping');
          break;
        case 2:
          this.judgeJogin('/vip/collection');
          break;
        case 3:
          this.judgeJogin('/vip/information');
          break;
        case 4:
          window.location.href = 'http://z1-pcok6.kuaishangkf.com/bs/im.htm?cas=117637___109813&fi=120093&ism=1'
          break;
        case 5:
          this.judgeJogin('/vip/password');
          break;
      }
    },
    judgeJogin(url){//判断用户有没有登录
      this.axios.get(`/api/party/user/v2/user/session`, {
      })
        .then(response => {
          if (response.data.status == "888"){
            this.$router.push({path: '/login',query: {id: "vip"}})
          }else{
            this.userId = response.data.data.userId;
            this.$router.push({path: url,query:{id:this.userId}})
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
            this.judgeState = false;
            this.headImg = require('./vipImg/vip-pic.png');
            this.username = "请登录";
            this.usermoney = "登录后可购课离线缓存学习";
            this.isShow = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 站内信
    messageFunc(){
      this.axios.get('/api/party/user/v2/user/session')
      .then( res => {
        if(res.status == 200 && res.data.status !== '888' && res.data.data.messageNum === '1'){
          this.badge = true;
          return;
        }
      })
      .catch( err => {
        console.log(err)
      })
    },
  },
  mounted(){
    this.judge(),
    this.unreadMessage()
    this.messageFunc()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip-index{
  height:100%;
  background: #f4f4f4;
}
.vip-index-hd{
  height:2.9rem;
  width:100%;
  background: #3acbae;
}
.vip-index-hd-tp{
  height:1.46rem;
  padding: 0.35rem 0.3rem 0 0.38rem;
  overflow: hidden;
}
.vip-index-hd-lf{
  float: left;
  width:1.1rem;
  height:1.1rem;
  background: #fff;
  border-radius: 50%;
  justify-content:center;
  align-items:center;
  display:-webkit-flex;
}
.vip-index-hd-lf img{
  width:0.99rem;
  height:0.99rem;
  border-radius: 50%;
}
.vip-index-hd-ct{
  float: left;
  width:4rem;
  margin-left: 0.25rem;
}
.vip-name{
  padding-top: 0.19rem;
  color: #fff;
  font-size: 0.28rem;
  width:3rem;
  display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.vip-nameTitle{
  color: #a6e7da;
  padding-top: 0.22rem;
}
.vip-index-hd-rt{
  width:1.4rem;
  height:1.1rem;
  justify-content:center;
  align-items:center;
  display:-webkit-flex;
}
.vip-index-hd-rt button{
  width:auto;
  padding: 0 0.1rem 0 0.1rem;
  height:0.65rem;
  display: block;
  border:1px solid #7bddc9;
  background: none;
  border-radius: 4px;
  color: #f9fdfc;
}

  .vip-index-hd-bm{
    width:100%;
    padding-top: 0.55rem;
    overflow: hidden;
  }
  .vip-index-hd-bm li{
    height:0.47rem;
    float: left;
    width:33%;
    font-size: 0.3rem;
    color: #fff;
    justify-content:center;
    align-items:center;
    display:-webkit-flex;
    border-right: 2px solid #a1e8d8;
  }
.vip-index-hd-bm li img{
  margin-right: 0.1rem;
}
.vip-index-hd-bm li:nth-last-child(1){
  border:none;
}
  .vip-index-hd-bm li:nth-child(1) img{
    width:0.4rem;
    height:0.4rem;
  }
.vip-index-hd-bm li:nth-child(2) img{
  width:0.42rem;
  height:0.33rem;
}
.vip-index-hd-bm li:nth-child(3) img{
  width:0.43rem;
  height:0.38rem;
}
.vip-index-hd-bm li span{
  width:0.2rem;
  height:0.2rem;
  border-radius: 50%;
  background: #ff0000;
  color: #fff;
  text-align: center;
  line-height: 0.3rem;
  position: absolute;
  left: 25%;
  top:-3px;
}
  .vip-index-ct{
    width:100%;
    background: #fff;
  }
  .vip-index-ct-order{
    margin-top: 0.2rem;
  }
  .vip-index-ct-title{
    padding-left: 0.22rem;
    overflow: hidden;
    line-height: 0.42rem;
    height:0.78rem;
    padding-top: 0.2rem;
    font-size: 0.3rem;
    color: #000;
  }
  .vip-index-ct-title img{
    width:0.42rem;
    height:0.42rem;
    float: left;
    margin-right: 0.18rem;
  }
  .vip-index-ct-list{
    overflow: hidden;
  }
.vip-index-ct-list li{
  float: left;
  width:33.3%;
  height:2rem;
  border-top:1px solid #f4f4f4;
  border-right:1px solid #f4f4f4;
  text-align: center;
}
  .vip-index-ct-list li img{
    width:0.55rem;
    height:0.55rem;
    display: block;
    margin: 0.48rem auto 0.2rem;
  }
.vip-index-ct-list li p{
  font-size: 0.28rem;
}
</style>
