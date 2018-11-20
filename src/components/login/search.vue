<template>
  <div class="index-search">
    <div class="index-search-header">
      <!--搜索-->
      <div class="index-search-div">
        <div class="index-search-img"></div>
        <form @submit.prevent="submit">
          <input type="text" v-model="inputVal" v-focus="focusState" placeholder="请输入搜索关键字">
        </form>
      </div>
      <!--取消返回首页-->
      <div class="return-index" @click="fhIndex()">返回</div>
    </div>
    <div v-show="hot" class="hot-list">
      <p>热门搜索</p>
      <ul>
        <li v-for="item in hotList">
          <a :href="item.hotUrl">
            {{item.hotTitle}}
          </a>
        </li>
      </ul>
    </div>
    <!--搜索结果-->
    <div class="all-result">
      <div class="no-result" v-show="zanwu">
        亲O(∩_∩)O很抱歉！<br>暂无此类相关信息请调整关键词
      </div>
      <div class="course-result" v-show="listShow">
        <ul>
          <li v-for="item in searchList">
            <router-link :to="{ name: 'courseconter', query:{id:item.searchId}}">
              {{item.searchTitle}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="more" v-show="mores" @click="more()">
        点击加载更多
      </div>
    </div>
  </div>

</template>
<script>
  export default {
   name: 'search',
    components:{
    },
    data () {
      return {
        inputVal:'',
        zanwu:false,
        mores:false,
        searchList:[],
        listShow:false,
        focusState:true,
        sizeT:10,
        hot:true,
        hotList:[]
      }
    },
    methods:{
      submit: function() {
        this.sizeT = 10;
        document.activeElement.blur();//关闭软键盘
        this.search();
      },
      //返回
      fhIndex(){
        this.$router.go(-1)//返回上一页
      },
      //搜索接口
      search(){
        this.hot = false
        this.axios.post(`/es/index_product/type_product/_search`, {
          "query": {
            "bool": {
              "must":[
                {
                  "multi_match": {
                    "query":  this.inputVal,
                    "fields": [ "type_product_title", "type_product_teacherName" ],
                    "fuzziness": "AUTO",
                    "operator":  "and"
                  }
                },
                {"term": {"type_product_datatype": "product"}},
                {"term":{"type_product_businessId": "1001"}},
                {"term":{"type_product_h5": "1"}}
              ]
            }
          },
          "from": 0,
          "size":this.sizeT,
          "sort": [
            {"type_product_salesVolume": {"order": "desc"} }
          ]
        })
          .then(response => {
            let searchAll = response.data.hits.hits,arr=[];
//            console.log(searchAll);
//            console.log(searchAll.length);
            if(searchAll.length == '0'){
              this.zanwu = true;
              this.listShow = false;
              this.mores = false;
            }else if(searchAll.length > 2){

              this.mores = true;
              this.listShow = true;
              this.zanwu = false;
              for(let i = 0; i < searchAll.length; i++){
                arr.push({
                  "searchTitle":searchAll[i]._source.type_product_title,
                  'searchId':searchAll[i]._source.type_product_id
                })
              }
              this.searchList = arr;
            } else {
              this.mores = false;
              this.listShow = true;
              this.zanwu = false;
              for(let i = 0; i < searchAll.length; i++){
                  arr.push({
                    "searchTitle":searchAll[i]._source.type_product_title,
                    'searchId':searchAll[i]._source.type_product_id
                  })
              }
              this.searchList = arr;
            }
          })
          .catch(err => {
            console.log(err)
          })

      },
      //点击更多
      more(){
//        每次加10条
        this.sizeT = this.sizeT+10;
        this.axios.post(`/es/index_product/type_product/_search`, {
          "query": {
            "bool": {
              "must":[
                {
                  "multi_match": {
                    "query":  this.inputVal,
                    "fields": [ "type_product_title", "type_product_teacherName" ],
                    "fuzziness": "AUTO",
                    "operator":  "and"
                  }
                },
                {"term": {"type_product_datatype": "product"}},
                {"term":{"type_product_businessId": "1001"}},
                {"term":{"type_product_h5": "1"}}
              ]
            }
          },
          "from": 0,
          "size":this.sizeT,
          "sort": [
            {"type_product_salesVolume": {"order": "desc"} }
          ]
        })
          .then(response => {
            let searchAll = response.data.hits.hits,arr=[];
                this.mores = true;
                this.listShow = true;
                this.zanwu = false;
                this.searchList = [];
                for(let i = 0; i < searchAll.length; i++){
                  this.searchList.push({
                    "searchTitle":searchAll[i]._source.type_product_title,
                    'searchId':searchAll[i]._source.type_product_id
                  })
                }
//                length对比相等就让显示更多隐藏
                if(response.data.hits.total == this.searchList.length){
                  this.mores = false;
                  this.listShow = true;
                  this.zanwu = false;
                }
          })
          .catch(err => {
            console.log(err)
          })

      },
      hotSec(){
        this.axios.post(`/es/cms_content_index/cms_content_type/_search`, {
          "query": {
            "multi_match": {
              "query": "hotSearch",
              "fields": ["cms_content_type_datatype"]
            }
          },
          sort:{
            cms_content_type_sortView:{"order":"desc"}
          }
        })
          .then(response => {
            let searchAll = response.data.hits.hits,arr=[];
            for(let i = 0; i < searchAll.length; i++){
                arr.push({
                  "hotTitle":searchAll[i]._source.cms_content_type_title,
                  'hotUrl':searchAll[i]._source.cms_content_type_thumbMediaUrl
                })
            }
            this.hotList = arr;
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted(){
     this.hotSec()
    },
    directives: {
      focus: {
        inserted: function (el, {value}) {
          if (value) {
            el.focus();
          }
        }
      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-search .more{
    font-size: 0.3rem;
    color: #3acbae;
    text-align: center;
    line-height: 1.3rem;
  }
  .hot-list{
    margin-top: 1rem;
    overflow: hidden;
    width:100%;
  }
  .hot-list p{
    height:0.7rem;
    width:100%;
    background: #f4f4f4;
    text-indent: 0.2rem;
    line-height: 0.7rem;
    color: #000;
  }
  .hot-list ul{
    padding-top: 0.1rem;
  }
  .hot-list li{
    width:100%;
    text-indent: 0.2rem;
    height:0.7rem;
    line-height: 0.7rem;
    font-size: 0.26rem;
  }
  .index-search form{
    line-height: 0.6rem;
  }
    .index-search{
      height: 100%;
    }
  .index-search-header{
    background: #3acbae;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    padding: 0.18rem 0.2rem;
    position: fixed;
    top: 0rem;
  }
  .index-search-div{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background: #ffffff57;
    width: 5.62rem;
    height: 0.61rem;
    border-radius: 0.1rem;
  }
  .index-search-img{
    background: url("./loginImg/shou-search.png") no-repeat;
    background-size:100%   auto;
    width: 0.44rem;
    height: 0.44rem;
    margin: 0.1rem;
  }
  .index-search-div input{
    background: none;
    font-size: 0.29rem;
  }
  .index-search-div input::-webkit-input-placeholder{
    color: #ffffff;opacity:1;
  }
  .return-index{
    font-size: 0.29rem;
    color: #ffffff;
    line-height: 0.6rem;
  }
  /*.all-result{*/
    /*over-flow-y:auto;*/
  /*}*/
    .all-result{
      padding-top: 1rem;
    }
  .no-result{
    font-size: 0.29rem;
    text-align: center;
    line-height: 0.6rem;
  }
    .course-result ul{
      padding: 0 0.2rem;
    }
  .course-result ul li{
    border-bottom: 1px solid #999;
    padding: 0.2rem 0.1rem;
  }
    .course-result ul li a{
      font-size: 0.26rem;
      line-height: 0.34rem;
      color: #999;
    }
</style>


