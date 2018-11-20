<template>
  <div class="vip-index">
    <mt-header fixed title="我的课程"></mt-header>
    <div class="order-tab">
      <ul>
        <li :class="activeName == 1  ? 'active':''" @click="vipCourse(1)">录播课</li>
        <li :class="activeName == 2  ? 'active':''" @click="vipCourse(2)">直播课</li>
        <!--:class="cardStart !== true  ? 'active':''"-->
      </ul>
    </div>
    <!--<div class="order-tabTwo" v-show="activeName == 2">-->
    <!--<ul>-->
    <!--<li class="active">即将开始</li>-->
    <!--<li>直播中</li>-->
    <!--<li>未开始</li>-->
    <!--<li>已结束</li>-->
    <!--&lt;!&ndash;<li :class="showNum === index  ? 'active':''"  v-for="(item,index) in quanstatr" @click="tababc(item.title)" >{{item.title}}</li>&ndash;&gt;-->
    <!--</ul>-->
    <!--</div>-->
    <div class="main-content">
      <a v-if="bannerType == '2' && activeName == 2" :href="bannerUrl"><img style="width:100%" :src="bannerImg" alt=""></a>
      <router-link v-if="bannerType == '1' && activeName == 2" :to="{ name: 'courseconter', query:{id: bannerUrl}}"><img style="width:100%" :src="bannerImg" alt=""></router-link>
      <div class="main-list" v-for="(item,index) in courseBox" :key="index">
        <!--<router-link :to="{ name: 'courseconter', query:{id:item.id}}">-->
          <div class="main-list-left" @click="juop(item.id,item.openTime)">
            <img :src="item.courseImg">
            <!--<span v-if="item.courseType == 2">{{item.status}}</span>-->
            <!--<p v-if="item.courseType == 2">开播时间：{{item.upAt}}</p>-->
          </div>
          <div class="main-list-rt">
            <p>{{item.courseTitle}}</p>
            <div class="main-list-rt-bm">
              <span v-if="item.openTime == '1' ">课程已过期</span>
              <!-- <button>进入学习</button> -->
            </div>
          </div>
        <!--</router-link>-->
      </div>
    </div>
    <div>
      <div style="height: 1rem"></div>
      <footerbt :srconeC="srconeC" :srconeA=" srconeA " :srconeB=" srconeB " :srconeD=" srconeD " :srconeE=" srconeE "></footerbt>
    </div>
  </div>

