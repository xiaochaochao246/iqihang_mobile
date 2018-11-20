<template>
  <div class="couerse">
    <!-- 助力 -->
    <div class="curriculum-popup" v-show="curriculumPopup">
      <div class="popup-content">
        <div class="popup-content-tp">
          助力前需要登录
        </div>
        <div class="popup-bottom">
          <button id="signIn" @click="helpLogin()">点击助力</button>
        </div>
      </div>
    </div>
    <!-- <div class="couerse-img"> -->
      <!-- <img class="mainImg" :src="honeImg"> -->
      <div class="header">
        <div class="back" @click="returnGo"><img :src="backUrlShow"/></div>
        <div class="collection" @click="collection"><img :src="collectionUrlShow"></div>
      </div>
      <!-- <div class="couerse-type" v-if="classType == '1' && videoId != '1'">
        <router-link :to="{ name: 'coursevideo', query:{id:this.$route.query.id}}">免费试听</router-link>
      </div>
      <div class="couerse-type" v-if="classType == '3'">面授课</div>
      <div class="couerse-type" v-if="classType == '2'">{{status}}</div>
      <div class="couerse-time">已有{{courseSale}}人学习<span v-if="classType == '2'">开始时间:{{showtime}}</span></div>
      <div class="couerse-time" v-if="classType == '3'">开课时间:{{downtime}} </div> -->
    <!-- </div> -->
    <!-- <div class="class-active" v-show="classclose">
      <div v-for="(item,index) in bannerTop" :key="index">
        <div v-if="item.bannerSpare ==1">
          <router-link :to="{ path: '/course/courseconter', query:{id:item.bannerId}}"><img :src="item.bannnerImg" :title="item.bannerTitle"></router-link>
        </div>
        <div v-if="item.bannerSpare ==2">
          <a :href="item.bannerurl" target="_blank"><img :src="item.bannnerImg" :title="item.bannerTitle"></a>
        </div>
      </div>
      <span class="classcose" @click="classclose = false"><img src="./courseImg/cose.png"></span>
    </div> -->
    <!-- <div class="couerse-mid">
      <h3>{{courseTitel}}</h3>
      <div class="couerse-zl">
        <span>课时：{{courseHover}}</span>
        <span v-if="this.kucun < 1001">库存：{{kucun}}</span>
        <span>有效期：{{courseTime}}</span>
      </div>
      <div class="couerse-price">
        <i v-if="lowPrice != '0.00'">￥{{lowPrice}}</i>
        <i v-if="lowPrice == '0.00'">免费</i>
        <span v-show="highPrice != '0.00'">{{highPrice}}</span>
      </div>
      <div v-show="activityShow" class="activity">
        <ul>
          <li v-for="(item,index) in activeBox" :key="index">
            <span>减</span>
            买<i>{{item.classnumber}}</i>门，立减<i>{{item.classmoney}}</i>元。结束时间：{{item.endtime}}
          </li>
        </ul>
      </div>
      <div v-show="activityShowa" class="activity">
        <ul>
          <li v-if="Moneytypea == 1">
            <span>{{activityTypea}}</span> 满<i>{{lowestMoneya}}</i>元，立减<i>{{discountMoneya}}</i>元。{{time}}
          </li>
          <li v-if="Moneytypea == 2">
            <span>{{activityTypea}}</span> 满<i>{{lowestMoneya}}</i>元，打<i>{{discounta}}</i>折。{{time}}
          </li>
        </ul>
      </div>
    </div> -->
    <courseDetail :classType='classType' :videoId='videoId' :lessonCouponArr='lessonCouponArr' :activeBox='activeBox' :courseDetailData="courseDetailData" :associated='associated' />
    <serviceAndCoupons @servicesStatus='servicesClick' :loginStatus='userStatus' v-show="servicesBox.length > 0" :homeImg='honeImg' :servicesBox='servicesBox' />
    <popularCollocation :userId='userId' :loginStatus='loginStatus' :addCar='addCar' :lowPrice='lowPrice' :backgroundImage='honeImg' :hotclassBox='hotclassBox' />  
    <div class="couerse-dp">
      <!-- <div class="choose" v-show="displayAssociated" @click="chooseShow = true">选择科目<img
        src="./courseImg/class-icon.png"></div>
      <div class="choosebox" v-show="chooseShow">
        <div class="choosetitle fn-clear">
          <h3>选择科目</h3><span class="cose" @click="chooseShow = false"><img src="./courseImg/cose.png"></span>
        </div>
        <ul id="choosetitle">
          <li v-for="(item,index) in associated" :key="index">
            <input type="radio" :id="item.associatedId" :value='item.associatedId' v-model="picked">
            <label :for="item.associatedId">{{item.associatedTitle}}</label>
          </li>
        </ul>
        <div class="choosebtn" @click="chooseBtn">确认选择</div>
      </div> -->
      <!-- <div v-if="servicesBox.length > 0" class="choose chooseMarginBottom">增值服务 <img @click="servicesImgShow = !servicesImgShow" class="servicesInfo" src="./courseImg/info.png" alt=""></div>
      <div class="servicesList" v-if="index == 0" v-for="(item,index) in servicesBox" :key="index">
        <img @click="servicesShow = !servicesShow" v-if="!servicesShow" :src="servicesImg" alt="">
        <img @click="servicesShow = !servicesShow" v-if="servicesShow" :src="servicesImg_sel" alt="">
        <p @click="servicesImgShow = !servicesImgShow">{{item._source.type_coursematch_showname}}</p>
        <span>{{'￥'+ item._source.type_coursematch_lowPrice}}</span>
      </div> -->
      <!-- <div class="choosebox" v-show="servicesShow">
        <div class="choosetitle fn-clear">
          <h3>增值服务</h3><span class="cose" @click="servicesShow = false"><img src="./courseImg/cose.png"></span>
        </div>
        <ul id="choosetitlea">
          <li v-for="(item,index) in servicesBox" :key="index">
            <input type="radio" :id="item.associatedId" :value='item.associatedId' v-model="servicespicked">
            <label :for="item.associatedId">{{item.associatedTitle}}</label>
          </li>
        </ul>
        <div class="choosebtn" @click="servicesBtn">确认选择</div>
      </div> -->
      <!-- <div class="hot" v-show="salesShow" @click="hotbox = true,hotPrice()">热门搭配<img src="./courseImg/class-icon.png">
      </div>
      <div class="hotbox" v-show="hotbox">
        <div class="hottitle">
          <h3>  </h3><span class="cose" @click="hotbox = false"><img src="./courseImg/cose.png"></span>
        </div>
        <ul id="hotlist">
          <li>
            <input type="checkbox" disabled class="hotleft fn-left" :id="this.$route.query.id"
                   :value='this.$route.query.id' v-model="hotpickedold">
            <div class="hotright fn-right">
              <div class="fn-left hotimg"><img :src="honeImg"></div>
              <div class="fn-right hotconcet">
                <h3>{{courseTitel}}</h3>
                <p>{{lowPrice}}<span v-if="highPrice !='0.00'">{{highPrice}}</span></p>
              </div>
            </div>
          </li>
          <li v-for="(item,index) in  hotclassBox" :key="index">
            <input type="checkbox" class="hotleft fn-left" :id="item.hotId" :value='item.hotId' v-model="hotpicked">
            <div class="hotright fn-right">
              <router-link :to="{ name: 'courseconter', query:{id:item.hotId}}" target="_blank">
                <div class="fn-left hotimg"><img :src="item.hotImg"></div>
                <div class="fn-right hotconcet">
                  <h3>{{item.hotTitle}}</h3>
                  <p>{{item.hotlowPrice}}<span v-if="item.hothighPrice !='0.00'">{{item.hothighPrice}}</span></p>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
        <div class="hotbtn">
          <div class="hotpirce">本组合包含<span>{{salesNumber}}</span>名课 优惠：<span>￥{{discountPrice}}</span> 总价：<span>￥ {{totalPrice}}</span>
          </div>
          <div class="hotbug" @click="hotbug">立即购买</div>
        </div>
      </div> -->
      <div class="down" v-show="displayDown" @click="dounShow = true">线下课<img src="./courseImg/class-icon.png"></div>
      <div class="choosebox" v-show="dounShow">
        <div class="choosetitle fn-clear">
          <h3>选择线下课</h3><span class="cose" @click="dounShow = false"><img src="./courseImg/cose.png"></span>
        </div>
        <ul>
          <li v-for="(item,index) in downclass" :key="index">
            <input type="radio" :id="item.downId" :value='item.downId' v-model="downpicked">
            <label :for="item.downId">{{item.downTitle}}</label>
          </li>
        </ul>
        <div class="choosebtn" @click="downBtn(downpicked)">确认选择</div>
      </div>
      <div class="hotbox" v-show="downbox">
        <div class="hottitle">
          <h3>线下课搭配</h3><span class="cose" @click="downbox = false"><img src="./courseImg/cose.png"></span>
        </div>
        <ul>
          <li>
            <input type="radio" disabled class="hotleft fn-left" :id="this.$route.query.id"
                   :value='this.$route.query.id' v-model="downpickedold">
            <div class="hotright fn-right">
              <div class="fn-left hotimg"><img :src="honeImg"></div>
              <div class="fn-right hotconcet">
                <h3>{{courseTitel}}</h3>
                <p>{{lowPrice}}<span v-if="highPrice !='0.00'">{{highPrice}}</span></p>
              </div>
            </div>
          </li>
          <li v-for="(item,index) in  downlistBox" :key="index">
            <input type="radio" class="hotleft fn-left" :id="item.listId" :value='item.listId' v-model="dowmpicked">
            <div class="hotright fn-right">
              <router-link :to="{ name: 'courseconter', query:{id:item.listId}}" target="_blank">
                <div class="fn-left hotimg"><img :src="item.lisPhoneimg"></div>
                <div class="fn-right hotconcet">
                  <h3>{{item.listTitle}}</h3>
                  <p>{{item.listlowPrice}}<span v-if="item.highPrice !='0.00'">{{item.highPrice}}</span></p>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
        <div class="hotbtn">
          <div class="hotpirce">本组合包含<span>{{downsalesNumber}}</span>名课 优惠：<span>￥{{downdiscountPrice}}</span> 总价：<span>￥ {{downtotalPrice}}</span>
          </div>
          <div class="hotbug" @click="downbug">立即购买</div>
          <!--<ul>-->
          <!--<li @click="hotbugcar">加入购物车</li>-->
          <!--<li>立即购买</li>-->
          <!--</ul>-->
        </div>
      </div>
    </div>
    <!-- 增值服务弹出框 -->
    <div v-if="servicesImgShow" class="servicesPopup">
      <div class="servicesPopupImg">
        <img :src="addServicesPopupImg" alt="">
      </div>
      <div @click="servicesImgShow = !servicesImgShow" class="servicesPopupClose"><img :src="servicesClose" alt=""></div>
    </div>
    <div id="chapterNav">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">详情</mt-tab-item>
        <mt-tab-item id="2">目录</mt-tab-item>
        <mt-tab-item id="3">名师</mt-tab-item>
        <mt-tab-item id="4">评论</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div v-html="coursesdetail" class="detail detail-img">{{coursesdetail}}</div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <!-- 章节目录 -->
          <directory :userName='userName' :catalogId = 'catalogId' :directoryArr='directoryArr' :videoList='videoList' :videoNum='videoNum' :loginStatus='loginStatus' :buyStatus='buyStatus' :courseId='courseId' :courseTitel='courseTitel' :expired='expired' />
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="teacher-list">
            <ul>
              <li v-for="(item,index) in teacherBox" class="fn-clear" :key="index">
                <router-link :to="{ path: '/teacher', query:{id:item.teaId}}">
                  <div class="list-left">
                    <img :src="item.teaImg">
                    <p>{{item.teaTitle}}</p>
                  </div>
                  <div class="list-right">
                    {{item.teaCenter}}
                  </div>
                  <div class="fn-clear"></div>
                </router-link>
              </li>
            </ul>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div>
            <div class="comment-top">
              <textarea v-model="commentval" class="comment-input" @click="commentFocus()" placeholder="评论"></textarea>
              <span class="comment-save" @click="submitComments">提交评论</span>
            </div>
            <div class="comment-top comment-bot" v-show="commentShow">
              <textarea v-model="comment" class="comment-input" @click="commentFocus()" placeholder="评论"
                        v-focus="focusState"></textarea>
              <span class="comment-save" @click="Commentsbox">评论</span>
            </div>
            <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
              <div class="comment-list" v-for="(item,index) in commentsBox" :key="index">
                <div class="comment-box fn-clear">
                  <div class="comment-img fn-left"><img :src="item.urseheadImg"></div>
                  <div class="comment-mid fn-left">
                    <div>
                      <span class="comment-title">{{item.urseName}}</span>
                      <span class="comment-hot" v-if="item.commentType == '1'">置顶</span>
                      <span class="comment-hot" v-if="item.commentType == '2'">热门</span>
                      <span class="comment-tiem">{{item.showtime}}</span>
                    </div>
                    <div class="comment-cent">{{item.conmennt}}</div>
                    <div class="comment-btn">
                      <span @click="handleTitPl(index,item.conmenntId,item.commentLenght)">评论 {{item.commentLenght}}</span>
                      <span @click="commentsLike(item.commentId)">点赞 {{item.commentGood}}</span>
                      <span @click="replyShow(item.commentId)">我要评论</span>
                    </div>
                  </div>
                  <div class="fn-clear"></div>
                </div>
                <div class="comment-box fn-clear" v-for="(ite,index) in pinglun" style="margin-left:1rem"
                  v-if="item.conmenntId == ite.levelId"    :key="index">
                  <div class="comment-img fn-left"><img :src="ite.urseheadImg"></div>
                  <div class="comment-mid fn-left" style="width: 4.9rem">
                    <div>
                      <span class="comment-title">{{ite.urseName}}</span>
                      <span class="comment-hot" v-if="ite.commentType == '1'">置顶</span>
                      <span class="comment-hot" v-if="ite.commentType == '2'">热门</span>
                      <span class="comment-tiem">{{ite.showtime}}</span>
                    </div>
                    <div class="comment-cent">{{ite.conmennt}}</div>
                  </div>
                  <div class="fn-clear"></div>
                </div>
              </div>
            </v-loadmore>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div v-show="loadAll" class="loadfooter">已加载全部</div>
    <div style="height: 1rem"></div>
    <div class="coursefoot">
      <div class="foot-left">
        <ul>
          <li>
            <router-link :to="{ path: '/vip/down'}"><p><img src="./courseImg/down.png"/></p>
              <p>缓存</p></router-link>
          </li>
          <li>
            <a href="http://z1-pcok6.kuaishangkf.com/bs/im.htm?cas=117637___109813&fi=120093&ism=1" target="_blank">
            <p><img src="./courseImg/customer.png"/></p>
            <p>咨询</p></a>
          </li>
          <li @click="addCar" class="share-component">
            <p><img src="./courseImg/shopping.png"/></p>
            <p>购物车</p>
          </li>
        </ul>
      </div>
      <div class="foot-right">
        <!--课程过期-->
        <div class="" v-if="this.expired == '1'" :class="buybtn" style="background:#ccc; ">
            课程已过期
        </div>
        <!--课程未过期-->
        <div  v-if="this.expired == '0'">
          <div class="">
            <div class="buybtn" v-if=" this.purchasing =='0' && this.shareAll == ''&&  this.userStatus != '0'" style="background:#ccc; ">暂不可购买</div>
            <div v-if=" this.purchasing =='0' && this.shareAll == ''&&  this.userStatus == '0'">
              <div class="buybtn" v-if="this.buyStatus == '1'" style="background:#ccc; ">暂不可购买</div>
              <div v-if="this.buyStatus == '2'">
                <div v-if="this.promotion == '2'"  class="buybtn">
                  <a :href="qqAll" target="_blank" >一键加群</a>
                  <span @click="jumpLocation">立即学习</span>
                </div>
                <div class="buybtn" v-if="this.promotion == '1'" @click="jumpLocation">立即学习</div>
              </div>
            </div>
            <div class="buybtn" v-if=" this.purchasing =='0' && this.shareAll != ''&&  this.userStatus != '0'" @click="share">分享领取</div>
            <div class="buybtn" v-if=" this.purchasing =='0' && this.shareAll != ''&&  this.userStatus == '0' &&  this.buyStatus == '1'" @click="share">分享领取</div>
            <div class="buybtn" v-if=" this.purchasing =='0' && this.shareAll != '' && this.userStatus == '0' &&  this.buyStatus == '2'">
              <a @click="share">分享领取</a>
              <span @click="jumpLocation">立即学习</span>
            </div>
            <div v-if="this.purchasing =='1'">
              <!--可购买-->
              <div v-if="this.userStatus != '0'">
                <!--未登录-->
                <div class="buybtn-no"  v-if=" this.kucun =='0'">课程已售罄</div>
                <div v-if="this.kucun !='0'">
                  <div class="bugtn" v-if="this.shareAll != ''" @click="share">分享领取</div>
                  <div class="bugtn" v-if=" this.shareAll == ''" @click="addCar">加入购物车</div>
                  <div class="bugtn btnbg" v-if="this.lowPrice !='0.00'" @click="buyNow">{{bugtype}}</div>
                  <div class="bugtn btnbg" v-if="this.lowPrice =='0.00'" @click="receiveBuy">免费领取</div>
                </div>
              </div>
              <div v-if="this.userStatus == '0'">
                <!--已登录-->
                <div v-if=" this.buyStatus == '1'">
                  <div class="buybtn-no"  v-if=" this.kucun =='0'">课程已售罄</div>
                  <div class="vip-btn" v-if="this.kucun !='0' && this.vipStart == '1' && this.buyStatus == '1'" @click="vipBuy()">vip专享免费领取</div>
                  <div v-if="this.kucun !='0' && this.vipStart == '0'">
                    <div class="bugtn" v-if="this.shareAll != ''&& this.buyStatus == '1'" @click="share">分享领取</div>
                    <div class="bugtn" v-if=" this.shareAll == '' && this.buyStatus == '1'" @click="addCar">加入购物车</div>
                    <div class="bugtn btnbg" v-if="this.lowPrice !='0.00' && this.buyStatus == '1'" @click="buyNow">{{bugtype}}</div>
                    <div class="bugtn btnbg" v-if="this.lowPrice =='0.00' && this.buyStatus == '1'" @click="receiveBuy">免费领取</div>
                  </div>
                </div>
                <div v-if=" this.buyStatus == '2'">
                  <div class="buybtn" v-if="this.promotion == '2' && this.shareAll == ''">
                    <a :href="qqAll" target="_blank" >一键加群</a>
                    <span @click="jumpLocation">立即学习</span>
                  </div>
                  <div class="buybtn" v-if="this.promotion == '2' && this.shareAll != ''">
                    <a @click="share">分享领取</a>
                    <span @click="jumpLocation">立即学习</span>
                  </div>
                  <div class="buybtn" v-if="this.promotion == '1' && this.shareAll != ''">
                    <a @click="share">分享领取</a>
                    <span @click="jumpLocation">立即学习</span>
                  </div>
                  <div class="buybtn" @click="jumpLocation">立即学习</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import directory from "./directory";
