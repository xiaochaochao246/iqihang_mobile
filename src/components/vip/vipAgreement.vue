<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
     <div class="padding-top-70">
       <div class="vip-agreement" v-for="item in protocolBox">
         <div class="vip-agreement-list">
           <p>{{item.protocolTilte}}</p>
           <div class="vip-agreement-bm">
             <span>签订日期：{{item.showtime}}</span>
             <router-link :to="{ path: 'agreementSee', query:{id:item.protocolId}}"><button>查看协议</button></router-link>
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
      htitleText:'我的协议',
      userId:'',
      protocolBox: [],
      number: '',
      pagination: {
        currentPage: 1,
        size: 10,
        total: 0,
      },
    }
  },
  methods: {
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    add(m) {
      return m < 10 ? '0' + m : m
    },
    judgeJogin(){//判断用户有没有登录
      this.axios.get(`/api/party/user/v2/user/session`, {
      })
        .then(response => {
          if (response.data.status == "888"){
            this.$router.push({path: '/login',query: {id: "vip"}})
          }else{
            this.userId = response.data.data.userId;
            this.xieyi()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    xieyi(){
      // post的方式
      this.axios.post(`/es/index_agreement/type_agreement/_search`, {
        "query": {
          "bool": {
            "must": [
              {
                "term": {
                  "type_agreement_userId": this.userId
                }
              }
            ],
            "must_not": [ ],
            "should": [ ]
          }
        },
        "from": 0,
        "size": 100,
        "sort": [
          {"type_agreement_createdAt": {
            "order": "desc"
          } }
        ],
      })
        .then(response => {
          this.pagination.total = response.data.hits.total;
          this.protocolList(response.data.hits.hits);
        })
        .catch(err => {
          console.log(err)
        })
    },
    protocolList(protocolAll){
      let protocolBox = [];
      for(let i = 0; i < protocolAll.length; i++){
        var showdate = new Date(protocolAll[i]._source.type_agreement_createdAt);
        var showyear = showdate.getFullYear();
        var showmonth = showdate.getMonth() + 1;
        var showday = showdate.getDate();
        var showhouer = showdate.getHours();
        var showminutes = showdate.getMinutes();
        var showseconds = showdate.getSeconds();
        var showtime = showyear + '-' + this.add(showmonth) + '-' + this.add(showday) + ' ' + this.add(showhouer) + ':' + this.add(showminutes) + ':' + this.add(showseconds);
        protocolBox.push({
          protocolId: protocolAll[i]._source.type_agreement_id,
          protocolTilte: protocolAll[i]._source.type_agreement_title,
          showtime: showtime
        })
      }
      this.protocolBox = protocolBox;
    },
    currentChange: function (currentPage) {
      this.axios.post('/es/index_agreement/type_agreement/_search', {
        "query": {
          "bool": {
            "must": [
              {
                "term": {
                  "type_agreement_userId": this.userId
                }
              }
            ],
            "must_not": [ ],
            "should": [ ]
          }
        },
        "from": (currentPage - 1)*this.pagination.size,
        "size": this.pagination.size,
        "sort": [ {"type_agreement_createdAt": {
          "order": "desc"
        } } ],
      })
        .then(response => {
          if (response.status == 200) {
            this.protocolList(response.data.hits.hits)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted(){
    this.judgeJogin()
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip-index{
  height:100%;
  background: #f4f4f4;
}
.vip-agreement{
  margin-top: 0.2rem;
}
  .vip-agreement-list{
    padding: 0 0.2rem 0 0.2rem;
    width:100%;
    height:2.1rem;
    background:#fff;
    border-bottom: 1px solid #e6e6e6;
  }
  .vip-agreement-list p{
    font-size: 0.28rem;
    color: #333;
    padding-top: 0.2rem;
    line-height: 0.35rem;
    height:1.1rem;
  }
  .vip-agreement-bm{
    overflow: hidden;
  }
  .vip-agreement-bm span{
    color: #666;
    float: left;
    line-height: 0.5rem;
  }
.vip-agreement-bm button{
  float: right;
  width:1.6rem;
  height:0.5rem;
  border:1px solid #3acbae;
  color: #3acbae;
  border-radius: 4px;
  background:none;
}
</style>
