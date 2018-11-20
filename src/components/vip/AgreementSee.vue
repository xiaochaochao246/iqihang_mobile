<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="vip-agrsee">
      <p class="vip-agrsee-title">{{xytitle}}</p>
      <div v-html="xyconter">
        {{xyconter}}
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
      xytitle:'',
      xyconter:''
    }
  },
  methods: {
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    add(m) {
      return m < 10 ? '0' + m : m
    },
    protocolConter(){
      // post的方式
      this.axios.post(`/es/index_agreement/type_agreement/_search`, {
        "query": {
          "bool": {
            "must": [
              {
                "term": {
                  "type_agreement_id": this.$route.query.id
                }
              }
            ],
            "must_not": [ ],
            "should": [ ]
          }
        },
        "from": 0,
        "size": 10,
        "sort": [ ],
        "aggs": { }
      })
        .then(response => {
          this.xytitle = response.data.hits.hits[0]._source.type_agreement_title;
          this.xyconter = response.data.hits.hits[0]._source.type_agreement_desciption
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mounted(){
    this.protocolConter()
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip-index{
  height:100%;
  background: #f4f4f4;
}
.vip-agrsee{
  margin:0.2rem 0.2rem 0 0.2rem;
  line-height: 0.35rem;
  padding-top: 1rem;
}
  .vip-agrsee .vip-agrsee-title{
    font-size: 0.28rem;
    color: #333;
    text-align: center;
    margin: 0.2rem 0 0.4rem 0;
  }
  .vip-agrsee div{
    color: #666666;
  }
</style>
