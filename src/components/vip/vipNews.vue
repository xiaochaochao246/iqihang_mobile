<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="padding-top-20 vip-new">
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <div>
          <div class="vip-news-list" v-for="item in informationBox">
            <div class="vip-news-list-tp">
              <img src="./vipImg/vip-refresh.png">
              <p>发送时间：{{item.createdAt}}</p>
              <img src="./vipImg/vip-del.png" @click="informationDel(item.id)">
            </div>
            <div class="vip-news-list-bm" v-html="item.informHtml">{{item.informHtml}}</div>
          </div>
        </div>
      </v-loadmore>
      <div v-show="loadAll" class="loadfooter">已加载全部</div>
    </div>
  </div>
</template>
<script>
import PublicHeader from '@/components/public/header'
import { Toast } from 'mint-ui'
import {Loadmore} from 'mint-ui';
export default {
  name: 'loginIndex',
  components:{
    PublicHeader,
    'v-loadmore':Loadmore,
  },
  data () {
    return {
      loadAll:false,
      htitleText:'我的消息',
      activeName: 'first',
      informationBox:[],
      informationid:[],
      list:'',
      htitleUrl:'/vip',
      pageNo:0,
      pageSize:10,
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      totalpage:'',
      loading:false,
      bottomText: '',
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    add(m){
      return m<10?'0'+m:m
    },
    loadBottom() {
      // 上拉加载
      this.more();// 上拉触发的分页查询
      this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
    },
    //获取消息
    informationList() {
      this.axios.post('/api/message/v1/message/queryPage', {
        "page": this.pageNo,
        "size": this.pageSize,
        "businessId":"1001",
      })
        .then(response => {
          this.totalpage = Math.ceil(response.data.data.totalElements/10);
          let informationBox = [];
          let informationid = [];
          for(let i = 0; i < response.data.data.content.length; i++){
            var showdate = new Date(response.data.data.content[i].createdAt);
            var showyear = showdate.getFullYear();
            var showmonth = showdate.getMonth() + 1;
            var showday = showdate.getDate();
            var showhouer = showdate.getHours();
            var showminutes = showdate.getMinutes();
            var showseconds = showdate.getSeconds();
            var showtime = showyear+ '-' + this.add(showmonth) + '-' + this.add(showday) +' '+ this.add(showhouer) + ':' + this.add(showminutes) +':' + this.add(showseconds);
            informationBox.push({
              'createdAt':showtime,
              'informHtml':response.data.data.content[i].content,
              'id':response.data.data.content[i].id
            })
            informationid.push(response.data.data.content[i].id);
          }
          this.informationModify(informationid);
          this.informationBox = informationBox;
          this.$nextTick(function () {// 是否还有下一页，加个方法判断，没有下一页要禁止上拉
            this.scrollMode = "touch";
            this.isHaveMore();
          });
        })
        .catch(err => {
          console.log(err)
        })
    },
    more (){// 分页查询
      if(this.totalpage == 1){
        this.pageNo = 1;
        this.allLoaded = true;
        this.loadAll = true;
      }else{
        this.pageNo = parseInt(this.pageNo) + 1;
        this.allLoaded = false;
      }
      this.axios.post('/api/message/v1/message/queryPage', {
        "page": this.pageNo,
        "size": this.pageSize,
        "businessId":"1001",
      })
        .then(response => {
          let informationBox = [];
          let informationid = [];
          for(let i = 0; i < response.data.data.content.length; i++){
            var showdate = new Date(response.data.data.content[i].createdAt);
            var showyear = showdate.getFullYear();
            var showmonth = showdate.getMonth() + 1;
            var showday = showdate.getDate();
            var showhouer = showdate.getHours();
            var showminutes = showdate.getMinutes();
            var showseconds = showdate.getSeconds();
            var showtime = showyear+ '-' + this.add(showmonth) + '-' + this.add(showday) +' '+ this.add(showhouer) + ':' + this.add(showminutes) +':' + this.add(showseconds);
            this.informationBox.push({
              'createdAt':showtime,
              'informHtml':response.data.data.content[i].content,
              'id':response.data.data.content[i].id
            })
            informationid.push(response.data.data.content[i].id);
          }
          this.informationModify(informationid);
//          this.informationBox = informationBox;
          this.$nextTick(function () {// 是否还有下一页，加个方法判断，没有下一页要禁止上拉
            this.scrollMode = "touch";
            this.isHaveMore();
          });
        })
        .catch(err => {
          console.log(err)
        })
    },
    isHaveMore(){// 是否还有下一页，如果没有就禁止上拉刷新
      //this.allLoaded = false; //true是禁止上拉加载
      if(this.pageNo == this.totalpage){
//        setTimeout(() => {
//         this.aaa = false
//        },5000);
        this.loadAll = true
        this.allLoaded = true;
      }
    },
    informationDel(id) {//删除消息
      this.judgeJogin();
      this.axios.get('/api/message/v1/message/deleteById?id='+id, {

      })
        .then(response => {
          if(response.data.status == "0"){
            this.informationList()
            Toast({
              message: response.data.msg,
              position: 'middle',
              duration: 2000
            });
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
    //修改查看状态
    informationModify(informationid) {
      this.axios.post('/api/message/v1/message/updateByStart',
        informationid
      )
        .then(response => {
//          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
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
    this.informationList();
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip-index{
  height:100%;
  background: #f4f4f4;
}
.vip-new{
  padding-top: 1rem;
}
.loadfooter{
  height:0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.28rem;
}
.vip-news-list{
  width:100%;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  padding: 0.33rem 0.2rem 0.2rem 0.2rem;
}
  .vip-news-list-tp{
    height:0.32rem;
    overflow: hidden;
  }
  .vip-news-list-tp img:nth-child(1){
    width:0.35rem;
    height:0.32rem;
    float: left;
    margin-right: 0.15rem;
  }
.vip-news-list-tp p{
  float: left;
  line-height: 0.33rem;
  color: #999999;
}
  .vip-news-list-tp img:nth-child(3){
    width:0.32rem;
    height:0.32rem;
    float: right;
  }
  .vip-news-list-bm{
    padding: 0.15rem 0.3rem 0 0.4rem;
    font-size: 0.25rem;
    line-height: 0.36rem;
    color: #757575;
  }
</style>
