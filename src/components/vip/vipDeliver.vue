<template>
  <div class="login-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="deliver-list">
      <ul class="deliver-list-ul" v-for="item in detailBox">
        <li>讲义名称：{{item.dataulTitle}}</li>
        <li>物流公司：{{item.dataulExpress}}</li>
        <li>快递单号：{{item.dataulCode}}</li>
        <li>发货时间：{{item.showtime}}</li>
      </ul>
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
        htitleText:'发货信息',
        detailBox:[],
      }
    },
    methods: {
      allControl(){//返回上一页
        this.$router.go(-1)
      },
      add(m){
        return m<10?'0'+m:m
      },
      logistic(){
        let id = this.$route.query.orderid;
        this.axios.post(`/es/logistics/f/_search`, {
          "query": {
            "bool": {
              "must":
                {
                  "term": {
                    "f_contactTel":id
                  }
                }
            }
          },
          "from": 0,
          "size": 10,
          "sort":{"f_createAt":
            {
              "order":"desc"
            }
          }
        })
          .then(response => {
            let detailAll = response.data.hits.hits;
            let detailBox = [];
            for(let i = 0; i < detailAll.length; i++){
              //发货时间
              var showdate = new Date(detailAll[i]._source.f_createAt);
              var showyear = showdate.getFullYear();
              var showmonth = showdate.getMonth() + 1;
              var showday = showdate.getDate();
              var showtime = showyear+ '-' + this.add(showmonth) + '-' + this.add(showday) ;
              detailBox.push({
                dataulTitle : detailAll[i]._source.f_withbook,
                dataulExpress:detailAll[i]._source.f_express,
                dataulCode:detailAll[i]._source.f_expressCode,
                showtime:showtime,
              })
            }
            this.detailBox = detailBox
          }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted(){
      this.logistic()
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-index{
  height:100%;
  background: #f4f4f4;
}
.deliver-list{
  padding: 1.2rem 0.2rem 0 0.2rem;
}
  .deliver-list-ul{
    width: 100%;
    background: #fff;
    margin-bottom: 0.1rem;
    line-height: 0.45rem;
    font-size: 0.28rem;
    padding: 0.1rem 0 0 0.1rem;
    color: #333;
  }
</style>
