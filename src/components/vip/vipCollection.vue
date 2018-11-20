<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="shop-content">
      <mt-cell-swipe
        v-for="(item,index) in collectionBox"
        :right="rightButtons(item.collectionId)" :key ="index" >
        <router-link :to="{ name: 'courseconter', query:{id:item.courseId}}">
          <div class="shop-content-list">
            <div class="shop-content-list-lf">
              <img :src="item.courseImg">
              <!--<b v-if="item.courseType=='2'">{{item.coursestatus}}</b>-->
              <!--<b v-if="item.courseType=='3'">面授课</b>-->
            </div>
            <div class="shop-content-list-rt">
              <p>{{item.courseTitle}}</p>
              <span>￥{{item.listLowPrice}}</span>
              <i v-show="item.listHighPrice != 0">￥{{item.listHighPrice}}</i>
            </div>
          </div>
        </router-link>
      </mt-cell-swipe>
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
      htitleText:'我的收藏',
      courseBox:[],
      courselistBox:[],
      collectionBox:[],
      collectionType:'',
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    add(m){
      return m<10?'0'+m:m
    },
    rightButtons (item){
      return [
        {
          content: '取消收藏',
          style: { background: 'red', color: '#fff' ,lineHeight: '2rem'},
          handler:() => this.cancelCollection(item)
        }
      ];
    },
    course() {//获取购物车列表
      this.axios.post('/es/index_product_collect/type_product_collect/_search', {
        "query": {
          "bool": {
            "must": [
              {
                "term": {
                  "type_product_collect_userId": this.$route.query.id
                }
              }
            ]
          }
        },
        "from": 0,
        "size": 10,
        "sort": [{"type_product_collect_createdAt":{"order":"desc"}} ]

      })
        .then(response => {
          this.conllection(response.data.hits.hits)
        })
        .catch(err => {
          console.log(err)
        });
    },
    conllection(collectionAll){
      let collectionBox = [];
      for(let i = 0; i < collectionAll.length; i++){
        let courseAll = JSON.parse(collectionAll[i]._source.type_product_collect_content);
        //有效期
        var date = new Date(courseAll.delAt);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var time = year+ '-' + this.add(month) + '-' + this.add(day);
        //老师名称
        let teacherAll = JSON.parse(courseAll.teacherId);
        let teacherbox=[];
        for(let j=0; j<teacherAll.length; j++){
          teacherbox.push(teacherAll[j].title)
        }
        JSON.stringify(teacherbox).replace(/"/g, "")
        teacherbox=JSON.stringify(teacherbox).replace(/"|\[|\]|/g, "").replace(/,/g, " ")
//        //直播
//        var viptime = Date.parse(new Date());
//        if(courseAll.classType == '2') {
//          if (courseAll.upAt > viptime) {
//            status = '未开始'
//          } else if (viptime >= courseAll.upAt && viptime <= courseAll.downAt) {
//            status = '直播中'
//          }
//          else if (courseAll.downAt < viptime) {
//            status = '已结束'
//          }
//        };
//        //直播开始时间
//        var showdate = new Date(courseAll.upAt);
//        var showyear = showdate.getFullYear();
//        var showmonth = showdate.getMonth() + 1;
//        var showday = showdate.getDate();
//        var showhouer = showdate.getHours();
//        var showminutes = showdate.getMinutes();
//        var showseconds = showdate.getSeconds();
//        var showtime = showyear+ '-' + this.add(showmonth) + '-' + this.add(showday) +' '+ this.add(showhouer) + ':' + this.add(showminutes) +':' + this.add(showseconds);
        collectionBox.push({
          collectionId:collectionAll[i]._source.type_product_collect_id,//收藏id
          courseId:collectionAll[i]._source.type_product_collect_productId,
          courseImg:courseAll.pictures,
          courseTitle:courseAll.title,
          listSubtitle:courseAll.subTitle,
          listLowPrice:courseAll.lowPrice,
          listHighPrice:courseAll.highPrice,
          listLowVolume:courseAll.salesVolume,
          courseType:courseAll.classType,
          time:time,
          listClasshour:courseAll.classhour,
          teacherbox:teacherbox,
          status:status,
//          showtime:showtime
        })
      }
      this.collectionBox = collectionBox;
    },
    //取消收藏
    cancelCollection(id){
      this.axios.get('/api/product/nologin/v1/product/deleteCollect?id='+id,
      )
        .then(response => {
          if(response.data.status == "0"){
            Toast({
              message: response.data.msg,
              position: 'middle',
              duration: 1000
            });
            setTimeout(() => {
              this.course('0')
            },1000)
          }else {
            Toast({
              message: response.data.msg,
              position: 'middle',
            });
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
  .vip-index{
    height: 100%;
    background: #f4f4f4;
  }
  .shop-content{
    padding-top: 1rem;
    margin-top: 0.2rem;
  }
.shop-content-list{
  width: 100%;
  padding: 0.2rem 0 0.2rem 0;
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
}
.shop-content-list-lf{
  float: left;
  position: relative;
}
.shop-content-list b{
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
    width:2.8rem;
    height:1.7rem;
    margin-right: 0.2rem;
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

</style>
