<template>
  <div>
    <div class="login-shou">
      <div class="index-header">
        <!--搜索栏-->
        <div class="index-search" @click="search()">
          <div class="index-search-img"></div>
          <input type="text" placeholder="请输入搜索关键字">
        </div>
        <!--系统消息-->
        <div class="index-information" @click="information()">
          <div class="index-information-img"></div>
          <div>消息</div>
        </div>
      </div>
      <div style="height: 1rem"></div>
      <!--bannar-->
      <div class="index-bannar">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in bannerList" :key ="index">
            <!--链接-->
            <a v-if="item.bannertype == '2'" :href="item.bannerurl.indexOf('dxl') > -1 ? 'http://mobile.iqihang.com/zt/cmsH2/' : item.bannerurl " :title="item.bannerTitle" target="_blank">
              <img :src='item.bannerImg' alt="">
            </a>
            <!--课程-->
            <router-link v-if="item.bannertype == '1'" :to="{ name: 'courseconter', query:{id:item.bannerurl}}"><img :src='item.bannerImg' alt=""></router-link>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!--推送消息-->
      <!-- <div class="push-silder">
        <mt-swipe :show-indicators="false">
          <mt-swipe-item v-for="(item,index) in noticeList" :key="index">
            <a>
              <img src="./loginImg/shou-trumpet.png" alt="">
              <span><router-link :to="{ path: '/notice', query:{id:item.noticeId}}">{{item.noticeTitle}}</router-link></span>
            </a>
          </mt-swipe-item>
        </mt-swipe>
      </div> -->
      <!--分类-->
      <div style='height:2rem;overflow:hidden'>
        <ul class="tab-head">
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研数学'}}">
                <div class="classify-icon"></div>
                <p>考研数学</p>
              </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研英语'}}">
                <div class="classify-icon"></div>
                <p>考研英语</p>
            </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研政治'}}">
                <div class="classify-icon"></div>
                <p>考研政治</p>
              </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研专硕',courseTitle:'管理类联考（199）'}}">
                <div class="classify-icon"></div>
                <p>管理类联考</p>
              </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研专硕',courseTitle:'经济类联考（396）'}}">
                <div class="classify-icon"></div>
                <p>经济类联考</p>
              </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研专业课',courseTitle:'西医综合'}}">
                <div class="classify-icon"></div>
                <p>西医综合</p>
              </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研专业课',courseTitle:'经济学'}}">
                <div class="classify-icon"></div>
                <p>经济学</p>
              </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研公共课'}}">
                <div class="classify-icon"></div>
                <p>更多课程</p>
              </router-link>
          </li>
        </ul>
      </div>
      <!-- <div class="classify">
        <ul class='tab-head'>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研数学'}}">
              <div class="classify-icon"></div>
              <p>考研数学</p>
            </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研英语'}}">
              <div class="classify-icon"></div>
              <p>考研英语</p>
            </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研政治'}}">
              <div class="classify-icon"></div>
              <p>考研政治</p>
            </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研专硕',courseTitle:'管理类联考（199）'}}">
              <div class="classify-icon"></div>
              <p>管理类联考</p>
            </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研专硕',courseTitle:'经济类联考（396）'}}">
              <div class="classify-icon"></div>
              <p>经济类联考</p>
            </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研专业课',courseTitle:'西医综合'}}">
              <div class="classify-icon"></div>
              <p>西医综合</p>
            </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研专业课',courseTitle:'经济学'}}">
              <div class="classify-icon"></div>
              <p>经济学</p>
            </router-link>
          </li>
          <li class="tab-head-item">
            <router-link :to="{ path: '/course', query:{course:'考研公共课',courseTitle:'考研数学'}}">
              <div class="classify-icon"></div>
              <p>更多课程</p>
            </router-link>
          </li>
        </ul>
      </div> -->
      
      <!-- 近期直播课 -->

      <div class="futureLiveBox" v-if="futureLiveList.length !== 0">
        <div class="futureLiveTitle">
          <span>近期直播</span>
          <router-link :to="{ path: '/course/courselive', query:{course:'考研公共课'}}">更多直播</router-link>
        </div>
        <ul>
          <li v-for="(item,index) in futureLiveList" :key='index'>
            <a v-if="item.remark !== ''" :href="item.remark.indexOf('dxl') > -1 ? 'http://mobile.iqihang.com/zt/cmsH2/' : item.remark ">
              <article class="touxiang"><img :src="item.imgUrl" alt=""></article>
              <article class="live_text">
                <div class="live_textTop">
                  <span class="liveStatus" :class="{active: item.status}">{{item.statusTxt}}</span>
                  <span class="liveTitle">{{item.title}}</span>
                </div>
                <div class="live_textBom">
                  <span>{{item.price}}</span>
                  <span>开播时间:{{item.time}}</span>
                </div>
              </article>
            </a>
            <router-link v-if="item.remark == ''" :to="{ name: 'courseconter', query:{id:item.id}}">
              <article class="touxiang"><img :src="item.imgUrl" alt=""></article>
              <article class="live_text">
                <div class="live_textTop">
                  <span class="liveStatus" :class="{active: item.status}">{{item.statusTxt}}</span>
                  <span class="liveTitle">{{item.title}}</span>
                </div>
                <div class="live_textBom">
                  <span>{{item.price}}</span>
                  <span>开播时间:{{item.time}}</span>
                </div>
              </article>
            </router-link>
          </li>
        </ul>
      </div>

      <!--考研公共课-->
      <div class="subclassification">
        <div class="subclassification-title" id="active">
          考研公共课
        </div>
        <!--课程tab切换-->
        <div class="subclassification-tab">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">考研数学</mt-tab-item>
            <mt-tab-item id="2">考研英语</mt-tab-item>
            <mt-tab-item id="3">考研政治</mt-tab-item>
          </mt-navbar>
          <!-- tab-container -->
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
              <!--数学-->
              <div v-show=" index < 4" :key="index" v-for="(item,index) in mathematicsList">
                <router-link :to="{ name: 'courseconter', query:{id:item.id}}">
                  <!--{{item.searchTitle}}-->

                  <img  :src="item.img">
                  <p>{{item.title}}</p>
                  <p>
                    <span>
                      <span class="yhj">￥{{item.lowPrice}}</span><s v-if="item.highPrice != '0.00'">￥{{item.highPrice}}</s>
                    </span>
                    <span class="rs"><span></span>{{item.salesVolumee}}</span>
                  </p>
                </router-link>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <!--英语-->
              <div v-show=" index < 4" :key="index" v-for="(item,index) in englishList">
                <router-link :to="{ name: 'courseconter', query:{id:item.id}}">
                  <img :src="item.img">
                  <p>{{item.title}}</p>
                  <p>
                    <span>
                      <span class="yhj">￥{{item.lowPrice}}</span><s v-if="item.highPrice != '0.00'">￥{{item.highPrice}}</s>
                    </span>
                    <span class="rs"><span></span>{{item.salesVolumee}}</span>
                  </p>
                </router-link>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
              <!--政治-->
              <div v-show=" index < 4" :key="index" v-for="(item,index) in politicsList">
                <router-link :to="{ name: 'courseconter', query:{id:item.id}}">
                  <!--{{item.searchTitle}}-->

                  <img :src="item.img">
                  <p>{{item.title}}</p>
                  <p>
                    <span>
                      <span class="yhj">￥{{item.lowPrice}}</span><s v-if="item.highPrice != '0.00'">￥{{item.highPrice}}</s>
                    </span>
                    <span class="rs"><span></span>{{item.salesVolumee}}</span>
                  </p>
                </router-link>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </div>
      <!--考研专硕-->
      <div class="subclassification">
        <div class="subclassification-title" id="">
          考研专硕
        </div>
        <!--课程tab切换-->
        <div class="subclassification-tab hight46">
          <mt-navbar v-model="selected2">
            <mt-tab-item id="1">管理类联考</mt-tab-item>
            <mt-tab-item id="2">经济类联考</mt-tab-item>
          </mt-navbar>
          <!-- tab-container -->
          <mt-tab-container v-model="selected2">
            <mt-tab-container-item id="1">
              <!--西综-->
              <div v-show=" index < 2" :key="index"  v-for="(item,index) in glllkList">
                <router-link :to="{ name: 'courseconter', query:{id:item.id}}">
                  <!--{{item.searchTitle}}-->

                  <img  :src="item.img">
                  <p>{{item.title}}</p>
                  <p>
                    <span>
                      <span class="yhj">￥{{item.lowPrice}}</span><s v-if="item.highPrice != '0.00'">￥{{item.highPrice}}</s>
                    </span>
                    <span class="rs"><span></span>{{item.salesVolumee}}</span>
                  </p>
                </router-link>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <!--经济类联考-->
              <div v-show=" index < 2" :key="index" v-for="(item,index) in economicskindList">
                <router-link :to="{ name: 'courseconter', query:{id:item.id}}">
                  <!--{{item.searchTitle}}-->

                  <img  :src="item.img">
                  <p>{{item.title}}</p>
                  <p>
                    <span>
                      <span class="yhj">￥{{item.lowPrice}}</span><s v-if="item.highPrice != '0.00'">￥{{item.highPrice}}</s>
                    </span>
                    <span class="rs"><span></span>{{item.salesVolumee}}</span>
                  </p>
                </router-link>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </div>
      <!--考研专业课-->
      <div class="subclassification">
        <div class="subclassification-title" id="active">
          考研专业课
        </div>
        <!--课程tab切换-->
        <div class="subclassification-tab hight46">
          <mt-navbar v-model="selected1">
            <mt-tab-item id="1">西医综合</mt-tab-item>
            <!--<mt-tab-item id="2">心理学</mt-tab-item>-->
            <!--<mt-tab-item id="3">教育学</mt-tab-item>-->
            <mt-tab-item id="2">经济学</mt-tab-item>
            <mt-tab-item id="3">金融硕士</mt-tab-item>
          </mt-navbar>
          <!-- tab-container -->
          <mt-tab-container v-model="selected1">
            <mt-tab-container-item id="1">
              <!--西综-->
              <div v-show=" index < 2" :key="index"  v-for="(item,index) in xiyiList">
                <router-link :to="{ name: 'courseconter', query:{id:item.id}}">
                  <!--{{item.searchTitle}}-->

                  <img  :src="item.img">
                  <p>{{item.title}}</p>
                  <p>
                    <span>
                      <span class="yhj">￥{{item.lowPrice}}</span><s v-if="item.highPrice != '0.00'">￥{{item.highPrice}}</s>
                    </span>
                    <span class="rs"><span></span>{{item.salesVolumee}}</span>
                  </p>
                </router-link>
              </div>
            </mt-tab-container-item>
            <!--<mt-tab-container-item id="2">-->
              <!--&lt;!&ndash;心理学&ndash;&gt;-->
              <!--<div v-for="item in psychologyList">-->
                <!--<router-link :to="{ name: 'courseconter', query:{id:item.psychologyId}}">-->
                  <!--&lt;!&ndash;{{item.searchTitle}}&ndash;&gt;-->

                  <!--<img :src="item.psychologyImg">-->
                  <!--<p>{{item.psychologyTitle}}</p>-->
                  <!--<p>-->
                    <!--<span>-->
                      <!--<span class="yhj">￥{{item.psychologyLowPrice}}</span><s>￥{{item.psychologyHighPrice}}</s>-->
                    <!--</span>-->
                    <!--<span class="rs"><span></span>{{item.psychologySalesVolumee}}</span>-->
                  <!--</p>-->
                <!--</router-link>-->
              <!--</div>-->
            <!--</mt-tab-container-item>-->
            <!--<mt-tab-container-item id="3">-->
              <!--&lt;!&ndash;教育学&ndash;&gt;-->
              <!--<div v-for="item in pedagogyList">-->
                <!--<router-link :to="{ name: 'courseconter', query:{id:item.pedagogyId}}">-->
                  <!--&lt;!&ndash;{{item.searchTitle}}&ndash;&gt;-->

                  <!--<img :src="item.pedagogyImg">-->
                  <!--<p>{{item.pedagogyTitle}}</p>-->
                  <!--<p>-->
                    <!--<span>-->
                      <!--<span class="yhj">￥{{item.pedagogyLowPrice}}</span><s>￥{{item.pedagogyHighPrice}}</s>-->
                    <!--</span>-->
                    <!--<span class="rs"><span></span>{{item.pedagogySalesVolumee}}</span>-->
                  <!--</p>-->
                <!--</router-link>-->
              <!--</div>-->
            <!--</mt-tab-container-item>-->
            <mt-tab-container-item id="2">
              <!--经济学-->
              <div v-show=" index < 2" :key="index"  v-for="(item,index) in economicsList">
                <router-link :to="{ name: 'courseconter', query:{id:item.id}}">
                  <!--{{item.searchTitle}}-->

                  <img :src="item.img">
                  <p>{{item.title}}</p>
                  <p>
                    <span>
                      <span class="yhj">￥{{item.lowPrice}}</span><s v-if="item.highPrice != '0.00'">￥{{item.highPrice}}</s>
                    </span>
                    <span class="rs"><span></span>{{item.salesVolumee}}</span>
                  </p>
                </router-link>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
              <!--金融硕士-->
              <div v-show=" index < 2" :key="index"  v-for="(item,index) in jinrongList">
                <router-link :to="{ name: 'courseconter', query:{id:item.id}}">
                  <!--{{item.searchTitle}}-->

                  <img :src="item.img">
                  <p>{{item.title}}</p>
                  <p>
                    <span>
                      <span class="yhj">￥{{item.lowPrice}}</span><s v-if="item.highPrice != '0.00'">￥{{item.highPrice}}</s>
                    </span>
                    <span class="rs"><span></span>{{item.salesVolumee}}</span>
                  </p>
                </router-link>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </div>
      <!--大学英语-->
      <!--<div class="subclassification">-->
        <!--<div class="subclassification-title" id="">-->
          <!--大学英语-->
        <!--</div>-->
        <!--&lt;!&ndash;课程tab切换&ndash;&gt;-->
        <!--<div class="subclassification-tab hight46">-->
          <!--<mt-navbar v-model="selected3">-->
            <!--<mt-tab-item id="1">英语四级</mt-tab-item>-->
            <!--<mt-tab-item id="2">英语六级</mt-tab-item>-->
          <!--</mt-navbar>-->
          <!--&lt;!&ndash; tab-container &ndash;&gt;-->
          <!--<mt-tab-contain
          er v-model="selected3">-->
            <!--<mt-tab-container-item id="1">-->
              <!--&lt;!&ndash;英语四级&ndash;&gt;-->
              <!--<div v-for="item in englishFourList">-->
                <!--<router-link :to="{ name: 'courseconter', query:{id:item.englishFourId}}">-->
                  <!--&lt;!&ndash;{{item.searchTitle}}&ndash;&gt;-->
                  <!--<img  :src="item.englishFourImg">-->
                  <!--<p>{{item.englishFourTitle}}</p>-->
                  <!--<p>-->
                    <!--<span>-->
                      <!--<span class="yhj">￥{{item.englishFourLowPrice}}</span><s>￥{{item.englishFourHighPrice}}</s>-->
                    <!--</span>-->
                    <!--<span class="rs"><span></span>{{item.englishFourSalesVolumee}}</span>-->
                  <!--</p>-->
                <!--</router-link>-->
              <!--</div>-->
            <!--</mt-tab-container-item>-->
            <!--<mt-tab-container-item id="2">-->
              <!--&lt;!&ndash;英语六级&ndash;&gt;-->
              <!--<div v-for="item in englishSixList">-->
                <!--<router-link :to="{ name: 'courseconter', query:{id:item.englishSixId}}">-->
                  <!--&lt;!&ndash;{{item.searchTitle}}&ndash;&gt;-->

                  <!--<img  :src="item.englishSixImg">-->
                  <!--<p>{{item.englishSixTitle}}</p>-->
                  <!--<p>-->
                    <!--<span>-->
                      <!--<span class="yhj">￥{{item.englishSixLowPrice}}</span><s>￥{{item.englishSixHighPrice}}</s>-->
                    <!--</span>-->
                    <!--<span class="rs"><span></span>{{item.englishSixSalesVolumee}}</span>-->
                  <!--</p>-->
                <!--</router-link>-->
              <!--</div>-->
            <!--</mt-tab-container-item>-->
          <!--</mt-tab-container>-->
        <!--</div>-->
      <!--</div>-->
      <!--医学教育-->
      <!--<div class="subclassification">-->
        <!--<div class="subclassification-title" id="">-->
          <!--医学教育-->
        <!--</div>-->
        <!--&lt;!&ndash;课程tab切换&ndash;&gt;-->
        <!--<div class="subclassification-tab hight46">-->
          <!--<mt-navbar v-model="selected4">-->
            <!--<mt-tab-item id="1">职业医师</mt-tab-item>-->
            <!--<mt-tab-item id="2">职业药师</mt-tab-item>-->
          <!--</mt-navbar>-->
          <!--&lt;!&ndash; tab-container &ndash;&gt;-->
          <!--<mt-tab-container v-model="selected4">-->
            <!--<mt-tab-container-item id="1">-->
              <!--&lt;!&ndash;职业医师&ndash;&gt;-->
              <!--<div v-for="item in physicianList">-->
                <!--<router-link :to="{ name: 'courseconter', query:{id:item.physicianId}}">-->
                  <!--&lt;!&ndash;{{item.searchTitle}}&ndash;&gt;-->
                  <!--<img  :src="item.physicianImg">-->
                  <!--<p>{{item.physicianTitle}}</p>-->
                  <!--<p>-->
                    <!--<span>-->
                      <!--<span class="yhj">￥{{item.physicianLowPrice}}</span><s>￥{{item.physicianHighPrice}}</s>-->
                    <!--</span>-->
                    <!--<span class="rs"><span></span>{{item.physicianSalesVolumee}}</span>-->
                  <!--</p>-->
                <!--</router-link>-->
              <!--</div>-->
            <!--</mt-tab-container-item>-->
            <!--<mt-tab-container-item id="2">-->
              <!--&lt;!&ndash;职业药师&ndash;&gt;-->
              <!--<div v-for="item in englishSixList">-->
                <!--<router-link :to="{ name: 'courseconter', query:{id:item.medicineId}}">-->
                  <!--&lt;!&ndash;{{item.searchTitle}}&ndash;&gt;-->

                  <!--<img  :src="item.medicineImg">-->
                  <!--<p>{{item.medicineTitle}}</p>-->
                  <!--<p>-->
                    <!--<span>-->
                      <!--<span class="yhj">￥{{item.medicineLowPrice}}</span><s>￥{{item.medicineHighPrice}}</s>-->
                    <!--</span>-->
                    <!--<span class="rs"><span></span>{{item.medicineSalesVolumee}}</span>-->
                  <!--</p>-->
                <!--</router-link>-->
              <!--</div>-->
            <!--</mt-tab-container-item>-->
          <!--</mt-tab-container>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div>
      <div style="height: 1rem"></div>
      <footerbt :srconeC="srconeC" :srconeA=" srconeA " :srconeB=" srconeB " :srconeD=" srconeD " :srconeE=" srconeE "></footerbt>
      <!--首页弹窗-->
      <div class="indexlayer" v-show="bannerlayer">
        <div class="indexlayer_img">
          <router-link :to="{ name: 'courseconter', query:{ id : brandId }}" v-if="brandType == '1'">
            <img :src="brandPcurl">
          </router-link>
          <a :href="brandContent" target="_blank" v-if="brandType == '2'"><img :src="brandPcurl" ></a>
          <img class="indexlayer_close" @click="closeindexlayer" src="./loginImg/loginClose.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import footerbt from "@/components/public/foot";
