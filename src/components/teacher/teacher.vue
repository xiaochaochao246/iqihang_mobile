<template>
  <div>
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="teacher">
      <div class="teacher-title">欢迎进入<span>{{teacherTitle}}</span>老师的课堂</div>
      <div class="teacher-box">
        <div class="fn-clear teacher-mid">
          <div class="teachere-img"><img :src="teacherImg"></div>
          <div class="teacher-right">
            <span><p><img src="./teacherImg/teacher01.png"/>课堂</p><p>{{teacherClass}}</p></span>
            <span><p><img src="./teacherImg/teacher02.png"/>学员</p><p>{{number}}</p></span>
          </div>
          <div class="fn-clear"></div>
        </div>
        <div class="teacher-cont">
          {{teacherContent}}
        </div>
      </div>
    </div>
    <div class="teacher-list">
      <div class="order-tab">
        <ul>
          <li :class="activeName == 1  ? 'active':''" @click="vipCourse(1)">录播</li>
          <li :class="activeName == 2  ? 'active':''" @click="vipCourse(2)">直播</li>
          <li :class="activeName == 3  ? 'active':''" @click="vipCourse(3)">免费</li>
        </ul>
      </div>
      <div class="classlist">
        <ul>
          <li v-for="(item,index) in courseBox" :key="index">
            <router-link :to="{ name: 'courseconter', query:{id:item.classId}}">
              <div class="class-img fn-left">
                <img :src="item.classImg">
                <!-- <div  class="livetype" v-if="item.classType == '2'">{{item.status}}</div> -->  
              </div>
              <div class="class-conter fn-left">
                <span v-if="item.classType == '2'" :class="item.status == '未开始' ? 'livetype liveGray' : item.status=='直播中' ? 'livetype liveOrange' : 'livetype liveBlur'">{{item.status}}</span>
                <h3 :class="item.classType == '2' ? 'marginLeft' : ''">{{item.classTitle}}</h3>
                <div class="livetime" v-if="item.classType == '2'">{{item.downtime}}</div>
                <div class="priceBox">
                  <div class="fn-left class-price">
                    ￥{{item.present}}<span v-if="item.original !='0.00'">￥{{item.original}}</span>
                  </div>
                  <div class="fn-right class-number"><img src="../course/courseImg/class-icon1.png"> {{item.salesVolume}}</div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>
