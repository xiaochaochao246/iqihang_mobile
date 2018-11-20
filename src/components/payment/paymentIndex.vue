<template>
  <div class="login-index">
    <!--订单页面-->
    <div v-show="orderstat == '1'">
      <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
      <div class="padding-top-70">
        <!-- <div class="pay-tp">课程清单</div>
        <div class="pay-course-list" v-for="(item,index) in courseBox" :key="index">
          <router-link  :to="{ name: 'courseconter', query:{id:item.courseId}}">
            <img :src="item.courseImg">
            <div class="pay-course-list-rt">
              <p>{{item.courseTitle}}</p>
              <span>￥{{item.coursePrice}}</span>
            </div>
          </router-link>
        </div> -->
        <payList :courseBox="courseBox"/>
        <div class="pay-paument-list">
          <div class="pay-paument-list-div" v-show="agreementY" @click="agreementEvent">
            <div class="pay-paument-list-div-a">
              <span>签订网络协议</span>
              <img src="./../vip/vipImg/vip-right.png">
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
          </div>
          <payWay @payWaybyindex="payWaybyindex"/>

          <proferWay :courseBox="courseBox" :preferential="preferential" :discountInfo="discountInfo" v-show="isdiscountShow"/>

          <div class="pay-paument-list-div">
            <div class="pay-paument-list-div-a" @click="ordercontrol">
              <span>优惠券</span>
              <img src="./../vip/vipImg/vip-right.png">
              <i>{{discount}}</i>
            </div>
          </div>
          <!-- <div class="pay-paument-list-div" v-show="CustomerService">
            <router-link :to="{ path: '/payment/service'}">
              <div class="pay-paument-list-div-a">
                <span>客服人员</span>
                <img src="./../vip/vipImg/vip-right.png">
                <i>{{teacherName}}</i>
              </div>
            </router-link>
          </div> -->
        </div>
        <div class="pay-paument-botton">
          <div class="pay-paument-botton-tp">
            <span>原价：<i>￥{{sum}}</i></span>
            <span>已优惠：<i>￥{{preferential}}</i></span>
          </div>
          <div class="shop-bottom">
            <div class="shop-bottom-pay">
              <div class="item">实际支付</div>
              <div class="item">￥{{totalPrice}}</div>
            </div>
            <!--<p>还需支付：<span>￥{{totalPrice}}</span></p>-->
            <button @click="Orderflag && ordersub()">提交订单<span v-show="isNumber">({{number}})</span></button>
          </div>
        </div>
      </div>
    </div>
    <!--购物劵页面-->
    <div v-show="orderstat == '2'" class="Voucher">
      <div class="padding-top-70">
        <div v-show="choicef">
          <header-right :htitle="htitleaText" :rightTitle="rightwords" @adddata="discountC" @childReturn="control"></header-right>
          <div class="order-Voucher" @click="voucherNot">
            <p>暂不选择</p>
            <img src="./paymentImg/vip-voucher.png">
          </div>
          <div class="order-tab">
            <ul>
              <li :class="cardStart !== true  ? 'active':''" @click="coupona(2)">代金券</li>
              <li :class="cardStart === true  ? 'active':''"  @click="coupona(3)">折扣券</li>
            </ul>
          </div>
          <div class="order-tab-list" v-for="(item,index) in couponBoxa" :key="index">
            <!--可使用-->
            <div class="loginbox-ds" @click="couponChoice(item.cardNumber,item.couponaTitle,item.couponaNumber)">
              <div class="loginbox-ds-lf">
                <img src="./../login/loginImg/login-radioFlase.png">
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
          <div class="order-tab-list" v-for="(item,index) in couponBoxb" :key="index">
            <!--不能使用过-->
            <div class="loginbox" @click="couponChoiceNot">
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
        <div v-show="!choicef" class="backgroun">
          <mt-header title="我的优惠券">
            <div slot="left" @click="controlJudge">
              <mt-button icon="back"></mt-button>
            </div>
          </mt-header>
          <div class="choice-ct">
            <div class="pay-paument-list-div">
              <div class="pay-paument-list-div-a pay-paument-list-div-c">
                <span>优惠券编码：</span>
                <input type="text" placeholder="请输入优惠券编码" v-model="choicenum"/>
                <button @click="choiceact">激活</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--网络协议页面-->
    <div v-show="orderstat == '3'" class="backgroud">
      <mt-header title="签订网络协议">
        <div slot="left" @click="control">
          <mt-button icon="back"></mt-button>
        </div>
      </mt-header>
      <div class="padding-top-70">
        <mt-field label="真实姓名：" v-model="agrcontent.agrUsername"></mt-field>
        <mt-field label="身份证号码：" v-model="agrcontent.agrCardID"></mt-field>
        <mt-field label="手机号：" v-model="agrcontent.agrTel"></mt-field>
        <mt-field label="电子邮箱：" v-model="agrcontent.agrMailbox"></mt-field>
        <mt-field label="QQ号：" v-model="agrcontent.agrQq"></mt-field>
        <p class="pay-list" v-for="(item,index) in courseBox" :key="index" v-if="item.protocol !=''" @click="lookAgreement(item.courseTitle,item.protocol)">查看{{item.courseTitle}}协议</p>
        <button class="pay-btn" @click="agrDeposit()">保存/修改</button>
        <p class="pay-tishi">提示：为了保证您的权益请填写您的真实信息，费用支付成功后协议自动生效。登录学员中心，在查看协议即可查看。</p>
      </div>
    </div>
    <div v-show="orderstat == '4'">
      <public-header :htitle="htitleTexta" @childReturn="conReturn"></public-header>
      <div class="vip-agrsee">
        <p class="vip-agrsee-title">{{xytitle}}</p>
        <div v-html="xyconter">
          {{xyconter}}
        </div>
      </div>
    </div>
    <div class="weipayment" v-show="weipayment">
      <div class="weipayment-ct">
        <p>请确认微信支付是否完成</p>
        <button @click="paymentTure">已完成支付</button>
        <button @click="paymentCancle">取消支付</button>
        <button @click="paymentFalse">支付遇到问题，重新支付</button>
      </div>
    </div>
  </div>
