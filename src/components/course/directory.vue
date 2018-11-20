<template>
    <div class="chapter">
            <!-- 一级章节 -->
            <div v-if="directoryArr.first.length > 0" v-for="(item,index) in directoryArr.first" :key="index">
              <div class="chapter-box fn-clear">
                <div class="chapter-title chapter-content" @click="firstShowHandle(item._source.type_catalog_id)" @click.stop>
                  <img class="chapterIcon" v-if="secondShow != item._source.type_catalog_id" src="./courseImg/chapter.png"/>
                  <img class="chapterIcon" v-if="secondShow == item._source.type_catalog_id" src="./courseImg/chapter_sel.png"/>
                  <img v-if="item._live == 'true'" class="liveImg" src="./courseImg/live.png" alt="">
                  <h3>{{item._source.type_catalog_name}}</h3>
                  <hr/>
                  <!-- 一级视频 -->
                  <ul v-if="secondShow == item._source.type_catalog_id">
                    <li v-if="first.value.hits.hits.length > 0" v-for="(first,key) in videoList.first" :key="key">
                      <div v-if="first.id == item._source.type_catalog_id" class="fn-clear">
                        <ul class="videoList">
                          <li v-if="first.value.hits.hits.length > 0 && firstVideo._source.cms_content_type_datatype === 'EVersion'" v-for="(firstVideo,index) in first.value.hits.hits" :key="index">
                            <div class="videoLive">
                              <img class="notesImg" src="./courseImg/notes.png" alt="">
                              {{firstVideo._source.cms_content_type_title}}
                              <span class="down-right" @click="down(firstVideo._source.cms_content_type_content)" @click.stop>查看</span>
                            </div>
                          </li>
                          <li :class="firstVideo._source.cms_content_type_userRealName == 1 ? 'videoBox':''" v-for="(firstVideo,index) in first.value.hits.hits" :key="index">
                            <!-- 直播 -->
                            <div class="videoLive" v-if="firstVideo._source.cms_content_type_userRealName == 0">
                              <img class="liveIcon" src="./courseImg/liveIcon.png" alt="">
                              <h3>{{firstVideo._source.cms_content_type_title}}</h3>
                              <i>{{ times | dataTime(firstVideo._source.cms_content_type_thumbMediaUrl)}}-{{ times | dataTime(firstVideo._source.cms_content_type_thumbLocalUrl)}}</i>
                              <span class="noLive" v-if="firstVideo._source.cms_content_type_thumbMediaUrl > new Date().getTime()" >未开始</span>
                              <span class="living" @click.stop v-if="firstVideo._source.cms_content_type_thumbMediaUrl < new Date().getTime() && firstVideo._source.cms_content_type_thumbLocalUrl > new Date().getTime()" @click="jumpPlayVideo(courseId,firstVideo._source.cms_content_type_userPhone,firstVideo._source.cms_content_type_title,firstVideo._source.cms_content_type_content,firstVideo)">直播中</span>
                              <span class="endLive" v-if="firstVideo._source.cms_content_type_thumbLocalUrl < new Date().getTime()">已结束</span>
                            </div>
                            <!-- 录播 -->
                            <div :class="nationVideo == firstVideo._source.cms_content_type_content ? 'colorNation':''" @click.stop @click="jumpPlayVideo(courseId,firstVideo._source.cms_content_type_userPhone,firstVideo._source.cms_content_type_title,firstVideo._source.cms_content_type_content)" v-if="firstVideo._source.cms_content_type_userRealName == 1">
                              <img v-if="nationVideo != firstVideo._source.cms_content_type_content" class="videoImg" src="./courseImg/icon_video.png" alt="">
                              <img v-if="player && nationVideo == firstVideo._source.cms_content_type_content" class="playNation" src="./courseImg/icon_play.png" alt="">
                              <h3>{{firstVideo._source.cms_content_type_title}}</h3>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div v-if="secondShow == item._source.type_catalog_id" class="chapter-content">
                  <!-- 二级章节 -->
                  <div @click="secondShowHandle(chaptSecond._source.type_catalog_id)" @click.stop class="chaptSecond" v-if="item._source.type_catalog_id == chaptSecond._source.type_catalog_pid" v-for="(chaptSecond,index) in directoryArr.second" :key="index">
                    <div class="chapter-title chapterBg">
                      <h3 class="chaperTitle">{{chaptSecond._source.type_catalog_name}}</h3>
                      <span>共 <i>{{videoNum[chaptSecond._source.type_catalog_id]}}</i> 课</span>
                    </div>
                    <!-- 二级视频 -->
                    <ul v-show="threeShow == chaptSecond._source.type_catalog_id" style="margin-left:0.2rem" class="videoList">
                      <li v-if="second.value.hits.hits.length > 0 && second.id == chaptSecond._source.type_catalog_id" v-for="(second,key) in videoList.second" :key="key">
                        <div class="fn-clear">
                          <ul>
                            <li v-if="second.value.hits.hits.length > 0 && secondVideo._source.cms_content_type_datatype === 'EVersion'" v-for="(secondVideo,index) in second.value.hits.hits" :key="index">
                              <div class="videoLive">
                                <img class="notesImg" src="./courseImg/notes.png" alt="">
                                {{secondVideo._source.cms_content_type_title}}
                                <span class="down-right" @click="down(secondVideo._source.cms_content_type_content)" @click.stop>查看</span>
                              </div>
                            </li>
                            <li :class="secondVideo._source.cms_content_type_userRealName == 1 ? 'videoBox':''" v-for="(secondVideo,index) in second.value.hits.hits" :key="index">
                              <!-- 直播 -->
                              <div class="videoLive" v-if="secondVideo._source.cms_content_type_userRealName == 0">
                                <img class="liveIcon" src="./courseImg/liveIcon.png" alt="">
                                <h3 class="chaperTitle">{{secondVideo._source.cms_content_type_title}}</h3>
                                <span class="noLive" v-if="secondVideo._source.cms_content_type_thumbMediaUrl > new Date().getTime()">未开始</span>
                                <span class="living" @click.stop v-if="secondVideo._source.cms_content_type_thumbMediaUrl < new Date().getTime() && secondVideo._source.cms_content_type_thumbLocalUrl > new Date().getTime()" @click="jumpPlayVideo(courseId,secondVideo._source.cms_content_type_userPhone,secondVideo._source.cms_content_type_title,secondVideo._source.cms_content_type_content,secondVideo)">直播中</span>
                                <span class="endLive" v-if="secondVideo._source.cms_content_type_thumbLocalUrl < new Date().getTime()">已结束</span>
                                {{ times | dataTime(secondVideo._source.cms_content_type_thumbMediaUrl)}}-{{ times | dataTime(secondVideo._source.cms_content_type_thumbLocalUrl)}}
                              </div>
                              <!-- 录播 -->
                              <div :class="nationVideo == secondVideo._source.cms_content_type_content ? 'colorNation':''" @click.stop @click="jumpPlayVideo(courseId,secondVideo._source.cms_content_type_userPhone,secondVideo._source.cms_content_type_title,secondVideo._source.cms_content_type_content)" v-if="secondVideo._source.cms_content_type_userRealName == 1">
                                <img v-if="nationVideo != secondVideo._source.cms_content_type_content" src="./courseImg/icon_video.png" alt="">
                                <img v-if="player && nationVideo == secondVideo._source.cms_content_type_content" class="playNation" src="./courseImg/icon_play.png" alt="">
                                <h3>{{secondVideo._source.cms_content_type_title}}</h3>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                    <!-- 三级章节 -->
                    <div class="chaptThree" v-if="chaptSecond._source.type_catalog_id == chaptThree._source.type_catalog_pid && threeShow == chaptSecond._source.type_catalog_id" v-for="(chaptThree,index) in directoryArr.three" :key="index">
                      <div @click="threeShowHandle(chaptThree._source.type_catalog_id)" @click.stop style="padding-left:0.75rem;" class="chapter-title"><img class="chapterIcon" src="./courseImg/icon_top.png"/>{{chaptThree._source.type_catalog_name}}</div>
                      <!-- 三级视频 -->
                      <ul v-show="fourShow == chaptThree._source.type_catalog_id" style="margin-left:0.4rem" class="videoList">
                        <li v-if="three.value.hits.hits.length > 0 && three.id == chaptThree._source.type_catalog_id" v-for="(three,key) in videoList.three" :key="key">
                          <div class="fn-clear">
                            <ul class="videoList">
                              <li v-if="three.value.hits.hits.length > 0 && threeVideo._source.cms_content_type_datatype === 'EVersion'" v-for="(threeVideo,index) in three.value.hits.hits" :key="index">
                                <div class="videoLive">
                                  <img class="notesImg" src="./courseImg/notes.png" alt="">
                                  {{threeVideo._source.cms_content_type_title}}
                                  <span class="down-right" @click="down(threeVideo._source.cms_content_type_content)" @click.stop>查看</span>
                                </div>
                              </li>
                              <li :class="threeVideo._source.cms_content_type_userRealName == 1 ? 'videoBox':''" v-for="(threeVideo,index) in three.value.hits.hits" :key="index">
                                <!-- 直播 -->
                                <div class="videoLive" v-if="threeVideo._source.cms_content_type_userRealName == 0">
                                  <img class="liveIcon" src="./courseImg/liveIcon.png" alt="">
                                  <h3>{{threeVideo._source.cms_content_type_title}}</h3>
                                  <span class="noLive" v-if="threeVideo._source.cms_content_type_thumbMediaUrl > new Date().getTime()">未开始</span>
                                  <span class="living" @click.stop v-if="threeVideo._source.cms_content_type_thumbMediaUrl < new Date().getTime() && threeVideo._source.cms_content_type_thumbLocalUrl > new Date().getTime()" @click="jumpPlayVideo(courseId,threeVideo._source.cms_content_type_userPhone,threeVideo._source.cms_content_type_title,threeVideo._source.cms_content_type_content,threeVideo)">直播中</span>
                                  <span class="endLive" v-if="threeVideo._source.cms_content_type_thumbLocalUrl < new Date().getTime()">已结束</span>
                                  {{ times | dataTime(threeVideo._source.cms_content_type_thumbMediaUrl)}}-{{ times | dataTime(threeVideo._source.cms_content_type_thumbLocalUrl)}}
                                </div>
                                <!-- 录播 -->
                                <div :class="nationVideo == threeVideo._source.cms_content_type_content ? 'colorNation':''" @click.stop @click="jumpPlayVideo(courseId,threeVideo._source.cms_content_type_userPhone,threeVideo._source.cms_content_type_title,threeVideo._source.cms_content_type_content)" v-if="threeVideo._source.cms_content_type_userRealName == 1">
                                  <img v-if="nationVideo != threeVideo._source.cms_content_type_content" src="./courseImg/icon_video.png" alt="">
                                  <img v-if="player && nationVideo == threeVideo._source.cms_content_type_content" class="playNation" src="./courseImg/icon_play.png" alt="">
                                  <h3>{{threeVideo._source.cms_content_type_title}}</h3>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <!-- 四级章节 -->
                      <div style="padding-left:1rem;" class="chaptThree" v-if="chaptThree._source.type_catalog_id == chaptFour._source.type_catalog_pid && fourShow == chaptFour._source.type_catalog_pid" v-for="(chaptFour,index) in directoryArr.four" :key="index">
                        <div @click="fourShowHandle(chaptFour._source.type_catalog_id)" @click.stop class="chapter-title"><img class="chapterIcon" src="./courseImg/four_top.png"/>{{chaptFour._source.type_catalog_name}}</div>
                        <!-- 四级视频 -->
                        <ul class="videoList" v-show="fiveShow == chaptFour._source.type_catalog_id">
                          <li v-if="four.value.hits.hits.length > 0 && four.id == chaptFour._source.type_catalog_id" v-for="(four,key) in videoList.four" :key="key">
                            <div class="fn-clear">
                              <ul>
                                <li v-if="four.value.hits.hits.length > 0 && fourVideo._source.cms_content_type_datatype === 'EVersion'" v-for="(fourVideo,index) in four.value.hits.hits" :key="index">                                
                                  <div class="videoLive">
                                    <img class="notesImg" src="./courseImg/notes.png" alt="">
                                    {{fourVideo._source.cms_content_type_title}}
                                    <span class="down-right" @click="down(fourVideo._source.cms_content_type_content)" @click.stop>查看</span>
                                  </div>
                                </li>
                                <li :class="fourVideo._source.cms_content_type_userRealName == 1 ? 'videoBox':''" v-for="(fourVideo,index) in four.value.hits.hits" :key="index">
                                  <!-- 直播 -->
                                  <div class="videoLive" v-if="fourVideo._source.cms_content_type_userRealName == 0">
                                    <img class="liveIcon" src="./courseImg/liveIcon.png" alt="">
                                    <h3>{{fourVideo._source.cms_content_type_title}}</h3>
                                    <span class="noLive" v-if="fourVideo._source.cms_content_type_thumbMediaUrl > new Date().getTime()">未开始</span>
                                    <span class="living" @click.stop v-if="fourVideo._source.cms_content_type_thumbMediaUrl < new Date().getTime() && fourVideo._source.cms_content_type_thumbLocalUrl > new Date().getTime()" @click="jumpPlayVideo(courseId,fourVideo._source.cms_content_type_userPhone,fourVideo._source.cms_content_type_title,fourVideo._source.cms_content_type_content,fourVideo)">直播中</span>
                                    <span class="endLive" v-if="fourVideo._source.cms_content_type_thumbLocalUrl < new Date().getTime()">已结束</span>
                                    {{ times | dataTime(fourVideo._source.cms_content_type_thumbMediaUrl)}}-{{ times | dataTime(fourVideo._source.cms_content_type_thumbLocalUrl)}}
                                  </div>
                                  <!-- 录播 -->
                                  <div :class="nationVideo == fourVideo._source.cms_content_type_content ? 'colorNation':''" @click.stop @click="jumpPlayVideo(courseId,fourVideo._source.cms_content_type_userPhone,fourVideo._source.cms_content_type_title,fourVideo._source.cms_content_type_content)" v-if="fourVideo._source.cms_content_type_userRealName == 1">
                                    <img v-if="nationVideo != fourVideo._source.cms_content_type_content" src="./courseImg/icon_video.png" alt="">
                                    <img v-if="player && nationVideo == fourVideo._source.cms_content_type_content" class="playNation" src="./courseImg/icon_play.png" alt="">
                                    <h3>{{fourVideo._source.cms_content_type_title}}</h3>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