import PublicHeader from '@/components/public/header'
export default {
  name: 'loginIndex',
  components:{
    PublicHeader,
  },
  data () {
    return {
      htitleText:'名师详情',
      activeName:'1',
      teacherTitle:'',
      teacherImg:'',
      teacherClass:"",
      teacherContent:'',
      number:'',
      courseBox:[],
      courseAll: []
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    add(m){
      return m<10?'0'+m:m
    },
    vipCourse(id){
      if(id == 1){
        this.activeName = "1";
        let must = [
          {  "match": {
            "type_product_teacherName": {
              "query":this.teacherTitle,
              "fuzziness": "AUTO",
              "operator":  "and"
            }
          }
          },
          {"term": {"type_product_datatype": "product"}},
          {"term":{"type_product_businessId": "1001"}},
          {"term":{"type_product_classType": '1'}},
          {"term":{"type_product_h5": "1"}}
        ]
        this.teacherList(must,1)
      }else if(id == 2){
        this.activeName = "2";
        let must = [
          {  "match": {
            "type_product_teacherName": {
              "query":this.teacherTitle,
              "fuzziness": "AUTO",
              "operator":  "and"
            }
          }
          },
          {"term": {"type_product_datatype": "product"}},
          {"term":{"type_product_businessId": "1001"}},
          {"term":{"type_product_classType": '2'}},
          {"term":{"type_product_h5": "1"}}
        ]
        this.teacherList(must,2)
      }else if(id == 3){
        this.activeName = "3";
      //   let must = [
      //     {  "match": {
      //       "type_product_teacherName": {
      //         "query":this.teacherTitle,
      //         "fuzziness": "AUTO",
      //         "operator":  "and"
      //       }
      //     }
      //     },
      //     {"term": {"type_product_datatype": "product"}},
      //     {"term":{"type_product_lowPrice": "0.00"}},
      //     {"term":{"type_product_businessId": "1001"}},
      //     {"term":{"type_product_h5": "1"}}
      //   ]
      //  this.teacherList(must,3)
        var courseBox=[];
        this.courseAll.length > 0 && this.courseAll.map((item)=>{
          if(item._source.type_product_lowPrice == '0'){
            courseBox.push({
                'classId': item._source.type_product_id,
                'classImg': item._source.type_product_mainPicture,
                'classTitle': item._source.type_product_title,
                'present': parseFloat(item._source.type_product_lowPrice).toFixed(2),
                'original': parseFloat(item._source.type_product_highPrice).toFixed(2),
                'salesVolume':item._source. type_product_salesVolume,
                'classType':item._source.type_product_classType,
                'status': '',
                'downtime': '',
                'showtime': '',
            })
          }
        })
      this.courseBox = courseBox;
      }
    },
    //根据教师id获取详情
    //获取用户id
    teacherBox() {
      this.axios.get('/es/cms_content_index/cms_content_type/'+this.$route.query.id, {})
        .then(response => {
          this.teacherTitle = response.data._source.cms_content_type_title;
          this.teacherImg = response.data._source.cms_content_type_userRealName;
          this.teacherClass = response.data._source.cms_content_type_spare;
          this.teacherContent = response.data._source.cms_content_type_content;
          this.number = parseFloat(response.data._source.cms_content_type_trueViews)+parseFloat(response.data._source.cms_content_type_userPhone);
          let must = [
            {  "match": {
              "type_product_teacherName": {
                "query":this.teacherTitle,
                "fuzziness": "AUTO",
                "operator":  "and"
              }
            }
            },
            {"term": {"type_product_datatype": "product"}},
            {"term":{"type_product_businessId": "1001"}},
            {"term":{"type_product_classType": '1'}},
            {"term":{"type_product_h5": "1"}}
          ]
          
          this.teacherList(must,1)
        }).catch(err => {
        console.log(err)
      })
    },
    //根据教师id请求课程
    teacherList(id,num){
      this.axios.post('/es/index_product/type_product/_search', {
        "query": {
          "bool": {
            "must":id
          }
        },
        "from": 0,
        "size":10,
        "sort": [{"type_product_salesVolume": {"order": "desc"} }]
      })
        .then(response => {
          let courseBox = [],status='',downtime='',showtime='';
          if(num == 1){
            this.courseAll = response.data.hits.hits
          }
          let courseAll = response.data.hits.hits;
          var viptime = Date.parse(new Date());
          for (let i = 0; i < courseAll.length; i++) {
            if(viptime < courseAll[i]._source.type_product_upAt ){
              status = '未开始'
            }else if(courseAll[i]._source.type_product_upAt <=  viptime && viptime <= courseAll[i]._source.type_product_downAt){
              status = '直播中'
            }else if(viptime > courseAll[i]._source.type_product_downAt){
              status = '已结束'
            };
//            if (courseAll[i]._source.type_product_state == '1') {
//              status = '直播中'
//            } else if (courseAll[i]._source.type_product_state == '2') {
//              status = '未开始'
//            } else if (courseAll[i]._source.type_product_state == '3') {
//              status = '已结束'
//            }else if (courseAll[i]._source.type_product_state == '4') {
//              status = '即将开始'
//            };
            //直播开始时间
            var downdate = new Date(courseAll[i]._source.type_product_upAt);
            var downyear = downdate.getFullYear();
            var downmonth = downdate.getMonth() + 1;
            var downday = downdate.getDate();
            var downhouer = downdate.getHours();
            var downminutes = downdate.getMinutes();
            var downseconds = downdate.getSeconds();
            downtime = downyear+ '-' + this.add(downmonth) + '-' + this.add(downday) +' '+ this.add(downhouer) + ':' + this.add(downminutes) +':' + this.add(downseconds);
            //直播结束时间
            var date = new Date(courseAll[i]._source.type_product_downAt);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var houer = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            showtime = year+ '-' + this.add(month) + '-' + this.add(day) +' '+ this.add(houer) + ':' + this.add(minutes) +':' + this.add(seconds)
            courseBox.push({
              'classId': courseAll[i]._source.type_product_id,
              'classImg': courseAll[i]._source.type_product_mainPicture,
              'classTitle': courseAll[i]._source.type_product_title,
              'present': parseFloat(courseAll[i]._source.type_product_lowPrice).toFixed(2),
              'original': parseFloat(courseAll[i]._source.type_product_highPrice).toFixed(2),
              'salesVolume':courseAll[i]._source. type_product_salesVolume,
              'classType':courseAll[i]._source.type_product_classType,
              'status':status,
              'downtime':downtime,
              'showtime':showtime,
            })
          }
          this.courseBox = courseBox;
        }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted(){
    this.teacherBox();
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.teacher{
  margin-top: 1rem;
}
  .teacher-title{
    width: 100%;
    padding: .1rem .2rem;
    text-align: right;
    font-size: 0.24rem;
  }
.teacher-title span{
  color: #3acbae;
}
  .teacher-box{
    padding: .2rem;
  }
  .teachere-img{
    float: left;
    width: 1.48rem;
    height: 1.48rem;
  }
.teachere-img img{
  width: 1.48rem;
  height: 1.48rem;
  border-radius: 50%;
}
  .teacher-right{
    float: left;
    width: 5.42rem;
    margin-left:.12rem;
  }
  .teacher-right span{
    margin-top: .2rem;
    width: 2rem;
    float: left;
    text-align: center;
    line-height: .6rem;
    display: inline-block;
    font-size: .28rem;
  }
.teacher-right span img{
  width: .33rem;
  height: .33rem;
  margin-right: .1rem;
  margin-top: .1rem
}
.teacher-right span p{
  color: #3acbae;
}
.teacher-right span:first-child{
  border-right: 1px solid #3acbae;
}
  .teacher-cont{
    padding-top: .2rem;
    line-height: .4rem;
  }
  .teacher-mid{
    width: 100%;
    height: auto;
  }
.order-tab{
  background: #fff;
  padding: 0.2rem 0.2rem 0.2rem 0.2rem;
  width: 100%;
  background: #fff;
  height:0.95rem;
  overflow: hidden;
}
.order-tab li{
  width: 33%;
  text-align: center;
  line-height: 0.72rem;
  float: left;
  font-size: 0.3rem;
}
.order-tab li:nth-child(2){
  border-right: none;
  border-left: none;
}
.order-tab .active{
  color: #3acbae;
  border-bottom: 2px solid #3acbae;
}
.order-tabTwo{
  height:0.73rem;
  width:100%;
  background: #fff;
  margin-top: 0.2rem;
  overflow: hidden;
  border-bottom:1px solid #e6e6e6;
}
.order-tabTwo li{
  float: left;
  width: 25%;
  text-align: center;
  line-height: 0.7rem;
}
.order-tabTwo .active{
  border-bottom: 1px solid #3acbae !important;
  color: #3acbae;
}
.classlist li .class-img{
  width:2.76rem;
  height: 1.67rem;
  position: relative;
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
  position: relative;
}
.class-conter h3{
  font-size: .26rem;
  line-height: .4rem;
  font-weight: normal;
  overflow: hidden;
}
.marginLeft{
  margin-left: 0.9rem;
}
.class-price{
  font-size: .24rem;
  color: #ff5906;
}
.class-price span{
  font-size: .24rem;
  margin-left: .15rem;
  color: #999;
  text-decoration:line-through;
}
.class-number img{
  width: 0.2rem;
  height: 0.2rem;
}
.class-number{
  font-size: .24rem;
  color: #999;
}
.livetype{
  width: .8rem;
  line-height: .4rem;
  text-align: center;
  
  color: #fff;
  font-size: .24rem;
  float: left;
}
.liveGray{
  background: rgb(204, 204, 204);
}
.liveBlur{
  background: #3accae;
}
.liveOrange{
  background: #ff5b09;
}
.livetime{
  color: red;
  width: 100%;
  line-height: .5rem;
  font-size: .24rem;
  overflow:hidden;white-space:nowrap;text-overflow:ellipsis
}
.priceBox{
  position: absolute;
  bottom: 0;
  left: 0.2rem;
  width: 100%;
}
</style>
