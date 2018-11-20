<template>
  <div class="login-index">
    <!--订单页面-->
    <div v-show="orderstat == '1'">
      <public-header :htitle="htitleText"></public-header>
      <div class="pay-tp">课程清单</div>
      <div class="pay-course-list" v-for="item in courseBox">
        <img :src="item.courseImg">
        <div class="pay-course-list-rt">
          <p>{{item.courseTitle}}</p>
          <span>有效期：{{item.courseTime}}</span>
        </div>
      </div>
      <div class="pay-paument-list-pad"></div>
      <div class="pay-paument-list">
        <div class="pay-paument-list-div" v-show="agreementY">
          <div class="pay-paument-list-div-a">
            <span>签订网络协议</span>
            <img src="./vipImg/vip-right.png">
          </div>
          <div class="pay-paument-list-agr" v-show="agreementinf">
            <ul>
              <li>姓名：{{agrcontent.agrUsername}}</li>
              <li>身份证号码：{{agrcontent.agrCardID}}</li>
              <li>手机号：{{agrcontent.agrTel}}</li>
              <li>电子邮箱：{{agrcontent.agrMailbox}}</li>
              <li>QQ号：{{agrcontent.agrQq}}</li>
            </ul>
          </div>
          <div class="pay-paument-list-pad"></div>
        </div>
        <div class="pay-paument-list-div pay-paument-list-pay">
          <div class="pay-paument-list-div-b">
            <span>支付方式</span>
          </div>
          <ul>
            <li :class="{ 'active' : isA, '': !isA}" @click='toggle' v-show="isShow"><img src="../payment/paymentImg/pay-zfb.png"/>支付宝<span></span></li>
            <li :class="{ 'active' : isB, '': !isB}" @click='toggleB'><img src="../payment/paymentImg/pay-wx.png"/>微信<span></span></li>
          </ul>
          <div class="pay-paument-list-pad"></div>
        </div>
        <div class="pay-paument-list-div">
          <div class="pay-paument-list-div-a" @click="ordercontrol">
            <span>购课券</span>
            <img src="./vipImg/vip-right.png">
            <i>{{discount}}</i>
          </div>
          <div class="pay-paument-list-pad"></div>
        </div>
        <div class="pay-paument-list-div">
          <router-link :to="{ path: '/payment/service'}">
            <div class="pay-paument-list-div-a">
              <span>客服人员</span>
              <img src="./vipImg/vip-right.png">
              <i>{{teacherName}}</i>
            </div>
          </router-link>
          <div class="pay-paument-list-pad"></div>
        </div>
      </div>
      <div class="pay-paument-botton">
        <div class="pay-paument-botton-tp">
          <span>数量：<i>{{number}}</i></span>
          <span>总金额：<i>￥{{sum}}</i></span>
          <span>优惠：<i>￥{{preferential}}</i></span>
        </div>
        <div class="shop-bottom">
          <p>还需支付：<span>￥{{totalPrice}}</span></p>
          <button @click="ordersub">提交订单</button>
        </div>
      </div>
    </div>
    <!--购物劵页面-->
    <div v-show="orderstat == '2'">
      <public-header :htitle="htitleTexta"></public-header>
      <div v-show="choicef">
        <div class="choice-ct">
          <div class="pay-paument-list-div">
            <div class="pay-paument-list-div-a" @click="choicestate">
              <span>我的购课券</span>
              <img src="./vipImg/vip-right.png">
            </div>
          </div>
          <div class="pay-paument-list-div">
            <div class="pay-paument-list-div-a pay-paument-list-div-c">
              <span>购课券编码：</span>
              <input type="text" placeholder="请输入购课券编码" v-model="choicenum"/>
              <button @click="choiceact">激活</button>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!choicef">
        <div class="order-tab">
          <ul>
            <li :class="cardStart === true  ? 'active':''"  @click="coupona(3)">优惠券</li>
            <li :class="cardStart !== true  ? 'active':''" @click="coupona(2)">代金券</li>
          </ul>
        </div>
        <div class="order-tab-list" v-for="item in couponBoxb">
          <!--不能使用过-->
          <div class="loginbox" >
            <div class="order-tab-list-tp"><b>￥</b><i>{{item.couponaNumber}}</i><span>{{item.couponaTitle}}</span><button>{{item.couponaStatus}}</button></div>
            <ul>
              <li>编号： {{item.cardNumber}}</li>
              <li>有效期： {{item.time}}至{{item.endtime}}</li>
              <li>使用范围：{{item.couponaName}}</li>
              <li>适用课程：{{item.couponaClass}}</li>
            </ul>
          </div>
        </div>
        <div class="order-tab-list" v-for="item in couponBoxa">
          <!--可使用-->
          <div class="loginbox-ds" @click="couponChoice(item.cardNumber,item.couponaTitle,item.couponaNumber)">
            <div class="loginbox-ds-lf">
              <img src="../login/loginImg/login-radioFlase.png">
            </div>
            <div class="loginbox-ds-rt">
              <div class="order-tab-list-tp"><b>￥</b><i>{{item.couponaNumber}}</i><span>{{item.couponaTitle}}</span><button>{{item.couponaStatus}}</button></div>
              <ul>
                <li>编号： {{item.cardNumber}}</li>
                <li>有效期： {{item.time}}至{{item.endtime}}</li>
                <li>使用范围：{{item.couponaName}}</li>
                <li>适用课程：{{item.couponaClass}}</li>
              </ul>
            </div>
          </div>
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
        isShow:true, // 公众号支付
        wxpayparams:{},// 微信支付参数
        wxpaycid:'', //送
        wxcode:'',// 微信code 备用
        htitleText:'确认订单',
        htitleTexta:'我的购课券',
        isA: true,//控制支付方式
        isB:false,//控制支付方式,
        payment:'1',//默认支付宝
        curId:'',//课程id
        curIdarr:[],//课程id数组
        curriculumId:[],//根据课程id查询相关数据
        courseBox:[],
        agreementY:false,//判断是否有协议,
        agreementinf:false,
        sum:'',
        number:'',
        productId:'',//课程id
        preferential:'0',
        totalPrice:'',
        passteaName:'自助下单',
        passteaId:'iqh',
        passteaT:true,//控制显示哪个老师
        orderstat:'1',
        choicef:true,
        loginbox:'loginbox',
        activeName: 'first',
        couponBoxa:[],//可使用
        couponBoxb:[],//不可使用
        cardStart:true,
        choicenum:'',
        couponapply:false,
        discount:'',//优惠显示,
        agreementArr:{//网络协议内容
          name:'',
          card:'',
          tel:'',
          box:'',
          qq:''
        },
        voucher:'',//购课券编码
        orderCode:'',//订单号
        htitleTextb:'签订网络协议',
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
      }
    },
    watch:{
      couponBoxa:function () {
        this.calculate()
      },
    },
    methods: {
      add(m){
        return m<10?'0'+m:m
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
      orderprotocol(must){//获取协议内容
        this.axios.post('/es/index_agreement/type_agreement/_search' , {
            "query": {
              "bool": {
                "should": must
              }
            },
            "from": 0,
            "size": 10
          }
        )
          .then(response => {
            let protocolBox = response.data.hits.hits;
            let protocolArr = [];
            for(let i = 0; i < protocolBox.length; i++){
              this.agrcontent.agrUsername = protocolBox[0]._source.type_agreement_realName;
              this.agrcontent.agrCardID = protocolBox[0]._source.type_agreement_identityId;
              this.agrcontent.agrMailbox = protocolBox[0]._source.type_agreement_email;
              this.agrcontent.agrTel = protocolBox[0]._source.type_agreement_phone;
              this.agrcontent.agrQq = protocolBox[0]._source.type_agreement_qq;
              protocolArr.push({
                protocolTitle:protocolBox[i]._source.type_agreement_courseName,
                protocolCenter:protocolBox[i]._source.type_agreement_desciption,
              })
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
      calculate(){//根据后台传递数据----------判断有没有优惠券
        if(this.voucher == ""){//判断有没有优惠券
          let productId = [];
          for(var i = 0;i < this.courseBox.length;i++){
            productId.push(this.courseBox[i].courseId)
          }
          this.productId = productId;
          this.axios.post('/api/promotion//nologin/v1/pageView/calculation', {
              productIds:this.productId,
              promotion:null
            }
          )
            .then(response => {
              if(response.data.status == 0){
                this.preferential =parseFloat(response.data.data.discountPrice).toFixed(2);
                this.totalPrice =parseFloat(response.data.data.totalPrice).toFixed(2)
              }
            }).catch(err => {
            console.log(err)
          })
        }else{//如果有优惠券
          let productId = [];
          for(var i = 0;i < this.courseBox.length;i++){
            productId.push(this.courseBox[i].courseId)
          }
          this.productId = productId;
          this.axios.post('/api/promotion//nologin/v1/pageView/calculation', {
              productIds:this.productId,
              promotion:this.voucher
            }
          )
            .then(response => {
              if(response.data.status == 0){
                this.preferential =parseFloat(response.data.data.discountPrice).toFixed(2);
                this.totalPrice =parseFloat(response.data.data.totalPrice).toFixed(2)
              }
            }).catch(err => {
            console.log(err)
          });
          for(var i = 0;i < this.couponBoxa.length;i++){
            if(this.voucher == this.couponBoxa[i].cardNumber){
              if(this.couponBoxa[i].couponaTitle == '折扣券'){
                this.discount = this.couponBoxa[i].couponaNumber+'折'
              }else{
                this.discount = this.couponBoxa[i].couponaNumber+'元'
              };
            }
          }
          console.log(this.discount)
        }
      },
      curriculum() {//根据订单id查询内容
        this.curId = this.$route.query.id;
        this.axios.get('/es/order/f/' + this.curId, {})
          .then(response => {
            //判断是否使用代金券
            if(response.data._source.f_promotion !=''){
              this.voucher = response.data._source.f_promotion;//优惠券编码
            }
            //判断是否有协议
            if (response.data._source.f_agreement != '') {
              this.agreementY = true;
              this.agreementinf = true;
              let protocolbox = response.data._source.f_agreement.split(",");
              let must = [];
              for(let i = 0; i < protocolbox.length-1; i++ ){
                must.push(
                  {
                    "term": {
                      "type_agreement_studentId": protocolbox[i]
                    }
                  },
                )
              }
              this.orderprotocol(must);
            };
            //教师赋值
            //this.passteaName = response.data._source.f_teacherName;
            //this.passteaId = response.data._source.f_teamId;
//            this.protocoId = response.data._source.f_agreement;
            let coursreAll = response.data._source.f_orderItems;
            let coursreConter = [];
//            let courseMaterial = '',status ='';
            this.number = coursreAll.length;
            for (let i = 0; i < coursreAll.length; i++) {
//              let lecture = JSON.parse(coursreAll[i].withbook);//讲义
//              if (lecture.length == '0') {
//                courseMaterial = '否'
//              } else {
//                courseMaterial = '是'
//              };
//              if (coursreAll[i].curriculaState == '1') {
//                status = '直播中'
//              } else if (coursreAll[i].curriculaState == '2') {
//                status = '未开始'
//              } else if (coursreAll[i].curriculaState == '3') {
//                status = '已结束'
//              }else if (coursreAll[i].curriculaState == '4') {
//                status = '即将开始'
//              };
              var enddate = new Date(coursreAll[i].delAt);
              var year = enddate.getFullYear();
              var month = enddate.getMonth() + 1;
              var day = enddate.getDate();
              var endtime = year + '-' + this.add(month) + '-' + this.add(day);
              coursreConter.push({
//                'coursestatus':status,
                'courseType': coursreAll[i].classType,
                'courseImg': coursreAll[i].pictures,
                'courseTitle': coursreAll[i].productName,
                'courseId': coursreAll[i].productId,
                'coursePrice': parseFloat(coursreAll[i].price).toFixed(2),
//                'courseMaterial': courseMaterial,//讲义
                'courseTime':endtime//有效期
              })
            }
            this.courseBox = coursreConter;
            //购物车金额
            let sun = 0;
            this.courseBox.forEach(function (item, index) {
              let sum = ''
              sum = item.coursePrice / 1;
              sun += sum
            });
            this.sum = sun.toFixed(2)
//            this.calculate()
          })
          .catch(err => {
            console.log(err)
          });
      },
      ordercontrol(){//控制购物劵页面显示
        this.orderstat = '2'
      },
      choicestate(){//判断购物劵列表以及输入购物劵页面显示隐藏
        this.choicef = false
      },
      choiceact(){//手动输入激活购课卷
        if(this.choicenum == ''){
          Toast({
            message: '请输入购课券编码',
            position: 'middle',
            duration: 2000
          });
        }else{
          this.axios.get('/api/promotion/nologin/v1/pageView/volumeByNumber?cardNumber='+this.choicenum, {})
            .then(response => {
              if (response.data.status == "0") {
                Toast({
                  message:  "获取成功请到我的购课券列表选取",
                  position: 'middle',
                  duration: 2000
                });
              } else {
                Toast({
                  message:  response.data.msg,
                  position: 'middle',
                });
              }
            }).catch(err => {
            console.log(err)
          })
        }
      },
      //获取当前userId
      userIdBox() {
        this.axios.get('/api/party/user/v2/user/session', {})
          .then(response => {
            this.userId = response.data.data.userId;
            this.coupona('3')
          }).catch(err => {
          console.log(err)
        })
      },
      coupona(id){
        if(id == 3){
          this.cardStart = true
        }else if(id == 2){
          this.cardStart = false
        }
        let must =[];
        if(id == '1'){
          must.push({
            "term": {
              "type_volume_userId":  this.userId
            }
          })
        }else if(id == '2'){
          must.push({
            "term": {
              "type_volume_userId":  this.userId
            }
          }, {
            "term": {
              "type_volume_couponType": "2"
            }
          })
        }else if(id == '3'){
          must.push({
            "term": {
              "type_volume_userId":  this.userId
            }
          }, {
            "term": {
              "type_volume_couponType": "1"
            }
          })
        }
        this.axios.post('/es/index_volume/type_volume/_search', {
          "query": {
            "bool": {
              "must": must
            }
          },
          "from": 0,
          "size": 100

        })
          .then(response => {
            let couponAll = response.data.hits.hits;
            let couponBoxa = [],couponaTitle ='',couponaName='',couponaNumber='',couponaStatus='',couponaClass='',couponaClassid='';
            let couponBoxb = [];
            for(let i = 0; i < couponAll.length; i++){
              if(couponAll[i]._source.type_volume_couponType == '1'){
                couponaTitle = '折扣券';
                couponaNumber = couponAll[i]._source.type_volume_discount;
                couponaName = '满'+couponAll[i]._source.type_volume_satisfyMoney+'元，打'+ couponAll[i]._source.type_volume_discount+'折';
              }else if(couponAll[i]._source.type_volume_couponType == '2'){
                couponaTitle = '代金券';
                couponaNumber = couponAll[i]._source.type_volume_preferentialMoney;
                couponaName = '满'+couponAll[i]._source.type_volume_satisfyMoney+'元，减'+ couponAll[i]._source.type_volume_preferentialMoney+"元";
              }
              if(couponAll[i]._source.type_volume_status=='2'){
                couponaStatus = '已作废';
              }else if(couponAll[i]._source.type_volume_state =='1'){
                couponaStatus = '未使用';
              }else if(couponAll[i]._source.type_volume_state =='2'){
                couponaStatus = '已使用';

              }else if(couponAll[i]._source.type_volume_state =='3'){
                couponaStatus = '已过期'
              }
              if(couponAll[i]._source.type_volume_ifcourse =='1'){
                couponaClass = couponAll[i]._source.type_volume_courseName;
                couponaClassid = couponAll[i]._source.type_volume_courseId;
              }else if((couponAll[i]._source.type_volume_ifcourse =='0')){
                couponaClass = '无限制'
              }
              //开始时间
              var date = new Date(couponAll[i]._source.type_volume_startTime);
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var day = date.getDate();
              var time = year+ '-' + this.add(month) + '-' + this.add(day);
              //结束时间
              var enddate = new Date(couponAll[i]._source.type_volume_endTime);
              var year = enddate.getFullYear();
              var month = enddate.getMonth() + 1;
              var day = enddate.getDate();
              var endtime = year+ '-' + this.add(month) + '-' + this.add(day);
              this.couponapply = false;
              for(var j = 0 ;j < this.curId.length;j++){
                if(this.curId[j] == couponaClassid){//判断是否针对课程
                  this.couponapply = true
                }
              }
              if(couponAll[i]._source.type_volume_state =='1' && couponAll[i]._source.type_volume_status != '2' && (parseFloat(couponAll[i]._source.type_volume_satisfyMoney) < parseFloat(this.sum)) && (couponAll[i]._source.type_volume_ifcourse =='0' || this.couponapply === true)){
                couponaStatus = '未使用';
                couponBoxa.push({
                  cardNumber:couponAll[i]._source.type_volume_cardNumber,
                  time:time,
                  endtime:endtime,
                  couponaTitle:couponaTitle,
                  couponaNumber:couponaNumber,
                  couponaName:couponaName,
                  couponaStatus:couponaStatus,
                  couponaClass:couponaClass,
                  couponaClassid:couponaClassid
                })
              }else if(couponAll[i]._source.type_volume_state =='1' && couponAll[i]._source.type_volume_status != '2'){
                couponaStatus = '未使用';
                couponBoxb.push({
                  cardNumber:couponAll[i]._source.type_volume_cardNumber,
                  time:time,
                  endtime:endtime,
                  couponaTitle:couponaTitle,
                  couponaNumber:couponaNumber,
                  couponaName:couponaName,
                  couponaStatus:couponaStatus,
                  couponaClass:couponaClass,
                  couponaClassid:couponaClassid
                })
              }
            }
            this.couponBoxa = couponBoxa;
            this.couponBoxb = couponBoxb;
          }).catch(err => {
          console.log(err)
        })
      },
      couponChoice(id,discount,price){
        this.voucher = id
        this.orderstat = '1';
        this.choicef = true;
        if(discount == '折扣券'){
          this.discount = price+'折'
        }else{
          this.discount = price+'元'
        };
        this.axios.post('/api/promotion//nologin/v1/pageView/calculation', {
            productIds:this.curId,
            promotion:id,
          }
        )
          .then(response => {
            if(response.data.status == 0){
              this.preferential =parseFloat(response.data.data.discountPrice).toFixed(2);
              this.totalPrice =parseFloat(response.data.data.totalPrice).toFixed(2)
            }
          }).catch(err => {
          console.log(err)
        })
      },
      pricecount(){
        this.axios.post('/api/promotion//nologin/v1/pageView/calculation', {
            productIds:this.curIdarr,
            promotion:null
          }
        )
          .then(response => {
            if(response.data.status == 0){
              this.preferential =parseFloat(response.data.data.discountPrice).toFixed(2);
              this.totalPrice =parseFloat(response.data.data.totalPrice).toFixed(2)
            }
          }).catch(err => {
          console.log(err)
        })
      },
      ordersub(){//提交订单
        this.judgeJogin();
        let course = [];
        for (let i = 0; i < this.courseBox.length; i++) {
          course.push({'productId': this.courseBox[i].courseId, 'productName': this.courseBox[i].courseTitle})
        };
        this.axios.post('/api/trade/order/v1/buy/add', {
          channelId: '1',
          consignee: "",//收件人
          address: "",//地址
          contactTel: "" ,//电话
          memberId: this.userId,
          orderItems: course,//数组格式,课程名称和课程id
          promotion:this.voucher,//购课卷编码
          teacher:this.passteaId,//客服
          teacherName:this.passteaName,
          device:'web',
          agreement:this.studentId//网络协议
        })
          .then(response => {
            if (response.data.status == '0') {
              this.orderCode = response.data.data.orderCode;
             //this.pay(this.payment,response.data.data.orderCode,`?returnUrl=http://i.iqihang.com/payPerfection?order=${this.orderCode}`)
              let tmpurl = `http://mobile.iqihang.com/vip/paymentnot%3Fid%3D${this.$route.query.id}%26o%3D${this.orderCode}`;
              this.pay(this.payment,response.data.data.orderCode,tmpurl)
            } else {
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
      pay(zflx,code,hdurl){//立即支付
        if(zflx == '1'){//支付宝支付
          this.axios.get(`/api/trade/pay/v1/payRequest/2/h5/${code}?returnUrl=${hdurl}`, {
          })
            .then(response => {
              if(response.data.status == '0'){//支付宝支付
                document.writeln(response.data.msg)
              }else if(response.data.status == '8'){//余额支付
//                Toast({
//                  message:  response.data.msg,
//                  position: 'middle',
//                  duration: 2000
//                });
                this.$router.push({ path: '/payment/paymenttrue',query: {order: code}})
              }
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
                  this.$router.push({path: '/payment/paymenttrue', query: {order: this.orderCode}})
                } else {
                  this.wxpayparams = response;
                  this.wxpay();
                }
              })
          }else{
            this.axios.get(`/api/trade/pay/v1/payRequest/1/h5/${code}`, {
            })
              .then(response => {
                if(response.data.status == '888') {
                  this.$router.push({path: '/login'})
                }else if(response.data.status == '8'){//余额支付成功
                  this.$router.push({ path: '/payment/paymenttrue',query: {order: code}});
                }else {//调用三方支付
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
            _router.push({ path: '/payment/paymenttrue',query: {order: orderCode}});
            //window.location.href = 'http://www.iqihang.com/liusyweb/payment/paymenttrue'+this.orderCode;
          }else if(res.err_msg == "get_brand_wcpay_request:cancel"){//支付失败
            Toast({
              message:  '支付失败,余额不足',
              position: 'middle',
              duration: 1000
            });
            setTimeout(() => {
              _router.push({ path: '/vip/order',query: {order: orderCode}});
            },1000)
          }
        });
      },
      paymentStatus(o){      //支付状态
        this.axios.get(`/es/order/f/`+o, {
        })
          .then(response => {
            if(response.data._source.f_status == '3'){//支付成功
              this.$router.push({ path: '/payment/paymenttrue',query: {order: o}});
            }
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
      if ("undefined" != typeof  this.$route.query.o){//判断是否支付失败,如果支付失败就停留在当前页面,如果成功就到支付成功页面
        this.paymentStatus(this.$route.query.o);
      }
      this.curriculum();
      this.judgeJogin();
      this.pricecount();
      this.userIdBox();
      this.weixin();
    },
    computed:{
      teacherId(){//获取教师id
        this.passteaId = this.$store.state.passteaId;
        return this.$store.state.teacherId;
      },
      teacherName(){//获取教师name
        this.passteaName = this.$store.state.teacherName
        return this.$store.state.teacherName
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay-tp{
  height:0.8rem;
  width:100%;
  padding: 0 0.2rem 0 0.2rem;
  border-bottom:1px solid #e6e6e6;
  line-height: 0.8rem;
  color: #333;
  font-size: 0.28rem;
}
  .pay-course-list {
    height:1.5rem;
    width:100%;
    padding: 0.2rem 0.2rem 0.3rem 0.2rem;
    overflow: hidden;
  }
.pay-course-list img{
  width:1.7rem;
  height:1.1rem;
  float: left;
  margin-right: 0.16rem;
}
  .pay-course-list-rt{
    float: left;
    width: 5.2rem;
  }
  .pay-course-list-rt p{
    color: #333;
    font-size: 0.28rem;
    line-height: 0.35rem;
    height:0.8rem;
  }
.pay-course-list-rt span{
  color: #999999;
  font-size: 0.24rem;
}
  .pay-paument-list{
    width:100%;
    height:100%;
    padding-bottom: 1.6rem;
  }
  .pay-paument-list-pad{
    height:0.2rem;
    background: #f4f4f4;
    width:100%;
  }
  .pay-paument-list-div{
    width:100%;
    background: #fff;
  }
  .pay-paument-list-div-a {
    height:0.8rem;
    overflow: hidden;
    padding: 0 0.2rem 0 0.2rem;
    line-height: 0.8rem;
  }
  .pay-paument-list-div-a img{
    float: right;
    width:0.2rem;
    height:0.3rem;
    margin-top: 0.24rem;
  }
  .pay-paument-list-div-a i{
    float: right;
    margin-right: 0.2rem;
  }
  .pay-paument-list-div-b{
    height:0.8rem;
    overflow: hidden;
    padding: 0 0.2rem 0 0.2rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #e6e6e6;
   }
  .pay-paument-list-pay li{
    padding: 0.24rem 0.2rem 0 0.2rem;
    height:1.1rem;
    overflow: hidden;
    color: #666666;
  }
.pay-paument-list-pay li:nth-child(1){
  border-bottom: 1px solid #e6e6e6;
}
.pay-paument-list-pay li img:nth-child(1){
  width:0.65rem;
  height:0.65rem;
  float: left;
  margin-right: 0.15rem;
}
.pay-paument-list-pay ul span{
  background: url("../payment/paymentImg/pay-radioFalse.png");
  background-size: 0.52rem 0.52rem;
  width:0.52rem;
  height:0.52rem;
  float: right;
  margin-top: 0.06rem;
}
.pay-paument-list-pay ul .active span{
  background: url("../payment/paymentImg/pay-radio.png");
  background-size: 0.52rem 0.52rem;
  width:0.52rem;
  height:0.52rem;
}
  .pay-paument-botton{
    height:1.6rem;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  .pay-paument-botton-tp{
    height:0.77rem;
    border-top: 1px solid #e6e6e6;
    line-height: 0.75rem;
    padding: 0 0.2rem 0 0.2rem;
    background: #fff;
  }
  .pay-paument-botton-tp span{
    margin-right: 0.5rem;
  }
.pay-paument-botton-tp span i{
  color: #ff7800;
}
.shop-bottom{
  height:0.85rem;
  background: #f4f4f4;
  overflow: hidden;
  line-height: 0.8rem;
}
.shop-bottom p{
  float: left;
  padding-left: 0.2rem;
}
.shop-bottom span{
  color:#ff8400;
  padding-right: 0.2rem;
}
.shop-bottom button{
  float: right;
  width: 2.3rem;
  background: #ff8400;
  color: #fff;
  height:0.85rem;
}
  .pay-paument-list-agr{
    border-top: 1px solid #e6e6e6;
    line-height: 0.45rem;
    padding:0.2rem 0.2rem 0.2rem 0.25rem;
  }
.choice-ct{
  margin-top: 0.2rem;
}
.pay-paument-list-div{
  width:100%;
  background: #fff;
  border-bottom: 1px solid #eee;
}
/*.pay-paument-list-div:nth-last-child(1){*/
  /*border:none;*/
/*}*/
.pay-paument-list-div-a {
  height:0.8rem;
  overflow: hidden;
  padding: 0 0.2rem 0 0.2rem;
  line-height: 0.8rem;
}
.pay-paument-list-div-a img{
  float: right;
  width:0.2rem;
  height:0.3rem;
  margin-top: 0.2rem;
}
.pay-paument-list-div-c{
  padding: 0 0 0 0.2rem;
}
.pay-paument-list-div-a span{
  font-size: 0.25rem;
}
.pay-paument-list-div-a button{
  float: right;
  width:2.6rem;
  height:0.8rem;
  background: #3acbae;
  color: #fff;
  padding:0;
}
.order-tab{
  margin: 0.2rem 0.2rem 0 0.2rem;
  width: 7.1rem;
  background: #fff;
  height:0.88rem;
  overflow: hidden;
}
.loginbox-ds{
  margin-top: 0.3rem;
}
.loginbox-ds-lf{
  align-items:center;
  display:-webkit-flex;
  height:2.5rem;
  float: left;
  margin-right: 0.45rem;
}
.loginbox-ds-lf img{
  float: left;
  width:0.5rem;
  height:0.5rem;
}
.loginbox-ds-rt{
  width:6.1rem;
  background: url("./vipImg/vip-coupon.png");
  background-size: 6.1rem 2.4rem;
  overflow: hidden;
  height:2.7rem;
}
.order-tab li{
  width: 50%;
  text-align: center;
  line-height: 0.84rem;
  float: left;
  font-size: 0.3rem;
  border:1px solid #3acbae;
}
.order-tab .active{
  background: #3acbae;
  color: #fff;
}
.order-tabTwo{
  height:0.73rem;
  width:100%;
  background: #fff;
  margin-top: 0.2rem;
  overflow: hidden;
  border-bottom:1px solid #e6e6e6;
}
.order-tabTwo li{
  float: left;
  width: 33.3%;
  text-align: center;
  line-height: 0.7rem;
}
.order-tabTwo .active{
  border-bottom: 1px solid #3acbae !important;
  color: #3acbae;
}
.order-tab-list{
  margin: 0.2rem 0.2rem 0 0.2rem;
  height:2.7rem;
  width:7.1rem;

  color: #fff;
}
.loginbox{
  background: url("./vipImg/vip-coupon.png");
  background-size: 7.1rem 2.4rem;
  height:2.7rem;
}
.loginboxa{
  background: url("./vipImg/vip-couponbg.png");
  background-size: 7.1rem 2.4rem;
  height:2.7rem;
}
.order-tab-list-tp{
  height:1.03rem;
  margin: 0 0 0 0.35rem;
  color: #fff;
  overflow: hidden;
  padding-top: 0.2rem;
}
.order-tab-list-tp b{
  font-weight: normal;
  color: #fff;
  font-size: 0.3rem;
  padding-right: 0.1rem;
}
.order-tab-list-tp i{
  font-weight: normal;
  color: #fff;
  font-size: 0.7rem;
  padding-right: 0.3rem;
}
.order-tab-list-tp span{
  font-size: 0.35rem;
  color: #fff;
}
.order-tab-list-tp button{
  border:1px solid #fff;
  width:1.1rem;
  height:0.45rem;
  border-radius: 4px;
  color: #fff;
  margin-left: 0.4rem;
  background:none;
}
.order-tab-list ul{
  padding-top: 0.1rem;
}
.order-tab-list li{
  color: #fff;
  padding-left: 0.65rem;
  line-height: 0.37rem;
  display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.mint-cell{
  border-bottom: 1px solid #eeeeee;
}
.mint-cell:nth-last-child(1){
  border:none
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
</style>