import courseDetail from "./courseDetail"
import serviceAndCoupons from './serviceAndCoupons'
import popularCollocation from './popularCollocation'
import { Toast, Picker } from "mint-ui";
import { Loadmore } from "mint-ui";
import admindefault from "./courseImg/iqh-default.png";

export default {
  components: {
    "v-loadmore": Loadmore,
    admindefault,
    directory,
    courseDetail,
    serviceAndCoupons,
    popularCollocation
  },
  data() {
    return {
      backUrlShow:require("./courseImg/back.png"),
      collectionUrlShow: require("./courseImg/collection.png"),
      collectionStatus: false,
      times: "",
      iconImg:false,
      servicesImg: require("./courseImg/services.png"),
      servicesImg_sel: require("./courseImg/services_sel.png"),
      servicesClose: require("./courseImg/addServicesClose.png"),
      servicesImgShow: false,
      addServicesPopupImg: "",
      discount:[], // 存储折扣数据
      test: false,
      jumpurl: "",
      courseId: "",
      pcImg: "",
      honeImg: "",
      courseTitel: "",
      courseHover: "",
      kucun: "",
      courseTime: "",
      lowPrice: "",
      highPrice: "",
      protocol: "",
      courseLecture: "",
      courseSale: "",
      courseDetailData: '',  // 保存课程详情数据
      //查看课程活动
      activityShow: false,
      activeBox: [],
      //tab
      selected: "1",
      coursesdetail: "", //课程详情
      teacherBox: [],
      classType: "",
      videoId: "",
      status: "",
      downtime: "",
      showtime: "",
      endtime: "",
      associated: [], //选择科目
      displayAssociated: true,
      chooseShow: false,
      //选择课程
      picked: "",
      salesShow: true, //热门搭配
      hotclassBox: [],
      hotpicked: [],
      hotbox: false,
      hotpickedold: this.$route.query.id,
      salesNumber: "1",
      totalPrice: "",
      discountPrice: "",
      hotcheckBox: [],
      prevclassId: "",
      //线下课
      downclass: [],
      displayDown: true,
      dounShow: false,
      downpicked: "",
      downbox: false,
      dowmpicked: "",
      downpickedold: this.$route.query.id,
      downlistBox: [],
      downtotalPrice: "",
      downdiscountPrice: "",
      downsalesNumber: "1",
      checkBox: [],
      //用户id
      userId: "",
      username: null, // 用户名
      userName: '',
      userStatus: "", //状态
      bugtype: "",
      buyStatus: "",
      promotion: "", //qq群状态
      qqAll: "",
      loginStatus: "",
      //章节
      items: [],
      zjlist: false,
      entitiesState: [],
      childState: [],
      allState: [],
      listLen: 0,
      btnshowNo: false,
      btnshow: false,
      directoryArr: [],
      videoList: [],
      //评论
      commentval: "",
      commentsBox: [],
      comment: "",
      commentShow: false,
      focusState: false,
      pinglun: [],
      twoId: "",
      //订单
      orderCode: "",
      //收藏
      Showbox: "",
      isShowbox: "",
      pageNo: 0,
      pageSize: 10,
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      totalpage: "",
      loading: false,
      loadAll: false,
      //增值服务
      servicesBox: [],
      displayServices: false,
      servicesShow: true,
      servicespicked: "",
      //课程活动
      bannerTop: [],
      classclose: false,
      //分享活动
      shareAll: [],
      shareId: "",
      purchasing: "", //是否可购买
      userPhone: "",
      curriculumPopup: false, //判断用户是不是通过二维码扫码过来
      codeParam: {},
      expired: "", //课程过期
      //活动
      nowTimea: "",
      activityShowa: "",
      Moneytypea: "",
      activityTypea: "",
      lowestMoneya: "",
      discountMoneya: "",
      discounta: "",
      endTimea: "",
      time: "",
      time11: "",
      vipStart: "0",
      vipId: "",
      vipCurriculum: [], //vip允许的课程
      vipdenji: "",
      vipdenji1: "",
      allowtime: "",
      year: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      videoNum: "",
      catalogId: "",
      lessonCouponArr: []  // 赠课赠券
    };
  },
  watch: {
    $route(to, from) {
      this.$router.go();
      this.courseDetail();
      // this.classBox();
      // this.classoffer();
      // this.catalog();
      // this.hotClass();
      // this.lineDown();
      // this.services();
      // this.chapter();
      this.commentsList();
      this.shareActive();
      this.kecheng();
      this.userIdBox();
      this.buyAdd();
    },
    hotpicked() {
      this.hotPrice();
    },
    dowmpicked(val) {
      this.dowmPrice(val);
      this.downsalesNumber = "2";
    }
  },
  methods: {
    //滚动事件
    handleScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop>100 && !this.iconImg && this.collectionStatus){
        this.backUrlShow = require("./courseImg/back_sel.png")
        this.collectionUrlShow = require("./courseImg/collection2_sel.png")
        this.iconImg = true
        return
      }
      else if(scrollTop>100 && !this.iconImg){
        this.backUrlShow = require("./courseImg/back_sel.png")
        this.collectionUrlShow = require("./courseImg/collection_sel.png")
        this.iconImg = true
        return
      }else if(scrollTop < 100 && this.iconImg && this.collectionStatus){
        this.backUrlShow = require("./courseImg/back.png")
        this.collectionUrlShow = require("./courseImg/collection2.png")
        this.iconImg = false
        return
      }else if(scrollTop < 100 && this.iconImg){
        this.backUrlShow = require("./courseImg/back.png")
        this.collectionUrlShow = require("./courseImg/collection.png")
        this.iconImg = false
        return
      }
    },
    c() {
      this.test = false;
      this.test = true;
    },
    jumpLocation() {
      this.selected = "2";
      $(window).scrollTop($("#chapterNav").offset().top);
    },
    onSubmit() {},
    returnGo() {
      if (this.$route.query.order) {
        this.$router.push("/");
        return;
      }
      history.go(-1);
    },
    handleTit(i) {
      //点击父级
      let state = this.entitiesState;
      this.$set(state, i, !state[i]);
      for (let a in this.entitiesState) {
        if (a != i) {
          this.$set(state, a, false);
        }
      }
    },
    handleTitPl(i, id, length) {
      //点击父级
      let state = this.entitiesState;
      this.$set(state, i, !state[i]);
      for (let a in this.entitiesState) {
        if (a != i) {
          this.$set(state, a, false);
        }
      }
      this.pinglun = [];
      if (length != 0) {
        this.comments(id);
      }
    },
    add(m) {
      return m < 10 ? "0" + m : m;
    },
    //获取用户id
    userIdBox() {
      this.axios
        .get("/api/party/user/v2/user/session", {})
        .then(response => {
          this.loginStatus = response.data.status;
          this.userPhone = response.data.data.username;
          this.vipId = response.data.data.vipId;
          this.vipdenji1 = response.data.data.vip;
          if (response.data.status == 0) {
            this.userId = response.data.data.userId;
            if (this.vipId !== "" && this.vipId !== null) {
              this.vipcheck();
            }
            this.videoShow();
            this.courseId = this.$route.query.id;
            this.collectBox();

            if (response.data.data.realName != "") {
              this.userName = response.data.data.realName;
            } else {
              this.userName = response.data.data.username;
            }
            this.userImg = response.data.data.headImg;
            if (this.userId != "") {
              this.repeatBuy(this.userId);
            }
          }
          this.userStatus = response.data.data.status;
        })
        .catch(err => {
          console.log(err);
        });
    },
    vipcheck() {
      this.axios
        .post("/es/index_vip/type_vip/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    type_vip_id: this.vipId
                  }
                }
              ]
            }
          },
          from: 0,
          size: 10,
          sort: [],
          aggs: {}
        })
        .then(res => {
          if (res.data.hits.hits.length > 0) {
            this.vipCurriculum =
              res.data.hits.hits[0]._source.type_vip_vipCurriculum;
            let vipCurriculums = this.vipCurriculum.split(",");
            this.vipdenji = res.data.hits.hits[0]._source.type_vip_vipGrade;
            this.allowtime = res.data.hits.hits[0]._source.type_vip_vipTime;
            if (this.allowtime == this.year) {
              for (var i = 0; i < vipCurriculums.length; i++) {
                if (vipCurriculums[i] == this.prevclassId.id) {
                  this.vipStart = "1";
                  break;
                } else {
                  this.vipStart = "0";
                }
              }
            }
          }
        });
    },
    //获取课程详情JSON
    courseDetail() {
      this.axios
        .get(
          `http://oss2.iqihang.com/json/course_details/ceshi${
            this.$route.query.id
          }.json?v=` + new Date().getTime()
        )
        .then(response => {
          console.log(response)
          this.catalogId = response.data.courseDetailData.hits.hits[0]._source.type_product_catalogId;
          let directory = response.data.categoryData.hits.hits,
            directoryArr = { first: [], second: [], three: [], four: [] },
            videoList = { first: [], second: [], three: [], four: [] };
          directory.forEach(item => {
            item._source.type_catalog_pid === "-1" &&
              directoryArr.first.push(item);
          });
          // 保存赠课赠券数据
          if(response.data.openCourse && response.data.openCourse.hits.hits.length > 0){
            this.lessonCouponArr = response.data.openCourse.hits.hits
          }
          directoryArr.first.length > 0 &&
            directoryArr.first.forEach(item => {
              let _id = item._source.type_catalog_id;
              directory.map(first => {
                first._source.type_catalog_pid == _id &&
                  directoryArr.second.push(first);
              });
            });
          directoryArr.second.length > 0 &&
            directoryArr.second.map(item => {
              let _id = item._source.type_catalog_id;
              directory.map(second => {
                second._source.type_catalog_pid == _id &&
                  directoryArr.three.push(second);
              });
            });
          directoryArr.three.length > 0 &&
            directoryArr.three.map(item => {
              let _id = item._source.type_catalog_id;
              directory.map(three => {
                three._source.type_catalog_pid == _id &&
                  directoryArr.four.push(three);
              });
            });
          let keysArr = Object.keys(response.data),
            videoNum = [];
          for (let iterator of directoryArr.first) {
            keysArr.indexOf(iterator._source.type_catalog_id) > -1 &&
              videoList.first.push({
                id: iterator._source.type_catalog_id,
                value: response.data[iterator._source.type_catalog_id]
              });
          }
          for (let iterator of directoryArr.second) {
            keysArr.indexOf(iterator._source.type_catalog_id) > -1 &&
              videoList.second.push({
                id: iterator._source.type_catalog_id,
                value: response.data[iterator._source.type_catalog_id]
              });
          }
          for (let iterator of directoryArr.three) {
            keysArr.indexOf(iterator._source.type_catalog_id) > -1 &&
              videoList.three.push({
                id: iterator._source.type_catalog_id,
                value: response.data[iterator._source.type_catalog_id]
              });
          }
          for (let iterator of directoryArr.four) {
            keysArr.indexOf(iterator._source.type_catalog_id) > -1 &&
              videoList.four.push({
                id: iterator._source.type_catalog_id,
                value: response.data[iterator._source.type_catalog_id]
              });
          }
          // 保存视频数
          for (var iterator of directoryArr.second) {
            videoNum[iterator._source.type_catalog_id] = 0;
            if (keysArr.indexOf(iterator._source.type_catalog_id) > -1) {
                response.data[iterator._source.type_catalog_id].hits.hits.length > 0 && response.data[iterator._source.type_catalog_id].hits.hits.map( item => {
                  
                  if(item._source.cms_content_type_datatype == 'subVideo' && item._source.cms_content_type_userRealName != "0"){
                    videoNum[iterator._source.type_catalog_id] += 1
                  }
                });
            }
            for (var iterator1 of directoryArr.three) {
              if (
                iterator._source.type_catalog_id ==
                iterator1._source.type_catalog_pid
              ) {
                  response.data[iterator1._source.type_catalog_id].hits.hits.length > 0 && response.data[iterator1._source.type_catalog_id].hits.hits.map( item1 => {
                    
                    if(item1._source.cms_content_type_datatype == 'subVideo' && item1._source.cms_content_type_userRealName != "0"){
                      videoNum[iterator._source.type_catalog_id] += 1
                    }
                  });
                for (var iterator2 of directoryArr.four) {
                  if (iterator1._source.type_catalog_id == iterator2._source.type_catalog_pid && keysArr.indexOf(iterator2._source.type_catalog_id) > -1) {
                      response.data[iterator2._source.type_catalog_id].hits.hits.length > 0 && response.data[iterator2._source.type_catalog_id].hits.hits.map( item2 => {
                        if(item2._source.cms_content_type_datatype == 'subVideo' && item2._source.cms_content_type_userRealName != "0"){
                          videoNum[iterator._source.type_catalog_id] += 1
                        }
                      });
                  }
                }
              }
            }
          }
          this.directoryArr = directoryArr;
          // 判断视频里面是否有直播
          videoList.first.map(item => {
            item.value.hits.hits.map(video => {
              if (video._source.cms_content_type_userRealName == "0") {
                directoryArr.first.map(itemDir => {
                  if (itemDir._id == item.id) {
                    itemDir._live = "true";
                  }
                });
              }
            });
            videoList.second.map(itemThree => {
              itemThree.value.hits.hits.map(video => {
                if (video._source.cms_content_type_userRealName == "0") {
                  directoryArr.second.map(itemDir => {
                    if (itemThree.id === itemDir._id) {
                      directoryArr.second.map(itemDir1 => {
                        if (itemDir1._id == itemDir._source.type_catalog_pid) {
                          itemDir1._live = "true";
                        }
                      });
                    }
                  });
                }
              });
              videoList.three.map(itemFour => {
                itemFour.value.hits.hits.map(video => {
                  if (video._source.cms_content_type_userRealName == "0") {
                    directoryArr.three.map(itemDir => {
                      if (itemFour.id === itemDir._id) {
                        directoryArr.second.map(itemDir1 => {
                          if (
                            itemDir._source.type_catalog_pid === itemDir1._id
                          ) {
                            directoryArr.first.map(itemDir2 => {
                              if (
                                itemDir2._id ==
                                itemDir1._source.type_catalog_pid
                              ) {
                                itemDir2._live = "true";
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
                videoList.four.map(itemFive => {
                  itemFive.value.hits.hits.map(video => {
                    if (video._source.cms_content_type_userRealName == "0") {
                      directoryArr.four.map(itemDir => {
                        if (itemFive.id === itemDir._id) {
                          directoryArr.three.map(itemDir1 => {
                            if (itemDir._source.type_catalog_pid === itemDir1._id) {
                              directoryArr.second.map(itemDir2 => {
                                if (itemDir2._id ==itemDir1._source.type_catalog_pid) {
                                  directoryArr.first.map(itemFirst => {
                                    if (itemFirst._id == itemDir2._source.type_catalog_pid ) {
                                      itemFirst._live = "true";
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                });
              });
            });
          });
          this.videoList = videoList;
          this.videoNum = videoNum;
          this.courseDetailData = response.data.courseDetailData.hits.hits[0];
          this.classBox(response.data.courseDetailData.hits.hits[0]);
          this.classoffer(response.data.curriculumAssociation);
          this.classActive(response.data.advertisement);
          this.lineDown(response.data.classUnderTheLine);
          this.hotClass(response.data.hotCollocation);
          this.services(response.data.valueAddedService);
          // 选择科目
          this.catalog(response.data.freeAssociation);
          // this.chapter(response,response.data.categoryData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    classBox(response) {
      this.pcImg = response._source.type_product_pictures; //pc课程图片
      this.honeImg = response._source.type_product_mainPicture; //h5课程图片
      this.courseTitel = response._source.type_product_title; //标题
      this.courseHover = response._source.type_product_classhour; //总课时
      this.kucun = response._source.type_product_stock; //库存
      this.protocol = response._source.type_product_protocol; //协议
      let classid = JSON.parse(response._source.type_product_classifyIds);
      this.prevclassId = classid; //上一级课程id
      this.year = response._source.type_product_year; //课程年限
      //讲义
      let lecture = JSON.parse(response._source.type_product_withbook);
      if (lecture.length == "0") {
        this.courseLecture = 0;
      } else {
        this.courseLecture = 1;
      }
      //有效期
      //时间戳转时间
      let date = new Date(response._source.type_product_delAt);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      this.courseTime = year + "-" + this.add(month) + "-" + this.add(day); //有效期
      //判断是否过期
      let newdata = new Date();
      if (response._source.type_product_delAt < newdata) {
        this.expired = "1"; //过期
      } else {
        this.expired = "0";
      }
      this.lowPrice = parseFloat(
        response._source.type_product_lowPrice
      ).toFixed(2); //现价
      this.highPrice = parseFloat(
        response._source.type_product_highPrice
      ).toFixed(2); //原价
      this.coursesdetail = response._source.type_product_description; //课程详情
      this.courseSale = response._source.type_product_salesVolume; //购买人（假销量+真销量）
      //老师名称
      let teacherAll = JSON.parse(response._source.type_product_teacherId);
      let teacherTitle = [],
        teacherBox = [];
      for (let i = 0; i < teacherAll.length; i++) {
        //截取教师简介字数
        var regexstr = "<(?!img|br|p|/p).*?>";
        var str = teacherAll[i].content.replace(regexstr, "");
        if (str.length > 70) {
          str = str.substring(0, 71) + "...";
        }
        teacherBox.push({
          teaTitle: teacherAll[i].title,
          teaImg: teacherAll[i].userRealName,
          teaId: teacherAll[i].id,
          teaCenter: str
        });
      }
      JSON.stringify(teacherTitle).replace(/"/g, "");
      this.teacherBox = teacherBox;
      //判断课程类型
      this.classType = response._source.type_product_classType; //课程类型
      if (this.classType == "2") {
        this.bugtype = "立即预约";
      } else {
        this.bugtype = "立即购买";
      }
      //直播开始时间
      var downdate = new Date(response._source.type_product_curriculaTime);
      var downyear = downdate.getFullYear();
      var downmonth = downdate.getMonth() + 1;
      var downday = downdate.getDate();
      var downhouer = downdate.getHours();
      var downminutes = downdate.getMinutes();
      var downseconds = downdate.getSeconds();
      this.downtime =
        downyear +
        "-" +
        this.add(downmonth) +
        "-" +
        this.add(downday) +
        " " +
        this.add(downhouer) +
        ":" +
        this.add(downminutes) +
        ":" +
        this.add(downseconds);
      //线下课开课时间
      //判断试听课
      let videoclass = JSON.parse(response._source.type_product_videoIds); //试听视频
      if (videoclass == "") {
        this.videoId = "1";
      }
      //直播状态
      var viptime = Date.parse(new Date());
      if (viptime < response._source.type_product_upAt) {
        this.status = "未开始";
      } else if (
        response._source.type_product_upAt <= viptime &&
        viptime <= response._source.type_product_downAt
      ) {
        this.status = "直播中";
      } else if (viptime > response._source.type_product_downAt) {
        this.status = "已结束";
      }
      //直播开始时间
      var showdate = new Date(response._source.type_product_upAt);
      var showyear = showdate.getFullYear();
      var showmonth = showdate.getMonth() + 1;
      var showday = showdate.getDate();
      var showhouer = showdate.getHours();
      var showminutes = showdate.getMinutes();
      var showseconds = showdate.getSeconds();
      this.showtime =
        showyear +
        "-" +
        this.add(showmonth) +
        "-" +
        this.add(showday) +
        " " +
        this.add(showhouer) +
        ":" +
        this.add(showminutes) +
        ":" +
        this.add(showseconds);
      //直播结束
      var enddate = new Date(response._source.type_product_downAt);
      var endyear = enddate.getFullYear();
      var endmonth = enddate.getMonth() + 1;
      var endday = enddate.getDate();
      var endhouer = enddate.getHours();
      var endminutes = enddate.getMinutes();
      var endseconds = enddate.getSeconds();
      this.endtime =
        endyear +
        "-" +
        this.add(endmonth) +
        "-" +
        this.add(endday) +
        " " +
        this.add(endhouer) +
        ":" +
        this.add(endminutes) +
        ":" +
        this.add(endseconds);
      //是否可购买
      this.purchasing = response._source.type_product_ifone;
    },
    //根据课程查看有无活动
    classoffer(response) {
      this.nowTime = Date.parse(new Date());
      if (response.hits.total != "0") {
        this.activityShow = true;
        let activeAll = response.hits.hits;
        let activeBox = [];
        for (let i = 0; i < activeAll.length; i++) {
          //直播开始时间
          var showdate = new Date(
            activeAll[i]._source.type_promotion_startTime
          );
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
            this.add(showminutes) +
            ":" +
            this.add(showseconds);
          //直播结束
          var enddate = new Date(activeAll[i]._source.type_promotion_endTime);
          var endyear = enddate.getFullYear();
          var endmonth = enddate.getMonth() + 1;
          var endday = enddate.getDate();
          var endhouer = enddate.getHours();
          var endminutes = enddate.getMinutes();
          var endseconds = enddate.getSeconds();
          var endtime =
            endyear +
            "-" +
            this.add(endmonth) +
            "-" +
            this.add(endday) +
            " " +
            this.add(endhouer) +
            ":" +
            this.add(endminutes) +
            ":" +
            this.add(endseconds);
          activeBox.push({
            classnumber: activeAll[i]._source.type_promotion_number, //买几门课
            classmoney: activeAll[i]._source.type_promotion_money, //减的钱数
            showtime: showtime, //活动开始时间
            endtime: endtime //活动结束时间
          });
        }
        this.activeBox = activeBox;
      }
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    },
    //课程活动
    kecheng() {
      this.nowTimea = Date.parse(new Date());
      this.axios
        .post("/es/index_activtiy/type_activtiy/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    type_activtiy_courseId:
                      this.$route.query.id instanceof Array
                        ? this.$route.query.id[0]
                        : this.$route.query.id
                  }
                },
                {
                  term: {
                    type_activtiy_status: "1"
                  }
                },
                { range: { type_activtiy_startTime: { lte: this.nowTimea } } }
              ]
            }
          },
          from: 0,
          size: 1
        })
        .then(response => {
          let nowTime = Date.parse(new Date()); //当前时间戳
          if (
            response.data.hits.hits.length == "0" ||
            nowTime > response.data.hits.hits[0]._source.type_activtiy_endTime
          ) {
            this.activityShowa = false;
          } else {
            this.activityShowa = true;
            let classOfferAll = response.data.hits.hits[0]._source;
            this.Moneytypea = classOfferAll.type_activtiy_activtiyType;
            if (this.Moneytypea == "1") {
              this.activityTypea = "满";
            } else if (this.Moneytypea == "2") {
              this.activityTypea = "折";
            }
            this.lowestMoneya = classOfferAll.type_activtiy_lowestMoney; //满XX元
            this.discountMoneya = classOfferAll.type_activtiy_discountMoney; //满减
            this.discounta = classOfferAll.type_activtiy_discount; //折扣
            this.endTimea = classOfferAll.type_activtiy_endTime; //结束时间
            this.baba = setInterval(this.show, 1000);
          }
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    show() {
      //倒计时
      let nowTime = Date.parse(new Date());
      var maxTime = this.endTimea - nowTime;
      if (maxTime >= 0) {
        var s = this.endTimea - nowTime;
        var d = parseInt(s / 1000 / 60 / 60 / 24, 10);
        var h = parseInt((s / 1000 / 60 / 60) % 24, 10);
        var m = parseInt((s / 1000 / 60) % 60, 10);
        var seconds = parseInt((s / 1000) % 60, 10);
        this.time11 =
          "距活动结束:" + d + "天" + h + "时" + m + "分" + seconds + "秒";
        if (d != 0) {
          this.time = "距活动结束:" + d + "天";
        } else if (d == 0 && h != 0 && m != 0) {
          this.time = "距活动结束:" + h + "小时";
        } else if (h == 0 && m != 0) {
          this.time = "距活动结束:" + m + "分钟";
        } else if (m == 0) {
          this.time = "距活动结束:" + seconds + "秒";
        }
      } else {
        clearInterval(this.baba);
        this.activityShowa = false;
        this.time = "";
      }
    },
    // 选择科目数据处理
    catalog(response) {
      let associatedBox = response.hits.hits;
      for (let i = 0; i < associatedBox.length; i++) {
        this.associated.push({
          associatedTitle: associatedBox[i]._source.type_coursematch_showname,
          associatedId: associatedBox[i]._source.type_coursematch_courseId
        });
      }
    },
    // 选择科目按钮
    chooseBtn() {
      if (this.picked != "") {
        this.chooseShow = false;
        this.$router.push({ name: "courseconter", query: { id: this.picked } });
      } else {
        Toast({
          message: "请选择课程",
          position: "middle",
          duration: 1000
        });
      }
    },
    //增值服务
    services(response) {
      let servicesBox = response.hits.hits;
      this.servicesBox = response.hits.hits;
      if (
        response.hits.hits.length > 0 &&
        response.hits.hits[0]._source.type_coursematch_addedValueImg
      ) {
        this.addServicesPopupImg =
          response.hits.hits[0]._source.type_coursematch_addedValueImg;
        this.servicespicked = servicesBox[0]._source.type_coursematch_courseId;
      }
    },
    // 增值服务按钮
    // servicesBtn() {
    //   if (this.servicespicked != "") {
    //     this.servicesShow = false;
    //     this.$router.push({
    //       name: "courseconter",
    //       query: { id: this.servicespicked }
    //     });
    //   } else {
    //     Toast({
    //       message: "请选择课程",
    //       position: "middle",
    //       duration: 1000
    //     });
    //   }
    // },
    // 增值服务
    servicesClick(data){
      if(data.status){
        this.servicesShow = data.status
        this.servicespicked = data.id
      }else{
        this.servicesShow = data.status
        this.servicespicked=''
      }
    },
    //热门搭配
    hotClass(response) {
      let botBox = response.hits.hits;
      if (botBox.length == 0) {
        this.salesShow = false;
      } else {
        this.salesShow = true;
      }
      this.hotclassBox = [];
      for (let i = 0; i < botBox.length; i++) {
        this.hotclassBox.push({
          hotTitle: botBox[i]._source.type_coursematch_courseName,
          hotImg: botBox[i]._source.type_coursematch_mainPicture,
          hotId: botBox[i]._source.type_coursematch_courseId,
          hotlowPrice: parseFloat(
            botBox[i]._source.type_coursematch_lowPrice
          ).toFixed(2),
          hothighPrice: parseFloat(
            botBox[i]._source.type_coursematch_highPrice
          ).toFixed(2)
        });
      }
      this.hotclassBox.unshift({
        hotTitle: this.courseTitel,
        hotImg: this.honeImg,
        hotId: this.$route.query.id,
        hotlowPrice: this.lowPrice,
        hothighPrice: this.highPrice
      })
    },
    //热门搭配价格计算
    hotPrice() {
      let checkBox = [];
      this.salesNumber = this.hotpicked.length + 1;
      checkBox.push({
        courseId:
          this.$route.query.id instanceof Array
            ? this.$route.query.id[0]
            : this.$route.query.id
      });
      for (let i = 0; i < this.hotpicked.length; i++) {
        checkBox.push({
          courseId: this.hotpicked[i]
        });
      }
      this.hotcheckBox = checkBox;
      this.axios
        .post("/api/promotion/nologin/v1/pageView/calculatedPrice", checkBox)
        .then(response => {
          if (response.data.status == "0") {
            this.totalPrice = parseFloat(response.data.data.totalPrice).toFixed(
              2
            );
            this.discountPrice = parseFloat(
              response.data.data.discountPrice
            ).toFixed(2);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //热门搭配立即购买
    hotbug() {
      let checkBox = "";
      for (let i = 0; i < this.hotcheckBox.length; i++) {
        checkBox = this.hotcheckBox[i].courseId + "," + checkBox;
      }
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        //判断重复购买
        this.axios
          .post("/es/productonuser/f/_search", {
            query: {
              bool: {
                must: [
                  {
                    term: {
                      f_userId: this.userId
                    }
                  }
                ]
              }
            },
            from: 0,
            size: 50,
            sort: [
              {
                f_openTime: {
                  order: "desc"
                }
              }
            ]
          })
          .then(response => {
            let classAll = response.data.hits.hits,
              type = true;
            for (let i = 0; i < classAll.length; i++) {
              if (this.$route.query.id == classAll[i]._source.f_productId) {
                type = false;
              }
            }
            if (type) {
              this.$router.push({
                path: "/payment",
                query: { paycid: checkBox }
              });
              this.hotbox = false;
            } else {
              Toast({
                message: "已购买" + this.courseTitel + "此课程",
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //线下课
    lineDown(response) {
      let downAll = response.hits.hits;
      if (downAll.length == 0) {
        this.displayDown = false;
      } else {
        this.displayDown = true;
      }
      this.downclass = [];
      let downBox = [];
      for (let i = 0; i < downAll.length; i++) {
        downBox.push({
          downTitle: downAll[i]._source.type_linecourse_showname,
          downId: downAll[i]._id
        });
      }
      this.downclass = downBox;
      if (this.downclass.length > 0) {
        this.downpicked = this.downclass[0].downId;
      }
    },
    //线下课按钮
    downBtn(classId) {
      if (this.downpicked != "") {
        this.dounShow = false;
        this.downbox = true;
        this.downClassbox(classId);
      } else {
        Toast({
          message: "请选择课程",
          position: "middle",
          duration: 1000
        });
      }
    },
    downClassbox(classId) {
      this.axios
        .post("/es/index_linecourse/type_linecourse/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    type_linecourse_id: classId
                  }
                }
              ]
            }
          },
          from: 0,
          size: 10
        })
        .then(response => {
          let downclassAll =
            response.data.hits.hits[0]._source.type_linecourse_lineList;
          let downlist = [];
          for (let i = 0; i < downclassAll.length; i++) {
            downlist.push({
              listId: downclassAll[i].courseId,
              listPicimg: downclassAll[i].pictures,
              lisPhoneimg: downclassAll[i].mainPicture,
              listTitle: downclassAll[i].courseName,
              listlowPrice: parseFloat(downclassAll[i].lowPrice).toFixed(2),
              highPrice: parseFloat(downclassAll[i].highPrice).toFixed(2)
            });
          }
          this.downlistBox = downlist;
          this.dowmPrice();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //线下课组合价格
    dowmPrice(id) {
      let checkBox = [];
      if (id == undefined) {
        checkBox.push({
          courseId: this.$route.query.id
        });
      } else {
        checkBox.push(
          {
            courseId: this.$route.query.id
          },
          {
            courseId: id
          }
        );
      }
      this.checkBox = checkBox;
      this.axios
        .post("/api/promotion/nologin/v1/pageView/calculatedPrice", checkBox)
        .then(response => {
          if (response.data.status == "0") {
            this.downtotalPrice = parseFloat(
              response.data.data.totalPrice
            ).toFixed(2);
            this.downdiscountPrice = parseFloat(
              response.data.data.discountPrice
            ).toFixed(2);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //线下课立即购买
    downbug() {
      let checkBox = "";
      for (let i = 0; i < this.checkBox.length; i++) {
        checkBox = this.checkBox[i].courseId + "," + checkBox;
      }
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        //判断重复购买
        this.axios
          .post("/es/productonuser/f/_search", {
            query: {
              bool: {
                must: [
                  {
                    term: {
                      f_userId: this.userId
                    }
                  }
                ]
              }
            },
            from: 0,
            size: 50,
            sort: [
              {
                f_openTime: {
                  order: "desc"
                }
              }
            ]
          })
          .then(response => {
            let classAll = response.data.hits.hits,
              type = true;
            for (let i = 0; i < classAll.length; i++) {
              if (this.$route.query.id == classAll[i]._source.f_productId) {
                type = false;
              }
            }
            if (type) {
              this.$router.push({
                path: "/payment",
                query: { paycid: checkBox }
              });
              this.downbox = false;
            } else {
              Toast({
                message: "已购买" + this.courseTitel + "此课程",
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //判断是否购买此课程
    repeatBuy(id) {
      this.axios
        .post("/es/productonuser/f/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    f_userId: id
                  }
                }
              ]
            }
          },
          from: 0,
          size: 50,
          sort: [
            {
              f_openTime: {
                order: "desc"
              }
            }
          ]
        })
        .then(response => {
          let classAll = response.data.hits.hits,
            type = true;
          for (let i = 0; i < classAll.length; i++) {
            if (this.$route.query.id == classAll[i]._source.f_productId) {
              type = false;
            }
          }
          if (type) {
            this.buyStatus = "1";
          } else {
            this.buyStatus = "2";
            this.buyAdd();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    buyAdd() {
      this.axios
        .post("/es/index_groups/type_groups/_search", {
          query: {
            bool: {
              should: [
                {
                  term: {
                    type_groups_courseId:
                      this.$route.query.id instanceof Array
                        ? this.$route.query.id[0]
                        : this.$route.query.id
                  }
                }
              ]
            }
          },
          from: 0,
          size: 1
        })
        .then(response => {
          if (response.data.hits.hits == "") {
            this.promotion = "1";
          } else {
            this.promotion = "2";
            this.qqAll = response.data.hits.hits[0]._source.type_groups_url;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //加入购物车
    addCar() {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        this.axios
          .post("/api/shoppingcart/v2/addCartsContent", [
            {
              productId: this.$route.query.id,
              businessId: "1001",
              productName: this.courseTitel,
              pcpic: this.pcImg,
              mpic: this.honeImg,
              price: this.lowPrice,
              highPrice: this.highPrice,
              material: this.courseLecture, //讲义
              agreement: this.protocol, //协议
              classType: this.classType
            }
          ])
          .then(response => {
            console.log(response)
            if (response.data.status == "0") {
              Toast({
                message: "已加入购物车",
                position: "middle",
                duration: 1000
              });
            } else {
              Toast({
                message: response.data.msg,
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //立即购买
    buyNow() {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        if (this.servicesShow && this.servicesBox.length > 0) {
          this.$route.query.id += `,${this.servicespicked}`;
        }
        this.$router.push({
          path: "/payment",
          query: {
            paycid: this.$route.query.id,
            channel: this.$route.query.channel
          }
        });
      }
    },
    //时间转换
    dataTime(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var houer = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var times =
        year +
        "-" +
        this.add(month) +
        "-" +
        this.add(day) +
        " " +
        this.add(houer) +
        ":" +
        this.add(minutes) +
        ":" +
        this.add(seconds);
      return times;
    },
    //视频跳转
    videoShow() {
      if (this.expired == 1) {
        Toast({
          message: "此课程已过期",
          position: "middle",
          duration: 1000
        });
      } else {
        if (this.loginStatus == "888") {
          this.btnshowNo = true;
        } else {
          //判断是否购买课程
          this.axios
            .post("/es/productonuser/f/_search", {
              query: {
                bool: {
                  must: [
                    {
                      term: {
                        f_userId: this.userId
                      }
                    }
                  ]
                }
              },
              from: 0,
              size: 150,
              sort: [
                {
                  f_openTime: {
                    order: "desc"
                  }
                }
              ]
            })
            .then(response => {
              let StartClass = response.data.hits.hits;
              let type = false;
              for (let i = 0; i < StartClass.length; i++) {
                if (this.$route.query.id == StartClass[i]._source.f_productId) {
                  type = true;
                }
              }
              if (type) {
                this.btnshow = true;
              } else {
                this.btnshowNo = true;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    // 判断是否购买课程
    buyno() {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        //判断是否购买课程
        this.axios
          .post("/es/productonuser/f/_search", {
            query: {
              bool: {
                must: [
                  {
                    term: {
                      f_userId: this.userId
                    }
                  }
                ]
              }
            },
            from: 0,
            size: 150,
            sort: [
              {
                f_openTime: {
                  order: "desc"
                }
              }
            ]
          })
          .then(response => {
            let StartClass = response.data.hits.hits;
            let type = false;
            for (let i = 0; i < StartClass.length; i++) {
              if (this.$route.query.id == StartClass[i]._source.f_productId) {
                type = true;
              }
            }
            if (!type) {
              Toast({
                message: "您还未购买此课程" + this.courseTitel + "请先购买",
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //评论
    //评论列表
    commentsList() {
      this.axios
        .post("/es/index_comment/type_comment/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    type_comment_courseId:
                      this.$route.query.id instanceof Array
                        ? this.$route.query.id[0]
                        : this.$route.query.id
                  }
                },
                {
                  term: {
                    type_comment_level: "1"
                  }
                }
              ]
            }
          },
          from: this.pageNo,
          size: this.pageSize,
          sort: [
            { type_comment_commentType: { order: "asc" } },
            { type_comment_createdAt: { order: "desc" } }
          ]
        })
        .then(response => {
          this.totalpage = Math.ceil(response.data.hits.total / 10);
          let zjurseName;
          let fujilb = [];
          let fuji = response.data.hits.hits;
          var re = /^1\d{10}$/; //正则表达式
          for (var i = 0; i < fuji.length; i++) {
            if (re.test(fuji[i]._source.type_comment_userName)) {
              zjurseName = fuji[i]._source.type_comment_userName.replace(
                /(\d{3})\d{4}(\d{4})/,
                "$1****$2"
              );
            } else {
              zjurseName = fuji[i]._source.type_comment_userName;
            }
            //评论时间
            var showdate = new Date(fuji[i]._source.type_comment_createdAt);
            var showyear = showdate.getFullYear();
            var showmonth = showdate.getMonth() + 1;
            var showday = showdate.getDate();
            var showhouer = showdate.getHours();
            var showminutes = showdate.getMinutes();
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
            if (
              fuji[i]._source.type_comment_personal == "" ||
              fuji[i]._source.type_comment_personal == this.userId
            ) {
              fujilb.push({
                urseheadImg: fuji[i]._source.type_comment_headImg,
                conmenntId: fuji[i]._source.type_comment_id,
                conmennt: fuji[i]._source.type_comment_replyContent,
                urseName: zjurseName,
                commentType: fuji[i]._source.type_comment_commentType,
                commentGood: fuji[i]._source.type_comment_good,
                commentLenght: fuji[i]._source.type_comment_commentQuantity,
                commentId: fuji[i]._source.type_comment_id,
                showtime: showtime,
                list: []
              });
            }
          }
          this.commentsBox = fujilb;
          this.$nextTick(function() {
            // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
            this.scrollMode = "touch";
            this.isHaveMore();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //评论分页
    loadBottom() {
      // 上拉加载
      this.more(); // 上拉触发的分页查询
      this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    },
    // 分页查询
    more() {
      if (this.totalpage == 1) {
        this.pageNo = 10;
        this.allLoaded = true;
        this.loadAll = true;
      } else {
        if (this.pageNo == 0) {
          this.pageNo = 10;
        } else {
          this.pageNo = parseInt(this.pageNo) + 10;
        }
        this.allLoaded = false;
      }
      this.axios
        .post("/es/index_comment/type_comment/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    type_comment_courseId:
                      this.$route.query.id instanceof Array
                        ? this.$route.query.id[0]
                        : this.$route.query.id
                  }
                },
                {
                  term: {
                    type_comment_level: "1"
                  }
                }
              ]
            }
          },
          from: this.pageNo,
          size: this.pageSize,
          sort: [
            { type_comment_commentType: { order: "asc" } },
            { type_comment_createdAt: { order: "desc" } }
          ]
        })
        .then(response => {
          this.totalpage = Math.ceil(response.data.hits.total / 10);
          let zjurseName;
          let fuji = response.data.hits.hits;
          var re = /^1\d{10}$/; //正则表达式
          for (var i = 0; i < fuji.length; i++) {
            if (re.test(fuji[i]._source.type_comment_userName)) {
              zjurseName = fuji[i]._source.type_comment_userName.replace(
                /(\d{3})\d{4}(\d{4})/,
                "$1****$2"
              );
            } else {
              zjurseName = fuji[i]._source.type_comment_userName;
            }
            //评论时间
            var showdate = new Date(fuji[i]._source.type_comment_createdAt);
            var showyear = showdate.getFullYear();
            var showmonth = showdate.getMonth() + 1;
            var showday = showdate.getDate();
            var showhouer = showdate.getHours();
            var showminutes = showdate.getMinutes();
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
            if (
              fuji[i]._source.type_comment_personal == "" ||
              fuji[i]._source.type_comment_personal == this.userId
            ) {
              this.commentsBox.push({
                urseheadImg: fuji[i]._source.type_comment_headImg,
                conmennt: fuji[i]._source.type_comment_replyContent,
                urseName: zjurseName,
                commentType: fuji[i]._source.type_comment_commentType,
                commentGood: fuji[i]._source.type_comment_good,
                commentLenght: fuji[i]._source.type_comment_comentQuantity,
                commentId: fuji[i]._source.type_comment_id,
                showtime: showtime
              });
            }
          }
          this.$nextTick(function() {
            // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
            this.scrollMode = "touch";
            this.allLoaded = true;
            this.isHaveMore();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    isHaveMore() {
      // 是否还有下一页，如果没有就禁止上拉刷新
      if (this.pageNo == this.totalpage) {
        this.loadAll = true;
        this.allLoaded = true;
      } else {
        this.allLoaded = false; //true是禁止上拉加载
      }
    },
    //二级评论
    comments(id) {
      this.twoId = id;
      this.axios
        .post("/es/index_comment/type_comment/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    type_comment_courseId:
                      this.$route.query.id instanceof Array
                        ? this.$route.query.id[0]
                        : this.$route.query.id
                  }
                },
                {
                  term: {
                    type_comment_level: id
                  }
                }
              ]
            }
          },
          from: 0,
          size: 20,
          sort: [
            { type_comment_commentType: { order: "asc" } },
            { type_comment_createdAt: { order: "desc" } }
          ]
        })
        .then(response => {
          let zjurseName,
            pinglun = [],
            urseheadImg = "";
          let fuji = response.data.hits.hits;
          var re = /^1\d{10}$/; //正则表达式
          for (var i = 0; i < fuji.length; i++) {
            if (fuji[i]._source.type_comment_myadmin == "我是管理员") {
              urseheadImg = admindefault;
              zjurseName = "爱启航";
            } else {
              if (re.test(fuji[i]._source.type_comment_userName)) {
                zjurseName = fuji[i]._source.type_comment_userName.replace(
                  /(\d{3})\d{4}(\d{4})/,
                  "$1****$2"
                );
              } else {
                zjurseName = fuji[i]._source.type_comment_userName;
              }
              urseheadImg = fuji[i]._source.type_comment_headImg;
            }
            //评论时间
            var showdate = new Date(fuji[i]._source.type_comment_createdAt);
            var showyear = showdate.getFullYear();
            var showmonth = showdate.getMonth() + 1;
            var showday = showdate.getDate();
            var showhouer = showdate.getHours();
            var showminutes = showdate.getMinutes();
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
            if (
              fuji[i]._source.type_comment_personal == "" ||
              fuji[i]._source.type_comment_personal == this.userId
            ) {
              pinglun.push({
                urseheadImg: urseheadImg,
                conmennt: fuji[i]._source.type_comment_replyContent,
                urseName: zjurseName,
                commentType: fuji[i]._source.type_comment_commentType,
                commentId: fuji[i]._source.type_comment_id,
                showtime: showtime,
                levelId: id
              });
            }
          }
          this.pinglun = pinglun;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点赞
    commentsLike(id) {
      this.axios
        .post("/api/message/v1/comment/good", {
          id: id,
          good: 1,
          userId: this.userId
        })
        .then(response => {
          if (response.data.status == "0") {
            Toast({
              message: "已点赞",
              position: "middle",
              duration: 1000
            });
            setTimeout(() => {
              this.commentsList();
            }, 1000);
          } else if (response.data.status == "888") {
            Toast({
              message: "请登陆！",
              position: "middle",
              duration: 1000
            });
            this.$router.push({
              path: "/login",
              query: { id: "/course/courseconter?id=" + this.$route.query.id }
            });
          } else {
            Toast({
              message: "只能点赞一次哦",
              position: "middle",
              duration: 1000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取焦点
    commentFocus() {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else if (this.buyStatus == "1") {
        Toast({
          message: "您还未购买此课程",
          position: "middle",
          duration: 1000
        });
      }
    },
    //提交评论
    submitComments() {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else if (this.commentval == "") {
        Toast({
          message: "请输入评论内容",
          position: "middle",
          duration: 1000
        });
      } else {
        this.axios
          .post("/api/message/v1/comment/updateTest2", {
            userId: this.userId,
            userName: this.userName,
            courseId: this.$route.query.id,
            courseName: this.courseTitel,
            replyContent: this.commentval,
            headImg: this.userImg
          })
          .then(response => {
            if (response.data.status == "888") {
              Toast({
                message: "请先登陆",
                position: "middle",
                duration: 1000
              });
            } else if (response.data.status == "1") {
              Toast({
                message: response.data.msg,
                position: "middle",
                duration: 1000
              });
            } else if (response.data.status == "0") {
              Toast({
                message: "提交评论成功",
                position: "middle",
                duration: 1000
              });
              setTimeout(() => {
                this.commentval = "";
                this.commentsList();
              }, 1000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //回复
    replyShow(id) {
      this.replyId = id;
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else if (this.buyStatus == "1") {
        Toast({
          message: "您还未购买此课程",
          position: "middle",
          duration: 1000
        });
      } else {
        this.commentShow = true;
        this.focusState = false;
        this.focusState = true;
      }
    },
    Commentsbox() {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else if (this.comment == "") {
        Toast({
          message: "请输入回复内容",
          position: "middle",
          duration: 1000
        });
      } else {
        this.axios
          .post("/api/message/v1/comment/updateTest2", {
            id: this.replyId,
            userId: this.userId,
            userName: this.userName,
            courseId: this.$route.query.id,
            courseName: this.courseTitel,
            replyContent: this.comment,
            headImg: this.userImg
          })
          .then(response => {
            if (response.data.status == "1") {
              Toast({
                message: response.data.msg,
                position: "middle",
                duration: 1000
              });
            } else if (response.data.status == "0") {
              Toast({
                message: "提交评论成功",
                position: "middle",
                duration: 1000
              });
              setTimeout(() => {
                this.comment = "";
                this.commentShow = false;
                this.commentsList();
                this.comments(this.twoId);
              }, 1000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //免费领取
    receiveBuy() {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        let course = [];
        course.push({
          productId: this.$route.query.id,
          productName: this.courseTitel
        });
        this.axios
          .post("/api/trade/order/v1/buy/add", {
            channelId: "1",
            consignee: "", //收件人
            address: "", //地址
            contactTel: "", //电话
            memberId: this.userId,
            orderItems: course, //数组格式,课程名称和课程id
            promotion: "", //购课卷编码
            teacher: "iqh", //客服
            teacherName: "自助下单",
            device: "h5",
            agreement: "" //网络协议
          })
          .then(response => {
            if (response.data.status == "0") {
              this.orderCode = response.data.data.orderCode; //订单创建成功
              let tmpurl = `http://mobile.iqihang.com/payment%3Fpaycid%3D${
                this.$route.query.paycid
              }%26o%3D${this.orderCode}`;
              this.pay(response.data.data.orderCode, tmpurl);
            } else {
              Toast({
                message: response.data.msg,
                position: "middle",
                duration: 2000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //vip领取
    vipBuy() {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        let course = [];
        this.axios
          .post(
            "/api/party/sysvip/v1/opencourse?pid=" +
              this.prevclassId.id +
              "&vipId=" +
              this.vipId,
            course
          )
          .then(response => {
            if (response.data.status == "0") {
              this.orderCode = response.data.data.data; //订单创建成功
              this.$router.push({
                path: "/payment/paymenttrue",
                query: { order: this.orderCode }
              });
            } else {
              Toast({
                message: response.data.msg,
                position: "middle",
                duration: 2000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //支付
    pay(code, hdurl) {
      //立即支付
      this.axios
        .get(`/api/trade/pay/v1/payRequest/2/h5/${code}?returnUrl=${hdurl}`, {})
        .then(response => {
          if (response.data.status == "0") {
            //支付宝支付
            document.writeln(response.data.msg);
          } else if (response.data.status == "8") {
            //余额支付
            this.$router.push({
              path: "/payment/paymenttrue",
              query: { order: code, id: this.$route.query.id }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //我的购物车
    shoppingcar() {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        this.$router.push({
          path: "/vip/shopping",
          query: { id: this.userId }
        });
      }
    },
    //收藏查询
    collectBox() {
      this.axios
        .post("/es/index_product_collect/type_product_collect/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    type_product_collect_userId: this.userId
                  }
                },
                {
                  term: {
                    type_product_collect_productId:
                      this.$route.query.id instanceof Array
                        ? this.$route.query.id[0]
                        : this.$route.query.id
                  }
                }
              ]
            }
          },
          from: 0,
          size: 1,
          sort: [{ type_product_collect_createdAt: { order: "desc" } }]
        })
        .then(response => {
          if (response.data.hits.hits.length > 0) {
            this.collectionStatus = true
            this.collectionUrlShow = require("./courseImg/collection2.png") 
          }
          this.Showbox = response.data.hits.hits;
          if (response.data.hits.hits.length > 0)
            return (this.isShowbox =
              response.data.hits.hits[0]._source.type_product_collect_id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //收藏
    collection() {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        if (this.Showbox == "") {
          this.axios
            .get(
              "/api/product/nologin/v1/product/productCollect?productId=" +
                this.$route.query.id
            )
            .then(response => {
              if (response.data.status == "0") {
                Toast({
                  message: "收藏成功",
                  position: "middle",
                  duration: 1000
                });
                this.collectionStatus = true
                setTimeout(() => {
                  this.collectBox();
                }, 1000);
              } else {
                Toast({
                  message: "收藏失败，请稍后再试",
                  position: "middle",
                  duration: 1000
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.Showbox != "") {
          this.axios
            .get(
              "/api/product/nologin/v1/product/deleteCollect?id=" +
                this.isShowbox
            )
            .then(response => {
              if (response.data.status == "0") {
                this.collectionStatus = false
                this.collectionUrlShow = require("./courseImg/collection.png")
                Toast({
                  message: "已取消收藏",
                  position: "middle",
                  duration: 1000
                });
                setTimeout(() => {
                  this.collectBox();
                }, 1000);
              } else {
                Toast({
                  message: "取消收藏失败，请稍后再试",
                  position: "middle",
                  duration: 1000
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
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
        IsIPad ||
        IsIphoneOs ||
        IsMidp ||
        IsUc7 ||
        IsUc ||
        IsAndroid ||
        IsCE ||
        IsWM
      ) {
      } else {
        window.location.href = PCurl;
      }
    },
    //活动
    classActive(response) {
      let bannerAll = response.hits.hits;
      let bannerList = [];
      let bannerId = "";
      let bannerurl = "";
      for (let i = 0; i < bannerAll.length; i++) {
        if (bannerAll[i]._source.cms_content_type_spare == "2") {
          bannerurl = bannerAll[i]._source.cms_content_type_remark;
        } else if (bannerAll[i]._source.cms_content_type_spare == "1") {
          let idbox = JSON.parse(bannerAll[i]._source.cms_content_type_remark);
          bannerId = idbox.id;
        }
        bannerList.push({
          bannnerImg: bannerAll[i]._source.cms_content_type_userRealName,
          bannerTitle: bannerAll[i]._source.cms_content_type_title,
          bannerSpare: bannerAll[i]._source.cms_content_type_spare,
          bannerurl: bannerurl,
          bannerId: bannerId
        });
      }
      this.bannerTop = bannerList;
      if (this.bannerTop.length != 0) {
        this.classclose = true;
      }
    },
    //查看此课程是否有分享活动
    shareActive() {
      var timestamp = Date.parse(new Date());
      this.axios
        .post("/es/index_share/type_share/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    type_share_courseId:
                      this.$route.query.id instanceof Array
                        ? this.$route.query.id[0]
                        : this.$route.query.id
                  }
                },
                {
                  term: {
                    type_share_state: "1"
                  }
                },
                {
                  range: {
                    type_share_startTime: {
                      lte: timestamp
                    }
                  }
                },
                {
                  range: {
                    type_share_endTime: {
                      gte: timestamp
                    }
                  }
                }
              ]
            }
          },
          from: 0,
          size: 1
        })
        .then(response => {
          if (response.data.hits.hits.length > 0) {
            this.shareAll = response.data.hits.hits;
            this.shareId = response.data.hits.hits[0]._source.type_share_id;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    share() {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        window.location.href =
          "http://mobile.iqihang.com/share/code/index.html?curriId=" +
          this.$route.query.id +
          "&actiId=" +
          this.shareId +
          "&mainId=" +
          this.userId;
      }
    },
    scan() {
      //打开页面判断用户是否是通过扫码过来
      if (this.$route.query.actiId || localStorage.getItem("actiId") != null) {
        this.shareHelp();
      }
    },
    helpCode() {
      this.axios
        .post("/api/party/share/add", this.codeParam)
        .then(response => {
          if (response.data.status == "2") {
            Toast({
              message: "助力成功",
              position: "middle",
              duration: 2000
            });
          } else if (response.data.status == "-1") {
            Toast({
              message: "已助力过此用户",
              position: "middle",
              duration: 2000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //      ios(username,password){
    //        this.axios.post('/api/party/nologin/v2/user/login?routingPorts=H5&code='+this.$route.query.code, {
    //          username:username,
    //          password:password,
    //          businessId:'1001',
    //        })
    //          .then(response => {
    //            if(response.data.status == "0"){
    //              this.shareHelp()
    //            }
    //          })
    //          .catch(err => {
    //            console.log(err)
    //          })
    //      },
    shareHelp() {
      this.axios
        .get("/api/party/user/v2/user/session", {})
        .then(response => {
          if (response.data.status == "888") {
            this.curriculumPopup = true;
            localStorage.setItem("curriId", this.$route.query.id); //存储课程id
            localStorage.setItem("actiId", this.$route.query.actiId); //存储活动id
            localStorage.setItem("mainId", this.$route.query.mainId); //存储分享人的id
          } else if (localStorage.getItem("curriId") != null) {
            //判断是否是第一次进来还是通过登录后进来
            this.curriculumPopup = false;
            this.codeParam = {
              userId: localStorage.getItem("mainId"), //分享人的id
              courseId: localStorage.getItem("curriId"), //课程id
              activityId: localStorage.getItem("actiId") //活动id
            };
            localStorage.removeItem("mainId");
            localStorage.removeItem("curriId");
            localStorage.removeItem("actiId");
            if (this.codeParam.userId == response.data.data.userId) {
              Toast({
                message: "账号相同,不能助力",
                position: "middle",
                duration: 2000
              });
            } else {
              this.helpCode();
            }
          } else if (
            this.$route.query.mainId != null &&
            this.$route.query.urlId == null
          ) {
            //通过浏览器路径获取
            this.curriculumPopup = false;
            this.codeParam = {
              userId: this.$route.query.mainId, //分享人的id
              courseId: this.$route.query.id, //课程id
              activityId: this.$route.query.actiId //活动id
            };
            if (this.codeParam.userId == response.data.data.userId) {
              Toast({
                message: "账号相同,不能助力",
                position: "middle",
                duration: 2000
              });
            } else {
              this.helpCode();
            }
          }
          //            else if(this.$route.query.mainId != null && this.$route.query.urlId != null){//判断是否是从app扫一扫过来
          //              this.codeParam = {
          //                "userId":this.$route.query.mainId,//分享人的id
          //                "username":this.$route.query.mainName,//分享人的name
          //                "courseId":this.$route.query.curriId,//课程id
          //                "activityId":this.$route.query.actiId//活动id
          //              };
          //              this.helpCode()
          //            }
        })
        .catch(err => {
          console.log(err);
        });
    },
    helpLogin() {
      this.$router.push({
        path: "/login",
        query: { id: "/course/courseconter?id=" + this.$route.query.id }
      });
    }
  },
  mounted() {
    this.courseDetail();
    this.userIdBox();
    this.commentsList();
    this.MBjudgment(
      "http://www.iqihang.com/courselist/coursecenter?id=" +
        this.$route.query.id
    );
    this.shareActive();
    this.scan();
    this.kecheng();
    window.addEventListener('scroll', this.handleScroll)
  },
  directives: {
    focus: {
      update: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chapterNav{
  background: white;
}
.header{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
  padding: 0.12rem;
  z-index: 100;
}
.header .back, .header .collection{
  width: 0.64rem;
  height: 0.64rem;
}
.header .back{
  float: left;
}
.back img {
  width: 100%;
}
.header .collection {
  float: right;
}

.collection img {
  width: 100%;
}
.couerse-img .mainImg {
  width: 100%;
  height: 4.54rem;
}
/* 增值服务弹出框 */
.servicesPopup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
}
.servicesPopupImg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 73.33%;
  height: 70%;
}
.servicesPopupClose {
  width: 0.45rem;
  height: 0.45rem;
  position: absolute;
  right: 15%;
  top: 16%;
}
.servicesPopupClose img {
  width: 100%;
}
.servicesPopupImg img {
  width: 100%;
}
.chen-form {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 0.1rem;
  overflow: hidden;
}
.couerse{
  background: #f4f4f4;
}
.couerse-img {
  width: 100%;
  height: 4.54rem;
  position: relative;
}
.couerse-type {
  position: absolute;
  width: 1.5rem;
  height: 0.7rem;
  color: #fff;
  top: 1.92rem;
  left: 3rem;
  text-align: center;
  line-height: 0.7rem;
  background: rgba(58, 204, 174, 0.6);
  border-radius: 0.3rem;
}
.couerse-type a {
  color: #fff;
}
.couerse-time {
  width: 100%;
  height: 0.6rem;
  padding: 0 0.2rem;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  line-height: 0.6rem;
  font-size: 0.24rem;
  left: 0;
  bottom: 0;
  position: absolute;
  text-align: left;
}
.couerse-time span {
  float: right;
  color: #fff;
}

.couerse-mid {
  width: 7.5rem;
  padding: 0.1rem 0.2rem;
}

.couerse-mid h3 {
  width: 100%;
  font-weight: normal;
  line-height: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.28rem;
}

.couerse-zl {
  width: 100%;
}

.couerse-zl span {
  font-size: 0.26rem;
  color: #999;
  margin-right: 0.15rem;
  line-height: 0.5rem;
  display: inline-block;
}

.couerse-price {
  line-height: 0.7rem;
  color: #ff5906;
}
.couerse-price i {
  color: #ff5906;
}
.couerse-price span {
  margin-left: 0.2rem;
  display: inline-block;
  color: #999;
  text-decoration: line-through;
}

.activity {
  line-height: 0.4rem;
}
.activity li {
  margin-bottom: 0.2rem;
}
.activity span {
  width: 0.4rem;
  height: 0.4rem;
  border: 1px solid #3acbae;
  display: inline-block;
  line-height: 0.4rem;
  text-align: center;
  border-radius: 0.08rem;
  font-size: 0.24rem;
  background: #3acbae;
  color: #fff;
}

.activity i {
  color: #ff5906;
}

.couerse-dp {
  background: #f4f4f4;
  padding: 0.2rem 0;
}

.choose,
.hot,
.down {
  height: 0.8rem;
  line-height: 0.8rem;
  background: #fff;
  padding: 0 0.2rem;
  width: 100%;
  clear: both;
  margin-bottom: 0.2rem;
}
.chooseMarginBottom {
  margin-bottom: 0;
}
.down {
  margin-bottom: 0;
}

.couerse-dp img {
  float: right;
  width: 0.18rem;
  height: 0.31rem;
  margin-top: 0.25rem;
}

.detail {
  padding: 0.3rem 0.2rem;
}

.teacher-list {
  padding: 0.3rem 0.2rem;
}

.teacher-list li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 0.3rem;
}

.teacher-list li:last-child {
  border-bottom: none;
}

.list-left {
  width: 1.48rem;
  float: left;
  text-align: center;
  line-height: 0.4rem;
}

.list-left img {
  width: 1.48rem;
  height: 1.48rem;
  border-radius: 50%;
}

.list-right {
  float: left;
  width: 5.4rem;
  margin-left: 0.22rem;
  line-height: 0.5rem;
}

.choosebox {
  width: 100%;
  position: fixed;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  bottom: 0;
  height: 6rem;
  overflow-y: auto;
  padding: 0.2rem;
  padding-bottom: 0;
  z-index: 9999;
}

.cose img {
  width: 0.47rem;
  height: 0.47rem;
  display: inline-block;
  margin: 0;
}

.choosebox h3 {
  float: left;
  line-height: 0.47rem;
  width: 90%;
}

.choosebox ul {
  margin-top: 0.2rem;
  height: 4.53rem;
  overflow-y: auto;
}

.choosetitle {
  height: 0.47rem;
}

.choosebox ul li {
  line-height: 0.5rem;
  border-bottom: 1px solid #e6e6e6;
  padding: 0.2rem;
}

.choosebox ul li:last-child {
  border-bottom: none;
  margin-bottom: 1rem;
}

.choosebtn {
  height: 1rem;
  background: #3accae;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  line-height: 1rem;
  color: #fff;
}

.choosebtn a {
  color: #fff;
}

.hotbox {
  position: fixed;
  bottom: 0;
  background: #ffffff;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 999;
}

.hottitle {
  height: 0.67rem;
  margin-top: 0.2rem;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 0.3rem;
  padding: 0 0.2rem;
  padding-bottom: 0.1rem;
}

.hottitle h3 {
  width: 6.5rem;
  float: left;
  line-height: 0.57rem;
  font-weight: normal;
  font-size: 0.28rem;
}

.hotbox ul {
  padding: 0 0.2rem;
  margin-bottom: 2rem;
}
.loadfooter {
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.28rem;
}
.hotbox li {
  width: 100%;
  height: 1.57rem;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 0.2rem;
}

.hotbox li:last-child {
  border-bottom: none;
}

.hotleft {
  width: 0.4rem;
}

.hotright {
  float: right;
  width: 6.5rem;
}

.hotimg {
  width: 2.3rem;
  height: 1.37rem;
}

.hotimg img {
  width: 2.3rem;
  height: 1.37rem;
  margin: 0;
}

.hotconcet {
  width: 4rem;
  height: 1.37rem;
  margin-left: 0.2rem;
}

.hotconcet p {
  color: #ff8400;
  line-height: 0.37rem;
}

.hotconcet span {
  margin-left: 0.2rem;
  color: #999;
  text-decoration: line-through;
}

.hotconcet h3 {
  font-weight: normal;
  font-size: 0.26rem;
  height: 1rem;
}

.hotbtn {
  width: 100%;
  height: 2rem;
  position: fixed;
  bottom: 0;
}

.hotbtn ul {
  padding: 0;
}

.hotbtn li {
  width: 50%;
  float: left;
  height: 1rem;
  line-height: 1rem;
  border-bottom: none;
  text-align: center;
  margin: 0;
  padding: 0;
  color: #fff;
}

.hotpirce {
  line-height: 1rem;
  padding: 0 0.2rem;
  background: #fff;
  border-top: 1px solid #e6e6e6;
}

.hotbtn li:first-child {
  background: #ff8400;
}

.hotbtn li:last-child {
  background: #3accae;
}

.hotpirce span {
  color: #ff5906;
}

.hotbug {
  width: 100%;
  line-height: 1rem;
  background: #3accae;
  color: #fff;
  text-align: center;
}

.coursefoot {
  width: 100%;
  height: 1rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  border-top: 1px solid #e6e6e6;
}

.foot-left {
  width: 40%;
  float: left;
  height: 1rem;
}
.foot-left ul{
  display: flex;
}
.foot-left li {
  width: 50%;
  height: 1rem;
  text-align: center;
  float: left;
  line-height: 0.4rem;
  padding-top: 0.1rem;
}
.foot-left li p{
  font-size: 0.12rem;
}
.foot-left li img {
  width: 0.35rem;
  height: 0.35rem;
}
.chapter-content li .chapter-wei {
  background: #999;
}
.foot-right {
  width: 60%;
  float: left;
  line-height: 1rem;
  text-align: center;
}

.bugtn {
  width: 50%;
  height: 1rem;
  background: #ff8400;
  float: left;
  text-align: center;
  color: #fff;
  line-height: 1rem;
}

.btnbg {
  background: #3acbae;
}

.buybtn {
  width: 100%;
  height: 1rem;
  text-align: center;
  color: #fff;
  line-height: 1rem;
  background: #3acbae;
}
.buybtn a {
  width: 50%;
  height: 1rem;
  color: #fff;
  text-align: center;
  line-height: 1rem;
  display: inline-block;
  float: left;
}
.buybtn span {
  float: left;
  width: 50%;
  height: 1rem;
  color: #fff;
  text-align: center;
  line-height: 1rem;
  display: inline-block;
  background: #ff8400;
}
.buybtn-no {
  width: 100%;
  height: 1rem;
  text-align: center;
  color: #fff;
  line-height: 1rem;
  background: #ccc;
}
.vip-btn {
  width: 100%;
  height: 1rem;
  text-align: center;
  color: #fff;
  line-height: 1rem;
  background: red;
}

.chapter {
  padding: 0.2rem 0;
  font-size: 0.3rem;
}

.chapter-box {
  width: 100%;
}

.chapter-title {
  line-height: 0.8rem;
  padding: 0 0.2rem;
  border-bottom: 1px solid #e6e6e6;
  color: #4a4a4a;
  /* font-weight: bold; */
}

/* .chapter-title img {
  width: 0.34rem;
  height: 0.34rem;
  margin-top: 0.2rem;
} */
.videoImg {
  width: 0.28rem;
  height: 0.18rem;
}

.chapter-content li,
.chapter-list li {
  border-bottom: 1px solid #f4f4f4;
  line-height: 0.8rem;
  padding: 0 0.2rem;
}

.chapter-content li img,
.chapter-list li img {
  width: 0.28rem;
  height: 0.18rem;
  margin-right: 0.1rem;
  margin-top: 0.32rem;
  float: left;
}

.chapter-content li span,
.chapter-list li span {
  float: right;
  width: 1.1rem;
  height: 0.5rem;
  background: #ff5b09;
  color: #fff;
  margin-top: -0.2rem;
  border-radius: 0.1rem;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.24rem;
}
.chapter-content li span.noLive {
  background: #3accae;
}
.chapter-content li span.endLive {
  background: #e7e7e7;
}
.chapter-content li span a,
.chapter-list li span a {
  color: #fff;
}

.chapter-list {
  width: 100%;
}

.list-title {
  background: #f2f2f2;
  padding: 0 0.2rem;
  line-height: 0.8rem;
}

.list-title span {
  float: right;
}

.list-title span i {
  color: #3acbae;
}

.videotitle {
  float: left;
  width: 5.4rem;
}

.time {
  float: left;
  width: 100%;
}

.down-right {
  float: right !important;
  margin-top: 0 !important;
  background: #3acbae !important;
  width: 1.1rem;
  height: 0.5rem;
  color: #fff;
  border-radius: 0.1rem;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.24rem;
}

.comment-box {
  padding: 0.2rem;
  border-bottom: 1px solid #e6e6e6;
  width: 100%;
  height: auto;
}

.comment-img {
  width: 1rem;
  height: 1rem;
  background: url("../vip/vipImg/vip-pic.png") no-repeat;
  margin-right: 0.2rem;
  background-size: cover;
}

.comment-img img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}

.comment-mid {
  width: 5.9rem;
}

.comment-input {
  float: left;
  width: 5.4rem;
  margin-right: 0.2rem;
  border: 1px solid #e6e6e6;
  height: 0.7rem;
}

.comment-save {
  background: #3acbae;
  color: #fff;
  display: inline-block;
  text-align: center;
  width: 1.3rem;
  border-radius: 0.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
}

.comment-top {
  padding: 0.2rem;
}

.comment-tiem {
  font-size: 0.24rem;
  color: #999;
  float: right;
  line-height: 0.5rem;
}

.comment-title {
  font-size: 0.24rem;
  color: #999;
  width: 2.5rem;
  overflow: hidden;
  display: inline-block;
  line-height: 0.5rem;
}

.comment-hot {
  display: inline-block;
  background: #ff5906;
  color: #fff;
  display: inline-block;
  font-size: 0.24rem;
  width: 0.6rem;
  float: left;
  height: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  border-radius: 0.1rem;
  margin-top: 0.1rem;
  margin-right: 0.1rem;
}

.comment-cent {
  width: 100%;
  padding: 0.1rem;
  line-height: 0.3rem;
}

.comment-btn span {
  border: 1px solid #3acbae;
  line-height: 0.4rem;
  display: inline-block;
  border-radius: 1rem;
  padding: 0 0.15rem;
  margin-right: 0.2rem;
  color: #3acbae;
  font-size: 0.22rem;
}

.comment-btn span:last-child {
  background: #3acbae;
  color: #fff;
}

.comment-bot {
  position: fixed;
  z-index: 9999;
  bottom: 0;
  background: #fff;
  width: 100%;
}

.buy {
  width: 0.64rem;
  height: 0.64rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  position: absolute;
  top: 0.2rem;
  right: 1.2rem;
  text-align: center;
  line-height: 0.64rem;
}

.buy img {
  width: 0.38rem;
  height: 0.35rem;
  margin-top: 0.15rem;
}
.mint-navbar {
  border-bottom: 0.1px solid #e2e2e2;
}
.mint-navbar .mint-tab-item.is-selected {
  color: #3acbae;
  border-bottom: 2px solid #3acbae;
  margin-bottom: 0;
}
.class-active {
  height: 1rem;
  text-align: center;
  overflow: hidden;
  margin: 0.1rem 0;
  position: relative;
}
.class-active img {
  width: 100%;
  height: 1rem;
}
.classcose {
  width: 0.47rem;
  height: 0.47rem;
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0.1rem;
}
.classcose img {
  width: 0.4rem;
  height: 0.4rem;
  display: inline-block;
  margin: 0;
}
.curriculum-popup {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.popup-content {
  width: 6rem;
  height: 3.5rem;
  background: #fff;
  margin: 0 auto;
  margin-top: 4rem;
}
.popup-content-tp {
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  font-size: 0.3rem;
}
.popup-bottom {
  height: 1rem;
  overflow: hidden;
}
.popup-bottom button {
  width: 100%;
  height: 100%;
  float: left;
  color: #fff;
  font-size: 0.3rem;
}
.popup-bottom button:nth-child(1) {
  background: #ff9000;
}
.servicesInfo {
  width: 0.26rem !important;
  height: 0.26rem !important;
  float: none !important;
  background-size: 100% 100%;
  margin-left: 0.2rem;
}
.servicesList {
  background-color: white;
  margin-bottom: 0.2rem;
  line-height: 0.5rem;
  overflow: hidden;
  padding: 0 0.2rem;
}
.servicesList img {
  width: 0.38rem !important;
  height: 0.38rem !important;
  background-size: 100% 100%;
  margin-top: 0;
  float: left;
  margin-top: 2px;
}
.servicesList p {
  float: left;
  margin-left: 0.2rem;
}
.servicesList span {
  float: right;
  color: #ff5b09;
  font-size: 0.28rem;
}
/* .chaptSecond{
  padding-left: 0.5rem;
}
.chaptThree{
  padding-left: 0.5rem;
} */
.chapterBg {
  line-height: 0.88rem;
  background: #def7f1;
  padding-left: 0.5rem;
}
.videoList {
  padding-left: 0.2rem;
}
.videoList li:last-of-type {
  border: none;
}
.videoLive {
  padding: 0.2rem 0;
  line-height: 0.5rem;
}
.chaptSecond .chapterBg span {
  float: right;
  font-weight: normal;
  color: #9b9b9b;
  font-size: 0.24rem;
}
.chaptSecond .chapterBg span i {
  color: #ff5b09;
}
.notesImg {
  width: 0.46rem !important;
  height: 0.36rem !important;
  margin-top: 0 !important;
  float: left !important;
}
.liveIcon {
  float: left !important;
  width: 0.68rem !important;
  height: 0.32rem !important;
  margin-top: 0.3rem !important;
  margin-right: 0.2rem !important;
}
.chapterIcon {
  width: 0.34rem;
  height: 0.34rem;
  float: right;
  margin-top: 0.2rem;
}
hr {
  margin: 0;
  background: #f4f4f4;
  height: 1px;
  border: none;
}
</style>
