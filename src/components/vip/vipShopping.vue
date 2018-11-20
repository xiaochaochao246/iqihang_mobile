<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="shop-content padding-top-70">
      <!--<div class="shop-content-list" v-for="item in courseBox">-->
        <!--&lt;!&ndash;<left-delete>&ndash;&gt;-->
        <!--<div class="shop-content-list-lf">-->
          <!--<img :src="item.courseImg">-->
          <!--<b v-if="item.courseType=='2'">直播课</b>-->
          <!--<b v-if="item.courseType=='3'">面授课</b>-->
        <!--</div>-->
        <!--<div class="shop-content-list-rt">-->
          <!--<p><router-link :to="{ name: 'courseCenter', query:{id:item.courseId}}">{{item.courseTitle}}</router-link></p>-->
          <!--<span>￥{{item.coursePrice}}</span>-->
          <!--<i v-show="item.courseHighPrice != 0">￥{{item.courseHighPrice}}</i>-->
        <!--</div>-->
        <!--&lt;!&ndash;</left-delete>&ndash;&gt;-->
      <!--</div>-->
      <div class="page-cell">
        <mt-cell-swipe
          v-for="(item,index) in courseBox"
          :right="rightButtons(item.courseId)" :key="index">
          <router-link :to="{ name: 'courseconter', query:{id:item.courseId}}">
            <div class="shop-content-list-lf">
              <img :src="item.courseImg">
              <b v-if="item.courseType=='2'">直播课</b>
              <b v-if="item.courseType=='3'">面授课</b>
            </div>
            <div class="shop-content-list-rt">
              <p>{{item.courseTitle}}</p>
              <span>￥{{item.coursePrice}}</span>
              <i v-show="item.courseHighPrice != 0">￥{{item.courseHighPrice}}</i>
            </div>
          </router-link>
        </mt-cell-swipe>
      </div>
      <div class="shop-bottom" v-show="classShow">
        <p>数量：<span>{{number}}</span>总金额：<span>￥{{sum}}</span></p>
        <button @click="settlement">结算</button>
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
      htitleText:'我的购物车',
      loginShow:true,
      noneShow:false,
      zanwu:false,
      classShow:false,
      userId:'',
      courseBox:[],
      number:'',
      sum:'',
      paycurriculumid:''
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    rightButtons (item){
      return [
        {
          content: '删除',
          style: { background: 'red', color: '#fff' ,lineHeight: '2rem'},
          handler:() => this.courseDelete(item)
        }
      ];
    },
//获取购物车列表
    course() {
      this.paycurriculumid = '';
      this.axios.post('/es/shoppingcart/f/_search', {
        "query": {
          "bool": {
            "must": [
              {
                "term": {
                  "f_userId": this.$route.query.id
                }
              }
            ]
          }
        },
        "from": 0,
        "size": 50,
        "sort": [
          {
            "f_teamTime": {
              "order": "desc"
            }
          }
        ]
      })
        .then(response => {
          let coursreAll = response.data.hits.hits;
          let coursreConter = [],status='';
          if(coursreAll.length == '0'){
            this.classShow = false
          }else {
            this.classShow = true;
          }
          this.number = coursreAll.length;
          var viptime = Date.parse(new Date());
          for (let i = 0; i < coursreAll.length; i++) {
            if(viptime < coursreAll[i]._source.type_product_upAt ){
              status = '未开始'
            }else if(coursreAll[i]._source.type_product_upAt <=  viptime && viptime <= coursreAll[i]._source.type_product_downAt){
              status = '直播中'
            }else if(viptime > coursreAll[i]._source.type_product_downAt){
              status = '已结束'
            };
//            if (coursreAll[i]._source.f_curriculaState == '1') {
//              status = '直播中'
//            } else if (coursreAll[i]._source.f_curriculaState == '2') {
//              status = '未开始'
//            } else if (coursreAll[i]._source.f_curriculaState == '3') {
//              status = '已结束'
//            }else if (coursreAll[i]._source.f_curriculaState == '4') {
//              status = '即将开始'
//            }
            coursreConter.push({
              'coursestatus':status,
              'courseType': coursreAll[i]._source.f_classType,
              'courseImg': coursreAll[i]._source.f_pcpic,
              'courseTitle': coursreAll[i]._source.f_productName,
              'courseId': coursreAll[i]._source.f_productId,
              'coursePrice': coursreAll[i]._source.f_price,
              'courseMaterial': coursreAll[i]._source.f_material,//讲义
              'courseAgreement':coursreAll[i]._source.f_agreement,//协议
              'courseHighPrice':coursreAll[i]._source.f_highPrice
            })
            this.paycurriculumid = coursreAll[i]._source.f_productId+','+this.paycurriculumid
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
        })
        .catch(err => {
          console.log(err)
        });
    },
    //购物车删除
    courseDelete(id) {
      this.axios.post('/api/shoppingcart/v2/delCartsContent', [{
        productId: id,
        userId: this.userId
      }])
        .then(response => {
          if (response.data.status == '0') {
            Toast({
              message: response.data.msg,
              position: 'middle',
              duration: 1000
            });
            setTimeout(this.course, 1000)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    settlement(){
      this.axios.get(`/api/party/user/v2/user/session`, {
      })
        .then(response => {
          if (response.data.status == "888"){
            this.$router.push({path: '/login',query: {id: "vip"}})
          }else{
            localStorage.setItem('shop', 0)
            this.$router.push({ path: '/payment', query:{shop: true,paycid:this.paycurriculumid}})
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mounted(){
    this.course()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .shop-content{
    margin-bottom: 0.8rem;
  }
  .vip-index{
    background: #e4e4e4;
  }
.shop-content-list{
  /*width: 100%;*/
  height:2rem;
  padding: 0.2rem 0.2rem 0.2rem 0.2rem;
  /*overflow: hidden;*/
  border-bottom: 1px solid #e6e6e6;
}
.shop-content-list-lf{
  float: left;
  position: relative;
}
.shop-content-list-lf b{
  position: absolute;
  font-weight: normal;
  color: #fff;
  background: #3accae;
  top: 0;
  right: 0.2rem;
  height:0.5rem;
  width:1.1rem;
  text-align: center;
  line-height: 0.5rem;
}
  .shop-content-list img{
    width:2.8rem ;
    height:1.7rem ;
    margin-right: 0.2rem ;
  }
  .mint-cell img{
    width:2.8rem !important;
    height:1.7rem !important;
    margin-right: 0.2rem !important;
    margin-bottom: 0.1rem;
  }
  .mint-cell{
    border-bottom:1px solid #e6e6e6;
    padding-top: 0.2rem;
  }
  .shop-content-list-rt{
    width:4rem;
    float: left;
    padding-right: 0.2rem;
  }
.shop-content-list-rt p{
  color: #333;
  line-height: 0.35rem;
  font-size: 0.28rem;
  height:1.4rem;
}
  .shop-content-list-rt span{
    color: #ff8400;
  }
  .shop-content-list-rt i{
    color: #8b8b8b;
    text-decoration :line-through;
  }
  .shop-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    right:0;
    height:0.8rem;
    background: #f4f4f4;
    overflow: hidden;
    line-height: 0.8rem;
    z-index:111;
  }
.shop-bottom p{
  float: left;
  padding-left: 0.25rem;
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
    height:0.8rem;
  }
</style>
