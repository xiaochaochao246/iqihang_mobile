<template>
  <div class="login-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="padding-top-70">
      <div class="service-list" @click="teacher('iqh','自助下单')">
        <img src="./../login/loginImg/login-radioFlase.png">
        自助下单
      </div>
      <div class="service-list" v-for="item in servicebox"@click="teacher(item.serviceId,item.serviceName)">
        <img src="./../login/loginImg/login-radioFlase.png">
        <img :src="item.serviceImg">
        {{item.serviceName}}
        QQ：{{item.serviceQq}}
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
        htitleText:'选择客服人员',
        servicebox:[]
      }
    },
    methods:{
      allControl(){//返回上一页
        this.$router.go(-1)
      },
      service() {//获取客服
        this.axios.post('/es/index_brand/type_brand/_search', {
          "query": {
            "bool": {
              "must": [{
                "query_string": {
                  "query": "customerService",
                  "fields": ["type_brand_datatype"]
                }
              }
              ]
            }
          },
          "from": 0,
          "size": 100,
          "sort": []
        })
          .then(response => {
            let serviceAll = response.data.hits.hits;
            let servicebox = [];
            for (let i = 0; i < serviceAll.length; i++) {
              servicebox.push({
                'serviceQq': serviceAll[i]._source.type_brand_content,
                'serviceName': serviceAll[i]._source.type_brand_name,
                'serviceImg': serviceAll[i]._source.type_brand_pcurl,
                'serviceId': serviceAll[i]._source.type_brand_id,
              })
            }
            this.servicebox = servicebox
          })
          .catch(err => {
            console.log(err)
          })
      },
      teacher(id,name){
        this.$store.dispatch("teacherevent",{teaid:id,teaname:name});
        setTimeout(() => {
          this.$router.go(-1)
        },1000)
      }
    },
    mounted(){
    this.service()
  }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-index{
  height:100%;
  width:100%;
  background: #f4f4f4;
}
.service-list{
  height:1rem;
  width:100%;
  background: #fff;
  border-bottom: 1px solid #eeeeee;
  overflow: hidden;
  font-size: 0.28rem;
  line-height: 1rem;
  padding-left: 0.2rem;
}
.service-list:nth-last-child(1){
  border:none
}
.service-list img{
  width:0.5rem;
  height:0.5rem;
  float: left;
  margin:0.28rem 0.2rem 0 0;
}

</style>
