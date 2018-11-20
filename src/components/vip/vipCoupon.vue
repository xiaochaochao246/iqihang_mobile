<template>
  <div class="vip-index">
    <div v-show="voucher">
      <header-right :htitle="htitleText" :rightTitle="rightwords" @adddata="addEvent" @childReturn="allControl"></header-right>
      <div class="padding-top-70">
        <div class="order-bg">
          <div class="order-tab">
            <ul>
              <li :class="cardStart !== true  ? 'active':''" @click="coupona(2)">代金券</li>
              <li :class="cardStart === true  ? 'active':''"  @click="coupona(3)">折扣券</li>
            </ul>
          </div>
          <div class="order-tabTwo">
            <ul>
              <li :class="showNum === index  ? 'active':''"  v-for="(item,index) in quanstatr" @click="tababc(item.title)" >{{item.title}}</li>
            </ul>
          </div>
        </div>
        <div class="order-padding">
          <div class="order-tab-list" v-for="item in couponBoxa" v-show="wsyShow">
            <router-link  v-if="item.couponaClass != '无限制'"  :to="{ name: 'courseconter', query:{id:item.couponaClassid}}">
              <div class="loginbox" >
                <div class="order-tab-list-tp"><b>￥</b><i>{{item.couponaNumber}}</i><span>{{item.couponaTitle}}</span><button>{{item.couponaStatus}}</button></div>
                <ul>
                  <li>编号： {{item.cardNumber}}</li>
                  <li>有效期： {{item.time}}至{{item.endtime}}</li>
                  <li>使用范围：{{item.couponaName}}</li>
                  <li>适用课程：{{item.couponaClass}}</li>
                </ul>
              </div>
            </router-link>
            <router-link  v-if="item.couponaClass == '无限制'"  :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研数学'}}">
              <div class="loginbox" >
                <div class="order-tab-list-tp"><b>￥</b><i>{{item.couponaNumber}}</i><span>{{item.couponaTitle}}</span><button>{{item.couponaStatus}}</button></div>
                <ul>
                  <li>编号： {{item.cardNumber}}</li>
                  <li>有效期： {{item.time}}至{{item.endtime}}</li>
                  <li>使用范围：{{item.couponaName}}</li>
                  <li>适用课程：{{item.couponaClass}}</li>
                </ul>
              </div>
            </router-link>
          </div>
          <div class="order-tab-list" v-for="item in couponBoxb" v-show="ysyShow">
            <router-link  v-if="item.couponaClass != '无限制'"  :to="{ name: 'courseconter', query:{id:item.couponaClassid}}">
              <div class="loginboxa" >
                <div class="order-tab-list-tp"><b>￥</b><i>{{item.couponaNumber}}</i><span>{{item.couponaTitle}}</span><button>{{item.couponaStatus}}</button></div>
                <ul>
                  <li>编号： {{item.cardNumber}}</li>
                  <li>有效期： {{item.time}}至{{item.endtime}}</li>
                  <li>使用范围：{{item.couponaName}}</li>
                  <li>适用课程：{{item.couponaClass}}</li>
                </ul>
              </div>
            </router-link>
            <router-link  v-if="item.couponaClass == '无限制'"  :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研数学'}}">
              <div class="loginboxa" >
                <div class="order-tab-list-tp"><b>￥</b><i>{{item.couponaNumber}}</i><span>{{item.couponaTitle}}</span><button>{{item.couponaStatus}}</button></div>
                <ul>
                  <li>编号： {{item.cardNumber}}</li>
                  <li>有效期： {{item.time}}至{{item.endtime}}</li>
                  <li>使用范围：{{item.couponaName}}</li>
                  <li>适用课程：{{item.couponaClass}}</li>
                </ul>
              </div>
            </router-link>
          </div>
          <div class="order-tab-list" v-for="item in couponBoxc" v-show="gqShow">
            <router-link  v-if="item.couponaClass != '无限制'"  :to="{ name: 'courseconter', query:{id:item.couponaClassid}}">
              <div class="loginboxa" >
                <div class="order-tab-list-tp"><b>￥</b><i>{{item.couponaNumber}}</i><span>{{item.couponaTitle}}</span><button>{{item.couponaStatus}}</button></div>
                <ul>
                  <li>编号： {{item.cardNumber}}</li>
                  <li>有效期： {{item.time}}至{{item.endtime}}</li>
                  <li>使用范围：{{item.couponaName}}</li>
                  <li>适用课程：{{item.couponaClass}}</li>
                </ul>
              </div>
            </router-link>
            <router-link  v-if="item.couponaClass == '无限制'"  :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研数学'}}">
              <div class="loginboxa" >
                <div class="order-tab-list-tp"><b>￥</b><i>{{item.couponaNumber}}</i><span>{{item.couponaTitle}}</span><button>{{item.couponaStatus}}</button></div>
                <ul>
                  <li>编号： {{item.cardNumber}}</li>
                  <li>有效期： {{item.time}}至{{item.endtime}}</li>
                  <li>使用范围：{{item.couponaName}}</li>
                  <li>适用课程：{{item.couponaClass}}</li>
                </ul>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!voucher">
      <mt-header title="激活优惠券">
        <div slot="left" @click="control">
          <mt-button icon="back"></mt-button>
        </div>
      </mt-header>
      <div class="pay-paument-list-div">
        <div class="pay-paument-list-div-a">
          <span>优惠券编码：</span>
          <input type="text" placeholder="请输入优惠券编码" v-model="choicenum"/>
          <button @click="choiceact">激活</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headerRight from '@/components/public/headerRight'
  import PublicHeader from '@/components/public/header'
  import { Toast } from 'mint-ui'
  export default {
    name: 'loginIndex',
    components:{
      headerRight,
      PublicHeader
    },
    data () {
      return {
        htitleText:'我的优惠券',
        rightwords:'激活',
        loginbox:'loginbox',
        activeName: 'first',
        couponBoxa:[],//未使用
        couponBoxb:[],
        couponBoxc:[],
        cardStart:false,
        wsyShow:false,
        ysyShow:false,
        gqShow:false,
        showNum:0,
        voucher:true,
        choicenum:'',
        quanstatr:[{
          title:'未使用'
        },{
          title:'已使用'
        },{
          title:'已过期'
        }]
      }
    },
    methods:{
      allControl(){//返回上一页
        this.$router.go(-1)
      },
      control(){
        this.voucher = true;
      },
      add(m){
        return m<10?'0'+m:m
      },
      addEvent(){//激活
        this.voucher = false
      },
      choiceact(){//点击激活购课劵
        if(this.choicenum == ''){
          Toast({
            message: '请输入优惠券编码',
            position: 'middle',
            duration: 2000
          });
        }else{
          this.axios.get('/api/promotion/nologin/v1/pageView/volumeByNumber?cardNumber='+this.choicenum, {})
            .then(response => {
              if (response.data.status == "0") {
                Toast({
                  message:  "激活成功",
                  position: 'middle',
                  duration: 2000
                });
                setTimeout(() => {
                  this.voucher = true;
                  if(response.data.data.couponType == "1"){
                    this.coupona(3);
                  }else{
                    this.coupona(2);
                  }
                },2000)
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
            let couponBoxc = [];
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
              if(couponAll[i]._source.type_volume_state =='1' && couponAll[i]._source.type_volume_status != '2'){
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
              }else if(couponAll[i]._source.type_volume_state =='2' && couponAll[i]._source.type_volume_status != '2'){
                couponaStatus = '已使用';
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
              }else if(couponAll[i]._source.type_volume_state =='3' && couponAll[i]._source.type_volume_status != '2'){
                couponaStatus = '已过期'
                couponBoxc.push({
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
            this.couponBoxc = couponBoxc;
          }).catch(err => {
          console.log(err)
        })
      },
      tababc(name){
        if(name == '未使用'){
            this.wsyShow = true;
            this.ysyShow = false;
            this.gqShow = false;
            this.showNum = 0
        }else if(name == '已使用'){
          this.wsyShow = false;
          this.ysyShow = true;
          this.gqShow = false;
          this.showNum = 1
        }else if(name == '已过期'){
          this.wsyShow = false;
          this.ysyShow = false;
          this.gqShow = true;
          this.showNum = 2
        }
      }
    },
    mounted(){
      this.userIdBox();
      this.tababc('未使用')
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vip-index{
    height:auto;
    background: #f4f4f4;
  }
  .pay-paument-list-div{
    padding-top: 1rem;
  }
  .pay-paument-list-div-a {
    width:100%;
    background: #fff;
    margin-top: 0.2rem;
    height:1rem;
    overflow: hidden;
    padding: 0 0 0 0.2rem;
    line-height: 1rem;
  }
  .pay-paument-list-div-a span{
    font-size: 0.25rem;
    float: left;
  }
  .pay-paument-list-div-a input{
    float: left;
    line-height: 1rem;
  }
  .pay-paument-list-div-a button{
    float: right;
    width: 1.5rem;
    height: 1rem;
    background: #3acbae;
    color: #fff;
    padding: 0;
  }
  .order-tab{
    padding: 0 0.2rem 0 0.2rem;
    width: 100%;
    /*background: #fff;*/
    height:1.08rem;
    overflow: hidden;

    margin-top: 0.2rem;
  }
  .order-bg{
    background: #f4f4f4;
    height:auto;
    width:100%;
    position: fixed;
    top:1rem;
  }
  .order-padding{
    padding-top: 2rem;
  }
  .order-tab li{
    background: #fff;
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
    overflow: hidden;
    border-bottom:1px solid #e6e6e6;
  }
  .order-tabTwo li{
    background: #fff;
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
    width:1.3rem;
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
  .mint-header{
    height:1rem;
    background: #3acbae;
    position: fixed;
    top:0;
    width:100%;
  }
</style>