</template>
<script>
  import payWay from "./payWay"
  import proferWay from "./proferWay"
  import payList from "./payList"
import PublicHeader from "@/components/public/header";
import { Toast } from "mint-ui";
import headerRight from "@/components/public/headerRight";
//  import { Indicator } from 'mint-ui';
export default {
  name: "loginIndex",
  components: {
    PublicHeader,
    headerRight,
    payWay,//支付方式
    proferWay,//优惠方式
    payList,//课程清单
  },
  data() {
    return {
      // 订单信息
      submitsucc:true,
      isNumber:false,//提交订单时是否显示订单数量
      CustomerService:false,//隐藏客服
      isdiscountShow:false,//是否显示优惠信息，
      discountInfo:[],//优惠信息
      isShow: true, // 公众号支付
      wxpayparams: {}, // 微信支付参数
      wxpaycid: "", //送
      wxcode: "", // 微信code 备用
      htitleText: "确认订单",
      htitleaText: "我的优惠券",
      htitleTexta: "签订网络协议",
      rightwords: "激活",
      isA: true, //控制支付方式
      isB: false, //控制支付方式,
      payment: "1", //默认支付宝
      curId: "", //课程id
      curIdarr: [], //课程id数组
      curriculumId: [], //根据课程id查询相关数据
      courseBox: [],
      agreementY: false, //判断是否有协议,
      agreementinf: false,
      sum: "",//总金额
      number: "",//课程数量
      preferential: "0",//优惠
      totalPrice: "",
      passteaName: "自助下单",
      passteaId: "iqh111",
      orderstat: "1",
      choicef: true,
      loginbox: "loginbox",
      activeName: "first",
      couponBoxa: [], //可使用
      couponBoxb: [], //不可使用
      cardStart: true,
      choicenum: "",
      couponapply: false,
      discount: "", //优惠显示,
      agreementArr: {
        //网络协议内容
        name: "",
        card: "",
        tel: "",
        box: "",
        qq: ""
      },
      voucher: "", //购课券编码
      orderCode: "", //订单号
      //        htitleTextb:'签订网络协议',
      agrcontent: {
        agrUsername: "",
        agrCardID: "",
        agrTel: "",
        agrMailbox: "",
        agrQq: "",
        agrcontentId: ""
      },
      agrArr: [], //网络协议数组
      studentId: "", //后台返回协议',
      weipayment: false, //控制支付弹窗显示隐藏
      paymentTmpurl: "",
      mwebUrl: "",
      Liar: "0",
      Orderflag: true, //判断用户能不能点击提交订单
      xytitle: "",
      xyconter: "",
      discountPrice: "", //拿此价格跟优惠券返回价格相比
      userId: "",
      channel: ""
    };
  },
  methods: {
    // 子组件payway传值
    payWaybyindex(isA,isB,payments,show){
      this.isA=isA;
      this.isB=isB;
      this.payment=payments;
      this.isShow=show;
    },

    conReturn() {
      this.orderstat = "3";
    },
    lookAgreement(title, content) {
      this.orderstat = "4";
      this.xytitle = title;
      this.xyconter = content;
    },
    discountC() {
      //点击右上角激活
      this.choicef = false;
    },
    add(m) {
      return m < 10 ? "0" + m : m;
    },
    allControl() {
      //返回上一页
      this.$router.go(-1);
    },
    control() {
      //控制返回上一页
      this.orderstat = "1";
      this.choicef = true;
    },
    controlJudge() {
      this.choicef = true;
    },
    couponChoiceNot() {
      Toast({
        message: "此券不在使用范围",
        position: "middle",
        duration: 2000
      });
    },
    //网络协议
    agrDeposit() {
      this.agrArr = [];
      if (this.agrcontent.agrUsername == "") {
        Toast({
          message: "请输入真实姓名",
          position: "middle",
          duration: 2000
        });
      } else if (
        this.agrcontent.agrCardID == "" ||
        !/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test(
          this.agrcontent.agrCardID
        )
      ) {
        Toast({
          message: "请输入正确的身份证号",
          position: "middle",
          duration: 2000
        });
      } else if (
        this.agrcontent.agrTel == "" ||
        !/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.agrcontent.agrTel)
      ) {
        Toast({
          message: "请输入正确的手机号",
          position: "middle",
          duration: 2000
        });
      } else if (
        this.agrcontent.agrMailbox == "" ||
        !/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
          this.agrcontent.agrMailbox
        )
      ) {
        Toast({
          message: "请输入正确的邮箱",
          position: "middle",
          duration: 2000
        });
      } else if (this.agrcontent.agrQq == "") {
        Toast({
          message: "请输入QQ号",
          position: "middle",
          duration: 2000
        });
      } else {
        for (var i = 0; i < this.courseBox.length; i++) {
          if (this.courseBox[i].protocol != "") {
            this.agrArr.push({
              courseName: this.courseBox[i].courseTitle, //课程名称
              id: "", //网络协议id新增无
              courseId: this.courseBox[i].courseId, //课程id
              courseName: this.courseBox[i].courseTitle, //课程名称
              username: "", //用户名
              realName: this.agrcontent.agrUsername, //真实姓名
              phone: this.agrcontent.agrTel, //电话
              identityId: this.agrcontent.agrCardID, //身份证
              email: this.agrcontent.agrMailbox, //邮箱
              qq: this.agrcontent.agrQq, //qq
              desciption: this.courseBox[i].protocol, //协议内容
              title: this.courseBox[i].courseTitle + "协议" //协议名称
            });
          }
        }
        this.axios
          .post("/api/party/agreement/v1/student/add", this.agrArr)
          .then(response => {
            if (response.data.status == "0") {
              Toast({
                message: response.data.msg,
                position: "middle",
                duration: 2000
              });

              let protocoBox = response.data.data;
              for (let i = 0; i < protocoBox.length; i++) {
                this.agrcontent.agrUsername = protocoBox[0].realName;
                this.agrcontent.agrTel = protocoBox[0].phone;
                this.agrcontent.agrCardID = protocoBox[0].identityId;
                this.agrcontent.agrMailbox = protocoBox[0].email;
                this.agrcontent.agrQq = protocoBox[0].qq;
                this.agrcontent.agrcontentId = protocoBox[0].id;
                this.studentId = protocoBox[i].studentId + "," + this.studentId;
              }
              this.orderstat = "1";
              this.agreementinf = true;
            } else {
              Toast({
                message: response.data.msg,
                position: "middle"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    agreementEvent() {
      //点击网络协议
      this.orderstat = "3";
    },
    toggle() {
      //控制支付方式
      this.isB = false;
      this.isA = true;
      this.payment = "1";
    },
    toggleB() {
      //控制支付方式
      this.isB = true;
      this.isA = false;
      this.payment = "2";
    },
    // 查询详情
    curriculum() {
      this.curId = this.$route.query.paycid;
      this.curId =
        this.curId.substring(this.curId.length - 1) == ","
          ? this.curId.substring(0, this.curId.length - 1)
          : this.curId;
      this.curId = this.curId.split(",");
      for (var i = 0; i < this.curId.length; i++) {
        this.curriculumId.push({ term: { type_product_id: this.curId[i] } });
        this.curIdarr.push(this.curId[i]);
      }
      this.axios
        .post("/es/index_product/type_product/_search", {
          query: {
            bool: {
              should: this.curriculumId
            }
          },
          from: 0,
          size: 20,
          _source: [
            "type_product_ifpartake",
            "type_product_id",
            "type_product_delAt",
            "type_product_title",
            "type_product_state",
            "type_product_classType",
            "type_product_protocol",
            "type_product_mainPicture",
            "type_product_lowPrice",
            "type_product_withbook"
          ]
        })
        .then(response => {
          let buyAll = response.data.hits.hits;
          let courseBox = [];
          let courseMaterial = "",
            status = "",
            agreementC = "";
          for (let i = 0; i < buyAll.length; i++) {
            let lecture = JSON.parse(buyAll[i]._source.type_product_withbook); //讲义
            if (lecture.length == "0") {
              //判断是否有讲义
              courseMaterial = 0;
            } else {
              courseMaterial = 1;
            }
            let agreement = buyAll[i]._source.type_product_ifpartake; //协议
            if (agreement == "1") {
              //判断是否有协议
              agreementC = 0;
              this.agreementY = true;
            }
            var enddate = new Date(buyAll[i]._source.type_product_delAt);
            var year = enddate.getFullYear();
            var month = enddate.getMonth() + 1;
            var day = enddate.getDate();
            var endtime = year + "-" + this.add(month) + "-" + this.add(day);
            courseBox.push({
              //                status:status,
              classType: buyAll[i]._source.type_product_classType, //课程类型
              protocol: buyAll[i]._source.type_product_protocol, //协议内容
              courseId: buyAll[i]._source.type_product_id, //课程id
              courseImg: buyAll[i]._source.type_product_mainPicture, //课程图片
              courseTitle: buyAll[i]._source.type_product_title, //课程名称
              courseMaterial: courseMaterial, //判断是否有讲义
              coursePrice: buyAll[i]._source.type_product_lowPrice, //课程价格
              courseTime: endtime //到期时间
            });
          }
          this.courseBox = courseBox;
          this.voucherNot(); //根据课程id查询价格
          //购物车金额
          let sun = 0;
          this.courseBox.forEach(function(item, index) {
            let sum = "";
            sum = item.coursePrice / 1;
            sun += sum;
          });
          this.sum = sun.toFixed(2);
          this.number = this.curId.length;

          if(this.number!=1){
            this.isNumber=true;
          }
          //            this.calculate()
        })
        .catch(err => {
          console.log(err);
        });
    },
    //控制购物劵页面显示
    ordercontrol() {
      this.orderstat = "2";
    },
    // 激活优惠券和代金券
    choiceact() {
      //手动输入激活购课卷
      if (this.choicenum == "") {
        Toast({
          message: "请输入优惠券编码",
          position: "middle",
          duration: 2000
        });
      } else {
        this.axios
          .get(
            "/api/promotion/nologin/v1/pageView/volumeByNumber?cardNumber=" +
              this.choicenum,
            {}
          )
          .then(response => {
            if (response.data.status == "0") {
              Toast({
                message: "获取成功请到我的优惠券列表选取",
                position: "middle",
                duration: 2000
              });
              setTimeout(() => {
                if (response.data.data.couponType == "1") {
                  this.cardStart = true;
                  this.coupona(3);
                } else {
                  this.cardStart = false;
                  this.coupona(2);
                }
                this.controlJudge();
              }, 2000);
            } else {
              Toast({
                message: response.data.msg,
                position: "middle"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    add(m) {
      return m < 10 ? "0" + m : m;
    },
    //获取当前userId
    userIdBox() {
      this.axios
        .get("/api/party/user/v2/user/session", {})
        .then(response => {
          this.userId = response.data.data.userId;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 代金券和优惠券
    coupona(id) {
      let timestamp = new Date().valueOf(); //当前时间
      if (id == 3) {
        this.cardStart = true;
      } else if (id == 2) {
        this.cardStart = false;
      }
      let must = [];
      if (id == "1") {
        must.push({
          term: {
            type_volume_userId: this.userId
          }
        });
      } else if (id == "2") {
        must.push(
          {
            term: {
              type_volume_userId: this.userId
            }
          },
          {
            term: {
              type_volume_couponType: "2"
            }
          }
        );
      } else if (id == "3") {
        must.push(
          {
            term: {
              type_volume_userId: this.userId
            }
          },
          {
            term: {
              type_volume_couponType: "1"
            }
          }
        );
      }
      this.axios
        .post("/es/index_volume/type_volume/_search", {
          query: {
            bool: {
              must: must
            }
          },
          from: 0,
          size: 100
        })
        .then(response => {
          let couponAll = response.data.hits.hits;
          let couponBoxa = [],
            couponaTitle = "",
            couponaName = "",
            couponaNumber = "",
            couponaStatus = "",
            couponaClass = "",
            couponaClassid = "";
          let couponBoxb = [];
          for (let i = 0; i < couponAll.length; i++) {
            if (couponAll[i]._source.type_volume_couponType == "1") {
              couponaTitle = "折扣券";
              couponaNumber = couponAll[i]._source.type_volume_discount;
              couponaName =
                "满" +
                couponAll[i]._source.type_volume_satisfyMoney +
                "元，打" +
                couponAll[i]._source.type_volume_discount +
                "折";
            } else if (couponAll[i]._source.type_volume_couponType == "2") {
              couponaTitle = "代金券";
              couponaNumber =
                couponAll[i]._source.type_volume_preferentialMoney;
              couponaName =
                "满" +
                couponAll[i]._source.type_volume_satisfyMoney +
                "元，减" +
                couponAll[i]._source.type_volume_preferentialMoney +
                "元";
            }
            if (couponAll[i]._source.type_volume_status == "2") {
              couponaStatus = "已作废";
            } else if (couponAll[i]._source.type_volume_state == "1") {
              couponaStatus = "未使用";
            } else if (couponAll[i]._source.type_volume_state == "2") {
              couponaStatus = "已使用";
            } else if (couponAll[i]._source.type_volume_state == "3") {
              couponaStatus = "已过期";
            }
            if (couponAll[i]._source.type_volume_ifcourse == "1") {
              couponaClass = couponAll[i]._source.type_volume_courseName;
              couponaClassid = couponAll[i]._source.type_volume_courseId;
            } else if (couponAll[i]._source.type_volume_ifcourse == "0") {
              couponaClass = "无限制";
            }
            //开始时间
            var date = new Date(couponAll[i]._source.type_volume_startTime);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var time = year + "-" + this.add(month) + "-" + this.add(day);
            //结束时间
            var enddate = new Date(couponAll[i]._source.type_volume_endTime);
            var year = enddate.getFullYear();
            var month = enddate.getMonth() + 1;
            var day = enddate.getDate();
            var endtime = year + "-" + this.add(month) + "-" + this.add(day);
            this.couponapply = false;
            for (var j = 0; j < this.curId.length; j++) {
              if (this.curId[j] == couponaClassid) {
                //判断是否针对课程
                this.couponapply = true;
              }
            }
            if (
              couponAll[i]._source.type_volume_startTime <= timestamp &&
              couponAll[i]._source.type_volume_state == "1" &&
              couponAll[i]._source.type_volume_status != "2" &&
              parseFloat(couponAll[i]._source.type_volume_satisfyMoney) <=
                parseFloat(this.discountPrice) &&
              (couponAll[i]._source.type_volume_ifcourse == "0" ||
                this.couponapply === true)
            ) {
              couponaStatus = "未使用";
              couponBoxa.push({
                cardNumber: couponAll[i]._source.type_volume_cardNumber,
                time: time,
                endtime: endtime,
                couponaTitle: couponaTitle,
                couponaNumber: couponaNumber,
                couponaName: couponaName,
                couponaStatus: couponaStatus,
                couponaClass: couponaClass,
                couponaClassid: couponaClassid
              });
            } else if (
              couponAll[i]._source.type_volume_state == "1" &&
              couponAll[i]._source.type_volume_status != "2"
            ) {
              couponaStatus = "未使用";
              couponBoxb.push({
                cardNumber: couponAll[i]._source.type_volume_cardNumber,
                time: time,
                endtime: endtime,
                couponaTitle: couponaTitle,
                couponaNumber: couponaNumber,
                couponaName: couponaName,
                couponaStatus: couponaStatus,
                couponaClass: couponaClass,
                couponaClassid: couponaClassid
              });
            }
          }
          this.couponBoxa = couponBoxa;
          this.couponBoxb = couponBoxb;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 计算优惠金额
    voucherNot() {
      this.orderstat = "1";
      this.choicef = true;
      this.discount = "";
      this.axios
        .post("/api/promotion//nologin/v1/pageView/calculation", {
          productIds: this.curIdarr,
          promotion: null
        })
        .then(response => {
          if (response.data.status == 0) {
            this.preferential = parseFloat(
              response.data.data.discountPrice
            ).toFixed(2);
            this.totalPrice = parseFloat(response.data.data.totalPrice).toFixed(
              2
            );
            this.discountPrice = parseFloat(
              response.data.data.totalPrice
            ).toFixed(2); //只有第一次才会保存,拿来用跟优惠券的价格相比
            this.coupona("2");
            let json = eval('(' + response.data.data.info + ')');
            if(json.mcdl){
              this.isdiscountShow=true;
              console.log(json);
              for(let i=0;i<json.mcdl.length;i++){
                this.discountInfo.push({
                  number:json.mcdl[i].num,
                  discount:json.mcdl[i].discount,
                  disMoney:json.mcdl[i].disMoney
                })
              }
            }else{
              this.isdiscountShow=false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择代金券和优惠券
    couponChoice(id, discount, price) {
      this.voucher = id;
      this.orderstat = "1";
      this.choicef = true;
      if (discount == "折扣券") {
        this.discount = price + "折";
      } else {
        // this.discount = price + "元";
        this.discount="-￥"+price;
      }
      this.axios
        .post("/api/promotion//nologin/v1/pageView/calculation", {
          productIds: this.curId,
          promotion: id
        })
        .then(response => {
          if (response.data.status == 0) {
            this.preferential = parseFloat(
              response.data.data.discountPrice
            ).toFixed(2);
            this.totalPrice = parseFloat(response.data.data.totalPrice).toFixed(
              2
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 计算总优惠
    pricecount() {
      this.axios
        .post("/api/promotion//nologin/v1/pageView/calculation", {
          productIds: this.curIdarr,
          promotion: null
        })
        .then(response => {
          if (response.data.status == 0) {
            this.preferential = parseFloat(
              response.data.data.discountPrice
            ).toFixed(2);
            this.totalPrice = parseFloat(response.data.data.totalPrice).toFixed(
              2
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ordersub() {
      //提交订单
      this.Orderflag = false;
      //        if(this.passteaId == 'iqh' && this.passteaName =='自助下单'){
      //          this.passteaName = 'iqh';
      //          this.passteaId ='iqh'
      //        };
      let course = [];
      for (let i = 0; i < this.courseBox.length; i++) {
        course.push({
          productId: this.courseBox[i].courseId,
          productName: this.courseBox[i].courseTitle
        });
      }
      if (this.$route.query.channel) {
        this.channel = this.$route.query.channel;
      } else {
        this.channel = "";
      }
      this.axios
        .post("/api/trade/order/v1/buy/add", {
          channelId: "1",
          consignee: "", //收件人
          address: "", //地址
          contactTel: "", //电话
          memberId: this.userId,
          orderItems: course, //数组格式,课程名称和课程id
          promotion: this.voucher, //购课卷编码
          teacher: this.passteaId, //客服
          teacherName: this.passteaName,
          device: "h5",
          agreement: this.studentId, //网络协议
          channel: this.channel
        })
        .then(response => {
          if (response.data.status == "0") {
            // this.orderCode = response.data.data.orderCode; //订单创建成功
            // let tmpurl = `http://mobile.iqihang.com/payment%3Fpaycid%3D${
            //   this.$route.query.paycid
            // }%26o%3D${this.orderCode}`;
            // this.paymentTmpurl = tmpurl;
            // this.pay(this.payment, response.data.data.orderCode, tmpurl);
            // console.log(this.payment, response.data.data, tmpurl);
            this.$router.push({
                path: "/payment/paymentorder",
                query: { type:this.payment,orderId: response.data.data.orderCode, courseId: this.$route.query.paycid }
            });
          } else {
            this.Orderflag = true;
            Toast({
              message: response.data.msg,
              position: "middle",
              duration: 2000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    pay(zflx, code, hdurl) {
      console.log(zflx, code, hdurl);
      //立即支付
      if (zflx == "1") {
        //支付宝支付
        this.axios
          .get(
            `/api/trade/pay/v1/payRequest/2/h5/${code}?returnUrl=${hdurl}`,
            {}
          )
          .then(response => {
            if (response.data.status == "0") {
              //支付宝支付
              document.writeln(response.data.msg);
            } else if (response.data.status == "8") {
              //余额支付
              this.$router.push({
                path: "/payment/paymenttrue",
                query: { order: code, id: this.curId }
              });
            }
            this.Orderflag = true;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (zflx == "2") {
        //微信支付
        let _curId = this.curId;
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          this.axios
            .get(`/api/trade/pay/v1/payRequest/1/JSAPI/${code}?code=`, {
              //+code
            })
            .then(response => {
              if (response.data.status == "888") {
                this.$router.push({ path: "/login" });
              } else if (response.data.status == "8") {
                //余额支付
                this.$router.push({
                  path: "/payment/paymenttrue",
                  query: { order: this.orderCode, id: _curId }
                });
              } else {
                this.wxpayparams = response;
                this.wxpay();
              }
            });
          this.Orderflag = true;
        } else {
          this.axios
            .get(`/api/trade/pay/v1/payRequest/1/h5/${code}`, {})
            .then(response => {
              if (response.data.status == "888") {
                this.$router.push({ path: "/login" });
              } else if (response.data.status == "8") {
                //余额支付成功
                this.$router.push({
                  path: "/payment/paymenttrue",
                  query: { order: code, id: this.curId }
                });
              } else {
                //调用三方支付
                this.mwebUrl = response.data.data.mweb_url;
                window.location.href =
                  response.data.data.mweb_url + `&redirect_url=${hdurl}`;
              }
              this.Orderflag = true;
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        alert(response.data.msg);
      }
    },
    wxpay() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.jsApiCall(),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.jsApiCall());
          document.attachEvent("onWeixinJSBridgeReady", this.jsApiCall());
        }
      } else {
        this.jsApiCall();
      }
    },
    jsApiCall() {
      let response = this.wxpayparams;
      let orderCode = this.orderCode;
      let _router = this.$router;
      let _curId = this.curId;
      let that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: response.data.data.appId,
          timeStamp: response.data.data.timeStamp,
          nonceStr: response.data.data.nonceStr,
          package: response.data.data.package,
          signType: "MD5",
          paySign: response.data.data.sign
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            Toast({
              message: "支付成功",
              position: "middle",
              duration: 1000
            });
            //支付成功
            _router.push({
              path: "/payment/paymenttrue",
              query: { order: orderCode, id: _curId }
            });
            //window.location.href = 'http://www.iqihang.com/liusyweb/payment/paymenttrue'+this.orderCode;
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            Toast({
              message: "支付失败...",
              position: "middle",
              duration: 1000
            });
          }
        }
      );
    },
    paymentTure() {
      //弹窗确定支付成功
      this.Liar = "1";
      this.paymentStatus(this.$route.query.o);
    },
    paymentCancle(){
      this.weipayment = false;
        localStorage.removeItem('shop')
    },
    paymentFalse() {
      //弹窗确定支付失败
      this.pay("2", this.$route.query.o, this.paymentTmpurl);
    },
    paymentStatus(o) {
      //支付状态
      this.axios
        .get(`/es/order/f/` + o, {})
        .then(response => {
          Toast({
            message: "支付中请稍后",
            position: "middle",
            duration: 1000
          });
          setTimeout(() => {
            if (response.data._source.f_status == "3") {
              //支付成功
              this.$router.push({
                path: "/payment/paymenttrue",
                query: { order: o ,id: this.curId}
              });
            } else {
              this.toggleB();
              this.weipayment = true;
              if (this.Liar == "1") {
                alert("未支付,请重新支付!");
              }
            }
          }, 1000);
        })
        .catch(err => {
          console.log(err);
        }); 
    },
    judgeJogin() {
      var _router = this.$route
      // console.log(_router.query)
      //判断用户有没有登录
      this.axios
        .get(`/api/party/user/v2/user/session`, {})
        .then(response => {
          if (response.data.status == "888") {
            this.$router.push({ path: "/login", query: { id: _router.query.paycid } });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    weixin() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        // 隐藏 支付宝 标签
        this.isShow = false;
        this.toggleB();
      } else {
        this.isShow = true;
        this.toggle();
      }
    }
  },
  created() {
    this.userIdBox();
    this.weixin();
  },
  mounted() {
    if ("undefined" != typeof this.$route.query.o) {
      //判断是否支付失败,如果支付失败就停留在当前页面,如果成功就到支付成功页面
      this.paymentStatus(this.$route.query.o);
    }
    this.weixin();
    this.judgeJogin();
    this.curriculum();
    this.pricecount();
  },
  computed: {
    teacherId() {
      //获取教师id
      if (this.$store.state.teacherId != "") {
        this.passteaId = this.$store.state.teacherId;
        return this.$store.state.teacherId;
      }
    },
    teacherName() {
      //获取教师name
      if (this.$store.state.teacherName != "") {
        this.passteaName = this.$store.state.teacherName;
        return this.$store.state.teacherName;
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-index {
  min-height: 100%;
  background: #f4f4f4;
  margin-bottom: 1.88rem;
}
.backgroun {
  height: 100%;
  background: #f4f4f4;
}
.Voucher {
  min-height: 100%;
  height: auto;
  background: #f4f4f4;
}
.weipayment {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.weipayment-ct {
  width: 80%;
  height: 4.5rem;
  background: #fff;
  margin: 0 auto;
  margin-top: 3.5rem;
}
.order-Voucher {
  margin-top: 0.2rem;
  height: 0.88rem;
  line-height: 0.88rem;
  overflow: hidden;
  background: #fff;
  padding-left: 0.2rem;
}
.order-Voucher p {
  float: left;
}
.order-Voucher img {
  float: right;
  height: 0.4rem;
  width: 0.4rem;
  margin: 0.2rem 0.2rem 0 0;
}
.weipayment-ct p {
  text-align: center;
  line-height: 1.5rem;
  font-size: 0.3rem;
}
.weipayment-ct button {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: none;
  border-top: 1px solid #e6e6e6;
  font-size: 0.3rem;
}
.weipayment-ct button:nth-child(2) {
  color: #3acbae;
}
.pay-tp {
  height: 0.8rem;
  width: 100%;
  padding: 0 0.2rem 0 0.2rem;
  border-bottom: 1px solid #e6e6e6;
  line-height: 0.8rem;
  color: #333;
  font-size: 0.28rem;
}
.pay-course-list {
  width: 100%;
  padding: 0.2rem 0.2rem 0.3rem 0.2rem;
  overflow: hidden;
  border-bottom: 0.01rem solid #e7e7e7;
}
.pay-course-list img {
  width: 2.38rem;
  height: 1.78rem;
  float: left;
  margin-right: 0.16rem;
  border-radius: 0.1rem;
}
.pay-course-list-rt {
  margin-left: 2.58rem;
  position: relative;
  height: 1.78rem;
}
.pay-course-list-rt p {
  color: #4A4A4A;
  font-size: 0.28rem;
  line-height: 0.35rem;
  font-weight:500;
  line-height: 0.36rem;
}
.pay-course-list-rt span {
  color: #FF5B09;
  font-size: 0.24rem;
  position: absolute;
  left: 0;
  bottom: 0;
  font-weight: bold;
}
.pay-paument-list-div {
  width: 100%;
  background: #fff;
}

.pay-paument-list-div li{
  padding: 0.3rem 0.15rem 0 0.2rem;
  height: .8rem;
  overflow: hidden;
  color: #666666;
}
.pay-paument-list-div li i{
  color:#f00;
}
.pay-paument-list-div li:nth-child(1) {
  border-bottom: 1px solid #e6e6e6;
}
.pay-paument-list-div li img:nth-child(1) {
  width: 0.65rem;
  height: 0.65rem;
  float: left;
  margin-right: 0.15rem;
}

.pay-paument-list-div-a {
  line-height: 0.88rem;
  overflow: hidden;
  margin: 0 0.2rem;
}
.pay-paument-list-div-a img {
  float: right;
  width: 0.2rem;
  height: 0.3rem;
  margin-top: 0.27rem;
}
.pay-paument-list-div-a i {
  float: right;
  margin-right: 0.2rem;
  color:#f00;
}
.pay-paument-list-div-b {
  overflow: hidden;
  margin: 0 0.2rem;
  line-height: 0.88rem;
  border-bottom: 0.01rem solid #e6e6e6;
}
.pay-paument-list-div-b span{
  color: #4A4A4A;
  font-size: 0.28rem;
  font-weight: 500;
}
.pay-paument-list-pay li {
  line-height: 0.98rem;
  overflow: hidden;
  color: #666666;
}
.pay-paument-list-pay li:nth-child(1) {
  border-bottom: 1px solid #e6e6e6;
}
.pay-paument-list-pay li img:nth-child(1) {
  width: 0.65rem;
  height: 0.65rem;
  float: left;
  margin-right: 0.15rem;
}
.pay-paument-list-pay ul span {
  background: url("./../payment/paymentImg/pay-radioFalse.png");
  background-size: 0.52rem 0.52rem;
  width: 0.52rem;
  height: 0.52rem;
  float: right;
  margin-top: 0.06rem;
}
.pay-paument-list-pay ul .active span {
  background: url("./../payment/paymentImg/pay-radio.png");
  background-size: 0.52rem 0.52rem;
  width: 0.52rem;
  height: 0.52rem;
}
.pay-paument-botton {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.pay-paument-botton-tp {
  border-top: 1px solid #e7e7e7;
  line-height: 0.88rem;
  padding: 0 0.2rem 0 0.2rem;
  background: #fff;
}
.pay-paument-botton-tp span:nth-child(2) {
  float: right;
}
.pay-paument-botton-tp span i {
  color: #ff7800;
}
.shop-bottom {
  height: 1rem;
  background: #fafafa;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-content: space-around;
}
.shop-bottom-pay .item{
  height:.5rem;
}
.shop-bottom-pay .item:nth-child(1){
  font-size: .25rem;
  margin-top:.15rem;
}
.shop-bottom-pay .item:nth-child(2){
  color:#ff8400;
  font-size: .3rem;
  font-weight: 600;
}
.shop-bottom .shop-bottom-pay{
  display: flex;
  flex-direction: column;
  align-content: space-around;
  padding: 0 0.3rem 0 0.3rem;
}
.shop-bottom button {
  float: right;
  width: 2.3rem;
  font-size: .25rem;
  background: #ff8400;
  color: #fff;
  height: 1rem;
  line-height: 1rem;
}
.shop-bottom button span{
  color:#fff;
}
.pay-paument-list-agr {
  border-top: 1px solid #e6e6e6;
  line-height: 0.45rem;
  padding: 0.2rem 0.2rem 0.2rem 0.25rem;
}
.choice-ct {
  margin-top: 0.2rem;
}
.pay-paument-list-div {
  width: 100%;
  background: #fff;
}
/*.pay-paument-list-div:nth-last-child(1){*/
/*border:none;*/
/*}*/

.pay-paument-list-div-a img {
  float: right;
  width: 0.2rem;
  height: 0.3rem;
  margin-top: 0.2rem;
}
.pay-paument-list-div-c {
  padding: 0 0 0 0.3rem;
  height: 1rem;
}
.pay-paument-list-div-c span {
  line-height: 1rem;
}
.pay-paument-list-div-a span {
  color:#4a4a4a;
  font-size: 0.28rem;
  float: left;
  font-weight: 600;
}
.pay-paument-list-div-a input {
  float: left;
  line-height: 1rem;
}
.pay-paument-list-div-a button {
  float: right;
  width: 1.5rem;
  height: 1rem;
  background: #3acbae;
  color: #fff;
  padding: 0;
}
.order-tab {
  margin: 0.2rem 0.2rem 0 0.2rem;
  width: 7.1rem;
  background: #fff;
  height: 0.88rem;
  overflow: hidden;
}
.loginbox-ds {
  margin-top: 0.3rem;
}
.loginbox-ds-lf {
  align-items: center;
  display: -webkit-flex;
  height: 2.5rem;
  float: left;
  margin-right: 0.45rem;
}
.loginbox-ds-lf img {
  float: left;
  width: 0.5rem;
  height: 0.5rem;
}
.loginbox-ds-rt {
  width: 6.1rem;
  background: url("./../vip/vipImg/vip-coupon.png");
  background-size: 6.1rem 2.4rem;
  overflow: hidden;
  height: 2.7rem;
}
.order-tab li {
  width: 50%;
  text-align: center;
  line-height: 0.84rem;
  float: left;
  font-size: 0.3rem;
  border: 1px solid #3acbae;
}
.order-tab .active {
  background: #3acbae;
  color: #fff;
}
.order-tabTwo {
  height: 0.73rem;
  width: 100%;
  background: #fff;
  margin-top: 0.2rem;
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
}
.order-tabTwo li {
  float: left;
  width: 33.3%;
  text-align: center;
  line-height: 0.7rem;
}
.order-tabTwo .active {
  border-bottom: 1px solid #3acbae !important;
  color: #3acbae;
}
.order-tab-list {
  margin: 0.2rem 0.2rem 0 0.2rem;
  height: 2.7rem;
  width: 7.1rem;

  color: #fff;
}
.loginbox {
  background: url("./../vip/vipImg/vip-coupon.png");
  background-size: 7.1rem 2.4rem;
  height: 2.7rem;
}
.loginboxa {
  background: url("./../vip/vipImg/vip-couponbg.png");
  background-size: 7.1rem 2.4rem;
  height: 2.7rem;
}
.order-tab-list-tp {
  height: 1.03rem;
  margin: 0 0 0 0.35rem;
  color: #fff;
  overflow: hidden;
  padding-top: 0.2rem;
}
.order-tab-list-tp b {
  font-weight: normal;
  color: #fff;
  font-size: 0.3rem;
  padding-right: 0.1rem;
}
.order-tab-list-tp i {
  font-weight: normal;
  color: #fff;
  font-size: 0.6rem;
  padding-right: 0.3rem;
}
.order-tab-list-tp span {
  font-size: 0.35rem;
  color: #fff;
}
.order-tab-list-tp button {
  border: 1px solid #fff;
  width: 1.1rem;
  height: 0.45rem;
  border-radius: 4px;
  color: #fff;
  margin-left: 0.4rem;
  background: none;
}
.order-tab-list ul {
  padding-top: 0.1rem;
}
.order-tab-list li {
  color: #fff;
  padding-left: 0.65rem;
  line-height: 0.37rem;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mint-cell {
  border-bottom: 1px solid #eeeeee;
}
.mint-cell:nth-last-child(1) {
  border: none;
}
.pay-btn {
  margin: 0.4rem 0.2rem 0 0.2rem;
  border-radius: 8px;
  width: 7.1rem;
  height: 1.04rem;
  background: none;
  font-size: 0.3rem;
  background: #3acbae;
  color: #fff;
}
.pay-tishi {
  padding: 0.2rem 0.2rem 0 0.2rem;
  line-height: 0.35rem;
  color: #999999;
}
.mint-header {
  height: 1rem;
  background: #3acbae;
  position: fixed;
  top: 0;
  width: 100%;
}
.pay-list {
  padding-top: 0.15rem;
  padding-left: 0.2rem;
}
.vip-agrsee {
  padding: 0.2rem 0.2rem 0 0.2rem;
  line-height: 0.35rem;
  padding-top: 1rem;
  background: #f4f4f4;
}
.vip-agrsee .vip-agrsee-title {
  font-size: 0.28rem;
  color: #333;
  text-align: center;
  margin: 0.2rem 0 0.4rem 0;
}
.vip-agrsee div {
  color: #666666;
}

.backgroud {
  background: #f4f4f4;
  height: 100%;
}
</style>
