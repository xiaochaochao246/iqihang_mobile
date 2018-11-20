<template>
  <div class="popup">
    <div>
      <PublicHeader :htitle="htitleText" @childReturn="allControl"></PublicHeader>
    </div>
    <div class="classtop">
      <ul>
        <li v-for="item in subjectAll" @click="classFirst(item.id)">{{item.title}}</li>
        <div class="fn-clear"></div>
      </ul>
      <div class="fn-clear" v-show="subjectShow">
        <div class="fn-left subject">
          <ul>
            <li v-for="(item,$index) in editableTabs" :class="activeName == $index ? 'active':''" :key="item.id" @click="courseListTwo(item.id,$index)">{{item.title}}</li>
          </ul>
        </div>
        <div class="fn-left classbox">
          <ul>
            <li @click="classTabs(courseListid)">全部</li>
            <li v-for="item in titleTabs" :key="item.id" @click="classTabs(item.id)">{{item.title}}</li>
          </ul>
        </div>
      </div>
      <div class="teacherbox" v-show="teacherShow">
        <ul>
          <li v-for="item in teacherBox" @click="classBox(item.title,sort,'2')">{{item.title}}</li>
        </ul>
      </div>
      <div class="salesbox" v-show="salesShow">
        <ul>
          <li v-for="item in salesAll" @click="classBox(classid,item.sort,size)">{{item.title}}</li>
        </ul>
      </div>
    </div>
    <div class="classlist">
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul>
          <li v-for="item in courseBox">
            <router-link :to="{ name: 'courseconter', query:{id:item.classId}}">
              <div class="class-img fn-left"><img :src="item.classImg"></div>
              <div class="class-conter fn-left">
                <h3>{{item.classTitle}}</h3>
                <div>
                  <div style="line-height: .5rem;font-size: .24rem; color: #999;width: 100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{item.teacherbox}}</div>
                  <div class="fn-left class-price">
                    <i v-if="item.present !='0.00'">￥{{item.present}}</i>
                    <i v-if="item.present =='0.00'" class="class-price-mf">免费</i>
                    <span v-if="item.original !='0.00'">￥{{item.original}}</span>
                  </div>
                  <div class="fn-right class-number"><img src="./courseImg/class-icon1.png"> {{item.salesVolume}}</div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </v-loadmore>
    </div>
    <div v-show="loadAll" class="loadfooter">已加载全部</div>
    <div>
      <div style="height: 1rem"></div>
      <footerbt :srconeC="srconeC" :srconeA=" srconeA " :srconeB=" srconeB " :srconeD=" srconeD " :srconeE=" srconeE "></footerbt>
    </div>
  </div>
</template>