</template>
<style scoped>
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
.chapter-content li {
  padding: 0;
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
  background: #ff5906;
  color: #fff;
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

.back {
  width: 0.64rem;
  height: 0.64rem;
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
}

.back img {
  width: 0.64rem;
  height: 0.64rem;
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

.collection {
  width: 0.64rem;
  height: 0.64rem;
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  text-align: center;
  line-height: 0.64rem;
}

.collection img {
  width: 0.64rem;
  height: 0.64rem;
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
  padding:0 0.2rem;
}
.videoList h3{
  display: inline-block;
}
.videoList h3{
  font-weight: normal;
  width: 90%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.liveIcon{
  display: inline-block;
  width: 0.32rem !important;
  height: 0.29rem !important;
  margin-top: .12rem !important;
  margin-right: 0.2rem !important;
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
.liveImg {
  float: left !important;
  width: 0.68rem !important;
  height: 0.32rem !important;
  margin-top: 0.25rem !important;
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
.playNation{
    width: 0.28rem !important;
    height: 0.28rem !important;
    margin-top: 0.25rem !important;
}
.colorNation{
    color: #3ACCAE;
}
.videoBox{
  height: 0.8rem;
}
.chaperTitle{
  width: 84%;
  display: inline-block;
  line-height: 0.4rem;
  padding-top: 0.2rem;
  font-weight: normal;
}
</style>
<script>
import { Toast, Picker } from "mint-ui";
import { Loadmore } from "mint-ui";
export default {
  data() {
    return {
      secondShow: "",
      threeShow: "",
      fourShow: "",
      fiveShow: "",
      times: "",
      nationVideo: ''
    };
  },
  props: [
    "directoryArr",
    "videoList",
    "videoNum",
    "loginStatus",
    "buyStatus",
    "courseId",
    "courseTitel",
    "expired",
    'palyarType',
    'player',
    'vid',
    'videoKeys',
    'catalogId',
    'userName'
  ],
  filters: {
    dataTime(time, type) {
      var date = new Date(Number(type));
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var houer = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var dataTime = `${year}-${month}-${day} ${houer}:${minutes}:${seconds}`;
      return dataTime;
    }
  },
  watch: {
    catalogId(){
      this.directory()
    }
  },
  methods: {
    directory() {
      this.nationVideo = this.vid
    },
    // 一级章节
    firstShowHandle(id) {
      if (this.secondShow === id) {
        this.secondShow = "";
        return;
      }
      this.secondShow = id;
      this.threeShow = '';
      this.fourShow = '';
      this.fiveShow = '';
    },
    // 二级章节
    secondShowHandle(id) {
      if (this.threeShow === id) {
        this.threeShow = "";
        return;
      }
      this.threeShow = id;
      this.fourShow = '';
      this.fiveShow = '';
    },
    // 三级章节
    threeShowHandle(id) {
      if (this.fourShow === id) {
        this.fourShow = "";
        return;
      }
      this.fourShow = id;
      this.fiveShow = '';
    },
    // 四级章节
    fourShowHandle(id) {
      if (this.fiveShow === id) {
        this.fiveShow = "";
        return;
      }
      this.fiveShow = id;
    },
    // 视频跳转
    jumpPlayVideo(id, type, title, vid, item) {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
        return;
      }
      if(this.expired == 1){
        Toast({
          message: "此课程已过期",
          position: "middle",
          duration: 1000
        });
        return;
      }
      if (this.buyStatus == "1") {
        Toast({
          message: "您还未购买此课程" + this.courseTitel + "请先购买",
          position: "middle",
          duration: 1000
        });
        return;
      }
      if (type == "3") {
        if(vid.indexOf('=') != 11){
          vid = vid.split('=')[1]
        }
        window.location.href = `http://mobile.iqihang.com/live/mobile.html?&vid=${vid}&name=${
          this.userName
        }&catalogId=${this.catalogId}`;
        return;
      }
      if(this.player){
        this.$emit('currentVid',vid)
          this.palyarType(type,vid,title)
          this.nationVideo = vid;
          return;
      }
      if(type == '4'){
          vid = vid.substring(vid.lastIndexOf("/")).split("/")[1];
      }
      this.$router.push({
        path: "/recorded",
        query: { courseId: id, playType: type, vdName: title, vdUser: vid }
      });
    },
    //下载电子讲义
    //讲义下载
    down(url) {
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        //判断是否购买课程
        if(this.buyStatus == "1"){
            Toast({
                message: "您还未购买此课程" + this.courseTitel + "请先购买",
                position: "middle",
                duration: 1000
            });
        }else{
            window.location.href = url;
        }
      }
    }
  }
};
</script>