export default {
  name: "shou",
  components: {
    footerbt
  },
  data() {
    return {
      srconeA: require("../public/publicimg/foot-icon11.png"),
      srconeB: require("../public/publicimg/foot-icon2.png"),
      srconeC: require("../public/publicimg/foot-icon3.png"),
      srconeD: require("../public/publicimg/foot-icon4.png"),
      srconeE: require("../public/publicimg/foot-icon5.png"),
      selected: "1",
      selected1: "1",
      selected2: "1",
      selected3: "1",
      selected4: "1",
      bannerList: [],
      noticeList: [],
      mathematicsList: [],
      englishList: [],
      politicsList: [],
      xiyiList: [],
      psychologyList: [],
      pedagogyList: [],
      economicsList: [],
      glllkList: [],
      englishFourList: [],
      englishSixList: [],
      medicineList: [],
      physicianList: [],
      economicskindList: [],
      bannerlayer: false,
      brandType: "",
      brandPcurl: "",
      brandContent: "",
      brandId: "",
      jinrongList: [],
      futureLiveList: []
    };
  },
  methods: {
    //获取首页静态数据
    getHomeJson(){
      this.axios.get('http://oss2.iqihang.com/json/home_page/h5.json?v='+ new Date().getTime())
      .then(response => {
        this.indexBanner(response.data.bannerData);
        if (response.data.home_window && response.data.home_window.length != "0") {
            this.bannerlayer = true;
            this.brandType = response.data.home_window[0]._source.type_brand_type;
            this.brandPcurl =
              response.data.home_window[0]._source.type_brand_moveurl;
            this.brandContent =
              response.data.home_window[0]._source.type_brand_content;
            let classId = '';
            console.log(this.brandType)
            if(this.brandType == '1'){
              classId = JSON.parse(response.data.home_window[0]._source.type_brand_content).id
            }  
            this.brandId = classId;
          }
        response.data.recentLiveData && this.futureLive(response.data.recentLiveData)  
        this.forHomeDate(0,response.data.publicCourse_math)
        this.forHomeDate(1,response.data.publicCourse_english)
        this.forHomeDate(2,response.data.publicCourse_politics)
        this.forHomeDate(3,response.data.specialMaster_managementExam)
        this.forHomeDate(4,response.data.specialMaster_economicalExam)
        this.forHomeDate(5,response.data.professionalCourses_westernMedicine)
        this.forHomeDate(6,response.data.professionalCourses_economic)
        this.forHomeDate(7,response.data.professionalCourses_finance)
      })
      .catch( error => {
        console.log(error)
      })
    },
    //弹窗
    indexLayer() {
      this.axios
        .post(`/es/index_brand/type_brand/_search`, {
          query: {
            bool: {
              must: [
                {
                  query_string: {
                    query: "popup",
                    fields: ["type_brand_datatype"]
                  }
                },
                {
                  term: {
                    type_brand_status: "1"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 1
        })
        .then(response => {
          if (response.data.hits.hits.length != "0") {
            this.bannerlayer = true;
            this.brandType = response.data.hits.hits[0]._source.type_brand_type;
            this.brandPcurl =
              response.data.hits.hits[0]._source.type_brand_moveurl;
            this.brandContent =
              response.data.hits.hits[0]._source.type_brand_content;
            let classId = JSON.parse(
              response.data.hits.hits[0]._source.type_brand_content
            );
            this.brandId = classId.id;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeindexlayer() {
      this.bannerlayer = false;
    },
    //首页bannar
    indexBanner(response) {
          let indexBannarUrl = "";
          let indexBannarList = response,
            arr = [];
          for (let i = 0; i < indexBannarList.length; i++) {
            //判断类型跳转 1是课程 2是外链
            if (indexBannarList[i]._source.cms_content_type_spare == "2") {
              indexBannarUrl =
                indexBannarList[i]._source.cms_content_type_remark;
            } else if (
              indexBannarList[i]._source.cms_content_type_spare == "1"
            ) {
              let idbox = JSON.parse(
                indexBannarList[i]._source.cms_content_type_remark
              );
              indexBannarUrl = idbox.id;
            }
            arr.push({
              bannertype: indexBannarList[i]._source.cms_content_type_spare, //链接类型
              bannerImg:
                indexBannarList[i]._source.cms_content_type_userRealName, //图片地址
              bannerurl: indexBannarUrl, //图片链接
              bannerTitle: indexBannarList[i]._source.cms_content_type_title //图片title
            });
          }
          this.bannerList = arr;
    },
    //点击搜索跳转搜索页面
    search() {
      this.$router.push({ path: "search" });
    },
    //点击跳转我的消息
    information() {
      this.axios
        .get(`/api/party/user/v2/user/session`, {})
        .then(response => {
          //          console.log(response);
          if (response.data.status == "888") {
            this.$router.push({ path: "login" }); //登录
          } else {
            this.$router.push({ path: "vip/news" }); //我的消息
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取公告
    notice() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "402881e65d301f5b015d31077085001d"
                  }
                },
                {
                  term: {
                    cms_content_type_businessId: "1001"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 10,
          sort: [
            { cms_content_type_topView: { order: "desc" } },
            { cms_content_type_hotspotView: { order: "desc" } },
            { cms_content_type_createdAt: { order: "desc" } }
          ]
        })
        .then(response => {
          let noticeList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < noticeList.length; i++) {
            arr.push({
              noticeTitle: noticeList[i]._source.cms_content_type_title, //公告标题
              noticeContent: noticeList[i]._source.cms_content_type_content, //内容
              noticeId: noticeList[i]._source.cms_content_type_id //内容
              //              noticeCreatedAt:noticeList[i]._source.cms_content_type_createdAt,//添加时间
              //              noticeBrowse:noticeList[i]._source.cms_content_type_totalViews//浏览量
            });
          }
          this.noticeList = arr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //考研数学
    mathematics() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d8a714000d"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 4,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let mathematicsList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < mathematicsList.length; i++) {
            let curriculum = JSON.parse(
              mathematicsList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              mathematicsTitle:
                mathematicsList[i]._source.cms_content_type_title, //课程名称
              mathematicsImg: curriculum.mainPicture, //图片
              mathematicsId: curriculum.id, //课程id
              mathematicsLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              mathematicsHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              mathematicsSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.mathematicsList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //考研英语
    english() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d8b521000f"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 4,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let englishList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < englishList.length; i++) {
            let curriculum = JSON.parse(
              englishList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              englishTitle: englishList[i]._source.cms_content_type_title, //课程名称
              englishImg: curriculum.mainPicture, //图片
              englishId: curriculum.id, //课程id
              englishLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              englishsHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              englishSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.englishList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //考研政治
    politics() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d8ae5b000e"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 4,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let politicsList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < politicsList.length; i++) {
            let curriculum = JSON.parse(
              politicsList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              politicsTitle: politicsList[i]._source.cms_content_type_title, //课程名称
              politicsImg: curriculum.mainPicture, //图片
              politicsId: curriculum.id, //课程id
              politicsLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              politicsHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              politicsSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.politicsList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //西医
    xiyi() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d96e0b0016"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 2,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let xiyiList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < xiyiList.length; i++) {
            let curriculum = JSON.parse(
              xiyiList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              xiyiTitle: xiyiList[i]._source.cms_content_type_title, //课程名称
              xiyiImg: curriculum.mainPicture, //图片
              xiyiId: curriculum.id, //课程id
              xiyiLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              xiyiHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              xiyiSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.xiyiList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //心理学
    psychology() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d9322f0014"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 2,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let psychologyList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < psychologyList.length; i++) {
            let curriculum = JSON.parse(
              psychologyList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              psychologyTitle: psychologyList[i]._source.cms_content_type_title, //课程名称
              psychologyImg: curriculum.mainPicture, //图片
              psychologyId: curriculum.id, //课程id
              psychologyLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              psychologyHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              psychologySalesVolumee: curriculum.salesVolume //购买人数
            });
            this.psychologyList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //教育学
    pedagogy() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d93a9a0015"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 2,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let pedagogyList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < pedagogyList.length; i++) {
            let curriculum = JSON.parse(
              pedagogyList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              pedagogyTitle: pedagogyList[i]._source.cms_content_type_title, //课程名称
              pedagogyImg: curriculum.mainPicture, //图片
              pedagogyId: curriculum.id, //课程id
              pedagogyLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              pedagogyHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              pedagogySalesVolumee: curriculum.salesVolume //购买人数
            });
            this.pedagogyList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //经济学
    economics() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d92a430013"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 2,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let economicsList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < economicsList.length; i++) {
            let curriculum = JSON.parse(
              economicsList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              economicsTitle: economicsList[i]._source.cms_content_type_title, //课程名称
              economicsImg: curriculum.mainPicture, //图片
              economicsId: curriculum.id, //课程id
              economicsLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              economicsHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              economicsSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.economicsList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //金融
    jinrong() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "2c91718b61551ab80161c588e5750153"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 2,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let economicsList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < economicsList.length; i++) {
            let curriculum = JSON.parse(
              economicsList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              economicsTitle: economicsList[i]._source.cms_content_type_title, //课程名称
              economicsImg: curriculum.mainPicture, //图片
              economicsId: curriculum.id, //课程id
              economicsLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              economicsHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              economicsSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.jinrongList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //管理类联考
    glllk() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d8fec80011"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 2,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let glllkList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < glllkList.length; i++) {
            let curriculum = JSON.parse(
              glllkList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              glllkTitle: glllkList[i]._source.cms_content_type_title, //课程名称
              glllkImg: curriculum.mainPicture, //图片
              glllkId: curriculum.id, //课程id
              glllkLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              glllkHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              glllkSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.glllkList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //英语四级
    englishFour() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d9e67e001b"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 2,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let englishFourList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < englishFourList.length; i++) {
            let curriculum = JSON.parse(
              englishFourList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              englishFourTitle:
                englishFourList[i]._source.cms_content_type_title, //课程名称
              englishFourImg: curriculum.mainPicture, //图片
              englishFourId: curriculum.id, //课程id
              englishFourLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              englishFourHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              englishFourSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.englishFourList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //英语六级
    englishSix() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d9ef3f001c"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 2,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let englishSixList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < englishSixList.length; i++) {
            let curriculum = JSON.parse(
              englishSixList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              englishSixTitle: englishSixList[i]._source.cms_content_type_title, //课程名称
              englishSixImg: curriculum.mainPicture, //图片
              englishSixId: curriculum.id, //课程id
              englishSixLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              englishSixHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              englishSixSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.englishSixList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //职业医师
    physician() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d9a53a0018"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 2,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let physicianList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < physicianList.length; i++) {
            let curriculum = JSON.parse(
              physicianList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              physicianTitle: physicianList[i]._source.cms_content_type_title, //课程名称
              physicianImg: curriculum.mainPicture, //图片
              physicianId: curriculum.id, //课程id
              physicianLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              physicianHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              physicianSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.physicianList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //职业药师
    medicine() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "ff8080815e928229015e98d9aee20019"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 2,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let medicineList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < medicineList.length; i++) {
            let curriculum = JSON.parse(
              medicineList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              medicineTitle: medicineList[i]._source.cms_content_type_title, //课程名称
              medicineImg: curriculum.mainPicture, //图片
              medicineId: curriculum.id, //课程id
              medicineLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              medicineHighPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              medicineSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.medicineList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //经济类联考
    economicskind() {
      this.axios
        .post(`/es/cms_content_index/cms_content_type/_search`, {
          query: {
            bool: {
              must: [
                {
                  term: {
                    cms_content_type_classifyId:
                      "2c91718b602b7b26016072f0d294010f"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 2,
          sort: [{ cms_content_type_sortView: { order: "asc" } }]
        })
        .then(response => {
          let economicskindList = response.data.hits.hits,
            arr = [];
          for (let i = 0; i < economicskindList.length; i++) {
            let curriculum = JSON.parse(
              economicskindList[i]._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              economicskindTitle:
                economicskindList[i]._source.cms_content_type_title, //课程名称
              economicskindImg: curriculum.mainPicture, //图片
              economicskindId: curriculum.id, //课程id
              economicskindLowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              economicskindHighPrice: parseFloat(curriculum.highPrice).toFixed(
                2
              ), //原价
              economicskindSalesVolumee: curriculum.salesVolume //购买人数
            });
            this.economicskindList = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    noticeHref(id) {
      //公告
    },
    /*判断当前设备跳转到指定地址。PCurl:PC端地址；WebUel:PC端地址；*/
    MBjudgment(PCurl) {
      var UserClient = navigator.userAgent.toLowerCase();
      var IsIPad = UserClient.match(/ipad/i) == "ipad";
      var IsIphoneOs = UserClient.match(/iphone os/i) == "iphone os";
      var IsMidp = UserClient.match(/midp/i) == "midp";
      var IsUc7 = UserClient.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var IsUc = UserClient.match(/ucweb/i) == "ucweb";
      var IsAndroid = UserClient.match(/android/i) == "android";
      var IsCE = UserClient.match(/windows ce/i) == "windows ce";
      var IsWM = UserClient.match(/windows mobile/i) == "windows mobile";
      if (
        IsIPad || IsIphoneOs || IsMidp || IsUc7 || IsUc || IsAndroid || IsCE || IsWM
      ) {
      } else {
        window.location.href = PCurl;
      }
    },
    // 近期直播
    futureLive(res) {
          let data = res,arr = [];
          if(data.length == 0){return}
          for (var i = 0; i < data.length; i++) {
            let time = data[i]._source.cms_content_type_startTime,
              endTime = data[i]._source.cms_content_type_endTime,
              year = new Date(time).getFullYear(),
              mouth = new Date(time).getMonth() + 1,
              day = new Date(time).getDate(),
              hours = new Date(time).getHours(),
              minutes = new Date(time).getMinutes(),
              seconds = new Date(time).getSeconds(),
              newTime = new Date().getTime(),
              leftTime = endTime - newTime,
              statusTxt = "未开始",
              status = false;
            if (leftTime <= 0) {
              statusTxt = "已结束";
            } else if (time < newTime && newTime < endTime) {
              status = true;
              statusTxt = "直播中";
            }
            if (mouth < 10) {
              mouth = "0" + mouth;
            }
            if (day < 10) {
              day = "0" + day;
            }
            if (hours < 10) {
              hours = "0" + hours;
            }
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
            arr.push({
              id: data[i]._source.cms_content_type_spare == '1' ? JSON.parse(data[i]._source.cms_content_type_remark).id : '',
              status: status,
              statusTxt: statusTxt,
              title: data[i]._source.cms_content_type_title,
              time: `${year}-${mouth}-${day} ${hours}:${minutes}:${seconds}`,
              price: data[i]._source.cms_content_type_price == "0" ? "免费" : "￥" + data[i]._source.cms_content_type_price,
              imgUrl: data[i]._source.cms_content_type_userRealName,
              space: data[i]._source.cms_content_type_spare,
              remark: data[i]._source.cms_content_type_spare == '1' ? '' : data[i]._source.cms_content_type_remark
            });
          }
          this.futureLiveList = arr;
    },
    // 二次处理首页数据
    forHomeDate(num,json){  // 0 代表数学  1 英语  2 政治  3 管理类联考  4 经济类联考  5 西医综合  6 经济学  7 金融硕士 
      let arr = [];
      json.map( item => {
         let curriculum = JSON.parse(
              item._source.cms_content_type_remark
            ); //课程详情
            arr.push({
              title: item._source.cms_content_type_title, //课程名称
              img: curriculum.mainPicture, //图片
              id: curriculum.id, //课程id
              lowPrice: parseFloat(curriculum.lowPrice).toFixed(2), //折后价
              highPrice: parseFloat(curriculum.highPrice).toFixed(2), //原价
              salesVolumee: curriculum.salesVolume //购买人数
            });
      })
      if(num == 0) return this.mathematicsList = arr;
      if(num == 1) return this.englishList = arr;
      if(num == 2) return this.politicsList = arr;
      if(num == 3) return this.glllkList = arr;
      if(num == 4) return this.economicskindList = arr;
      if(num == 5) return this.xiyiList = arr;
      if(num == 6) return this.economicsList = arr;
      if(num == 7) return this.jinrongList = arr;
    },
    // 清除sessionStorage 数据
    removeSessionStorage(){
      sessionStorage.clear()
    }
  },
  mounted() {
      this.getHomeJson()
      this.MBjudgment("http://www.iqihang.com/");
      this.removeSessionStorage()
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-head {
  list-style-type: none;
  display: flex;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: white;
  overflow: auto;
  padding: 0.2rem;
  -webkit-overflow-scrolling: touch;
}
.tab-head-item {
  flex: 1 0 auto;
  width: 1.7rem;
  height: 1.75rem;
  color: white;
  padding: 0 5px;
}
.futureLiveBox {
  overflow: hidden;
  margin-top: 0.2rem;
  padding: 0 0.2rem;
  background: white;
  height: 2.2rem;
}
.futureLiveTitle {
  line-height: 0.88rem;
  font-size: 0.3rem;
}
.futureLiveTitle span {
  font-size: 0.3rem;
}
.futureLiveTitle a {
  float: right;
  background-color: #3acbae;
  color: white;
  padding: 0.01rem 0.1rem;
  line-height: 0.4rem;
  border-radius: 0.05rem;
  font-size: 0.2rem;
  margin-top: 0.19rem;
}
.futureLiveBox ul {
  display: flex;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  background: white;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.futureLiveBox li {
  flex: 1 0 auto;
  width: 90%;
  height: 1.3rem;
  padding: 0 5px;
}
.futureLiveBox li {
  display: flex;
}
.futureLiveBox li a {
  width: 100%;
  display: flex;
}
.futureLiveBox li article {
  flex: 0 1 auto;
}
.futureLiveBox li article.touxiang {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background-color: #999999;
  overflow: hidden;
}
.futureLiveBox li article.touxiang img {
  width: 100%;
  height: 100%;
}
.live_text {
  width: 80%;
  margin-left: 0.2rem;
}
.live_textTop {
  overflow: hidden;
  height: 0.5rem;
}
.live_text .liveStatus {
  background-color: #999;
  color: white;
  padding: 0.05rem;
  border-radius: 0.02rem;
  font-size: 0.16rem;
  display: inline-block;
  float: left;
  margin-top: 0.1rem;
}
.live_textTop span.active {
  background-color: #ff9205;
}
@media screen and (max-width: 320px) {
  .live_text .liveTitle {
    width: 3.5rem !important;
    font-size: 0.2rem;
  }
}
@media screen and (min-width: 375px) {
  .live_text .liveTitle {
    width: 3.9rem !important;
    font-size: 0.28rem;
  }
}
@media screen and (min-width: 414px) {
  .live_text .liveTitle {
    width: 4rem !important;
    font-size: 0.3rem;
  }
}
.live_text .liveTitle {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 0.5rem;
  margin-left: 0.1rem;
  width: 80%;
}
.live_textBom {
  margin-top: 0.2rem;
}
.live_textBom span:first-of-type {
  color: #3acbae;
}
.live_textBom span:last-of-type {
  color: #ff5906;
}
.live_textBom span:last-of-type {
  margin-left: 0.1rem;
}
.live_textBom span {
  font-size: 0.2rem;
}
.login-shou {
  background: #f4f4f4;
  height: 100%;
}
.indexlayer {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.indexlayer_img {
  width: 5.8rem;
  height: 7.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -3.75rem;
  margin-left: -2.9rem;
}
.indexlayer_img img:nth-child(1) {
  width: 100%;
  height: 100%;
}
.indexlayer_img img:nth-child(2) {
  margin: 0 auto;
  display: block;
  margin-top: 0.5rem;
}
.index-header {
  background: #3acbae;
  display: flex;
  justify-content: space-between;
  height: 1rem;
  width: 100%;
  padding: 0.18rem 0.4rem 0.18rem 0.2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.index-search-img {
  background: url("./loginImg/shou-search.png") no-repeat;
  background-size: 100% auto;
  width: 0.44rem;
  height: 0.44rem;
  margin: 0.1rem;
}
.index-search {
  display: flex;
  background: #ffffff57;
  width: 5.62rem;
  height: 0.61rem;
  border-radius: 0.1rem;
}
.index-search input {
  background: none;
  font-size: 0.29rem;
  color: #ffffff;
  width: 100%;
}
.index-search input::-webkit-input-placeholder {
  color: #ffffff;
  opacity: 1;
}
.index-information-img {
  background: url("./loginImg/shou-information.png") no-repeat;
  width: 0.46rem;
  height: 0.46rem;
  background-size: 100% auto;
  margin-bottom: 0.03rem;
}
.index-information div:nth-child(2) {
  font-size: 0.2rem;
  color: #ffffff;
}
.push-silder {
  width: 100%;
  height: 0.6rem;
  background: #ffffff;
  margin-bottom: 0.2rem;

  padding-top: 0.13rem;
  padding-left: 0.21rem;
}
/*------------------*/
.push-silder a img {
  width: 0.26rem;
  height: 0.25rem;
  vertical-align: middle;
  margin-right: 0.14rem;
}
.push-silder a span {
  font-size: 0.22rem;
  color: #999999;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
  display: inline-block;
}
.push-silder a span a {
  color: #999999;
}
/*------------------*/
/*大分类*/
.classify {
  background: #ffffff;
  height: 3.95rem;
}
.classify-icon {
  width: 1rem;
  height: 1.01rem;
}
.classify ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: auto;
}
.classify ul li {
  width: 22%;
  margin-top: 0.25rem;
  flex: 1 0 auto;
}
.classify ul li div,
.tab-head-item div {
  margin: auto;
  background-size: 100% auto;
  width: 1.1rem;
  height: 1.1rem;
}
.classify ul li:nth-child(1) div,
.tab-head-item:nth-child(1) div {
  background: url("./loginImg/shou-media1.png") no-repeat center center;
  background-size: 100% auto;
  width: 1.1rem;
  height: 1.1rem;
}
.classify ul li:nth-child(2) div,
.tab-head-item:nth-child(2) div {
  background: url("./loginImg/shou-media2.png") no-repeat;
  background-size: 100% auto;
  width: 1.1rem;
  height: 1.1rem;
}
.classify ul li:nth-child(3) div,
.tab-head-item:nth-child(3) div {
  background: url("./loginImg/shou-media3.png") no-repeat;
  background-size: 100% auto;
  width: 1.1rem;
  height: 1.1rem;
}
.classify ul li:nth-child(4) div,
.tab-head-item:nth-child(4) div {
  background: url("./loginImg/shou-media4.png") no-repeat;
  background-size: 100% auto;
  width: 1.1rem;
  height: 1.1rem;
}
.classify ul li:nth-child(5) div,
.tab-head-item:nth-child(5) div {
  background: url("./loginImg/shou-media5.png") no-repeat;
  background-size: 100% auto;
  width: 1.1rem;
  height: 1.1rem;
}
.classify ul li:nth-child(6) div,
.tab-head-item:nth-child(6) div {
  background: url("./loginImg/shou-media6.png") no-repeat;
  background-size: 100% auto;
  width: 1.1rem;
  height: 1.1rem;
}
.classify ul li:nth-child(7) div,
.tab-head-item:nth-child(7) div {
  background: url("./loginImg/shou-media7.png") no-repeat;
  background-size: 100% auto;
  width: 1.1rem;
  height: 1.1rem;
}
.classify ul li:nth-child(8) div,
.tab-head-item:nth-child(8) div {
  background: url("./loginImg/shou-media8.png") no-repeat;
  background-size: 100% auto;
  width: 1.1rem;
  height: 1.1rem;
}
.classify ul li p,
.tab-head-item p {
  font-size: 0.27rem;
  text-align: center;
  margin-top: 0.25rem;
}
/*小分类*/
.subclassification-title {
  font-size: 0.31rem;
  line-height: 0.65rem;
  padding-left: 0.2rem;
  text-align: center;
}
.subclassification-tab {
  background: #ffffff;
  height: 8.2rem;
  padding: 0 0.2rem;
}
.hight46 {
  height: 4.6rem;
}
</style>
<style>
.page-swipe .slide3 {
  background: red;
  height: 2rem;
  width: 100%;
}
.page-swipe .slide2 {
  background: pink;
  height: 2rem;
  width: 100%;
}
.page-swipe .slide1 {
  background: blue;
  height: 2rem;
  width: 100%;
}
.index-bannar {
  width: 100%;
  height: 3.13rem;
}
.index-bannar .mint-swipe-item img {
  width: 100%;
  height: 3.13rem;
}
.subclassification .mint-tab-item-label {
  font-size: 0.31rem;
}
.subclassification .mint-navbar .mint-tab-item.is-selected {
  color: #373737;
  margin-bottom: 0px;
  border-bottom: 3px solid #13b393;
}
.subclassification .mint-navbar .mint-tab-item {
  padding: 0.16rem 0;
}
.mint-tab-container {
  padding-top: 0.2rem;
}
.subclassification .mint-tab-container-item {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
}
.subclassification .mint-tab-container-item div {
  width: 49%;
  /*border: 1px solid red;*/
  margin-bottom: 0.2rem;
}
.subclassification .mint-tab-container-item div a p:nth-child(2) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.25rem;
  line-height: 0.5rem;
}
.subclassification .mint-tab-container-item div a p:nth-child(3) {
  display: flex;
  justify-content: space-between;
}
.subclassification .mint-tab-container-item div a p:nth-child(3) span .yhj {
  font-size: 0.2rem;
  color: #ff5906;
  margin-right: 0.1rem;
}
.subclassification .mint-tab-container-item div a p:nth-child(3) span s {
  font-size: 0.2rem;
}
.subclassification .mint-tab-container-item div a img:nth-child(1) {
  width: 100%;
}
.rs span {
  background: url("./loginImg/shou-icon.png") no-repeat;
  background-size: 100% auto;
  width: 0.19rem;
  height: 0.21rem;
  display: inline-block;
  margin-right: 0.05rem;
}
.rs {
  color: #999999;
  font-size: 0.2rem;
}
</style>

