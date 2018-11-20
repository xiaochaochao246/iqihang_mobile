<template>
  <div >
    <div class="activity-top">
      <div class="activity-title fn-left">全网通VIP介绍</div>
      <div class="vipclass" >
        <select id="city" class="select" v-model="seval" @change="choose()" name="sele">
          <option value="--请选择VIP等级--" :selected="index == 0">--请选择VIP等级--</option>
          <option :value="tmp._source.type_vip_id" v-for="(tmp,index) in vipAll" :key="index">{{tmp._source.type_vip_vipGrade}}</option>
        </select>
      </div>
      <div class="vipins">
          <p>{{vipDes}}</p>
          <p>{{vipPrice}}</p>
          <p>{{vipStart}}</p>
          <p>{{vipEnd}}</p>
          <p>{{kc}}</p>
      </div>
      <button @click="login()" class="paynow" >立即开通VIP</button>
    </div>
    <div class="popup" v-show="popupIf">
      <div class="popup-ct">
        <div class="zf_title">
            <p>支付费用</p>
            <a href="#" @click="close()">X</a>
        </div>
        <div class="zf_center">
          <!--<div class="zfb">
              <img src="./acimg/pay-zfb.png" alt="">
              <button><input type="radio"  name="money" :class="{ 'active' : isA, '': !isA}" checked @click='toggle' v-show="isShow" />支付宝支付</button>
          </div>
          <div class="wx">
              <img src="./acimg/pay-wx.png" alt=""> 
              <button><input type="radio"  name="money" :class="{ 'active' : isB, '': !isB}" @click='toggleB' />微信支付</button>
          </div>-->
           <ul class="zfall">
              <li :class="{ 'active' : isA, '': !isA}" @click='toggle' ><img src="./acimg/pay-zfb.png"/><b>支付宝</b><span></span></li>
              <li :class="{ 'active' : isB, '': !isB}" @click='toggleB'><img src="./acimg/pay-wx.png"/><b>微信</b><span></span></li>
            </ul>
            <p class="totalprice">应付金额：{{vipPrice1}}</p>
            </br>
            <div class="payn">
                <button @click="purchase()" >立即支付</button>
            </div>
        </div>
      </div>
    </div>
    <div class="weipayment" v-show="weipayment">
      <div class="weipayment-ct">
        <p>请确认微信支付是否完成</p>
        <button @click="paymentTure">已完成支付</button>
        <button @click="paymentFalse">支付遇到问题，重新支付</button>
      </div>
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
        userId:'',
        popupIf:false,
        paymentTmpurl:'',
        weipayment:'',
        payment:'',
        mwebUrl:'',
        isShow:true,
        isA: true,//控制支付方式
        isB:false,//控制支付方式,
        vipClass:[],
        vipName:[],
        vipDes:'',
        vipStart:'',
        vipEnd:'',
        vipPrice:'',
        vipPrice1:'',
        vipId:[],
        vipAll:[],
        // vipId1:'',
        kc:'',
        seval:'--请选择VIP等级--'
      }
    },
    methods:{
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
      },
      login(){
        this.axios.get(`/api/party/user/v2/user/session`, {
        })
          .then(response => {
           console.log(response);
            if (response.data.status == "888"){
              this.$router.push({path: '/login',query: {id: "vipact"}})
            }else{
              this.userId = response.data.data.userId;
              if(response.data.data.vip !== null && response.data.data.vip.indexOf('vip') == '0'){
                
                this.popupIf = false;
                Toast({
                  message: '已购买,请买课',
                  position: 'middle',
                  duration: 2000
                });
                setTimeout(()=>{
                    this.$router.push({ path: '/course',query: {course:'考研公共课'}});
                  
                    // this.MBjudgment('http://mobile.iqihang.com/course?course=考研公共课');
                },2000)
              }else{
                this.popupIf = true;
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      toggle() {//控制支付方式
        this.isB = false;
        this.isA = true;
        this.payment = '1'
      },
      toggleB() {//控制支付方式
        this.isB = true;
        this.isA = false;
        this.payment = '2'
      },
      close(){
        this.popupIf = false;
      },
      purchase(){//创建订单
        this.axios.get(`/api/party/user/v2/user/session`, {
        })
          .then(response => {
            console.log(response);
            console.log(this.vipId1);
            if (response.data.status == "888"){
              this.$router.push({path: '/login',query: {id: "vipact"}})
            }else{
              this.axios.get('/api/party/sysvip/v1/viporser?id='+this.vipId1+'&device=h5', {})
                .then(response => {
                    console.log(response);
                  if (response.data.data.status == '0') {
                    this.orderCode = response.data.data.data.orderCode;//订单创建成功
                    let tmpurl = `http://mobile.iqihang.com/vipact%3Fo=${this.orderCode}`;
                    this.paymentTmpurl = tmpurl;
                    this.pay(this.payment,response.data.data.data.orderCode,tmpurl)
                  } else{
                    this.popupIf = false;
                    Toast({
                      message: response.data.data.msg,
                      position: 'middle',
                      duration: 2000
                    });
                    // setTimeout(()=>{
                    //     this.$router.push({ path: '/course',query: {course:'考研公共课'}});
                    //     // this.MBjudgment('http://mobile.iqihang.com/course?course=考研公共课');
                    // },2000)
                  }
                })
                // this.axios.get('/es/index_vip/type_vip/_search',{
                //       "query": {
                //       "bool": {
                //           "must": [
                //                   {
                //                       "term": {
                //                           "type_vip_id": "4028488a61dbb3270161dbb565b70000"
                //                       }
                //                   }
                //                 ],
                //           "must_not": [ ],
                //           "should": [ ]
                //           }
                //       },
                //     "from": 0,
                //     "size": 10,
                //     "sort": [ ],
                //     "aggs": { }
                // })
                  // .then(response=>{
                  //   console.log(response);
                  // })
                .catch(err => {
                  console.log(err)
                })
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      pay(zflx,code,hdurl){//立即支付
        let _this = this;
        if(zflx == '1'){//支付宝支付
          this.axios.get(`/api/trade/pay/v1/payRequest/2/h5/${code}?returnUrl=${hdurl}`, {
          })
            .then(response => {
              if(response.data.status == '0'){//支付宝支付
                document.writeln(response.data.msg)
              }else if(response.data.status == '8'){//余额支付
//                this.$router.push({ path: '/payment/paymenttrue',query: {order: code}})
                _this.popupIf = false;
                Toast({
                  message: '购买成功',
                  position: 'middle',
                  duration: 2000
                });
                setTimeout(()=>{
                        this.$router.push({ path: '/course',query: {course:'考研公共课'}});
                    // this.MBjudgment('http://mobile.iqihang.com/course?course=考研公共课');
                },2000)
              };
            })
            .catch(err => {
              console.log(err)
            })
        }else if(zflx == '2'){//微信支付
          let ua = window.navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.axios.get(`/api/trade/pay/v1/payRequest/1/JSAPI/${code}?code=`, {    //+code
            })
              .then(response => {
                if (response.data.status == '888') {
                  this.$router.push({path: '/login'})
                } else if (response.data.status == '8') {//余额支付
                  _this.popupIf = false;
//                  this.$router.push({path: '/payment/paymenttrue', query: {order: this.orderCode}})
                  Toast({
                    message: '购买成功',
                    position: 'middle',
                    duration: 2000
                  });
                  setTimeout(()=>{
                    this.$router.push({ path: '/course',query: {course:'考研公共课'}});
                      // this.MBjudgment('http://mobile.iqihang.com/course?course=考研公共课');
                  },2000)
                } else {
                  this.wxpayparams = response;
                  this.wxpay();
                }
              });
          }else{
            this.axios.get(`/api/trade/pay/v1/payRequest/1/h5/${code}`, {
            })
              .then(response => {
                if(response.data.status == '888') {
                  this.$router.push({path: '/login'})
                }else if(response.data.status == '8'){//余额支付成功
                  _this.popupIf = false;
//                  this.$router.push({ path: '/payment/paymenttrue',query: {order: code}});
                  Toast({
                    message: '购买成功',
                    position: 'middle',
                    duration: 2000
                  });
                  setTimeout(()=>{
                      this.$router.push({ path: '/course',query: {course:'考研公共课'}});
                      // this.MBjudgment('http://mobile.iqihang.com/course?course=考研公共课');
                  },2000)
                }else {//调用三方支付
                  this.mwebUrl = response.data.data.mweb_url;
                  window.location.href =  response.data.data.mweb_url + `&redirect_url=${hdurl}`;
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        }else {
          alert(response.data.msg)
        }
      },
      wxpay()
      {
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', this.jsApiCall(), false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', this.jsApiCall());
            document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall());
          }
        }else{
          this.jsApiCall();
        }
      },
      jsApiCall(){
        let _this = this;
        let response = this.wxpayparams;
        let orderCode = this.orderCode;
        let _router = this.$router;
        WeixinJSBridge.invoke('getBrandWCPayRequest',{
          "appId" : response.data.data.appId,
          "timeStamp" :response.data.data.timeStamp,
          "nonceStr" : response.data.data.nonceStr,
          "package" :response.data.data.package,
          "signType" : "MD5",
          "paySign" : response.data.data.sign},function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok"){//支付成功
//            _router.push({ path: '/payment/paymenttrue',query: {order: orderCode}});
            _this.popupIf = false;
            Toast({
              message: '购买成功',
              position: 'middle',
              duration: 2000
            });
            // setTimeout(()=>{
            //     this.$router.push({ path: '/course',query: {course:'考研公共课'}});
            //     // this.MBjudgment('http://mobile.iqihang.com/course?course=考研公共课');
            // },2000)
            window.location.href = 'http://mobile.iqihang.com/course?course=考研公共课';
          }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
            _this.popupIf = false;
            Toast({
              message:  '支付失败,余额不足',
              position: 'middle',
              duration: 1000
            });
          }
        });
      },
      paymentTure(){//弹窗确定支付成功
        // alert("1tiao");
        this.Liar = '1';
        this. paymentStatus(this.$route.query.o);
        this.$router.push({ path: '/course',query: {course:'考研公共课',order: o}});
      },
      paymentFalse(){//弹窗确定支付失败
      // alert("2tiao");
        this.pay('2',this.$route.query.o,this.paymentTmpurl)
      },
      paymentStatus(o){      //支付状态
        this.axios.get(`/es/order/f/`+o, {
        })
          .then(response => {
            // alert("4tiao");
            Toast({
              message: '支付中请稍后',
              position: 'middle',
              duration: 1000
            });
            setTimeout(() => {
              if(response.data._source.f_status == '3'){//支付成功
//                this.$router.push({ path: '/payment/paymenttrue',query: {order: o}});
                // this.$router.push({ path: '/vipact',query: {order: o}});
                // alert("3tiao");
                this.$router.push({ path: '/course',query: {course:'考研公共课'}});
              // this.$router.push({ path: '/course',query: {id: "vipact",course:考研公共课,order: o}});
                
              }else{
                this.toggleB();
                this.weipayment = true;
                if(this.Liar == '1') {
                  alert("未支付,请重新支付!")
                }
              }
            },1000)
          })
          .catch(err => {
            console.log(err)
          })
      },
      weixin() {
        let ua = window.navigator.userAgent.toLowerCase()
        //alert(ua);
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          // 隐藏 支付宝 标签
          this.isShow = false;
          this.toggleB();
        }else{
          this.isShow = true;
          this.toggle();
        }
      },
      getall(){
        this.axios.get('/es/index_vip/type_vip/_search',
          {

            "query": {
                "bool": {
                    "must": [
                        {
                            "match_all": { }
                        }
                    ],
                    "must_not": [ ],
                    "should": [ ]
                }
            },
            "from": 0,
            "size": 10,
            "sort": [ ],
            "aggs": { }

          }
        ).then(res=>{
          console.log(res);
          let vipall = res.data.hits.hits;
          
          for(var i = 0;i<vipall.length;i++){
            let vipone = vipall[i]._source.type_vip_vipGrade;
            let vipid = vipall[i]._source.type_vip_id;
            this.vipClass.push(vipone);
            this.vipId.push(vipid);
            this.vipAll.push(vipall[i]);
          }
          console.log(this.vipClass,this.vipId,this.vipAll);
          this.seval = document.getElementById("city").options[0].value;
          
        })
      },
      gettime(time){
        var m = new Date(time);
        var h = m.getHours();
        if(h<10){h = '0'+ h}else{h = h};
        console.log(h);
        var m1 = m.getMinutes();
        if(m1<10){m1 = '0'+ m1}else{m1 = m1};
        var s = m.getSeconds();
        if(s<10){s = '0'+ s}else{s = s};
        var youWant = m.getFullYear() + '-' + (m.getMonth() + 1) + '-' + m.getDate() + ' ' + h + ':' + m1 + ':' + s;
        // return youWant;
        console.log(youWant);
        // time ==  ;
        return youWant;
        // return youWant;
      },
      choose(){
        var index = document.getElementById('city').selectedIndex;
        var val =document.getElementById("city").options[index].value;

        this.seval = val;
        console.log(val);
        this.axios.get('/es/index_vip/type_vip/'+val).then(res=>{
          console.log(res);
          let vipidss = res.data._source;
          this.vipDes = '描述：'+vipidss.type_vip_vipDescribe;
          this.vipStart = '开始时间：'+this.gettime(vipidss.type_vip_vipStart);
          console.log(this.vipStart);
          this.vipEnd = '结束时间：'+this.gettime(vipidss.type_vip_vipEnd);
          this.vipPrice = '价格：¥' + vipidss.type_vip_vipPrice;
          this.vipPrice1 =  vipidss.type_vip_vipPrice;
          this.vipId1 = vipidss.type_vip_id;
          this.kc = '享受权限：'+vipidss.type_vip_vipCurriculumName;

        })
      }
    },
    
    mounted(){
      this.getall();
      this.myurl = window.location.search.split("?").join('');
      this.MBjudgment('http://www.iqihang.com/activity?'+this.myurl);
      if ("undefined" != typeof  this.$route.query.o){//判断是否支付失败,如果支付失败就停留在当前页面,如果成功就到支付成功页面
      // alert("5tiao");
        this.paymentStatus(this.$route.query.o);
      }
      this.weixin();
    },
  
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .activity-top{
    width: 100%;
    height: 100%;
    background: #fff;
    color: #fff;
    position: absolute;
    top:0;
    left: 0;
    padding: 0 .2rem;

  }
  .activity-title{
    color: #0000ff;
    line-height: 1rem;
    text-align: center;
    margin: 0 auto;
    margin-left: 25%;
    font-size: .5rem;
    margin-bottom:.5rem;
    margin-top:.8rem;
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
  .popup{
    position: fixed;
    top: 0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,.5);
  }
  .popup-ct{
    background: #fff;
    position: absolute;
    top: 25%;
    left: 10%;
    height: 7rem;
    width: 80%;
  }
  ul.zfall>li>img{
   width:1rem;
  margin-right:.8rem;
  margin-left:.3rem;
  }
   ul.zfall>li{
     font-size:.3rem;
     margin-bottom:.3rem;
     position:relative;
   }
  ul.zfall>li>b{
   position: absolute;
    top: 30%;
    font-size: .4rem;
    font-weight: normal;
    }
  ul.zfall>li>span{
    margin-right:.3rem;
  }
  .popup-ct>.zf_title>div>p{
   font-size:.3rem;
   padding-top:.3rem;
   font-size:.4rem;
  }
  .popup-ct>.zf_title>a{
    position:absolute;
    top:10%;
    right:5%;
  }
  .popup-ct>.zf_center>.zfb,.popup-ct>.zf_center>.wx{
    margin-left: .5rem;
  }
  .zf_title{
    text-align:center;
  }
  .zf_title p{
    font-size: .4rem;
    margin-top: .6rem;
  }
  .zfb,.wx{
    position:relative;
    margin-bottom:.4rem;
  }
  .zf_center{
    margin-top: .5rem;
  }
  .zfb button,.wx button{
    color:#169bdf;
    position:absolute;
    top:34%;
    background:#fff;
    margin-left:.5rem;
  }
  
  
  .totalprice{
    width:3rem;
    height:.8rem;
    border-radius:.1rem;
    color:#ff0000;
    font-size:.3rem;
    margin-left:.5rem;
    margin-top: .3rem;
  }
  .weipayment{
    position: fixed;
    top:0;
    left: 0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,.5);
    z-index: 9999;
  }
  .weipayment-ct{
    width:80%;
    height:3.5rem;
    background: #fff;
    margin: 0 auto;
    margin-top: 3.5rem;
  }
  .vipclass{
    margin-top: 1rem;
    text-align: left;
    margin-left: 1.5rem;

  }
  .vipclass .select{
    background: #169bd5;
    width: 4rem;
    height: .6rem;
    color: #fff;
    font-size: .4rem;
  }
  .vipins{
    margin-top: 1rem;
    text-align: left;
    margin-left: 1.5rem;
  }
  .vipins p {
    font-size:.38rem;
    margin-bottom:.3rem;
    color:#169bd5;
  }
  .paynow{
    position:absolute;
    bottom:2rem;
    left:23%;
    border-radius:.2rem;
    width:4rem;
    height:.8rem;
    background:#169bd5;
    color:#fff;
  }
  .payn{
    width:100%;
    text-align:center;
  }
  .payn button{
    width: 2.5rem;
    height: .8rem;
    border-radius: .2rem;
    background:#ff6600;
    color:#fff;
  }
  ul.zfall span{
  background: url("./../payment/paymentImg/pay-radioFalse.png");
  background-size: 0.52rem 0.52rem;
  width:0.52rem;
  height:0.52rem;
  float: right;
  margin-top: 0.06rem;
}
.zfall .active span{
  background: url("./../payment/paymentImg/pay-radio.png");
  background-size: 0.52rem 0.52rem;
  width:0.52rem;
  height:0.52rem;
}
</style>


