<template>
  <div class="vip-index">
    <public-header :htitle="htitleText"  @childReturn="allControl"></public-header>
    <div class="padding-top-70">
      <div class="order-payment" v-for="(item,index) in odeerlistBox" :key="index">
        <div class="order-payment-list">
          <div class="order-payment-list-tp">
            <span>订单编号：<i>{{item.f_orderCode}}</i></span>
          </div>
          <div class="order-payment-list-ct" v-for="(item1,index) in item.list" :key="index">
              <p>{{item1.listTitle}}</p>
          </div>
          <div class="personInfo" v-if="item.addressJudge== '0' && item.mode == '2'">
            <p>收货人信息：</p>
            <ul>
              <li>收货人：<span v-text="item.addName"></span></li>
              <li>联系电话：<span v-text="item.addressTel"></span></li>
            </ul>
            <div>收货地址：{{item.address}}</div>
          </div>
          <div v-if="item.addressJudge == '1'" class="warning">
            <span>提醒：该课程含有配套资料，请前去添加地址并选择，否则，无法给您发货！</span>
          </div>

          <ul class="order-payment-list-bm">
            <li><p>实付金额：{{'￥'+item.f_payPrice}}</p></li>
            <li><span>下单时间：{{item.showtime}}</span></li>
          </ul>
          <ul class="tabBtn">
            <li v-if="item.status =='3' && item.addtrue == '1' && item.mode == '2'"><router-link :to="{ path: '/payment/payAddress', query:{order:item.f_orderCode}}">{{item.addressJudge == '1' ? '添加地址' : '修改地址'}}</router-link></li>
            <li v-if="item.addtrue == '1' && item.addressJudge== '0' && item.mode == '2'"><router-link :to="{ path: 'deliver', query:{orderid:item.addressTel}}">发货信息</router-link></li>
            <li v-if="item.agreement == '1'"><router-link :to="{ path: 'network', query:{userid:userId,orderid:item.f_orderCode,curriculumId:item.curriculum}}">签订协议</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div v-show="paymentjudge" class="paymentPopup">
      <div class="paymentPopup-content">
        <p>
          重要提醒：<br>
          您的订单包含纸质讲义和图书需要邮寄，请您在此页面添加您的邮寄地址。若没有填写将视为放弃此项服务。
        </p>
        <div class="paymentPopup-bt">
          <button @click="paymentaddres()">添加地址</button>
          <button @click="paymentFlase()">放弃此任务</button>
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
      htitleText:'我的订单',
      orderstate:true,
      odeerlistBox:[],
      orderListid:'',
      checkBox:[],//已购买课程id,
      paymentjudge: false,
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.push({path: '/vip'})
    },
    add(m){
      return m<10?'0'+m:m
    },
    //获取当前userId
    userIdBox() {
      this.axios.get('/api/party/user/v2/user/session', {})
        .then(response => {
          this.userId = response.data.data.userId;
          if(response.data.data.userId != ''){
            this.orderList('3')
          }
          this.overbuy()
        }).catch(err => {
        console.log(err)
      })
    },
    orderList(id){
//      if(id == 0){
//        this.orderstate = true
//      }else if(id == 3){
//        this.orderstate = false
//      };
      this.orderListid = id;
      this.axios.post('/es/order/f/_search', {
        "query": {
          "bool": {
            "must":[{
              "term": {
                "f_userId": this.userId,
              }
            },{
              "term": {
                "f_datatype": "buy",
              }
            },{
              "term": {
                "f_status": id,
              }
            }],
            "must_not": [
              {
                "term": {
                  "f_openStatus":"0"
                }
              }
            ]
          }
        },
        "from": 0,
        "size": 50,
        "sort":{"f_modifyAt":
          {
            "order":"desc"
          }
        }
      })
        .then(response => {
          console.log(response.data.hits.hits)
          this.maylist(response.data.hits.hits)
        }).catch(err => {
        console.log(err)
      })
    },
    maylist(odeerlistAll){
      let odeerlistBox = [];
      let payStatus='';
      for(let i = 0; i < odeerlistAll.length; i++ ){
//        if(odeerlistAll[i]._source.f_payStatus =='0'){
//          payStatus ='未支付'
//        }else if(odeerlistAll[i]._source.f_payStatus =='3'){
//          payStatus ='已支付'
//        }
        //下单时间
        var showdate = new Date(odeerlistAll[i]._source.f_createAt);
        var showyear = showdate.getFullYear();
        var showmonth = showdate.getMonth() + 1;
        var showday = showdate.getDate();
        var showhouer = showdate.getHours();
        var showminutes = showdate.getMinutes();
        var showseconds = showdate.getSeconds();
        var showtime = showyear+ '-' + this.add(showmonth) + '-' + this.add(showday) +' '+ this.add(showhouer) + ':' + this.add(showminutes) +':' + this.add(showseconds);
        //订单课程

        let listBox =odeerlistAll[i]._source.f_orderItems;
        let list =[];
        let listclasstype ="";
        let addtrue='';
        let addressJudge = "";
        let agreement = "";
        let mode='';
        if(odeerlistAll[i]._source.f_payway =='SelfPay'){
          mode ='1'
        }else{
          mode ='2'
        }
        console.log(listBox)
        for(let j=0; j <listBox.length; j++ ){
          //讲义
          let lecture = JSON.parse(listBox[j].withbook);
          this.addressJudge = false;
          if(lecture.length > 0){//判断有没有讲义
            addtrue = '1';
            if(odeerlistAll[i]._source.f_consignee == ""){//判断收货地址
              addressJudge = '1';//没有收货地址
            }else{
              addressJudge = '0'//有收货地址
            }
          }
          if(odeerlistAll[i]._source.f_agreement == ""){//判断有没有签过协议
            if(listBox[j].ifpartake == "1"){//判断有没有协议

              agreement = "1" //没有签过并且有协议

            }
          }else{
            agreement = "0"
          }
          list.push({
            listImg:listBox[j].pictures,
            listTitle:listBox[j].productName,
            listId:listBox[j].productId,
            listclasstype:listclasstype,
            price:parseFloat(listBox[j].price).toFixed(2)
          })
        };
        odeerlistBox.push({
          agreement:agreement,
          addressJudge:addressJudge,
          addtrue:addtrue,
          mode:mode,
          f_orderCode:odeerlistAll[i]._source.f_orderCode,//订单号
          showtime:showtime,// 下单时间 m
          payStatus:payStatus,//支付状态
          f_promotionPrice:odeerlistAll[i]._source.f_promotionPrice, //优惠金额
          f_payPrice:odeerlistAll[i]._source.f_payPrice, //实付金额
          list:list,
          status:odeerlistAll[i]._source.f_payStatus,//支付状态
          odeerstatus:odeerlistAll[i]._source.f_payStatus,//订单状态
          curriculum:odeerlistAll[i]._source.f_orderItems,//课程id
          //获取地址
          addName:odeerlistAll[i]._source.f_consignee,//收货人
          address:odeerlistAll[i]._source.f_address,//收货地址
          addressTel:odeerlistAll[i]._source.f_contactTel//手机号
        })
      }
      this.odeerlistBox = odeerlistBox;
      console.log(this.odeerlistBox)
    },
    overbuy(){//已购买课程
      this.axios.post('/es/productonuser/f/_search', {
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "f_userId": this.userId
                  }
                }
              ]
            }
          },
          "from": 0,
          "size": 100,
          "sort": [
            {
              "f_openTime": {
                "order": "desc"
              }
            }
          ]
        }
      )
        .then(response => {
          let classAll = response.data.hits.hits, checkBox = [];
          for (let i = 0; i < classAll.length; i++) {
            checkBox.push({
              classid:classAll[i]._source.f_productId
            })
          }
          this.checkBox = checkBox
        })
        .catch(err => {
          console.log(err)
        })
    },
    paymentJump(){
      if(this.$route.query.orderzf){
        this.paymentjudge = true
      }else{
        this.paymentjudge = false
      }
    },
    paymentFlase(){
      this.paymentjudge = false;
      this.$router.push({path: '/main'})
    },
    paymentaddres(){
      this.paymentjudge = false
    },