</template>
<script>
import { Toast } from "mint-ui";
import footerbt from "@/components/public/foot";
export default {
  name: "main",
  components: {
    footerbt
  },
  data() {
    return {
      srconeA: require("../public/publicimg/foot-icon1.png"),
      srconeB: require("../public/publicimg/foot-icon2.png"),
      srconeC: require("../public/publicimg/foot-icon13.png"),
      srconeD: require("../public/publicimg/foot-icon4.png"),
      srconeE: require("../public/publicimg/foot-icon5.png"),
      htitleText: "我的课程",
      activeName: "1",
      courseBox: [],
      courselistBox: [],
      catalogId: '',
      box: [],
      musts: [],
      //分页
      pagination: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      bannerImg: "", //banner图
      bannerType: ""
    };
  },
  methods: {
    add(m) {
      return m < 10 ? "0" + m : m;
    },
    juop(id, judge) {
      if (judge == "0") {
        this.$router.push({ name: "courseconter", query: { id: id } });
      } else {
        return;
      }
    },
    // 跳转课程目录
    JumpUp(id){
      // 获取
      this.getCourseDel(id)
    },
    //获取当前userId
    userIdBox() {
      this.axios.get("/api/party/user/v2/user/session", {})
        .then(response => {
          if (response.data.status == "888") {
            this.$router.push({ path: "/login", query: { id: "main" } });
          } else {
            this.userId = response.data.data.userId;
            this.vipCourse("1");
            if (this.$route.query.classType == "1") {
              //录播
              this.activeName = "1";
              this.vipCourse("1");
            } else if (this.$route.query.classType == "2") {
              this.activeName = "2";
              this.vipCourse("2");
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取已购买的科目
    vipCourse(id) {
      if (id == 1) {
        this.activeName = "1";
      } else if (id == 2) {
        this.activeName = "2";
      }
      if (id == "1") {
        this.musts = [
          {
            term: {
              f_userId: this.userId
            }
          },
          {
            term: {
              f_classType: "1"
            }
          }
        ];
      } else if (id == "2") {
        this.musts = [
          {
            term: {
              f_userId: this.userId
            }
          },
          {
            term: {
              f_classType: "2"
            }
          }
        ];
      }
      this.axios
        .post(`/es/productonuser/f/_search`, {
          query: {
            bool: {
              must: this.musts
            }
          },
          from: 0,
          size: 100,
          sort: [
            {
              f_openTime: {
                order: "desc"
              }
            }
          ]
        })
        .then(response => {
          //课程总数
          this.pagination.total = response.data.hits.total;
          this.course(response.data.hits.hits);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //科目内容
    course(courseAll) {
      let courseBox = [];
      let status = "";
      for (let i = 0; i < courseAll.length; i++) {
        //到期时间
        var date = new Date(courseAll[i]._source.f_delAt);
        var myDate = new Date();
        var time = "";
        if (date < myDate) {
          time = "1";
        } else {
          time = "0";
        }
        //          var year = date.getFullYear();
        //          var month = date.getMonth() + 1;
        //          var day = date.getDate();
        //          var time = year+ '-' + this.add(month) + '-' + this.add(day);
        //直播开始时间
        var showdate = new Date(courseAll[i]._source.f_upAt);
        var showyear = showdate.getFullYear();
        var showmonth = showdate.getMonth() + 1;
        var showday = showdate.getDate();
        var showhouer = showdate.getHours();
        var showminutes = showdate.getMinutes();
        var showseconds = showdate.getSeconds();
        var showtime =
          showyear +
          "-" +
          this.add(showmonth) +
          "-" +
          this.add(showday) +
          " " +
          this.add(showhouer) +
          ":" +
          this.add(showminutes);
        //直播状态
        if (courseAll[i]._source.f_curriculaState == "1") {
          status = "直播中";
        } else if (courseAll[i]._source.f_curriculaState == "2") {
          status = "未开始";
        } else if (courseAll[i]._source.f_curriculaState == "3") {
          status = "已结束";
        } else if (courseAll[i]._source.f_curriculaState == "4") {
          status = "即将开始";
        }
        courseBox.push({
          courseImg: courseAll[i]._source.f_mainPicture, //图片
          courseTitle: courseAll[i]._source.f_productName, //课程名称
          id: courseAll[i]._source.f_productId, //课程id
          courseType: courseAll[i]._source.f_classType, //课程类型
          openTime: time, //有效期
          upAt: showtime, //直播开始时间
          status: status
        });
      }
      this.courseBox = courseBox;
    },
    // 根据课程id获取课程详情页
    getCourseDel(id){
      this.axios.get(`/es/index_product/type_product/${id}`)
      .then( response => {
        if(response.status == 200){
          this.catalogId = response.data._source.type_product_catalogId
          this.$router.push({ name: 'directory', query: {id: id,catalogId:this.catalogId}})
        }
      })
    },
    banner() {
      this.axios
        .post("/es/cms_content_index/cms_content_type/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "2c91718a64cf42d301655f6c0f8000de"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 10,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          if (response.status == 200) {
            this.bannerType =
              response.data.hits.hits[0]._source.cms_content_type_spare;
            this.bannerImg =
              response.data.hits.hits[0]._source.cms_content_type_thumbLocalUrl;
            if (
              response.data.hits.hits[0]._source.cms_content_type_spare == "2"
            ) {
              this.bannerUrl =
                response.data.hits.hits[0]._source.cms_content_type_remark;
            } else {
              this.bannerUrl = JSON.parse(
                response.data.hits.hits[0]._source.cms_content_type_remark
              ).id;
            }
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.banner();
    this.userIdBox();
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-header {
  background: #3acbae;
  height: 1rem;
}
.vip-index {
  height: 100%;
  background: #f4f4f4;
}
.order-tab {
  position: fixed;
  top: 1rem;
  background: #fff;
  z-index: 111;
  padding: 0.2rem 0.2rem 0.2rem 0.2rem;
  width: 100%;
  background: #fff;
  height: 0.95rem;
  overflow: hidden;
}
.order-tab li {
  width: 50%;
  text-align: center;
  line-height: 0.72rem;
  float: left;
  font-size: 0.3rem;
  border: 1px solid #3acbae;
}
.order-tab .active {
  background: #3acbae;
  color: #fff;
}
.order-tabTwo {
  height: 0.73rem;
  width: 100%;
  background: #fff;
  margin-top: 0.2rem;
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
}
.order-tabTwo li {
  float: left;
  width: 25%;
  text-align: center;
  line-height: 0.7rem;
}
.order-tabTwo .active {
  border-bottom: 1px solid #3acbae !important;
  color: #3acbae;
}
.main-list {
  height: 2.1rem;
  width: 7.1rem;
  margin: 0 0.2rem 0 0.2rem;
  padding-top: 0.2rem;
  border-bottom: 1px solid #e6e6e6;
  overflow: hidden;
}
.main-content {
  background: #fff;
  padding-top: 2rem;
}
.main-list-left {
  float: left;
  position: relative;
  height: 1.7rem;
}
.main-list-left span {
  position: absolute;
  top: 0;
  right: 0.2rem;
  display: block;
  width: auto;
  height: 0.5rem;
  color: #fff;
  background: #3acbae;
  text-align: center;
  line-height: 0.5rem;
  padding: 0 0.1rem 0 0.1rem;
}
.main-list-left p {
  position: absolute;
  bottom: 0;
  right: 0.2rem;
  left: 0;
  height: 0.48rem;
  line-height: 0.48rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 0.2rem;
}
.main-list-left img {
  width: 2.8rem;
  height: 1.7rem;
  margin-right: 0.2rem;
}
.main-list-rt p {
  font-size: 0.28rem;
  color: #333333;
  line-height: 0.35rem;
  height: 1.15rem;
}
.main-list-rt-bm {
  overflow: hidden;
}
.main-list-rt-bm span {
  color: #5e5e5e;
  float: left;
  line-height: 0.6rem;
  color: red;
}
.main-list-rt-bm span i {
  color: #ff7200;
}
.main-list-rt-bm button {
  float: right;
  width: 1.6rem;
  height: 0.5rem;
  color: #3acbae;
  border-radius: 2px;
  background: none;
  border: 1px solid #3acbae;
}
</style>