<script>
  import PublicHeader from '@/components/public/header'
  import footerbt from '@/components/public/foot'
  import {Loadmore} from 'mint-ui';
  import { Indicator } from 'mint-ui';
  export default {
    components:{
      PublicHeader,
      footerbt,
      'v-loadmore':Loadmore,
    },
    name: 'index',
    data () {
      return {
        srconeA:require("../public/publicimg/foot-icon1.png"),
        srconeB:require("../public/publicimg/foot-icon12.png"),
        srconeC:require("../public/publicimg/foot-icon3.png"),
        srconeD:require("../public/publicimg/foot-icon4.png"),
        srconeE:require("../public/publicimg/foot-icon5.png"),
        htitleText: '录播',
        subjectAll:[{
          title: '科目',
          id:'111'
        },
          {
            title: '老师',
            id:'112'
          },
          {
            title: '综合排序',
            id:'113'
          }],
        subjectShow:false,
        teacherShow:false,
        salesShow:false,
        editableTabs:[],//一级科目
        titleTabs:[],//二级科目
        courseListid:'',
        courseBox:[],//课程
        teacherBox:[],//教师
        isactive:false,
        salesAll:[{
          title:'全部',
          sort:[
            {"type_product_sort": {
              "order": "desc"
            } },
            {"type_product_createdAt": {
              "order": "desc"
            } }
          ]
        },{
          title:'销量排序',
          sort:[{"type_product_salesVolume": {"order": "desc"} }]
        },{
          title:'价格从高到低',
          sort:[
            {"type_product_price": {
              "order": "desc"
            } }
          ]
        },{
          title:'价格从低到高',
          sort:[
            {"type_product_price": {
              "order": "asc"
            } }
          ]
        }],
        classid:'',
        size:'',
        sort:[
          {"type_product_sort": {
            "order": "desc"
          } },
          {"type_product_createdAt": {
            "order": "desc"
          } }
        ],
        pageNo:0,
        pageSize:10,
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        totalpage:'',
        loadAll:false,
        activeName:'0',
        classurl:''
      }
    },
    watch:{

    },
    methods:{
      allControl(){//返回上一页
        this.$router.go(-1)
      },
      classFirst(id){
        if(id == '111'){
          if(this.subjectShow == false){
            this.subjectShow = true
          }else {
            this.subjectShow = false
          };
          this.teacherShow = false;
          this.salesShow = false;
        }else if(id == '112'){
          if(this.teacherShow == false){
            this.teacherShow = true
          }else {
            this.teacherShow = false
          };
          this.subjectShow = false;
          this.salesShow = false;
          this.teacherList()
        }else if(id == '113'){
          if(this.salesShow == false){
            this.salesShow = true
          }else {
            this.salesShow = false
          };
          this.subjectShow = false;
          this.teacherShow = false
        }
      },
      //获取课程大分类标题
      courseListTitle(){
        // post的方式
        this.axios.post('/es/index_catalog/type_catalog/_search', {
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "type_catalog_datatype": "coursemajor"
                  }
                }, {
                  "term": {
                    "type_catalog_pid": "1"
                  }},{
                  "term": {
                    "type_catalog_businessId": "1001"
                  }
                }
              ]
            }
          },
          "from": 0,
          "size": 20,
          "sort":[{
            "type_catalog_sort":{
              "order":"asc"
            }
          }]
        })
          .then(response => {
            var newTitle =response.data.hits.hits, newtitle=[];
            for( var i = 0; i < newTitle.length; i++){
              newtitle.push(
                {
                  "id":newTitle[i]._source.type_catalog_id,
                  "title":newTitle[i]._source.type_catalog_name
                }
              )

            }
            this.editableTabs = newtitle;
            this.courseList(this.editableTabs[0].id,0)

          //  this.courseListid = this.editableTabs[0].id;
          //  this.classTabs(this.courseListid);
            this.linkBox()
          })
          .catch(err => {
            console.log(err)
          })
      },
      courseList(id,index){
        this.courseListid = id;
        this.activeName = index;
        this.axios.post('/es/index_catalog/type_catalog/_search', {
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "type_catalog_pid": id
                  }
                }
              ]
            }
          },
          "from": 0,
          "size": 20,
          "sort":[{
            "type_catalog_sort":{
              "order":"asc"
            }
          }]
        })
          .then(response => {//跳转过来执行的
            var newTitle =response.data.hits.hits;
            let kcid = '';
            var newtitle=[];
            for( var i = 0; i < newTitle.length; i++){
              newtitle.push(
                {
                  "id":newTitle[i]._source.type_catalog_id,
                  "title":newTitle[i]._source.type_catalog_name
                }
              )
            }
            this.titleTabs=newtitle;
            for(let i = 0; i < this.titleTabs.length; i++){
              if(this.$route.query.courseTitle == this.titleTabs[i].title){
                kcid = this.titleTabs[i].id;
              }
            }
            this.classTabs(kcid);//根据三级查询
          })
          .catch(err => {
            console.log(err)
          })
      },
      courseListTwo(id,index){//点击当前页面执行
        this.courseListid = id;
        this.activeName = index;
        this.axios.post('/es/index_catalog/type_catalog/_search', {
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "type_catalog_pid": id
                  }
                }
              ]
            }
          },
          "from": 0,
          "size": 20,
          "sort":[{
            "type_catalog_sort":{
              "order":"asc"
            }
          }]
        })
          .then(response => {//二级
            var newTitle =response.data.hits.hits;
            let kcid = '';
            var newtitle=[];
            for( var i = 0; i < newTitle.length; i++){
              newtitle.push(
                {
                  "id":newTitle[i]._source.type_catalog_id,
                  "title":newTitle[i]._source.type_catalog_name
                }
              )
            }
            this.titleTabs=newtitle;
          })
          .catch(err => {
            console.log(err)
          })
      },
      //根据id获取父级子级所有id
      classTabs(id){
        this.loadAll = false;
        this.subjectShow = false;
        this.axios.post('/es/index_catalog/type_catalog/_search', {
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "type_catalog_datatype": "professional"
                  }
                },{
                  "term": {
                    "type_catalog_rid": id
                  }
                }
              ]
            }
          },
          "from":0,
          "size":100
        })
          .then(response => {
            let classIdbox = [];
            let str = response.data.hits.hits[0]._source.type_catalog_collection;
            let classId = str.split(',');
            for(let i = 0; i < classId.length; i++ ){
              classIdbox.push({ "term": { "type_product_catalogId": classId[i] }})
            }
            this.classBox(classIdbox,this.sort,'1')
          })
          .catch(err => {
            console.log(err)
          })
      },
      //根据id查询课程
      classBox(classid,sort,size){
        this.classid = classid;
        this.size = size;
        this.salesShow = false;
        this.teacherShow = false;
        this.pageNo = 0;
        if(size == '1'){
          this.axios.post('/es/index_product/type_product/_search', {
            "query": {
              "bool": {
                "must": [
                  {
                    "bool": {
                      "must":[
                        {
                          "term": {
                            "type_product_datatype": "product"
                          }
                        },
                        {
                          "term":{
                            "type_product_businessId": "1001"
                          }
                        },
                        {
                          "term":{
                            "type_product_classType": "1"
                          }
                        },{
                          "term": {
                            "type_product_h5": "1"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "bool":{
                      "should":classid
                    }
                  }
                ]
              }
            },
            "from": this.pageNo,
            "size": this.pageSize,
            "sort":sort
          })
            .then(response => {
              this.totalpage = Math.ceil(response.data.hits.total/10);
              this.classList(response.data.hits.hits)
            })
            .catch(err => {
              console.log(err)
            })
        }else if(size == '2'){
          this.axios.post('/es/index_product/type_product/_search', {
            "query": {
              "bool": {
                "must":[
                  {  "match": {
                    "type_product_teacherName": {
                      "query":classid,
                      "fuzziness": "AUTO",
                      "operator":  "and"
                    }
                  }
                  },
                  {"term": {"type_product_datatype": "product"}},
                  {"term":{"type_product_businessId": "1001"}},
                  {
                    "term":{
                      "type_product_classType": "1"
                    }
                  },{
                    "term": {
                      "type_product_h5": "1"
                    }
                  }
                ]
              }
            },
            "from": this.pageNo,
            "size": this.pageSize,
            "sort": sort
          })
            .then(response => {
              this.totalpage = Math.ceil(response.data.hits.total/10)
              this.classList(response.data.hits.hits)
            })
            .catch(err => {
              console.log(err)
            })
        }

      },
      classList(courseAll){
        this.courseBox = []
        let classbox = [];
        for (let i = 0; i < courseAll.length; i++) {
          let teacherAll = JSON.parse(courseAll[i]._source.type_product_teacherId);
          let teacherbox = [];
          for(let j=0; j<teacherAll.length; j++){
            teacherbox.push(teacherAll[j].title)
          }
          JSON.stringify(teacherbox).replace(/"/g, "")
          teacherbox=JSON.stringify(teacherbox).replace(/"|\[|\]|/g, "").replace(/,/g, " ");
          classbox.push({
            'classId': courseAll[i]._source.type_product_id,
            'classImg': courseAll[i]._source.type_product_mainPicture,
            'classTitle': courseAll[i]._source.type_product_title,
            'present': parseFloat(courseAll[i]._source.type_product_lowPrice).toFixed(2),
            'original': parseFloat(courseAll[i]._source.type_product_highPrice).toFixed(2),
            'salesVolume':courseAll[i]._source. type_product_salesVolume,
            "teacherbox":teacherbox
          })
        }
        this.courseBox = classbox;
        this.$nextTick(function () {// 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          this.scrollMode = "touch";
          this.isHaveMore();
        });
      },
      //课程分页
      loadBottom() {// 上拉加载
        this.more();// 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      more (){// 分页查询
        if(this.totalpage == 1){
          this.pageNo = 10;
          this.allLoaded = true;
          this.loadAll = true;
        }else{
          if(this.pageNo == 0){
            this.pageNo = 10
          }else{
            this.pageNo = parseInt(this.pageNo) + 10;
          }
          this.allLoaded = false;
        }
        this.salesShow = false;
        this.teacherShow = false;
        if(this.size == '1'){
          this.axios.post('/es/index_product/type_product/_search', {
            "query": {
              "bool": {
                "must": [
                  {
                    "bool": {
                      "must":[
                        {
                          "term": {
                            "type_product_datatype": "product"
                          }
                        },
                        {
                          "term":{
                            "type_product_businessId": "1001"
                          }
                        },
                        {
                          "term":{
                            "type_product_classType": "1"
                          }
                        },{
                          "term": {
                            "type_product_h5": "1"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "bool":{
                      "should":this.classid
                    }
                  }
                ]
              }
            },
            "from": this.pageNo,
            "size": this.pageSize,
            "sort":this.sort
          })
            .then(response => {
              this.classListT(response.data.hits.hits)
            })
            .catch(err => {
              console.log(err)
            })
        }else if(this.size == '2'){
          this.axios.post('/es/index_product/type_product/_search', {
            "query": {
              "bool": {
                "must":[
                  {  "match": {
                    "type_product_teacherName": {
                      "query":this.classid,
                      "fuzziness": "AUTO",
                      "operator":  "and"
                    }
                  }
                  },
                  {"term": {"type_product_datatype": "product"}},
                  {"term":{"type_product_businessId": "1001"}},
                  {
                    "term":{
                      "type_product_classType": "1"
                    }
                  },{
                    "term": {
                      "type_product_h5": "1"
                    }
                  }
                ]
              }
            },
            "from": this.pageNo,
            "size": this.pageSize,
            "sort": this.sort
          })
            .then(response => {
              this.classListT(response.data.hits.hits)
            })
            .catch(err => {
              console.log(err)
            })
        }

      },
      classListT(courseAll){
        for (let i = 0; i < courseAll.length; i++) {
          let teacherbox = [];
          let teacherAll = JSON.parse(courseAll[i]._source.type_product_teacherId);
          for(let j=0; j<teacherAll.length; j++){
            teacherbox.push(teacherAll[j].title)
          }
          JSON.stringify(teacherbox).replace(/"/g, "")
          teacherbox=JSON.stringify(teacherbox).replace(/"|\[|\]|/g, "").replace(/,/g, " ");
          this.courseBox .push({
            'classId': courseAll[i]._source.type_product_id,
            'classImg': courseAll[i]._source.type_product_mainPicture,
            'classTitle': courseAll[i]._source.type_product_title,
            'present': parseFloat(courseAll[i]._source.type_product_lowPrice).toFixed(2),
            'original': parseFloat(courseAll[i]._source.type_product_highPrice).toFixed(2),
            'salesVolume':courseAll[i]._source. type_product_salesVolume,
            'teacherbox':teacherbox
          })
        };
        this.$nextTick(function () {// 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          this.scrollMode = "touch";
//          this. loadAll = true;
          this.isHaveMore();
        });
      },
      isHaveMore(){// 是否还有下一页，如果没有就禁止上拉刷新

        if(this.pageNo == this.totalpage*10){
          this. loadAll = true;
          this.allLoaded = true;
        }else {
          this.allLoaded = false; //true是禁止上拉加载
        }
      },
      //获取全部老师
      teacherList(){
        this.axios.post('/es/cms_content_index/cms_content_type/_search', {
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "cms_content_type_datatype": "teacher"
                  }
                }
              ]
            }
          },
          "from": 0,
          "size": 100,
          "sort":{"cms_content_type_createdAt":{"order":"asc"}}
        })
          .then(response => {
            var teacher =response.data.hits.hits, teacherBox=[];
            for( var i = 0; i < teacher.length; i++){
              teacherBox.push(
                {
                  "id":teacher[i]._source.cms_content_type_id,
                  "title":teacher[i]._source.cms_content_type_title
                }
              )

            }
            this.teacherBox = teacherBox;
          })
          .catch(err => {
            console.log(err)
          })
      },
      linkBox(){
        let kid=''
        if(this.$route.query.course && this.$route.query.courseTitle){
          for(let i = 0; i < this.editableTabs.length; i++){
            if(this.$route.query.course == this.editableTabs[i].title){
               kid = this.editableTabs[i].id;
            }
          }
          this.courseList(kid,'0');
        }else {
          for(let i = 0; i < this.editableTabs.length; i++){
            if(this.$route.query.course == this.editableTabs[i].title){
              kid = this.editableTabs[i].id;
            }
          }
          this.classTabs(kid);
        }

      },
      /*判断当前设备跳转到指定地址。PCurl:PC端地址；WebUel:PC端地址；*/
      MBjudgment(PCurl){
        var UserClient = navigator.userAgent.toLowerCase();
        var IsIPad = UserClient.match(/ipad/i) == "ipad";
        var IsIphoneOs = UserClient.match(/iphone os/i) == "iphone os";
        var IsMidp = UserClient.match(/midp/i) == "midp";
        var IsUc7 = UserClient.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var IsUc = UserClient.match(/ucweb/i) == "ucweb";
        var IsAndroid = UserClient.match(/android/i) == "android";
        var IsCE = UserClient.match(/windows ce/i) == "windows ce";
        var IsWM = UserClient.match(/windows mobile/i) == "windows mobile";
        if(IsIPad || IsIphoneOs || IsMidp || IsUc7 || IsUc || IsAndroid || IsCE || IsWM){

        }else{
          window.location.href = PCurl;
        }
      }
    },
    mounted(){
      this.courseListTitle();
      this.MBjudgment('http://www.iqihang.com/courselist?coursetitle=考研公共课')
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .classtop{
    position: fixed;
    left: 0;
    background: #fff;
    z-index: 99;
    top:1rem;
  }
  .classtop li{
    width: 2.5rem;
    float: left;
    text-align: center;
    line-height: 0.8rem;
    border-bottom: 1px solid #e6e6e6;
    font-size: 0.28rem;
  }
  .subject{
    width:2.5rem;
    background: #f2f2f2;
  }
  .subject li{
    border-bottom: none;
  }
  .subject li.active{
    background: #ffffff;
  }
  .classbox{
    width: 5rem
  }
  .classbox li{
    margin: 0 .15rem;
    width: 4.7rem;
    font-size: 0.26rem;
  }
  .classlist{
    margin-top: 1.8rem;
  }
  .classlist li .class-img{
    width:2.76rem;
    height: 1.67rem;
  }
  .classlist li{
    padding: .2rem;
    height: 2.07rem;
    clear: both;
    border-bottom: 1px solid #e6e6e6;
  }
  .classlist li .class-img img{
    width:2.76rem;
    height: 1.67rem;
  }
  .class-conter{
    width: 4.1rem;
    height: 1.67rem;
    padding-left: .2rem;
  }
  .class-conter h3{
    height: .8rem;
    font-size: .26rem;
    line-height: .31rem;
    font-weight: normal;
    overflow: hidden;
  }
  .class-price{
    font-size: .24rem;
    color: #ff5906;
  }
  .class-price i{
    font-size: .24rem;
    color: #ff5906;
  }
  .class-price span{
    font-size: .24rem;
    margin-left: .15rem;
    color: #999;
    text-decoration:line-through;
  }
  .class-price .class-price-mf{
    color: #3acbae;
  }
  .class-number img{
    width: 0.2rem;
    height: 0.2rem;
  }
  .class-number{
    font-size: .24rem;
    color: #999;
  }
  .teacherbox li,.salesbox li{
    width: 7.5rem;
    border-bottom: 1px solid #e6e6e6;
    text-align: left;
    padding: 0 .2rem;
  }
  .teacherbox li:last-child,.salesbox li:last-child{
    border-bottom: none;
  }
  .teacherbox{
    background: #FFF;
    height:7rem;
    overflow-y: auto;
  }
  .loadfooter{
    height:0.5rem;
    line-height: 0.5rem;
    text-align: center;
    font-size: 0.28rem;
  }
</style>