//    payment(orderid){//付款
//      this.judgeJogin()
//      this.axios.get('/es/order/f/' + orderid, {})
//        .then(response => {
//          let listBox =response.data._source.f_orderItems,type = true;
//          for(let i =0 ; i < listBox.length; i++){
//            for(let j = 0; j < this.checkBox.length; j++ ){
//              if(this.checkBox[j].classid == listBox[i].productId){
//                type = false
//              }
//            }
//          }
//          if (type) {
//            this.$router.push({ path: 'paymentnot', query:{id:orderid}})
//          } else {
//            Toast({
//              message: '此订单中课程已被购买，请查看我的课程',
//              position: 'middle',
//              duration: 2000
//            });
//          }
//        }).catch(err => {
//        console.log(err)
//      })
//    },
    //分页
//    currentChange: function (currentPage) {
//      this.axios.post('/es/order/f/_search', {
//        "query": {
//          "bool": {
//            "must":[{
//              "term": {
//                "f_userId": this.userId,
//              }
//            },{
//              "term": {
//                "f_datatype": "buy",
//              }
//            },{
//              "term": {
//                "f_status": this.orderListid,
//              }}]
//
//          }
//        },
//        "from": 0,
//        "size": 50,
//        "sort":{"f_modifyAt":
//          {
//            "order":"desc"
//          }
//        }
//      })
//        .then(response => {
//          this.maylist(response.data.hits.hits)
//        })
//        .catch(err => {
//          console.log(err)
//        })
//    },
//    delOrder(id){//取消订单
//      this.judgeJogin()
//      this.axios.get('/api/trade/order/v1/buy/del/'+id, {})
//        .then(response => {
//          if(response.data.status == "0"){
//            Toast({
//              message: response.data.msg,
//              position: 'middle',
//              duration: 2000
//            });
//            setTimeout(() => {
//              this.orderList('0')
//            },2000)
//          }else {
//            Toast({
//              message: response.data.msg,
//              position: 'middle',
//              duration: 2000
//            });
//          }
//        }).catch(err => {
//        console.log(err)
//      })
//    },
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
    this.userIdBox();
    this.paymentJump()
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip-index{
  background: #f4f4f4;
}
.paymentPopup{
  position: fixed;
  top:0;
  bottom: 0;
  right:0;
  left:0;
  z-index: 9999;
  background: rgba(0,0,0,.5);
  justify-content:center;
  align-items:center;
  display:-webkit-flex;
}
.padding-top-70{
  padding-bottom: 0.5rem;
}
.paymentPopup-content{
  width: 6.4rem;
  height:4.5rem;
  background: #fff;
  position: relative;
}
.warning{
  padding: 0.2rem;
  background: #FAFAFA;
  font-weight: 600;
  line-height: 0.36rem;
}
.warning span{
  color: #F71616;
  font-size: 0.28rem;
}
.personInfo{
  background: #FAFAFA;
  padding: 0.2rem;
}
.personInfo p{
  color: #4A4A4A;
  font-size: 0.28rem;
}
.personInfo ul{
  display: flex;
}
.personInfo ul li{
  flex: 1 0 auto;
  font-size: 0.24rem;
  color: #696969;
  line-height: 0.6rem;
}
.personInfo ul li span{
  color: #696969;
}
.personInfo div{
  color: #696969;
}
.paymentPopup-bt{
  position: absolute;
  bottom: 0;
  overflow: hidden;
}
.paymentPopup-bt button{
  width:3.2rem;
  height:1rem;
  float: left;
  color: #fff;
  font-size: 0.3rem;
}
.paymentPopup-bt button:nth-child(1){
  background: #ff9000;
}
.paymentPopup-bt button:nth-child(2){
  background: #4e4e4f;
}
.paymentPopup-content p{
  padding: 0.5rem 0.4rem 0 0.4rem;
  line-height: 0.45rem;
  color: #ec424f;
  font-size: 0.3rem;
}
.order-tab{
  margin: 0.2rem 0.2rem 0 0.2rem;
  width: 7.1rem;
  background: #fff;
  height:0.87rem;
  overflow: hidden;
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
.order-payment{
  border-radius: 0.2rem;
  overflow: hidden;
  margin-top: 0.2rem;
  background: #fff;
}
.order-payment-list-tp{
  line-height: 0.88rem;
  padding: 0 0.2rem 0 0.2rem;
}
.order-payment-list-tp span{
  font-size: 0.26rem;
  color: #4A4A4A;
  font-weight: 600;
}
.order-payment-list-tp span i{
  font-size: 0.24rem;
  color: #999999;
  font-weight: normal;
}
.order-payment-list-tp span:nth-child(1){
  float: left;
  color: #666666;
}
.order-payment-list-tp span:nth-child(2){
  float: right;
  color: #999999;
}
  .order-payment-list-ct{
    padding: 0 0.2rem 0 0.2rem;
    background: #FAFAFA;
    overflow: hidden;
    width:100%;
  }
  .order-payment-list-ct ul li{
    color: #999999;
    font-size: 0.2rem;
    line-height: 0.31rem;
    display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }
.order-payment-list-ct img{
  width:2.1rem;
  height:1.5rem;
  float: left;
  margin: 0 0.2rem 0.16rem 0;
}
.order-payment-list-ct p{
  color: #4A4A4A;
  line-height: 0.8rem;
  font-size: 0.26rem;
  border-bottom: 0.01rem solid #E7E7E7;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
}
.order-payment-list-ct span{
  color: red;
  font-size: 0.2rem;
  line-height: 0.3rem;
}
  .order-payment-list-bm{
    padding: 0 0.2rem;
    line-height:0.88rem;
    border-bottom:1px solid #eaeaea;
    display: flex;
  }
  .order-payment-list-bm li{
    flex: 1 0 auto;
  }
  .order-payment-list-bm li span{
    font-size: 0.22rem;
    color: #cacaca;
  }
  .order-payment-list-bm p{
    color: #4A4A4A;
    line-height:0.88rem;
    font-size: 0.28rem;
    font-weight: 600;
  }
  .tabBtn{
    display: flex;
  }
  .tabBtn li{
    flex: 1 0 auto;
    line-height: 0.88rem;
    text-align: center;
  }
  .tabBtn li a{
    display: inline-block;
    width: 1.56rem;
    line-height: .48rem;
    color: #3ACCAE;
    border-radius: 0.24rem;
    border: 0.01rem solid #3ACCAE;
  }
</style>
